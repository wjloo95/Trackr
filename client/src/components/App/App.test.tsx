import React from 'react';
import { shallow, mount } from 'enzyme';
import { MemoryRouter } from 'react-router';

import {
  App,
  NotFound,
  Home,
  Login,
  Register,
  Portfolio,
  Transactions,
} from '..';

const mockReactRouterDom = require('react-router-dom');

jest
  .spyOn(mockReactRouterDom, 'BrowserRouter')
  .mockImplementation(({ children }: any) => children);

// Check that all routes go to correct page
describe('App Routes', () => {
  test('Default path should route to Homepage', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Home)).toHaveLength(1);
  });

  test('Login path should route to Login', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/login']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Login)).toHaveLength(1);
  });

  test('Register path should route to Register', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/register']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Register)).toHaveLength(1);
  });

  test('Portfolio path should route to Portfolio', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/portfolio']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Portfolio)).toHaveLength(1);
  });

  test('Transactions path should route to Transactions', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/transactions']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(Transactions)).toHaveLength(1);
  });

  test('Invalid path should route to NotFound', () => {
    const wrapper = mount(
      <MemoryRouter initialEntries={['/random']}>
        <App />
      </MemoryRouter>
    );

    expect(wrapper.find(NotFound)).toHaveLength(1);
  });
});
