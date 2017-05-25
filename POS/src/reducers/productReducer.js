import { FETCH_PRODUCT } from '../actions/constants';

const initialState = [];

const productReducer = (state = initialState, action) => {
  switch (action.type) {
    case FETCH_PRODUCT: return action.payload
    default: return state
  }
}

export default productReducer
