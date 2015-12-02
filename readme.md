# react-simple-router

A very simple router for React components

```javascript
import React from 'react';
import { Router, Route, RouterShape } from 'react-simple-router';

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
    this.props.router.navigateTo('page3'); // will navigate to not found page
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

ReactDOM.render(<App />, document.getElementById('app'));
```
