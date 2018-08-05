export const START_ORDERS_POLLING = 'START_ORDERS_POLLING';
export const ORDERS_FETCH_SUCCESS = 'ORDERS_FETCH_SUCCESS';

export const startOrdersPolling = () => ({
  type: START_ORDERS_POLLING
});

export const fetchOrdersSuccess = payload => ({
  type: ORDERS_FETCH_SUCCESS,
  payload
});
