import { POST_TRANSACTION, FETCH_TRANSACTION, DELETE_TRANSACTION } from '../actions/constants';

const initialState = [];

const deleteTransaction = (state, id) => {
    const newState = state.filter(x => x._id !== id );
    return newState;
}

const transactionReducer = (state = initialState, action) => {
  switch (action.type) {
    case POST_TRANSACTION: return [...state, action.payload]
    case FETCH_TRANSACTION: return action.payload
    case DELETE_TRANSACTION: {
      const newData = deleteTransaction(state, action.payload)
      return newData
    }
    default: return state
  }
}

export default transactionReducer
