import orders from './orders';
import { fetchOrdersSuccess } from '../actions/ordersActions';

describe('orders reducer', () => {
  it('have empty buy and sell arrays as initial state', () => {
    expect(orders(undefined, {})).toEqual({
      sellOrders: [],
      buyOrders: []
    });
  });

  it('handles ORDERS_FETCH_SUCCESS action', () => {
    const stateBefore = {
      sellOrders: [{ id: 1, price: 100, quantity: 10, type: 'sell' }],
      buyOrders: [{ id: 3, price: 90, quantity: 10, type: 'buy' }]
    };
    const sellOrders = [
      { id: 5, price: 130, quantity: 10, type: 'sell' },
      { id: 6, price: 120, quantity: 10, type: 'sell' }
    ];
    const buyOrders = [
      { id: 7, price: 70, quantity: 10, type: 'buy' },
      { id: 8, price: 100, quantity: 10, type: 'buy' }
    ];
    const action = fetchOrdersSuccess({ sellOrders, buyOrders });
    expect(orders(stateBefore, action)).toEqual({ sellOrders, buyOrders });
  });
});
