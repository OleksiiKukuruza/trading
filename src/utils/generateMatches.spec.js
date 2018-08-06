import generateMatches from './generateMatches';

describe('generateMatches', () => {
  it('returns passed data as is if sell orders list is empty', () => {
    const initialData = {
      sellOrders: [],
      buyOrders: [{ id: 1, price: 100, quantity: 10, type: 'buy' }],
      matches: []
    };
    expect(generateMatches(initialData)).toEqual(initialData);
  });

  it('returns passed data as is if buy orders list is empty', () => {
    const initialData = {
      sellOrders: [{ id: 1, price: 100, quantity: 10, type: 'sell' }],
      buyOrders: [],
      matches: []
    };
    expect(generateMatches(initialData)).toEqual(initialData);
  });

  it('returns empty matches list if not provided', () => {
    const initialData = {
      sellOrders: [],
      buyOrders: []
    };
    expect(generateMatches(initialData)).toEqual({
      ...initialData,
      matches: []
    });
  });

  it('returns passed data as is if first sell order price is higher than first buy order price', () => {
    const initialData = {
      sellOrders: [
        { id: 1, price: 100, quantity: 10, type: 'sell' },
        {
          id: 2,
          price: 101,
          quantity: 10,
          type: 'sell'
        }
      ],
      buyOrders: [
        { id: 3, price: 99, quantity: 10, type: 'buy' },
        { id: 4, price: 98, quantity: 10, type: 'buy' }
      ],
      matches: []
    };
    expect(generateMatches(initialData)).toEqual(initialData);
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
    const initialData = {
      sellOrders,
      buyOrders,
      matches
    };

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
    expect(generateMatches(initialData)).toEqual(expected);
  });
});
