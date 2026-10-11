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
  await expect(page.locator('#forecastSubtitle')).toContainText('not bias-corrected');
  await expect(page.locator('#forecastNote a')).toHaveCount(2);
  await expect.poll(() => page.evaluate(() => window.Chart.getChart(document.getElementById('forecastChart'))?.data.labels.length)).toBe(5);
  const lines = await page.evaluate(() => Object.fromEntries(window.Chart.getChart(document.getElementById('forecastChart')).data.datasets
    .map((dataset) => [dataset.label, { values: dataset.data.filter((value) => value != null).length, axis: dataset.yAxisID || 'y' }])));
  expect(lines['Observed discharge (ANA telemetry)'].values).toBe(3);
  expect(lines['GloFAS forecast (model discharge)'].values).toBe(3);
  // Only GloFAS's 2-year level is drawn, over the forecast days.
  expect(lines['GloFAS 2-year'].values).toBe(3);
  expect(lines['GloFAS 5-year']).toBeUndefined();
  expect(lines['GloFAS 20-year']).toBeUndefined();
  // A stage station: observed and forecast stage, and LIMIAR's stage thresholds across the chart.
  expect(lines['Observed stage (ANA telemetry)']).toEqual({ values: 3, axis: 'yStage' });
  expect(lines['Forecast stage (rating curve)'].axis).toBe('yStage');
  expect(lines[FLOOD_LABEL]).toEqual({ values: 5, axis: 'yStage' });
});

test('hides the forecast card when no bundle exists', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=en&station=83250000');
  await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA', { timeout: 30_000 });
  await expect(page.locator('#forecastCard')).toBeHidden();
});
