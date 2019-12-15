import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UserPointTranActions from './user-point-trans.reducer'

export function* getUserPointTran(api, action) {
  const { userPointTranId } = action
  // make the call to the api
  const apiCall = call(api.getUserPointTran, userPointTranId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointTranActions.userPointTranSuccess(response.data))
  } else {
    yield put(UserPointTranActions.userPointTranFailure(response.data))
  }
}

export function* getUserPointTrans(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserPointTrans, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointTranActions.userPointTranAllSuccess(response.data))
  } else {
    yield put(UserPointTranActions.userPointTranAllFailure(response.data))
  }
}

export function* updateUserPointTran(api, action) {
  const { userPointTran } = action
  // make the call to the api
  const idIsNotNull = !!userPointTran.id
  const apiCall = call(idIsNotNull ? api.updateUserPointTran : api.createUserPointTran, userPointTran)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointTranActions.userPointTranUpdateSuccess(response.data))
  } else {
    yield put(UserPointTranActions.userPointTranUpdateFailure(response.data))
  }
}

export function* searchUserPointTrans(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchUserPointTrans, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointTranActions.userPointTranSearchSuccess(response.data))
  } else {
    yield put(UserPointTranActions.userPointTranSearchFailure(response.data))
  }
}
export function* deleteUserPointTran(api, action) {
  const { userPointTranId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserPointTran, userPointTranId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointTranActions.userPointTranDeleteSuccess())
  } else {
    yield put(UserPointTranActions.userPointTranDeleteFailure(response.data))
  }
}
