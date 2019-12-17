import React from 'react';
import { shallow } from 'enzyme';
import { get } from 'axios';

import SearchPage from './SearchPage';
import Header from '../../components/Header/Header';
import SearchResults from '../../components/SearchResults/SearchResults';

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
  { id: 123, title: 'Harry Potter 1' },
  { id: 456, title: 'Harry Potter 2' },
  { id: 789, title: 'Harry Potter 3' }
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
          'https://api.themoviedb.org/3/search/movie?api_key=FAKE_KEY&query=harry&page=1'
        );
      });

      describe('whilst the request is pending', () => {
        it('should pass down isLoading true the SearchResults component', () => {
          get.mockResolvedValue({});
          const wrapper = shallow(<SearchPage {...defaultProps} />);
          expect(wrapper.find(SearchResults).prop('isLoading')).toBe(true);
        });
      });

      describe('if the request is successful', () => {
        it('should render the search results', done => {
          get.mockResolvedValue({
            data: { results: fakeResults, total_results: 100 }
          });
          const wrapper = shallow(<SearchPage {...defaultProps} />);
          setTimeout(() => {
            const resultsComp = wrapper.find(SearchResults);
            expect(resultsComp.exists()).toBe(true);
            expect(resultsComp.prop('isLoading')).toBe(false);
            expect(resultsComp.prop('currentSearchTerm')).toBe('harry');
            expect(resultsComp.prop('searchResults')).toEqual(fakeResults);
            expect(resultsComp.prop('totalResults')).toBe(100);
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
          'https://api.themoviedb.org/3/search/movie?api_key=FAKE_KEY&query=batman&page=1'
        );
      });

      describe('whilst the second request is pending', () => {
        it('should delete any previously fetched results from state and display loading state', done => {
          const fakeBatmanResults = [
            { id: 123, title: 'Batman 1' },
            { id: 456, title: 'Batman 2' },
            { id: 789, title: 'Batman 3' }
          ];

          get.mockResolvedValueOnce({
            data: { results: fakeResults, total_results: 100 }
          });
          get.mockResolvedValueOnce({
            data: { results: fakeBatmanResults, total_results: 100 }
          });

          const wrapper = shallow(<SearchPage {...defaultProps} />);

          setTimeout(() => {
            expect(wrapper.find(SearchResults).prop('searchResults')).toEqual(
              fakeResults
            );
            // now wrapper is in state where first set of results has been
            // fetched and rendered

            const newLocation = {
              ...fakeLocation,
              search: '?q=batman'
            };
            wrapper.setProps({
              location: newLocation
            });

            expect(wrapper.find(SearchResults).prop('searchResults')).toEqual(
              []
            );
            expect(wrapper.find(SearchResults).prop('isLoading')).toBe(true);
            done();
          });
        });
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

  describe('when at least one page has already been fetched and the user clicks "load more"', () => {
    const initialState = {
      currentSearchTerm: 'harry',
      searchResults: fakeResults,
      totalResults: 1000,
      page: 3
    };

    it('should make a request for the subsequent page', () => {
      const wrapper = shallow(<SearchPage {...defaultProps} />, {
        disableLifecycleMethods: true
      });
      wrapper.setState(initialState);
      expect(get).not.toHaveBeenCalled();
      wrapper.find(SearchResults).prop('onLoadMoreClick')();
      expect(get).toHaveBeenCalledWith(
        'https://api.themoviedb.org/3/search/movie?api_key=FAKE_KEY&query=harry&page=4'
      );
    });

    describe('whilst second request is pending', () => {
      it('should pass down the search results that have already been fetched AND isLoading true', () => {
        const wrapper = shallow(<SearchPage {...defaultProps} />, {
          disableLifecycleMethods: true
        });
        wrapper.setState(initialState);
        expect(wrapper.find(SearchResults).prop('searchResults')).toEqual(
          fakeResults
        );
        expect(wrapper.find(SearchResults).prop('isLoading')).toBe(false);

        wrapper.find(SearchResults).prop('onLoadMoreClick')();

        expect(wrapper.find(SearchResults).prop('searchResults')).toEqual(
          fakeResults
        );
        expect(wrapper.find(SearchResults).prop('isLoading')).toBe(true);
      });
    });
  });
});
