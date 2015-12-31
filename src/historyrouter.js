/* eslint no-else-return: 0 */

import React from 'react';
import * as Utils from './utils';

export default React.createClass({
  propTypes: {
    start: React.PropTypes.string.isRequired,
    root: React.PropTypes.string,
    notFound: React.PropTypes.func.isRequired,
    children: React.PropTypes.array.isRequired,
  },
  getDefaultProps() {
    return {
      root: '',
    };
  },
  getInitialState() {
    return {
      page: null,
      params: {},
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
  pathNavigateTo(page, params = {}) {
    this.changeUrl(page);
    this.setState({ page, params });
  },
  processState(e) {
    const { url } = e.state;
    this.setState({ page: url });
  },
  changeUrl(url) {
    window.history.pushState({ url }, root + url, root + url);
  },
  render() {
    if (this.state.page === null) {
      return null;
    }
    const queryParams = Utils.extractQueryParams();
    const pathName = this.state.page.split('?')[0];
    const page = this.props.children
      .filter(child => child.props.name === pathName)[0];
    const controls = { navigateTo: this.pathNavigateTo };
    if (page) {
      const Component = page.props.component;
      return (
        <Component
          {...page.props}
          router={controls}
          queryParams={queryParams}
          pathParams={pathName}
          params={this.state.params} /> // eslint-disable-line
      );
    } else {
      const NotFound = this.props.notFound;
      return (
        <NotFound
          router={controls}
          params={this.state.params}
          queryParams={queryParams}
          pathParams={pathName}
          params={this.state.params} /> // eslint-disable-line
      );
    }
  },
});
