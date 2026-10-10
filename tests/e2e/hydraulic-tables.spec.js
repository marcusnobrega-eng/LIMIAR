import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

const station = JSON.parse(readFileSync(new URL('../../data/stations/13880000.json', import.meta.url), 'utf8'));

test.describe('hydraulic tables', () => {
  test.skip(({ isMobile }) => isMobile, 'One browser is sufficient');

  test('lists every rating-curve segment with validity, limits, and equation', async ({ page }) => {
    await page.goto('/?date=2018-03-01&lang=en&station=13880000&guide=0');
    await expect(page.locator('#stationHeading')).toContainText('CANUTAMA', { timeout: 30_000 });
    const rows = page.locator('#ratingTableBody tr');
    await expect(rows).toHaveCount(station.hydraulic.rating_curves.length);
    const segment2016 = rows.filter({ hasText: '700–2,289' });
    await expect(segment2016).toContainText('01/09/2016');
    await expect(segment2016).toContainText('12/31/2023');
    await expect(segment2016).toContainText('1 of 2');
    await expect(segment2016).toContainText('Consisted (2)');
    await expect(segment2016).toContainText('Q = 9.9319 (H − 0.21)2.2');
    await expect(segment2016.locator('sup')).toHaveText('2.2');
  });

  test('lists each survey with thalweg, banks, bankfull stage, and depth', async ({ page }) => {
    await page.goto('/?date=2018-03-01&lang=pt&station=13880000&guide=0');
    await expect(page.locator('#stationHeading')).toContainText('CANUTAMA', { timeout: 30_000 });
    await expect(page.locator('#crossSectionTableTitle')).toHaveText('Levantamentos das seções');
    const rows = page.locator('#crossSectionTableBody tr');
    await expect(rows).toHaveCount(station.hydraulic.cross_sections.length);
    // The first 1997 survey sets the published stage threshold of 2,376 cm.
    const first = rows.first();
    await expect(first.locator('td').nth(0)).toHaveText('14/01/1997');
    await expect(first.locator('td').nth(4)).toHaveText('2.376');
    const cells = await first.locator('td').allTextContents();
    const number = (value) => Number(value.replaceAll('.', '').replace(',', '.'));
    expect(number(cells[5])).toBe(number(cells[4]) - number(cells[1]));
  });
});
