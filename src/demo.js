/* eslint react/no-multi-comp: 0, react/prop-types: 0 */

import React from 'react';
import ReactDOM from 'react-dom';

import Router from './router';
import Route from './route';
import { RouterShape } from './shapes';

const Page1 = React.createClass({
  propTypes: {
    router: RouterShape,
  },
  navigate() {
    this.props.router.navigateTo('/page2', { key1: 'value1' });
  },
  render() {
    return (
      <div>
        <h1>Page 1</h1>
        <button type="button" onClick={this.navigate}>navigate</button>
      </div>
    );
  },
});

const Page2 = React.createClass({
  propTypes: {
    router: RouterShape,
  },
  navigate() {
    this.props.router.navigateTo('/page3');
  },
  render() {
    return (
      <div>
        <h1>Page 2</h1>
        <p>{this.props.params.key1}</p>
        <button type="button" onClick={this.navigate}>navigate</button>
      </div>
    );
  },
});

const NotFound = React.createClass({
  propTypes: {
    router: RouterShape,
  },
  render() {
    return (
      <h1>Not found !!!</h1>
    );
  },
});

const App = React.createClass({
  render() {
    return (
      <Router strategy="hash" start="/page1" notFound={NotFound}>
        <Route name="/page1" component={Page1} />
        <Route name="/page2" component={Page2} />
      </Router>
    );
  },
});

export function demo(at) {
  ReactDOM.render(<App />, document.getElementById(at));
}
