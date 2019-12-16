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
      searchResults: [{ title: 'Lion King' }, { title: 'Toy Story' }],
      totalResults: 12635167253625
    };
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
  });
});
