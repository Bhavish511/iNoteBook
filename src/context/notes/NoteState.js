import { useState } from "react";
import NoteContext from "./noteContext";
const NoteState = (props) => {
  const host = "http://localhost:5000";
  const [notes, setnotes] = useState([]);
  const getnotes = async () => {
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
    });
    const json = await response.json();
    console.log(json.data);
    setnotes(json.data);
  };
  // Add a note
  const addNote = async (title, description, tag) => {
    //
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const json = await response.json();
    setnotes(prev => prev.concat(json.note));
  };
  // Delete a note
  const deleteNote = async (id) => {
        const newNotes = notes.filter((note) => note._id !== id);
        setnotes(newNotes);
      await fetch(`${host}/api/notes/deletenote/${id}`, {
          method: "DELETE",
          headers: {
              "Content-Type": "application/json",
              "auth-token": localStorage.getItem('token')
            },
        });  
  };
  // Edit a note
  const editNote = async (id, title, description, tag) => {
    // API Call

    await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag }),
    });
    let newNotes = JSON.parse(JSON.stringify(notes));
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes);
  };
  return (
    <NoteContext.Provider value={{ notes, editNote, addNote, deleteNote,getnotes }}>
      {props.children}
    </NoteContext.Provider>
  );
};

export default NoteState;
