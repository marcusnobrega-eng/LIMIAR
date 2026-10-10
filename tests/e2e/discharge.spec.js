import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';

async function openStation(page, date) {
  await page.goto(`/?date=${date}&lang=en&station=13880000&guide=0`);
  await expect(page.locator('#stationHeading')).toContainText('CANUTAMA', { timeout: 30_000 });
  await page.locator('#timeseriesChart').scrollIntoViewIfNeeded();
  await expect(page.locator('#timeseriesChart')).toBeVisible();
}

async function dailyCsv(page) {
  const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
  await page.locator('#exportTimeseriesCsvButton').click();
  const download = await downloadPromise;
  // Every value is quoted, so split on the quote-comma-quote boundary.
  const parse = (line) => line.slice(1, -1).split('","').map((value) => value.replaceAll('""', '"'));
  const [header, ...rows] = readFileSync(await download.path(), 'utf8').trim().split(/\r?\n/).map(parse);
  return { header, rows };
}

test.describe('estimated discharge at stage stations', () => {
  test.skip(({ isMobile }) => isMobile, 'One browser is sufficient');

  test('shows no discharge where no rating curve is valid (Canutama, 1976)', async ({ page }) => {
    await openStation(page, '1976-02-27');
    await expect(page.locator('#timeseriesSubtitle')).toContainText('no rating curve valid for this period');
    const { header, rows } = await dailyCsv(page);
    const discharge = header.indexOf('estimated_discharge_m3s');
    expect(discharge).toBeGreaterThan(-1);
    expect(header).toContain('rating_curve_segment_id');
    expect(header).not.toContain('estimated_discharge_latest_curve_m3s');
    const row1976 = rows.find((row) => row[0] === '1976-02-27');
    expect(row1976[discharge]).toBe('');
  });

  test('uses the segment valid on each date, including the lower stage range', async ({ page }) => {
    await openStation(page, '2018-03-01');
    await expect(page.locator('#timeseriesSubtitle')).not.toContainText('no rating curve valid');
    const { header, rows } = await dailyCsv(page);
    const stage = header.indexOf('observed_value');
    const discharge = header.indexOf('estimated_discharge_m3s');
    const segment = header.indexOf('rating_curve_segment_id');
    const checked = rows.filter((row) => row[0] >= '2016-01-09' && row[0] <= '2023-12-31' && row[stage] !== '' && row[discharge] !== '');
    expect(checked.length).toBeGreaterThan(100);
    for (const row of checked.slice(0, 200)) {
      const stageM = Number(row[stage]) / 100;
      const expected = Number(row[stage]) <= 2289 ? 9.9319 * (stageM - 0.21) ** 2.2 : 93.1542 * (stageM - 8.14) ** 1.72;
      expect(Number(row[discharge])).toBeCloseTo(expected, 3);
      expect(row[segment]).toContain('20160109');
    }
    expect(rows.some((row) => row[0] < '1997-01-01' && row[discharge] !== '')).toBe(false);
  });
});
