import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';

import service from '../services/service';

class UsersList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      users: []
    }

    this.rowTemplate = this.rowTemplate.bind(this);
  }

  componentDidMount() {
    service.allUsers()
      .then(({users}) => {
        this.setState({users: users})
      })
  }

  rowTemplate(user) {
    if (!user) {
      return;
    }

    return (<div> {user.name} </div>)
  }

  typeOne() {
    return (
      <DataScroller value={this.state.users}
          itemTemplate={this.rowTemplate}
          rows={10}
          header="All users"/>
    )
  }

  render() {
    let content = this.typeOne();

    return (
      <div className="text-center top-space">
        {content}
      </div>
    )
  }
}

export default UsersList;
