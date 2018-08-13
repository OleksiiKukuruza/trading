import React from 'react';
import { shallow } from 'enzyme';
import Main, { StyledMain } from './Main';
import theme from '../theme';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('Main', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup(Main, {
      buyOrders: [{ id: 1, price: 123, quantity: 10 }],
      sellOrders: [{ id: 2, price: 233, quantity: 5 }],
      matches: [{ time: 123, sell: { id: 3, price: 50, quantity: 3 }, buy: { id: 4, price: 60, quantity: 6 } }]
    });
    expect(wrapper).toMatchSnapshot();
  });

  it('renders StyledMain', () => {
    const { wrapper } = setup(StyledMain, { theme });
    expect(wrapper).toMatchSnapshot();
  });
});
