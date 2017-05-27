import { combineReducers } from 'redux';

import productReducer from './productReducer';
import transactionReducer from './transactionReducer';

const rootReducer = combineReducers({
  products: productReducer,
  transactions: transactionReducer
});

export default rootReducer;
