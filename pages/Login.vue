<template>
<v-container fuild>
  <v-layout row wrap>
    <v-flex xs12 class="text-xs-center" mt-5>
      <h1>로그인</h1>
    </v-flex>
    <v-flex class="text-xs-center">
      RMS에 등록 되어있는 계정을 입력해 주세요.
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3 class="text-xs-center">
      <v-form v-model="valid" ref="form" action="#">
        <v-text-field label="사용자명" name="username" v-model="username" :rules="rules.name" required></v-text-field>
        <v-text-field label="비밀번호" name="password" v-model="password" :rules="rules.pass" required></v-text-field>
        <v-checkbox
          label="로그인 기억하기"
          v-model="checkbox"
        ></v-checkbox>
        <v-btn class="success" @click="login" :disabled="!valid">로그인</v-btn>
      </v-form>
    </v-flex>
    <v-flex xs12 sm6 offset-sm3 mt-3>
      <v-alert
        :value="alert"
        type="error"
      >
        유요한 사용자가 아닙니다.
      </v-alert>
      <div> {{username}} // {{password}} // msg : {{msg}} // data: {{data}} // errorMsg: {{errorMsg}}</div>
    </v-flex>
  </v-layout>
  
</v-container>

</template>
<script>
export default {
    layout: 'vuetify',
    data () {
      return {
        valid: false,
        alert: false,
        checkbox: false,
        username: '',
        password: '',
        msg: '',
        errorMsg: '',
        data: '',
        rules: {
          name: [ v => !!v || '이름을 입력하세요' ],
          pass: [ v => !!v || '암호을 입력하세요' ]
        }
      }
    },
    created() {
      // 로그인 되어 있으면 바로 매표확인 페이지로
      if (this.$store.state.isAuth) this.$router.push(`/checkedticket`)
    },
    mounted() {
      // console.log(localStorage.getItem('userInfo'))
      // this.$store.state.userInfo = localStorage.getItem('userInfo')
      // let localUser = JSON.parse(localStorage.getItem('userInfo'))
      // console.log(this.localUser)
      // 테스트를 위한 자동 로그인 기능
      this.username = 'heyri001',
      this.password = '0319'
    },
    methods: {
      // Todo: 로그인 버튼을 마구누르면 로그인 되는 현상
      async login () {
        if (this.$refs.form.validate()) {
          }
        await this.$store.dispatch('LOGIN', {username: this.username, password: this.password})
          .then( data => {
            if (data != undefined) {
              this.alert = true
            }else {
              this.data = data
            }
          })
          .catch(({message}) => this.errorMsg = message)
      },
      redirect() {
        const {search} = window.location
        console.log({search}, window.location)
        const tokens = search.replace(/^\?/, '').split('&')

        const {returnPath} = tokens.reduce((qs, tkn) => {
          const pair = tkn.split('=')
          qs[pair[0]] = decodeURIComponent(pair[1])
          return qs
        }, {})
        this.$router.push(returnPath)
      },
      loginFailed () {
        this.error = 'Login failed!'
        delete localStorage.token
      }
    }
  }
</script>
e