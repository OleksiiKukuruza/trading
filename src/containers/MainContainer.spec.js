import React from 'react';
import { mapStateToProps, withLifecycle } from './MainContainer';
import { shallow } from 'enzyme';

const setup = (Component, props) => {
  const wrapper = shallow(<Component {...props} />);

  return {
    wrapper
  };
};

describe('MainContainer', () => {
  it('passed correct props', () => {
    const state = {
      orders: {
        sellOrders: ['1', '2', '3'],
        buyOrders: ['4', '5', '6']
      },
      matches: ['7', '8', '9']
    };
    expect(mapStateToProps(state)).toEqual({
      sellOrders: state.orders.sellOrders,
      buyOrders: state.orders.buyOrders,
      matches: state.matches
    });
  });

  it('starts orders polling on componentDidMount', () => {
    const startOrdersPolling = jest.fn();
    setup(withLifecycle('div'), { startOrdersPolling });
    expect(startOrdersPolling).toHaveBeenCalled();
  });
});
