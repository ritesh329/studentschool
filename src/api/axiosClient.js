import axios from "axios";
import { API_BASE, BASES, LOGIN_ROUTE, TOKEN_KEYS, currentSlug } from "../lib/config";

/**
 * Student portal client (/api/school/portal).
 *  - Authorization: Bearer <accessToken>   (token of THIS portal only)
 *  - X-School-Slug: <tenant slug>
 *  - 401 -> ONE refresh (rotating refresh token, single in-flight promise per portal), retry once,
 *    otherwise clear the session and go to the login page.
 *  - student portal: falls back to /api/school/auth/student/* when /portal/auth/* is a 404.
 */
const inflight = {};

const clearSession = (scope) => {
  const k = TOKEN_KEYS[scope];
  Object.values(k).forEach((key) => localStorage.removeItem(key));
};

async function doRefresh(scope) {
  const k = TOKEN_KEYS[scope];
  const rt = localStorage.getItem(k.refresh);
  if (!rt) return false;
  try {
    const slug = currentSlug();
    const res = await axios.post(`${BASES[scope]}/auth/refresh`, { refreshToken: rt }, {
      headers: slug ? { "X-School-Slug": slug } : {},
    });
    const d = res.data?.data ?? res.data;
    if (!d?.accessToken || !d?.refreshToken) return false;
    // old refresh token is dead the moment this succeeds -> overwrite immediately
    localStorage.setItem(k.access, d.accessToken);
    localStorage.setItem(k.refresh, d.refreshToken);
    return true;
  } catch {
    return false;
  }
}

const refreshOnce = (scope) => {
  if (!inflight[scope]) inflight[scope] = doRefresh(scope).finally(() => { inflight[scope] = undefined; });
  return inflight[scope];
};

const createClient = (scope) => {
  const client = axios.create({ baseURL: BASES[scope], headers: { "Content-Type": "application/json" } });

  client.interceptors.request.use((config) => {
    const token = localStorage.getItem(TOKEN_KEYS[scope].access);
    if (token && !config.headers.Authorization) config.headers.Authorization = `Bearer ${token}`;
    const slug = currentSlug();
    if (slug) config.headers["X-School-Slug"] = slug;
    if (typeof FormData !== "undefined" && config.data instanceof FormData) delete config.headers["Content-Type"];
    return config;
  });

  client.interceptors.response.use(
    (res) => res,
    async (err) => {
      const { config, response } = err;
      if (!response || !config) return Promise.reject(err);

      if (response.status === 404 && scope === "student" && config.url?.startsWith("/auth/") && !config._fallback) {
        config._fallback = true;
        config.baseURL = `${API_BASE}/api/school`;
        config.url = config.url.replace("/auth/", "/auth/student/");
        return client(config);
      }

      const isAuthCall = config.url?.startsWith("/auth/login") || config.url?.startsWith("/auth/refresh");
      if (response.status === 401 && !config._retried && !isAuthCall) {
        config._retried = true;
        if (await refreshOnce(scope)) {
          delete config.headers.Authorization;
          return client(config);
        }
        clearSession(scope);
        const target = LOGIN_ROUTE[scope];
        if (!window.location.pathname.startsWith(target) && (scope === "staff" || window.location.pathname !== "/")) {
          window.location.assign(target);
        }
      }
      return Promise.reject(err);
    }
  );
  return client;
};

// Student portal client
export const studentApiClient = createClient("student");

// Public (no login) client — used only by the home-page admission form
export const publicApi = axios.create({ baseURL: BASES.staff, headers: { "Content-Type": "application/json" } });
publicApi.interceptors.request.use((config) => {
  const slug = currentSlug();
  if (slug) config.headers["X-School-Slug"] = slug;
  return config;
});

export default studentApiClient;
