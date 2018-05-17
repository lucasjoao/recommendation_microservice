import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';
import {Button} from 'primereact/components/button/Button';
import {Dialog} from 'primereact/components/dialog/Dialog';

import './App.css';

class App extends Component {
  state = {
    users: [],
    selectedUser: undefined, // TODO: verificar necessidade dessa variavel
    visible: false,
    recommendations: undefined
  }

  componentDidMount() {
    fetch('/data')
      .then(r => Promise.resolve(r))
      .then(r => r.json())
      .then(({users}) => {
        this.setState({users: users})
      })
  }

  getRecommendations(id) {
    fetch(`/recommendations?id=${id}`)
      .then(r => Promise.resolve(r))
      .then(r => r.json())
      .then(({recommendations}) => {
        this.setState({recommendations: recommendations})
      })
  }

  onHide(e) {
    this.setState({visible: false})
  }

  showDialog(user, e) {
    this.setState({selectedUser: user, visible: true});
    this.getRecommendations(user.id);
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
          <Button label="Friend suggestions"
            onClick={(e) => this.showDialog(user, e)} />
        </div>
      </div>
    );
  }

  render() {
    return (
      <div className="App">
        <DataScroller value={this.state.users}
            itemTemplate={this.userTemplate.bind(this)}
            rows={10} header=""/>

        {/* FIXME: make open modal */}
        <Dialog header="Suggestions" visible={this.state.visible}
                modal={true} onHide={this.onHide}>
            {
                this.state.recommendations !== undefined &&
                (<div>
                  <ul>
                    <li>{this.state.recommendations[0]}</li>
                  </ul>
                  <ul>
                    <li>{this.state.recommendations[1]}</li>
                  </ul>
                </div>)
            }
        </Dialog>
      </div>
    );
  }
}

export default App;
