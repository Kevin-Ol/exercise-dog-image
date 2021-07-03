import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Img extends Component {
  render() {
    const { src, alt } = this.props;

    return (
      <img src={ src } alt={ alt } />
    );
  }
}

Img.propTypes = {
  src: PropTypes.string.isRequired,
  alt: PropTypes.string.isRequired,
};

export default Img;
