import React, { useEffect, useContext } from "react";
import Notes from "./Notes";
import noteContext from "../context/notes/noteContext";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
  const context = useContext(noteContext);
  const { getNotes, notes } = context;
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      getNotes();
    } else {
      navigate("/login");
    }
    // eslint-disable-next-line
  }, []);

  return (
    <div className="container my-4">
      {/* 🔹 Page Header */}
      <div className="text-center mb-4">
        <h1 className="fw-bold">Your Notes</h1>
        <p className="text-muted">
          Capture your thoughts, ideas and tasks securely ✨
        </p>
      </div>

      {/* 🔹 Notes Section */}
      <Notes showAlert={props.showAlert} />

      {/* 🔹 Empty State */}
      {notes.length === 0 && (
        <div className="text-center text-muted mt-4">
          <p>No notes to display. Start by adding a new note 📝</p>
        </div>
      )}
    </div>
  );
};

export default Home;
