import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderDetailActions from './order-details.reducer'

export function* getOrderDetail(api, action) {
  const { orderDetailId } = action
  // make the call to the api
  const apiCall = call(api.getOrderDetail, orderDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderDetailActions.orderDetailSuccess(response.data))
  } else {
    yield put(OrderDetailActions.orderDetailFailure(response.data))
  }
}

export function* getOrderDetails(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderDetails, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailActions.orderDetailAllSuccess(response.data))
  } else {
    yield put(OrderDetailActions.orderDetailAllFailure(response.data))
  }
}

export function* updateOrderDetail(api, action) {
  const { orderDetail } = action
  // make the call to the api
  const idIsNotNull = !!orderDetail.id
  const apiCall = call(idIsNotNull ? api.updateOrderDetail : api.createOrderDetail, orderDetail)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderDetailActions.orderDetailUpdateSuccess(response.data))
  } else {
    yield put(OrderDetailActions.orderDetailUpdateFailure(response.data))
  }
}

export function* searchOrderDetails(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrderDetails, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailActions.orderDetailSearchSuccess(response.data))
  } else {
    yield put(OrderDetailActions.orderDetailSearchFailure(response.data))
  }
}
export function* deleteOrderDetail(api, action) {
  const { orderDetailId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderDetail, orderDetailId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderDetailActions.orderDetailDeleteSuccess())
  } else {
    yield put(OrderDetailActions.orderDetailDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.createdOn) {
    data.createdOn = new Date(data.createdOn)
  }
  if (data.modifiedOn) {
    data.modifiedOn = new Date(data.modifiedOn)
  }
  return data
}
