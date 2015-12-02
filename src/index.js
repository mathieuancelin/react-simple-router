import React from 'react';

export { default as Router } from './router';
export { default as Route } from './route';

export const RouterShape = React.PropTypes.shape({
  navigateTo: React.PropTypes.func.isRequired,
}).isRequired;
