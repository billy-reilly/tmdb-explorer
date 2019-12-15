import React from 'react';
import { shallow } from 'enzyme';

import Header from '../Header';

const requiredProps = {
  history: {
    push: () => {}
  }
};
const renderHeader = () => shallow(<Header {...requiredProps} />);

describe('<Header />', () => {
  it('should render a header tag', () => {
    const wrapper = renderHeader();
    const headerElt = wrapper.find('header');
    expect(headerElt.exists()).toBe(true);
  });

  it('should render a heading inside of an anchor tag', () => {
    const wrapper = renderHeader();

    const heading = wrapper.find('h1');
    expect(heading.exists()).toBe(true);
    expect(heading.text()).toBe('TMDb Explorer');

    const headingLink = heading.parent();
    expect(headingLink.is('a')).toBe(true);
    expect(headingLink.prop('href')).toBe('/');
  });
});
