// Components/Fees.jsx
import React, { useMemo, useState } from 'react';

const SAMPLE_DATA = {
  academicYear: '2024-25',
  totalFees: 75000,
  feeStructure: {
    '2024-25': [
      { head: 'Tuition Fee', amount: 45000, due: 'Installments' },
      { head: 'Development Fee', amount: 12000, due: 'Yearly' },
      { head: 'Sports Fee', amount: 5000, due: 'Yearly' },
      { head: 'Library Fee', amount: 3000, due: 'Yearly' },
      { head: 'Exam Fee', amount: 10000, due: 'Yearly' },
    ],
  },
  paymentHistory: [
    { id: 'p1', date: '2024-04-15', receiptNo: 'REC-0125', particulars: 'Installment 1', mode: 'Online (UPI)', amount: 15000, status: 'Successful', academicYear: '2024-25' },
    { id: 'p2', date: '2024-07-15', receiptNo: 'REC-0126', particulars: 'Installment 2', mode: 'Online (UPI)', amount: 15000, status: 'Successful', academicYear: '2024-25' },
    { id: 'p3', date: '2024-10-15', receiptNo: 'REC-0127', particulars: 'Installment 3', mode: 'Online (UPI)', amount: 15000, status: 'Successful', academicYear: '2024-25' },
  ],
  pendingDues: [
    { id: 'd1', dueDate: '2024-12-15', particulars: 'Installment 4', amount: 15000, academicYear: '2024-25' },
    { id: 'd2', dueDate: '2025-02-15', particulars: 'Installment 5', amount: 15000, academicYear: '2024-25' },
  ],
};

// Static class maps so Tailwind can see every class at build time.
const STATUS_STYLES = {
  successful: 'bg-green-100 text-green-700',
  paid: 'bg-green-100 text-green-700',
  pending: 'bg-amber-100 text-amber-700',
  failed: 'bg-red-100 text-red-700',
};

const inr = (n) =>
  new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(
    Number.isFinite(n) ? n : 0
  );

const fmtDate = (v) => {
  const d = new Date(v);
  return Number.isNaN(d.getTime())
    ? v || '—'
    : d.toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' });
};

const isSuccess = (s = '') => ['successful', 'paid', 'success'].includes(String(s).toLowerCase());

const toTime = (v) => {
  const t = new Date(v).getTime();
  return Number.isNaN(t) ? 0 : t;
};

const StatCard = ({ label, value, percent, tone }) => {
  const tones = {
    green: { box: 'bg-green-50 border-green-200', bar: 'bg-green-500', text: 'text-green-800', track: 'bg-green-100' },
    blue: { box: 'bg-blue-50 border-blue-200', bar: 'bg-blue-500', text: 'text-blue-800', track: 'bg-blue-100' },
    orange: { box: 'bg-orange-50 border-orange-200', bar: 'bg-orange-500', text: 'text-orange-800', track: 'bg-orange-100' },
  }[tone];
  return (
    <div className={`rounded-xl border p-5 shadow-sm ${tones.box}`}>
      <p className="text-xs font-semibold tracking-wide text-gray-600 uppercase">{label}</p>
      <p className={`mt-1 text-3xl font-bold ${tones.text}`}>{value}</p>
      <div className="mt-3 flex items-center justify-between gap-3">
        <div
          className={`h-1.5 flex-1 rounded-full overflow-hidden ${tones.track}`}
          role="progressbar"
          aria-valuenow={percent}
          aria-valuemin={0}
          aria-valuemax={100}
          aria-label={label}
        >
          <div className={`h-full rounded-full ${tones.bar}`} style={{ width: `${percent}%` }} />
        </div>
        <span className="text-xs text-gray-500 whitespace-nowrap">{percent}% of total</span>
      </div>
    </div>
  );
};

