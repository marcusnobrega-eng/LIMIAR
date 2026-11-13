export function quantileFromSorted(values, q) {
    if (!values.length) return null;
    if (values.length === 1) return values[0];
    const pos = (values.length - 1) * q;
    const base = Math.floor(pos);
    const rest = pos - base;
    const lower = values[base];
    const upper = values[Math.min(base + 1, values.length - 1)];
    return lower + rest * (upper - lower);
}

export function ratingDischarge(stageCm, coefficientA, coefficientH0, coefficientN) {
    const stageM = Number(stageCm) / 100;
    const baseM = stageM - Number(coefficientH0);
    if (!Number.isFinite(baseM) || baseM <= 0 || !Number.isFinite(Number(coefficientA)) || !Number.isFinite(Number(coefficientN))) {
      return null;
    }
    return Number(coefficientA) * (baseM ** Number(coefficientN));
}

export function ratingStageFromDischarge(dischargeM3s, coefficientA, coefficientH0, coefficientN) {
    const discharge = Number(dischargeM3s);
    if (discharge <= 0 || !Number.isFinite(discharge) || !Number.isFinite(Number(coefficientA)) || Number(coefficientA) <= 0 || !Number.isFinite(Number(coefficientN)) || Number(coefficientN) <= 0) {
      return null;
    }
    const stageM = Number(coefficientH0) + ((discharge / Number(coefficientA)) ** (1 / Number(coefficientN)));
    return stageM * 100;
}

// Same rule as the threshold pipeline (Supplementary Section S4): among segments whose stage
// range contains the stage, prefer those valid on the date; if none is valid on the date, use
// the most recent one. The latest start date wins in both cases. `validOnDate` reports which.
export function ratingSegmentForDate(curves, dateString, stageCm) {
    const stage = Number(stageCm);
    if (stageCm == null || !Number.isFinite(stage) || !dateString) return null;
    const latest = (candidates) => candidates.reduce(
      (best, curve) => (!best || String(curve.validFrom || '') > String(best.validFrom || '') ? curve : best),
      null,
    );
    const eligible = (curves || []).filter((curve) => (
      Number.isFinite(curve.stageMin) && Number.isFinite(curve.stageMax)
      && stage >= curve.stageMin && stage <= curve.stageMax
    ));
    if (!eligible.length) return null;
    const onDate = eligible.filter((curve) => (
      (!curve.validFrom || dateString >= curve.validFrom) && (!curve.validTo || dateString <= curve.validTo)
    ));
    if (onDate.length) return { segment: latest(onDate), validOnDate: true };
    return { segment: latest(eligible), validOnDate: false };
}

export function validCurveDischarge(curves, dateString, stageCm) {
    const match = ratingSegmentForDate(curves, dateString, stageCm);
    const empty = { discharge: null, segment: null, validOnDate: null };
    if (!match) return empty;
    const { segment } = match;
    const discharge = ratingDischarge(stageCm, segment.coefficientA, segment.coefficientH0, segment.coefficientN);
    return discharge == null ? empty : { discharge, segment, validOnDate: match.validOnDate };
}

export function normalizeThresholdTriplet(alert, flood, severe) {
    let normalizedAlert = alert ?? null;
    const normalizedFlood = flood ?? null;
    let normalizedSevere = severe ?? null;

    if (normalizedFlood != null && normalizedAlert != null && normalizedAlert >= normalizedFlood) {
      normalizedAlert = null;
    }
    if (normalizedFlood != null && normalizedSevere != null && normalizedSevere <= normalizedFlood) {
      normalizedSevere = null;
    }
    if (normalizedAlert != null && normalizedSevere != null && normalizedSevere <= normalizedAlert) {
      normalizedSevere = null;
    }
    return {
      alert: normalizedAlert,
      flood: normalizedFlood,
      severe: normalizedSevere,
    };
}

// Word measures pages in twentieths of a point: A4 with 2.54 cm margins.
export const REPORT_PAGE = {
  width: 11906,
  height: 16838,
  margin: 1440,
  headerFooter: 720,
};

export const REPORT_MIN_CHART_FONT_PT = 16;

export function reportTextWidthPt(page = REPORT_PAGE) {
  return (page.width - 2 * page.margin) / 20;
}

// One canvas unit equals one printed point, so a 16-unit chart font prints at 16 pt.
// The docx library places images in 96-dpi pixels.
export function reportFigureLayout(widthPt, heightPt, pixelsPerPoint = 4) {
  return {
    canvasWidth: widthPt,
    canvasHeight: heightPt,
    pixelRatio: pixelsPerPoint,
    imageWidth: Math.round((widthPt * 96) / 72),
    imageHeight: Math.round((heightPt * 96) / 72),
  };
}

