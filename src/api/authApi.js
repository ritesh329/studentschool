import { studentApiClient } from "./axiosClient";
import { payload, fullName } from "./helpers";

/** Real student -> the small object the UI keeps (studentUser). */
export const toUiStudent = (s = {}) => ({
  id: s.id,
  name: fullName(s) || s.name || "",
  rollNo: s.admissionNo ?? s.rollNo,
  className: s.className ?? s.class,
  section: s.section,
});

// Student login -> POST /api/school/portal/auth/login  { admissionNo, password }   (UI "roll no" = admission no)
export const studentLogin = async (rollNo, password) => {
  const d = payload(await studentApiClient.post("/auth/login", { admissionNo: rollNo, password }));
  return { data: { token: d.accessToken, refreshToken: d.refreshToken, student: toUiStudent(d.student ?? d.user ?? {}) } };
};

export const logoutApi = (refreshToken) => studentApiClient.post("/auth/logout", { refreshToken }).catch(() => {});
export const getStudentMe = () => studentApiClient.get("/me");
