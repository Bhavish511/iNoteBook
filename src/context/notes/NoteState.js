import { useState } from "react";
import NoteContext from "./noteContext";
// import { useState } from "react";
const NoteState = (props) => { 
    const notesInitial = [
        {
            "_id": "697298d055e01761805f008c",
            "user": "697296bbe5983a8a05ec768b",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2026-01-22T21:38:24.769Z",
            "__v": 0
        },
        {
            "_id": "697298e255e01761805f008e",
            "user": "697296bbe5983a8a05ec768b",
            "title": "My title",
            "description": "Please wake up early",
            "tag": "Personal",
            "date": "2026-01-22T21:38:42.971Z",
            "__v": 0
        }
    ]    
    const [notes, setnotes] = useState(notesInitial)   
    return(
        <NoteContext.Provider value={{notes,setnotes}}>
            {props.children}
        </NoteContext.Provider>
    )
};

export default NoteState;