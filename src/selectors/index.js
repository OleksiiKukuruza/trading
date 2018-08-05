export const getSellOrders = state => state.orders.sellOrders;
export const getBuyOrders = state => state.orders.buyOrders;

export const getFirstMatches = state => state.matches.slice(0, 30);
export const getFirstSellOrders = state => getSellOrders(state).slice(0, 20);
export const getFirstBuyOrders = state => getBuyOrders(state).slice(0, 20);
