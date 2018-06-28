import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {DataScroller} from 'primereact/components/datascroller/DataScroller';

import service from '../services/service';
import FriendsList from './FriendsList';
import UsersList from './UsersList';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    }

    this.rowTemplate = this.rowTemplate.bind(this);
  }

  componentDidMount() {
    // XXX: verificar se ja tem sugestao no banco
    // XXX: se ja tem, entao questiona usuario o que ele quer fazer, ver novas ou antigas
    // XXX: sempre que ver novas, salva as sugestoes no banco
    service.getSuggestions(this.props.userId)
      .then(({suggestions}) => {
        this.setState({suggestions: suggestions})
      })
  }

  rowTemplate(suggestion) {
    if (!suggestion) {
      return;
    }

    return (
      <div>
        {suggestion}
      </div>
    )
  }

  render() {
    let header = "Friends suggestions to user with id " + this.props.userId;

    return (
      <div className="text-center top-space">
        <UsersList />
        <FriendsList userId={this.props.userId}/>
        <DataScroller value={this.state.suggestions}
                      itemTemplate={this.rowTemplate}
                      rows={10}
                      header={header}/>
      </div>
    )
  }
}

Recommendations.propTypes = {
  userId: PropTypes.string.isRequired
}

export default Recommendations;
