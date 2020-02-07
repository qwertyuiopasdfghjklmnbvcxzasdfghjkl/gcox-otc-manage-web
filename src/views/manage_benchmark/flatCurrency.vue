<template>
    <Card>
        <p slot="title">
            {{$t('benchmark.fbhllq')}}
        </p>
        <p>{{$t('benchmark.bdfb')}}
            <Input v-model="symbol" style="width: 200px"/>
            <Button @click="getList()" type="primary">{{$t('common.cx')}}</Button>
            <Button @click="outExl()" type="primary">{{$t('systemlog.dc')}}</Button>
        </p>
        <Table :columns="columns" :data="data" style="margin-top: 20px"></Table>
    </Card>
</template>

<script>
    import benchmark from '../../api/benchmark';
    import util from '../../libs/util';

    export default {
        name: 'flatCurrency',
        data () {
            return {
                symbol: null,
                data: [],
                columns: [
                    {key: 'rateId', title: 'ID'},
                    {key: 'symbol', title: this.$t('benchmark.bdfb')},
                    {key: 'currency', title: this.$t('benchmark.jzfb')},
                    {key: 'quote', title: this.$t('benchmark.hl')},
                    {key: 'updatedAt', title: this.$t('benchmark.zxgxsj')},
                    {key: 'waitTime', title: this.$t('benchmark.ddsj') + '(Min)'},
                ]
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList () {
                let data = {
                    symbol: this.symbol
                };
                benchmark.symbolCurrencyRateList(data, (res, total) => {
                    this.data = res;
                });
            },
            outExl () {
                let data = this.symbol ? {symbol:this.symbol} : null;
                util.outExl('api/bm/benchPrice/exportRateList', data);
            }
        }
    };
</script>

<style scoped>

</style>
