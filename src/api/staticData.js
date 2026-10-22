// STATIC FALLBACK DATA — only used where the real backend has no endpoint (yet) or the
// endpoint returns nothing usable. Every block below is listed in MISSING_APIS.md.
// When the real API is added, delete the matching block and the adapter will use live data.

export const STATIC_DASHBOARD_STATS = {
  totalStudents: 0, presentToday: 0, absentToday: 0, feeCollection: 0, feeTarget: 0,
  teachers: 0, classes: 0, pendingLeaves: 0,
};

export const STATIC_CHARTS = {
  attendanceTrend: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day, i) => ({ day, present: 0, absent: 0, late: 0 })),
  classDistribution: [],
  feeCollectionTrend: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"].map((month) => ({ month, collection: 0 })),
};

export const STATIC_SYLLABUS = ["Mathematics", "Science", "English", "Hindi", "Social Science", "Computer"];

export const STATIC_NOTICES = [
  { id: "n1", title: "Welcome to the new session", description: "Notices from the school will appear here.", date: new Date().toISOString().slice(0, 10), important: false },
];

export const STATIC_RESULT = { examType: "—", totalMarks: 0, marksObtained: 0, percentage: 0, grade: "—" };