const Fees = ({ studentData, onPayNow }) => {
  const data = studentData && Object.keys(studentData).length ? studentData : SAMPLE_DATA;

  const feeStructure = data.feeStructure || {};
  const years = useMemo(() => {
    const set = new Set(Object.keys(feeStructure));
    (data.paymentHistory || []).forEach((p) => p.academicYear && set.add(p.academicYear));
    (data.pendingDues || []).forEach((d) => d.academicYear && set.add(d.academicYear));
    if (data.academicYear) set.add(data.academicYear);
    return [...set].sort().reverse();
  }, [data, feeStructure]);

  const [selectedYear, setSelectedYear] = useState(data.academicYear || years[0] || '');
  const [showBreakdown, setShowBreakdown] = useState(false);
  const now = useMemo(() => Date.now(), []);

  // Records without an academicYear belong to every year (backward compatible).
  const inYear = (r) => !r.academicYear || r.academicYear === selectedYear;

  const payments = useMemo(
    () => (data.paymentHistory || []).filter(inYear).sort((a, b) => toTime(b.date) - toTime(a.date)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, selectedYear]
  );
  const dues = useMemo(
    () => (data.pendingDues || []).filter(inYear).sort((a, b) => toTime(a.dueDate) - toTime(b.dueDate)),
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [data, selectedYear]
  );
  const structure = feeStructure[selectedYear] || [];
  const structureTotal = structure.reduce((s, f) => s + (f.amount || 0), 0);

  // Totals: derived from real records so cards and tables never disagree.
  const paid = payments.filter((p) => isSuccess(p.status)).reduce((s, p) => s + (p.amount || 0), 0);
  const dueTotal = dues.reduce((s, d) => s + (d.amount || 0), 0);
  const total = data.totalFees ?? (structureTotal || paid + dueTotal);
  const remaining = Math.max(total - paid, 0);
  const pct = (v) => (total > 0 ? Math.min(100, Math.round((v / total) * 100)) : 0);

  const latestReceipt = payments.find((p) => isSuccess(p.status));

  const downloadReceipt = (p) => {
    if (!p) return;
    if (p.receiptUrl) {
      window.open(p.receiptUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    const text = [
      'FEE RECEIPT',
      `Receipt No : ${p.receiptNo || '—'}`,
      `Date       : ${fmtDate(p.date)}`,
      `Particulars: ${p.particulars || '—'}`,
      `Mode       : ${p.mode || '—'}`,
      `Amount     : ${inr(p.amount)}`,
      `Status     : ${p.status || '—'}`,
    ].join('\n');
    const url = URL.createObjectURL(new Blob([text], { type: 'text/plain;charset=utf-8' }));
    const a = document.createElement('a');
    a.href = url;
    a.download = `${p.receiptNo || 'receipt'}.txt`;
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  };

  const th = 'px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500';

  return (
    <div className="space-y-6">
      {/* Title + year selector */}
      <div className="flex flex-wrap items-center justify-between gap-3">
        {/* <h2 className="text-xl md:text-2xl font-bold text-gray-800">
          Student Fee Portal <span className="font-normal text-gray-500">– Academic Year {selectedYear}</span>
        </h2> */}
        {years.length > 1 && (
          <select
            value={selectedYear}
            onChange={(e) => setSelectedYear(e.target.value)}
            aria-label="Academic year"
            className="px-3 py-2 text-sm bg-white border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
          >
            {years.map((y) => (
              <option key={y} value={y}>
                {y}
              </option>
            ))}
          </select>
        )}
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard label="Paid Balance" value={inr(paid)} percent={pct(paid)} tone="green" />
        <StatCard label="Total Fee" value={inr(total)} percent={total > 0 ? 100 : 0} tone="blue" />
        <StatCard label="Remaining Balance" value={inr(remaining)} percent={pct(remaining)} tone="orange" />
      </div>

      {/* Payment history */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100">
          <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">Payment History</h3>
        </div>
        {payments.length === 0 ? (
          <p className="p-8 text-center text-sm text-gray-500">No payments recorded for {selectedYear}.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className={th}>Date</th>
                  <th className={th}>Receipt #</th>
                  <th className={th}>Particulars</th>
                  <th className={th}>Mode</th>
                  <th className={th}>Amount</th>
                  <th className={th}>Status</th>
                  <th className={th}>
                    <span className="sr-only">Receipt</span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {payments.map((p, i) => (
                  <tr key={p.id ?? `${p.receiptNo}-${i}`} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{fmtDate(p.date)}</td>
                    <td className="px-4 py-3 text-gray-700">{p.receiptNo || '—'}</td>
                    <td className="px-4 py-3 text-gray-700">{p.particulars || '—'}</td>
                    <td className="px-4 py-3 text-gray-500">{p.mode || '—'}</td>
                    <td className="px-4 py-3 font-semibold text-gray-800">{inr(p.amount)}</td>
                    <td className="px-4 py-3">
                      <span
                        className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                          STATUS_STYLES[String(p.status).toLowerCase()] || 'bg-gray-100 text-gray-600'
                        }`}
                      >
                        {p.status || 'Unknown'}
                      </span>
                    </td>
                    <td className="px-4 py-3">
                      {isSuccess(p.status) && (
                        <button
                          type="button"
                          onClick={() => downloadReceipt(p)}
                          className="text-xs text-teal-700 hover:underline"
                        >
                          Receipt
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </section>

      {/* Pending dues */}
      <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
        <div className="px-5 py-4 border-b border-gray-100 flex flex-wrap items-center justify-between gap-3">
          <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">Pending Dues</h3>
          {dues.length > 0 && onPayNow && (
            <button
              type="button"
              onClick={() => onPayNow(dueTotal)}
              className="px-4 py-1.5 text-sm bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors"
            >
              Pay {inr(dueTotal)}
            </button>
          )}
        </div>
        {dues.length === 0 ? (
          <p className="p-8 text-center text-sm text-green-700">🎉 No pending dues. You're all caught up!</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead className="bg-gray-50">
                <tr>
                  <th className={th}>Due Date</th>
                  <th className={th}>Particulars</th>
                  <th className={th}>Amount</th>
                  <th className={th}>Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {dues.map((d, i) => {
                  const overdue = toTime(d.dueDate) < now;
                  return (
                    <tr key={d.id ?? `${d.particulars}-${i}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-700 whitespace-nowrap">{fmtDate(d.dueDate)}</td>
                      <td className="px-4 py-3 text-gray-700">{d.particulars || '—'}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{inr(d.amount)}</td>
                      <td className="px-4 py-3">
                        <span
                          className={`px-2 py-1 rounded text-xs font-semibold uppercase ${
                            overdue ? STATUS_STYLES.failed : STATUS_STYLES.pending
                          }`}
                        >
                          {overdue ? 'Overdue' : 'Upcoming'}
                        </span>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        {/* Actions */}
        <div className="px-5 py-4 border-t border-gray-100 flex flex-wrap justify-end gap-3">
          <button
            type="button"
            onClick={() => setShowBreakdown((v) => !v)}
            aria-expanded={showBreakdown}
            className="px-4 py-2 text-xs sm:text-sm uppercase tracking-wide border border-teal-700 text-teal-700 rounded-lg hover:bg-teal-50 transition-colors"
          >
            {showBreakdown ? 'Hide Fee Breakdown' : 'View Detailed Fee Breakdown'}
          </button>
          <button
            type="button"
            onClick={() => downloadReceipt(latestReceipt)}
            disabled={!latestReceipt}
            className="px-4 py-2 text-xs sm:text-sm uppercase tracking-wide bg-teal-700 text-white rounded-lg hover:bg-teal-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Download Latest Receipt
          </button>
        </div>
      </section>

      {/* Detailed fee breakdown (toggle) */}
      {showBreakdown && (
        <section className="bg-white rounded-xl border border-gray-100 shadow-sm overflow-hidden">
          <div className="px-5 py-4 border-b border-gray-100">
            <h3 className="font-bold text-gray-800 uppercase text-sm tracking-wide">
              Fee Structure – {selectedYear}
            </h3>
          </div>
          {structure.length === 0 ? (
            <p className="p-8 text-center text-sm text-gray-500">
              Fee structure is not available for {selectedYear}.
            </p>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-sm">
                <thead className="bg-gray-50">
                  <tr>
                    <th className={th}>Fee Head</th>
                    <th className={th}>Amount</th>
                    <th className={th}>Frequency</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {structure.map((f, i) => (
                    <tr key={`${f.head}-${i}`} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-gray-800">{f.head}</td>
                      <td className="px-4 py-3 font-semibold text-gray-800">{inr(f.amount)}</td>
                      <td className="px-4 py-3 text-gray-500">{f.due}</td>
                    </tr>
                  ))}
                  <tr className="bg-blue-50">
                    <td className="px-4 py-3 font-bold text-gray-800">Total</td>
                    <td className="px-4 py-3 font-bold text-blue-600">{inr(structureTotal)}</td>
                    <td />
                  </tr>
                </tbody>
              </table>
            </div>
          )}
        </section>
      )}
    </div>
  );
};

export default Fees;