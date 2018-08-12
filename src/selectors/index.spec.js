import {
  getSellOrders,
  getBuyOrders,
  getFirstMatches,
  getFirstSellOrders,
  getFirstBuyOrders
} from './index';

describe('selectors', () => {
  it('getSellOrders returns sellOrders', () => {
    const state = {
      orders: {
        sellOrders: [{ id: 1, price: 100, quantity: 10, type: 'sell' }]
      }
    };
    expect(getSellOrders(state)).toEqual(state.orders.sellOrders);
  });

  it('getBuyOrders returns buyOrders', () => {
    const state = {
      orders: {
        buyOrders: [{ id: 1, price: 100, quantity: 10, type: 'buy' }]
      }
    };
    expect(getBuyOrders(state)).toEqual(state.orders.buyOrders);
  });

  it('getFirstMatches returns first 30 matches', () => {
    const state = {
      matches: [...new Array(50)].fill({ foo: 'bar' })
    };
    expect(getFirstMatches(state)).toEqual(state.matches.slice(0, 30));
  });

  it('getFirstSellOrders returns first 20 sell orders', () => {
    const state = {
      orders: {
        sellOrders: [...new Array(50)].fill({ id: 1, price: 100, quantity: 10, type: 'sell' })
      }
    };
    expect(getFirstSellOrders(state)).toEqual(state.orders.sellOrders.slice(0, 20));
  });

  it('getFirstBuyOrders returns first 20 buy orders', () => {
    const state = {
      orders: {
        buyOrders: [...new Array(50)].fill({ id: 1, price: 100, quantity: 10, type: 'buy' })
      }
    };
    expect(getFirstBuyOrders(state)).toEqual(state.orders.buyOrders.slice(0, 20));
  });
});
