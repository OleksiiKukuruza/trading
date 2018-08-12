import getUpdatedOrders from './getUpdatedOrders';

describe('getUpdatedOrders', () => {
  it('returns buy and sell lists without first elements if quantity is same', () => {
    const prevSellOrders = [
      { id: 1, price: 99, quantity: 10, type: 'sell' },
      { id: 2, price: 101, quantity: 10, type: 'sell' }
    ];
    const prevBuyOrders = [
      { id: 3, price: 100, quantity: 10, type: 'buy' },
      { id: 4, price: 98, quantity: 10, type: 'buy' }
    ];
    expect(getUpdatedOrders(prevSellOrders, prevBuyOrders)).toEqual({
      sellOrders: [prevSellOrders[1]],
      buyOrders: [prevBuyOrders[1]]
    });
  });

  it(`returns sell list without first element and buy list with updated
      quantity at first element if quantity of first sell item is lower than buy`, () => {
    const prevSellOrders = [
      { id: 1, price: 99, quantity: 2, type: 'sell' },
      { id: 2, price: 101, quantity: 10, type: 'sell' }
    ];
    const prevBuyOrders = [
      { id: 3, price: 100, quantity: 10, type: 'buy' },
      { id: 4, price: 98, quantity: 10, type: 'buy' }
    ];
    expect(getUpdatedOrders(prevSellOrders, prevBuyOrders)).toEqual({
      sellOrders: [prevSellOrders[1]],
      buyOrders: [{ ...prevBuyOrders[0], quantity: 8 }, prevBuyOrders[1]]
    });
  });

  it(`returns buy list without first element and sell list with updated
      quantity at first element if quantity of first buy item is lower than sell`, () => {
    const prevSellOrders = [
      { id: 1, price: 99, quantity: 10, type: 'sell' },
      { id: 2, price: 101, quantity: 10, type: 'sell' }
    ];
    const prevBuyOrders = [
      { id: 3, price: 100, quantity: 4, type: 'buy' },
      { id: 4, price: 98, quantity: 10, type: 'buy' }
    ];
    expect(getUpdatedOrders(prevSellOrders, prevBuyOrders)).toEqual({
      sellOrders: [{ ...prevSellOrders[0], quantity: 6 }, prevSellOrders[1]],
      buyOrders: [prevBuyOrders[1]]
    });
  });
});
