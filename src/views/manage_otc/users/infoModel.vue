<template>
    <Card style="width:500px;">
        <p slot="title">
          用户信息
          <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form style="margin:0 20px;">
            <FormItem label="邮箱:">{{data.email || '--'}}</FormItem>
            <FormItem label="昵称:">{{data.nickName || '--'}}</FormItem>
            <FormItem label="手机号:">{{data.mobile || '--'}}</FormItem>
            <FormItem label="国家:">{{data.cn || '--'}}</FormItem>
            <FormItem label="证件ID:">{{data.verifyIdCard || '--'}}</FormItem>
        </Form>
        <!--<Form label-position="top" style="margin:0 20px;">-->
            <!--<FormItem label="1.">-->
              <!--<span>{{data.cardBank || '&#45;&#45;'}}</span>-->
              <!--<span style="margin-left:20px">{{data.cardName || '&#45;&#45;'}}</span>-->
              <!--<span style="margin-left:20px">卡号：{{data.cardNumber || '&#45;&#45;'}}</span>-->
            <!--</FormItem>-->
        <!--</Form>-->
        <div>
            <p>银行卡支付</p>
            <table width="100%" border="0">
                <tr v-for="item in data.bankList">
                    <td height="40">{{item.cardBank}}</td>
                    <td>{{item.cardName}}</td>
                    <td>{{item.cardNumber}}</td>
                </tr>
            </table>
        </div>
    </Card>
</template>

<script>
import util from '../../../libs/util';
import qs from 'qs';
import otcApi from '../../../api/otc'
export default {
  props: ['userId'],
  data () {
    return {
      data: {},
      imgData: []
    }
  },
  created () {
      this.getfindUserInfo()
  },
  methods: {
    getfindUserInfo () {
        otcApi.findUserInfoManage({
            userId: this.userId
        },(res) => {
            this.data = res
        })
    },
    // getUserInfo (id) {
    //   util.ajax.get(`api/v1/manage/otc/customer/userInfo/${id}`).then((res)=> {
    //     if (res.data && res.data.rst === 1) {
    //         var data = res.data.data;
    //         this.data = data
    //     } else if (res.data && res.data.rst !== 1) {
    //         var msgs = res.data.msg;
    //         this.$Message.error(typeof msgs === 'string' ? msgs : msgs[0]);
    //     } else {
    //         this.$Message.error('其他错误');
    //         window.console.log(error);
    //     }
    //   })
    // },
    // downImage (type, userId) {
    //   util.ajax.post(`api/v1/manage/otc/download/${type}`, qs.stringify({
    //     user_id: userId
    //   })).then((res)=> {
    //     if (res.data && res.data.rst === 1) {
    //         var data = res.data.data;
    //     } else if (res.data && res.data.rst !== 1) {
    //         var msgs = res.data.msg;
    //         this.$Message.error(typeof msgs === 'string' ? msgs : msgs[0]);
    //     } else {
    //         this.$Message.error('其他错误');
    //         window.console.log(error);
    //     }
    //   })
    // },
    closeDialog () {
      this.$emit('removeDialog');
    }
  }
}
</script>

<style>

</style>
