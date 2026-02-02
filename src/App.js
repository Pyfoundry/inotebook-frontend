import React, { useState, useEffect } from "react";

import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";

function App() {
  // =========================
  // THEME: LIGHT / DARK MODE
  // =========================
  const [theme, setTheme] = useState("light");

  // 🔹 Load theme from localStorage on first render
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  // 🔹 Apply theme to body and store in localStorage whenever it changes
  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  // 🔹 Toggle theme
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  // =========================
  // ALERT / TOAST
  // =========================
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type: type });
    setTimeout(() => setAlert(null), 2500);
  };

  // =========================
  // ROUTE PROTECTION
  // =========================
  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <NoteState>
      <Router>
        {/* 🌟 MODERN NAVBAR */}
        <Navbar theme={theme} toggleTheme={toggleTheme} />

        {/* ALERT */}
        <Alert alert={alert} />

        {/* MAIN CONTENT */}
        <div className="container my-4">
          <Routes>
            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <RequireAuth>
                  <Home showAlert={showAlert} />
                </RequireAuth>
              }
            />
            <Route
              path="/about"
              element={
                <RequireAuth>
                  <About />
                </RequireAuth>
              }
            />
            <Route
              path="/edit-profile"
              element={<EditProfile theme={theme} toggleTheme={toggleTheme} />}
            />

            {/* Public Routes */}
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />
            <Route
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            {/* FALLBACK */}
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </div>
      </Router>
    </NoteState>
  );
}

export default App;
