import { all } from 'redux-saga/effects';
import ordersSaga from './orders';

export default function* root() {
  yield all([ordersSaga()]);
}
