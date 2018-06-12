import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {Toolbar} from 'primereact/components/toolbar/Toolbar';
import {Button} from 'primereact/components/button/Button';

import 'primereact/resources/themes/voclain/theme.css';
import 'primereact/resources/primereact.min.css';
import 'font-awesome/css/font-awesome.css';

import SelectUser from "./SelectUser";
import AllUsers from './AllUsers';

import "../css/App.css";
import dataOAuth2 from '../utils/dataOAuth2';
import Problem from './Problem';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      running: this.props.action,
      googleApiReady: false,
      login: this.loginState.NO,
      googleAuth: undefined
    }

    this.allUsers = this.allUsers.bind(this);
    this.specificUser = this.specificUser.bind(this);
    this.home = this.home.bind(this);
    this.refreshLoginState = this.refreshLoginState.bind(this);
    this.doLogout = this.doLogout.bind(this);
    this.doLogin = this.doLogin.bind(this);
  }

  loginState = {
    NO: 0,
    DOING: 1,
    YES: 2
  }

  possibleActions = {
    NOTHING: "nothing",
    ALL: "all",
    SPECIFIC: "specific"
  }

  componentDidMount() {
    this.props.gapi.load('client:auth2', () => {
      this.props.gapi.client.init(dataOAuth2).then(() => {
        const googleAuth = this.props.gapi.auth2.getAuthInstance();
        googleAuth.isSignedIn.listen(this.refreshLoginState);
        googleAuth.disconnect();
        this.setState({googleAuth, googleApiReady: true});
      })
    })
  }

  render() {
    const content = this.defineContent(this.state.running);

    return (
      <div>
        {this.menu()}
        {content}
      </div>
    );
  }

  defineContent(running) {
    if (this.state.login === this.loginState.YES) {
      switch (running) {
        case this.possibleActions.NOTHING:
          return this.welcome();
        case this.possibleActions.ALL:
          return <AllUsers/>;
        case this.possibleActions.SPECIFIC:
          return <SelectUser/>;
        default:
          return <Problem msg="Problems after authentication"/>;
      }
    } else if (this.state.login === this.loginState.NO) {
      return (
        <div className="text-center top-space">
          <Button label="Sign in" onClick={this.doLogin}/>
        </div>
      );
    } else if (this.state.login === this.loginState.DOING) {
      return <Problem msg="Doing login in other window..."/>
    } else {
      return <Problem msg="Problems before authentication" />
    }
  }

  welcome() {
    return (
      <div className="text-center">
        <div>
          <h3>Welcome to the friends recommendations system!</h3>
          <Button label="All users" onClick={this.allUsers} />
          <Button label="Specific user" onClick={this.specificUser} />
        </div>
        <div>
          <h3>{this.state.user.w3.ig}, if you want sign out:</h3>
          <Button label="Click here" onClick={this.doLogout} />
        </div>
      </div>
    );
  }

  allUsers() {
    this.setState({running: this.possibleActions.ALL})
  }

  specificUser() {
    this.setState({running: this.possibleActions.SPECIFIC})
  }

  home() {
    this.setState({running: this.possibleActions.NOTHING})
  }

  menu() {
    return (
      <Toolbar>
        <div>
          <div className="text-center">Friends recommendations system</div>

          <Button className="ui-toolbar-group-left"
                  label="Home"
                  onClick={this.home} />
        </div>
      </Toolbar>
    )
  }

  refreshLoginState(isLogged) {
    if (isLogged) {
      const user = this.state.googleAuth.currentUser.get();
      const allowed = user.hasGrantedScopes(dataOAuth2.scope);
      if (allowed) {
        this.setState({user, login: this.loginState.YES});
      } else {
        this.setState({user: undefined, login: this.loginState.NO});
      }
    } else {
      this.setState({user: undefined, login: this.loginState.NO});
    }
  }

  doLogout() {
    this.state.googleAuth.disconnect();
  }

  doLogin() {
    this.state.googleAuth.signIn();
    this.setState({login: this.loginState.DOING});
  }
}

App.propTypes = {
  action: PropTypes.string.isRequired,
  gapi: PropTypes.object
}

export default App;
