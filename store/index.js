import * as types from './mutation_types'

// state 는 return {} 이므로 아래와 같이 작성
export const state = () => ({
  isAuth: false,
  userInfo: {
    level: 2,
    username: 'username'
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

export const getters = {}

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

export const actions = {
  // LOGIN get cust_code, id, idx, mem_auth, mem_email, mem_name, mem_tel, pw
  LOGIN ({commit}, form) {
    return this.$axios.post(`/api/auth`, form)
      .then(({data}) => {
        if (data.length < 1) {
          console.log('no exist user')
          this.errState = '존재하지 않는 사용자 입니다'
        } else {
          commit('LOGIN', data)
          // return data // return 을 통해서 methods 에 data 값을 던져주기
        }
      })
      .catch(err => {
        console.log('error :', err)
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
  CHECKED_TICKET ({commit}) {
    // console.log('mamName :' + memName)
    // console.log('{memName} :' + {memName})
    console.log(this.state.userInfo.mem_name)
    return this.$axios.post(`/api/checkedticket`, {memName: this.state.userInfo.mem_name})
      .then(({data}) => {
        commit('CHECKED_TICKET', data)
        console.log('CHECKED_TICKET : ' + data)
      })
  }
}
