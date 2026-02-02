import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Login = (props) => {
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);
  const [loginSuccess, setLoginSuccess] = useState(false);

  const navigate = useNavigate();

  // =========================
  // REMEMBER ME LOAD
  // =========================
  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberEmail");
    if (savedEmail) {
      setCredentials((p) => ({ ...p, email: savedEmail }));
      setRememberMe(true);
    }
  }, []);

  // =========================
  // INPUT CHANGE
  // =========================
  const onChange = (e) => {
    const { name, value } = e.target;
    setCredentials({ ...credentials, [name]: value });

    if (name === "password") calculateStrength(value);
  };

  // =========================
  // PASSWORD STRENGTH
  // =========================
  const calculateStrength = (password) => {
    let score = 0;
    if (password.length >= 6) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[@$!%*?&]/.test(password)) score++;
    setPasswordStrength(score);
  };

  // =========================
  // SUBMIT
  // =========================
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const response = await fetch(
        fetch("https://inotebook-backend-w1s8.onrender.com/api/auth/login"),
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(credentials),
        },
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        localStorage.setItem("name", json.user?.name || "User");
        localStorage.setItem("email", json.user?.email || credentials.email);

        rememberMe
          ? localStorage.setItem("rememberEmail", credentials.email)
          : localStorage.removeItem("rememberEmail");

        props.showAlert("Login Successful 🎉", "success");
        setLoginSuccess(true);

        setTimeout(() => navigate("/"), 900);
      } else {
        throw new Error();
      }
    } catch {
      props.showAlert("Invalid credentials ❌", "danger");
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <div
        className={`card login-card glass-card mx-auto ${
          errorShake ? "shake" : ""
        }`}
        style={{ maxWidth: "450px" }}
      >
        <div className="card-body p-4">
          <h2 className="text-center fw-bold mb-2">Welcome Back 👋</h2>
          <p className="text-center text-muted mb-4">
            Login to continue to iNotebook
          </p>

          <form onSubmit={handleSubmit}>
            {/* EMAIL */}
            <div className="form-floating mb-3">
              <input
                type="email"
                className="form-control"
                name="email"
                placeholder="Email"
                value={credentials.email}
                onChange={onChange}
                required
              />
              <label>Email address</label>
            </div>

            {/* PASSWORD */}
            <div className="form-floating mb-2 position-relative">
              <input
                type={passwordVisible ? "text" : "password"}
                className="form-control"
                name="password"
                placeholder="Password"
                value={credentials.password}
                onChange={onChange}
                required
              />
              <label>Password</label>
              <span
                className="password-eye"
                onClick={() => setPasswordVisible(!passwordVisible)}
              >
                {passwordVisible ? "🙈" : "👁️"}
              </span>
            </div>

            {/* PASSWORD STRENGTH */}
            {credentials.password && (
              <>
                <div className="password-strength-bar">
                  <div
                    className={`strength strength-${passwordStrength}`}
                    style={{ width: `${(passwordStrength / 4) * 100}%` }}
                  ></div>
                </div>
                <div className="strength-tooltip">
                  {passwordStrength === 0
                    ? "Too weak"
                    : ["Weak", "Okay", "Good", "Strong"][passwordStrength - 1]}
                </div>
              </>
            )}

            {/* REMEMBER ME */}
            <div className="form-check mt-3">
              <input
                className="form-check-input"
                type="checkbox"
                checked={rememberMe}
                onChange={() => setRememberMe(!rememberMe)}
              />
              <label className="form-check-label">Remember me</label>
            </div>

            {/* BUTTON */}
            <div className="d-grid mt-4">
              <button
                type="submit"
                className="btn btn-primary btn-lg ripple-btn"
                disabled={loading}
              >
                {loading ? (
                  <span className="spinner"></span>
                ) : loginSuccess ? (
                  "✔ Logged In"
                ) : (
                  "Login"
                )}
              </button>
            </div>
          </form>

          <div className="text-center mt-4">
            <span className="text-muted">Don’t have an account?</span>
            <br />
            <Link to="/signup" className="fw-semibold text-decoration-none">
              Create one →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
