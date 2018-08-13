const sortBuyOrders = orders => [...orders].sort(
  (a, b) => b.price - a.price || a.id - b.id
);

export default sortBuyOrders;
