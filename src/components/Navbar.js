import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const Navbar = ({ theme, toggleTheme }) => {
  const navigate = useNavigate();
  const location = useLocation();

  const [userName, setUserName] = useState(localStorage.getItem("name") || "");
  const [userEmail, setUserEmail] = useState(
    localStorage.getItem("email") || "",
  );

  useEffect(() => {
    const syncUser = () => {
      setUserName(localStorage.getItem("name") || "User");
      setUserEmail(localStorage.getItem("email") || "");
    };
    window.addEventListener("storage", syncUser);
    return () => window.removeEventListener("storage", syncUser);
  }, []);

  // Then you can conditionally render
  if (location.pathname === "/") return null;

  const handleLogout = () => {
    localStorage.clear();
    window.dispatchEvent(new Event("userChanged")); // ⭐
    navigate("/login");
  };

  const avatarInitial = userName ? userName.charAt(0).toUpperCase() : "U";

  return (
    <nav className="navbar navbar-expand-lg custom-navbar shadow-sm">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">
          iNotebook
        </Link>

        {/* Removed this misplaced ul from here to avoid render error */}
        {/* <ul className="dropdown-menu dropdown-menu-end shadow user-dropdown" aria-labelledby="userDropdown">
        </ul> */}

        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto">
            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/" ? "active" : ""
                }`}
                to="/"
              >
                Home
              </Link>
            </li>

            <li className="nav-item">
              <Link
                className={`nav-link ${
                  location.pathname === "/about" ? "active" : ""
                }`}
                to="/about"
              >
                About
              </Link>
            </li>
          </ul>

          {!localStorage.getItem("token") ? (
            <div className="d-flex">
              <Link className="btn btn-outline-secondary mx-1" to="/login">
                Login
              </Link>
              <Link className="btn btn-primary mx-1" to="/signup">
                Signup
              </Link>
            </div>
          ) : (
            <div className="d-flex align-items-center gap-3">
              {/* 🌙☀️ THEME TOGGLE */}
              <button
                onClick={toggleTheme} // ✅ Use prop from parent
                className="theme-toggle"
                title="Toggle theme"
              >
                {theme === "light" ? "🌙" : "☀️"}
              </button>

              {/* 👤 USER DROPDOWN */}
              <div className="nav-item dropdown position-relative">
                <button
                  className="btn d-flex align-items-center gap-2 dropdown-toggle"
                  id="userDropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <div className="avatar-circle">{avatarInitial}</div>
                  <span className="d-none d-md-inline">
                    {userName || "User"}
                  </span>
                </button>

                <ul
                  className="dropdown-menu dropdown-menu-end shadow user-dropdown"
                  aria-labelledby="userDropdown"
                >
                  <li className="px-3 py-2">
                    <strong>{userName || "User"}</strong>
                    <br />
                    <small className="text-muted">
                      {userEmail || "No email"}
                    </small>
                  </li>

                  <li>
                    <hr className="dropdown-divider" />
                  </li>

                  <li>
                    <Link className="dropdown-item" to="/profile">
                      👤 Profile
                    </Link>
                  </li>

                  <li>
                    <button
                      className="dropdown-item text-danger"
                      onClick={handleLogout}
                    >
                      🚪 Logout
                    </button>
                  </li>
                </ul>
              </div>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
