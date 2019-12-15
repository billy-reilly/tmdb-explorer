import React from 'react';

import { browserHistoryPropType } from '../models/propTypes/routerPropTypes';

import SearchBar from './SearchBar';

const Header = ({ history }) => {
  return (
    <header role="banner">
      <a href="/">
        <h1>TMDb Explorer</h1>
      </a>
      <SearchBar history={history} />
    </header>
  );
};

Header.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default Header;
