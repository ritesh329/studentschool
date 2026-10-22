// UserFace/Home.jsx
import React, { useState, useEffect } from 'react';
import SchoolHome from './SchoolHome';
import StudentDashboard from './StudentDashboard';
import { useAuth } from '../../context/AuthContext';
import { getMyFullProfile } from '../../api/studentApi';

const Home = () => {
  const { isStudentAuthenticated, loginStudent, logoutStudent } = useAuth();
  const [studentData, setStudentData] = useState(null);
  const [loading, setLoading] = useState(false);

  const loadProfile = async () => {
    setLoading(true);
    try {
      const res = await getMyFullProfile();
      setStudentData(res.data.data);
    } catch (err) {
      console.error('Failed to load student profile', err);
      logoutStudent();
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isStudentAuthenticated) {
      loadProfile();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isStudentAuthenticated]);

  const handleLogin = async (rollNo, password) => {
    await loginStudent(rollNo, password);
    await loadProfile();
    return true;
  };

  const handleLogout = () => {
    logoutStudent();
    setStudentData(null);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {!isStudentAuthenticated ? (
        <SchoolHome onLogin={handleLogin} />
      ) : loading || !studentData ? (
        <div className="min-h-screen flex items-center justify-center">
          <p className="text-gray-500">Loading your dashboard...</p>
        </div>
      ) : (
        <StudentDashboard studentData={studentData} onLogout={handleLogout} />
      )}
    </div>
  );
};

export default Home;
