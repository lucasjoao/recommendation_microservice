import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Recommendations extends Component {
  render() {
    return (
      <div>{this.props.type}</div>
    )
  }
}

Recommendations.propTypes = {
  type: PropTypes.string.isRequired
}

export default Recommendations;
