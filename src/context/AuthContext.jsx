import React, { createContext, useContext, useState, useCallback } from "react";
import { studentLogin as studentLoginApi, logoutApi } from "../api/authApi";

const AuthContext = createContext(null);

const readJSON = (key) => {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : null;
  } catch {
    return null;
  }
};

// Student portal session
export const AuthProvider = ({ children }) => {
  const [studentUser, setStudentUser] = useState(() => readJSON("sms_student_data"));

  const loginStudent = useCallback(async (rollNo, password) => {
    const res = await studentLoginApi(rollNo, password);
    const { token, refreshToken, student } = res.data;
    localStorage.setItem("sms_student_token", token);
    localStorage.setItem("sms_student_refresh", refreshToken || "");
    localStorage.setItem("sms_student_data", JSON.stringify(student));
    setStudentUser(student);
    return student;
  }, []);

  const logoutStudent = useCallback(() => {
    logoutApi(localStorage.getItem("sms_student_refresh"));
    localStorage.removeItem("sms_student_token");
    localStorage.removeItem("sms_student_refresh");
    localStorage.removeItem("sms_student_data");
    setStudentUser(null);
  }, []);

  const value = {
    studentUser,
    isStudentAuthenticated: !!studentUser && !!localStorage.getItem("sms_student_token"),
    loginStudent,
    logoutStudent,
    setStudentUser,
  };
  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
};
