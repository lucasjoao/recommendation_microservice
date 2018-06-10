import React, { Component } from 'react';

import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';
import Recommendations from './Recommendations';

class SelectUser extends Component {
  constructor() {
    super();
    this.state = {
      user_id: '',
      buttonClicked: false
    }
  }

  nextPage() {
    return (
      <Recommendations type={this.state.user_id}/>
    );
  }

  search() {
    return (
      <div className="block-center">
        <h3>Fill with the user's id</h3>
        <div className="ui-inputgroup">
          <Button label="Search"
                  onClick={() => this.setState({buttonClicked: true})}/>

          <InputText placeholder="User id" type="text"
                     onChange={(e) =>
                                this.setState({user_id: e.target.value})}/>
        </div>
      </div>
    );
  }

  render() {
    let content = (this.state.buttonClicked ? this.nextPage() : this.search());

    return (
      <div>
        {content}
      </div>
    )
  }
}

export default SelectUser;
