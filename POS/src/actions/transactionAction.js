import axios from 'axios';

import { POST_TRANSACTION, FETCH_TRANSACTION, DELETE_TRANSACTION, FETCH_TODAY_TRANSACTION, FETCH_TRANSACTION_BY_DATE } from './constants'

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

export const fetchTransactionSuccess = (transaction) => ({
  type: FETCH_TRANSACTION,
  payload: transaction
})

export const fetchTransaction = () => {
  return (
    dispatch => (
      axios.get('http://pos-prod.ap-southeast-1.elasticbeanstalk.com/transactions')
      .then((res) => (dispatch(fetchTransactionSuccess(res.data))))
    )
  )
}

export const deleteTransactionSuccess = (id) => ({
  type: DELETE_TRANSACTION,
  payload: id
})

export const deleteTransaction = (id) => {
  return (
    dispatch => (
      axios.delete(`http://pos-prod.ap-southeast-1.elasticbeanstalk.com/transactions/${id}`)
      .then(() => (dispatch(deleteTransactionSuccess(id))))
    )
  )
}

export const fetchTodayTransactionSuccess = (transaction) => ({
  type: FETCH_TODAY_TRANSACTION,
  payload: transaction
})

export const fetchTodayTransaction = (date, month, year) => {
  return (
    dispatch => (
      axios.get(`http://pos-prod.ap-southeast-1.elasticbeanstalk.com/transactions/${date}/${month}/${year}`)
      .then((res) => (dispatch(fetchTodayTransactionSuccess(res.data))))
    )
  )
}

export const fetchTransactionByDateSuccess = (transaction) => ({
  type: FETCH_TRANSACTION_BY_DATE,
  payload: transaction
})

export const fetchTransactionByDate = (date, month, year) => {
  return (
    dispatch => (
      axios.get(`http://pos-prod.ap-southeast-1.elasticbeanstalk.com/transactions/${date}/${month}/${year}`)
      .then((res) => (dispatch(fetchTransactionByDateSuccess(res.data))))
    )
  )
}
