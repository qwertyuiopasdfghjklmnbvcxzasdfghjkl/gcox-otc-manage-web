<template>
    <Card style="width: 900px">
        <p slot="title">
            {{vm.$t('exchange.ffjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Row>
            <Col span="16">
                {{vm.$t('common.dz')}}
                <Input v-model="form.address" clearable style="width: 200px"
                       :placeholder="vm.$t('common.qsr')"></Input>
                <Button type="primary" @click="page=1;getList()">{{vm.$t('common.cx')}}</Button>
            </Col>
            <Col span="8" style="text-align: right">
                <Button type="primary" @click="outExl()">{{vm.$t('systemlog.dc')}}</Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="data" style="margin-top:20px;"></Table>
        <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import otcApi from '../../../api/otc';
    import util from '../../../libs/util';

    export default {
        name: 'list',
        data () {
            let vm = window.vm;
            return {
                vm: vm,
                form: {
                    address: null
                },
                page: 1,
                size: 10,
                total: 0,
                data: [],
                columns: [
                    {title: vm.$t('common.cjsj'), key: 'createAt'},
                    {title: vm.$t('common.dz'), key: 'toAddress'},
                    {title: vm.$t('common.bzdh'), key: 'symbol'},
                    {title: vm.$t('common.sl'), key: 'amount'},
                    {title: 'Txid', key: 'txId'},
                    {
                        title: vm.$t('common.zt'), render: (h, pamars) => {
                            return h('div', {}, this.states(pamars.row.status));
                        }
                    },
                    {title: vm.$t('finance.czr'), key: 'adminName'}
                ],
                outData: {}
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList () {
                let data = {
                    size: this.size,
                    page: this.page,
                };
                if (this.form.address) {
                    data.address = 'address=' + this.form.address;
                }
                this.outData = data;
                otcApi.selectDistributeRecordList(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                }, msg => {
                });
            },
            outExl () {
                util.outExl('api/bm/minerFee/distribute/exportDistributeRecordExcel', this.outData);
            },
            changePage (e) {
                this.page = e;
                this.getList();
            },
            closeDialog () {
                this.$emit('removeDialog');
            },
            states (i) {
                let data = {
                    1: this.vm.$t('risk.wcl'),
                    2: this.vm.$t('finance.ddjyfq'),
                    3: this.vm.$t('finance.jyyfs'),
                    4: this.vm.$t('finance.cx'),
                    5: this.vm.$t('finance.txsb'),
                    6: this.vm.$t('monitoring.dzwc'),
                    7: this.vm.$t('finance.txsbzjfh'),
                };
                console.log(i);
                return data[i];
            }
        }
    };
</script>

<style scoped>

</style>
