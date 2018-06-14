import React, { Component } from 'react';

import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

import Recommendations from './Recommendations';
import Problem from './Problem';

class SelectUser extends Component {
  constructor() {
    super();
    this.state = {
      userId: '',
      buttonClicked: false,
      error: false
    }

    this.checkInput = this.checkInput.bind(this);
  }

  checkInput() {
    // XXX: enquanto nao ha interacao com outro ms
    // if (this.state.userId.length > 0 && this.userExist()) {
    // this.setState({buttonClicked: true});
    // } else {
    this.setState({error: true});
    // }
  }

  userExist() {
    // XXX: verificar fausto se usuario existe -> http://m1.nathan.werlich.vms.ufsc.br:3001/searchById?id=
    // XXX: add consulta no servidor e no service
    return false;
  }

  nextPage() {
    return (
      <Recommendations userId={this.state.userId}/>
    );
  }

  search() {
    return (
      <div className="block-center top-space">
        <h3>Fill with the user's id</h3>
        <div className="ui-inputgroup">
          <Button label="Search"
                  onClick={this.checkInput}/>

          <InputText placeholder="User id" type="text"
                     onChange={(e) =>
                                this.setState({userId: e.target.value})}/>
        </div>
      </div>
    );
  }

  render() {
    let content;
    if (this.state.error) {
      content = <Problem msg="Invalid input or user doesn't exist"/>;
    } else {
      content = (this.state.buttonClicked ? this.nextPage() : this.search());
    }

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default SelectUser;
