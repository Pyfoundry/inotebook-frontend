//https://inotebook-frontend-si4u.onrender.com....live website working
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";

import FrontPage from "./components/FrontPage";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import About from "./components/About";
import Alert from "./components/Alert";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import Login from "./components/Login";
import Signup from "./components/Signup";
import NoteState from "./context/notes/NoteState";

/* 🔐 AUTH WRAPPER */
const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  return token ? children : <Navigate to="/login" replace />;
};

/* 🧭 NAVBAR CONTROLLER */
const Layout = ({ children, theme, toggleTheme }) => {
  const location = useLocation();
  const hideNavbar = location.pathname === "/";

  return (
    <>
      {!hideNavbar && <Navbar theme={theme} toggleTheme={toggleTheme} />}
      {children}
    </>
  );
};

function App() {
  /* 🌗 THEME */
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) setTheme(savedTheme);
  }, []);

  useEffect(() => {
    document.body.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
  };

  /* 🚨 ALERT */
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  return (
    <NoteState>
      <Router>
        <Layout theme={theme} toggleTheme={toggleTheme}>
          <Alert alert={alert} />

          <Routes>
            {/* 🌟 LANDING */}
            <Route
              path="/"
              element={
                localStorage.getItem("token") ? (
                  <Navigate to="/home" replace />
                ) : (
                  <FrontPage />
                )
              }
            />

            {/* 🌍 PUBLIC */}
            <Route path="/login" element={<Login showAlert={showAlert} />} />
            <Route path="/signup" element={<Signup showAlert={showAlert} />} />

            {/* 🔐 PROTECTED */}
            <Route
              path="/home"
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
              path="/profile"
              element={
                <RequireAuth>
                  <Profile />
                </RequireAuth>
              }
            />

            <Route
              path="/edit-profile"
              element={
                <RequireAuth>
                  <EditProfile />
                </RequireAuth>
              }
            />

            {/* ❌ FALLBACK */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </NoteState>
  );
}

export default App;
