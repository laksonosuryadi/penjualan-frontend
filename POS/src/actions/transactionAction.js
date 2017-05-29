import axios from 'axios';

import { POST_TRANSACTION } from './constants'

const postTransactionSuccess = (data) => ({
  type: POST_TRANSACTION,
  payload: data
})

export const postTransaction = (checkoutCart, total) => (
  dispatch => (
    axios.post('http://pos-prod.ap-southeast-1.elasticbeanstalk.com/transactions', {
      product_list: checkoutCart,
      total: total
    })
    .then((res) => dispatch(postTransactionSuccess(res.data)))
  )
)
