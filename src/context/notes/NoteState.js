import { useState } from "react";
import NoteContext from "./noteContext";

const NoteState = (props) => {
  const host = "https://inotebook-backend-w1s8.onrender.com";
  const [notes, setNotes] = useState([]);

  //const authToken =
  //"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjk2NjEzMmNiMTcwZjA1ODhjMDNlZDIzIn0sImlhdCI6MTc2ODM2ODE1MX0.x4yzjypYG8f3SwLb2V5vggnaSWmT53BkqeggeTaNxFo";

  // GET NOTES
  const getNotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    const json = await response.json();
    setNotes(json);
  };

  // ADD NOTE
  const addNote = async (title, description, tag) => {
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
      body: JSON.stringify({ title, description, tag }),
    });

    const note = await response.json();
    setNotes(notes.concat(note));
  };

  // DELETE NOTE
  const deleteNote = async (id) => {
    await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem("token"),
      },
    });

    setNotes(notes.filter((note) => note._id !== id));
  };

  // EDIT NOTE (ONLY NECESSARY FIX)
  const editNote = async (id, title, description, tag) => {
    try {
      const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          "auth-token": localStorage.getItem("token"),
        },
        body: JSON.stringify({ title, description, tag }),
      });

      if (!response.ok) {
        throw new Error("Update failed");
      }

      // 🔴 THIS WAS MISSING
      await response.json();

      // 🔴 YOUR ORIGINAL LOGIC (UNCHANGED)
      const newNotes = JSON.parse(JSON.stringify(notes));
      for (let i = 0; i < newNotes.length; i++) {
        if (newNotes[i]._id === id) {
          newNotes[i].title = title;
          newNotes[i].description = description;
          newNotes[i].tag = tag;
          break;
        }
      }

      setNotes(newNotes);
    } catch (error) {
      console.error("Edit note error:", error);
    }
  };

  return (
    <NoteContext.Provider
      value={{ notes, getNotes, addNote, deleteNote, editNote }}
    >
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
