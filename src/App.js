import React, { Component } from 'react';
import {Settings} from "./components/settings";
import CreateNote from "./components/create.note";
import Notes from "./components/notes";

class App extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: 'firebase',
      currentNote: null
    }
    this.handleDataSource = this.handleDataSource.bind(this);
    this.handleEditNote = this.handleEditNote.bind(this);
  }

  handleDataSource(sourse){
    this.setState({dataSource: sourse});
  }

  handleEditNote(note){
    this.setState({currentNote: note})
  }

  render() {
    return (
      <div className="container">
        <header className="app-header row">
          <div className="display-logo col col-md-8">
            <h1>Fire notes</h1>
          </div>
          <div className="app-settings col col-md-4">
            <Settings source={this.state.dataSource} selectSource={this.handleDataSource}   />
          </div>
        </header>
        <div className="row">
          <section className="display-notes col col-md-8">
          <Notes onEdit={this.handleEditNote} />
          </section>
          <section className="add-notes col col-md-4">
            <CreateNote current={this.state.currentNote} />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