export function scaleToWidth(naturalWidth, naturalHeight, width) {
  return { width, height: Math.round((width * naturalHeight) / naturalWidth) };
}

export function addDays(dateString, offset) {
    const dayNumber = Math.round(Date.parse(`${dateString}T00:00:00Z`) / 86400000);
    return new Date((dayNumber + Number(offset)) * 86400000).toISOString().slice(0, 10);
}

const DAILY_STATUS_KEYS = ['normal', 'warning', 'flooded', 'extreme_flooding', 'no_data'];
const OUTSIDE_NORMAL_KEYS = ['warning', 'flooded', 'extreme_flooding'];

function coordinateBins(rows, field, edges) {
  return edges.slice(0, -1).map((start, index) => {
    const end = edges[index + 1];
    const counts = { warning: 0, flooded: 0, extreme_flooding: 0 };
    rows.forEach((row) => {
      const value = Number(row[field]);
      const isLast = index === edges.length - 2;
      if (Number.isFinite(value) && value >= start && (value < end || (isLast && value <= end))) {
        counts[row.status] += 1;
      }
    });
    return { start, end, counts };
  });
}

export function summarizeDailyStations(rows) {
  const statusCounts = Object.fromEntries(DAILY_STATUS_KEYS.map((key) => [key, 0]));
  const stateCounts = new Map();
  const outsideNormalRows = [];

  rows.forEach((row) => {
    const status = DAILY_STATUS_KEYS.includes(row.status) ? row.status : 'no_data';
    statusCounts[status] += 1;
    if (OUTSIDE_NORMAL_KEYS.includes(status)) outsideNormalRows.push({ ...row, status });
    if (!row.uf || status === 'no_data') return;
    const current = stateCounts.get(row.uf) || { uf: row.uf, valid: 0, outsideNormal: 0 };
    current.valid += 1;
    if (OUTSIDE_NORMAL_KEYS.includes(status)) current.outsideNormal += 1;
    stateCounts.set(row.uf, current);
  });

  const stateRanking = Array.from(stateCounts.values())
    .map((entry) => ({ ...entry, share: entry.outsideNormal / entry.valid }))
    .filter((entry) => entry.outsideNormal > 0)
    .sort((left, right) => right.share - left.share || right.outsideNormal - left.outsideNormal || left.uf.localeCompare(right.uf))
    .slice(0, 5);

  return {
    total: rows.length,
    valid: rows.length - statusCounts.no_data,
    outsideNormal: outsideNormalRows.length,
    statusCounts,
    latitudeBins: coordinateBins(outsideNormalRows, 'lat', [-35, -30, -25, -20, -15, -10, -5, 0, 5]),
    longitudeBins: coordinateBins(outsideNormalRows, 'lon', [-75, -70, -65, -60, -55, -50, -45, -40, -35, -30]),
    stateRanking,
  };
}

export function dayNumber(dateString) {
  return Math.round(Date.parse(`${dateString}T00:00:00Z`) / 86400000);
}

export function dateFromDayNumber(value) {
  return new Date(Number(value) * 86400000).toISOString().slice(0, 10);
}

// A fixed-length window around the selected day, kept inside the record.
export function timelineWindow(selectedDate, minDate, maxDate, lengthDays = 365) {
  const low = dayNumber(minDate);
  const high = dayNumber(maxDate);
  const selected = Math.min(high, Math.max(low, dayNumber(selectedDate)));
  const span = Math.min(lengthDays, high - low);
  const start = Math.max(low, Math.min(selected - Math.floor(span / 2), high - span));
  return { start: dateFromDayNumber(start), end: dateFromDayNumber(start + span) };
}

export function dateInWindow(dateString, window) {
  return Boolean(window) && dateString >= window.start && dateString <= window.end;
}

// Number of stations whose record spans each year from firstYear to lastYear.
export function yearlyStationCoverage(stations, firstYear, lastYear) {
  const counts = Array.from({ length: lastYear - firstYear + 1 }, () => 0);
  stations.forEach((station) => {
    const start = Number(String(station.first_date).slice(0, 4));
    const end = Number(String(station.last_date).slice(0, 4));
    if (!Number.isFinite(start) || !Number.isFinite(end)) return;
    for (let year = Math.max(start, firstYear); year <= Math.min(end, lastYear); year += 1) {
      counts[year - firstYear] += 1;
    }
  });
  return counts;
}

export function monthStarts(startDate, endDate) {
  const months = [];
  let year = Number(startDate.slice(0, 4));
  let month = Number(startDate.slice(5, 7));
  if (startDate.slice(8, 10) !== '01') month += 1;
  for (;;) {
    if (month > 12) {
      month = 1;
      year += 1;
    }
    const value = `${year}-${String(month).padStart(2, '0')}-01`;
    if (value > endDate) return months;
    months.push(value);
    month += 1;
  }
}

