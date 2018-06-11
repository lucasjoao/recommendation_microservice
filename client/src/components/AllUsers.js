import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';
import {Button} from 'primereact/components/button/Button';

import Recommendations from './Recommendations';
import service from '../services/service';

class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      buttonClicked: false,
      selectedUser: undefined
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

    return (
      <div>
        {user.name}
        <Button className="little-left-space little-top-space"
                label="Get"
                onClick={() => this.setState({buttonClicked: true,
                                              selectedUser: user})}/>
      </div>
    )
  }

  firstPage() {
    let header = "Select the user to get friends recommendations";
    return (
      <div className="text-center top-space">
        <DataScroller value={this.state.users}
                      itemTemplate={this.rowTemplate}
                      rows={10}
                      header={header} />
      </div>
    );
  }

  nextPage() {
    return (
      <Recommendations userId={this.state.selectedUser.id}/>
    );
  }

  render() {
    let content = (this.state.buttonClicked ? this.nextPage() : this.firstPage());

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default AllUsers;
