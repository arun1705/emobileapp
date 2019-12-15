import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderRequestActions from './order-request.reducer'

export function* getOrderRequest(api, action) {
  const { orderRequestId } = action
  // make the call to the api
  const apiCall = call(api.getOrderRequest, orderRequestId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderRequestActions.orderRequestSuccess(response.data))
  } else {
    yield put(OrderRequestActions.orderRequestFailure(response.data))
  }
}

export function* getOrderRequests(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderRequests, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderRequestActions.orderRequestAllSuccess(response.data))
  } else {
    yield put(OrderRequestActions.orderRequestAllFailure(response.data))
  }
}

export function* updateOrderRequest(api, action) {
  const { orderRequest } = action
  // make the call to the api
  const idIsNotNull = !!orderRequest.id
  const apiCall = call(idIsNotNull ? api.updateOrderRequest : api.createOrderRequest, orderRequest)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderRequestActions.orderRequestUpdateSuccess(response.data))
  } else {
    yield put(OrderRequestActions.orderRequestUpdateFailure(response.data))
  }
}

export function* searchOrderRequests(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrderRequests, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderRequestActions.orderRequestSearchSuccess(response.data))
  } else {
    yield put(OrderRequestActions.orderRequestSearchFailure(response.data))
  }
}
export function* deleteOrderRequest(api, action) {
  const { orderRequestId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderRequest, orderRequestId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderRequestActions.orderRequestDeleteSuccess())
  } else {
    yield put(OrderRequestActions.orderRequestDeleteFailure(response.data))
  }
}
function mapDateFields(data) {
  if (data.createdOn) {
    data.createdOn = new Date(data.createdOn)
  }
  return data
}
