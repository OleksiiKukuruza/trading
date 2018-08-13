import sortSellOrders from './sortSellOrders';

describe('sortSellOrders', () => {
  it('sorts orders by price=asc and by id=asc', () => {
    const orders = [
      { id: 1, price: 100, quantity: 10, type: 'sell' },
      { id: 2, price: 50, quantity: 10, type: 'sell' },
      { id: 3, price: 100, quantity: 10, type: 'sell' },
      { id: 4, price: 75, quantity: 10, type: 'sell' }
    ];
    expect(sortSellOrders(orders)).toEqual([
      orders[1],
      orders[3],
      orders[0],
      orders[2]
    ]);
  });
});
