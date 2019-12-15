import React from 'react';

import { browserHistoryPropType } from '../models/propTypes/routerPropTypes';

import Header from '../components/Header';

const SearchPage = ({ history }) => (
  <>
    <Header history={history} />
    <div>TODO: SearchPage</div>
  </>
);

SearchPage.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default SearchPage;
