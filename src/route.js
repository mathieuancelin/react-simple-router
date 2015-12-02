import React from 'react';

export default React.createClass({
  propTypes: {
    name: React.PropTypes.string.isRequired,
    component: React.PropTypes.func.isRequired,
  },
  render() {
    throw new Error('A Route component should never be rendered !!!');
  },
});
