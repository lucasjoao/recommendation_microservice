import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';

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
      <div>
        {user.name}
      </div>
    );
  }

  render() {
    return (
      <div>
        <DataScroller value={this.state.users} itemTemplate={this.userTemplate.bind(this)} rows={10}/>
      </div>
    );
  }
}

export default App;
