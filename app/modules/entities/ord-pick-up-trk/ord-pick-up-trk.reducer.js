import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordPickUpTrkRequest: ['ordPickUpTrkId'],
  ordPickUpTrkAllRequest: ['options'],
  ordPickUpTrkUpdateRequest: ['ordPickUpTrk'],
  ordPickUpTrkSearchRequest: ['query'],
  ordPickUpTrkDeleteRequest: ['ordPickUpTrkId'],

  ordPickUpTrkSuccess: ['ordPickUpTrk'],
  ordPickUpTrkAllSuccess: ['ordPickUpTrks'],
  ordPickUpTrkUpdateSuccess: ['ordPickUpTrk'],
  ordPickUpTrkSearchSuccess: ['ordPickUpTrks'],
  ordPickUpTrkDeleteSuccess: [],

  ordPickUpTrkFailure: ['error'],
  ordPickUpTrkAllFailure: ['error'],
  ordPickUpTrkUpdateFailure: ['error'],
  ordPickUpTrkSearchFailure: ['error'],
  ordPickUpTrkDeleteFailure: ['error'],
})

export const OrdPickUpTrkTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  ordPickUpTrk: null,
  ordPickUpTrks: [],
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
    ordPickUpTrk: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    ordPickUpTrks: [],
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
  const { ordPickUpTrk } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    ordPickUpTrk,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { ordPickUpTrks } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    ordPickUpTrks,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { ordPickUpTrk } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    ordPickUpTrk,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { ordPickUpTrks } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    ordPickUpTrks,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    ordPickUpTrk: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    ordPickUpTrk: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    ordPickUpTrks: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    ordPickUpTrk: state.ordPickUpTrk,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    ordPickUpTrk: state.ordPickUpTrk,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    ordPickUpTrks: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORD_PICK_UP_TRK_REQUEST]: request,
  [Types.ORD_PICK_UP_TRK_ALL_REQUEST]: allRequest,
  [Types.ORD_PICK_UP_TRK_UPDATE_REQUEST]: updateRequest,
  [Types.ORD_PICK_UP_TRK_SEARCH_REQUEST]: searchRequest,
  [Types.ORD_PICK_UP_TRK_DELETE_REQUEST]: deleteRequest,

  [Types.ORD_PICK_UP_TRK_SUCCESS]: success,
  [Types.ORD_PICK_UP_TRK_ALL_SUCCESS]: allSuccess,
  [Types.ORD_PICK_UP_TRK_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORD_PICK_UP_TRK_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORD_PICK_UP_TRK_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORD_PICK_UP_TRK_FAILURE]: failure,
  [Types.ORD_PICK_UP_TRK_ALL_FAILURE]: allFailure,
  [Types.ORD_PICK_UP_TRK_UPDATE_FAILURE]: updateFailure,
  [Types.ORD_PICK_UP_TRK_SEARCH_FAILURE]: searchFailure,
  [Types.ORD_PICK_UP_TRK_DELETE_FAILURE]: deleteFailure,
})
