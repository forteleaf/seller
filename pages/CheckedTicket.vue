<template>
<div>
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

  <v-content text-md-center grid-list-md>
    <v-data-table
    :headers="headers"
    :items="items"
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
</div>
</template>
<script>

export default {
  layout:'vuetify',
  name: 'checkedticket',
  data () {
    return {
      timeout: 333,
      loading: false,
      ord_tel: '',
      dialog: false,
      user: null,
      msg: '',
      headers: [
        { text: "주문번호", value: 'ord_no', align: 'center'},
        { text: "예약번호", value: 'ord_tel', align: 'center'},
        { text: "사용체크", value: 'item_CheckDate', align: 'center'}
      ],
      items: [
        {
          "idx": 3591,
          "ord_no": 20170401123800,
          "item_code": 1059,
          "item_Qty": 2,
          "item_Cost": 10000,
          "Item_DcPrice": 18000,
          "Item_Price": 18000,
          "item_Vat": 0,
          "item_Total": 18000,
          "item_Rate": 0.1,
          "item_CheckDate": "2017-04-21 오후 2:32:49",
          "item_RcpPrice": 14000,
          "ord_tel": '1234'
        },
        {
          "idx": 3592,
          "ord_no": 20170401123904,
          "item_code": 1004,
          "item_Qty": 2,
          "item_Cost": 7000,
          "Item_DcPrice": 14000,
          "Item_Price": 14000,
          "item_Vat": 0,
          "item_Total": 14000,
          "item_Rate": 0,
          "item_CheckDate": "",
          "item_RcpPrice": 11200,
          "ord_tel": '333'
        },
        {
          "idx": 3593,
          "ord_no": 20170401124047,
          "item_code": 1002,
          "item_Qty": 3,
          "item_Cost": 8000,
          "Item_DcPrice": 24000,
          "Item_Price": 21818,
          "item_Vat": 2182,
          "item_Total": 24000,
          "item_Rate": 0,
          "item_CheckDate": "dd",
          "item_RcpPrice": 14400,
          "ord_tel": '1234'
        },
        {
          "idx": 3594,
          "ord_no": 20170401124135,
          "item_code": 1004,
          "item_Qty": 2,
          "item_Cost": 7000,
          "Item_DcPrice": 12200,
          "Item_Price": 12200,
          "item_Vat": 0,
          "item_Total": 12200,
          "item_Rate": 0.12,
          "item_CheckDate": "",
          "item_RcpPrice": 7600,
          "ord_tel": '010-1234-5895'
        },
        {
          "idx": 3595,
          "ord_no": 20170401124135,
          "item_code": 1073,
          "item_Qty": 2,
          "item_Cost": 12000,
          "Item_DcPrice": 21000,
          "Item_Price": 19091,
          "item_Vat": 1909,
          "item_Total": 21000,
          "item_Rate": 0.12,
          "item_CheckDate": "",
          "item_RcpPrice": 16800
        },
        {
          "idx": 3596,
          "ord_no": 20170401124135,
          "item_code": 1090,
          "item_Qty": 1,
          "item_Cost": 19800,
          "Item_DcPrice": 17000,
          "Item_Price": 15455,
          "item_Vat": 1545,
          "item_Total": 17000,
          "item_Rate": 0.12,
          "item_CheckDate": "",
          "item_RcpPrice": 15400
        },
        {
          "idx": 3598,
          "ord_no": 20170401124940,
          "item_code": 1009,
          "item_Qty": 4,
          "item_Cost": 7000,
          "Item_DcPrice": 28000,
          "Item_Price": 25455,
          "item_Vat": 2545,
          "item_Total": 28000,
          "item_Rate": 0,
          "item_CheckDate": "",
          "item_RcpPrice": 22000
        }
      ]
    }
  },
  methods: {
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
    }
  },
  created () {},
  mounted () {
    // show all what checked ticket list.
    this.$store.dispatch('CHECKED_TICKET')
      .then(data => {
        this.data = data
      })
      .catch(({message}) => this.msg = message)
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
