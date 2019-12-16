import React from 'react';
import { shallow } from 'enzyme';

import SearchResults from './SearchResults';
import Movie from '../Movie/Movie';

describe('<SearchResults />', () => {
  describe('when there are no results to display', () => {
    it('should render a no results message', () => {
      const wrapper = shallow(
        <SearchResults
          currentSearchTerm="some obscure reference"
          searchResults={[]}
          totalResults={0}
          onLoadMoreClick={() => {}}
        />
      );
      expect(wrapper.text()).toBe(
        'Sorry, we couldn\'t find any results for "some obscure reference"'
      );
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

    it('should render a heading describing the results shown', () => {
      const wrapper = shallow(<SearchResults {...props} />);
      expect(wrapper.find('h2').text()).toEqual(
        'Showing 2 of 12635167253625 TMDb results for "disney something or other"'
      );
    });

    it('should render a Movie component for each result', () => {
      const wrapper = shallow(<SearchResults {...props} />);
      expect(wrapper.find(Movie).length).toBe(2);
    });

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
  });
});
