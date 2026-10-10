import { readFileSync } from 'node:fs';
import { expect, test } from '@playwright/test';
import { readZip } from './zip.js';

const TEXT_WIDTH_EMU = ((11906 - 2 * 1440) / 20) * 12700;

async function downloadReport(page, lang, date = '2020-01-01') {
  await page.goto(`/?date=${date}&lang=${lang}&station=83250000&guide=0`);
  await expect(page.locator('#stationHeading')).toContainText('ITUPORANGA', { timeout: 30_000 });
  await expect(page.locator('#timeseriesChart')).toBeVisible();
  const downloadPromise = page.waitForEvent('download', { timeout: 60_000 });
  await page.locator('#exportReportButton').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toBe(`limiar_station_83250000_ITUPORANGA_${date}.docx`);
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
    expect(pageMargins).toHaveLength(5);
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
    for (const title of ['Station summary', 'Station charts', 'Hydraulic panel and QA', 'All reconstructed station events', 'Methods and uncertainty']) {
      expect(headers).toContain(title);
    }
    const footers = partsText(entries, /^word\/footer\d+\.xml$/);
    expect(footers).toContain('ITUPORANGA (83250000)');
    expect(footers).toContain('PAGE');
    expect(footers).toContain('NUMPAGES');
  });

  test('ends with a methods section that uses Word equations', async ({ page }) => {
    const entries = await downloadReport(page, 'en');
    const documentXml = entries.get('word/document.xml').toString('utf8');
    expect(documentXml.match(/<m:oMath>/g)).toHaveLength(4);
    expect(documentXml).toContain('two-year return discharge');
    expect(documentXml).toContain('is not a warning service');
    const methodsStart = documentXml.lastIndexOf('Methods and uncertainty');
    expect(methodsStart).toBeGreaterThan(documentXml.indexOf('All reconstructed station events'));
  });

  test('mentions the discharge axis exactly when the chart draws it', async ({ page }) => {
    for (const date of ['2020-01-01', '2011-09-09', '1935-06-01']) {
      const documentXml = (await downloadReport(page, 'en', date)).get('word/document.xml').toString('utf8');
      const hasAxis = await page.evaluate(() => Boolean(window.Chart.getChart('timeseriesChart')?.scales?.yDischarge));
      expect(documentXml.includes('The right axis shows discharge'), date).toBe(hasAxis);
    }
  });

  test('embeds native, editable Word charts with 16 pt text and their data', async ({ page }) => {
    const entries = await downloadReport(page, 'en');
    const documentXml = entries.get('word/document.xml').toString('utf8');
    const contentTypes = entries.get('[Content_Types].xml').toString('utf8');
    const relationships = entries.get('word/_rels/document.xml.rels').toString('utf8');
    const charts = [...entries.keys()].filter((name) => /^word\/charts\/chart\d+\.xml$/.test(name));

    // Three time-series windows plus the five other station charts.
    expect(charts.length).toBe(8);
    expect(documentXml).not.toContain('[[LIMIAR_CHART_');
    for (const window of ['30 days around the selected date', '90 days around the selected date', 'full record']) {
      expect(documentXml).toContain(`Primary time series · ${window}`);
    }
    expect(documentXml).toContain('These are native Word charts.');

    for (const name of charts) {
      const index = name.match(/chart(\d+)\.xml$/)[1];
      const chartXml = entries.get(name).toString('utf8');
      expect(chartXml).toContain('<c:chartSpace');
      expect(chartXml).toContain('sz="1600"');
      expect(chartXml).toContain('typeface="Helvetica Light"');
      expect(contentTypes).toContain(`/word/charts/chart${index}.xml`);
      expect(relationships).toContain(`Target="charts/chart${index}.xml"`);
      const workbook = readZip(entries.get(`word/embeddings/Microsoft_Excel_Worksheet${index}.xlsx`));
      expect(workbook.get('xl/worksheets/sheet1.xml').toString('utf8')).toContain('<sheetData><row r="1">');
    }

    const extents = [...documentXml.matchAll(/<wp:extent cx="(\d+)" cy="(\d+)"\/>/g)].map((match) => Number(match[1]));
    for (const width of extents) expect(width).toBeLessThanOrEqual(TEXT_WIDTH_EMU);
    const ids = [...documentXml.matchAll(/<wp:docPr id="(\d+)"/g)].map((match) => match[1]);
    const chartIds = ids.filter((id) => Number(id) >= 5000);
    expect(chartIds).toHaveLength(8);
    expect(new Set(chartIds).size).toBe(8);
  });

  test('translates headers and footers in Portuguese', async ({ page }) => {
    const entries = await downloadReport(page, 'pt');
    const headers = partsText(entries, /^word\/header\d+\.xml$/);
    expect(headers).toContain('Resumo da estação');
    expect(headers).toContain('Gráficos da estação');
    expect(headers).toContain('Métodos e incerteza');
    const footers = partsText(entries, /^word\/footer\d+\.xml$/);
    expect(footers).toContain('Página');
  });
});
