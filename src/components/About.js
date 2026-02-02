import React from "react";
import "../App.css";

function About() {
  return (
    <div className="container my-5 position-relative">
      {/* 🌟 Hero Section */}
      <div className="hero-section text-center position-relative mb-5">
        {/* Animated clouds */}
        <div className="clouds">
          <span className="cloud">☁️</span>
          <span className="cloud">☁️</span>
          <span className="cloud">☁️</span>
        </div>

        <h1 className="fw-bold mb-3">Welcome to iNotebook</h1>
        <p className="lead text-muted">
          Your personal cloud notebook — simple, secure, and fast.
        </p>

        {/* Floating icons */}
        <div className="floating-icons">
          <span className="icon">📝</span>
          <span className="icon">☁️</span>
          <span className="icon">🔐</span>
          <span className="icon">⚡</span>
          <span className="icon">📱</span>
        </div>
      </div>

      {/* Main Card */}
      <div className="card glass-card shadow-lg border-0 rounded-4 p-4">
        <div className="card-body p-4">
          <h3 className="mb-3">📘 What is iNotebook?</h3>
          <p className="text-muted">
            iNotebook is a modern note-taking web application that allows users
            to securely create, edit, and manage their notes from anywhere. Your
            notes are stored safely in the cloud and accessible anytime.
          </p>

          <hr />

          <h3 className="mb-3">✨ Features</h3>
          <ul className="list-group list-group-flush">
            <li className="list-group-item feature-item">
              🔐 Secure Login & Authentication
            </li>
            <li className="list-group-item feature-item">
              📝 Create, Edit & Delete Notes
            </li>
            <li className="list-group-item feature-item">
              ☁️ Cloud-based Storage
            </li>
            <li className="list-group-item feature-item">
              ⚡ Fast & Responsive UI
            </li>
            <li className="list-group-item feature-item">
              📱 Works on All Devices
            </li>
          </ul>

          <hr />

          <h3 className="mb-3">🚀 Why iNotebook?</h3>
          <p className="text-muted">
            iNotebook is designed for students, developers, and professionals
            who want a distraction-free, reliable, and modern way to organize
            their thoughts and ideas.
          </p>

          <div className="text-center mt-4">
            <span className="badge tech-badge bg-primary p-2 mx-1">React</span>
            <span className="badge tech-badge bg-success p-2 mx-1">
              Node.js
            </span>
            <span className="badge tech-badge bg-warning text-dark p-2 mx-1">
              MongoDB
            </span>
            <span className="badge tech-badge bg-info text-dark p-2 mx-1">
              Bootstrap
            </span>
          </div>
        </div>
      </div>

      {/* Footer Text */}
      <p className="text-center text-muted mt-4">
        © {new Date().getFullYear()} iNotebook — Made with Priyanshi ❤️
      </p>
      <div className="hero-section text-center position-relative mb-5">
        {/* Animated clouds */}
        <div className="clouds">
          <span className="cloud">☁️</span>
          <span className="cloud">☁️</span>
          <span className="cloud">☁️</span>
        </div>

        <h1 className="fw-bold mb-3">Welcome to iNotebook</h1>
        <p className="lead text-muted">
          Your personal cloud notebook — simple, secure, and fast.
        </p>

        {/* Floating icons */}
        <div className="floating-icons">
          <span className="icon">📝</span>
          <span className="icon">☁️</span>
          <span className="icon">🔐</span>
          <span className="icon">⚡</span>
          <span className="icon">📱</span>
        </div>

        {/* Floating Notebook + Pen SVG */}
        <div className="floating-svg">
          <svg
            width="150"
            height="150"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Notebook */}
            <rect x="8" y="8" width="40" height="48" rx="2" fill="#1976d2" />
            <line
              x1="12"
              y1="16"
              x2="44"
              y2="16"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="12"
              y1="24"
              x2="44"
              y2="24"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="12"
              y1="32"
              x2="44"
              y2="32"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="12"
              y1="40"
              x2="44"
              y2="40"
              stroke="white"
              strokeWidth="1.5"
            />
            <line
              x1="12"
              y1="48"
              x2="44"
              y2="48"
              stroke="white"
              strokeWidth="1.5"
            />

            {/* Pen */}
            <rect x="48" y="40" width="2" height="12" fill="#ff9800" />
            <polygon points="50,40 49,36 51,36" fill="#ff9800" />
          </svg>
        </div>
      </div>
      <div className="floating-svg">
        <svg
          width="150"
          height="150"
          viewBox="0 0 64 64"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Notebook */}
          <rect x="8" y="8" width="40" height="48" rx="2" fill="#1976d2" />

          {/* Lines on notebook */}
          <line
            x1="12"
            y1="16"
            x2="44"
            y2="16"
            stroke="white"
            strokeWidth="1.5"
          />
          <line
            x1="12"
            y1="24"
            x2="44"
            y2="24"
            stroke="white"
            strokeWidth="1.5"
          />
          <line
            x1="12"
            y1="32"
            x2="44"
            y2="32"
            stroke="white"
            strokeWidth="1.5"
          />
          <line
            x1="12"
            y1="40"
            x2="44"
            y2="40"
            stroke="white"
            strokeWidth="1.5"
          />
          <line
            x1="12"
            y1="48"
            x2="44"
            y2="48"
            stroke="white"
            strokeWidth="1.5"
          />

          {/* Animated writing line */}
          <line
            x1="12"
            y1="48"
            x2="44"
            y2="48"
            stroke="yellow"
            strokeWidth="2"
            strokeDasharray="32"
            strokeDashoffset="32"
            className="writing-line"
          />

          {/* Pen */}
          <rect
            x="48"
            y="40"
            width="2"
            height="12"
            fill="#ff9800"
            className="pen"
          />
          <polygon
            points="50,40 49,36 51,36"
            fill="#ff9800"
            className="pen-tip"
          />
        </svg>
      </div>
    </div>
  );
}

export default About;
