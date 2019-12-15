import React from 'react';
import { shallow } from 'enzyme';
import { BrowserRouter, Switch, Route } from 'react-router-dom';

import App from '../App';
import HomePage from '../HomePage';
import SearchPage from '../SearchPage';
import NotFoundPage from '../NotFoundPage';

describe('App', () => {
  it('should render an instance of BrowserRouter and a Switch', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find(BrowserRouter).length).toBe(1);
    expect(wrapper.find(Switch).length).toBe(1);
  });

  it('should render a route for the HomePage', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ path: '/' }).props()).toMatchObject({
      exact: true,
      component: HomePage
    });
  });

  it('should render a route for the SearchPage', () => {
    const wrapper = shallow(<App />);
    expect(wrapper.find({ path: '/search' }).props()).toMatchObject({
      component: SearchPage
    });
  });

  it('should render the NotFoundPage as a fallback route', () => {
    const wrapper = shallow(<App />);
    const routesLength = wrapper.find(Route).length;
    expect(wrapper.find(Route).get(routesLength - 1).props).toMatchObject({
      path: '*',
      component: NotFoundPage
    });
  });
});
