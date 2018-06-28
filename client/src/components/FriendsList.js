import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {DataScroller} from 'primereact/components/datascroller/DataScroller';

import service from '../services/service';

class FriendsList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      friends: []
    }

    this.rowTemplate = this.rowTemplate.bind(this);
  }

  componentDidMount() {
    service.getFriends(this.props.userId)
      .then(({friends}) => {
        this.setState({friends: friends})
      })
  }

  rowTemplate(friend) {
    if (!friend) {
      return;
    }

    return (<div> {friend} </div>)
  }

  typeOne() {
    return (
      <DataScroller value={this.state.friends}
          itemTemplate={this.rowTemplate}
          rows={10}
          header="Friends"/>
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

FriendsList.propTypes = {
  userId: PropTypes.string.isRequired
}

export default FriendsList;
