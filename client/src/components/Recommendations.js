import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Recommendations extends Component {
  render() {
    return (
      <div className="center">{this.props.type}</div>
    )
  }
}

Recommendations.propTypes = {
  type: PropTypes.string.isRequired
}

export default Recommendations;
