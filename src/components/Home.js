// import React, { useContext } from "react";
// import noteContext from '../context/notes/noteContext';
import Notes from "./Notes";


export default function Home(props) {
  // const context = useContext(noteContext);
  // const {notes, setnotes} = context;
  return (
    <div>
      <Notes showAlert={props.showAlert}/>
    </div>
  );
}
