import { expect, test } from '@playwright/test';

const FLOOD_LABEL = 'Flood threshold';

const forecast = {
  station_code: '83250000',
  observed: {
    dates: ['2026-10-08', '2026-10-09', '2026-10-10'],
    stage_cm: [210, 220, 230],
    discharge_m3s: [100, 120, 140],
    source: 'ANA telemetry',
  },
  glofas: {
    issued: '2026-10-10',
    dates: ['2026-10-10', '2026-10-11', '2026-10-12'],
    discharge_m3s: [150, 400, 300],
    flood_levels_m3s: { rp2: 250, rp5: 350, rp20: 500 },
    cell: [-27.4, -49.6],
    area_ratio: 1.01,
    source: 'GloFAS',
  },
  google: null,
};

test('shows the last observed days and the GloFAS forecast when a bundle exists', async ({ page }) => {
  await page.route('**/forecast/stations/83250000.json', (route) => route.fulfill({ json: forecast }));
  await page.goto('/?date=2020-01-01&lang=en&station=83250000');
  const card = page.locator('#forecastCard');
  await expect(card).toBeVisible({ timeout: 30_000 });
  // Charts render when their card scrolls into view.
  await card.scrollIntoViewIfNeeded();
  await expect(page.locator('#forecastSubtitle')).toContainText('raw GloFAS, not scaled to observations');
  await expect(page.locator('#forecastNote a')).toHaveCount(2);
  await expect.poll(() => page.evaluate(() => window.Chart.getChart(document.getElementById('forecastChart'))?.data.labels.length)).toBe(5);
  const lines = (id) => page.evaluate((chartId) => Object.fromEntries(window.Chart.getChart(document.getElementById(chartId)).data.datasets
    .map((dataset) => [dataset.label, dataset.data.filter((value) => value != null).length])), id);
  const discharge = await lines('forecastChart');
  expect(discharge['Observed discharge (ANA telemetry)']).toBe(3);
  expect(discharge['GloFAS forecast (model discharge)']).toBe(3);
  // Only GloFAS's 2-year level is drawn, over the forecast days.
  expect(discharge['GloFAS 2-year']).toBe(3);
  expect(discharge['GloFAS 5-year']).toBeUndefined();
  expect(discharge['Observed stage (ANA telemetry)']).toBeUndefined();

  // Stage has its own chart: observed and forecast stage with LIMIAR's stage thresholds.
  const stageCard = page.locator('#forecastStageCard');
  await expect(stageCard).toBeVisible();
  await stageCard.scrollIntoViewIfNeeded();
  await expect.poll(() => page.evaluate(() => Boolean(window.Chart.getChart(document.getElementById('forecastStageChart'))))).toBe(true);
  const stage = await lines('forecastStageChart');
  expect(stage['Observed stage (ANA telemetry)']).toBe(3);
  expect(stage['Forecast stage (rating curve)']).toBeGreaterThan(0);
  expect(stage[FLOOD_LABEL]).toBe(5);
  expect(stage['Observed discharge (ANA telemetry)']).toBeUndefined();
});

test('draws the scaled forecast with raw GloFAS as a reference and says how it was scaled', async ({ page }) => {
  const scaled = structuredClone(forecast);
  scaled.glofas.scaled = {
    factor: 0.8, n_days: 7, window: ['2026-10-03', '2026-10-09'], status: 'applied', discharge_m3s: [120, 320, 240],
  };
  await page.route('**/forecast/stations/83250000.json', (route) => route.fulfill({ json: scaled }));
  await page.goto('/?date=2020-01-01&lang=en&station=83250000');
  const card = page.locator('#forecastCard');
  await expect(card).toBeVisible({ timeout: 30_000 });
  await card.scrollIntoViewIfNeeded();
  await expect(page.locator('#forecastSubtitle')).toContainText('GloFAS × 0.80 (median of 7 days');
  await expect.poll(() => page.evaluate(() => window.Chart.getChart(document.getElementById('forecastChart'))?.data.datasets.map((dataset) => dataset.label))).toEqual(expect.arrayContaining([
    'Scaled forecast (GloFAS × 0.80)', 'Raw GloFAS', 'GloFAS 2-year × k',
  ]));
  const levels = await page.evaluate(() => window.Chart.getChart(document.getElementById('forecastChart')).data.datasets
    .find((dataset) => dataset.label === 'GloFAS 2-year × k').data.filter((value) => value != null));
  expect(levels).toEqual([200, 200, 200]);
});

test('hides the forecast card when no bundle exists', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=en&station=83250000');
  await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA', { timeout: 30_000 });
  await expect(page.locator('#forecastCard')).toBeHidden();
});
