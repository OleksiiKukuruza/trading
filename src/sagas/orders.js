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

const generateMatches = ({ mergedSellOrders, mergedBuyOrders }) => {
  const time = Date.now();
  let matches = [];
  let sellOrders = [...mergedSellOrders];
  let buyOrders = [...mergedBuyOrders];

  while (sellOrders[0].price <= buyOrders[0].price) {
    const sell = { ...sellOrders[0] };
    const buy = { ...buyOrders[0] };

    const quantity = Math.min(sell.quantity, buy.quantity);

    if (buy.quantity === sell.quantity) {
      buyOrders = buyOrders.slice(1);
      sellOrders = sellOrders.slice(1);
    } else if (quantity === sell.quantity) {
      sellOrders = sellOrders.slice(1);
      buyOrders[0].quantity = buy.quantity - quantity;
    } else {
      buyOrders = buyOrders.slice(1);
      sellOrders[0].quantity = sell.quantity - quantity;
    }

    matches = [...matches, { time, sell, buy }];
  }
  return { sellOrders, buyOrders, matches };
};

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
    const mergedSellOrders = getMergedSellOrders(prevSellOrders, newSellOrders);
    const mergedBuyOrders = getMergedBuyOrders(prevBuyOrders, newBuyOrders);

    const { sellOrders, buyOrders, matches } = generateMatches({
      mergedSellOrders,
      mergedBuyOrders
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
