import axios from 'axios';

import { FETCH_PRODUCT } from './constants';

export const fetchProductSuccess = (product) => ({
  type: FETCH_PRODUCT,
  payload: product
})

export const fetchProduct = () => {
  return (
    dispatch => (
      axios.get('http://pos-prod.ap-southeast-1.elasticbeanstalk.com/products')
      .then((res) => (dispatch(fetchProductSuccess(res.data))))
    )
  )
}
