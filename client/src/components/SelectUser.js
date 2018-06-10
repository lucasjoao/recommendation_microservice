import React, { Component } from 'react';

import {Button} from 'primereact/components/button/Button';
import {InputText} from 'primereact/components/inputtext/InputText';

// TODO: vai ser necessario usar propTypes?

class SelectUser extends Component {
  render() {
    return (
      <div className="block-center">
        <h3>Fill with the user's id</h3>
        <div className="ui-inputgroup">
          <Button label="Search"/>
          <InputText placeholder="User id" type="text"/>
        </div>
      </div>
    )
  }
}

export default SelectUser;
