import { call, put } from 'redux-saga/effects'
import { push } from 'react-router-redux'

import LoginActions from './login.reducer'
import AccountActions from '../../shared/reducers/account.reducer'
import WebsocketService from '../../shared/websockets/websocket.service'

// attempts to login
export function* login(api, { username, password }) {
  const authObj = {
    username: username,
    password: password,
    rememberMe: true,
  }

  const response = yield call(api.login, authObj)

  // success?
  if (response.ok) {
    yield put(LoginActions.loginSuccess(response.data))
    yield put(AccountActions.accountRequest())
    WebsocketService.setToken(response.data.id_token)
    yield put(push('/next-page'));
    yield put({ type: 'RELOGIN_OK' })
    
  } else {
    yield put(LoginActions.loginFailure((response.data && response.data.detail) || 'Bad credentials'))
  }
}
// attempts to logout
export function* logout(api) {
  yield call(api.logout)
  yield put(AccountActions.accountRequest())
  yield put(LoginActions.logoutSuccess())
  yield put({ type: 'RELOGIN_ABORT' })
}
