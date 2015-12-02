/* eslint no-else-return: 0 */

import React from 'react';

export default React.createClass({
  propTypes: {
    start: React.PropTypes.string.isRequired,
    notFound: React.PropTypes.func.isRequired,
    children: React.PropTypes.array.isRequired,
  },
  getInitialState() {
    return {
      page: this.props.start,
    };
  },
  navigateTo(page) {
    this.setState({ page });
  },
  render() {
    const page = this.props.children
      .filter(child => child.props.name === this.state.page)[0];
    if (page) {
      const Component = page.props.component;
      return <Component {...page.props} router={{ navigateTo: this.navigateTo }} />;
    } else {
      const NotFound = this.props.notFound;
      return <NotFound router={{ navigateTo: this.navigateTo }} />;
    }
  },
});
