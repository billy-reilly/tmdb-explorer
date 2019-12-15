import React from 'react';

import './Header.scss';

import { browserHistoryPropType } from '../../models/propTypes/routerPropTypes';

import SearchBar from '../SearchBar/SearchBar';

const Header = ({ history }) => {
  return (
    <header role="banner" className="Header">
      <div className="Header__content-wrapper container">
        <div className="Header__heading-wrapper">
          <a href="/" className="Header__heading-link">
            <h1 className="Header__heading">TMDb Explorer</h1>
          </a>
        </div>
        <div className="Header__search-bar-wrapper">
          <SearchBar history={history} />
        </div>
      </div>
    </header>
  );
};

Header.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default Header;
