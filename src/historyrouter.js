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
    window.addEventListener('popstate', this.processState);
    const pathes = this.props.children.map(child => child.props.name);
    if (!window.history) {
      throw new Error('No history API here :(');
    }
    if (pathes.indexOf(window.location.href) > -1) {
      this.pathNavigateTo(window.location.href);
    }
    this.pathNavigateTo(this.props.start);
  },
  componentWillUnmount() {
    window.removeEventListener('popstate', this.processState);
  },
  pathNavigateTo(page) {
    this.setState({ page });
    this.changeUrl(page);
  },
  processState(e) {
    const { url } = e.state;
    this.setState({ page: url });
  },
  changeUrl(url) {
    window.history.pushState({ url }, url, url);
  },
  render() {
    if (this.state.page === null) {
      return null;
    }
    const page = this.props.children
      .filter(child => child.props.name === this.state.page)[0];
    const controls = { navigateTo: this.pathNavigateTo };
    if (page) {
      const Component = page.props.component;
      return <Component {...page.props} router={controls} />;
    } else {
      const NotFound = this.props.notFound;
      return <NotFound router={controls} />;
    }
  },
});
