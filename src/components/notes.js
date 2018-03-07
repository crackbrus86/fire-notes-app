import React from "react";
import firebase from "firebase";
import Comments from "./comments";
import * as _ from "underscore";
import FirebaseeStorage from "../store/firebase.storage";
import LocalStorage from "../store/local.storage";

class Notes extends React.Component{
    constructor(){
        super();
        this.state = {
            notes: [],
            showComments: [],
            comments: [],
            dataSource: ""
        }
        storage: null
    }

    createStorage(props){
        this.storage = (props.source === 'firebase')?  new FirebaseeStorage() : new LocalStorage();
    }

    handleRemove(noteId){   
        if(window.confirm("Are you sure you want to delete this note?")){
            if(this.state.dataSource === "firebase")
                this.removeInFireBase(noteId);
            else
                this.removeInLocalStorage(noteId);
        } 
    }

    removeInFireBase(noteId){
        const noteRef = firebase.database().ref(`/notes/${noteId}`);
        noteRef.remove(); 
    }

    removeInLocalStorage(noteId){
        var notes = (localStorage.getItem("notes"))? JSON.parse(localStorage.getItem("notes")) : [];
        notes = notes.filter(n => n.id !== noteId);
        localStorage.setItem("notes", JSON.stringify(notes));
        this.fetch();
    }

    fetch(){
        if(this.state.dataSource === "firebase")   
            this.fetchInFirebase();
        else
            this.fetchLocalStorage();      
    }

    fetchInFirebase(){
        this.fetchNotesInFirebase();
        this.fetchCommentsInFirebase();
    }

    fetchNotesInFirebase(){
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

    fetchCommentsInFirebase(){
        const commentsRef = firebase.database().ref('comments');
        commentsRef.on('value', (snapshot) => {
            let comments = snapshot.val();
            let newState = [];
            for(let comment in comments){
                    newState.push({
                        id: comment,
                        author: comments[comment].author,
                        content: comments[comment].content,
                        noteId: comments[comment].noteId,
                        createdAt: comments[comment].createdAt
                    })
            }
            this.setState({comments: newState});
        }) 
    }

    fetchLocalStorage(){
        this.fetchNotesInLocalStorage();
        this.fetchCommentsInLocalStorage();
    }

    fetchNotesInLocalStorage(){
        var notes = (localStorage.getItem("notes"))? JSON.parse(localStorage.getItem("notes")) : [];
        this.setState({notes: notes});
    }

    fetchCommentsInLocalStorage(){
        var comments = (localStorage.getItem("comments"))? JSON.parse(localStorage.getItem("comments")) : [];
        this.setState({comments: comments});
    }

    getImage(url, name){
        return (this.state.dataSource == "firebase")?
            this.renderImageFirebase(url, name) :
            this.renderImageLocalStorage(name);
    }

    renderImageFirebase(url, name){
        if(!url) return '';
        return <img className="card-img-top"  src={url} alt={name}/>
    }

    renderImageLocalStorage(name){
        var files = (localStorage.getItem("files"))? JSON.parse(localStorage.getItem("files")) : [];
        if(!files.length) return null;
        var file = _.find(files, f => f.name === name);
        if(!file) return null;
        return <img className="card-img-top"  src={file.file} alt={name}/>
    }

    componentDidMount(){
        this.createStorage(this.props);
        this.storage.fetch('notes').then(response => this.setState({notes: response}));
        this.storage.fetch('comments').then(response => this.setState({comments: response}));
    }

    componentWillReceiveProps(props){
        this.createStorage(props);
        this.storage.fetch('notes').then(response => this.setState({notes: response}));
        this.storage.fetch('comments').then(response => this.setState({comments: response}));
    }

    handleShowComments(id){
        var showing = this.state.showComments;
        showing.push(id);
        this.setState({showComments: showing});
    }

    handleHideComments(id){
        var showing = this.state.showComments;
        showing = showing.filter(item => item != id);
        this.setState({showComments: showing});
    }

    refresh(){
        if(this.state.dataSource != "firebase"){
            this.fetchCommentsInLocalStorage();
            this.forceUpdate();
        }        
    }

    renderNoteTemplate(note, index){
        var contains = _.contains(this.state.showComments, note.id);
        var commentsCount = this.state.comments.filter(comment => comment.noteId == note.id).length;
        return <div  key={index} className="note-template">
            <div className="card" style={{width: "20rem"}}>
                {this.getImage(note.url, note.fileName)}
                <div className="card-block">
                    <h4 className="card-title">{note.name}</h4>
                    <p className="card-text">{note.content}</p>
                    <button className="btn btn-primary" onClick={() => this.props.onEdit(note)}>Edit</button>
                    <button className="btn btn-danger" onClick={() => this.handleRemove(note.id)}>Delete</button>
                    <div className="row comments-info">
                        <div className="col-sm-8">
                        <button type="button" className="btn btn-link" onClick={() => this.handleShowComments(note.id)}>{commentsCount} comments</button>
                        </div>
                        <div className="col-sm-3 hide-comments">
                            <button type="button" className="btn btn-link" onClick={() => this.handleHideComments(note.id)}>Hide</button>
                        </div>
                    </div>
                </div>
            </div>
            <Comments noteId={note.id} show={contains} source={this.state.dataSource} refresh={this.refresh.bind(this)} />
        </div>
    }

    render(){
        var notes = (this.state.notes.length)? this.state.notes.map((note, index) => this.renderNoteTemplate(note, index)).reverse():<div><p>No one note was created:(</p></div>;
        return (<div>
            {notes}
        </div>)
    }
}
export default Notes;