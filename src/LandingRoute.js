import React from 'react';
import { Route } from 'react-router-dom';

const LandingRute = ({component: Component, ...rest}) => {
  return (
    <Route {...rest}
      render={(props) =>
        <Component {...props} />
      } />
  )}

export default LandingRute;
