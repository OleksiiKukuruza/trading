import splitOrders from './splitOrders';

describe('splitOrders', () => {
  it('returns buy and sell lists depending on type', () => {
    const orders = [
      { id: 1, price: 99, quantity: 10, type: 'sell' },
      { id: 2, price: 100, quantity: 10, type: 'buy' },
      { id: 3, price: 101, quantity: 10, type: 'sell' },
      { id: 4, price: 98, quantity: 10, type: 'buy' }
    ];
    expect(splitOrders(orders)).toEqual({
      newSellOrders: [orders[0], orders[2]],
      newBuyOrders: [orders[1], orders[3]]
    });
  });
});
