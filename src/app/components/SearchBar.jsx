import React, { useState } from 'react';

import { browserHistoryPropType } from '../models/propTypes/routerPropTypes';

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
        type="search"
        placeholder="Search for movies"
        onChange={handleInputChange}
        value={searchTerm}
      />
      <button type="submit">Search</button>
    </form>
  );
};

SearchBar.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default SearchBar;
