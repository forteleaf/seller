import * as types from './mutation_types'

// state 는 return {} 이므로 아래와 같이 작성
export const state = () => ({
  isAuth: false,
  userInfo: {
    // cust_code: '1003',
    // id: 'heyri001',
    // idx: 20,
    // mem_auth: '1003',
    // mem_email: 'galleryfocus@naver.com',
    // mem_name: '93뮤지엄',
    // mem_tel: '031-948-6677',
    // pw: '0319'
  },
  tickets: []
})

export const getters = {
  memName: (state) => {
    return state.userInfo.mem_name
  }
}

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
    state.userInfo = data.data
    this.$router.push(`/checkedticket`)
  },
  [types.LOGOUT] (state) {
    delete state.userInfo
    state.isAuth = false
  },
  [types.CHECK_PHONE_NUMBER] (state, data) {
    state.tickets = data
  },
  [types.CHECKED_TICKET] (state, data) {
    if (!data) data = []
    state.tickets = data
  },
  [types.ERROR_STATE] (state, msg) {
    state.errorMsg = msg
  }
}

export const actions = {
  // LOGIN get cust_code, id, idx, mem_auth, mem_email, mem_name, mem_tel, pw
  async LOGIN ({commit}, {username, password}) {
    // console.log({username, password})
    return await this.$axios.post(`/api/auth`, {username, password})
      .then(({data}) => {
        if (data.result === 'valid') {
          commit('LOGIN', data)
        } else {
          commit('ERROR_STATE', '유요한 사용자가 아닙니다.')
        }
      })
      .catch(err => {
        if (err.response && err.reponse.status === 401) {
          throw new Error('Bad credentials')
        }
        this.errorMsg = err
        throw err
      })
  },
  LOGOUT ({commit}) {
    commit('LOGOUT')
    this.$router.push('/')
  },
  // Procedure up_Select_TicketCheck
  // @cust_code, @date1, @date2, @ord_tel, @cust_name, @cocd, @itemCheck
  CHECK_PHONE_NUMBER ({commit}, {custCode, date1, date2, ordTel, custName, cocd}) {
    return this.$axios.post(`/api/checknumber`, {custCode, date1, date2, ordTel, custName, cocd})
      .then(({data}) => {
        commit('CHECK_PHONE_NUMBER')
        console.log('CHECK_PHONE_NUMBER was ' + data)
      })
  },
  // CHECKED_TICKET show used tickets when LOGIN
  // @mem_name is 사용자계정
  async CHECKED_TICKET ({commit}, {memName, startDate, endDate}) {
    // console.log('memName :' + memName)
    // console.log('{memName} :' + {memName})
    return await this.$axios.post(`/api/ticket/checked`, {memName, startDate, endDate})
      .then(({data}) => {
        commit('CHECKED_TICKET', data.data)
      })
  }
}
