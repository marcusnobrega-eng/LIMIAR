import { expect, test } from '@playwright/test';

test.describe('desktop layout', () => {
  test.skip(({ isMobile }) => isMobile, 'Desktop widths only');

  for (const width of [1280, 1440, 1920]) {
    test(`keeps the station panel inside its column at ${width} px`, async ({ page }) => {
      await page.setViewportSize({ width, height: 900 });
      await page.goto('/?date=2020-01-01&lang=en&station=83250000&guide=0');
      await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA', { timeout: 30_000 });

      const panel = await page.locator('.detail-panel').evaluate((node) => ({
        scrollWidth: node.scrollWidth,
        clientWidth: node.clientWidth,
        right: node.getBoundingClientRect().right,
      }));
      expect(panel.scrollWidth).toBeLessThanOrEqual(panel.clientWidth);
      const exportButton = await page.locator('#exportReportButton').boundingBox();
      expect(exportButton.x + exportButton.width).toBeLessThanOrEqual(panel.right);
    });
  }

  test('keeps the zoom buttons clear of the selected-day card', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?date=2020-01-01&lang=en&station=83250000&guide=0');
    const zoom = page.locator('.leaflet-control-zoom');
    await expect(zoom).toBeVisible({ timeout: 30_000 });
    const zoomBox = await zoom.boundingBox();
    const cardBox = await page.locator('#selectedCard').boundingBox();
    const overlaps = !(zoomBox.x + zoomBox.width < cardBox.x || zoomBox.x > cardBox.x + cardBox.width
      || zoomBox.y + zoomBox.height < cardBox.y || zoomBox.y > cardBox.y + cardBox.height);
    expect(overlaps).toBe(false);
  });
});
