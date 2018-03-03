import React from "react";
import firebase from "firebase";

class Notes extends React.Component{
    constructor(){
        super();
        this.state = {
            notes: []
        }
    }

    fetch(){
        const notesRef = firebase.database().ref('notes');
        notesRef.on('value', (snapshot) => {
            let notes = snapshot.val();
            let newState = [];
            for(let note in notes){
                newState.push({
                    id: note,
                    name: notes[note].name,
                    content: notes[note].content,
                    fileName: notes[note].fileName,
                    url: notes[note].url
                });
            }
            this.setState({notes: newState});
        })
    }

    getImage(url){
        if(!url) return '';
        return <img src={url} />
    }

    componentDidMount(){
        this.fetch();
    }

    render(){
        var notes = (this.state.notes.length)?this.state.notes.map((note, index) => {
        return <div className="note" key={index}>
            <header>{note.name}</header>
            <p>{note.content}</p>
            {this.getImage(note.url)}
        </div>} ):<div><p>No one note was created:(</p></div>;
        return (<div>
            {notes}
        </div>)
    }
}
export default Notes;