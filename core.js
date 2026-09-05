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
