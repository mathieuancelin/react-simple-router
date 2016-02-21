import React from 'react';
import SimpleRouter from './simplerouter';
import HistoryRouter from './historyrouter';
import HashRouter from './hashrouter';

export default React.createClass({
  propTypes: {
    start: React.PropTypes.string.isRequired,
    notFound: React.PropTypes.func.isRequired,
    children: React.PropTypes.array.isRequired,
    strategy: React.PropTypes.oneOf(['simple', 'hash', 'history']),
  },
  getDefaultProps() {
    return {
      strategy: 'simple',
    };
  },
  render() {
    if (this.props.strategy === 'simple') {
      return (
        <SimpleRouter start={this.props.start} notFound={this.props.notFound}>
          {this.props.children}
        </SimpleRouter>
      );
    }
    if (this.props.strategy === 'hash') {
      return (
        <HashRouter start={this.props.start} notFound={this.props.notFound}>
          {this.props.children}
        </HashRouter>
      );
    }
    if (this.props.strategy === 'history') {
      return (
        <HistoryRouter start={this.props.start} notFound={this.props.notFound}>
          {this.props.children}
        </HistoryRouter>
      );
    }
    throw new Error(`${this.props.strategy} is not a supported strategy`);
  },
});
