import React from 'react';
import {Settings} from "./components/settings";
import {Title, Header, AppContent, Section} from "./components/layout.components";
import { Store } from "./store/store";
import CreateNote from "./components/create.note";
import { Notes } from "./views/notes.view";
import "./App.css";

class App extends React.Component {
  constructor(){
    super();
    Store.onChange(() => this.changeProvider());
    this.state = {
      notes: [],
      comments: [],
      shownComments: [],
      storage: Store.createStorage()
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
              hideComments: this.hideComments
            }} />
          </Section>
          <Section className="add-notes">
            {/* <CreateNote current={this.state.currentNote} source={Store.get()} clearCurrent={this.handleEditNote} /> */}
          </Section>
        </AppContent>
      </div>
    );
  }
}

export default App;
