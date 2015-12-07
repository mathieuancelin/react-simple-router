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
    };
  },
  componentDidMount() {
    window.addEventListener('hashchange', this.processHash);
    if (window.location.hash) {
      this.changeUrl(window.location.hash);
    }
    this.changeUrl(this.props.start);
  },
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.processHash);
  },
  processHash() {
    const hash = (window.location.hash || '#').slice(1);
    this.setState({ page: hash });
  },
  changeUrl(url) {
    window.location.hash = `#${url}`;
  },
  render() {
    if (this.state.page === null) {
      return null;
    }
    const page = this.props.children
      .filter(child => child.props.name === this.state.page)[0];
    const controls = { navigateTo: this.changeUrl };
    if (page) {
      const Component = page.props.component;
      return <Component {...page.props} router={controls} />;
    } else {
      const NotFound = this.props.notFound;
      return <NotFound router={controls} />;
    }
  },
});
