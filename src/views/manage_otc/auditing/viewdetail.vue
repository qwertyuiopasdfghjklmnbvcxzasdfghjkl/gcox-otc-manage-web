<template>
  <Card class="manage_otc_auditing_info" style="width:1200px;">
      <p slot="title">
          {{vm.$t('kyc.ckxq')}}
          <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
      </p>
      <Row class="manage_otc_auditing_info_row" type="flex">
          <div class="manage_otc_auditing_info_row_title">{{vm.$t('otc.ssr')}}</div>
          <div class="manage_otc_auditing_info_row_name" style="width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
              {{vm.$t('common.xm')}}：{{this.data2.userRealName === null ? this.data2.username : this.data2.userRealName}}
          </div>
          <div class="manage_otc_auditing_info_row_email">
              {{vm.$t('common.zh')}}：{{this.data2.username || 0}}
          </div>
          <div>
              {{vm.$t('common.dh')}}：{{this.data2.mobile || '--'}}
          </div>
      </Row>
      <Row class="manage_otc_auditing_info_row" type="flex">
          <div class="manage_otc_auditing_info_row_title">{{vm.$t('otc.bssr')}}</div>
          <div class="manage_otc_auditing_info_row_name" style="width:250px;overflow: hidden;text-overflow:ellipsis;white-space: nowrap;">
              {{vm.$t('common.xm')}}：{{this.data1.userRealName  === null ? this.data1.username : this.data1.userRealName}}
          </div>
          <div class="manage_otc_auditing_info_row_email">
              {{vm.$t('common.zh')}}：{{this.data1.username || 0}}
          </div>
          <div>
              {{vm.$t('common.dh')}}：{{this.data1.mobile || '--'}}
          </div>
      </Row>
      <Table :columns="columns1" :data="datas" style="margin:20px;"></Table>
  </Card>
</template>

<script>
import util from '../../../libs/util';
import chatModel from '../orders/chatModel';
import otcApi from '../../../api/otc'
export default {
    props: ['msgNumber'],
    data () {
        const vm = window.vm;
        return {
            vm: vm,
            columns1: [
                {title: vm.$t('risk.ddh'), key: 'orderNumber'},
                {title: vm.$t('otc.maijzh'), key: 'fromUserName'},
                {title: vm.$t('otc.jyl'), key: 'currencyCount',
                    render: (h, params) => {
                        return h('div', [params.row.symbolCount, params.row.symbol])
                    }
                },
                {title: vm.$t('otc.zfje'), key: 'currencyCount',
                    render: (h, params) => {
                        return h('div', [params.row.currencyCount, 'CNY'])
                    }
                },
                {title: vm.$t('otc.jyzt'), key: 'state',
                    render: (h, params) => {
                        return h('div',  this.switchStaus(params.row.state, params.row.payState))
                    }
                },
                {title: vm.$t('otc.jysx'), key: 'payApplyTime',
                    render: (h, params) => {
                        return h('div', [params.row.payApplyTime, vm.$t('system.fz')])
                    }
                },
                {title: vm.$t('common.cz'), key: 'action', render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {type: 'primary', size: 'small'},
                            on: {
                                click: () => {
                                    util.setDialog(chatModel, {
                                        orderNumber: params.row.orderNumber
                                    });
                                }
                            }
                        }, vm.$t('otc.ltjl'))
                    ])
                }}
            ],
            datas: [],
            data1: [],
            data2: []
        }
    },
    created () {
        this.geOneOrderInfo()
    },
    methods: {
        switchStaus(state, payState) {
            switch(state, payState){
                case 1:
                    return payState === 1 ? this.vm.$t('otc.yfk') : this.vm.$t('otc.wfk')
                case 2:
                    return this.vm.$t('common.ywc')
                case 3:
                    return this.vm.$t('common.yqx')
            }
        },
        closeDialog () {
            this.$emit('removeDialog');
        },
        geOneOrderInfo () {
            otcApi.selectUserAndOrderInfoOtc({
                msgNumber: this.msgNumber
            }, (res) => {
                if (![res.userInfo.oppositeUser] ) {
                    return
                }
                this.datas  = [res.orderInfo]
                this.data1 = [res.userInfo.oppositeUser][0]
                this.data2 = [res.userInfo.user][0]
            })
        }
    }
}
</script>

<style lang="less">
.manage_otc_auditing_info .ivu-card-body{padding:0px;}
.manage_otc_auditing_info_row{height:60px;line-height:60px;font-size:20px;border-bottom:1px #ccc solid;}
.manage_otc_auditing_info_row_title{width:150px;text-align:center;border-right:1px solid #ccc;}
.manage_otc_auditing_info_row_name{width:220px;padding-left:4px;}
.manage_otc_auditing_info_row_email{width:450px;white-space: nowrap;text-overflow: ellipsis;overflow: hidden;display: inline-block}
</style>
