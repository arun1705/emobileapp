import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  orderPickUpRequest: ['orderPickUpId'],
  orderPickUpAllRequest: ['options'],
  orderPickUpUpdateRequest: ['orderPickUp'],
  orderPickUpSearchRequest: ['query'],
  orderPickUpDeleteRequest: ['orderPickUpId'],

  orderPickUpSuccess: ['orderPickUp'],
  orderPickUpAllSuccess: ['orderPickUps'],
  orderPickUpUpdateSuccess: ['orderPickUp'],
  orderPickUpSearchSuccess: ['orderPickUps'],
  orderPickUpDeleteSuccess: [],

  orderPickUpFailure: ['error'],
  orderPickUpAllFailure: ['error'],
  orderPickUpUpdateFailure: ['error'],
  orderPickUpSearchFailure: ['error'],
  orderPickUpDeleteFailure: ['error'],
})

export const OrderPickUpTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  orderPickUp: null,
  orderPickUps: [],
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
    orderPickUp: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    orderPickUps: [],
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
  const { orderPickUp } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    orderPickUp,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { orderPickUps } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    orderPickUps,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { orderPickUp } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    orderPickUp,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { orderPickUps } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    orderPickUps,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    orderPickUp: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    orderPickUp: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    orderPickUps: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    orderPickUp: state.orderPickUp,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    orderPickUp: state.orderPickUp,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    orderPickUps: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORDER_PICK_UP_REQUEST]: request,
  [Types.ORDER_PICK_UP_ALL_REQUEST]: allRequest,
  [Types.ORDER_PICK_UP_UPDATE_REQUEST]: updateRequest,
  [Types.ORDER_PICK_UP_SEARCH_REQUEST]: searchRequest,
  [Types.ORDER_PICK_UP_DELETE_REQUEST]: deleteRequest,

  [Types.ORDER_PICK_UP_SUCCESS]: success,
  [Types.ORDER_PICK_UP_ALL_SUCCESS]: allSuccess,
  [Types.ORDER_PICK_UP_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORDER_PICK_UP_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORDER_PICK_UP_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORDER_PICK_UP_FAILURE]: failure,
  [Types.ORDER_PICK_UP_ALL_FAILURE]: allFailure,
  [Types.ORDER_PICK_UP_UPDATE_FAILURE]: updateFailure,
  [Types.ORDER_PICK_UP_SEARCH_FAILURE]: searchFailure,
  [Types.ORDER_PICK_UP_DELETE_FAILURE]: deleteFailure,
})
