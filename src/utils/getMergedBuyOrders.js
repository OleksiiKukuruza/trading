const getMergedBuyOrders = (prevBuyOrders, newBuyOrders) =>
  [...prevBuyOrders, ...newBuyOrders].sort(
    (a, b) => b.price - a.price || a.id - b.id
  );

export default getMergedBuyOrders;
