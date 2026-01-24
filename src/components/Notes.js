import React, { useContext, useEffect, useRef, useState } from "react";
import noteContext from "../context/notes/noteContext";
import Noteitem from "./Noteitem";
import Addnote from "./Addnote";
import { useNavigate  } from "react-router-dom";

export default function Notes(props) {
  const context = useContext(noteContext);
  const { notes, getnotes, editNote} = context;
  const navigate = useNavigate();
  useEffect(() => {
    if(!localStorage.getItem('token')){
      navigate('/login')
    }
    getnotes();
    // eslint-disable-next-line
  }, []);
const [note, setNote] = useState({ id:"", etitle: "", edescription: "", etag: "" });
  
  const ref = useRef(null);
  const refclose = useRef(null);
  const updateNote = (currentNote) => {
    ref.current.click();
    setNote({id:currentNote._id,etitle:currentNote.title,edescription:currentNote.description,etag:currentNote.tag});
  };
  const handleclick = (e) => {
    refclose.current.click();
    props.showAlert("Note Edited Successfully","success")
    editNote(note.id,note.etitle, note.edescription, note.etag);
  };
  const onchange = (e) => {
    setNote({ ...note, [e.target.name]: e.target.value });
  };
  return (
    <>
      <Addnote showAlert={props.showAlert}/>
      <button
        type="button"
        className="btn btn-primary d-none"
        data-bs-toggle="modal"
        ref={ref}
        data-bs-target="#exampleModal"
      ></button>
      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h1 className="modal-title fs-5" id="exampleModalLabel">
                Edit Note
              </h1>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form className="my-3">
                <div className="mb-3">
                  <label htmlFor="etitle" className="form-label">
                    Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etitle"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    required="true"
                    minLength={5}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="edescription" className="form-label">
                    Description
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="edescription"
                    value={note.edescription}
                    name="edescription"
                    required="true"
                    minLength={5}
                    onChange={onchange}
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="etag" className="form-label">
                    Tag
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="etag"
                    name="etag"
                    value={note.etag}
                    onChange={onchange}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                ref={refclose}
                data-bs-dismiss="modal"
              >
                Close
              </button>
              <button disabled={note.edescription.length<5 || note.etitle.length<5} type="button" className="btn btn-primary" onClick={()=>{handleclick()}}>
                Update Note
              </button>
            </div>
          </div>
        </div>
      </div>
      <div className="row my-3">
        <h1>Your Notes</h1>
        <div className="container mx-2">
            {notes.length === 0 && "No Notes To Display."}
        </div>
        {notes.map((note) => {
          return (
            <Noteitem showAlert={props.showAlert} key={note._id} updateNote={updateNote} note={note} />
          );
        })}
      </div>
    </>
  );
}
