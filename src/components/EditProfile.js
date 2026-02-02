import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

const EditProfile = ({ theme = "light" }) => {
  const navigate = useNavigate();

  const storedName = localStorage.getItem("name") || "User";
  const storedEmail = localStorage.getItem("email") || "";

  const [name, setName] = useState(storedName);
  const [email, setEmail] = useState(storedEmail);
  const [message, setMessage] = useState("");

  useEffect(() => {
    setName(localStorage.getItem("name") || "User");
    setEmail(localStorage.getItem("email") || "");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    localStorage.setItem("name", name);
    localStorage.setItem("email", email);

    setMessage("Profile updated successfully ✅");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className={`container my-5 ${theme === "dark" ? "text-light" : ""}`}>
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div
            className={`card shadow-lg ${
              theme === "dark" ? "bg-dark text-light" : ""
            }`}
          >
            <div className="card-body p-4">
              <h3 className="fw-bold text-center mb-4">Edit Profile</h3>

              {message && (
                <div className="alert alert-success text-center">{message}</div>
              )}

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="form-label">Name</label>
                  <input
                    type="text"
                    className={`form-control ${
                      theme === "dark" ? "bg-secondary text-light" : ""
                    }`}
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="form-label">Email</label>
                  <input
                    type="email"
                    className={`form-control ${
                      theme === "dark" ? "bg-secondary text-light" : ""
                    }`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <button type="submit" className="btn btn-primary w-100">
                  Save Changes
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
