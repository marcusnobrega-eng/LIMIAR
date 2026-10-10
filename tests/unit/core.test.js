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

describe('discharge from the rating curve for each day', () => {
  // Segments from ANA station 13880000 (Canutama) as exported to the website.
  const curves = [
    { validFrom: '1997-01-01', validTo: '2016-01-08', stageMin: 1505, stageMax: 2550, coefficientA: 72.0109, coefficientH0: 4.58, coefficientN: 1.7, segmentId: '1997-b' },
    { validFrom: '2016-01-09', validTo: '2023-12-31', stageMin: 700, stageMax: 2289, coefficientA: 9.9319, coefficientH0: 0.21, coefficientN: 2.2, segmentId: '2016-a' },
    { validFrom: '2016-01-09', validTo: '2023-12-31', stageMin: 2289, stageMax: 2550, coefficientA: 93.1542, coefficientH0: 8.14, coefficientN: 1.72, segmentId: '2016-b' },
    { validFrom: '2024-01-01', validTo: '2025-12-31', stageMin: 2290, stageMax: 2600, coefficientA: 42.8607, coefficientH0: 9.18, coefficientN: 2.057, segmentId: '2024-b' },
  ];
  const pick = (date, stage) => core.ratingSegmentForDate(curves, date, stage);

  it('uses the segment valid on the date that contains the stage', () => {
    expect(pick('2018-03-01', 1200)).toEqual({ segment: curves[1], validOnDate: true });
    expect(pick('2018-03-01', 2400).segment.segmentId).toBe('2016-b');
    expect(pick('2024-06-01', 2400).segment.segmentId).toBe('2024-b');
    expect(core.validCurveDischarge(curves, '2018-03-01', 1200).discharge).toBeCloseTo(9.9319 * (12 - 0.21) ** 2.2, 6);
  });

  it('falls back to the most recent segment containing the stage when none is valid on the date', () => {
    expect(pick('1976-02-27', 2353)).toEqual({ segment: curves[3], validOnDate: false });
    expect(pick('1976-02-27', 1200)).toEqual({ segment: curves[1], validOnDate: false });
    expect(pick('2024-06-01', 1200)).toEqual({ segment: curves[1], validOnDate: false });
    expect(core.validCurveDischarge(curves, '1976-02-27', 2353).validOnDate).toBe(false);
  });

  it('returns nothing when no segment contains the stage', () => {
    expect(pick('2018-03-01', 500)).toBeNull();
    expect(pick('2018-03-01', 2700)).toBeNull();
    expect(core.validCurveDischarge(curves, '2018-03-01', 500)).toEqual({ discharge: null, segment: null, validOnDate: null });
  });

  it('prefers the most recent start when curves overlap', () => {
    const overlapping = [
      { validFrom: '2000-01-01', validTo: '2010-12-31', stageMin: 0, stageMax: 500, coefficientA: 1, coefficientH0: 0, coefficientN: 2, segmentId: 'older' },
      { validFrom: '2005-01-01', validTo: '2010-12-31', stageMin: 0, stageMax: 500, coefficientA: 2, coefficientH0: 0, coefficientN: 2, segmentId: 'newer' },
    ];
    expect(core.ratingSegmentForDate(overlapping, '2006-01-01', 100).segment.segmentId).toBe('newer');
    expect(core.ratingSegmentForDate(overlapping, '2003-01-01', 100).segment.segmentId).toBe('older');
    expect(core.ratingSegmentForDate(overlapping, '2020-01-01', 100)).toEqual({ segment: overlapping[1], validOnDate: false });
  });

  it('ignores segments without stage bounds and missing inputs', () => {
    const open = [{ validFrom: null, validTo: null, stageMin: 0, stageMax: 500, coefficientA: 1, coefficientH0: 0, coefficientN: 2, segmentId: 'open' }];
    expect(core.ratingSegmentForDate(open, '1950-01-01', 100)).toEqual({ segment: open[0], validOnDate: true });
    expect(core.ratingSegmentForDate([{ ...open[0], stageMin: null }], '1950-01-01', 100)).toBeNull();
    expect(core.ratingSegmentForDate(open, '1950-01-01', null)).toBeNull();
    expect(core.ratingSegmentForDate(open, '', 100)).toBeNull();
    expect(core.ratingSegmentForDate(undefined, '1950-01-01', 100)).toBeNull();
    expect(core.validCurveDischarge([{ ...open[0], coefficientH0: 2 }], '1950-01-01', 100)).toEqual({ discharge: null, segment: null, validOnDate: null });
  });
});

