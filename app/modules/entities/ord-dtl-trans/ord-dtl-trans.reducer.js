import { createReducer, createActions } from 'reduxsauce'
import Immutable from 'seamless-immutable'

/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions({
  ordDtlTranRequest: ['ordDtlTranId'],
  ordDtlTranAllRequest: ['options'],
  ordDtlTranUpdateRequest: ['ordDtlTran'],
  ordDtlTranSearchRequest: ['query'],
  ordDtlTranDeleteRequest: ['ordDtlTranId'],

  ordDtlTranSuccess: ['ordDtlTran'],
  ordDtlTranAllSuccess: ['ordDtlTrans'],
  ordDtlTranUpdateSuccess: ['ordDtlTran'],
  ordDtlTranSearchSuccess: ['ordDtlTrans'],
  ordDtlTranDeleteSuccess: [],

  ordDtlTranFailure: ['error'],
  ordDtlTranAllFailure: ['error'],
  ordDtlTranUpdateFailure: ['error'],
  ordDtlTranSearchFailure: ['error'],
  ordDtlTranDeleteFailure: ['error'],
})

export const OrdDtlTranTypes = Types
export default Creators

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fetchingOne: null,
  fetchingAll: null,
  updating: null,
  searching: null,
  deleting: null,
  ordDtlTran: null,
  ordDtlTrans: [],
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
    ordDtlTran: null,
  })

// request the data from an api
export const allRequest = state =>
  state.merge({
    fetchingAll: true,
    ordDtlTrans: [],
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
  const { ordDtlTran } = action
  return state.merge({
    fetchingOne: false,
    errorOne: null,
    ordDtlTran,
  })
}
// successful api lookup for all entities
export const allSuccess = (state, action) => {
  const { ordDtlTrans } = action
  return state.merge({
    fetchingAll: false,
    errorAll: null,
    ordDtlTrans,
  })
}
// successful api update
export const updateSuccess = (state, action) => {
  const { ordDtlTran } = action
  return state.merge({
    updating: false,
    errorUpdating: null,
    ordDtlTran,
  })
}
// successful api search
export const searchSuccess = (state, action) => {
  const { ordDtlTrans } = action
  return state.merge({
    searching: false,
    errorSearching: null,
    ordDtlTrans,
  })
}
// successful api delete
export const deleteSuccess = state => {
  return state.merge({
    deleting: false,
    errorDeleting: null,
    ordDtlTran: null,
  })
}

// Something went wrong fetching a single entity.
export const failure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingOne: false,
    errorOne: error,
    ordDtlTran: null,
  })
}
// Something went wrong fetching all entities.
export const allFailure = (state, action) => {
  const { error } = action
  return state.merge({
    fetchingAll: false,
    errorAll: error,
    ordDtlTrans: [],
  })
}
// Something went wrong updating.
export const updateFailure = (state, action) => {
  const { error } = action
  return state.merge({
    updating: false,
    errorUpdating: error,
    ordDtlTran: state.ordDtlTran,
  })
}
// Something went wrong deleting.
export const deleteFailure = (state, action) => {
  const { error } = action
  return state.merge({
    deleting: false,
    errorDeleting: error,
    ordDtlTran: state.ordDtlTran,
  })
}
// Something went wrong searching the entities.
export const searchFailure = (state, action) => {
  const { error } = action
  return state.merge({
    searching: false,
    errorSearching: error,
    ordDtlTrans: [],
  })
}

/* ------------- Hookup Reducers To Types ------------- */

export const reducer = createReducer(INITIAL_STATE, {
  [Types.ORD_DTL_TRAN_REQUEST]: request,
  [Types.ORD_DTL_TRAN_ALL_REQUEST]: allRequest,
  [Types.ORD_DTL_TRAN_UPDATE_REQUEST]: updateRequest,
  [Types.ORD_DTL_TRAN_SEARCH_REQUEST]: searchRequest,
  [Types.ORD_DTL_TRAN_DELETE_REQUEST]: deleteRequest,

  [Types.ORD_DTL_TRAN_SUCCESS]: success,
  [Types.ORD_DTL_TRAN_ALL_SUCCESS]: allSuccess,
  [Types.ORD_DTL_TRAN_UPDATE_SUCCESS]: updateSuccess,
  [Types.ORD_DTL_TRAN_SEARCH_SUCCESS]: searchSuccess,
  [Types.ORD_DTL_TRAN_DELETE_SUCCESS]: deleteSuccess,

  [Types.ORD_DTL_TRAN_FAILURE]: failure,
  [Types.ORD_DTL_TRAN_ALL_FAILURE]: allFailure,
  [Types.ORD_DTL_TRAN_UPDATE_FAILURE]: updateFailure,
  [Types.ORD_DTL_TRAN_SEARCH_FAILURE]: searchFailure,
  [Types.ORD_DTL_TRAN_DELETE_FAILURE]: deleteFailure,
})
