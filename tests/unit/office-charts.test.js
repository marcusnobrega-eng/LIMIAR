import { JSDOM } from 'jsdom';
import { describe, expect, it } from 'vitest';
import * as office from '../../office-charts.js';

const { DOMParser } = new JSDOM('').window;
function parse(xml) {
  const document = new DOMParser().parseFromString(xml, 'application/xml');
  expect(document.getElementsByTagName('parsererror')).toHaveLength(0);
  return document;
}

const timeseries = {
  type: 'line',
  labels: ['2020-01-01', '2020-01-02', '2020-01-03', '2020-01-04'],
  datasets: [
    { label: 'Stage', data: [100, 120, null, 90], borderColor: '#155f78', borderWidth: 2 },
    { label: 'Flood threshold', data: [866, 866, 870, 870], borderColor: '#c54b3c', borderDash: [4, 3], stepped: true, directLabel: true },
    { label: 'Selected date', type: 'scatter', data: [{ x: '2020-01-02', y: 120 }], pointBackgroundColor: '#17272d' },
    { label: 'Discharge', data: [1, 2, 3, 4], yAxisID: 'yDischarge', borderColor: 'rgba(38, 139, 136, 0.55)', borderDash: [2, 4] },
    { label: 'Hidden', data: [1, 1, 1, 1], hidden: true },
    { label: 'Empty', data: [null, null, null, null] },
  ],
  options: {
    scales: {
      x: {},
      y: { title: { display: true, text: 'cm' } },
      yDischarge: { position: 'right', title: { display: true, text: 'Estimated discharge (m³/s)' } },
    },
  },
};

describe('helpers', () => {
  it('converts dates to Excel serial numbers', () => {
    expect(office.excelSerial('1900-01-01')).toBe(2);
    expect(office.excelSerial('2020-01-01')).toBe(43831);
  });

  it('names spreadsheet columns', () => {
    expect([0, 25, 26, 701, 702].map(office.columnName)).toEqual(['A', 'Z', 'AA', 'ZZ', 'AAA']);
  });

  it('parses CSS colours', () => {
    expect(office.parseColor('#155f78')).toEqual({ hex: '155F78', alpha: 1 });
    expect(office.parseColor('#abc')).toEqual({ hex: 'AABBCC', alpha: 1 });
    expect(office.parseColor('rgba(38, 139, 136, 0.55)')).toEqual({ hex: '268B88', alpha: 0.55 });
    expect(office.parseColor('rgb(0, 0, 255)')).toEqual({ hex: '0000FF', alpha: 1 });
    expect(office.parseColor('teal')).toEqual({ hex: '1F5E7A', alpha: 1 });
  });

  it('maps Chart.js dashes to Office dashes', () => {
    expect(office.dashStyle(undefined)).toBe('solid');
    expect(office.dashStyle([])).toBe('solid');
    expect(office.dashStyle([2, 3])).toBe('sysDot');
    expect(office.dashStyle([8, 4])).toBe('dash');
  });

  it('escapes XML', () => {
    expect(office.escapeXml('a < b & "c" > d')).toBe('a &lt; b &amp; &quot;c&quot; &gt; d');
  });

  it('keeps only the corners of a step line', () => {
    expect(office.stepPoints([[1, 10], [2, 10], [3, 20], [4, 20]])).toEqual([[1, 10], [2, 10], [3, 10], [3, 20], [4, 20]]);
    expect(office.stepPoints([[1, 5], [2, null], [3, null], [4, 7]])).toEqual([[1, 5], [2, null], [4, 7]]);
    expect(office.stepPoints([[1, 5]])).toEqual([[1, 5]]);
  });

  it('computes CRC-32', () => {
    expect(office.crc32(new TextEncoder().encode('123456789'))).toBe(0xcbf43926);
  });
});

