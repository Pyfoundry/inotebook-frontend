import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import "../App.css";

const Signup = (props) => {
  const [credentials, setCredentials] = useState({
    name: "",
    email: "",
    password: "",
    cpassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errorShake, setErrorShake] = useState(false);
  const [passwordVisible, setPasswordVisible] = useState(false);

  const navigate = useNavigate();

  const onChange = (e) => {
    setCredentials({ ...credentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (credentials.password !== credentials.cpassword) {
      props.showAlert("Passwords do not match ❌", "danger");
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(
        "https://inotebook-backend-w1s8.onrender.com/api/auth/createuser",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: credentials.name,
            email: credentials.email,
            password: credentials.password,
          }),
        },
      );

      const json = await response.json();

      if (json.success) {
        localStorage.setItem("token", json.authToken);
        props.showAlert("Account Created 🎉", "success");
        navigate("/");
      } else {
        throw new Error();
      }
    } catch {
      props.showAlert("User already exists ❌", "danger");
      setErrorShake(true);
      setTimeout(() => setErrorShake(false), 500);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container my-5 signup-page">
      <div
        className={`card signup-card glass-card mx-auto ${
          errorShake ? "shake" : ""
        }`}
      >
        <h2 className="text-center fw-bold mb-2">Create Account 🚀</h2>
        <p className="text-center text-muted mb-4">Join iNotebook today</p>

        <form onSubmit={handleSubmit}>
          <div className="form-floating mb-3">
            <input
              type="text"
              className="form-control"
              name="name"
              placeholder="Name"
              value={credentials.name}
              onChange={onChange}
              required
            />
            <label>Name</label>
          </div>

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
            <label>Email</label>
          </div>

          <div className="form-floating mb-3 position-relative">
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

          <div className="form-floating mb-3">
            <input
              type="password"
              className="form-control"
              name="cpassword"
              placeholder="Confirm Password"
              value={credentials.cpassword}
              onChange={onChange}
              required
            />
            <label>Confirm Password</label>
          </div>

          <div className="d-grid mt-3">
            <button
              type="submit"
              className="btn btn-primary btn-lg ripple-btn"
              disabled={loading}
            >
              {loading ? <span className="spinner"></span> : "Sign Up"}
            </button>
          </div>
        </form>

        <div className="text-center mt-4">
          <span className="text-muted">Already have an account?</span>
          <br />
          <Link to="/login" className="fw-semibold text-decoration-none">
            Login →
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Signup;
