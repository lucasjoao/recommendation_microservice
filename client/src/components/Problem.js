import React, { Component } from 'react';

import PropTypes from 'prop-types';

class Problem extends Component {
  render() {
    return (
      <div className="text-center error">
        <h3>{this.props.msg}</h3>
      </div>
    )
  }
}

Problem.propTypes = {
  msg: PropTypes.string.isRequired
}

export default Problem;
