// components/Dashboard.jsx
import React, { useEffect, useRef } from 'react';

const Dashboard = ({ studentData }) => {
  const cardsRef = useRef([]);

  // Add animation on scroll
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
          }
        });
      },
      { threshold: 0.1 }
    );

    cardsRef.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    return () => observer.disconnect();
  }, []);

  const addToRefs = (el, index) => {
    if (el) cardsRef.current[index] = el;
  };

  return (
    <div className="space-y-8 perspective-1000">
      {/* Welcome Banner with 3D Effect */}
      <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 p-8 text-white transform transition-all duration-500 hover:scale-[1.02] hover:shadow-2xl animate-gradient">
        <div className="absolute inset-0 bg-black opacity-20"></div>
        <div className="absolute -top-24 -right-24 w-48 h-48 bg-white rounded-full opacity-10 animate-pulse-slow"></div>
        <div className="absolute -bottom-24 -left-24 w-64 h-64 bg-white rounded-full opacity-10 animate-pulse-slow delay-1000"></div>
        <div className="relative z-10">
          <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome Back, {studentData.name}! 👋</h2>
          <p className="text-indigo-100">Here's your academic overview for {studentData.className}</p>
        </div>
      </div>

      {/* Fee Cards - 3D Flip Effect */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Total Fees Card */}
        <div 
          ref={(el) => addToRefs(el, 0)}
          className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 opacity-0"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-cyan-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-blue-500 to-blue-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90 mb-1">Total Fees</p>
                <p className="text-3xl md:text-4xl font-bold">₹{studentData.totalFees.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between text-sm">
                <span>Annual Fee</span>
                <span>₹45,000</span>
              </div>
            </div>
          </div>
        </div>

        {/* Paid Fees Card */}
        <div 
          ref={(el) => addToRefs(el, 1)}
          className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 opacity-0 animation-delay-200"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-green-500 to-green-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90 mb-1">Paid Fees</p>
                <p className="text-3xl md:text-4xl font-bold">₹{studentData.paidFees.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <div className="flex justify-between text-sm">
                <span>Payment Progress</span>
                <span>{Math.round((studentData.paidFees / studentData.totalFees) * 100)}%</span>
              </div>
              <div className="mt-2 w-full h-2 bg-white/30 rounded-full overflow-hidden">
                <div className="h-full bg-white rounded-full transition-all duration-1000" style={{ width: `${(studentData.paidFees / studentData.totalFees) * 100}%` }}></div>
              </div>
            </div>
          </div>
        </div>

        {/* Pending Fees Card */}
        <div 
          ref={(el) => addToRefs(el, 2)}
          className="group relative transform transition-all duration-500 hover:scale-105 hover:-translate-y-2 opacity-0 animation-delay-400"
        >
          <div className="absolute -inset-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-2xl blur opacity-25 group-hover:opacity-75 transition duration-500"></div>
          <div className="relative bg-gradient-to-br from-red-500 to-red-700 rounded-2xl p-6 text-white shadow-xl overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-white opacity-10 rounded-full -translate-y-16 translate-x-16"></div>
            <div className="flex justify-between items-start">
              <div>
                <p className="text-sm opacity-90 mb-1">Pending Fees</p>
                <p className="text-3xl md:text-4xl font-bold">₹{studentData.pendingFees.toLocaleString()}</p>
              </div>
              <div className="w-12 h-12 bg-white/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            <div className="mt-4 pt-4 border-t border-white/20">
              <button className="w-full py-2 bg-white/20 rounded-lg text-sm font-semibold hover:bg-white/30 transition">
                Pay Now →
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Attendance and Profile - Glassmorphism */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Attendance Card with 3D Ring */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/40 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-blue-500 rounded-full mr-3"></span>
            Attendance Overview
          </h3>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <div className="relative w-36 h-36 sm:w-40 sm:h-40">
              <svg className="w-full h-full transform -rotate-90">
                <circle cx="80" cy="80" r="70" stroke="#e5e7eb" strokeWidth="12" fill="none" />
                <circle 
                  cx="80" cy="80" r="70" 
                  stroke="url(#gradient)" 
                  strokeWidth="12" 
                  fill="none"
                  strokeDasharray={`${2 * Math.PI * 70}`}
                  strokeDashoffset={`${2 * Math.PI * 70 * (1 - studentData.attendance / 100)}`}
                  className="transition-all duration-1000"
                  strokeLinecap="round"
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#3b82f6" />
                    <stop offset="100%" stopColor="#8b5cf6" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="text-3xl font-bold text-gray-800">{studentData.attendance}%</span>
                <span className="text-xs text-gray-500">Present</span>
              </div>
            </div>
            <div className="space-y-2 text-center sm:text-left">
              <p className="font-semibold text-gray-800">{studentData.name}</p>
              <p className="text-sm text-gray-500">{studentData.className} - Roll No. {studentData.rollNo}</p>
              <div className="flex gap-4 justify-center sm:justify-start">
                <div className="text-center">
                  <p className="text-2xl font-bold text-green-600">{Math.round(studentData.attendance * 1.2)}</p>
                  <p className="text-xs text-gray-500">Present</p>
                </div>
                <div className="text-center">
                  <p className="text-2xl font-bold text-red-500">{120 - Math.round(studentData.attendance * 1.2)}</p>
                  <p className="text-xs text-gray-500">Absent</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Profile Card */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/40 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-purple-500 rounded-full mr-3"></span>
            Student Profile
          </h3>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex-shrink-0 flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg ring-4 ring-white">
                {studentData.name.split(' ').map(n => n[0]).join('')}
              </div>
            </div>
            <div className="flex-1 space-y-2">
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-500">Name:</div><div className="font-semibold text-gray-800">{studentData.name}</div>
                <div className="text-gray-500">DOB:</div><div className="text-gray-800">{studentData.dob}</div>
                <div className="text-gray-500">Email:</div><div className="text-gray-800 truncate">{studentData.email}</div>
                <div className="text-gray-500">Phone:</div><div className="text-gray-800">{studentData.phone}</div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Test Marks Table with Horizontal Scroll for Mobile */}
      <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-4 md:p-6 border border-white/40 transform transition-all duration-300 hover:shadow-2xl">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <span className="w-1 h-6 bg-green-500 rounded-full mr-3"></span>
          Recent Test Marks
        </h3>
        <div className="overflow-x-auto -mx-4 md:mx-0">
          <div className="inline-block min-w-full align-middle">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gradient-to-r from-gray-50 to-gray-100">
                <tr>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Subject</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden sm:table-cell">Test</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Marks</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">%</th>
                  <th className="px-3 py-3 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider hidden md:table-cell">Grade</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {studentData.testMarks.map((mark, idx) => (
                  <tr key={idx} className="hover:bg-gray-50 transition">
                    <td className="px-3 py-3 whitespace-nowrap font-semibold text-gray-800">{mark.subject}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-600 text-sm hidden sm:table-cell">{mark.test}</td>
                    <td className="px-3 py-3 whitespace-nowrap text-gray-700">{mark.marksObtained}/{mark.outOf}</td>
                    <td className="px-3 py-3 whitespace-nowrap">
                      <div className="flex items-center gap-2">
                        <div className="w-16 h-2 bg-gray-200 rounded-full overflow-hidden hidden sm:block">
                          <div className="h-full bg-green-500 rounded-full" style={{ width: `${mark.percentage}%` }}></div>
                        </div>
                        <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                          mark.percentage >= 80 ? 'bg-green-100 text-green-700' :
                          mark.percentage >= 60 ? 'bg-yellow-100 text-yellow-700' :
                          'bg-red-100 text-red-700'
                        }`}>
                          {mark.percentage}%
                        </span>
                      </div>
                    </td>
                    <td className="px-3 py-3 whitespace-nowrap hidden md:table-cell">
                      <span className={`text-sm font-semibold ${
                        mark.percentage >= 80 ? 'text-green-600' :
                        mark.percentage >= 60 ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {mark.percentage >= 80 ? 'A' : mark.percentage >= 60 ? 'B' : 'C'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Result and Syllabus */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Result Card */}
        <div className="group bg-gradient-to-br from-indigo-50 to-purple-50 rounded-2xl shadow-xl p-6 transform transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-yellow-500 rounded-full mr-3"></span>
            Latest Result
          </h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Exam Type</span>
              <span className="font-semibold text-gray-800">{studentData.results.examType}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Total Marks</span>
              <span className="font-semibold text-gray-800">{studentData.results.totalMarks}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Marks Obtained</span>
              <span className="font-semibold text-gray-800">{studentData.results.marksObtained}</span>
            </div>
            <div className="flex justify-between items-center py-2 border-b border-gray-200">
              <span className="text-gray-600">Percentage</span>
              <div className="flex items-center gap-2">
                <div className="w-24 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="h-full bg-green-500 rounded-full" style={{ width: `${studentData.results.percentage}%` }}></div>
                </div>
                <span className="font-bold text-green-600">{studentData.results.percentage}%</span>
              </div>
            </div>
            <div className="flex justify-between items-center pt-2">
              <span className="text-gray-600">Grade</span>
              <div className="w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold shadow-lg">
                {studentData.results.grade}
              </div>
            </div>
          </div>
        </div>

        {/* Syllabus Card */}
        <div className="group bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl p-6 border border-white/40 transform transition-all duration-300 hover:shadow-2xl hover:-translate-y-1">
          <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
            <span className="w-1 h-6 bg-orange-500 rounded-full mr-3"></span>
            Syllabus
          </h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
            {studentData.syllabus.map((subject, idx) => (
              <div key={idx} className="flex items-center gap-3 p-2 rounded-lg hover:bg-gray-50 transition cursor-pointer group/subject">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center group-hover/subject:scale-110 transition">
                  <svg className="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253"></path>
                  </svg>
                </div>
                <span className="text-gray-700 text-sm font-medium">{subject}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Notice Board with Neumorphism */}
      <div className="bg-white rounded-2xl shadow-neumorphism p-6 transform transition-all duration-300 hover:shadow-neumorphism-hover">
        <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <div className="w-2 h-6 bg-gradient-to-b from-red-500 to-orange-500 rounded-full mr-3 animate-pulse"></div>
          Notice Board
          <span className="ml-3 text-xs bg-red-100 text-red-600 px-2 py-1 rounded-full">New</span>
        </h3>
        <div className="space-y-3">
          {studentData.notices.map((notice, idx) => (
            <div key={idx} className="group flex flex-col sm:flex-row sm:justify-between sm:items-center p-3 rounded-xl bg-gray-50 hover:bg-gradient-to-r hover:from-gray-50 hover:to-indigo-50 transition-all duration-300 cursor-pointer">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 bg-red-500 rounded-full animate-ping"></div>
                <span className="text-gray-700 font-medium">{notice.title}</span>
              </div>
              <span className="text-xs text-gray-400 mt-2 sm:mt-0">{notice.date}</span>
            </div>
          ))}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in-up {
          animation: fadeInUp 0.6s ease-out forwards;
        }
        
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
        
        @keyframes gradient {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        
        .animate-pulse-slow {
          animation: pulseSlow 3s ease-in-out infinite;
        }
        
        @keyframes pulseSlow {
          0%, 100% { transform: scale(1); opacity: 0.1; }
          50% { transform: scale(1.1); opacity: 0.2; }
        }
        
        .delay-1000 {
          animation-delay: 1s;
        }
        
        .animation-delay-200 {
          animation-delay: 0.2s;
        }
        
        .animation-delay-400 {
          animation-delay: 0.4s;
        }
        
        .perspective-1000 {
          perspective: 1000px;
        }
        
        .shadow-neumorphism {
          box-shadow: 20px 20px 40px #d1d9e6, -20px -20px 40px #ffffff;
        }
        
        .shadow-neumorphism-hover {
          box-shadow: 10px 10px 20px #d1d9e6, -10px -10px 20px #ffffff;
        }
      `}</style>
    </div>
  );
};

export default Dashboard;