import generateMatches from './generateMatches';

describe('generateMatches', () => {
  it('returns passed data as is if sell orders list is empty', () => {
    const sellOrders = [];
    const buyOrders = [{ id: 1, price: 100, quantity: 10, type: 'buy' }];
    const matches = [];
    expect(generateMatches(sellOrders, buyOrders, matches)).toEqual({
      sellOrders,
      buyOrders,
      matches
    });
  });

  it('returns passed data as is if buy orders list is empty', () => {
    const sellOrders = [{ id: 1, price: 100, quantity: 10, type: 'sell' }];
    const buyOrders = [];
    const matches = [];
    expect(generateMatches(sellOrders, buyOrders, matches)).toEqual({
      sellOrders,
      buyOrders,
      matches
    });
  });

  it('returns empty matches list if not provided', () => {
    const sellOrders = [];
    const buyOrders = [];
    expect(generateMatches(sellOrders, buyOrders)).toEqual({
      sellOrders,
      buyOrders,
      matches: []
    });
  });

  it('returns passed data as is if first sell order price is higher than first buy order price', () => {
    const sellOrders = [
      {
        id: 1,
        price: 100,
        quantity: 10,
        type: 'sell'
      },
      {
        id: 2,
        price: 101,
        quantity: 10,
        type: 'sell'
      }
    ];
    const buyOrders = [
      {
        id: 3,
        price: 99,
        quantity: 10,
        type: 'buy'
      },
      {
        id: 4,
        price: 98,
        quantity: 10,
        type: 'buy'
      }
    ];
    const matches = [];
    expect(generateMatches(sellOrders, buyOrders, matches)).toEqual({
      sellOrders,
      buyOrders,
      matches
    });
  });

  it('generates match and return sell and buy lists without match', () => {
    const sellOrders = [
      { id: 1, price: 99, quantity: 10, type: 'sell' },
      { id: 2, price: 101, quantity: 10, type: 'sell' }
    ];
    const buyOrders = [
      { id: 3, price: 100, quantity: 10, type: 'buy' },
      { id: 4, price: 98, quantity: 10, type: 'buy' }
    ];
    const matches = [];

    const expected = {
      sellOrders: [{ id: 2, price: 101, quantity: 10, type: 'sell' }],
      buyOrders: [{ id: 4, price: 98, quantity: 10, type: 'buy' }],
      matches: [
        {
          buy: { id: 3, price: 100, quantity: 10, type: 'buy' },
          sell: { id: 1, price: 99, quantity: 10, type: 'sell' },
          time: 100
        }
      ]
    };
    Date = { now: () => 100 };
    expect(generateMatches(sellOrders, buyOrders, matches)).toEqual(expected);
  });
});
