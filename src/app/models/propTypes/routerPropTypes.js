import { shape, func, string, object } from 'prop-types';

export const locationPropType = shape({
  hash: string.isRequired,
  key: string,
  pathname: string.isRequired,
  search: string.isRequired,
  state: object
});

export const browserHistoryPropType = shape({
  push: func.isRequired,
  location: locationPropType
});
