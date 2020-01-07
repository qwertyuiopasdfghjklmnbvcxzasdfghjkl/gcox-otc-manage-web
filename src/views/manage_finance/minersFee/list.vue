<template>
    <Card style="width: 900px">
        <p slot="title">
            {{vm.$t('exchange.ffjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Row>
            <Col span="16">
                {{vm.$t('common.yhm')}}
                <Input v-model="form.username" clearable style="width: 200px"
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
    export default {
        name: 'list',
        data () {
            let vm = window.vm;
            return {
                vm: vm,
                form: {
                    username: null
                },
                page: 1,
                size: 10,
                total: 0,
                data: [],
                columns: [
                    {title: vm.$t('common.cjsj'), key: 'username'},
                    {title: vm.$t('common.yhm'), key: 'username'},
                    {title: vm.$t('common.bzdh'), key: 'symbol'},
                    {title: vm.$t('common.sl'), key: 'symbol'},
                    {title: 'Txid', key: 'symbol'},
                    {title: vm.$t('common.zt'), key: 'symbol'},
                    {title: vm.$t('finance.czr'), key: 'symbol'}
                ]
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList () {
            },
            outExl () {
            },
            changePage (e) {
                this.page = e;
                this.getList();
            },
            closeDialog () {
                this.$emit('removeDialog');
            }
        }
    };
</script>

<style scoped>

</style>
