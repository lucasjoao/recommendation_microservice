import React, { Component } from 'react';

import PropTypes from 'prop-types';
import {DataScroller} from 'primereact/components/datascroller/DataScroller';

class Recommendations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      suggestions: []
    }

    this.rowTemplate = this.rowTemplate.bind(this);
  }

  componentDidMount() {
    this.setState({suggestions: [this.props.user_id, this.props.user_id]});
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
    let header = "Friends suggestions to user with id " + this.props.user_id;

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
  user_id: PropTypes.string.isRequired
}

export default Recommendations;
