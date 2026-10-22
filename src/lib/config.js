// Central API configuration (mirrors the API project's lib/config.ts).
const env = import.meta.env;

let base = env.VITE_API_BASE_URL;
if (base === undefined && env.VITE_API_URL) base = String(env.VITE_API_URL).replace(/\/api\/?$/, ''); // legacy var
export const API_BASE = String(base ?? '').replace(/\/+$/, '');
export const DEFAULT_SLUG = env.VITE_DEFAULT_SCHOOL_SLUG ?? '';
export const TENANT_FROM_HOST = env.VITE_TENANT_FROM_HOST === 'true';
export const CURRENCY = env.VITE_CURRENCY ?? 'INR';

export const BASES = {
  staff: `${API_BASE}/api/school`,
  student: `${API_BASE}/api/school/portal`,
};

export const LOGIN_ROUTE = { staff: '/admin-login', student: '/' };

export function isLocalHost() {
  const h = window.location.hostname;
  return h === 'localhost' || /^\d{1,3}(\.\d{1,3}){3}$/.test(h) || h.endsWith('.localhost');
}

/** school1.example.com -> school1 */
export function subdomainSlug() {
  const parts = window.location.hostname.split('.');
  if (isLocalHost() || parts.length < 3) return '';
  return parts[0] === 'www' ? '' : parts[0];
}

export const SLUG_KEY = 'sms_school_slug';
export function currentSlug() {
  const stored = localStorage.getItem(SLUG_KEY) || '';
  if (TENANT_FROM_HOST) return subdomainSlug() || DEFAULT_SLUG;
  return stored || DEFAULT_SLUG || subdomainSlug();
}
export const setSlug = (s) => localStorage.setItem(SLUG_KEY, String(s || '').trim());

export const TOKEN_KEYS = {
  staff: { access: 'sms_admin_token', refresh: 'sms_admin_refresh', user: 'sms_admin_user' },
  student: { access: 'sms_student_token', refresh: 'sms_student_refresh', user: 'sms_student_data' },
};
