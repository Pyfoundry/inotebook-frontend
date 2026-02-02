import React, { useContext } from "react";
import notecontext from "../context/notes/noteContext";
import "../App.css";

const Noteitem = (props) => {
  const context = useContext(notecontext);
  const { deleteNote } = context;
  const { note, updateNote } = props;

  return (
    <div className="col-md-4 mb-3">
      <div
        className="card h-100 shadow-sm border-0 rounded-4 note-card"
        style={{ transition: "transform 0.2s" }}
      >
        <div className="card-body d-flex flex-column">
          <div className="d-flex justify-content-between align-items-start mb-2">
            <h5 className="card-title">{note.title}</h5>
            <div>
              <i
                className="fa-solid fa-pen-to-square mx-1 text-primary"
                style={{ cursor: "pointer" }}
                onClick={() => updateNote(note)}
                title="Edit Note"
              ></i>
              <i
                className="fa-sharp fa-solid fa-trash mx-1 text-danger"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  deleteNote(note._id);
                  props.showAlert("Deleted successfully", "success");
                }}
                title="Delete Note"
              ></i>
            </div>
          </div>

          <p className="card-text flex-grow-1">{note.description}</p>

          {note.tag && (
            <span className="badge bg-secondary mt-auto">{note.tag}</span>
          )}
        </div>
      </div>
    </div>
  );
};

export default Noteitem;
