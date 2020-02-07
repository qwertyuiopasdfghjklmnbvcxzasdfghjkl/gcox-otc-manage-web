<template>
    <div class="operation_placard">
        <Card>
            <p slot="title">{{$t('nav.tjzbgl')}}</p>
            <Row>
                <Col span="16">
                    {{$t('report.tjzb')}}
                    <Input v-model="form.statisticItem" clearable style="width: 200px"
                           :placeholder="$t('common.qsr')"></Input>
                    {{$t('report.sfpc')}}
                    <Select v-model="form.excludeSpecialUsers" style="width: 200px">
                        <Option :value="2">{{$t('common.qb')}}</Option>
                        <Option :value="1">{{$t('report.pc')}}</Option>
                        <Option :value="0">{{$t('report.bpc')}}</Option>
                    </Select>
                    {{$t('common.zt')}}
                    <Select v-model="form.status" style="width: 200px">
                        <Option :value="2">{{$t('common.qb')}}</Option>
                        <Option :value="0">{{$t('exchange.kq')}}</Option>
                        <Option :value="1">{{$t('exchange.gb')}}</Option>
                    </Select>
                    <Button type="primary" @click="curPage=1;getList()">{{$t('common.cx')}}</Button>
                </Col>
                <Col span="8" style="text-align: right">
                    <Button type="primary" @click="addMarket">{{$t('common.xz')}}</Button>
                </Col>
            </Row>
            <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
            <Page :current="curPage" :total="total" @on-change="changePage"
                  style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>
<script>

    import reportApi from '../../api/report';
    import util from '../../libs/util';
    import add from './statistics/add';
    import updata from './statistics/updata';

    export default {
        data () {
            return {
                curPage: 1,
                size: 10,
                total: 0,
                form: {
                    statisticItem: null,
                    excludeSpecialUsers: 2,
                    status: 2,
                },
                columns1: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: this.$t('report.tjzb'),
                        key: 'statisticItem',
                    },
                    {
                        title: this.$t('report.zbms'),
                        key: 'itemDesc'
                    },
                    {
                        title: this.$t('report.csy'),
                        key: 'param1'
                    },
                    {
                        title: this.$t('report.sfpctszh'),
                        key: 'excludeSpecialUsers',
                        render: (h, params) => {
                            return h('div', {
                                    style: {
                                        color: params.row.excludeSpecialUsers === 0 ? '' : '#1ac27f'
                                    }},
                                params.row.excludeSpecialUsers === 0 ? this.$t('common.f') : this.$t('common.s')
                            );
                        }
                    },
                    {
                        title: this.$t('report.px'),
                        key: 'orderNo'
                    },
                    {
                        title: this.$t('common.zt'),
                        render: (h, params) => {
                            return h('div', {
                                style: {
                                    color: params.row.status === 1 ? '' : '#1ac27f'
                                }},
                                params.row.status === 0 ? this.$t('exchange.kq') : this.$t('exchange.gb')
                            );
                        }
                    },
                    {
                        title: this.$t('common.gxsj'),
                        key: 'updatedTime'
                    },
                    {
                        title: this.$t('common.cz'),
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {margin: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(updata, {
                                                item: params.row,
                                                okCallback: () => {
                                                    this.getList();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('common.xg')),
                            ]);
                        }
                    }
                ],
                data1: []
            };
        },
        created () {
            this.getList();
        },
        methods: {
            addMarket () {
                util.setDialog(add, {
                    okCallback: () => {
                        this.getList();
                    }
                });
            },
            getList () {
                let data = {
                    size: this.size,
                    page: this.curPage,
                    status: this.form.status === 2 ? null : this.form.status,
                    excludeSpecialUsers: this.form.excludeSpecialUsers === 2 ? null : this.form.excludeSpecialUsers,
                    statisticItem: this.form.statisticItem,
                };
                reportApi.selectDailyStatistic(data, (res,total) => {
                    this.data1 = res;
                    this.total = total;
                });
            },
            changePage (e) {
                this.curPage = e;
                this.getList();
            }
        }
    };
</script>

