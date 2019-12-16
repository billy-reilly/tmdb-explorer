import React from 'react';
import { shallow } from 'enzyme';

import Movie from './Movie';

describe('<Movie />', () => {
  it('should render the poster image', () => {
    // TODO
  });

  it('should render the movie title', () => {
    const wrapper = shallow(<Movie id={12345} title="Home Alone" />);
    expect(wrapper.text()).toBe('Home Alone');
  });
});
