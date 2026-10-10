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

describe('station report layout', () => {
  it('uses A4 pages with 2.54 cm margins', () => {
    expect(core.REPORT_PAGE).toEqual({ width: 11906, height: 16838, margin: 1440, headerFooter: 720 });
    expect(core.reportTextWidthPt()).toBeCloseTo(451.3, 6);
    expect(core.reportTextWidthPt({ width: 12240, margin: 1080 })).toBe(504);
  });

  it('draws charts at one canvas unit per printed point', () => {
    const layout = core.reportFigureLayout(450, 300);
    expect(layout).toEqual({ canvasWidth: 450, canvasHeight: 300, pixelRatio: 4, imageWidth: 600, imageHeight: 400 });
    expect((layout.imageWidth * 72) / 96).toBe(layout.canvasWidth);
    expect(core.reportFigureLayout(300, 145, 2)).toEqual({ canvasWidth: 300, canvasHeight: 145, pixelRatio: 2, imageWidth: 400, imageHeight: 193 });
  });

  it('keeps chart text at or above 16 pt', () => {
    expect(core.REPORT_MIN_CHART_FONT_PT).toBe(16);
  });

  it('scales images to a target width without changing their shape', () => {
    expect(core.scaleToWidth(1200, 800, 600)).toEqual({ width: 600, height: 400 });
    expect(core.scaleToWidth(1000, 333, 600)).toEqual({ width: 600, height: 200 });
  });
});
