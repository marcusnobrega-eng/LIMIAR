import { expect, test } from '@playwright/test';

test('draws a white, framed plotting area with outward ticks', async ({ page }) => {
  await page.goto('/?date=2018-03-01&lang=en&station=13880000&guide=0');
  await expect(page.locator('#stationHeading')).toContainText('CANUTAMA', { timeout: 30_000 });
  await page.locator('#timeseriesChart').scrollIntoViewIfNeeded();
  await expect(page.locator('#timeseriesChart')).toBeVisible();
  // Charts below the fold are drawn when they scroll into view.
  await expect.poll(() => page.evaluate(() => Boolean(window.Chart.getChart('timeseriesChart')?.chartArea)), { timeout: 10_000 }).toBe(true);
  const result = await page.evaluate(() => {
    const chart = window.Chart.getChart('timeseriesChart');
    const area = chart.chartArea;
    const ratio = chart.currentDevicePixelRatio;
    const pixel = (x, y) => [...chart.ctx.getImageData(Math.round(x * ratio), Math.round(y * ratio), 1, 1).data];
    return {
      inside: pixel(area.left + 3, area.top + 3),
      frameTop: pixel((area.left + area.right) / 2, area.top + 0.5),
      frameRight: pixel(area.right - 0.5, (area.top + area.bottom) / 2),
      ticks: Object.values(chart.options.scales).map((scale) => [scale.grid.drawTicks, scale.grid.tickLength]),
    };
  });
  expect(result.inside).toEqual([255, 255, 255, 255]);
  // The frame is the grey axis colour #8c9a9f, not white.
  for (const edge of [result.frameTop, result.frameRight]) expect(edge[0]).toBeLessThan(200);
  for (const [drawTicks, tickLength] of result.ticks) {
    expect(drawTicks).toBe(true);
    expect(tickLength).toBe(6);
  }
});
