import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderDocRequest: ['orderDocId'],
  orderDocAllRequest: ['options'],
  orderDocUpdateRequest: ['orderDoc'],
  orderDocSearchRequest: ['query'],
  orderDocDeleteRequest: ['orderDocId'],

  orderDocSuccess: ['orderDoc'],
  orderDocAllSuccess: ['orderDocs'],
  orderDocUpdateSuccess: ['orderDoc'],
  orderDocSearchSuccess: ['orderDocs'],
  orderDocDeleteSuccess: [],

  orderDocFailure: ['error'],
  orderDocAllFailure: ['error'],
  orderDocUpdateFailure: ['error'],
  orderDocSearchFailure: ['error'],
  orderDocDeleteFailure: ['error'],
})

export const OrderDocTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  orderDoc: null,
  orderDocs: [],
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
    orderDoc: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    orderDocs: [],
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
  const { orderDoc } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderDoc,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderDocs } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderDocs,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { orderDoc } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    orderDoc,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { orderDocs } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    orderDocs,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderDoc: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderDoc: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderDocs: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    orderDoc: state.orderDoc,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderDoc: state.orderDoc,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    orderDocs: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_DOC_REQUEST]: request,
  [Types.ORDER_DOC_ALL_REQUEST]: allRequest,
  [Types.ORDER_DOC_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_DOC_SEARCH_REQUEST]: searchRequest,
  [Types.ORDER_DOC_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_DOC_SUCCESS]: success,
  [Types.ORDER_DOC_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_DOC_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_DOC_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORDER_DOC_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_DOC_FAILURE]: failure,
  [Types.ORDER_DOC_ALL_FAILURE]: allFailure,
  [Types.ORDER_DOC_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_DOC_SEARCH_FAILURE]: searchFailure,
  [Types.ORDER_DOC_DELETE_FAILURE]: deleteFailure,
})
