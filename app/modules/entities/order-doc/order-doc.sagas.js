import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderDocActions from './order-doc.reducer'

export function* getOrderDoc(api, action) {
  const { orderDocId } = action
  // make the call to the api
  const apiCall = call(api.getOrderDoc, orderDocId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDocActions.orderDocSuccess(response.data))
  } else {
    yield put(OrderDocActions.orderDocFailure(response.data))
  }
}

export function* getOrderDocs(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderDocs, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDocActions.orderDocAllSuccess(response.data))
  } else {
    yield put(OrderDocActions.orderDocAllFailure(response.data))
  }
}

export function* updateOrderDoc(api, action) {
  const { orderDoc } = action
  // make the call to the api
  const idIsNotNull = !!orderDoc.id
  const apiCall = call(idIsNotNull ? api.updateOrderDoc : api.createOrderDoc, orderDoc)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDocActions.orderDocUpdateSuccess(response.data))
  } else {
    yield put(OrderDocActions.orderDocUpdateFailure(response.data))
  }
}

export function* searchOrderDocs(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrderDocs, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDocActions.orderDocSearchSuccess(response.data))
  } else {
    yield put(OrderDocActions.orderDocSearchFailure(response.data))
  }
}
export function* deleteOrderDoc(api, action) {
  const { orderDocId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderDoc, orderDocId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDocActions.orderDocDeleteSuccess())
  } else {
    yield put(OrderDocActions.orderDocDeleteFailure(response.data))
  }
}
