import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Button} from 'primereact/components/button/Button';

import 'primereact/resources/themes/voclain/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';

import Recommendations from "./Recommendations";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: this.props.action
    }

    this.allUsers = this.allUsers.bind(this);
    this.specificUser = this.specificUser.bind(this);
  }

  possibleActions = {
    NOTHING: "nothing",
    ALL: "all",
    SPECIFIC: "specific"
  }

  render() {
    const content = this.defineContent(this.state.running);

    return (
      <div>
        {content}
      </div>
    );
  }

  defineContent(running) {
    switch (running) {
      case this.possibleActions.NOTHING:
        return this.welcome();
      case this.possibleActions.ALL:
      case this.possibleActions.SPECIFIC:
        return <Recommendations type={running}/>;
      default:
        return <h4>Problems!</h4>
    }
  }

  welcome() {
    return (
      <div>
        <h3>Welcome to the friends recommendations system!</h3>
        <Button label="All users" onClick={this.allUsers} />
        <Button label="Specific user" onClick={this.specificUser} />
      </div>
    );
  }

  allUsers() {
    this.setState({running: this.possibleActions.ALL})
  }

  specificUser() {
    this.setState({running: this.possibleActions.SPECIFIC})
  }
}

App.propTypes = {
  action: PropTypes.string.isRequired
}

export default App;
