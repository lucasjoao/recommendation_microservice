import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';
import {Button} from 'primereact/components/button/Button';
import {Dialog} from 'primereact/components/dialog/Dialog';

import './App.css';

class App extends Component {
  state = {
    users: [],
    selectedUser: undefined,
    visible: false
  }

  componentDidMount() {
    fetch('/data')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
      .then(({users}) => {
        this.setState({users: users})
      })
  }

  onHide(event) {
    this.setState({visible: false})
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
          <Button label="Recomendação de amigos" onClick={(e) => this.setState({selectedUser: user, visible: true})} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <DataScroller value={this.state.users} itemTemplate={this.userTemplate.bind(this)} rows={10} header="Clique para ver as recomendações"/>
        <Dialog header="Amigos sugeridos" visible={this.state.visible} modal={true} onHide={this.onHide}>
          Teste
        </Dialog>
      </div>
    );
  }
}

export default App;
