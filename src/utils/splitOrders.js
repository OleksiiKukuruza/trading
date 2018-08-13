const splitOrders = newOrders => {
  const newSellOrders = newOrders.filter(order => order.type === 'sell');
  const newBuyOrders = newOrders.filter(order => order.type === 'buy');
  return { newSellOrders, newBuyOrders };
};

export default splitOrders;
