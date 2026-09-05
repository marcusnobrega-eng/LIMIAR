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
