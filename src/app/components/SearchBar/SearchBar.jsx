import React, { useState } from 'react';

import './SearchBar.scss';

import { browserHistoryPropType } from '../../models/propTypes/routerPropTypes';

const MagnifyingGlassSVG = () => (
  <svg
    viewBox="0 0 24 24"
    height="28"
    width="28"
    aria-hidden="true"
    focusable="false"
    fill="currentColor"
  >
    <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
  </svg>
);

const SearchBar = ({ history }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleInputChange = e => setSearchTerm(e.target.value);

  const handleSubmit = e => {
    e.preventDefault();

    if (searchTerm) {
      history.push({
        pathname: '/search',
        search: `?q=${searchTerm}`
      });
    }
  };

  return (
    <form className="SearchBar__form" onSubmit={handleSubmit}>
      <input
        className="SearchBar__input"
        type="search"
        placeholder="Search for movies"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <button className="SearchBar__button" type="submit" aria-label="Search">
        <MagnifyingGlassSVG />
      </button>
    </form>
  );
};

SearchBar.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default SearchBar;
