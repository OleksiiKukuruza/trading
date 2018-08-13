import { put, takeLatest, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import {
  START_ORDERS_POLLING,
  fetchOrdersSuccess
} from '../actions/ordersActions';
import { getBuyOrders, getSellOrders } from '../selectors';
import generateMatches from '../utils/generateMatches';
import splitOrders from '../utils/splitOrders';
import sortSellOrders from '../utils/sortSellOrders';
import sortBuyOrders from '../utils/sortBuyOrders';
import getOrders from '../utils/getOrders';

export function* pollOrders() {
  let start = 0;
  while (true) {
    const newOrders = yield call(getOrders, start);
    start = newOrders[newOrders.length - 1].id;

    const prevSellOrders = yield select(getSellOrders);
    const prevBuyOrders = yield select(getBuyOrders);
    const { newSellOrders, newBuyOrders } = yield call(splitOrders, newOrders);
    const mergedSellOrders = yield call(sortSellOrders, [
      ...prevSellOrders,
      ...newSellOrders
    ]);
    const mergedBuyOrders = yield call(sortBuyOrders, [
      ...prevBuyOrders,
      ...newBuyOrders
    ]);
    const { sellOrders, buyOrders, matches } = yield call(
      generateMatches,
      mergedSellOrders,
      mergedBuyOrders
    );

    yield put(
      fetchOrdersSuccess({
        sellOrders,
        buyOrders,
        matches
      })
    );
    yield call(delay, 5000);
  }
}

function* watchFetchOrders() {
  yield takeLatest(START_ORDERS_POLLING, pollOrders);
}

export default watchFetchOrders;