describe('chart model', () => {
  it('reads a dated Chart.js line chart as a scatter chart with a secondary axis', () => {
    const model = office.chartModelFromChartJs(timeseries);
    expect(model.kind).toBe('scatter');
    expect(model.xAxis).toEqual({ title: '', date: true, log: false });
    expect(model.yAxes.map((axis) => axis.title)).toEqual(['cm', 'Estimated discharge (m³/s)']);
    expect(model.series.map((item) => [item.name, item.chart, item.axis])).toEqual([
      ['Stage', 'line', 0], ['Flood threshold', 'line', 0], ['Selected date', 'markers', 0], ['Discharge', 'line', 1],
    ]);
    expect(model.series[0].points).toEqual([[43831, 100], [43832, 120], [43833, null], [43834, 90]]);
    expect(model.series[1].points).toEqual([[43831, 866], [43832, 866], [43833, 866], [43833, 870], [43834, 870]]);
    expect(model.series[2].points).toEqual([[43832, 120]]);
    expect(model.series[3]).toMatchObject({ color: '268B88', alpha: 0.55, dash: 'sysDot' });
    expect(model.series[0].widthPt).toBe(1.5);
  });

  it('reads numeric x-y and logarithmic charts', () => {
    const model = office.chartModelFromChartJs({
      type: 'line',
      datasets: [{ label: 'Curve', data: [{ x: 10, y: 100 }, { x: 'bad', y: 3 }, { x: 100, y: 200 }], showInLegend: false }],
      options: { scales: { x: { type: 'logarithmic', title: { display: true, text: 'Discharge' } }, y: {} } },
    });
    expect(model).toMatchObject({ kind: 'scatter', xAxis: { title: 'Discharge', date: false, log: true }, yAxes: [{ title: '' }] });
    expect(model.series[0].points).toEqual([[10, 100], [100, 200]]);
    expect(model.series[0].legend).toBe(false);
  });

  it('reads bar charts with category labels', () => {
    const model = office.chartModelFromChartJs({
      type: 'bar',
      labels: [1990, 1991],
      datasets: [
        { label: 'Annual maxima', data: [500, 650], backgroundColor: 'rgba(21, 95, 120, 0.38)' },
        { label: 'Update', type: 'line', showLine: false, data: [null, 650], borderColor: '#268b88' },
      ],
    });
    expect(model.kind).toBe('category');
    expect(model.series.map((item) => item.chart)).toEqual(['bar', 'markers']);
    expect(model.series[0]).toMatchObject({ color: '155F78', alpha: 0.38, points: [['1990', 500], ['1991', 650]] });
  });
});

describe('chart and workbook XML', () => {
  it('writes a well-formed scatter chart with fonts, axes, and legend', () => {
    const model = office.chartModelFromChartJs(timeseries);
    const xml = office.chartXml(model);
    const document = parse(xml);
    expect(document.getElementsByTagName('c:scatterChart')).toHaveLength(2);
    expect(document.getElementsByTagName('c:valAx')).toHaveLength(4);
    expect(xml).toContain('sz="1600"');
    expect(xml).toContain('typeface="Helvetica Light"');
    expect(xml).toContain('formatCode="yyyy-mm-dd"');
    expect(xml).toContain('<c:crosses val="max"/>');
    expect(xml).toContain('LIMIAR!$B$2:$B$5');
    expect(xml).toContain('<a:alpha val="55000"/>');
    expect(xml).toContain('<c:externalData r:id="rId1">');
    expect(xml).toMatch(/<\/c:valAx><c:spPr><a:solidFill><a:srgbClr val="FFFFFF"\/><\/a:solidFill><a:ln w="9525">.*<\/c:spPr><\/c:plotArea>/);
    expect(xml.match(/<c:majorTickMark val="out"\/>/g)).toHaveLength(4);
  });

  it('writes logarithmic axes, hidden legend entries, and category charts', () => {
    const logModel = office.chartModelFromChartJs({
      type: 'line',
      datasets: [
        { label: 'Curve', data: [{ x: 10, y: 1 }, { x: 100, y: 2 }], showInLegend: false },
        { label: 'Q2', data: [{ x: 50, y: 1 }, { x: 50, y: 2 }] },
      ],
      options: { scales: { x: { type: 'logarithmic' }, y: { title: { display: true, text: 'Stage' } } } },
    });
    const logXml = office.chartXml(logModel, { dateFormat: 'yyyy' });
    parse(logXml);
    expect(logXml).toContain('<c:logBase val="10"/>');
    expect(logXml).toContain('<c:legendEntry><c:idx val="0"/><c:delete val="1"/></c:legendEntry>');

    const barModel = office.chartModelFromChartJs({
      type: 'bar',
      labels: ['Jan', 'Feb'],
      datasets: [
        { label: 'Events', data: [3, 1], backgroundColor: '#155f78' },
        { label: 'Line', type: 'line', data: [2, 2], borderColor: '#c54b3c' },
      ],
    });
    const barXml = office.chartXml(barModel);
    const document = parse(barXml);
    expect(document.getElementsByTagName('c:barChart')).toHaveLength(1);
    expect(document.getElementsByTagName('c:lineChart')).toHaveLength(1);
    expect(document.getElementsByTagName('c:catAx')).toHaveLength(1);
    expect(barXml).toContain('<c:crossBetween val="between"/>');
    expect(office.chartXml({ ...barModel, series: [barModel.series[0]] })).not.toContain('c:lineChart');
    expect(office.chartXml({ ...barModel, series: [barModel.series[1]] })).not.toContain('c:barChart');
  });

  it('writes the data to a workbook with dates and text headers', () => {
    const parts = office.workbookParts(office.chartModelFromChartJs(timeseries));
    Object.values(parts).forEach(parse);
    const sheet = parts['xl/worksheets/sheet1.xml'];
    expect(sheet).toContain('<c r="A1" t="inlineStr"><is><t>Stage (x)</t></is></c>');
    expect(sheet).toContain('<c r="A2" s="1"><v>43831</v></c>');
    expect(sheet).not.toContain('<c r="B4"');
    const categoryParts = office.workbookParts(office.chartModelFromChartJs({ type: 'bar', labels: ['Jan'], datasets: [{ label: 'n', data: [2] }] }));
    expect(categoryParts['xl/worksheets/sheet1.xml']).toContain('<c r="A2" t="inlineStr"><is><t>Jan</t></is></c>');
    expect(office.worksheetColumns({ kind: 'category', series: [], xAxis: {} })).toEqual([{ header: '', values: [], text: true }]);
  });
});

