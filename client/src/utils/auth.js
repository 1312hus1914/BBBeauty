// src/utils/auth.js

export const getCurrentUser = () => {
  try {
    const stored = localStorage.getItem("bb_user");
    return stored ? JSON.parse(stored) : null;
  } catch (e) {
    return null;
  }
};

export const isAuthenticated = () => !!getCurrentUser();

export const isAdmin = () => getCurrentUser()?.role === "admin";
