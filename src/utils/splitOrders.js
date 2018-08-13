const splitOrders = orders => {
  const newSellOrders = orders.filter(order => order.type === 'sell');
  const newBuyOrders = orders.filter(order => order.type === 'buy');
  return { newSellOrders, newBuyOrders };
};

export default splitOrders;
