import { describe, expect, it } from 'vitest';
import * as core from '../../core.js';

describe('threshold normalization', () => {
  it('keeps physically ordered thresholds', () => {
    expect(core.normalizeThresholdTriplet(100, 200, 300)).toEqual({ alert: 100, flood: 200, severe: 300 });
  });

  it('removes an alert at or above the flood threshold', () => {
    expect(core.normalizeThresholdTriplet(220, 200, 300)).toEqual({ alert: null, flood: 200, severe: 300 });
    expect(core.normalizeThresholdTriplet(200, 200, 300)).toEqual({ alert: null, flood: 200, severe: 300 });
  });

  it('removes severe thresholds that do not exceed flood or alert', () => {
    expect(core.normalizeThresholdTriplet(100, 200, 190)).toEqual({ alert: 100, flood: 200, severe: null });
    expect(core.normalizeThresholdTriplet(null, 200, 200)).toEqual({ alert: null, flood: 200, severe: null });
    expect(core.normalizeThresholdTriplet(100, null, 90)).toEqual({ alert: 100, flood: null, severe: null });
    expect(core.normalizeThresholdTriplet(null, null, 90)).toEqual({ alert: null, flood: null, severe: 90 });
  });
});

describe('rating-curve conversion', () => {
  it('converts stage to discharge and back', () => {
    const discharge = core.ratingDischarge(250, 12, 0.5, 2);
    expect(discharge).toBeCloseTo(48, 8);
    expect(core.ratingStageFromDischarge(discharge, 12, 0.5, 2)).toBeCloseTo(250, 8);
  });

  it('rejects unsupported values', () => {
    expect(core.ratingDischarge(40, 12, 0.5, 2)).toBeNull();
    expect(core.ratingDischarge('bad', 12, 0.5, 2)).toBeNull();
    expect(core.ratingStageFromDischarge(0, 12, 0.5, 2)).toBeNull();
    expect(core.ratingStageFromDischarge(10, 0, 0.5, 2)).toBeNull();
    expect(core.ratingStageFromDischarge(10, 12, 0.5, 0)).toBeNull();
  });
});

describe('date and quantile helpers', () => {
  it('moves across month and leap-year boundaries in UTC', () => {
    expect(core.addDays('2020-02-28', 1)).toBe('2020-02-29');
    expect(core.addDays('2020-03-01', -1)).toBe('2020-02-29');
  });

  it('interpolates quantiles from sorted values', () => {
    expect(core.quantileFromSorted([], 0.5)).toBeNull();
    expect(core.quantileFromSorted([4], 0.5)).toBe(4);
    expect(core.quantileFromSorted([0, 10], 0.25)).toBe(2.5);
    expect(core.quantileFromSorted([0, 10, 20], 0.75)).toBe(15);
  });
});

describe('daily station analysis', () => {
  const rows = [
    { uf: 'AM', lat: -3, lon: -60, status: 'normal' },
    { uf: 'AM', lat: -4, lon: -61, status: 'warning' },
    { uf: 'AM', lat: -5, lon: -62, status: 'flooded' },
    { uf: 'PA', lat: -1, lon: -50, status: 'extreme_flooding' },
    { uf: 'PA', lat: -2, lon: -49, status: 'no_data' },
    { uf: 'RO', lat: null, lon: null, status: 'unknown' },
  ];

  it('counts valid readings and conditions outside normal', () => {
    const summary = core.summarizeDailyStations(rows);
    expect(summary.total).toBe(6);
    expect(summary.valid).toBe(4);
    expect(summary.outsideNormal).toBe(3);
    expect(summary.statusCounts).toEqual({
      normal: 1,
      warning: 1,
      flooded: 1,
      extreme_flooding: 1,
      no_data: 2,
    });
  });

  it('ranks states by the share outside normal among valid readings', () => {
    const { stateRanking } = core.summarizeDailyStations(rows);
    expect(stateRanking).toEqual([
      { uf: 'PA', valid: 1, outsideNormal: 1, share: 1 },
      { uf: 'AM', valid: 3, outsideNormal: 2, share: 2 / 3 },
    ]);
  });

  it('places outside-normal stations in fixed coordinate bins', () => {
    const summary = core.summarizeDailyStations(rows);
    expect(summary.latitudeBins.find((bin) => bin.start === -5)?.counts).toEqual({
      warning: 1,
      flooded: 1,
      extreme_flooding: 1,
    });
    expect(summary.longitudeBins.find((bin) => bin.start === -65)?.counts).toEqual({
      warning: 1,
      flooded: 1,
      extreme_flooding: 0,
    });
    expect(summary.longitudeBins.find((bin) => bin.start === -50)?.counts.extreme_flooding).toBe(1);
  });
});

describe('timeline', () => {
  it('converts between dates and day numbers', () => {
    expect(core.dayNumber('1970-01-02')).toBe(1);
    expect(core.dateFromDayNumber(core.dayNumber('2020-02-29'))).toBe('2020-02-29');
  });

  it('centres a one-year window on the selected day', () => {
    expect(core.timelineWindow('2020-07-01', '1911-01-27', '2025-12-31')).toEqual({ start: '2020-01-01', end: '2020-12-31' });
  });

  it('keeps the window inside the record', () => {
    expect(core.timelineWindow('1911-02-01', '1911-01-27', '2025-12-31')).toEqual({ start: '1911-01-27', end: '1912-01-27' });
    expect(core.timelineWindow('2025-12-01', '1911-01-27', '2025-12-31')).toEqual({ start: '2024-12-31', end: '2025-12-31' });
    expect(core.timelineWindow('2030-01-01', '1911-01-27', '2025-12-31').end).toBe('2025-12-31');
    expect(core.timelineWindow('2020-01-10', '2020-01-01', '2020-03-01')).toEqual({ start: '2020-01-01', end: '2020-03-01' });
  });

  it('tells whether a date lies in the window', () => {
    const window = { start: '2020-01-01', end: '2020-12-31' };
    expect(core.dateInWindow('2020-01-01', window)).toBe(true);
    expect(core.dateInWindow('2020-12-31', window)).toBe(true);
    expect(core.dateInWindow('2021-01-01', window)).toBe(false);
    expect(core.dateInWindow('2019-12-31', window)).toBe(false);
    expect(core.dateInWindow('2020-05-05', null)).toBe(false);
  });

  it('counts stations whose record spans each year', () => {
    const stations = [
      { first_date: '1999-05-01', last_date: '2001-02-01' },
      { first_date: '2001-01-01', last_date: '2003-12-31' },
      { first_date: null, last_date: '2002-01-01' },
    ];
    expect(core.yearlyStationCoverage(stations, 2000, 2002)).toEqual([1, 2, 1]);
  });

  it('lists the first day of each month inside a range', () => {
    expect(core.monthStarts('2019-11-15', '2020-02-01')).toEqual(['2019-12-01', '2020-01-01', '2020-02-01']);
    expect(core.monthStarts('2020-01-01', '2020-01-31')).toEqual(['2020-01-01']);
  });

  it('moves by calendar months', () => {
    expect(core.addMonths('2020-01-02', -1)).toBe('2019-12-02');
    expect(core.addMonths('2020-01-31', 1)).toBe('2020-02-29');
    expect(core.addMonths('2019-01-31', 1)).toBe('2019-02-28');
    expect(core.addMonths('2020-11-15', 14)).toBe('2022-01-15');
    expect(core.addMonths('2020-03-10', -27)).toBe('2017-12-10');
  });
});
