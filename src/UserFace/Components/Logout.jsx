// components/Logout.jsx
import React from 'react';

const Logout = ({ onLogout }) => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-12 text-center">
      <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
        <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Successfully Logged Out!</h2>
      <p className="text-gray-500 mb-6">Thank you for using our portal.</p>
      <button
        onClick={onLogout}
        className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
      >
        Go to Home Page
      </button>
    </div>
  );
};

export default Logout;