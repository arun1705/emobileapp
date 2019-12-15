import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderDetailRequest: ['orderDetailId'],
  orderDetailAllRequest: ['options'],
  orderDetailUpdateRequest: ['orderDetail'],
  orderDetailSearchRequest: ['query'],
  orderDetailDeleteRequest: ['orderDetailId'],

  orderDetailSuccess: ['orderDetail'],
  orderDetailAllSuccess: ['orderDetails'],
  orderDetailUpdateSuccess: ['orderDetail'],
  orderDetailSearchSuccess: ['orderDetails'],
  orderDetailDeleteSuccess: [],

  orderDetailFailure: ['error'],
  orderDetailAllFailure: ['error'],
  orderDetailUpdateFailure: ['error'],
  orderDetailSearchFailure: ['error'],
  orderDetailDeleteFailure: ['error'],
})

export const OrderDetailTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  orderDetail: null,
  orderDetails: [],
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
    orderDetail: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    orderDetails: [],
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
  const { orderDetail } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderDetail,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderDetails } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderDetails,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { orderDetail } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    orderDetail,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { orderDetails } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    orderDetails,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderDetail: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderDetail: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderDetails: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    orderDetail: state.orderDetail,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderDetail: state.orderDetail,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    orderDetails: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_DETAIL_REQUEST]: request,
  [Types.ORDER_DETAIL_ALL_REQUEST]: allRequest,
  [Types.ORDER_DETAIL_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_DETAIL_SEARCH_REQUEST]: searchRequest,
  [Types.ORDER_DETAIL_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_DETAIL_SUCCESS]: success,
  [Types.ORDER_DETAIL_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_DETAIL_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_DETAIL_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORDER_DETAIL_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_DETAIL_FAILURE]: failure,
  [Types.ORDER_DETAIL_ALL_FAILURE]: allFailure,
  [Types.ORDER_DETAIL_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_DETAIL_SEARCH_FAILURE]: searchFailure,
  [Types.ORDER_DETAIL_DELETE_FAILURE]: deleteFailure,
})
