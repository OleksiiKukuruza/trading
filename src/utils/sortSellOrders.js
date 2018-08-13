const sortSellOrders = orders =>
  [...orders].sort((a, b) => a.price - b.price || a.id - b.id);

export default sortSellOrders;
