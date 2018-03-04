import React, { Component } from 'react';
import {Settings} from "./components/settings";
import CreateNote from "./components/create.note";
import Notes from "./components/notes";
import "./App.css";

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
    this.setState({dataSource: sourse, currentNote: null});
  }

  handleEditNote(note){
    this.setState({currentNote: note})
  }

  render() {
    return (
      <div className="container app">
        <header className="app-header row justify-content-center">
          <div className="display-logo col col-md-4">
            <h1>Fire Notes</h1>
          </div>
          <div className="app-settings col col-md-4">
            <Settings source={this.state.dataSource} selectSource={this.handleDataSource}   />
          </div>
        </header>
        <div className="row  justify-content-center app-content">
          <section className="display-notes col col-md-4">
          <Notes onEdit={this.handleEditNote} source={this.state.dataSource} current={this.state.currentNote} />
          </section>
          <section className="add-notes col col-md-4">
            <CreateNote current={this.state.currentNote} source={this.state.dataSource} clearCurrent={this.handleEditNote} />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
