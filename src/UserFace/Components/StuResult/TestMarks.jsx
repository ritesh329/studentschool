// Components/StuResult/TestMarks.jsx
import React, { useState } from 'react';

const TestMarks = ({ studentData }) => {
  // Test Data List
  const testsData = studentData?.testMarksData || [
    {
      subjectCode: 'CS101',
      subjectName: 'Data Structures',
      tests: [
        { testName: 'Unit Test - 1', date: '10 Aug 2026', marksObtained: 22, maxMarks: 25, percentage: 88, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS101+Unit+Test+1+Copy' },
        { testName: 'Mid Term Exam', date: '15 Sep 2026', marksObtained: 42, maxMarks: 50, percentage: 84, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS101+Mid+Term+Copy' },
        { testName: 'Unit Test - 2', date: '28 Sep 2026', marksObtained: 24, maxMarks: 25, percentage: 96, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS101+Unit+Test+2+Copy' },
      ]
    },
    {
      subjectCode: 'CS102',
      subjectName: 'DBMS',
      tests: [
        { testName: 'Unit Test - 1', date: '12 Aug 2026', marksObtained: 18, maxMarks: 25, percentage: 72, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS102+Unit+Test+1+Copy' },
        { testName: 'Mid Term Exam', date: '18 Sep 2026', marksObtained: 38, maxMarks: 50, percentage: 76, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS102+Mid+Term+Copy' },
      ]
    },
    {
      subjectCode: 'CS103',
      subjectName: 'Operating Systems',
      tests: [
        { testName: 'Unit Test - 1', date: '14 Aug 2026', marksObtained: 20, maxMarks: 25, percentage: 80, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS103+Unit+Test+1+Copy' },
        { testName: 'Mid Term Exam', date: '20 Sep 2026', marksObtained: 41, maxMarks: 50, percentage: 82, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS103+Mid+Term+Copy' },
      ]
    },
    {
      subjectCode: 'CS104',
      subjectName: 'Networks',
      tests: [
        { testName: 'Unit Test - 1', date: '16 Aug 2026', marksObtained: 15, maxMarks: 25, percentage: 60, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS104+Unit+Test+1+Copy' },
        { testName: 'Mid Term Exam', date: '22 Sep 2026', marksObtained: 34, maxMarks: 50, percentage: 68, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS104+Mid+Term+Copy' },
      ]
    },
    {
      subjectCode: 'CS105',
      subjectName: 'Software Eng.',
      tests: [
        { testName: 'Unit Test - 1', date: '18 Aug 2026', marksObtained: 23, maxMarks: 25, percentage: 92, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS105+Unit+Test+1+Copy' },
        { testName: 'Mid Term Exam', date: '25 Sep 2026', marksObtained: 46, maxMarks: 50, percentage: 92, status: 'Passed', copyUrl: 'https://via.placeholder.com/600x800?text=CS105+Mid+Term+Copy' },
      ]
    }
  ];

  const [subjectIndex, setSubjectIndex] = useState(0);
  const [selectedCopyUrl, setSelectedCopyUrl] = useState(null); // Answer Sheet Modal

  const activeSubject = testsData[subjectIndex] || testsData[0];

  if (!activeSubject) {
    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl border border-gray-200 p-10 text-center">
          <h3 className="font-semibold text-gray-800">No test marks yet</h3>
          <p className="text-sm text-gray-500 mt-1">Approved test marks will appear here.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-6xl mx-auto space-y-6 animate-fade-in-up p-2 sm:p-4 font-sans">
      <div
        style={{
          display: 'flex',
          width: '100%',
          height: 46,
          overflowX: 'auto',
          overflowY: 'hidden',
          padding: '2px 0',
          scrollbarWidth: 'none',
        }}
      >
        {testsData.map((item, idx) => {
          const active = idx === subjectIndex;
          const isFirst = idx === 0;
          const isLast = idx === testsData.length - 1;

          let clipPath;

          // First Subject Tab
          if (isFirst) {
            clipPath = `
              polygon(
                0 0,
                calc(100% - 12px) 0,
                100% 50%,
                calc(100% - 12px) 100%,
                0 100%
              )
            `;
          }
          // Last Subject Tab
          else if (isLast) {
            clipPath = `
              polygon(
                0 0,
                100% 0,
                100% 100%,
                0 100%,
                13px 50%
              )
            `;
          }
          // Middle Tabs
          else {
            clipPath = `
              polygon(
                0 0,
                calc(100% - 12px) 0,
                100% 50%,
                calc(100% - 12px) 100%,
                0 100%,
                12px 50%
              )
            `;
          }

          return (
            <button
              key={item.subjectCode || idx}
              onClick={() => setSubjectIndex(idx)}
              style={{
                flex: '1 0 110px',
                minWidth: 110,
                height: 42,
                marginLeft: isFirst ? 0 : -10,
                zIndex: active ? 20 : idx + 1,
                clipPath,
                border: 'none',
                outline: 'none',
                background: active
                  ? 'linear-gradient(135deg, #14D9A5, #06B98A)'
                  : '#EBEDF1',
                color: active ? '#FFFFFF' : '#7A8091',
                fontSize: 13,
                fontWeight: active ? 700 : 500,
                letterSpacing: 0.2,
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                padding: '0 12px',
                transition: 'background 0.2s ease, color 0.2s ease',
              }}
            >
              {item.subjectName}
            </button>
          );
        })}
      </div>

      {/* SELECTED SUBJECT DETAILS CARD */}
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 space-y-5">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b pb-4 gap-2">
          <div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-md border border-emerald-200 font-mono">
              {activeSubject.subjectCode}
            </span>
            <h3 className="text-xl font-extrabold text-slate-800 mt-1">{activeSubject.subjectName}</h3>
          </div>

          <div className="text-right">
            <span className="text-xs text-slate-500">Total Evaluated Tests</span>
            <p className="text-lg font-bold text-slate-800">{activeSubject.tests.length} Assessment(s)</p>
          </div>
        </div>

        {/* MARKS TABLE */}
        <div className="overflow-x-auto rounded-xl border border-slate-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-slate-100 text-slate-700 text-xs uppercase font-bold">
              <tr>
                <th className="p-3.5">Test Name</th>
                <th className="p-3.5">Date</th>
                <th className="p-3.5 text-center">Marks Obtained</th>
                <th className="p-3.5 text-center">Percentage</th>
                <th className="p-3.5 text-center">Status</th>
                <th className="p-3.5 text-center">Answer Sheet</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {activeSubject.tests.map((test, idx) => (
                <tr key={idx} className="hover:bg-emerald-50/30 transition-colors">
                  <td className="p-3.5 font-bold text-slate-800">{test.testName}</td>
                  <td className="p-3.5 text-slate-500 text-xs">{test.date}</td>
                  <td className="p-3.5 text-center font-extrabold text-slate-800">
                    {test.marksObtained} <span className="text-slate-400 font-normal">/ {test.maxMarks}</span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className={`inline-block font-extrabold px-2.5 py-1 rounded-md text-xs ${
                      test.percentage >= 80 ? 'bg-emerald-100 text-emerald-800' :
                      test.percentage >= 60 ? 'bg-amber-100 text-amber-800' : 'bg-rose-100 text-rose-800'
                    }`}>
                      {test.percentage}%
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <span className="text-xs font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                      {test.status}
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <button
                      onClick={() => setSelectedCopyUrl(test.copyUrl)}
                      className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-3.5 py-1.5 rounded-lg transition-all shadow-sm flex items-center gap-1.5 mx-auto"
                    >
                      <span>👁️</span> View Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* ANSWER SHEET SCAN COPY MODAL */}
      {selectedCopyUrl && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b pb-3">
              <div>
                <h3 className="font-bold text-slate-800 text-base">Original Answer Sheet Copy</h3>
                <p className="text-xs text-slate-500">Evaluated answer paper image</p>
              </div>
              <button
                onClick={() => setSelectedCopyUrl(null)}
                className="w-8 h-8 rounded-full bg-slate-100 hover:bg-rose-500 hover:text-white text-slate-600 font-bold flex items-center justify-center text-lg transition-colors"
              >
                &times;
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto rounded-xl border border-slate-200 bg-slate-100 p-2 flex justify-center">
              <img
                src={selectedCopyUrl}
                alt="Answer Sheet"
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="flex justify-end pt-2 border-t">
              <button
                onClick={() => setSelectedCopyUrl(null)}
                className="bg-slate-800 text-white font-semibold text-xs px-5 py-2 rounded-xl"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ANIMATION STYLES */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(20px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.4s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default TestMarks;