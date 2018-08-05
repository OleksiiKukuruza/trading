import { combineReducers } from 'redux';
import orders from './orders';
import matches from './matches';

const rootReducer = combineReducers({
  orders,
  matches
});

export default rootReducer;
