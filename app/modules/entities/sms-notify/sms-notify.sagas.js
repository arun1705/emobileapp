import { call, put } from 'redux-saga/effects'
import { callApi } from '../../../shared/sagas/call-api.saga'
import SMSNotifyActions from './sms-notify.reducer'

export function* getSMSNotify(api, action) {
  const { smsNotifyId } = action
  // make the call to the api
  const apiCall = call(api.getSMSNotify, smsNotifyId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(SMSNotifyActions.smsNotifySuccess(response.data))
  } else {
    yield put(SMSNotifyActions.smsNotifyFailure(response.data))
  }
}

export function* getSMSNotifies(api, action) {
  const { options } = action
  // make the call to the api
  const apiCall = call(api.getSMSNotifies, options)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(SMSNotifyActions.smsNotifyAllSuccess(response.data))
  } else {
    yield put(SMSNotifyActions.smsNotifyAllFailure(response.data))
  }
}

export function* updateSMSNotify(api, action) {
  const { smsNotify } = action
  // make the call to the api
  const idIsNotNull = !!smsNotify.id
  const apiCall = call(idIsNotNull ? api.updateSMSNotify : api.createSMSNotify, smsNotify)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(SMSNotifyActions.smsNotifyUpdateSuccess(response.data))
  } else {
    yield put(SMSNotifyActions.smsNotifyUpdateFailure(response.data))
  }
}

export function* searchSMSNotifies(api, action) {
  const { query } = action
  // make the call to the api
  const apiCall = call(api.searchSMSNotifies, query)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(SMSNotifyActions.smsNotifySearchSuccess(response.data))
  } else {
    yield put(SMSNotifyActions.smsNotifySearchFailure(response.data))
  }
}
export function* deleteSMSNotify(api, action) {
  const { smsNotifyId } = action
  // make the call to the api
  const apiCall = call(api.deleteSMSNotify, smsNotifyId)
  const response = yield call(callApi, apiCall)

  // success?
  if (response.ok) {
    yield put(SMSNotifyActions.smsNotifyDeleteSuccess())
  } else {
    yield put(SMSNotifyActions.smsNotifyDeleteFailure(response.data))
  }
}
