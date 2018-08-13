import { all } from 'redux-saga/effects';
import root from './';
import ordersSaga from './orders';

describe('root Saga', () => {
  it('runs all sagas', () => {
    const gen = root();
    expect(gen.next().value).toEqual(all([ordersSaga()]));
    expect(gen.next().done).toEqual(true);
  });
});
