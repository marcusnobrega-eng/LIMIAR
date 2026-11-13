// Native, editable Word charts for the station report. The docx library cannot create
// charts, so the report is built with placeholders and this module adds DrawingML chart
// parts, each with an embedded Excel workbook holding its data.

const NS = {
  c: 'http://schemas.openxmlformats.org/drawingml/2006/chart',
  a: 'http://schemas.openxmlformats.org/drawingml/2006/main',
  r: 'http://schemas.openxmlformats.org/officeDocument/2006/relationships',
  sheet: 'http://schemas.openxmlformats.org/spreadsheetml/2006/main',
};

const SHEET = 'LIMIAR';
const EXCEL_EPOCH = Date.UTC(1899, 11, 30);
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

export function escapeXml(value) {
  return String(value)
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;');
}

// Excel stores dates as days since 1899-12-30.
export function excelSerial(dateString) {
  return Math.round((Date.parse(`${dateString}T00:00:00Z`) - EXCEL_EPOCH) / 86400000);
}

export function columnName(index) {
  let name = '';
  for (let value = index + 1; value > 0; value = Math.floor((value - 1) / 26)) {
    name = String.fromCharCode(65 + ((value - 1) % 26)) + name;
  }
  return name;
}

export function parseColor(css) {
  const value = String(css || '').trim();
  const hex = value.match(/^#([0-9a-f]{3}|[0-9a-f]{6})$/i);
  if (hex) {
    const digits = hex[1].length === 3 ? hex[1].replace(/./g, (digit) => digit + digit) : hex[1];
    return { hex: digits.toUpperCase(), alpha: 1 };
  }
  const rgb = value.match(/^rgba?\(\s*([\d.]+)\s*,\s*([\d.]+)\s*,\s*([\d.]+)\s*(?:,\s*([\d.]+)\s*)?\)$/i);
  if (rgb) {
    const channel = (number) => Math.round(Number(number)).toString(16).padStart(2, '0');
    return { hex: `${channel(rgb[1])}${channel(rgb[2])}${channel(rgb[3])}`.toUpperCase(), alpha: rgb[4] == null ? 1 : Number(rgb[4]) };
  }
  return { hex: '1F5E7A', alpha: 1 };
}

export function dashStyle(borderDash) {
  if (!Array.isArray(borderDash) || !borderDash.length) return 'solid';
  return borderDash[0] <= 2 ? 'sysDot' : 'dash';
}

// Keeps only the corners of a step line, so a threshold constant for years needs two points.
export function stepPoints(points) {
  const result = [];
  points.forEach(([x, y], index) => {
    const previous = points[index - 1];
    if (y == null) {
      if (result.length && result.at(-1)[1] != null) result.push([x, null]);
      return;
    }
    if (!previous || previous[1] == null) {
      result.push([x, y]);
    } else if (y !== previous[1]) {
      result.push([x, previous[1]], [x, y]);
    }
    if (index === points.length - 1 || points[index + 1]?.[1] !== y) {
      if (result.at(-1)[0] !== x) result.push([x, y]);
    }
  });
  return result;
}

function finiteOrNull(value) {
  const number = Number(value);
  return value == null || value === '' || !Number.isFinite(number) ? null : number;
}

/**
 * Turns a Chart.js chart (its data and options) into a chart model.
 * `scatter` charts have numeric or date x values; `category` charts have category labels.
 */
export function chartModelFromChartJs({ type, labels = [], datasets = [], options = {} }) {
  const datasetPoints = datasets.map((dataset) => dataset.data || []);
  const hasPointObjects = datasetPoints.some((data) => data.some((item) => item && typeof item === 'object'));
  const labelsAreDates = labels.length > 0 && labels.every((label) => ISO_DATE.test(String(label)));
  const kind = type === 'bar' || (!hasPointObjects && !labelsAreDates) ? 'category' : 'scatter';
  const xScale = options.scales?.x || {};
  const firstObjectX = datasetPoints.flat().find((item) => item && typeof item === 'object')?.x;
  const xIsDate = kind === 'scatter' && (labelsAreDates || ISO_DATE.test(String(firstObjectX)));
  const toX = (value) => (xIsDate ? excelSerial(String(value)) : finiteOrNull(value));
  const axisIds = Object.keys(options.scales || {}).filter((key) => key !== 'x');
  const secondaryId = axisIds.find((key) => key !== 'y' && options.scales[key]?.position === 'right');

  const series = datasets
    .filter((dataset) => !dataset.hidden)
    .map((dataset) => {
      const seriesType = dataset.type || type;
      const color = parseColor(seriesType === 'bar' ? dataset.backgroundColor || dataset.borderColor : dataset.borderColor);
      const markersOnly = seriesType === 'scatter' || dataset.showLine === false;
      let points;
      if (kind === 'scatter') {
        points = (dataset.data || []).map((item, index) => (
          item && typeof item === 'object'
            ? [toX(item.x), finiteOrNull(item.y)]
            : [toX(labels[index]), finiteOrNull(item)]
        )).filter(([x]) => x != null);
        if (dataset.stepped) points = stepPoints(points);
      } else {
        points = labels.map((label, index) => [String(label), finiteOrNull(dataset.data?.[index])]);
      }
      return {
        name: String(dataset.label || ''),
        chart: seriesType === 'bar' ? 'bar' : (markersOnly ? 'markers' : 'line'),
        axis: secondaryId && dataset.yAxisID === secondaryId ? 1 : 0,
        color: color.hex,
        alpha: color.alpha,
        dash: dashStyle(dataset.borderDash),
        widthPt: Math.max(0.75, Number(dataset.borderWidth || 1.5) * 0.75),
        markerColor: parseColor(dataset.pointBackgroundColor || dataset.borderColor).hex,
        legend: dataset.showInLegend !== false,
        points,
      };
    })
    .filter((item) => item.points.some(([, y]) => y != null));

  return {
    kind,
    xAxis: {
      title: xScale.title?.display ? String(xScale.title.text || '') : '',
      date: xIsDate,
      log: xScale.type === 'logarithmic',
    },
    yAxes: [
      { title: options.scales?.y?.title?.display ? String(options.scales.y.title.text || '') : '' },
      ...(secondaryId ? [{ title: options.scales[secondaryId]?.title?.text ? String(options.scales[secondaryId].title.text) : '' }] : []),
    ],
    series,
  };
}

// Columns of the embedded worksheet: [x, y] per series for scatter charts, or one category
// column followed by one value column per series for category charts.
export function worksheetColumns(model) {
  if (model.kind === 'category') {
    const categories = model.series[0]?.points.map(([label]) => label) || [];
    return [
      { header: '', values: categories, text: true },
      ...model.series.map((item) => ({ header: item.name, values: item.points.map(([, y]) => y) })),
    ];
  }
  return model.series.flatMap((item) => [
    { header: `${item.name} (x)`, values: item.points.map(([x]) => x), date: model.xAxis.date },
    { header: item.name, values: item.points.map(([, y]) => y) },
  ]);
}

function range(column, rows) {
  const name = columnName(column);
  return `${SHEET}!$${name}$2:$${name}$${rows + 1}`;
}

function numberCache(values, formatCode = 'General') {
  const points = values
    .map((value, index) => (value == null ? '' : `<c:pt idx="${index}"><c:v>${value}</c:v></c:pt>`))
    .join('');
  return `<c:numCache><c:formatCode>${escapeXml(formatCode)}</c:formatCode><c:ptCount val="${values.length}"/>${points}</c:numCache>`;
}

function textRun(text, { size, bold, font }) {
  return `<a:r><a:rPr lang="en-US" sz="${size * 100}" b="${bold ? 1 : 0}"><a:latin typeface="${escapeXml(font)}"/></a:rPr><a:t>${escapeXml(text)}</a:t></a:r>`;
}

function axisTitle(text, typography, vertical) {
  if (!text) return '';
  return `<c:title><c:tx><c:rich><a:bodyPr${vertical ? ' rot="-5400000" vert="horz"' : ''}/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${typography.size * 100}" b="1"/></a:pPr>${textRun(text, { ...typography, bold: true, font: typography.boldFont })}</a:p></c:rich></c:tx><c:overlay val="0"/></c:title>`;
}

function lineProperties(item, { noLine = false } = {}) {
  if (noLine) return '<c:spPr><a:ln><a:noFill/></a:ln></c:spPr>';
  const alpha = item.alpha < 1 ? `<a:alpha val="${Math.round(item.alpha * 100000)}"/>` : '';
  return `<c:spPr><a:ln w="${Math.round(item.widthPt * 12700)}" cap="rnd"><a:solidFill><a:srgbClr val="${item.color}">${alpha}</a:srgbClr></a:solidFill><a:prstDash val="${item.dash}"/><a:round/></a:ln></c:spPr>`;
}

function marker(item) {
  if (item.chart !== 'markers') return '<c:marker><c:symbol val="none"/></c:marker>';
  return `<c:marker><c:symbol val="circle"/><c:size val="7"/><c:spPr><a:solidFill><a:srgbClr val="${item.markerColor}"/></a:solidFill><a:ln w="12700"><a:solidFill><a:srgbClr val="${item.color}"/></a:solidFill></a:ln></c:spPr></c:marker>`;
}

function seriesName(column, name) {
  return `<c:tx><c:strRef><c:f>${SHEET}!$${columnName(column)}$1</c:f><c:strCache><c:ptCount val="1"/><c:pt idx="0"><c:v>${escapeXml(name)}</c:v></c:pt></c:strCache></c:strRef></c:tx>`;
}

function valueAxis({ id, crossId, position, title, typography, hidden = false, log = false, date = false, dateFormat, crossesMax = false, gridlines = false }) {
  return `<c:valAx><c:axId val="${id}"/><c:scaling>${log ? '<c:logBase val="10"/>' : ''}<c:orientation val="minMax"/></c:scaling><c:delete val="${hidden ? 1 : 0}"/><c:axPos val="${position}"/>${gridlines ? '<c:majorGridlines><c:spPr><a:ln w="6350"><a:solidFill><a:srgbClr val="D9DEDC"/></a:solidFill></a:ln></c:spPr></c:majorGridlines>' : ''}${axisTitle(title, typography, position === 'l' || position === 'r')}<c:numFmt formatCode="${escapeXml(date ? dateFormat : 'General')}" sourceLinked="0"/><c:majorTickMark val="out"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/><c:spPr><a:ln w="9525"><a:solidFill><a:srgbClr val="8C9A9F"/></a:solidFill></a:ln></c:spPr><c:crossAx val="${crossId}"/><c:crosses val="${crossesMax ? 'max' : 'autoZero'}"/><c:crossBetween val="midCat"/></c:valAx>`;
}

function legendXml(model) {
  const hidden = model.series
    .map((item, index) => (item.legend ? '' : `<c:legendEntry><c:idx val="${index}"/><c:delete val="1"/></c:legendEntry>`))
    .join('');
  return `<c:legend><c:legendPos val="b"/>${hidden}<c:overlay val="0"/></c:legend>`;
}

function scatterPlot(model, columns, typography, dateFormat) {
  const rows = Math.max(1, ...columns.map((column) => column.values.length));
  const groups = [0, 1].map((axis) => model.series
    .map((item, index) => ({ item, index }))
    .filter(({ item }) => item.axis === axis));
  const plots = groups.map((members, axis) => {
    if (!members.length) return '';
    const series = members.map(({ item, index }) => {
      const xColumn = index * 2;
      const yColumn = xColumn + 1;
      const xValues = columns[xColumn].values;
      const yValues = columns[yColumn].values;
      return `<c:ser><c:idx val="${index}"/><c:order val="${index}"/>${seriesName(yColumn, item.name)}${lineProperties(item, { noLine: item.chart === 'markers' })}${marker(item)}<c:xVal><c:numRef><c:f>${range(xColumn, xValues.length)}</c:f>${numberCache(xValues, model.xAxis.date ? dateFormat : 'General')}</c:numRef></c:xVal><c:yVal><c:numRef><c:f>${range(yColumn, yValues.length)}</c:f>${numberCache(yValues)}</c:numRef></c:yVal><c:smooth val="0"/></c:ser>`;
    }).join('');
    const ids = axis === 0 ? [101, 102] : [103, 104];
    return `<c:scatterChart><c:scatterStyle val="lineMarker"/><c:varyColors val="0"/>${series}<c:axId val="${ids[0]}"/><c:axId val="${ids[1]}"/></c:scatterChart>`;
  }).join('');
  const axes = [
    valueAxis({ id: 101, crossId: 102, position: 'b', title: model.xAxis.title, typography, log: model.xAxis.log, date: model.xAxis.date, dateFormat }),
    valueAxis({ id: 102, crossId: 101, position: 'l', title: model.yAxes[0]?.title, typography, gridlines: true }),
    ...(groups[1].length ? [
      valueAxis({ id: 103, crossId: 104, position: 'b', typography, hidden: true, date: model.xAxis.date, dateFormat }),
      valueAxis({ id: 104, crossId: 103, position: 'r', title: model.yAxes[1]?.title, typography, crossesMax: true }),
    ] : []),
  ].join('');
  return { plots, axes, rows };
}

function categoryPlot(model, columns, typography) {
  const rows = columns[0].values.length;
  const categoryRef = `<c:cat><c:strRef><c:f>${range(0, rows)}</c:f><c:strCache><c:ptCount val="${rows}"/>${columns[0].values.map((value, index) => `<c:pt idx="${index}"><c:v>${escapeXml(value)}</c:v></c:pt>`).join('')}</c:strCache></c:strRef></c:cat>`;
  const seriesXml = (item, index) => {
    const column = index + 1;
    const values = `<c:val><c:numRef><c:f>${range(column, rows)}</c:f>${numberCache(columns[column].values)}</c:numRef></c:val>`;
    if (item.chart === 'bar') {
      const alpha = item.alpha < 1 ? `<a:alpha val="${Math.round(item.alpha * 100000)}"/>` : '';
      return `<c:ser><c:idx val="${index}"/><c:order val="${index}"/>${seriesName(column, item.name)}<c:spPr><a:solidFill><a:srgbClr val="${item.color}">${alpha}</a:srgbClr></a:solidFill><a:ln><a:noFill/></a:ln></c:spPr><c:invertIfNegative val="0"/>${categoryRef}${values}</c:ser>`;
    }
    return `<c:ser><c:idx val="${index}"/><c:order val="${index}"/>${seriesName(column, item.name)}${lineProperties(item, { noLine: item.chart === 'markers' })}${marker(item)}${categoryRef}${values}<c:smooth val="0"/></c:ser>`;
  };
  const indexed = model.series.map((item, index) => ({ item, index }));
  const bars = indexed.filter(({ item }) => item.chart === 'bar').map(({ item, index }) => seriesXml(item, index)).join('');
  const lines = indexed.filter(({ item }) => item.chart !== 'bar').map(({ item, index }) => seriesXml(item, index)).join('');
  const plots = `${bars ? `<c:barChart><c:barDir val="col"/><c:grouping val="clustered"/><c:varyColors val="0"/>${bars}<c:gapWidth val="60"/><c:axId val="101"/><c:axId val="102"/></c:barChart>` : ''}${lines ? `<c:lineChart><c:grouping val="standard"/><c:varyColors val="0"/>${lines}<c:marker val="1"/><c:axId val="101"/><c:axId val="102"/></c:lineChart>` : ''}`;
  const axes = `<c:catAx><c:axId val="101"/><c:scaling><c:orientation val="minMax"/></c:scaling><c:delete val="0"/><c:axPos val="b"/>${axisTitle(model.xAxis.title, typography, false)}<c:numFmt formatCode="General" sourceLinked="0"/><c:majorTickMark val="out"/><c:minorTickMark val="none"/><c:tickLblPos val="low"/><c:crossAx val="102"/><c:crosses val="autoZero"/><c:auto val="1"/><c:lblAlgn val="ctr"/><c:lblOffset val="100"/><c:noMultiLvlLbl val="0"/></c:catAx>${valueAxis({ id: 102, crossId: 101, position: 'l', title: model.yAxes[0]?.title, typography, gridlines: true }).replace('<c:crossBetween val="midCat"/>', '<c:crossBetween val="between"/>')}`;
  return { plots, axes, rows };
}

/** Builds word/charts/chartN.xml for a chart model. */
export function chartXml(model, { font = 'Helvetica Light', boldFont = 'Helvetica', size = 16, dateFormat = 'yyyy-mm-dd', lang = 'en-US' } = {}) {
  const typography = { font, boldFont, size };
  const columns = worksheetColumns(model);
  const { plots, axes } = model.kind === 'category'
    ? categoryPlot(model, columns, typography)
    : scatterPlot(model, columns, typography, dateFormat);
  return `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><c:chartSpace xmlns:c="${NS.c}" xmlns:a="${NS.a}" xmlns:r="${NS.r}"><c:date1904 val="0"/><c:lang val="${lang}"/><c:roundedCorners val="0"/><c:chart><c:autoTitleDeleted val="1"/><c:plotArea><c:layout/>${plots}${axes}</c:plotArea>${legendXml(model)}<c:plotVisOnly val="1"/><c:dispBlanksAs val="gap"/></c:chart><c:spPr><a:noFill/><a:ln><a:noFill/></a:ln></c:spPr><c:txPr><a:bodyPr/><a:lstStyle/><a:p><a:pPr><a:defRPr sz="${size * 100}"><a:solidFill><a:srgbClr val="24323A"/></a:solidFill><a:latin typeface="${escapeXml(font)}"/></a:defRPr></a:pPr><a:endParaRPr lang="${lang}"/></a:p></c:txPr><c:externalData r:id="rId1"><c:autoUpdate val="0"/></c:externalData></c:chartSpace>`;
}

/** The parts of the embedded .xlsx workbook that holds a chart's data. */
export function workbookParts(model) {
  const columns = worksheetColumns(model);
  const rows = Math.max(0, ...columns.map((column) => column.values.length));
  const cell = (column, row, value, isText, isDate) => {
    const ref = `${columnName(column)}${row}`;
    if (value == null || value === '') return '';
    if (isText) return `<c r="${ref}" t="inlineStr"><is><t>${escapeXml(value)}</t></is></c>`;
    return `<c r="${ref}"${isDate ? ' s="1"' : ''}><v>${value}</v></c>`;
  };
  const header = `<row r="1">${columns.map((column, index) => cell(index, 1, column.header, true)).join('')}</row>`;
  const body = Array.from({ length: rows }, (_, row) => (
    `<row r="${row + 2}">${columns.map((column, index) => cell(index, row + 2, column.values[row], column.text, column.date)).join('')}</row>`
  )).join('');
  return {
    '[Content_Types].xml': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Types xmlns="http://schemas.openxmlformats.org/package/2006/content-types"><Default Extension="rels" ContentType="application/vnd.openxmlformats-package.relationships+xml"/><Default Extension="xml" ContentType="application/xml"/><Override PartName="/xl/workbook.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet.main+xml"/><Override PartName="/xl/worksheets/sheet1.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.worksheet+xml"/><Override PartName="/xl/styles.xml" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.styles+xml"/></Types>',
    '_rels/.rels': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/officeDocument" Target="xl/workbook.xml"/></Relationships>',
    'xl/workbook.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><workbook xmlns="${NS.sheet}" xmlns:r="${NS.r}"><sheets><sheet name="${SHEET}" sheetId="1" r:id="rId1"/></sheets></workbook>`,
    'xl/_rels/workbook.xml.rels': '<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/worksheet" Target="worksheets/sheet1.xml"/><Relationship Id="rId2" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/styles" Target="styles.xml"/></Relationships>',
    'xl/styles.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><styleSheet xmlns="${NS.sheet}"><numFmts count="1"><numFmt numFmtId="164" formatCode="yyyy-mm-dd"/></numFmts><fonts count="1"><font><sz val="11"/><name val="Calibri"/></font></fonts><fills count="2"><fill><patternFill patternType="none"/></fill><fill><patternFill patternType="gray125"/></fill></fills><borders count="1"><border><left/><right/><top/><bottom/><diagonal/></border></borders><cellStyleXfs count="1"><xf numFmtId="0" fontId="0" fillId="0" borderId="0"/></cellStyleXfs><cellXfs count="2"><xf numFmtId="0" fontId="0" fillId="0" borderId="0" xfId="0"/><xf numFmtId="164" fontId="0" fillId="0" borderId="0" xfId="0" applyNumberFormat="1"/></cellXfs><cellStyles count="1"><cellStyle name="Normal" xfId="0" builtinId="0"/></cellStyles></styleSheet>`,
    'xl/worksheets/sheet1.xml': `<?xml version="1.0" encoding="UTF-8" standalone="yes"?><worksheet xmlns="${NS.sheet}"><sheetData>${header}${body}</sheetData></worksheet>`,
  };
}

// --- ZIP reading and writing (DOCX and XLSX are ZIP packages) ---------------------------

const CRC_TABLE = Array.from({ length: 256 }, (_, index) => {
  let value = index;
  for (let bit = 0; bit < 8; bit += 1) value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
  return value >>> 0;
});

export function crc32(bytes) {
  let crc = 0xffffffff;
  for (let index = 0; index < bytes.length; index += 1) crc = CRC_TABLE[(crc ^ bytes[index]) & 0xff] ^ (crc >>> 8);
  return (crc ^ 0xffffffff) >>> 0;
}

async function transform(bytes, stream) {
  return new Uint8Array(await new Response(new Blob([bytes]).stream().pipeThrough(stream)).arrayBuffer());
}

// 1980-01-01, the earliest date a ZIP header can hold.
const DOS_DATE = (1 << 5) | 1;

// Writes [offset, value, byteWidth] fields, little-endian, into a ZIP header.
function headerBytes(length, fields) {
  const view = new DataView(new ArrayBuffer(length));
  fields.forEach(([at, number, width]) => {
    if (width === 4) view.setUint32(at, number, true);
    else view.setUint16(at, number, true);
  });
  return new Uint8Array(view.buffer);
}

const toBytes = (value) => (typeof value === 'string' ? new TextEncoder().encode(value) : value);

/** Reads a ZIP archive into a Map of file name to bytes. */
export async function readZip(input) {
  const bytes = new Uint8Array(input);
  const view = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  let end = bytes.length - 22;
  while (end >= 0 && view.getUint32(end, true) !== 0x06054b50) end -= 1;
  if (end < 0) throw new Error('Not a ZIP archive');
  const count = view.getUint16(end + 10, true);
  let offset = view.getUint32(end + 16, true);
  const entries = new Map();
  for (let index = 0; index < count; index += 1) {
    const method = view.getUint16(offset + 10, true);
    const size = view.getUint32(offset + 20, true);
    const nameLength = view.getUint16(offset + 28, true);
    const extraLength = view.getUint16(offset + 30, true);
    const commentLength = view.getUint16(offset + 32, true);
    const local = view.getUint32(offset + 42, true);
    const name = new TextDecoder().decode(bytes.subarray(offset + 46, offset + 46 + nameLength));
    const start = local + 30 + view.getUint16(local + 26, true) + view.getUint16(local + 28, true);
    const data = bytes.subarray(start, start + size);
    entries.set(name, method === 8 ? await transform(data, new DecompressionStream('deflate-raw')) : data.slice());
    offset += 46 + nameLength + extraLength + commentLength;
  }
  return entries;
}

/** Writes a Map (or object) of file name to bytes or text as a deflated ZIP archive. */
export async function writeZip(files) {
  const encoder = new TextEncoder();
  const chunks = [];
  const central = [];
  let offset = 0;
  for (const [name, value] of files instanceof Map ? files : Object.entries(files)) {
    const data = toBytes(value);
    const compressed = await transform(data, new CompressionStream('deflate-raw'));
    const nameBytes = encoder.encode(name);
    const crc = crc32(data);
    const header = headerBytes(30, [[0, 0x04034b50, 4], [4, 20, 2], [6, 0x0800, 2], [8, 8, 2], [12, DOS_DATE, 2], [14, crc, 4], [18, compressed.length, 4], [22, data.length, 4], [26, nameBytes.length, 2]]);
    const record = headerBytes(46, [[0, 0x02014b50, 4], [4, 20, 2], [6, 20, 2], [8, 0x0800, 2], [10, 8, 2], [14, DOS_DATE, 2], [16, crc, 4], [20, compressed.length, 4], [24, data.length, 4], [28, nameBytes.length, 2], [42, offset, 4]]);
    chunks.push(header, nameBytes, compressed);
    central.push(record, nameBytes);
    offset += 30 + nameBytes.length + compressed.length;
  }
  const centralSize = central.reduce((sum, part) => sum + part.length, 0);
  const total = central.length / 2;
  const end = headerBytes(22, [[0, 0x06054b50, 4], [8, total, 2], [10, total, 2], [12, centralSize, 4], [16, offset, 4]]);
  return new Blob([...chunks, ...central, end], { type: 'application/zip' });
}

// --- Adding the charts to the DOCX package --------------------------------------------

export function chartPlaceholder(index) {
  return `[[LIMIAR_CHART_${index}]]`;
}

function chartParagraph({ index, widthEmu, heightEmu, title }) {
  return `<w:p><w:pPr><w:keepNext/><w:spacing w:before="60" w:after="80"/><w:jc w:val="center"/></w:pPr><w:r><w:drawing><wp:inline distT="0" distB="0" distL="0" distR="0"><wp:extent cx="${widthEmu}" cy="${heightEmu}"/><wp:effectExtent l="0" t="0" r="0" b="0"/><wp:docPr id="${5000 + index}" name="${escapeXml(`Chart ${index}`)}" descr="${escapeXml(title)}" title="${escapeXml(title)}"/><wp:cNvGraphicFramePr/><a:graphic xmlns:a="${NS.a}"><a:graphicData uri="${NS.c}"><c:chart xmlns:c="${NS.c}" xmlns:r="${NS.r}" r:id="rIdLimiarChart${index}"/></a:graphicData></a:graphic></wp:inline></w:drawing></w:r></w:p>`;
}

function replacePlaceholderParagraph(documentXml, marker, replacement) {
  const at = documentXml.indexOf(marker);
  if (at < 0) throw new Error(`Chart placeholder ${marker} not found`);
  const open = Math.max(documentXml.lastIndexOf('<w:p>', at), documentXml.lastIndexOf('<w:p ', at));
  const close = documentXml.indexOf('</w:p>', at) + '</w:p>'.length;
  return documentXml.slice(0, open) + replacement + documentXml.slice(close);
}

/**
 * Replaces each placeholder paragraph in a DOCX with a native chart.
 * charts: [{ index, model, widthEmu, heightEmu, title, options }]
 */
export async function injectNativeCharts(docxBytes, charts) {
  const entries = await readZip(docxBytes);
  const decoder = new TextDecoder();
  const text = (name) => decoder.decode(entries.get(name));
  let documentXml = text('word/document.xml');
  let relationships = text('word/_rels/document.xml.rels');
  let contentTypes = text('[Content_Types].xml');
  if (!contentTypes.includes('Extension="xlsx"')) {
    contentTypes = contentTypes.replace('</Types>', '<Default Extension="xlsx" ContentType="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"/></Types>');
  }
  for (const chart of charts) {
    const { index } = chart;
    documentXml = replacePlaceholderParagraph(documentXml, chartPlaceholder(index), chartParagraph(chart));
    relationships = relationships.replace('</Relationships>', `<Relationship Id="rIdLimiarChart${index}" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/chart" Target="charts/chart${index}.xml"/></Relationships>`);
    contentTypes = contentTypes.replace('</Types>', `<Override PartName="/word/charts/chart${index}.xml" ContentType="application/vnd.openxmlformats-officedocument.drawingml.chart+xml"/></Types>`);
    entries.set(`word/charts/chart${index}.xml`, toBytes(chartXml(chart.model, chart.options)));
    entries.set(`word/charts/_rels/chart${index}.xml.rels`, toBytes(`<?xml version="1.0" encoding="UTF-8" standalone="yes"?><Relationships xmlns="http://schemas.openxmlformats.org/package/2006/relationships"><Relationship Id="rId1" Type="http://schemas.openxmlformats.org/officeDocument/2006/relationships/package" Target="../embeddings/Microsoft_Excel_Worksheet${index}.xlsx"/></Relationships>`));
    const workbook = await writeZip(workbookParts(chart.model));
    entries.set(`word/embeddings/Microsoft_Excel_Worksheet${index}.xlsx`, new Uint8Array(await workbook.arrayBuffer()));
  }
  entries.set('word/document.xml', toBytes(documentXml));
  entries.set('word/_rels/document.xml.rels', toBytes(relationships));
  entries.set('[Content_Types].xml', toBytes(contentTypes));
  // Keep [Content_Types].xml first, as Office writes it.
  const ordered = new Map([['[Content_Types].xml', entries.get('[Content_Types].xml')]]);
  entries.forEach((value, name) => { if (!ordered.has(name)) ordered.set(name, value); });
  return writeZip(ordered);
}
