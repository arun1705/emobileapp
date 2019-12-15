import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import UserPointActions from './user-point.reducer'

export function* getUserPoint(api, action) {
  const { userPointId } = action
  // make the call to the api
  const apiCall = call(api.getUserPoint, userPointId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointActions.userPointSuccess(response.data))
  } else {
    yield put(UserPointActions.userPointFailure(response.data))
  }
}

export function* getUserPoints(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getUserPoints, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointActions.userPointAllSuccess(response.data))
  } else {
    yield put(UserPointActions.userPointAllFailure(response.data))
  }
}

export function* updateUserPoint(api, action) {
  const { userPoint } = action
  // make the call to the api
  const idIsNotNull = !!userPoint.id
  const apiCall = call(idIsNotNull ? api.updateUserPoint : api.createUserPoint, userPoint)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointActions.userPointUpdateSuccess(response.data))
  } else {
    yield put(UserPointActions.userPointUpdateFailure(response.data))
  }
}

export function* searchUserPoints(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchUserPoints, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointActions.userPointSearchSuccess(response.data))
  } else {
    yield put(UserPointActions.userPointSearchFailure(response.data))
  }
}
export function* deleteUserPoint(api, action) {
  const { userPointId } = action
  // make the call to the api
  const apiCall = call(api.deleteUserPoint, userPointId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(UserPointActions.userPointDeleteSuccess())
  } else {
    yield put(UserPointActions.userPointDeleteFailure(response.data))
  }
}
