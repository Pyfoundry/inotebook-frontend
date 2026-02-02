import React, { useState, useContext } from "react";
import noteContext from "../context/notes/noteContext";

const AddNote = (props) => {
  const context = useContext(noteContext);
  const { addNote } = context;

  const [note, setNote] = useState({
    title: "",
    description: "",
    tag: "",
  });

  const handleClick = (e) => {
    e.preventDefault();
    addNote(note.title, note.description, note.tag);
    setNote({ title: "", description: "", tag: "" });
    props.showAlert("Note added successfully", "success");
  };

  const onChange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };

  return (
    <div className="card shadow-sm mb-5">
      <div className="card-body">
        <h2 className="card-title text-center mb-4 fw-bold">Add a New Note</h2>

        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label fw-semibold">
              Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              placeholder="Enter note title"
              value={note.title}
              onChange={onChange}
              minLength={3}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="description" className="form-label fw-semibold">
              Description
            </label>
            <textarea
              className="form-control"
              id="description"
              name="description"
              rows="3"
              placeholder="Enter note description"
              value={note.description}
              onChange={onChange}
              minLength={5}
              required
            />
          </div>

          <div className="mb-3">
            <label htmlFor="tag" className="form-label fw-semibold">
              Tag (optional)
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              placeholder="e.g. Work, Personal"
              value={note.tag}
              onChange={onChange}
            />
          </div>

          <div className="text-center">
            <button
              disabled={note.title.length < 3 || note.description.length < 5}
              type="submit"
              className="btn btn-primary px-4"
              onClick={handleClick}
            >
              Add Note
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddNote;
