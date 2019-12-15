import React from 'react';

import { browserHistoryPropType } from '../models/propTypes/routerPropTypes';

import Header from '../components/Header';

const HomePage = ({ history }) => {
  return (
    <>
      <Header history={history} />
      <div>TODO: Homepage</div>
    </>
  );
};

HomePage.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default HomePage;
