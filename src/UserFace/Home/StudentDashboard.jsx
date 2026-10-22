
import React, { useState } from 'react';

import Dashboard from '../Components/StuDasboard/Dashboard';
import MyProfile from '../Components/Profile/MyProfile';
import Attendance from '../Components/StuAttendance/Attendance';
import Fees from '../Components/Fees';
import Results from '../Components/StuResult/Results';
import TestMarks from '../Components/StuResult/TestMarks';
import Syllabus from '../Components/Notice/Syllabus';
import NoticeBoard from '../Components/Notice/NoticeBoard';
import Logout from '../Components/Logout';

const StudentDashboard = ({ studentData, onLogout }) => {
  const [activePage, setActivePage] = useState('dashboard');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const renderPage = () => {
    switch (activePage) {
      case 'dashboard':
        return <Dashboard studentData={studentData} />;

      case 'profile':
        return <MyProfile studentData={studentData} />;

      case 'attendance':
        return <Attendance studentData={studentData} />;

      case 'fees':
        return <Fees studentData={studentData} />;

      case 'results':
        return <Results studentData={studentData} />;

      case 'testmarks':
        return <TestMarks studentData={studentData} />;

      case 'syllabus':
        return <Syllabus studentData={studentData} />;

      case 'notices':
        return <NoticeBoard studentData={studentData} />;

      case 'logout':
        return <Logout onLogout={onLogout} />;

      default:
        return <Dashboard studentData={studentData} />;
    }
  };

  const navItems = [
    {
      id: 'dashboard',
      name: 'Dashboard',
      icon: 'M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6',
    },
    {
      id: 'profile',
      name: 'My Profile',
      icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
    },
    {
      id: 'attendance',
      name: 'Attendance',
      icon: 'M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      id: 'results',
      name: 'Results',
      icon: 'M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z',
    },
    {
      id: 'testmarks',
      name: 'Test Marks',
      icon: 'M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2',
    },
    {
      id: 'syllabus',
      name: 'Syllabus',
      icon: 'M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253',
    },
    {
      id: 'notices',
      name: 'Notifications',
      icon: 'M11 5.882V19.24a1.76 1.76 0 01-3.417.592l-2.147-6.15M18 13a3 3 0 100-6m0 6a3 3 0 110-6m0 6v6m-4-6h8',
    },
    {
      id: 'fees',
      name: 'Fees',
      icon: 'M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z',
    },
    {
      id: 'logout',
      name: 'Logout',
      icon: 'M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1',
    },
  ];

  const handleNavigation = (page) => {
    setActivePage(page);
    setIsMobileMenuOpen(false);
  };

  const renderNavItems = (isMobile = false) => (
    <nav
      className={
        isMobile
          ? 'p-2 space-y-1 max-h-[70vh] overflow-y-auto'
          : 'p-4 space-y-1'
      }
    >
      {navItems.map((item) => (
        <button
          key={item.id}
          type="button"
          onClick={() => handleNavigation(item.id)}
          aria-current={activePage === item.id ? 'page' : undefined}
          className={`w-full text-left px-4 ${
            isMobile ? 'py-3' : 'py-2'
          } rounded-lg transition-colors duration-200 flex items-center gap-3 ${
            activePage === item.id
              ? 'bg-[#F5EDE0] text-[#16233F] font-semibold'
              : 'text-gray-600 hover:bg-gray-50'
          }`}
        >
          <svg
            className="w-5 h-5 shrink-0"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            aria-hidden="true"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={item.icon}
            />
          </svg>

          <span className={isMobile ? 'text-sm' : 'text-sm'}>
            {item.name}
          </span>

          {isMobile && activePage === item.id && (
            <svg
              className="w-4 h-4 ml-auto shrink-0"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              aria-hidden="true"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
      ))}
    </nav>
  );

  return (
    <div className="min-h-screen w-full bg-gray-100">
      {/* Header */}
      <header className="bg-white shadow-md sticky top-0 z-50">
        <div className="w-full px-3 sm:px-4 lg:px-4 py-3 flex justify-between items-center flex-wrap gap-4">
          {/* Logo and Student Information */}
          <div className="flex items-center gap-2 min-w-0">
            <div className="w-10 h-10 shrink-0 bg-[#16233F] rounded-lg flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-xl">S</span>
            </div>

            <div className="min-w-0">
              <h1 className="text-base sm:text-lg font-bold text-gray-800">
                Student Dashboard
              </h1>

              <p className="text-xs text-gray-500 truncate max-w-[180px] sm:max-w-none">
                Welcome, {studentData?.name || 'Student'}
              </p>
            </div>
          </div>

          {/* Header Actions */}
          <div className="flex items-center gap-3 ml-auto">
            <span className="text-sm text-gray-600 hidden md:inline">
              Roll No: {studentData?.rollNo || 'N/A'}
            </span>

            {/* Desktop Logout */}
            <button
              type="button"
              onClick={() => handleNavigation('logout')}
              className="hidden sm:block px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 active:bg-red-700 transition-colors text-sm"
            >
              Logout
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setIsMobileMenuOpen((prev) => !prev)}
              className="lg:hidden relative w-10 h-10 shrink-0 rounded-lg bg-[#16233F] text-white flex items-center justify-center shadow-md hover:bg-[#24385e] transition-colors"
              aria-label={
                isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'
              }
              aria-expanded={isMobileMenuOpen}
              aria-controls="student-mobile-menu"
            >
              <div className="relative w-5 h-5">
                <span
                  className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'top-2 rotate-45'
                      : 'top-0'
                  }`}
                />

                <span
                  className={`absolute left-0 top-2 w-5 h-0.5 bg-white rounded-full transition-opacity duration-200 ${
                    isMobileMenuOpen ? 'opacity-0' : 'opacity-100'
                  }`}
                />

                <span
                  className={`absolute left-0 w-5 h-0.5 bg-white rounded-full transition-all duration-300 ${
                    isMobileMenuOpen
                      ? 'top-2 -rotate-45'
                      : 'top-4'
                  }`}
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Logout */}
        <div className="sm:hidden px-3 pb-3">
          <button
            type="button"
            onClick={() => handleNavigation('logout')}
            className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600 transition-colors text-sm"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Mobile Menu Backdrop and Dropdown */}
      {isMobileMenuOpen && (
        <div className="lg:hidden">
          <button
            type="button"
            aria-label="Close navigation menu"
            onClick={() => setIsMobileMenuOpen(false)}
            className="fixed inset-0 bg-black/40 z-[60]"
          />

          <div
            id="student-mobile-menu"
            className="fixed top-[72px] right-3 sm:right-4 w-[min(16rem,calc(100vw-1.5rem))] bg-white rounded-2xl shadow-2xl z-[70] overflow-hidden animate-slide-in-right"
          >
            <div className="p-3 border-b border-gray-100 bg-[#F7F5EF]">
              <div className="flex items-center gap-2 min-w-0">
                <div className="w-9 h-9 shrink-0 bg-[#16233F] rounded-full flex items-center justify-center">
                  <span className="text-white font-bold text-sm">
                    {(studentData?.name || 'S').charAt(0).toUpperCase()}
                  </span>
                </div>

                <div className="min-w-0">
                  <p className="text-xs text-gray-500">
                    Quick Navigation
                  </p>

                  <p className="text-sm font-semibold text-gray-800 truncate">
                    {studentData?.name || 'Student'}
                  </p>
                </div>
              </div>
            </div>

            {renderNavItems(true)}
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="w-full px-3 sm:px-4 lg:px-4 py-4 lg:py-6">
        <div className="flex flex-col lg:flex-row gap-4 lg:gap-6">
          {/* Desktop Sidebar */}
          <aside className="hidden lg:block lg:w-64 shrink-0 bg-white rounded-xl shadow-lg h-fit sticky top-20">
            {renderNavItems(false)}
          </aside>

          {/* Page Content */}
          <main className="flex-1 min-w-0">
            {renderPage()}
          </main>
        </div>
      </div>

      {/* Mobile Menu Animation */}
      <style>{`
        @keyframes slideInRight {
          from {
            opacity: 0;
            transform: translateX(20px);
          }
          to {
            opacity: 1;
            transform: translateX(0);
          }
        }

        .animate-slide-in-right {
          animation: slideInRight 0.2s ease-out;
        }
      `}</style>
    </div>
  );
};

export default StudentDashboard;