describe('ZIP packages', () => {
  it('round-trips files through the writer and reader', async () => {
    const blob = await office.writeZip({ 'a.txt': 'hello', 'dir/b.bin': new Uint8Array([1, 2, 3]) });
    const entries = await office.readZip(await blob.arrayBuffer());
    expect(new TextDecoder().decode(entries.get('a.txt'))).toBe('hello');
    expect([...entries.get('dir/b.bin')]).toEqual([1, 2, 3]);
    await expect(office.readZip(new Uint8Array(30))).rejects.toThrow('Not a ZIP archive');
  });

  it('replaces placeholders with native charts and embedded workbooks', async () => {
    const placeholder = office.chartPlaceholder(1);
    const docx = await office.writeZip({
      '[Content_Types].xml': '<?xml version="1.0"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"></Types>',
      'word/document.xml': `<w:document xmlns:w="w" xmlns:wp="wp" xmlns:r="r"><w:body><w:p><w:r><w:t>before</w:t></w:r></w:p><w:p w:rsidR="1"><w:r><w:t>${placeholder}</w:t></w:r></w:p></w:body></w:document>`,
      'word/_rels/document.xml.rels': '<Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"></Relationships>',
    });
    const model = office.chartModelFromChartJs(timeseries);
    const result = await office.injectNativeCharts(await docx.arrayBuffer(), [{ index: 1, model, widthEmu: 5715000, heightEmu: 3683000, title: 'Stage & thresholds' }]);
    const entries = await office.readZip(await result.arrayBuffer());
    const text = (name) => new TextDecoder().decode(entries.get(name));
    expect([...entries.keys()][0]).toBe('[Content_Types].xml');
    expect(text('word/document.xml')).not.toContain(placeholder);
    expect(text('word/document.xml')).toContain('<c:chart xmlns:c="http://schemas.openxmlformats.org/drawingml/2006/chart"');
    expect(text('word/document.xml')).toContain('descr="Stage &amp; thresholds"');
    expect(text('word/document.xml')).toContain('<w:t>before</w:t>');
    expect(text('word/_rels/document.xml.rels')).toContain('Target="charts/chart1.xml"');
    expect(text('[Content_Types].xml')).toContain('Extension="xlsx"');
    expect(text('[Content_Types].xml')).toContain('/word/charts/chart1.xml');
    expect(text('word/charts/_rels/chart1.xml.rels')).toContain('../embeddings/Microsoft_Excel_Worksheet1.xlsx');
    const workbook = await office.readZip(entries.get('word/embeddings/Microsoft_Excel_Worksheet1.xlsx'));
    expect(new TextDecoder().decode(workbook.get('xl/worksheets/sheet1.xml'))).toContain('Stage (x)');
    await expect(office.injectNativeCharts(await docx.arrayBuffer(), [{ index: 2, model, widthEmu: 1, heightEmu: 1, title: '' }])).rejects.toThrow('placeholder');
  });
});
