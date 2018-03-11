import React from "react";
import {CardTemplate} from "../components/template.components";

export const Notes = (props) => {
        let notesList = (props.notes.length)? props.notes.map((note, index) => <CardTemplate key={index} 
        note={note} comments={props.comments} shown={!!props.shown.includes(note.id)} actions={props.actions} />).reverse() : <div><p>No one note was created:(</p></div>;
        return <div>
            {notesList}
        </div>;
}
