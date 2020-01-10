<template>
    <Card style="width:1200px;">
        <p slot="title">
            <span style="margin-right:20px;">{{vm.$t('otc.jyxx')}}</span>
            <span style="font-weight:normal;">{{vm.$t('otc.gyhywc')}} {{this.exchangeTotal !== null ? this.exchangeTotal : 0}} ，
                {{vm.$t('otc.hpl')}} {{this.praiseRate !== null ? this.praiseRate : 100}}%</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>

        </p>
        <Tabs>
            <TabPane :label="vm.$t('otc.ddxx')">
                <Table :columns="columns1" :data="datas1"></Table>
                <Page :current="curPage" :total="total" @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
            </TabPane>
            <TabPane :label="vm.$t('otc.ggxx')">
                <Table :columns="columns2" :data="datas2"></Table>
                <Page :current="curPage2" :total="total2" @on-change="changePage2" style="text-align:center;margin-top:20px;"></Page>
            </TabPane>
        </Tabs>
    </Card>
</template>

<script>
import util from '../../../libs/util';
import qs from 'qs';
import otcApi from '../../../api/otc'
export default {
    props: ['userId'],
    data () {
        const vm = window.vm
        return {
            vm: vm,
            curPage: 1,
            total: 0,
            curPage2: 1,
            total2: 0,
            columns1: [
                {title: vm.$t('risk.ddh'), key: 'orderNum'},
                {title: vm.$t('finance.lx'), key: 'exchangeType', render: (h, params) => {
                    return h('div', [params.row.exchangeType === 1 ? vm.$t('otc.gm') : vm.$t('otc.cs')]);
                }},
                {title: vm.$t('common.zt'), key: 'state',
                    render: (h, params) => {
                        return h('div', this.switchStaus(params.row.state, params.row.payState));
                    }
                },
                {title: vm.$t('common.bz'), key: 'symbol'},
                {title: vm.$t('otc.dj'), key: 'unitPrice',
                    render: (h, params) => {
                        return h('div', [params.row.unitPrice, params.row.currency])
                    }
                },
                {title: vm.$t('common.sl'), key: 'symbolCount',
                    render: (h, params) => {
                        return h('div', [params.row.symbolCount, params.row.symbol])
                    }
                },

                {title: vm.$t('common.je'), key: 'currencyCount',
                    render: (h, params) => {
                        return h('div', [params.row.currencyCount, params.row.currency])
                    }
                },
                {title: vm.$t('otc.xdsj'), key: 'createdTime'}
            ],
            datas1: [],
            columns2: [
                {title: vm.$t('otc.fbz'), key: 'username'},
                {title: vm.$t('finance.lx'), key: 'adType', render: (h, params) => { //1：购买、2：出售
                    return h('div', [params.row.adType === '1' ? vm.$t('otc.gm') : vm.$t('otc.cs')]);
                }},
                {title: vm.$t('common.bz'), key: 'symbol', render: (h, params) => {
                    var row = params.row;
                    return h('div', [row.symbol === 1 ? row.currency : row.symbol]);
                }},
                {title: vm.$t('otc.zsl'), key: 'symbolCount',
                    render: (h, params) => {
                        return h('div', [params.row.symbolCount, params.row.symbol])
                    }
                },
                {title: vm.$t('otc.ye'), key: 'remainCount',
                    render: (h, params) => {
                        return h('div', [params.row.remainCount, params.row.symbol])
                    }
                },
                {title: vm.$t('otc.yj'), key: 'priceRate',
                    render: (h, params) => {
                        return h('div', [params.row.priceRate, '%'])
                    }
                },
                {title: vm.$t('otc.zgdjsj'), key: 'acceptPrice',
                    render: (h, params) => {
                        return h('div', [params.row.acceptPrice, params.row.currency])
                    }
                },
                {title: vm.$t('otc.xe'), key: 'minAmount', render: (h, params) => {
                    return h('div', [params.row.minAmount, params.row.currency, ' - ', params.row.maxAmount, params.row.currency]);
                }},
                {title: vm.$t('operation.fbsj'), key: 'createdAt'}
            ],
            datas2: [],
            exchangeTotal: null,
            praiseRate: null
        };
    },
    created () {
        this.getfindAdInfo()
        this.getfindOrderInfo()
    },
    methods: {
        switchStaus(state, payState) {
            switch(state){
                case 1:
                    return payState === 1 ? this.vm.$t('otc.yfk') : this.vm.$t('otc.wfk')
                    break;
                case 2:
                    return this.vm.$t('common.ywc')
                    break;
                case 3:
                    return this.vm.$t('common.yqx')
                    break;
            }
        },
        getfindAdInfo () {
            otcApi.findAdInfoManage(this.curPage2, {
                userId: this.userId
            }, (res, total) => {
                if (res.length !== 0) {
                   this.total2 = total
                   this.datas2 = res[0].adInfoDTOS
                }
            })
        },
        changePage2 (page) {
            this.curPage2 = page
            this.getfindAdInfo()
        },
        getfindOrderInfo () {
            otcApi.findOrderInfoManage(this.curPage, {
                userId: this.userId
            }, (res, total) => {
                 if (res.length !== 0) {
                    this.praiseRate = res[0].praiseRate
                    this.exchangeTotal = res[0].exchangeTotal
                    this.total = total
                    this.datas1 = res[0].orderInfoDTOS
                 }
            })
        },
        changePage (page) {
            this.curPage = page
            this.getfindOrderInfo()
        },
        closeDialog () {
          this.$emit('removeDialog');
        }
    }
};
</script>

<style lang="less" scoped>

</style>