// Moves by calendar months, keeping the day when possible (31 Jan + 1 month = 29 Feb in a leap year).
export function addMonths(dateString, months) {
  const year = Number(dateString.slice(0, 4));
  const monthIndex = Number(dateString.slice(5, 7)) - 1 + Number(months);
  const targetYear = year + Math.floor(monthIndex / 12);
  const targetMonth = ((monthIndex % 12) + 12) % 12;
  const lastDay = new Date(Date.UTC(targetYear, targetMonth + 1, 0)).getUTCDate();
  const day = Math.min(Number(dateString.slice(8, 10)), lastDay);
  return `${targetYear}-${String(targetMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
}
// Bankfull stage of one surveyed profile, following Supplementary Section S3: vertices at the
// same distance collapse to their median elevation, at least five distinct vertices and two on
// each side of the thalweg (the lowest vertex) are required, each bank stage is the highest
// vertex on its side, and bankfull stage is the lower bank, which must lie above the thalweg.
export function bankfullFromProfile(points) {
  const byDistance = new Map();
  (points || []).forEach((point) => {
    const distance = Number(point?.x);
    const elevation = Number(point?.y);
    if (point?.x == null || point?.y == null || !Number.isFinite(distance) || !Number.isFinite(elevation)) return;
    if (!byDistance.has(distance)) byDistance.set(distance, []);
    byDistance.get(distance).push(elevation);
  });
  const vertices = [...byDistance.entries()]
    .sort((left, right) => left[0] - right[0])
    .map(([distance, elevations]) => [distance, quantileFromSorted(elevations.sort((a, b) => a - b), 0.5)]);
  if (vertices.length < 5) return null;
  let lowest = 0;
  vertices.forEach(([, elevation], index) => {
    if (elevation < vertices[lowest][1]) lowest = index;
  });
  const left = vertices.slice(0, lowest);
  const right = vertices.slice(lowest + 1);
  if (left.length < 2 || right.length < 2) return null;
  const thalweg = vertices[lowest][1];
  const leftBank = Math.max(...left.map(([, elevation]) => elevation));
  const rightBank = Math.max(...right.map(([, elevation]) => elevation));
  const bankfull = Math.min(leftBank, rightBank);
  if (!(bankfull > thalweg)) return null;
  return { thalweg, leftBank, rightBank, bankfull, depth: bankfull - thalweg };
}

// ANA segment identifiers read station__from__to__consistency__segment_count__...
export function parseRatingSegmentId(segmentId) {
  const parts = String(segmentId || '').split('__');
  const level = Number(parts[3]);
  const match = String(parts[4] || '').match(/^(\d+)_(\d+)$/);
  return {
    consistencyLevel: Number.isInteger(level) && parts[3] !== '' ? level : null,
    segment: match ? Number(match[1]) : null,
    segments: match ? Number(match[2]) : null,
  };
}

// Q = a (H - h0)^n with H in metres, written with the sign of h0 folded in.
export function ratingEquationParts(coefficientA, coefficientH0, coefficientN, format = String) {
  const h0 = Number(coefficientH0);
  return {
    base: `Q = ${format(Number(coefficientA))} (H ${h0 < 0 ? '+' : '−'} ${format(Math.abs(h0))})`,
    exponent: format(Number(coefficientN)),
  };
}

// Plain ASCII for file names: accents removed, other characters joined by underscores.
export function fileNamePart(value, maxLength = 60) {
  return String(value ?? '')
    .normalize('NFD')
    .replace(/[\u0300-\u036f]/g, '')
    .replace(/[^A-Za-z0-9]+/g, '_')
    .replace(/^_+|_+$/g, '')
    .slice(0, maxLength)
    .replace(/_+$/, '');
}


// Raw (level 1) ANA days arrive as sorted, non-overlapping [first, last] day-offset ranges.
export function isProvisionalOffset(ranges, offset) {
  let low = 0;
  let high = (ranges?.length || 0) - 1;
  while (low <= high) {
    const middle = (low + high) >> 1;
    const [first, last] = ranges[middle];
    if (offset < first) high = middle - 1;
    else if (offset > last) low = middle + 1;
    else return true;
  }
  return false;
}

// Index ranges [start, end] of consecutive true values, for shading provisional days on a chart.
export function provisionalRuns(flags) {
  const runs = [];
  flags.forEach((flag, index) => {
    if (!flag) return;
    const last = runs[runs.length - 1];
    if (last && last[1] === index - 1) last[1] = index;
    else runs.push([index, index]);
  });
  return runs;
}

// Every day from the first to the last date of either list, for a chart that joins the
// observed past with a forecast.
export function continuousDates(...lists) {
  const dates = lists.flat().filter(Boolean).sort();
  if (!dates.length) return [];
  const span = Math.round((Date.parse(`${dates[dates.length - 1]}T00:00:00Z`) - Date.parse(`${dates[0]}T00:00:00Z`)) / 86400000);
  return Array.from({ length: span + 1 }, (_, offset) => addDays(dates[0], offset));
}

// Inverse of validCurveDischarge: the stage at which a segment carries the discharge, chosen by the
// same rule (valid on the date first, otherwise the most recent; the latest start date wins).
// A discharge outside every segment's stage range gets no stage; curves are not extrapolated.
export function validCurveStage(curves, dateString, dischargeM3s) {
    const empty = { stage: null, segment: null, validOnDate: null };
    if (dischargeM3s == null || !Number.isFinite(Number(dischargeM3s)) || !dateString) return empty;
    const tolerance = 1e-6;
    const candidates = (curves || [])
      .map((curve) => ({ curve, stage: ratingStageFromDischarge(dischargeM3s, curve.coefficientA, curve.coefficientH0, curve.coefficientN) }))
      .filter(({ curve, stage }) => (
        stage != null && Number.isFinite(curve.stageMin) && Number.isFinite(curve.stageMax)
        && stage >= curve.stageMin - tolerance && stage <= curve.stageMax + tolerance
      ));
    if (!candidates.length) return empty;
    const latest = (items) => items.reduce(
      (best, item) => (!best || String(item.curve.validFrom || '') > String(best.curve.validFrom || '') ? item : best),
      null,
    );
    const onDate = candidates.filter(({ curve }) => (
      (!curve.validFrom || dateString >= curve.validFrom) && (!curve.validTo || dateString <= curve.validTo)
    ));
    const pick = latest(onDate.length ? onDate : candidates);
    return { stage: pick.stage, segment: pick.curve, validOnDate: onDate.length > 0 };
}

// Axis bounds that fit the values with a margin, rounded to a readable step. Non-negative data
// keep a non-negative axis.
export function niceAxisRange(values, padding = 0.08) {
  const finite = (values || []).filter((value) => value != null).map(Number).filter(Number.isFinite);
  if (!finite.length) return null;
  let low = Math.min(...finite);
  let high = Math.max(...finite);
  if (low === high) {
    const half = Math.abs(low) * 0.1 || 1;
    low -= half;
    high += half;
  }
  const span = high - low;
  const paddedLow = low - span * padding;
  const paddedHigh = high + span * padding;
  // The largest of 1, 0.5 or 0.2 times a power of ten that still gives at least four steps.
  const magnitude = 10 ** Math.floor(Math.log10(paddedHigh - paddedLow));
  const step = [1, 0.5, 0.2, 0.1].map((factor) => factor * magnitude).find((candidate) => (paddedHigh - paddedLow) / candidate >= 4);
  let min = Math.floor(paddedLow / step) * step;
  const max = Math.ceil(paddedHigh / step) * step;
  if (low >= 0 && min < 0) min = 0;
  return { min, max };
}

// Bankfull discharge map layer. Each line of a tier file is
// [class, outside, qMin, qMax, areaMin, areaMax, x0, y0, dx1, dy1, ...] with integer coordinates
// in units of 1/scale degrees and every point after the first stored as a difference.
export function decodeBankfullLine(line, scale) {
  if (!Array.isArray(line) || line.length < 10 || !(scale > 0)) return null;
  const [cls, outside, qMin, qMax, areaMin, areaMax] = line;
  const latlngs = [];
  let x = 0;
  let y = 0;
  for (let k = 6; k + 1 < line.length; k += 2) {
    x += line[k];
    y += line[k + 1];
    latlngs.push([y / scale, x / scale]);
  }
  return { cls, outside: outside === 1, qMin, qMax, areaMin, areaMax, latlngs };
}

// Tiers drawn at a zoom level: the largest rivers always, smaller ones as the map zooms in.
export const BANKFULL_TIER_MIN_ZOOM = { ge100k: 0, '10k_100k': 0, '2k_10k': 6, '1k_2k': 7 };

export function bankfullTiersForZoom(tiers, zoom) {
  return (tiers || [])
    .filter((tier) => zoom >= (BANKFULL_TIER_MIN_ZOOM[tier.name] ?? Infinity))
    .map((tier) => tier.name);
}

// Rounds to a number of significant figures, for model estimates whose error is a factor, not a
// fixed number of units.
export function roundSignificant(value, digits = 2) {
  const number = Number(value);
  if (!Number.isFinite(number) || number === 0) return number;
  const magnitude = 10 ** (Math.floor(Math.log10(Math.abs(number))) - digits + 1);
  return Math.round(number / magnitude) * magnitude;
}
