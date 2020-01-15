<template>
    <Card>
        <p slot="title">
            {{$t('benchmark.jysjzj')}}
        </p>
        <p>{{$t('benchmark.jysid')}}
            <Input v-model="benchMarkingId" style="width: 200px"/>
            {{$t('common.bz')}}
            <Select v-model="symbol" style="width: 200px">
                <Option value="0">{{$t('common.qb')}}</Option>
                <Option v-for="item in symbolList" :value="item.symbol" :key="item.symbol">{{ item.symbol }}
                </Option>
            </Select>
            <Button @click="page = 1;getList()" type="primary">{{$t('common.cx')}}</Button>
            <Button @click="outExl()" type="primary">{{$t('systemlog.dc')}}</Button>
        </p>
        <Table :columns="columns" :data="data" style="margin-top: 20px"></Table>
        <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import benchmark from '../../api/benchmark';
    import currenyApi from '../../api/currency';
    import util from '../../libs/util';

    export default {
        name: 'flatCurrency',
        data () {
            return {
                benchMarkingId: null,
                symbol: null,
                data: [],
                page: 1,
                size: 10,
                total: 0,
                symbolList: [],
                outData: {},
                columns: [
                    {key: 'benchMarkingInfoId', title: 'ID'},
                    {key: 'benchMarkingId', title: this.$t('benchmark.jysid')},
                    {key: 'markingName', title: this.$t('benchmark.jzjysmc')},
                    {key: 'symbol', title: this.$t('common.bz')},
                    {key: 'price', title: this.$t('exchange.jg')},
                    {key: 'updatedAt', title: this.$t('common.gxsj')},
                    {key: 'waitTime', title: this.$t('benchmark.ddsj') + '(Min)'},
                ]
            };
        },
        created () {
            this.getList();
            this.getdataSymbol();
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolList = res;
                });
            },
            getList () {
                let data = {
                    page: this.page,
                    size: this.size,
                    symbol: this.symbol === '0' ? null : this.symbol,
                    benchMarkingId: this.benchMarkingId,
                };
                this.outData = data;
                benchmark.benchMarkInfoList(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage (e) {
                this.page = e;
                this.getList();
            },
            outExl () {
                util.outExl('api/bm/benchPrice/exportBenchMarkInfoList', this.outData);
            }
        }
    };
</script>

<style scoped>

</style>
