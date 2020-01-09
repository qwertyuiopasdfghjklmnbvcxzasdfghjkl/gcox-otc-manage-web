<template>
    <Card style="width:800px;">
        <p slot="title">
            {{vm.$t('otc.zcxx')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div style="font-size:16px;">
            <Row>
                {{vm.$t('otc.xxdzcxx').format(this.username)}}
            </Row>
            <Row>
                {{vm.$t('otc.dqzgz')}}：{{this.btcPrice}}BTC/{{this.currencyPrice}}CNY
            </Row>
        </div>
        <Table :columns="columns" :data="datas"></Table>
        <Page :current="curPage" :total="total" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import util from '../../../libs/util';
    import otcApi from '../../../api/otc';

    export default {
        props: ['userId'],
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                curPage: 1,
                total: 0,
                columns: [
                    {title: vm.$t('common.bz'), key: 'accountName'},
                    {title: vm.$t('otc.ze'), key: 'totalBalance'},
                    {title: vm.$t('common.kyye'), key: 'availableBalance'},
                    {title: vm.$t('common.djje'), key: 'frozenBalance'}
                ],
                datas: [],
                username: '',
                btcPrice: null,
                currencyPrice: null
            };
        },
        created () {
            this.getfindAssetInfo();
        },
        methods: {
            getfindAssetInfo () {
                otcApi.findAssetInfoManage(this.curPage, {
                    userId: this.userId
                }, (res, total) => {
                    this.total = total;
                    this.username = res[0].userName;
                    this.datas = res[0].accountDTO;
                    this.btcPrice = res[0].btcPrice;
                    this.currencyPrice = res[0].currencyPrice;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getfindAssetInfo();
            },
            closeDialog () {
                this.$emit('removeDialog');
            }
        }
    };
</script>

<style lang="less">
</style>
