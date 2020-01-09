<!-- 矿工费分发 -->
<template>
    <Card>
        <p slot="title">
            {{$t('nav.kgfff')}}
            <Button type="primary" @click="digList()">{{$t('exchange.ffjl')}}</Button>
        </p>
        <Row>
            <Col span="16">
                {{$t('common.yhm')}}
                <Input v-model="form.username" clearable style="width: 200px"
                       :placeholder="$t('common.qsr')"></Input>
                {{$t('common.bz')}}
                <Select v-model="form.symbol" style="width: 200px">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option v-for="item in symbolList" :value="item.symbol" :key="item.symbol">{{ item.symbol }}
                    </Option>
                </Select>
                {{$t('finance.cbdz')}}
                <Input v-model="form.address" clearable style="width: 200px"
                       :placeholder="$t('common.qsr')"></Input>
                <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
            </Col>
            <Col span="8" style="text-align: right">
                <Button type="primary" @click="outExl()">{{$t('systemlog.dc')}}</Button>
            </Col>
        </Row>
        <Table :columns="columns" :data="data" style="margin-top:20px;"></Table>
        <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import update from './minersFee/update';
    import list from './minersFee/list';
    import currenyApi from '../../api/currency';
    import util from '../../libs/util';

    export default {
        name: 'minersFee',
        data () {
            return {
                form: {
                    symbol: '0',
                    username: null,
                    address: null
                },
                page: 1,
                size: 10,
                total: 0,
                data: [{}],
                columns: [
                    {title: this.$t('system.yhid'), key: 'username'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {title: this.$t('common.bz'), key: 'symbol'},
                    {title: this.$t('finance.dzsl'), key: 'symbol'},
                    {title: this.$t('finance.cbdz'), key: 'symbol'},
                    {title: this.$t('common.gxsj'), key: 'symbol'},
                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            return h('Button', {
                                props: {
                                    type: 'primary',
                                    // disabled: params.row.symbol !== 'ETH'
                                },
                                on: {
                                    click: () => {
                                        util.setDialog(update, {
                                            item: params.row,
                                            okCallback: () => {
                                                this.getList();
                                            }
                                        });
                                    }
                                }
                            }, this.$t('finance.ffkgf'));
                        }
                    },
                ],
                symbolList: []
            };
        },
        created () {
            this.getList();
            this.getdataSymbol();
        },
        methods: {
            getList () {
            },
            changePage (e) {
                this.page = e;
                this.getList();
            },
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolList = res;
                });
            },
            digList () {
                util.setDialog(list);
            },
            outExl () {
            },
        }
    };
</script>

<style scoped>

</style>
