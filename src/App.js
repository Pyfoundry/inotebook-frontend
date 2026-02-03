//https://inotebook-frontend-si4u.onrender.com....live website working
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
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

function App() {
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

  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({ msg: message, type });
    setTimeout(() => setAlert(null), 2500);
  };

  const RequireAuth = ({ children }) => {
    const token = localStorage.getItem("token");
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <NoteState>
      <Router>
        <Navbar theme={theme} toggleTheme={toggleTheme} />
        <Alert alert={alert} />

        <Routes>
          {/* 🌟 LANDING PAGE */}
          <Route path="/" element={<FrontPage />} />

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

          <Route path="/edit-profile" element={<EditProfile />} />

          {/* 🌍 PUBLIC */}
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

          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </Router>
    </NoteState>
  );
}

export default App;
