/* eslint-disable import/prefer-default-export */

import { shape, func } from 'prop-types';

export const browserHistoryPropType = shape({
  push: func.isRequired
});
