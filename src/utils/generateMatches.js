import getUpdatedOrders from './getUpdatedOrders';

const generateMatches = ({ mergedSellOrders, mergedBuyOrders }) => {
  const time = Date.now();
  let matches = [];
  let sellOrders = [...mergedSellOrders];
  let buyOrders = [...mergedBuyOrders];

  while (sellOrders[0].price <= buyOrders[0].price) {
    const match = {
      time,
      buy: { ...buyOrders[0] },
      sell: { ...sellOrders[0] }
    };

    const updatedOrders = getUpdatedOrders(sellOrders, buyOrders);
    sellOrders = updatedOrders.sellOrders;
    buyOrders = updatedOrders.buyOrders;

    matches = [...matches, match];
  }
  return { sellOrders, buyOrders, matches };
};

export default generateMatches;
