import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./FrontPage.css";

const FrontPage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "iNotebook – Your Notes, Secure";
  }, []);

  const handleContinue = () => {
    const token = localStorage.getItem("token");
    token ? navigate("/home") : navigate("/login");
  };

  return (
    <div className="landing">
      <div className="content">
        <h1 className="title">iNotebook</h1>
        <p className="tagline">Your notes. Secure. Simple. Smart.</p>

        <button className="cta" onClick={handleContinue}>
          Continue →
        </button>

        <p className="trust">
          🔒 End-to-end encrypted • No ads • Private by default
        </p>
      </div>
    </div>
  );
};

export default FrontPage;
