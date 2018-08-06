import getUpdatedOrders from './getUpdatedOrders';

const generateMatches = ({ sellOrders, buyOrders, matches = [] }) => {
  const time = Date.now();

  if (
    !sellOrders.length ||
    !buyOrders.length ||
    sellOrders[0].price > buyOrders[0].price
  ) {
    return {
      sellOrders,
      buyOrders,
      matches
    };
  }

  const match = { time, sell: sellOrders[0], buy: buyOrders[0] };
  const updatedOrders = getUpdatedOrders(sellOrders, buyOrders);

  return generateMatches({ ...updatedOrders, matches: [...matches, match] });
};

export default generateMatches;
