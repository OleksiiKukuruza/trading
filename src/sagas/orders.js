import { put, takeLatest, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  START_ORDERS_POLLING,
  fetchOrdersSuccess
} from '../actions/ordersActions';
import { getBuyOrders, getSellOrders } from '../selectors';
import generateMatches from '../utils/generateMatches';

const getOrders = start =>
  fetch(`http://localhost:5001/listOrders?start=${start}&size=100`).then(res =>
    res.json()
  );

const getSplittedOrders = newOrders => {
  const newSellOrders = newOrders.filter(order => order.type === 'sell');
  const newBuyOrders = newOrders.filter(order => order.type === 'buy');
  return { newSellOrders, newBuyOrders };
};

const getMergedSellOrders = (prevSellOrders, newSellOrders) =>
  [...prevSellOrders, ...newSellOrders].sort(
    (a, b) => a.price - b.price || a.id - b.id
  );

const getMergedBuyOrders = (prevBuyOrders, newBuyOrders) =>
  [...prevBuyOrders, ...newBuyOrders].sort(
    (a, b) => b.price - a.price || a.id - b.id
  );

function* pollOrders() {
  let start = 0;
  while (true) {
    const newOrders = yield call(getOrders, start);
    start = newOrders[newOrders.length - 1].id;

    const prevSellOrders = yield select(getSellOrders);
    const prevBuyOrders = yield select(getBuyOrders);
    const { newSellOrders, newBuyOrders } = getSplittedOrders(newOrders);
    const { sellOrders, buyOrders, matches } = generateMatches({
      sellOrders: getMergedSellOrders(prevSellOrders, newSellOrders),
      buyOrders: getMergedBuyOrders(prevBuyOrders, newBuyOrders)
    });

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
