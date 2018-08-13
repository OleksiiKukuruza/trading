import matches from './matches';
import { fetchOrdersSuccess } from '../actions/ordersActions';

describe('matches reducer', () => {
  it('have empty array as initial state', () => {
    expect(matches(undefined, {})).toEqual([]);
  });

  it('handles ORDERS_FETCH_SUCCESS action', () => {
    const stateBefore = [
      { time: 1, sell: { id: 1 }, buy: { id: 2 } },
      { time: 10, sell: { id: 3 }, buy: { id: 4 } },
      { time: 6, sell: { id: 5 }, buy: { id: 6 } },
      { time: 8, sell: { id: 7 }, buy: { id: 8 } }
    ];
    const newMatches = [
      { time: 2, sell: { id: 9 }, buy: { id: 10 } },
      { time: 7, sell: { id: 11 }, buy: { id: 12 } },
      { time: 3, sell: { id: 13 }, buy: { id: 14 } },
      { time: 5, sell: { id: 15 }, buy: { id: 16 } }
    ];
    const action = fetchOrdersSuccess({ matches: newMatches });
    expect(matches(stateBefore, action)).toEqual([
      stateBefore[1],
      stateBefore[3],
      newMatches[1],
      stateBefore[2],
      newMatches[3],
      newMatches[2],
      newMatches[0],
      stateBefore[0]
    ]);
  });
});
