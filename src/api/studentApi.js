import { studentApiClient } from "./axiosClient";
import { wrap, payload, asList, get, soft, fullName, lc, num, day } from "./helpers";
import { STATIC_SYLLABUS, STATIC_NOTICES, STATIC_RESULT } from "./staticData";

/* ───────────── Student portal: the "full profile" the student UI renders ───────────── */

const guessAcademicYear = () => { const d = new Date(); const y = d.getMonth() >= 3 ? d.getFullYear() : d.getFullYear() - 1; return `${y}-${String(y + 1).slice(2)}`; };

// "Test 1" for a bare number, otherwise the name as typed
const testLabel = (t) => (/^\d+$/.test(String(t ?? "").trim()) ? `Test ${String(t).trim()}` : String(t ?? "Test"));

// group flat test-mark rows by subject -> the shape the TestMarks screen renders
const groupTestMarks = (rows) => {
  const by = new Map();
  rows.forEach((t) => {
    const name = t.subject || "Subject";
    if (!by.has(name)) by.set(name, { subjectCode: name.slice(0, 5).toUpperCase(), subjectName: name, tests: [] });
    by.get(name).tests.push({
      testName: testLabel(t.test), date: day(t.createdAt ?? t.date), marksObtained: t.marksObtained, maxMarks: t.outOf,
      percentage: t.percentage, status: t.percentage >= 33 ? "Passed" : "Failed", copyUrl: t.copyUrl,
    });
  });
  return [...by.values()];
};

export const getMyFullProfile = async () => {
  const me = payload(await studentApiClient.get("/me")) || {};
  const st = me.profile ?? me.student ?? me;                       // /me -> { profile, attendance, results, testMarks, fees, notices }

  // ── attendance: array of { date, status } rows inside /me ──
  const attRows = Array.isArray(me.attendance) ? me.attendance : await soft(async () => asList(await get(studentApiClient, "/attendance")), []);
  const records = {};
  attRows.forEach((r) => {
    const s = lc(r.status);
    // PRESENT -> green, ABSENT -> red, LEAVE -> blue, HOLIDAY -> purple (anything unknown counts as present)
    records[day(r.date)] = s === "absent" ? "absent" : s === "leave" ? "leave" : s === "holiday" ? "holiday" : "present";
  });
  const marked = Object.values(records);
  const presentDays = marked.filter((x) => x === "present").length;
  const absentDays = marked.filter((x) => x === "absent").length;
  const leaveDays = marked.filter((x) => x === "leave").length;
  const totalDays = marked.length;
  const attendance = totalDays ? Math.round((presentDays / totalDays) * 100) : 0;

  // ── fees: { totalDue (= total billed), totalPaid, dueAmount, invoices[] } ──
  const f = me.fees ?? {};
  const totalFees = num(f.totalDue);
  const paidFees = num(f.totalPaid);
  const pendingFees = f.dueAmount !== undefined ? num(f.dueAmount) : Math.max(0, totalFees - paidFees);
  const invoices = asList(f.invoices);
  const academicYear = st.academicYear?.name ?? me.academicYear?.name ?? guessAcademicYear();

  // payment history: real payments if the endpoint answers, else built from the invoices that have something paid
  const payRows = await soft(async () => asList(await get(studentApiClient, "/fees/payments")), []);
  const paymentHistory = payRows.length
    ? payRows.map((p, i) => ({
        id: p.id ?? i, date: p.paidAt ?? p.createdAt ?? p.date, receiptNo: p.receiptNo ?? p.receiptNumber ?? String(p.id ?? "").slice(0, 8),
        particulars: p.notes ?? p.invoice?.title ?? "Fee payment", mode: p.method ?? "", amount: num(p.amount), status: "Successful", academicYear,
      }))
    : invoices.filter((i) => num(i.amountPaid) > 0).map((i) => ({
        id: i.id, date: i.updatedAt ?? i.createdAt, receiptNo: String(i.id ?? "").slice(0, 8).toUpperCase(),
        particulars: i.feeStructure?.name ?? "Fee payment", mode: "", amount: num(i.amountPaid), status: "Successful", academicYear,
      }));

  // ── results / test marks / notices (straight from /me) ──
  const results = asList(me.results);
  const latest = results[0];
  const pct = (r) => num(r.percentage ?? (num(r.totalMarks) ? (num(r.marksObtained) / num(r.totalMarks)) * 100 : 0));
  const tm = asList(me.testMarks).map((t) => {
    const outOf = num(t.outOf ?? t.maxMarks ?? 100) || 100; const got = num(t.marksObtained);
    return { ...t, subject: t.subject, test: t.test ?? t.testName, marksObtained: got, outOf, percentage: Math.round((got / outOf) * 100) };
  });
  const notices = asList(me.notices).map((n, i) => ({
    id: n.id ?? i, title: n.title, description: n.description ?? "", date: day(n.createdAt ?? n.date), important: !!n.important,
  }));

  return wrap({
    ...st,
    id: st.id,
    name: fullName(st) || st.name || "",
    rollNo: st.admissionNo ?? st.rollNo ?? "",
    className: [st.className, st.section].filter(Boolean).join("-") || st.className || "",
    email: st.email ?? "", phone: st.phone ?? st.guardianPhone ?? "", address: st.address ?? "",
    dob: day(st.dateOfBirth ?? st.dob),

    attendance, presentDays, absentDays, leaveDays, totalDays, attendanceRecords: records, year: new Date().getFullYear(),

    academicYear,
    totalFees, paidFees, pendingFees,
    paymentHistory,
    pendingDues: invoices
      .filter((i) => lc(i.status) !== "paid")
      .map((i, k) => ({ id: i.id ?? k, dueDate: i.dueDate, particulars: i.title ?? i.feeStructure?.name ?? "Fee", amount: Math.max(0, num(i.amountDue ?? i.amount) - num(i.amountPaid ?? i.paid)), academicYear })),

    results: latest
      ? { examType: latest.examType ?? latest.exam?.name ?? latest.examName ?? "", totalMarks: num(latest.totalMarks), marksObtained: num(latest.marksObtained), percentage: Math.round(pct(latest)), grade: latest.grade ?? "" }
      : STATIC_RESULT,
    resultHistory: results.map((r, i) => ({
      id: r.id ?? i, examType: r.examType ?? r.exam?.name ?? r.examName ?? "", date: day(r.createdAt ?? r.date),
      totalMarks: num(r.totalMarks), marksObtained: num(r.marksObtained), percentage: Math.round(pct(r) * 10) / 10,
      grade: r.grade ?? "", status: lc(r.status) === "fail" ? "FAIL" : "PASS", subjects: [],
    })),
    testMarks: tm,
    testMarksData: groupTestMarks(tm),
    syllabus: STATIC_SYLLABUS,            // /me has no syllabus -> static (see below)
    notices,
    updates: [],
  });
};