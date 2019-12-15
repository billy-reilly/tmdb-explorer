/* eslint-disable react/jsx-filename-extension */

import React from 'react';
import ReactDOM from 'react-dom';

import App from './app/containers/App';

ReactDOM.render(<App />, document.getElementById('root'));

if (module.hot) {
  module.hot.accept();
}
