// Shared helpers for the API adapter layer.
// Components were written for an older backend (Mongo `_id`, `res.data.data`, lower-case statuses...).
// The adapters in src/api/*.js call the REAL backend and return the SAME shapes the UI already expects,
// so no component/UI file has to change.

/** axios-like response in the shape the UI reads: res.data.data */
export const wrap = (data, extra = {}) => ({ data: { success: true, data, ...extra } });

/** Unwrap the real backend envelope {success, message, data} */
export const payload = (res) => {
  const b = res?.data;
  return b && typeof b === "object" && "data" in b ? b.data : b;
};

export const asList = (d) => {
  if (Array.isArray(d)) return d;
  if (!d || typeof d !== "object") return [];
  for (const k of ["items", "data", "rows", "results", "records", "list"]) if (Array.isArray(d[k])) return d[k];
  return [];
};

export const num = (v) => (Number.isFinite(Number(v)) ? Number(v) : 0);
export const lc = (s) => String(s ?? "").toLowerCase();
export const uc = (s) => String(s ?? "").toUpperCase();
export const iso = (d) => (d ? new Date(d).toISOString() : undefined);
export const day = (d) => (d ? String(d).slice(0, 10) : "");

export const fullName = (p) =>
  p ? [p.firstName, p.lastName].filter(Boolean).join(" ") || p.name || p.email || "" : "";

export const splitName = (n) => {
  const p = String(n || "").trim().split(/\s+/);
  return { firstName: p[0] || "", lastName: p.slice(1).join(" ") };
};

export const roleName = (s) => s?.role?.name ?? s?.roleName ?? (typeof s?.role === "string" ? s.role : "") ?? "";
export const isTeacher = (s) => /teach/i.test(roleName(s));
export const uiRole = (s) => (isTeacher(s) ? "teacher" : "admin");

export const isMissing = (e) => [404, 405, 501].includes(e?.response?.status);

/** Call the real API; if that endpoint does not exist (404/405/501) use the static fallback instead. */
export async function orStatic(fn, fallback) {
  try {
    return await fn();
  } catch (e) {
    if (isMissing(e)) return typeof fallback === "function" ? fallback() : fallback;
    throw e;
  }
}

/** Run a call, never throw (used for optional extra data). */
export async function soft(fn, fallback) {
  try {
    return await fn();
  } catch {
    return typeof fallback === "function" ? fallback() : fallback;
  }
}

export const get = async (client, path, params) => payload(await client.get(path, { params }));

/** Flatten nested objects so a report row only has primitive cells (safe to render + CSV). */
export const flat = (obj, prefix = "") =>
  Object.entries(obj || {}).reduce((o, [k, v]) => {
    const key = prefix ? `${prefix}${k[0].toUpperCase()}${k.slice(1)}` : k;
    if (v && typeof v === "object" && !Array.isArray(v)) Object.assign(o, flat(v, key));
    else o[key] = Array.isArray(v) ? v.length : v ?? "";
    return o;
  }, {});

export const PAY_METHOD = (m) => {
  const s = uc(m).replace(/[\s-]+/g, "_");
  if (s.includes("BANK")) return "BANK_TRANSFER";
  if (s.includes("UPI")) return "UPI";
  if (s.includes("CARD")) return "CARD";
  if (s.includes("CHEQUE") || s.includes("CHECK")) return "CHEQUE";
  if (s.includes("ONLINE")) return "ONLINE";
  return s || "CASH";
};

// ---- tiny memo cache (roles / students are looked up by several adapters) ----
const cache = new Map();
export function memo(key, fn, ttl = 30000) {
  const hit = cache.get(key);
  if (hit && Date.now() - hit.t < ttl) return hit.p;
  const p = fn().catch((e) => { cache.delete(key); throw e; });
  cache.set(key, { t: Date.now(), p });
  return p;
}
export const bust = (prefix) => [...cache.keys()].forEach((k) => k.startsWith(prefix) && cache.delete(k));
