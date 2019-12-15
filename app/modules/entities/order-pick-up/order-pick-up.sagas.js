import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrderPickUpActions from './order-pick-up.reducer'

export function* getOrderPickUp(api, action) {
  const { orderPickUpId } = action
  // make the call to the api
  const apiCall = call(api.getOrderPickUp, orderPickUpId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderPickUpActions.orderPickUpSuccess(response.data))
  } else {
    yield put(OrderPickUpActions.orderPickUpFailure(response.data))
  }
}

export function* getOrderPickUps(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrderPickUps, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderPickUpActions.orderPickUpAllSuccess(response.data))
  } else {
    yield put(OrderPickUpActions.orderPickUpAllFailure(response.data))
  }
}

export function* updateOrderPickUp(api, action) {
  const { orderPickUp } = action
  // make the call to the api
  const idIsNotNull = !!orderPickUp.id
  const apiCall = call(idIsNotNull ? api.updateOrderPickUp : api.createOrderPickUp, orderPickUp)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrderPickUpActions.orderPickUpUpdateSuccess(response.data))
  } else {
    yield put(OrderPickUpActions.orderPickUpUpdateFailure(response.data))
  }
}

export function* searchOrderPickUps(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrderPickUps, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderPickUpActions.orderPickUpSearchSuccess(response.data))
  } else {
    yield put(OrderPickUpActions.orderPickUpSearchFailure(response.data))
  }
}
export function* deleteOrderPickUp(api, action) {
  const { orderPickUpId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrderPickUp, orderPickUpId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrderPickUpActions.orderPickUpDeleteSuccess())
  } else {
    yield put(OrderPickUpActions.orderPickUpDeleteFailure(response.data))
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
