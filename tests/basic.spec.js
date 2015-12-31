/* eslint no-unused-vars:0, no-undef:0, no-unused-expressions:0, react/no-multi-comp: 0 */

import React from 'react';
import chai, { expect } from 'chai';
import ReactTestUtils from 'react-addons-test-utils';

import { Router, Route, RouterShape } from '../src/index';

const Page1 = React.createClass({
  propTypes: {
    router: RouterShape,
  },
  navigate() {
    this.props.router.navigateTo('page2');
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
    this.props.router.navigateTo('page3');
  },
  render() {
    return (
      <div>
        <h1>Page 2</h1>
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
      <Router start="page1" notFound={NotFound}>
        <Route name="page1" component={Page1} />
        <Route name="page2" component={Page2} />
      </Router>
    );
  },
});

describe('react-simple-router', () => {
  it('should route stuff', () => {
    const router = ReactTestUtils.renderIntoDocument(<App />);
    let h1 = ReactTestUtils.findRenderedDOMComponentWithTag(router, 'h1');
    let button = ReactTestUtils.findRenderedDOMComponentWithTag(router, 'button');
    expect(h1.textContent).to.be.equal('Page 1');
    ReactTestUtils.Simulate.click(button);
    h1 = ReactTestUtils.findRenderedDOMComponentWithTag(router, 'h1');
    expect(h1.textContent).to.be.equal('Page 2');
    button = ReactTestUtils.findRenderedDOMComponentWithTag(router, 'button');
    ReactTestUtils.Simulate.click(button);
    h1 = ReactTestUtils.findRenderedDOMComponentWithTag(router, 'h1');
    expect(h1.textContent).to.be.equal('Not found !!!');
  });
});
