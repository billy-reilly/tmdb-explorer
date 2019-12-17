import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from './SearchResults';
import Movie from '../Movie/Movie';
import Loader from '../Loader/Loader';

describe('<SearchResults />', () => {
  describe('when there are no results to display', () => {
    describe('and it is not in loading state', () => {
      it('should render a no results message', () => {
        const wrapper = shallow(
          <SearchResults
            currentSearchTerm="some obscure reference"
            searchResults={[]}
            totalResults={0}
            onLoadMoreClick={() => {}}
            isLoading={false}
          />
        );
        expect(wrapper.text()).toBe(
          'Sorry, we couldn\'t find any results for "some obscure reference"'
        );
        expect(wrapper.find(Loader).exists()).toBe(false);
      });
    });

    describe('and it is in loading state', () => {
      it('should render the loader in place of the no results message', () => {
        const wrapper = shallow(
          <SearchResults
            currentSearchTerm="some obscure reference"
            searchResults={[]}
            totalResults={0}
            onLoadMoreClick={() => {}}
            isLoading
          />
        );
        expect(wrapper.text()).not.toBe(
          'Sorry, we couldn\'t find any results for "some obscure reference"'
        );
        expect(wrapper.find(Loader).exists()).toBe(true);
      });
    });
  });

  describe('when there are search results', () => {
    const props = {
      currentSearchTerm: 'disney something or other',
      searchResults: [
        { id: 123, title: 'Lion King' },
        { id: 456, title: 'Toy Story' }
      ],
      totalResults: 12635167253625,
      onLoadMoreClick: jest.fn()
    };

    beforeEach(jest.clearAllMocks);

    const assertHeadingAndResultsShown = (additionalProps = {}) => {
      it('should render a heading describing the results shown', () => {
        const wrapper = shallow(
          <SearchResults {...props} {...additionalProps} />
        );
        expect(wrapper.find('h2').text()).toEqual(
          'Showing 2 of 12635167253625 TMDb results for "disney something or other"'
        );
      });

      it('should render a Movie component for each result', () => {
        const wrapper = shallow(
          <SearchResults {...props} {...additionalProps} />
        );
        expect(wrapper.find(Movie).length).toBe(2);
      });
    };

    describe('and it is not in loading state', () => {
      assertHeadingAndResultsShown({ isLoading: false });

      describe('when there are some search results but less than the totalResults', () => {
        it('should render a load more button', () => {
          const wrapper = shallow(<SearchResults {...props} />);
          expect(wrapper.find('button').exists()).toBe(true);
        });

        describe('when the user clicks on the load more button', () => {
          it('should call its prop onLoadMoreClick', () => {
            const wrapper = shallow(<SearchResults {...props} />);
            expect(props.onLoadMoreClick).not.toHaveBeenCalled();
            wrapper.find('button').simulate('click');
            expect(props.onLoadMoreClick).toHaveBeenCalled();
          });
        });
      });

      describe('when the number of search results equals the totalResults', () => {
        it('should not render a load more button', () => {
          const wrapper = shallow(
            <SearchResults {...props} totalResults={2} />
          );
          expect(wrapper.find('button').exists()).toBe(false);
        });
      });
    });

    describe('and it is in loading state', () => {
      assertHeadingAndResultsShown({ isLoading: true });

      it('should display the Loader', () => {
        const wrapper = shallow(<SearchResults {...props} isLoading />);
        expect(wrapper.find(Loader).exists()).toBe(true);
      });

      describe('when there are some search results but less than the totalResults', () => {
        it('should not display the load more button', () => {
          const wrapper = shallow(<SearchResults {...props} isLoading />);
          expect(wrapper.find('button').exists()).toBe(false);
        });
      });
    });
  });
});
