import React from 'react';
import { shallow } from 'enzyme';
import OrderList from './OrderList';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('OrderList', () => {
  it('renders without crashing', () => {
    const { wrapper } = setup(OrderList, {
      orders: [
        { id: 1, price: 99, quantity: 10, type: 'sell' },
        { id: 3, price: 101, quantity: 10, type: 'sell' }
      ],
      title: 'Title'
    });
    expect(wrapper).toMatchSnapshot();
  });
});
