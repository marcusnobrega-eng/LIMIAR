import { expect, test } from '@playwright/test';

test('maximizes a station chart over a blurred background and restores focus', async ({ page }) => {
  await page.goto('/?date=2018-03-01&lang=en&station=13880000&guide=0');
  await expect(page.locator('#stationHeading')).toContainText('CANUTAMA', { timeout: 30_000 });
  const button = page.locator('.chart-maximize[data-chart="timeseriesChart"]');
  await button.scrollIntoViewIfNeeded();
  await expect(page.locator('#timeseriesChart')).toBeVisible();
  await button.click();
  const overlay = page.locator('#chartOverlay');
  await expect(overlay).toBeVisible();
  await expect(page.locator('#chartOverlayTitle')).toHaveText('Primary time series');
  await expect(page.locator('#closeChartButton')).toBeFocused();
  const backdropFilter = await page.locator('#chartOverlay .overlay-backdrop').evaluate((node) => getComputedStyle(node).backdropFilter);
  expect(backdropFilter).toContain('blur');
  const datasetCount = await page.evaluate(() => window.Chart.getChart('chartOverlayCanvas')?.data.datasets.length);
  const pageDatasetCount = await page.evaluate(() => window.Chart.getChart('timeseriesChart')?.data.datasets.length);
  expect(datasetCount).toBe(pageDatasetCount);
  await page.keyboard.press('Tab');
  await expect(page.locator('#closeChartButton')).toBeFocused();
  await page.keyboard.press('Escape');
  await expect(overlay).toBeHidden();
  await expect(button).toBeFocused();
  expect(await page.evaluate(() => window.Chart.getChart('chartOverlayCanvas'))).toBeUndefined();
});

test('maximizes a daily-analysis chart and closes from the backdrop', async ({ page }, testInfo) => {
  await page.goto('/?date=2020-01-01&lang=pt&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2.610', { timeout: 30_000 });
  await page.locator('#dailyAnalysisTabButton').click();
  await expect(page.locator('#dailyConditionsChart')).toBeVisible();
  const button = page.locator('.chart-maximize[data-chart="dailyConditionsChart"]');
  await expect(button).toHaveAttribute('aria-label', 'Ampliar gráfico');
  await button.click();
  await expect(page.locator('#chartOverlay')).toBeVisible();
  const box = await page.locator('#chartOverlay .chart-panel').boundingBox();
  const viewport = page.viewportSize();
  expect(box.width).toBeGreaterThan(viewport.width * 0.85);
  await page.mouse.click(4, viewport.height - 4);
  await expect(page.locator('#chartOverlay')).toBeHidden();
  testInfo.annotations.push({ type: 'size', description: `${Math.round(box.width)}x${Math.round(box.height)}` });
});
