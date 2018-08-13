import { fetchOrdersSuccess, startOrdersPolling } from './ordersActions';

describe('ordersActions', () => {
  describe('startOrdersPolling', () => {
    it('creates START_ORDERS_POLLING action', () => {
      expect(startOrdersPolling()).toEqual({ type: 'START_ORDERS_POLLING' });
    });
  });

  describe('fetchOrdersSuccess', () => {
    it('creates ORDERS_FETCH_SUCCESS action', () => {
      expect(fetchOrdersSuccess()).toEqual({ type: 'ORDERS_FETCH_SUCCESS' });
    });
  });
});
