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
