import React from 'react';
import { shallow } from 'enzyme';
import { get } from 'axios';

import SearchPage from './SearchPage';
import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';
import Loader from '../../components/Loader/Loader';

jest.mock('axios');

const fakeApiKey = 'FAKE_KEY';
const fakeLocation = {
  pathname: '/search',
  search: '?q=harry',
  hash: ''
};
const fakeHistory = {
  location: fakeLocation,
  push: () => {}
};
const defaultProps = {
  location: fakeLocation,
  history: fakeHistory
};
const fakeResults = [
  { title: 'Harry Potter 1' },
  { title: 'Harry Potter 2' },
  { title: 'Harry Potter 3' }
];

describe('<SearchPage />', () => {
  let originalApiKey;
  beforeAll(() => {
    originalApiKey = process.env.TMDB_API_KEY;
    process.env.TMDB_API_KEY = fakeApiKey;
  });
  afterAll(() => {
    process.env.TMDB_API_KEY = originalApiKey;
  });

  beforeEach(jest.clearAllMocks);

  describe('initial state', () => {
    const wrapper = shallow(<SearchPage {...defaultProps} />, {
      disableLifecycleMethods: true
    });

    it('should render the Header', () => {
      const header = wrapper.find(Header);
      expect(header.exists()).toBe(true);
      expect(header.prop('history')).toBe(fakeHistory);
    });

    it('should render the SearchResults component with initial state', () => {
      const resultsComp = wrapper.find(SearchResults);
      expect(resultsComp.exists()).toBe(true);
      expect(resultsComp.prop('currentSearchTerm')).toBe('');
      expect(resultsComp.prop('searchResults')).toEqual([]);
    });
  });

  describe('when the page mounts', () => {
    describe('if the searchTerm in the location is valid', () => {
      it('should make a request for search results', () => {
        get.mockResolvedValue({});
        shallow(<SearchPage {...defaultProps} />);
        expect(get).toHaveBeenCalledWith(
          'https://api.themoviedb.org/3/search/movie?api_key=FAKE_KEY&query=harry'
        );
      });

      describe('whilst the request is pending', () => {
        it('should render a Loader in place of the SearchResults component', () => {
          get.mockResolvedValue({});
          const wrapper = shallow(<SearchPage {...defaultProps} />);
          expect(wrapper.find(Loader).exists()).toBe(true);
          expect(wrapper.find(SearchResults).exists()).toBe(false);
        });
      });

      describe('if the request is successful', () => {
        it('should render the search results', done => {
          get.mockResolvedValue({ data: { results: fakeResults } });
          const wrapper = shallow(<SearchPage {...defaultProps} />);
          setTimeout(() => {
            expect(wrapper.find(Loader).exists()).toBe(false);
            const resultsComp = wrapper.find(SearchResults);
            expect(resultsComp.exists()).toBe(true);
            expect(resultsComp.prop('currentSearchTerm')).toBe('harry');
            expect(resultsComp.prop('searchResults')).toBe(fakeResults);
            expect();
            done();
          });
        });
      });

      describe('if the request is unsuccessful', () => {
        // TODO
      });
    });

    describe('if the searchTerm in the location is not valid', () => {
      it('should not make a request for search results', () => {
        const locationWithoutValidSearch = {
          ...fakeLocation,
          search: '?param=wrong'
        };
        const props = { ...defaultProps, location: locationWithoutValidSearch };
        shallow(<SearchPage {...props} />);
        expect(get).not.toHaveBeenCalled();
      });
    });
  });

  describe('when props change', () => {
    describe('if the location search has changed', () => {
      it('should fetch new results', () => {
        const newLocation = {
          ...fakeLocation,
          search: '?q=batman'
        };
        const wrapper = shallow(<SearchPage {...defaultProps} />);
        expect(get).toHaveBeenCalledTimes(1);
        wrapper.setProps({
          location: newLocation
        });
        expect(get).toHaveBeenCalledTimes(2);
        expect(get).toHaveBeenNthCalledWith(
          2,
          'https://api.themoviedb.org/3/search/movie?api_key=FAKE_KEY&query=batman'
        );
      });
    });

    describe('when the location search has not changed', () => {
      it('should not fetch new results', () => {
        const newLocation = {
          ...fakeLocation,
          someNewProperty: 'dunno'
        };
        const wrapper = shallow(<SearchPage {...defaultProps} />);
        expect(get).toHaveBeenCalledTimes(1);
        wrapper.setProps({
          location: newLocation
        });
        expect(get).toHaveBeenCalledTimes(1);
      });
    });
  });
});
