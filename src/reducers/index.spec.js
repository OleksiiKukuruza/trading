import rootReducer from './index';

describe('root reducer', () => {
  it('combines all reducers', () => {
    expect(rootReducer({}, { type: '@@INIT' })).toEqual({
      orders: {
        buyOrders: [],
        sellOrders: []
      },
      matches: []
    });
  });
});
