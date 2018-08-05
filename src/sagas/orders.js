import { put, takeLatest, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  START_ORDERS_POLLING,
  fetchOrdersSuccess
} from '../actions/ordersActions';
import { getBuyOrders, getSellOrders } from '../selectors';

const getOrders = start =>
  fetch(`http://localhost:5001/listOrders?start=${start}&size=100`).then(res =>
    res.json()
  );

const generateMatches = (newOrders, prevSellOrders, prevBuyOrders) => {
  const newSellOrders = newOrders.filter(order => order.type === 'sell');
  const newBuyOrders = newOrders.filter(order => order.type === 'buy');

  const sellOrders = [...prevSellOrders, ...newSellOrders].sort(
    (a, b) => a.price - b.price || a.id - b.id
  );
  const buyOrders = [...prevBuyOrders, ...newBuyOrders].sort(
    (a, b) => b.price - a.price || a.id - b.id
  );
  const time = new Date().toLocaleTimeString();

  const matches = [];

  while (sellOrders[0].price <= buyOrders[0].price) {
    const sell = { ...sellOrders[0] };
    const buy = { ...buyOrders[0] };

    const quantity = Math.min(sell.quantity, buy.quantity);

    if (quantity === sell.quantity) {
      sellOrders.shift();
      buyOrders[0].quantity = buy.quantity - quantity;
    } else {
      buyOrders.shift();
      sellOrders[0].quantity = sell.quantity - quantity;
    }

    matches.push({ time, sell, buy });
  }
  return { sellOrders, buyOrders, matches };
};

function* pollOrders() {
  let start = 0;
  while (true) {
    const newOrders = yield call(getOrders, start);
    start = newOrders[newOrders.length - 1].id;

    const prevSellOrders = yield select(getSellOrders);
    const prevBuyOrders = yield select(getBuyOrders);
    const { sellOrders, buyOrders, matches } = generateMatches(
      newOrders,
      prevSellOrders,
      prevBuyOrders
    );

    yield put(
      fetchOrdersSuccess({
        sellOrders,
        buyOrders,
        matches
      })
    );
    yield delay(5000);
  }
}

function* watchFetchOrders() {
  yield takeLatest(START_ORDERS_POLLING, pollOrders);
}

export default watchFetchOrders;
