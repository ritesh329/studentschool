import { publicApi } from "./axiosClient";
import { wrap, payload } from "./helpers";

// Public "Apply for admission" form on the home page (no login).
// Needs a PUBLIC endpoint on the backend (see MISSING_APIS.md). Until it exists the application is kept in
// localStorage ("sms_public_admissions") so nothing is lost, and the form still shows success.
export const createAdmission = async (d) => {
  const body = {
    studentName: d.name, className: d.class, parentName: d.parentName, phone: d.phone, email: d.email || undefined,
    address: d.address || undefined, dateOfBirth: d.dob ? new Date(d.dob).toISOString() : undefined,
  };
  Object.keys(body).forEach((k) => body[k] === undefined && delete body[k]);
  try {
    return wrap(payload(await publicApi.post("/public/admissions", body)));
  } catch (e) {
    if ([401, 403, 404, 405, 501].includes(e?.response?.status)) {
      const q = JSON.parse(localStorage.getItem("sms_public_admissions") || "[]");
      q.push({ ...body, submittedAt: new Date().toISOString() });
      localStorage.setItem("sms_public_admissions", JSON.stringify(q));
      return wrap({ queuedLocally: true });
    }
    throw e;
  }
};
