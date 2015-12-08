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
      page: null,
      params: {},
    };
  },
  componentDidMount() {
    this.navigateTo(this.props.start);
  },
  navigateTo(page, params = {}) {
    this.setState({ page, params });
  },
  render() {
    if (this.state.page === null) {
      return null;
    }
    const page = this.props.children
      .filter(child => child.props.name === this.state.page)[0];
    const controls = { navigateTo: this.navigateTo };
    if (page) {
      const Component = page.props.component;
      return <Component {...page.props} router={controls} params={this.state.params} />;
    } else {
      const NotFound = this.props.notFound;
      return <NotFound router={controls} params={this.state.params} />;
    }
  },
});
