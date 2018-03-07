import React from 'react';
import {Settings} from "./components/settings";
import {Title, Header, AppContent, Section} from "./components/layout.components";
import {ProviderStore} from "./store/store";
import CreateNote from "./components/create.note";
import Notes from "./components/notes";
import "./App.css";

class App extends React.Component {
  constructor(){
    super();
    ProviderStore.onChange(this.forceUpdate.bind(this));
    this.state = {
      dataSource: 'firebase',
      currentNote: null
    }
    this.handleEditNote = (note) => {
      this.setState({currentNote: note})
    }
  }

  render() {
    return (
      <div className="container app">
        <Header>
          <Title text="Fire Notes" />
          <Settings value={ProviderStore.get()} onChange={ProviderStore.set.bind(ProviderStore)}   />
        </Header>
        <AppContent>
          <Section className="display-notes">
            <Notes onEdit={this.handleEditNote} source={ProviderStore.get()} current={this.state.currentNote} />
          </Section>
          <Section className="add-notes">
            <CreateNote current={this.state.currentNote} source={ProviderStore.get()} clearCurrent={this.handleEditNote} />
          </Section>
        </AppContent>
      </div>
    );
  }
}

export default App;
