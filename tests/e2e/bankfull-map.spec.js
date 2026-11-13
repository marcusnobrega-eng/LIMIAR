import { expect, test } from '@playwright/test';

test.describe('bankfull discharge map', () => {
  test('switches the model layer on and shows its legend', async ({ page }) => {
    const requests = [];
    page.on('request', (request) => {
      if (request.url().includes('/data/bankfull_map/')) requests.push(new URL(request.url()).pathname);
    });
    await page.goto('/?date=2020-01-01&lang=en&guide=0');
    await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
    await expect(page.locator('.legend-bankfull')).toHaveCount(0);

    await page.locator('#layersButton').click();
    await page.locator('[data-layer-visibility="bankfull"]').check();
    await expect(page.locator('.legend-bankfull .legend-subtitle')).toHaveText('Bankfull discharge (m³/s)');
    await expect(page.locator('.legend-bankfull .legend-bar span')).toHaveCount(9, { timeout: 15_000 });
    await expect(page.locator('.legend-bankfull .legend-bar-ticks span')).toHaveCount(8);
    await expect(page.locator('.legend-bankfull .legend-note')).toContainText('82,351 river reaches');
    expect(requests).toContain('/data/bankfull_map/index.json');
    expect(requests).toContain('/data/bankfull_map/tier_ge100k.json');
    expect(requests).not.toContain('/data/bankfull_map/tier_1k_2k.json');

    await page.locator('[data-layer-visibility="bankfull"]').uncheck();
    await expect(page.locator('.legend-bankfull')).toHaveCount(0);
  });
});
