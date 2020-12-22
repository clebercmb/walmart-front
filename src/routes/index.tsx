import React from 'react';
import { Switch } from 'react-router-dom';

import Route from './Route';

import Dashboard from '../Pages/Dashboard';

const Routes: React.FC = () => (
  <Switch>
    <Route path="/" exact component={Dashboard} />
  </Switch>
);

export default Routes;
