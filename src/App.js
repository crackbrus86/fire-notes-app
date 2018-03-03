import React, { Component } from 'react';
import {Settings} from "./components/settings";
import CreateNote from "./components/create.note";
import Notes from "./components/notes";

class App extends Component {
  constructor(){
    super();
    this.state = {
      dataSource: 'firebase'
    }
    this.handleDataSource = this.handleDataSource.bind(this);
  }

  handleDataSource(sourse){
    this.setState({dataSource: sourse});
  }

  render() {
    return (
      <div className="app">
        <header className="app-header">
          <div className="display-logo">
            <h1 className="app-title">Fire notes</h1>
          </div>
          <div className="app-settings">
            <Settings source={this.state.dataSource} selectSource={this.handleDataSource}   />
          </div>
        </header>
        <div className="container">
          <section className="display-notes">
          <Notes />
          </section>
          <section className="add-notes">
            <CreateNote />
          </section>
        </div>
      </div>
    );
  }
}

export default App;
