<template>
<div>
  <v-tabs
    dark
    color="aqua"
    v-model="currentTab"
    align-with-title
    class="elevation-1"
  >
    <v-tabs-slider color="yellow"></v-tabs-slider>
    <v-tab
      v-for="i in page.pageLastDay"
      :href="'#tab-'+i"
      :key="i"
      @click="changeDate(i)"
      target="뭐지"
    >
      {{ i }}일
    </v-tab>
  </v-tabs>
  <v-layout 
    v-touch="{
      left: () => swipeDay('left'),
      right: () => swipeDay('right')
    }"
    column fill-height
  >

  <v-container text-md-center grid-list-md>
      <v-form>
        <v-layout row wrap align-center>
          <v-flex offset-xs1 xs6>
            <v-text-field
            v-model.number="ord_tel"
            label="예약번호"
            hint="전화번호 뒤 4자리"
            persistent-hint
            >
            </v-text-field>
          </v-flex>
          <v-flex xs5>
            <v-btn color="info" @click="checkNumber(ord_tel)">확인</v-btn>
          </v-flex>
        </v-layout>
      </v-form>
  </v-container>
  <v-content text-md-center grid-list-md v-cloak>
    <v-data-table
    :headers="headers"
    :items="$store.state.tickets"
    hide-actions
    class="elevation-1"
    item-key="idx"
    :loading="loading"
    :search="ord_tel"
    >
      <template slot="items" slot-scope="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.ord_no }}</td>
          <td>{{ props.item.ord_tel }}</td>
          <td class="justify-center layout px-0">
            <v-dialog v-if="!props.item.item_CheckDate" v-model="dialog">
              <v-btn color="success" dark slot="activator">사용체크</v-btn>
              <v-card>
                <v-card-title class="headline"> 티켓 사용 확인 </v-card-title>
                <v-card-text> 주문번호 {{props.item.ord_no}} 가 확실합니까</v-card-text>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="green darken-1" flat @click.native="submitTicketUse(props.item)">예</v-btn>
                  <v-btn color="red darken-1" flat @click.native="dialog = false">아니오</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <!-- <v-btn v-if="!props.item.item_CheckDate" @click.stop="submitTicketUse(props.item)" color="success">사용체크</v-btn> -->
            <v-btn v-else color="indigo" outline disabled>완료</v-btn>
          </td>
        </tr>
      </template>
      <!-- 클릭시에 자세한 정보 나옴 -->
      <template slot="expand" slot-scope="props">
        <v-card flat>
          {{ props.item.item_CheckDate }}
          <v-card-text>Peek-a-boo!</v-card-text>
        </v-card>
      </template>
      <template slot="no-data">
        <v-alert :value="true" color="error" icon="warning">
          데이터가 없습니다.
        </v-alert>
      </template>
    </v-data-table>
  </v-content>
  <v-content>
    msg : {{msg}} <br>
    day : {{todayStart}}<br>
    day : {{todayEnd}}
  </v-content>
  </v-layout>
</div>
</template>
<script>

export default {
  layout:'vuetify',
  name: 'checkedticket',
  middleware: 'auth',
  data () {
    return {
      currentTab: 'tab-',
      page: {
        day: this.$moment(),
        page: this.$moment().date(),
        pageLastDay: this.$moment().date(0).date()
      },
      timeout: 333,
      loading: false,
      ord_tel: '',
      dialog: false,
      msg: '',
      headers: [
        { text: "주문번호", value: 'ord_no', align: 'center'},
        { text: "예약번호", value: 'ord_tel', align: 'center'},
        { text: "사용체크", value: 'item_CheckDate', align: 'center'}
      ]
    }
  },
  methods: {
    // swipeDay is change previous day or next day
    swipeDay (stat) {
      if ( stat == 'left'){
        this.page.day = this.page.day.add(1,'d')
        this.changeDate(this.page.day.date())
      }
      if ( stat == 'right'){
        this.page.day = this.page.day.subtract(1,'d')
        this.changeDate(this.page.day.date())
      }
      this.$nextTick(() => {this.currentTab = 'tab-'+this.page.page })
    },
    // 전화번호를 입력해서 구매한 사람 내역을 확인
    checkNumber (number) {
      if (this.$refs.form.validate()) {
        this.$store.dispatch('CHECK_PHONE_NUMBER', {ord_tel})
          .then( data => {
            this.data = data
          })
          .catch(({message}) => this.msg = message)
        }
    },
    // submitTicketUse is 티켓 사용 체크
    submitTicketUse (item) {
      this.dialog = false
      console.log('prop.name : '+ item )
    },
    // changeDate reload ticket when click
    changeDate(item){
      this.loading = true
      this.page.day = this.$moment().date(item)
      this.page.page = item
    
      this.$store.dispatch('CHECKED_TICKET',{
        memName: this.$store.getters.memName,
        startDate: this.$moment().date(item).format('YYYY-MM-DD'),
        endDate: this.$moment().date(item).format('YYYY-MM-DD')
      }).then(
        this.loading = false,
      ).catch(({message}) => this.msg = message)
    }
  },
  mounted () {
    this.currentTab = 'tab-'+this.page.page
    // show all what checked ticket list.
    // console.log(this.$store.getters.memName)
    this.$store.dispatch('CHECKED_TICKET',{
      memName: this.$store.getters.memName,
      startDate: this.page.day.format('YYYY-MM-DD'),
      endDate: this.page.day.format('YYYY-MM-DD')
    }).catch(({message}) => this.msg = message)
  },
  computed: {
    // change date format to checkdate in sql.
    // 2018-04-13 오후 4:54:17
    // 방문시간을 표시할때 필요 item_CheckDate from tbl_OrderDtl
    changeCheckDate(day) {
      // 2018-04-13 오후 4:54:17
      return day => this.$moment().format('YYYY-MM-DD a h:mm:ss')
    },
    todayStart() {
      // 2018-06-19
      return this.$moment().format('YYYY-MM-DD')
    },
    todayEnd() {
      return this.$moment().format('YYYY-MM-DD')
    }
  }
}
</script>
