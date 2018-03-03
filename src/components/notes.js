import React from "react";
import firebase from "firebase";

class Notes extends React.Component{
    constructor(){
        super();
        this.state = {
            notes: []
        }
    }

    handleRemove(noteId){   
        if(window.confirm("Are you sure you want to delete this note?")){
            const noteRef = firebase.database().ref(`/notes/${noteId}`);
            noteRef.remove();
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

    getImage(url, name){
        if(!url) return '';
        return <img className="card-img-top"  src={url} alt={name}/>
    }

    componentDidMount(){
        this.fetch();
    }

    renderNoteTemplate(note, index){
        return <div className="card" style={{width: "20rem"}} key={index}>
        {this.getImage(note.url, note.fileName)}
        <div className="card-block">
          <h4 className="card-title">{note.name}</h4>
          <p className="card-text">{note.content}</p>
          <button className="btn btn-primary" onClick={() => this.props.onEdit(note)}>Edit</button>
          <button className="btn btn-danger" onClick={() => this.handleRemove(note.id)}>Delete</button>
        </div>
      </div>
    }

    render(){
        var notes = (this.state.notes.length)?this.state.notes.map((note, index) => this.renderNoteTemplate(note, index)):<div><p>No one note was created:(</p></div>;
        return (<div>
            {notes}
        </div>)
    }
}
export default Notes;