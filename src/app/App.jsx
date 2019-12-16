import React from 'react';
import { BrowserRouter, Switch, Route } from 'react-router-dom';
import { hot } from 'react-hot-loader';

import './globalStyles.scss';

import HomePage from './containers/HomePage/HomePage';
import SearchPage from './containers/SearchPage/SearchPage';
import NotFoundPage from './containers/NotFoundPage/NotFoundPage';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route exact path="/" component={HomePage} />
      <Route path="/search" component={SearchPage} />
      <Route path="*" component={NotFoundPage} />
    </Switch>
  </BrowserRouter>
);

export default hot(module)(App);
