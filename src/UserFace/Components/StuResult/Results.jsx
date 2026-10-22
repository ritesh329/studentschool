// Components/StuResult/Results.jsx
import React, { useState } from 'react';

const Results = ({ studentData }) => {
  const [selectedResult, setSelectedResult] = useState(null); // Full result details modal
  const [selectedCopyUrl, setSelectedCopyUrl] = useState(null); // Scan copy image modal

  // Dummy data list
  const previousResultsList = studentData?.resultHistory || [
    {
      id: 'sem-6',
      examType: '6th Semester - Main Examination 2026',
      date: 'May 2026',
      totalMarks: 500,
      marksObtained: 407,
      percentage: 81.4,
      grade: 'A+',
      status: 'PASS',
      originalCopyUrl: 'https://via.placeholder.com/600x800?text=6th+Sem+Original+Marksheet+Scan',
      subjects: [
        { code: 'CS101', name: 'Data Structures & Algorithms', maxMarks: 100, obtained: 85, grade: 'A+' },
        { code: 'CS102', name: 'Database Management Systems', maxMarks: 100, obtained: 78, grade: 'A' },
        { code: 'CS103', name: 'Operating Systems', maxMarks: 100, obtained: 82, grade: 'A+' },
        { code: 'CS104', name: 'Computer Networks', maxMarks: 100, obtained: 74, grade: 'B+' },
        { code: 'CS105', name: 'Software Engineering', maxMarks: 100, obtained: 88, grade: 'O' },
      ],
    },
    {
      id: 'sem-5',
      examType: '5th Semester - Main Examination 2025',
      date: 'Dec 2025',
      totalMarks: 500,
      marksObtained: 395,
      percentage: 79.0,
      grade: 'A',
      status: 'PASS',
      originalCopyUrl: 'https://via.placeholder.com/600x800?text=5th+Sem+Original+Marksheet+Scan',
      subjects: [
        { code: 'CS501', name: 'Theory of Computation', maxMarks: 100, obtained: 75, grade: 'A' },
        { code: 'CS502', name: 'Compiler Design', maxMarks: 100, obtained: 80, grade: 'A+' },
        { code: 'CS503', name: 'Web Technologies', maxMarks: 100, obtained: 85, grade: 'A+' },
        { code: 'CS504', name: 'Artificial Intelligence', maxMarks: 100, obtained: 72, grade: 'B+' },
        { code: 'CS505', name: 'Computer Graphics', maxMarks: 100, obtained: 83, grade: 'A+' },
      ],
    },
  ];

  // Print PDF function
  const handleDownloadPDF = () => {
    window.print();
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6 p-4 sm:p-6 font-sans">
      
      {/* SECTION 1: Results Table */}
      <div className="bg-white rounded-2xl shadow-sm border border-gray-200 p-6 print:hidden">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h2 className="text-xl font-extrabold text-gray-800">Academic Results History</h2>
            <p className="text-xs text-gray-500 mt-1">Apne sabhi semesters ke marksheets dekhein aur download karein</p>
          </div>
          <span className="bg-indigo-50 text-indigo-700 font-bold text-xs px-3.5 py-1.5 rounded-full border border-indigo-100">
            Total Results: {previousResultsList.length}
          </span>
        </div>

        <div className="overflow-x-auto rounded-xl border border-gray-200">
          <table className="w-full text-left text-sm">
            <thead className="bg-gray-50 text-gray-700 text-xs uppercase font-semibold border-b border-gray-200">
              <tr>
                <th className="p-3.5">Examination</th>
                <th className="p-3.5">Session</th>
                <th className="p-3.5 text-center">Marks</th>
                <th className="p-3.5 text-center">Percentage</th>
                <th className="p-3.5 text-center">Result</th>
                <th className="p-3.5 text-center">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {previousResultsList.map((res) => (
                <tr key={res.id} className="hover:bg-indigo-50/40 transition-colors">
                  <td className="p-3.5 font-semibold text-gray-800">{res.examType}</td>
                  <td className="p-3.5 text-gray-600 text-xs">{res.date}</td>
                  <td className="p-3.5 text-center text-gray-700 font-medium">{res.marksObtained} / {res.totalMarks}</td>
                  <td className="p-3.5 text-center font-bold text-indigo-600">{res.percentage}%</td>
                  <td className="p-3.5 text-center">
                    <span className="bg-emerald-100 text-emerald-800 font-bold px-2.5 py-1 rounded-md text-xs">
                      {res.grade} ({res.status})
                    </span>
                  </td>
                  <td className="p-3.5 text-center">
                    <div className="flex items-center justify-center gap-2">
                      {/* Button 1: Original Copy */}
                      <button
                        onClick={() => setSelectedCopyUrl(res.originalCopyUrl)}
                        className="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold px-3 py-1.5 rounded-lg text-xs border border-gray-300 transition-all flex items-center gap-1.5"
                      >
                        <span>👁️</span> Original Copy
                      </button>

                      {/* Button 2: View Result + Download */}
                      <button
                        onClick={() => setSelectedResult(res)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold px-3.5 py-1.5 rounded-lg text-xs shadow-sm transition-all flex items-center gap-1.5"
                      >
                        <span>📄</span> View & Download
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* MODAL 1: Complete Official Marksheet Popup */}
      {selectedResult && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/70 backdrop-blur-sm flex items-center justify-center p-3 sm:p-6 overflow-y-auto print:p-0 print:bg-white print:static">
          
          <div className="bg-white rounded-2xl w-full max-w-4xl my-auto shadow-2xl border border-gray-100 relative overflow-hidden flex flex-col max-h-[92vh] print:max-h-full print:border-none print:shadow-none">
            
            {/* Modal Top Control Bar (Hidden during printing) */}
            <div className="flex items-center justify-between px-6 py-4 bg-slate-50 border-b border-gray-200 shrink-0 print:hidden">
              <div className="flex items-center gap-3">
                <button
                  onClick={handleDownloadPDF}
                  className="bg-indigo-600 hover:bg-indigo-700 text-white font-bold px-4 py-2 rounded-xl text-xs shadow-md transition-all flex items-center gap-2"
                >
                  <span>📥</span> Download PDF / Print
                </button>
                <button
                  onClick={() => {
                    const copy = selectedResult.originalCopyUrl;
                    setSelectedResult(null);
                    setSelectedCopyUrl(copy);
                  }}
                  className="bg-white hover:bg-gray-100 text-gray-700 font-semibold px-4 py-2 rounded-xl text-xs border border-gray-300 transition-all flex items-center gap-1.5"
                >
                  <span>👁️</span> View Scanned Copy
                </button>
              </div>

              <button
                onClick={() => setSelectedResult(null)}
                className="w-8 h-8 rounded-full bg-gray-200 hover:bg-red-500 hover:text-white text-gray-600 font-bold flex items-center justify-center text-lg transition-colors"
              >
                &times;
              </button>
            </div>

            {/* Printable Marksheet Area */}
            <div className="p-6 sm:p-10 overflow-y-auto space-y-6 font-serif" id="printable-area">
              
              {/* BRANDING: School Logo & Header */}
              <div className="border-b-2 border-indigo-950 pb-6 text-center relative">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4 mb-3">
                  {/* School/College Logo */}
                  <div className="w-20 h-20 bg-indigo-950 text-white rounded-full flex items-center justify-center border-4 border-indigo-100 shadow-md shrink-0 font-sans font-black text-2xl">
                    {studentData?.collegeLogo ? (
                      <img src={studentData.collegeLogo} alt="Logo" className="w-full h-full object-cover rounded-full" />
                    ) : (
                      "NIT"
                    )}
                  </div>

                  <div className="text-center sm:text-left">
                    <h1 className="text-2xl sm:text-3xl font-extrabold text-indigo-950 uppercase tracking-wide">
                      {studentData?.collegeName || 'National Institute of Technology & Science'}
                    </h1>
                    <p className="text-xs font-sans text-gray-600 mt-0.5">
                      {studentData?.collegeAddress || 'Approved by AICTE • Affiliated to State Technological University'}
                    </p>
                    <p className="text-[11px] font-sans text-indigo-800 font-semibold mt-1">
                      ISO 9001:2015 Certified Educational Institution
                    </p>
                  </div>
                </div>

                <div className="inline-block bg-indigo-950 text-white font-sans font-bold text-xs px-5 py-1.5 rounded-full tracking-wider uppercase mt-2 shadow-sm">
                  Official Statement of Marks — {selectedResult.examType}
                </div>
              </div>

              {/* STUDENT PROFILE DETAILS */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-50 p-4 sm:p-5 rounded-2xl border border-slate-200 font-sans text-xs">
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Student Name</p>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{studentData?.name || 'Aarav Mehta'}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Roll / Reg. No.</p>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{studentData?.rollNo || 'S001'}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Course & Branch</p>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{studentData?.course || 'B.Tech (CSE)'}</p>
                </div>
                <div>
                  <p className="text-gray-500 uppercase font-bold text-[10px]">Session / Date</p>
                  <p className="font-extrabold text-slate-800 text-sm mt-0.5">{selectedResult.date}</p>
                </div>
              </div>

              {/* SUBJECT MARKS TABLE */}
              {selectedResult.subjects && selectedResult.subjects.length > 0 && (
                <div className="overflow-x-auto rounded-xl border border-slate-300 font-sans">
                  <table className="w-full text-left text-xs">
                    <thead className="bg-indigo-950 text-white uppercase text-[11px] font-bold tracking-wider">
                      <tr>
                        <th className="p-3">Code</th>
                        <th className="p-3">Subject Name</th>
                        <th className="p-3 text-center">Max Marks</th>
                        <th className="p-3 text-center">Marks Obtained</th>
                        <th className="p-3 text-center">Grade</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-200 bg-white">
                      {selectedResult.subjects.map((sub, idx) => (
                        <tr key={idx} className={idx % 2 === 0 ? 'bg-white' : 'bg-slate-50/50'}>
                          <td className="p-3 font-mono font-bold text-slate-600">{sub.code}</td>
                          <td className="p-3 font-semibold text-slate-800">{sub.name}</td>
                          <td className="p-3 text-center text-slate-600">{sub.maxMarks}</td>
                          <td className="p-3 text-center font-bold text-slate-900">{sub.obtained}</td>
                          <td className="p-3 text-center font-extrabold text-indigo-700">{sub.grade}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}

              {/* PERFORMANCE SUMMARY */}
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-indigo-50/60 p-4 rounded-2xl border border-indigo-100 text-center font-sans text-xs">
                <div>
                  <p className="text-gray-500 font-medium">Grand Total</p>
                  <p className="font-black text-slate-800 text-base">{selectedResult.totalMarks}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Total Obtained</p>
                  <p className="font-black text-slate-800 text-base">{selectedResult.marksObtained}</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Percentage</p>
                  <p className="font-black text-indigo-700 text-lg">{selectedResult.percentage}%</p>
                </div>
                <div>
                  <p className="text-gray-500 font-medium">Final Result</p>
                  <p className="font-black text-emerald-600 text-base">{selectedResult.status}</p>
                </div>
              </div>

              {/* FOOTER: Signatures & Official Seal */}
              <div className="pt-8 flex justify-between items-end font-sans text-xs text-gray-600">
                <div className="space-y-1">
                  <p className="font-semibold text-gray-800">Date of Declaration:</p>
                  <p>{new Date().toLocaleDateString()}</p>
                </div>

                {/* Stamp */}
                <div className="border-2 border-dashed border-indigo-300 rounded-full w-20 h-20 flex items-center justify-center text-[10px] font-bold text-indigo-400 text-center uppercase rotate-[-12deg]">
                  Official<br />Seal
                </div>

                <div className="text-center">
                  <div className="w-32 h-10 border-b border-slate-400 mb-1 flex items-end justify-center italic text-slate-400">
                    Controller Sig.
                  </div>
                  <p className="font-bold text-slate-800">Controller of Examinations</p>
                </div>
              </div>
            </div>

            {/* Modal Bottom Footer */}
            <div className="px-6 py-3 bg-slate-50 border-t border-gray-200 flex justify-end shrink-0 print:hidden">
              <button
                onClick={() => setSelectedResult(null)}
                className="bg-slate-800 hover:bg-slate-900 text-white font-semibold text-xs px-6 py-2 rounded-xl transition-all"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODAL 2: Original Scanned Copy Preview Modal */}
      {selectedCopyUrl && (
        <div className="fixed inset-0 z-[9999] bg-slate-900/80 backdrop-blur-sm flex items-center justify-center p-4 print:hidden">
          <div className="bg-white rounded-2xl max-w-2xl w-full p-6 space-y-4 shadow-2xl relative">
            <div className="flex justify-between items-center border-b pb-3">
              <h3 className="font-bold text-slate-800 text-base">Original Scanned Marksheet</h3>
              <button
                onClick={() => setSelectedCopyUrl(null)}
                className="text-gray-400 hover:text-gray-700 text-2xl font-bold"
              >
                &times;
              </button>
            </div>

            <div className="max-h-[70vh] overflow-auto rounded-xl border border-gray-200 bg-gray-100 p-2 flex justify-center">
              <img
                src={selectedCopyUrl}
                alt="Original Marksheet"
                className="w-full h-auto object-contain rounded"
              />
            </div>

            <div className="flex justify-end pt-2">
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

      {/* CSS For Printing */}
      <style>{`
        @media print {
          body * { visibility: hidden; }
          #printable-area, #printable-area * { visibility: visible; }
          #printable-area { position: absolute; left: 0; top: 0; width: 100%; }
        }
      `}</style>
    </div>
  );
};

export default Results;