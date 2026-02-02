import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const navigate = useNavigate();

  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "No email";

  const avatarInitial = name.charAt(0).toUpperCase();

  return (
    <div className="container my-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card profile-page shadow-lg glass-card">
            <div className="card-body text-center p-4">
              <div className="profile-avatar mx-auto mb-3">{avatarInitial}</div>

              <h3 className="fw-bold mb-1">{name}</h3>
              <p className="text-muted">{email}</p>

              <hr />

              <div className="text-start mt-3">
                <p>
                  <strong>Account Type:</strong> Free
                </p>
                <p>
                  <strong>Status:</strong>{" "}
                  <span className="text-success">Active</span>
                </p>
              </div>

              {/* ✅ FIXED BUTTON */}
              <button
                className="btn btn-outline-primary mt-3 w-100"
                onClick={() => navigate("/edit-profile")}
              >
                ✏️ Edit Profile
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
