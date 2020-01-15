<template>
    <Card>
        <p slot="title">
            {{$t('benchmark.jzjys')}}
        </p>
        <Table :columns="columns" :data="data" style="margin-top: 20px"></Table>
    </Card>
</template>

<script>
    import benchmark from '../../api/benchmark';
    export default {
        name: 'benchmarkExchange',
        data () {
            return {
                data: [],
                columns: [
                    {key: 'benchMarkingId', title: 'ID'},
                    {key: 'markingName', title: this.$t('exchange.mc')},
                ]
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList () {
                let data = {};
                benchmark.benchMarkingList(data, (res, total) => {
                    this.data = res;
                });
            },
        }
    };
</script>

<style scoped>

</style>
