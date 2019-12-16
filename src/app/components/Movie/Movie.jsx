import React from 'react';

import moviePropTypes from '../../models/propTypes/moviePropTypes';

const Movie = props => (
  <div>
    <span>{props.title}</span>
  </div>
);

Movie.propTypes = moviePropTypes;

export default Movie;
