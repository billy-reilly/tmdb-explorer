import React from 'react';
import PropTypes from 'prop-types';

import Movie from '../Movie/Movie';

const SearchResults = ({ currentSearchTerm, searchResults, totalResults }) => {
  if (!searchResults || !searchResults.length) {
    return (
      <span>{`Sorry, we couldn't find any results for "${currentSearchTerm}"`}</span>
    );
  }

  return (
    <>
      <h2>{`Showing ${searchResults.length} of ${totalResults} TMDb results for "${currentSearchTerm}"`}</h2>
      {searchResults.map(movie => (
        <Movie {...movie} />
      ))}
    </>
  );
};

SearchResults.propTypes = {
  currentSearchTerm: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired
    })
  ).isRequired,
  totalResults: PropTypes.number.isRequired
};

export default SearchResults;
