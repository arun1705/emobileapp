import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderRequestRequest: ['orderRequestId'],
  orderRequestAllRequest: ['options'],
  orderRequestUpdateRequest: ['orderRequest'],
  orderRequestSearchRequest: ['query'],
  orderRequestDeleteRequest: ['orderRequestId'],

  orderRequestSuccess: ['orderRequest'],
  orderRequestAllSuccess: ['orderRequests'],
  orderRequestUpdateSuccess: ['orderRequest'],
  orderRequestSearchSuccess: ['orderRequests'],
  orderRequestDeleteSuccess: [],

  orderRequestFailure: ['error'],
  orderRequestAllFailure: ['error'],
  orderRequestUpdateFailure: ['error'],
  orderRequestSearchFailure: ['error'],
  orderRequestDeleteFailure: ['error'],
})

export const OrderRequestTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  orderRequest: null,
  orderRequests: [],
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
    orderRequest: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    orderRequests: [],
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
  const { orderRequest } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderRequest,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderRequests } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderRequests,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { orderRequest } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    orderRequest,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { orderRequests } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    orderRequests,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderRequest: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderRequest: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderRequests: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    orderRequest: state.orderRequest,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderRequest: state.orderRequest,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    orderRequests: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_REQUEST_REQUEST]: request,
  [Types.ORDER_REQUEST_ALL_REQUEST]: allRequest,
  [Types.ORDER_REQUEST_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_REQUEST_SEARCH_REQUEST]: searchRequest,
  [Types.ORDER_REQUEST_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_REQUEST_SUCCESS]: success,
  [Types.ORDER_REQUEST_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_REQUEST_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_REQUEST_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORDER_REQUEST_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_REQUEST_FAILURE]: failure,
  [Types.ORDER_REQUEST_ALL_FAILURE]: allFailure,
  [Types.ORDER_REQUEST_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_REQUEST_SEARCH_FAILURE]: searchFailure,
  [Types.ORDER_REQUEST_DELETE_FAILURE]: deleteFailure,
})
