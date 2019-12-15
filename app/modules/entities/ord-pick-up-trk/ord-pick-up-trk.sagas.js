import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrdPickUpTrkActions from './ord-pick-up-trk.reducer'

export function* getOrdPickUpTrk(api, action) {
  const { ordPickUpTrkId } = action
  // make the call to the api
  const apiCall = call(api.getOrdPickUpTrk, ordPickUpTrkId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrdPickUpTrkActions.ordPickUpTrkSuccess(response.data))
  } else {
    yield put(OrdPickUpTrkActions.ordPickUpTrkFailure(response.data))
  }
}

export function* getOrdPickUpTrks(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrdPickUpTrks, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdPickUpTrkActions.ordPickUpTrkAllSuccess(response.data))
  } else {
    yield put(OrdPickUpTrkActions.ordPickUpTrkAllFailure(response.data))
  }
}

export function* updateOrdPickUpTrk(api, action) {
  const { ordPickUpTrk } = action
  // make the call to the api
  const idIsNotNull = !!ordPickUpTrk.id
  const apiCall = call(idIsNotNull ? api.updateOrdPickUpTrk : api.createOrdPickUpTrk, ordPickUpTrk)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrdPickUpTrkActions.ordPickUpTrkUpdateSuccess(response.data))
  } else {
    yield put(OrdPickUpTrkActions.ordPickUpTrkUpdateFailure(response.data))
  }
}

export function* searchOrdPickUpTrks(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrdPickUpTrks, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdPickUpTrkActions.ordPickUpTrkSearchSuccess(response.data))
  } else {
    yield put(OrdPickUpTrkActions.ordPickUpTrkSearchFailure(response.data))
  }
}
export function* deleteOrdPickUpTrk(api, action) {
  const { ordPickUpTrkId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrdPickUpTrk, ordPickUpTrkId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdPickUpTrkActions.ordPickUpTrkDeleteSuccess())
  } else {
    yield put(OrdPickUpTrkActions.ordPickUpTrkDeleteFailure(response.data))
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
