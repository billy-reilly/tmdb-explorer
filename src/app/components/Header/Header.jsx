import React from 'react';
import { withRouter } from 'react-router-dom';

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

export const UnwrappedHeader = Header;

export default withRouter(Header);
