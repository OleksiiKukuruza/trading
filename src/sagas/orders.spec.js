import { put, takeLatest, call, select } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import watchFetchOrders, { pollOrders } from './orders';
import { getBuyOrders, getSellOrders } from '../selectors';
import generateMatches from '../utils/generateMatches';
import splitOrders from '../utils/splitOrders';
import { fetchOrdersSuccess, START_ORDERS_POLLING } from '../actions/ordersActions';
import sortSellOrders from '../utils/sortSellOrders';
import sortBuyOrders from '../utils/sortBuyOrders';
import getOrders from '../utils/getOrders';

describe('orders Sagas', () => {
  it('pollOrders Saga fetches orders with 5s delay and generates matches', () => {
    const gen = pollOrders();

    expect(gen.next().value).toEqual(call(getOrders, 0));

    const newOrders = [
      {
        id: 100,
        price: 100,
        quantity: 10,
        type: 'buy'
      },
      {
        id: 101,
        price: 101,
        quantity: 10,
        type: 'sell'
      }
    ];
    expect(gen.next(newOrders).value).toEqual(select(getSellOrders));

    const prevSellOrders = [
      {
        id: 1,
        price: 99,
        quantity: 5,
        type: 'sell'
      },
      {
        id: 2,
        price: 89,
        quantity: 4,
        type: 'sell'
      }
    ];
    expect(gen.next(prevSellOrders).value).toEqual(select(getBuyOrders));

    const prevBuyOrders = [
      {
        id: 3,
        price: 70,
        quantity: 4,
        type: 'buy'
      },
      {
        id: 4,
        price: 75,
        quantity: 6,
        type: 'buy'
      }
    ];
    expect(gen.next(prevBuyOrders).value).toEqual(call(splitOrders, newOrders));

    const newSellOrders = [newOrders[1]];
    const newBuyOrders = [newOrders[0]];
    expect(gen.next({ newSellOrders, newBuyOrders }).value).toEqual(
      call(sortSellOrders, [...prevSellOrders, ...newSellOrders])
    );

    const mergedSellOrders = [...newSellOrders, ...prevSellOrders];
    expect(gen.next(mergedSellOrders).value).toEqual(
      call(sortBuyOrders, [...prevBuyOrders, ...newBuyOrders])
    );

    const mergedBuyOrders = [...newBuyOrders, ...prevBuyOrders];
    expect(gen.next(mergedBuyOrders).value).toEqual(
      call(generateMatches, mergedSellOrders, mergedBuyOrders)
    );

    const sellOrders = [1, 2, 3];
    const buyOrders = [4, 5, 6];
    const matches = [7, 8, 9];
    expect(gen.next({ sellOrders, buyOrders, matches }).value).toEqual(
      put(fetchOrdersSuccess({ sellOrders, buyOrders, matches }))
    );

    expect(gen.next().value).toEqual(call(delay, 5000));

    expect(gen.next().value).toEqual(call(getOrders, 101));
  });

  it('watchFetchOrders Saga waits for START_ORDERS_POLLING action and starts polling', () => {
    const gen = watchFetchOrders();
    expect(gen.next().value).toEqual(takeLatest(START_ORDERS_POLLING, pollOrders));
    expect(gen.next().done).toEqual(true);
  });
});
