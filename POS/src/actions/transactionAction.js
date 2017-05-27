import axios from 'axios';

import { POST_TRANSACTION } from './constants'

const postTransactionSuccess = (data) => ({
  type: POST_TRANSACTION,
  payload: data
})

export const postTransaction = (cart) => (
  dispatch => (
    axios.post('http://penjualan-backend-prod.ap-southeast-1.elasticbeanstalk.com/transactions', {
      product_list: cart
    })
    .then((res) => dispatch(postTransactionSuccess(res.data)))
  )
)
