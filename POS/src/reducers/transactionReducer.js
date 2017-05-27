import { POST_TRANSACTION } from '../actions/constants';

const initialState = [];

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TRANSACTION: return action.payload
    default: return state

  }
}

export default transactionReducer
