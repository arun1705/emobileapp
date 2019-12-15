import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  smsNotifyRequest: ['smsNotifyId'],
  smsNotifyAllRequest: ['options'],
  smsNotifyUpdateRequest: ['smsNotify'],
  smsNotifySearchRequest: ['query'],
  smsNotifyDeleteRequest: ['smsNotifyId'],

  smsNotifySuccess: ['smsNotify'],
  smsNotifyAllSuccess: ['smsNotifies'],
  smsNotifyUpdateSuccess: ['smsNotify'],
  smsNotifySearchSuccess: ['smsNotifies'],
  smsNotifyDeleteSuccess: [],

  smsNotifyFailure: ['error'],
  smsNotifyAllFailure: ['error'],
  smsNotifyUpdateFailure: ['error'],
  smsNotifySearchFailure: ['error'],
  smsNotifyDeleteFailure: ['error'],
})

export const SMSNotifyTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  smsNotify: null,
  smsNotifies: [],
  errorOne: null,
  errorAll: null,
  errorUpdating: null,
  errorSearching: null,
  errorDeleting: null,
})

/* ------------- Reducers ------------- */

// request the data from an api
export const request = state =>
  state.merge({
    fetchingOne: true,
    smsNotify: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    smsNotifies: [],
  })

// request to update from an api
export const updateRequest = state =>
  state.merge({
    updating: true,
  })
// request to search from an api
export const searchRequest = state =>
  state.merge({
    searching: true,
  })
// request to delete from an api
export const deleteRequest = state =>
  state.merge({
    deleting: true,
  })

// successful api lookup for single entity
export const success = (state, action) => {
  const { smsNotify } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    smsNotify,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { smsNotifies } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    smsNotifies,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { smsNotify } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    smsNotify,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { smsNotifies } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    smsNotifies,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    smsNotify: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    smsNotify: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    smsNotifies: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    smsNotify: state.smsNotify,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    smsNotify: state.smsNotify,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    smsNotifies: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.SMS_NOTIFY_REQUEST]: request,
  [Types.SMS_NOTIFY_ALL_REQUEST]: allRequest,
  [Types.SMS_NOTIFY_UPDATE_REQUEST]: updateRequest,
  [Types.SMS_NOTIFY_SEARCH_REQUEST]: searchRequest,
  [Types.SMS_NOTIFY_DELETE_REQUEST]: deleteRequest,

  [Types.SMS_NOTIFY_SUCCESS]: success,
  [Types.SMS_NOTIFY_ALL_SUCCESS]: allSuccess,
  [Types.SMS_NOTIFY_UPDATE_SUCCESS]: updateSuccess,
  [Types.SMS_NOTIFY_SEARCH_SUCCESS]: searchSuccess,
  [Types.SMS_NOTIFY_DELETE_SUCCESS]: deleteSuccess,

  [Types.SMS_NOTIFY_FAILURE]: failure,
  [Types.SMS_NOTIFY_ALL_FAILURE]: allFailure,
  [Types.SMS_NOTIFY_UPDATE_FAILURE]: updateFailure,
  [Types.SMS_NOTIFY_SEARCH_FAILURE]: searchFailure,
  [Types.SMS_NOTIFY_DELETE_FAILURE]: deleteFailure,
})
