import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { readZip } from './zip.js';

const POINT_EMU = 12700;
const TEXT_WIDTH_EMU = ((11906 - 2 * 1440) / 20) * POINT_EMU;

async function downloadReport(page, lang) {
  await page.goto(`/?date=2020-01-01&lang=${lang}&station=83250000&guide=0`);
  await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA', { timeout: 30_000 });
  await expect(page.locator('#timeseriesChart')).toBeVisible();
  const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
  await page.locator('#exportReportButton').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe('limiar_station_83250000_2020-01-01.docx');
  return readZip(readFileSync(await download.path()));
}

function partsText(entries, pattern) {
  return [...entries.entries()]
    .filter(([name]) => pattern.test(name))
    .map(([, data]) => data.toString('utf8'))
    .join('\n');
}

test.describe('station report export', () => {
  test.skip(({ isMobile }) => isMobile, 'One browser is sufficient for the report export');
  test.setTimeout(120_000);

  test('uses paper margins, Helvetica, and section headers and footers', async ({ page }) => {
    const entries = await downloadReport(page, 'en');
    const documentXml = entries.get('word/document.xml').toString('utf8');

    const pageMargins = [...documentXml.matchAll(/<w:pgMar [^>]*>/g)].map((match) => match[0]);
    expect(pageMargins).toHaveLength(4);
    for (const margins of pageMargins) {
      for (const side of ['top', 'right', 'bottom', 'left']) expect(margins).toContain(`w:${side}="1440"`);
      expect(margins).toContain('w:header="720"');
      expect(margins).toContain('w:footer="720"');
    }
    expect(documentXml).toMatch(/<w:pgSz w:w="11906" w:h="16838"/);

    expect(documentXml).toContain('w:ascii="Helvetica Light"');
    expect(documentXml).toContain('w:ascii="Helvetica"');
    expect(documentXml).not.toContain('Aptos');

    const tableGrids = [...documentXml.matchAll(/<w:tblGrid>(.*?)<\/w:tblGrid>/g)].map((match) => (
      [...match[1].matchAll(/w:w="(\d+)"/g)].reduce((sum, width) => sum + Number(width[1]), 0)
    ));
    expect(tableGrids.length).toBeGreaterThanOrEqual(3);
    for (const width of tableGrids) expect(width).toBe(11906 - 2 * 1440);

    const headers = partsText(entries, /^word\/header\d+\.xml$/);
    for (const title of ['Station summary', 'Station charts', 'Hydraulic panel and QA', 'All reconstructed station events']) {
      expect(headers).toContain(title);
    }
    const footers = partsText(entries, /^word\/footer\d+\.xml$/);
    expect(footers).toContain('ITUPORANGA (83250000)');
    expect(footers).toContain('PAGE');
    expect(footers).toContain('NUMPAGES');
  });

  test('prints chart text at 16 pt or larger', async ({ page }) => {
    const entries = await downloadReport(page, 'en');
    const documentXml = entries.get('word/document.xml').toString('utf8');

    const extents = [...documentXml.matchAll(/<wp:extent cx="(\d+)" cy="(\d+)"\/>/g)].map((match) => Number(match[1]));
    expect(extents.length).toBeGreaterThan(0);
    for (const width of extents) expect(width).toBeLessThanOrEqual(TEXT_WIDTH_EMU);

    // Charts are drawn at 4 pixels per printed point, so their 16-unit fonts print at 16 pt.
    const chartWidthEmu = 450 * POINT_EMU;
    expect(extents.filter((width) => width === chartWidthEmu).length).toBeGreaterThanOrEqual(1);
    const chartImages = [...entries.entries()]
      .filter(([name]) => /^word\/media\/.+\.png$/.test(name))
      .map(([, data]) => data.readUInt32BE(16))
      .filter((pixelWidth) => pixelWidth === 450 * 4);
    expect(chartImages.length).toBeGreaterThanOrEqual(1);
  });

  test('translates headers and footers in Portuguese', async ({ page }) => {
    const entries = await downloadReport(page, 'pt');
    const headers = partsText(entries, /^word\/header\d+\.xml$/);
    expect(headers).toContain('Resumo da estação');
    expect(headers).toContain('Gráficos da estação');
    const footers = partsText(entries, /^word\/footer\d+\.xml$/);
    expect(footers).toContain('Página');
  });
});
