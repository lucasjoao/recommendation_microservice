import React, { Component } from 'react';

import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

import Recommendations from './Recommendations';

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
    if (this.state.userId.length > 0) {
      this.setState({buttonClicked: true});
    } else {
      this.setState({error: true});
    }
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

  problem() {
    let text = "Invalid input or user doesn't exist";
    return (
      <div className="text-center error">
        <h3>{text}</h3>
      </div>
    )
  }

  render() {
    let content;
    if (this.state.error) {
      content = this.problem();
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
