import { expect, test } from '@playwright/test';

test.describe('timeline dock', () => {
  test.skip(({ isMobile }) => isMobile, 'The dock is shown on desktop widths only');

  test('moves by day in the window and by month in the full record', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?date=2020-01-01&lang=en&guide=0');
    await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
    await expect(page.locator('#timelineSelected')).toHaveText('Jan 01, 2020');
    const firstMonth = await page.locator('#timelineMonths span').first().textContent();

    await page.locator('#timelineDetail').focus();
    await page.keyboard.press('ArrowRight');
    await expect(page).toHaveURL(/date=2020-01-02/);
    await expect(page.locator('#datePicker')).toHaveValue('2020-01-02');
    await expect(page.locator('#timelineMonths span').first()).toHaveText(firstMonth);

    await page.locator('#timelineOverview').focus();
    await page.keyboard.press('ArrowLeft');
    await expect(page).toHaveURL(/date=2019-12-02/);
    await page.keyboard.press('PageUp');
    await expect(page).toHaveURL(/date=2020-12-02/);
  });

  test('re-centres the window when the date leaves it', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?date=2020-01-01&lang=en&guide=0');
    await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
    await page.locator('#datePicker').fill('1990-06-15');
    await page.locator('#datePicker').dispatchEvent('change');
    await expect(page.locator('#timelineSelected')).toHaveText('Jun 15, 1990');
    await expect(page.locator('#timelineMonths .is-year')).toHaveText('1990');
  });

  test('keeps the dock below the map', async ({ page }) => {
    await page.setViewportSize({ width: 1440, height: 900 });
    await page.goto('/?date=2020-01-01&lang=en&guide=0');
    await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
    const mapBox = await page.locator('#map').boundingBox();
    const dockBox = await page.locator('#timelineDock').boundingBox();
    expect(dockBox.y).toBeGreaterThanOrEqual(mapBox.y + mapBox.height - 1);
    expect(dockBox.y + dockBox.height).toBeLessThanOrEqual(901);
  });
});
