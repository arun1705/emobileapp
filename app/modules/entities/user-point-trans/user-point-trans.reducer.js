import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  userPointTranRequest: ['userPointTranId'],
  userPointTranAllRequest: ['options'],
  userPointTranUpdateRequest: ['userPointTran'],
  userPointTranSearchRequest: ['query'],
  userPointTranDeleteRequest: ['userPointTranId'],

  userPointTranSuccess: ['userPointTran'],
  userPointTranAllSuccess: ['userPointTrans'],
  userPointTranUpdateSuccess: ['userPointTran'],
  userPointTranSearchSuccess: ['userPointTrans'],
  userPointTranDeleteSuccess: [],

  userPointTranFailure: ['error'],
  userPointTranAllFailure: ['error'],
  userPointTranUpdateFailure: ['error'],
  userPointTranSearchFailure: ['error'],
  userPointTranDeleteFailure: ['error'],
})

export const UserPointTranTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  userPointTran: null,
  userPointTrans: [],
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
    userPointTran: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    userPointTrans: [],
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
  const { userPointTran } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    userPointTran,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { userPointTrans } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    userPointTrans,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { userPointTran } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    userPointTran,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { userPointTrans } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    userPointTrans,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    userPointTran: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    userPointTran: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    userPointTrans: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    userPointTran: state.userPointTran,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    userPointTran: state.userPointTran,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    userPointTrans: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.USER_POINT_TRAN_REQUEST]: request,
  [Types.USER_POINT_TRAN_ALL_REQUEST]: allRequest,
  [Types.USER_POINT_TRAN_UPDATE_REQUEST]: updateRequest,
  [Types.USER_POINT_TRAN_SEARCH_REQUEST]: searchRequest,
  [Types.USER_POINT_TRAN_DELETE_REQUEST]: deleteRequest,

  [Types.USER_POINT_TRAN_SUCCESS]: success,
  [Types.USER_POINT_TRAN_ALL_SUCCESS]: allSuccess,
  [Types.USER_POINT_TRAN_UPDATE_SUCCESS]: updateSuccess,
  [Types.USER_POINT_TRAN_SEARCH_SUCCESS]: searchSuccess,
  [Types.USER_POINT_TRAN_DELETE_SUCCESS]: deleteSuccess,

  [Types.USER_POINT_TRAN_FAILURE]: failure,
  [Types.USER_POINT_TRAN_ALL_FAILURE]: allFailure,
  [Types.USER_POINT_TRAN_UPDATE_FAILURE]: updateFailure,
  [Types.USER_POINT_TRAN_SEARCH_FAILURE]: searchFailure,
  [Types.USER_POINT_TRAN_DELETE_FAILURE]: deleteFailure,
})
