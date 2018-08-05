import { ORDERS_FETCH_SUCCESS } from '../actions/ordersActions';

const matches = (state = [], action) => {
  switch (action.type) {
    case ORDERS_FETCH_SUCCESS:
      return [...state, ...action.payload.matches].sort((a, b) => b.time - a.time);

    default:
      return state;
  }
};

export default matches;
