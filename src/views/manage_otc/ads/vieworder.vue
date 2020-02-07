<template>
    <Card style="width:1000px;">
        <p slot="title">
            {{userName}} {{vm.$t('otc.xxddd')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Table :columns="columns1" :data="data1"></Table>
        <Page :current="curPage" :total="total" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import util from '../../../libs/util';
    import otcApi from '../../../api/otc';

    export default {
        props: ['adId', 'username', 'symbol'],
        data () {
            let vm = window.vm
            return {
                vm: vm,
                curPage: 1,
                total: 0,
                userName: this.username,
                columns1: [
                    {title: vm.$t('risk.ddh'), key: 'orderNumber'},
                    {
                        title: vm.$t('risk.ddzt'), key: 'state',
                        render: (h, params) => {
                            return h('div', this.switchStaus(params.row.state));
                        }
                    }, //1：交易中、2：已完成、3：已取消
                    {
                        title: vm.$t('risk.ddjg'), key: 'curPrice',
                        render: (h, params) => {
                            return h('div', [params.row.curPrice, 'CNY']);
                        }
                    },
                    {
                        title: vm.$t('common.sl'), key: 'symbolCount',
                        render: (h, params) => {
                            return h('div', [params.row.symbolCount, ' ', this.symbol]);
                        }
                    },
                    {
                        title: vm.$t('common.je'), key: 'currencyCount',
                        render: (h, params) => {
                            return h('div', [params.row.currencyCount, 'CNY']);
                        }
                    },
                    {
                        title: vm.$t('risk.fksysj'), key: 'surplus_Time', render: (h, params) => {
                            return h('div', [params.row.surplus_Time]);
                        }
                    },
                    {
                        title: vm.$t('risk.wcsj'), key: 'updatedTime', render: (h, params) => {
                            return h('div', params.row.state === 1 ? '----' : params.row.updatedTime);
                        }
                    }
                ],
                data1: []
            };
        },
        created () {
            this.getfindOrderInfoOtc();
        },
        methods: {
            switchStaus (state) {//1：交易中、2：已完成、3：已取消
                switch (state) {
                    case 1:
                        return this.vm.$t('otc.jyz');
                    case 2:
                        return this.vm.$t('common.ywc');
                    case 3:
                        return this.vm.$t('common.yqx');
                }
            },
            getfindOrderInfoOtc () {
                otcApi.findOrderInfoOtc(this.curPage, {
                    adId: this.adId
                }, (res, total) => {
                    res.forEach((item, index) => {
                        item.createTime = item.createdAt;
                        let date = util.formatDate(item.createTime).getTime();
                        let ndate = util.formatDate(item.nowTime).getTime();
                        var diffTime = Math.floor((ndate - date) / 1000);
                        var surplusTime = item.payApplyTime * 60 - diffTime;
                        util.countDown(surplusTime, (time) => {
                            item.surplus_Time = time;
                        });
                        item.surplus_Time = '00:00';
                    });
                    this.total = total;
                    this.data1 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getfindOrderInfoOtc();
            },
            closeDialog () {
                this.$emit('removeDialog');
            }
        }
    };
</script>

<style>

</style>