describe('cross-section profiles', () => {
  const profile = (pairs) => pairs.map(([x, y]) => ({ x, y }));

  it('takes the lower bank as bankfull stage and measures depth from the thalweg', () => {
    const result = core.bankfullFromProfile(profile([[0, 900], [10, 700], [20, 300], [30, 650], [40, 820], [50, 760]]));
    expect(result).toEqual({ thalweg: 300, leftBank: 900, rightBank: 820, bankfull: 820, depth: 520 });
  });

  it('collapses repeated distances to the median elevation and sorts by distance', () => {
    const result = core.bankfullFromProfile(profile([[40, 800], [0, 900], [20, 100], [20, 300], [20, 500], [10, 700], [30, 650]]));
    expect(result.thalweg).toBe(300);
    expect(result.bankfull).toBe(800);
  });

  it('uses the first of equally low vertices as the thalweg', () => {
    const result = core.bankfullFromProfile(profile([[0, 900], [10, 800], [20, 300], [30, 300], [40, 700], [50, 750]]));
    expect(result).toMatchObject({ leftBank: 900, rightBank: 750, bankfull: 750 });
  });

  it('rejects profiles that S3 rejects', () => {
    expect(core.bankfullFromProfile(profile([[0, 900], [10, 300], [20, 800], [30, 850]]))).toBeNull();
    expect(core.bankfullFromProfile(profile([[0, 300], [10, 900], [20, 800], [30, 850], [40, 870]]))).toBeNull();
    expect(core.bankfullFromProfile(profile([[0, 900], [10, 800], [20, 700], [30, 300], [40, 850]]))).toBeNull();
    expect(core.bankfullFromProfile(profile([[0, 500], [10, 500], [20, 500], [30, 500], [40, 500]]))).toBeNull();
    expect(core.bankfullFromProfile([{ x: 0, y: 1 }, { x: null, y: 2 }, { x: 'a', y: 3 }, { x: 1, y: undefined }, null])).toBeNull();
    expect(core.bankfullFromProfile(undefined)).toBeNull();
  });
});

describe('rating-curve segments', () => {
  it('reads the consistency level and segment number from the identifier', () => {
    expect(core.parseRatingSegmentId('13880000__20160109000000__20231231000000__2__01_02__700__2289__1__1__NA__9_9319__0_21__2_2'))
      .toEqual({ consistencyLevel: 2, segment: 1, segments: 2 });
    expect(core.parseRatingSegmentId('x__y__z__1__03_11')).toEqual({ consistencyLevel: 1, segment: 3, segments: 11 });
    expect(core.parseRatingSegmentId(null)).toEqual({ consistencyLevel: null, segment: null, segments: null });
    expect(core.parseRatingSegmentId('a__b__c____bad')).toEqual({ consistencyLevel: null, segment: null, segments: null });
  });

  it('writes the equation with the sign of h0', () => {
    expect(core.ratingEquationParts(9.9319, 0.21, 2.2)).toEqual({ base: 'Q = 9.9319 (H − 0.21)', exponent: '2.2' });
    expect(core.ratingEquationParts(3.0152, -2.04, 2.5)).toEqual({ base: 'Q = 3.0152 (H + 2.04)', exponent: '2.5' });
    expect(core.ratingEquationParts(1, 0, 2, (value) => value.toFixed(1)).base).toBe('Q = 1.0 (H − 0.0)');
  });
});

