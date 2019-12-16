import React from 'react';
import PropTypes from 'prop-types';

import moviePropTypes from '../../models/propTypes/moviePropTypes';

import Movie from '../Movie/Movie';

const SearchResults = ({
  currentSearchTerm,
  searchResults,
  totalResults,
  onLoadMoreClick
}) => {
  if (!searchResults || !searchResults.length) {
    return (
      <span>{`Sorry, we couldn't find any results for "${currentSearchTerm}"`}</span>
    );
  }

  return (
    <>
      <h2>{`Showing ${searchResults.length} of ${totalResults} TMDb results for "${currentSearchTerm}"`}</h2>
      {searchResults.map(movie => (
        <Movie key={movie.id} {...movie} />
      ))}
      {searchResults.length < totalResults && (
        <button type="button" onClick={onLoadMoreClick}>
          Load more movies
        </button>
      )}
    </>
  );
};

SearchResults.propTypes = {
  currentSearchTerm: PropTypes.string.isRequired,
  searchResults: PropTypes.arrayOf(PropTypes.shape(moviePropTypes)).isRequired,
  totalResults: PropTypes.number.isRequired,
  onLoadMoreClick: PropTypes.func.isRequired
};

export default SearchResults;
