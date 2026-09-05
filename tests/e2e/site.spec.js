import { expect, test } from '@playwright/test';

test('loads a station drilldown and its first chart', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=en&station=83250000');
  await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
  await expect(page.locator('#fatalState')).toBeHidden();
  await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA');
  await expect(page.locator('#timeseriesChart')).toBeVisible();
});

test('steps through dates with the custom timeline controls', async ({ page }) => {
  await page.goto('/?date=2020-01-01&lang=en&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
  await page.locator('#nextDateButton').click();
  await expect(page.locator('#datePicker')).toHaveValue('2020-01-02');
  await expect(page).toHaveURL(/date=2020-01-02/);
});

test('limits the initial station list on a phone and loads more on request', async ({ page }, testInfo) => {
  test.skip(!testInfo.project.name.startsWith('mobile'), 'Mobile behavior only');
  await page.goto('/?date=2020-01-01&lang=en&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
  await expect(page.locator('.station-item')).toHaveCount(60);
  await page.locator('#loadMoreStationsButton').click();
  await expect(page.locator('.station-item')).toHaveCount(120);
  const overflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth);
  expect(overflow).toBeLessThanOrEqual(1);
});

test('shows a clear failure state when the manifest is unavailable', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'One browser is sufficient for the failure path');
  await page.route('**/data/manifest.json', (route) => route.abort());
  await page.goto('/?lang=en&guide=0');
  await expect(page.locator('#fatalState')).toBeVisible();
  await expect(page.locator('#fatalTitle')).toHaveText('LIMIAR failed to load');
});

test('honors reduced-motion preferences', async ({ page }, testInfo) => {
  test.skip(testInfo.project.name.startsWith('mobile'), 'One browser is sufficient for reduced motion');
  await page.emulateMedia({ reducedMotion: 'reduce' });
  await page.goto('/?date=2020-01-01&lang=en&guide=0');
  await expect(page.locator('#statStations')).toHaveText('2,610', { timeout: 30_000 });
  const transitionSeconds = await page.locator('#nextDateButton').evaluate((element) => (
    Number.parseFloat(getComputedStyle(element).transitionDuration)
  ));
  expect(transitionSeconds).toBeLessThanOrEqual(0.001);
});
