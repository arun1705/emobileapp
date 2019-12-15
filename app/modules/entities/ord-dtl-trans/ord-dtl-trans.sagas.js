import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import OrdDtlTranActions from './ord-dtl-trans.reducer'

export function* getOrdDtlTran(api, action) {
  const { ordDtlTranId } = action
  // make the call to the api
  const apiCall = call(api.getOrdDtlTran, ordDtlTranId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrdDtlTranActions.ordDtlTranSuccess(response.data))
  } else {
    yield put(OrdDtlTranActions.ordDtlTranFailure(response.data))
  }
}

export function* getOrdDtlTrans(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getOrdDtlTrans, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdDtlTranActions.ordDtlTranAllSuccess(response.data))
  } else {
    yield put(OrdDtlTranActions.ordDtlTranAllFailure(response.data))
  }
}

export function* updateOrdDtlTran(api, action) {
  const { ordDtlTran } = action
  // make the call to the api
  const idIsNotNull = !!ordDtlTran.id
  const apiCall = call(idIsNotNull ? api.updateOrdDtlTran : api.createOrdDtlTran, ordDtlTran)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    response.data = mapDateFields(response.data)
    yield put(OrdDtlTranActions.ordDtlTranUpdateSuccess(response.data))
  } else {
    yield put(OrdDtlTranActions.ordDtlTranUpdateFailure(response.data))
  }
}

export function* searchOrdDtlTrans(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchOrdDtlTrans, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdDtlTranActions.ordDtlTranSearchSuccess(response.data))
  } else {
    yield put(OrdDtlTranActions.ordDtlTranSearchFailure(response.data))
  }
}
export function* deleteOrdDtlTran(api, action) {
  const { ordDtlTranId } = action
  // make the call to the api
  const apiCall = call(api.deleteOrdDtlTran, ordDtlTranId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(OrdDtlTranActions.ordDtlTranDeleteSuccess())
  } else {
    yield put(OrdDtlTranActions.ordDtlTranDeleteFailure(response.data))
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
