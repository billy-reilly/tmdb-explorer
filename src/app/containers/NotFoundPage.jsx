import React from 'react';

import { browserHistoryPropType } from '../models/propTypes/routerPropTypes';

import Header from '../components/Header/Header';

const NotFoundPage = ({ history }) => {
  return (
    <>
      <Header history={history} />
      <div>TODO: NotFoundPage</div>
    </>
  );
};

NotFoundPage.propTypes = {
  history: browserHistoryPropType.isRequired
};

export default NotFoundPage;
