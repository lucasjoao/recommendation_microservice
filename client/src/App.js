import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';
import {Button} from 'primereact/components/button/Button';

import './App.css';

class App extends Component {
  state = {
    users: []
  }

  componentDidMount() {
    fetch('/data')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
      .then(({users}) => {
        this.setState({users: users})
      })
  }

  userTemplate(user) {
    if (!user) {
      return;
    }

    return (
      <div className="Row">
        <div>
          {user.name}
        </div>
        <div>
          <Button label="Recomendação de amigos" onClick={this.onClick} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <DataScroller value={this.state.users} itemTemplate={this.userTemplate.bind(this)} rows={10} header="Clique para ver as recomendações"/>
      </div>
    );
  }
}

export default App;
