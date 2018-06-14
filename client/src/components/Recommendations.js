import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {DataScroller} from 'primereact/components/datascroller/DataScroller';

import service from '../services/service';

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
    service.getSuggestions(this.props.id)
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

    // XXX: retornar antes do dataScroller dois componentes iguais, onde um serve para mostrar a lista de amigos que a pessoa ja possui e a outra serve para mostrar a lista de usuarios no sistema <-> fazer tanto para fake quanto para real
    return (
      <div className="text-center top-space">
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
