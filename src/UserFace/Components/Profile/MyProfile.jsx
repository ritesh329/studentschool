// Components/Profile/MyProfile.jsx
import React from 'react';

const MyProfile = ({ studentData }) => {
  return (
    <div className="bg-white rounded-2xl shadow-xl p-6 animate-fade-in-up">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Avatar Section */}
        <div className="flex flex-col items-center space-y-4">
          <div className="relative">
            <div className="w-32 h-32 md:w-40 md:h-40 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white text-4xl md:text-5xl font-bold shadow-xl ring-4 ring-white">
              {studentData?.name?.split(' ').map(n => n[0]).join('') || 'S'}
            </div>
            <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-green-500 rounded-full flex items-center justify-center shadow-lg">
              <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
          </div>
          <div className="text-center">
            <p className="font-bold text-gray-800">{studentData?.name}</p>
            <p className="text-sm text-gray-500">{studentData?.rollNo}</p>
          </div>
        </div>

        {/* Info Section */}
        <div className="flex-1">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 ">
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Roll Number</p>
              <p className="font-semibold text-gray-800">{studentData?.rollNo}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Student Name</p>
              <p className="font-semibold text-gray-800">{studentData?.name}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Father's Name</p>
              <p className="font-semibold text-gray-800">rohan kumar</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Mother's Name</p>
              <p className="font-semibold text-gray-800">aaruhi devi</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Class</p>
              <p className="font-semibold text-gray-800">{studentData?.className}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Date of Birth</p>
              <p className="font-semibold text-gray-800">{studentData?.dob}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Email Address</p>
              <p className="font-semibold text-gray-800 break-all">{studentData?.email}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Phone Number</p>
              <p className="font-semibold text-gray-800">{studentData?.phone}</p>
            </div>
            <div className="bg-gray-50 border rounded-xl p-4 md:col-span-2 transform transition-all duration-300 hover:scale-105">
              <p className="text-xs text-gray-500 mb-1">Address</p>
              <p className="font-semibold text-gray-800">{studentData?.address}</p>
            </div>
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

export default MyProfile;