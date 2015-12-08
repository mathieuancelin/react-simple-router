/* eslint no-else-return: 0 */

import React from 'react';
import * as Utils from './utils';

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
    window.addEventListener('hashchange', this.processHash);
    if (window.location.hash) {
      this.setState({ page: window.location.hash });
    } else {
      this.changeUrl(this.props.start);
    }
  },
  componentWillUnmount() {
    window.removeEventListener('hashchange', this.processHash);
  },
  processHash() {
    const hash = (window.location.hash || '#').slice(1);
    this.setState({ page: hash, params: this.params || {} });
  },
  changeUrl(url, params = {}) {
    window.location.hash = `#${url}`;
    this.params = params;
  },
  render() {
    if (this.state.page === null) {
      return null;
    }
    const queryParams = Utils.extractQueryParams();
    const pathName = this.state.page.split('?')[0];
    const page = this.props.children
      .filter(child => child.props.name === pathName)[0];
    const pathParams = Utils.extractPathParams(pathName, window.location.pathName);
    const controls = { navigateTo: this.changeUrl };
    if (page) {
      const Component = page.props.component;
      return <Component
        {...page.props}
        router={controls}
        queryParams={queryParams}
        pathParams={pathName}
        params={this.state.params} />;
    } else {
      const NotFound = this.props.notFound;
      return <NotFound
        router={controls}
        params={this.state.params}
        queryParams={queryParams}
        pathParams={pathName}
        params={this.state.params} />;
    }
  },
});
