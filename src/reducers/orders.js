import { ORDERS_FETCH_SUCCESS } from '../actions/ordersActions';

const initialState = {
  sellOrders: [],
  buyOrders: []
};

const orders = (state = initialState, action) => {
  switch (action.type) {
    case ORDERS_FETCH_SUCCESS:
      return {
        ...state,
        sellOrders: action.payload.sellOrders,
        buyOrders: action.payload.buyOrders
      };

    default:
      return state;
  }
};

export default orders;
