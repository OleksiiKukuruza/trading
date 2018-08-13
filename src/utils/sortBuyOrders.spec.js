import sortBuyOrders from './sortBuyOrders';

describe('sortBuyOrders', () => {
  it('sorts orders by price=desc and by id=asc', () => {
    const orders = [
      { id: 1, price: 100, quantity: 10, type: 'buy' },
      { id: 2, price: 50, quantity: 10, type: 'buy' },
      { id: 3, price: 100, quantity: 10, type: 'buy' },
      { id: 4, price: 75, quantity: 10, type: 'buy' }
    ];
    expect(sortBuyOrders(orders)).toEqual([
      orders[0],
      orders[2],
      orders[3],
      orders[1]
    ]);
  });
});
