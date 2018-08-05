const getUpdatedOrders = (prevSellOrders, prevBuyOrders) => {
  const sellQuantity = prevSellOrders[0].quantity;
  const buyQuantity = prevBuyOrders[0].quantity;
  const buyOrders = prevBuyOrders.slice(1);
  const sellOrders = prevSellOrders.slice(1);

  if (buyQuantity === sellQuantity) {
    return {
      buyOrders,
      sellOrders
    };
  }

  const quantity = Math.min(sellQuantity, buyQuantity);

  if (quantity === sellQuantity) {
    const newBuyOrder = {
      ...prevBuyOrders[0],
      quantity: buyQuantity - quantity
    };
    return {
      buyOrders: [newBuyOrder, ...buyOrders],
      sellOrders
    };
  }

  const newSellOrder = {
    ...prevSellOrders[0],
    quantity: sellQuantity - quantity
  };
  return {
    buyOrders,
    sellOrders: [newSellOrder, ...sellOrders]
  };
};

export default getUpdatedOrders;
