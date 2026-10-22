// Components/Notice/Syllabus.jsx
import React from 'react';

const Syllabus = ({ studentData }) => {
  return (
    <div className="space-y-6 animate-fade-in-up">
      <div className="bg-gradient-to-r from-teal-500 to-cyan-600 rounded-2xl p-6 text-white">
        <h2 className="text-2xl font-bold">Syllabus</h2>
        <p className="text-teal-100">Complete curriculum for {studentData?.className}</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {studentData?.syllabus?.map((subject, idx) => (
          <div key={idx} className="group bg-white rounded-2xl shadow-lg overflow-hidden transform transition-all duration-300 hover:scale-105 hover:shadow-2xl">
            <div className={`h-2 ${idx === 0 ? 'bg-blue-500' : idx === 1 ? 'bg-green-500' : idx === 2 ? 'bg-purple-500' : idx === 3 ? 'bg-orange-500' : 'bg-pink-500'}`}></div>
            <div className="p-5">
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center ${
                    idx === 0 ? 'bg-blue-100 text-blue-600' : 
                    idx === 1 ? 'bg-green-100 text-green-600' : 
                    idx === 2 ? 'bg-purple-100 text-purple-600' : 
                    idx === 3 ? 'bg-orange-100 text-orange-600' : 'bg-pink-100 text-pink-600'
                  }`}>
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                    </svg>
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-800">{subject}</h3>
                    <p className="text-xs text-gray-500">Full Syllabus</p>
                  </div>
                </div>
                <button className="text-gray-400 hover:text-blue-600 transition">
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"></path>
                  </svg>
                </button>
              </div>
              <p className="text-sm text-gray-500 mt-2">Click to download complete {subject} syllabus for {studentData?.className}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="bg-blue-50 rounded-2xl p-5">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 bg-blue-500 rounded-full flex items-center justify-center">
            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
          </div>
          <div>
            <p className="font-semibold text-gray-800">Need Help?</p>
            <p className="text-sm text-gray-600">Contact your class teacher for detailed syllabus breakdown</p>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }
        .animate-fade-in-up { animation: fadeInUp 0.6s ease-out forwards; }
      `}</style>
    </div>
  );
};

export default Syllabus;