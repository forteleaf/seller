import * as types from './mutation_types'

// state 는 return {} 이므로 아래와 같이 작성
export const state = () => ({
  isAuth: false,
  userInfo: {
    level: 2,
    username: 'username',
    cust_code: '1003',
    id: 'heyri001',
    idx: 20,
    mem_auth: '1003',
    mem_email: 'galleryfocus@naver.com',
    mem_name: '93뮤지엄',
    mem_tel: '031-948-6677',
    pw: '0319'
  },
  tickets: []
})

export const mutations = {
  [types.UID] (state, uid) {
    state.uid = uid
  },
  [types.ERROR_STATE] (state, errorState) {
    state.errorState = errorState
  },
  [types.IS_AUTH] (state, isAuth) {
    state.isAuth = isAuth
  },
  [types.LOGIN] (state, data) {
    state.isAuth = true
    localStorage.setItem('userInfo', data)
    state.userInfo = data
  },
  [types.LOGOUT] (state) {
    delete state.userInfo
    localStorage.removeItem('userInfo')
    state.isAuth = false
  },
  [types.CHECK_PHONE_NUMBER] (state, data) {
    state.tickets = data
  },
  [types.CHECKED_TICKET] (state, data) {
    state.tickets = data
  }
}
