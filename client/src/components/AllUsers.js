import React, { Component } from 'react';

import {DataScroller} from 'primereact/components/datascroller/DataScroller';
import {Button} from 'primereact/components/button/Button';

import Recommendations from './Recommendations';
import service from '../services/service';
import Problem from './Problem';

class AllUsers extends Component {
  constructor() {
    super();
    this.state = {
      users: [],
      buttonClicked: false,
      selectedUser: undefined,
      useFakeData: undefined
    }

    this.rowTemplate = this.rowTemplate.bind(this);
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
    if (this.state.useFakeData) {
      service.allUsers()
        .then(({users}) => {
          this.setState({users: users})
      })
    } else {
      service.realAllUsers()
        .then(({users}) => {
          this.setState({users: users})
      })

      if (this.state.users === undefined || this.state.users.length === 0) {
        return (
          <Problem msg="Error when connect with other microservice" />
        )
      }
    }

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
      <div>
        <Recommendations userId={this.state.selectedUser.id}/>
      </div>
    );
  }

  askWhatUse() {
    return (
      <div className="text-center top-space">
        <h4>
          Do you want to use fake data or connect with other microservice?
        </h4>
        <Button label="Fake"
                onClick={() => this.setState({useFakeData: true})}/>
        <Button label="Other microservice"
                onClick={() => this.setState({useFakeData: false})}/>
      </div>
    )
  }

  render() {
    let content;
    if (this.state.useFakeData == null) {
      content = this.askWhatUse();
    } else {
      content = (this.state.buttonClicked ? this.nextPage() : this.firstPage());
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default AllUsers;
