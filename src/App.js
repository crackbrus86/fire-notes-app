import React from 'react';
import {Settings} from "./components/settings";
import {Title, Header, AppContent, Section} from "./components/layout.components";
import { Store } from "./store/store";
import firebase from "./firebase";
import { Notes } from "./views/notes.view";
import NoteForm from "./views/note.form.view";
import "./App.css";

class App extends React.Component {
  constructor(){
    super();
    Store.onChange(() => this.changeProvider());
    this.state = {
      notes: [],
      comments: [],
      shownComments: [],
      note: {
          id: null,
          name: '',
          content: '',
          fileName: '',
          url: ''
      },
      storage: Store.createStorage()
    }
    this.editNote = (note) => {
      this.setState({note: note}, () => this.forceUpdate.bind(this));
    }
    this.changeNote = (e) => {
      this.setState({note: {
        ...this.state.note,
        [e.target.name]: e.target.value
      }})
    }
    this.showComments = (id) => { 
        let shown = this.state.shownComments;
        shown.push(id);
        this.setState({showComments: shown});
    };
    this.hideComments = (id) => {
        let shown = this.state.shownComments;
        shown = shown.filter(c => c !== id);
        this.setState({shownComments: shown});
    };
    this.saveFile = (file) => {
      this.state.storage.saveFile(file).then(data => {
          this.setState({note: {
            ...this.state.note,
            fileName: file.name,
            url: data.url
          }})
      })
    };
    this.resetNote = () => {
      this.setState({note: {
        id: null,
        fileName: '',
        url: '',
        name: '',
        content: ''
      }})
    };
    this.saveNote = (note) => {
      if(!note.id)
        this.state.storage.create('notes', note).then(() => this.fetchAll());
      else
        this.state.storage.update('notes', note.id ,note).then(() => this.fetchAll());
    };
    this.deleteNote = (noteId) => {
      if(window.confirm("Are you sure you want to delete this note?")){
        this.state.storage.delete("notes", noteId).then(() => this.fetchAll());
      }
    };
    this.addComment = (comment) => {
      this.state.storage.create('comments', comment).then(() => this.fetchAll());
    }
  }

  changeProvider(){
    this.setState({storage: Store.createStorage()}, () => this.fetchAll());
  }

  fetchAll(){
    this.state.storage.fetch('notes').then(data => this.setState({notes: data}));
    this.state.storage.fetch('comments').then(data => this.setState({comments: data}));
  }

  componentDidMount(){
    this.fetchAll();
  }

  render() {
    return (
      <div className="container app">
        <Header>
          <Title text="Fire Notes" />
          <Settings provider={Store.get()} onChange={Store.set.bind(Store)}   />
        </Header>
        <AppContent>
          <Section className="display-notes">
            <Notes notes={this.state.notes} comments={this.state.comments} 
            shown={this.state.shownComments}
            actions={{
              getImage: this.state.storage.getImage,
              showComments: this.showComments,
              hideComments: this.hideComments,
              editNote: this.editNote,
              deleteNote: this.deleteNote,
              addComment: this.addComment
            }} />
          </Section>
          <Section className="add-notes">
            <NoteForm note={this.state.note} actions={{
              saveFile: this.saveFile,
              resetNote: this.resetNote,
              saveNote: this.saveNote,
              changeNote: this.changeNote
            }} />
          </Section>
        </AppContent>
      </div>
    );
  }
}

export default App;
