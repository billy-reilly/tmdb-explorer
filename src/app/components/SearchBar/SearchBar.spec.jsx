import React from 'react';
import { shallow } from 'enzyme';

import SearchBar from './SearchBar';

const requiredProps = {
  history: {
    push: () => {}
  }
};
const renderSearchBar = () => shallow(<SearchBar {...requiredProps} />);

describe('<SearchBar />', () => {
  it('should render a form element', () => {
    const wrapper = renderSearchBar();
    expect(wrapper.find('form').exists()).toBe(true);
  });

  it('should render a search input which is empty on first mount', () => {
    const wrapper = renderSearchBar();
    const input = wrapper.find('input');
    expect(input.length).toBe(1);
    expect(input.prop('type')).toBe('search');
    expect(input.prop('placeholder')).toBe('Search for movies');
    expect(input.prop('value')).toBe('');
  });

  it('should render a submit button with an svg icon', () => {
    const wrapper = renderSearchBar();
    const button = wrapper.find('button');
    expect(button.length).toBe(1);
    expect(button.children().is('svg')).toBe(true);
  });

  describe('@events', () => {
    describe('when the user types into the input field', () => {
      it("should update the input field's value accordingly", () => {
        const wrapper = renderSearchBar();
        expect(wrapper.find('input').prop('value')).toBe('');
        wrapper
          .find('input')
          .simulate('change', { target: { value: 'Jumanji' } });
        expect(wrapper.find('input').prop('value')).toBe('Jumanji');
      });
    });

    describe('when the user tries to search', () => {
      describe('if there is no search term in the field', () => {
        it('should not redirect', () => {
          const mockPush = jest.fn();
          const wrapper = shallow(<SearchBar history={{ push: mockPush }} />);
          expect(wrapper.find('input').prop('value')).toBe('');

          expect(mockPush).not.toHaveBeenCalled();
          wrapper.find('form').simulate('submit', { preventDefault: () => {} });
          expect(mockPush).not.toHaveBeenCalled();
        });
      });

      describe('if there is a search term in the input field', () => {
        it('should redirect to the search page with the search term as a query parameter', () => {
          const mockPush = jest.fn();
          const wrapper = shallow(<SearchBar history={{ push: mockPush }} />);
          expect(wrapper.find('input').prop('value')).toBe('');
          wrapper
            .find('input')
            .simulate('change', { target: { value: 'Jumanji' } });
          expect(wrapper.find('input').prop('value')).toBe('Jumanji');

          expect(mockPush).not.toHaveBeenCalled();
          wrapper.find('form').simulate('submit', { preventDefault: () => {} });
          expect(mockPush).toHaveBeenCalled();
        });
      });
    });
  });
});
