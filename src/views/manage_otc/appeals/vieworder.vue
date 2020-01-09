<template>
  <Card style="width:1000px;">
        <p slot="title">
            {{vm.$t('otc.ckdd')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Table :columns="columns1" :data="data1"></Table>
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
                {title: vm.$t('otc.mjzh'), key: 'toUserName'},
                {title: vm.$t('otc.jyl'), key: 'symbolCount',
                    render: (h, params) => {
                        return h('div', [params.row.symbolCount, params.row.symbol]);
                    }
                },
                {title: vm.$t('otc.zfje'), key: 'currencyCount',
                    render: (h, params) => {
                        return h('div', [params.row.currencyCount, 'CNY']);
                    }
                },
                {title: vm.$t('otc.jyzt'), key: 'state',
                    // （1：交易中、2：已完成、3：已取消）
                     render: (h, params) => {
                        return h('div', this.switchStaus(params.row.state, params.row.payState))
                    }
                },
                {title: vm.$t('otc.jysx'), key: 'surplus_Time', render: (h, params) => {
                    return h('div', [params.row.surplus_Time] )
                }},
                {title: vm.$t('common.cz'), key: 'action', render: (h, params) => {
                    return h('div', [
                        h('Button', {
                            props: {type: 'primary', size: 'small'},
                            on: {
                                click: () => {
                                    util.setDialog(chatModel, {
                                        orderNumber: params.row.orderNumber,
                                        type: 'chat'
                                    });
                                }
                            }
                        }, vm.$t('otc.ltjl'))
                    ])
                }}
            ],
            data1: []
        }
    },
    created () {
        this.getOrderInfo()
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
        aaa (curPrice, symbolCount) {
            return (curPrice * symbolCount)
        },
        closeDialog () {
            this.$emit('removeDialog');
        },
        getOrderInfo () {
            otcApi.selectOneOrderInfo({
                msgNumber: this.msgNumber
            }, (res) => {
                res.createTime = res.createdAt
                let date = util.formatDate(res.createTime).getTime()
                let ndate = util.formatDate(res.nowTime).getTime()
                var diffTime = Math.floor((ndate - date) / 1000)
                var surplusTime = res.payApplyTime * 60 - diffTime
                util.countDown(surplusTime, (time) => {
                    res.surplus_Time = time
                })
                res.surplus_Time = '00:00'
                this.data1 = [res]
            })
        }
    }
}
</script>

<style>

</style>
