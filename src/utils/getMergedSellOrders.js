const getMergedSellOrders = (prevSellOrders, newSellOrders) =>
  [...prevSellOrders, ...newSellOrders].sort(
    (a, b) => a.price - b.price || a.id - b.id
  );

export default getMergedSellOrders;
