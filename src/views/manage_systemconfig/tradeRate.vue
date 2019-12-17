<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.otcjyfl')}}</span>
                <span>
                    <Button type="primary" @click="add">{{$t('common.tj')}}</Button>

                    <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
                </span>

            </p>
            <p>
                <span>{{$t('common.yhm')}}</span>
                <Input type="text" v-model="form.username"
                       style="width:200px"></Input>

                <span>{{$t('common.bz')}}</span>
                <Select style="width:200px" v-model="form.symbol">
                    <Option :value="0">{{$t('common.qb')}}</Option>
                    <Option v-for="(data,i) in sumbolList" :value="data.name" :key="i">{{data.name}}</Option>
                </Select>

                <span>{{$t('exchange.fx')}}</span>
                <Select style="width:200px" v-model="form.role">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option value="1">Taker</Option>
                    <Option value="2">Maker</Option>
                </Select>

                <span>{{$t('system.yhjbsfsx')}}</span>
                <Select style="width:200px" v-model="form.discountByGrade">
                    <Option value="3">{{$t('common.qb')}}</Option>
                    <Option value="1">{{$t('system.sx')}}</Option>
                    <Option value="0">{{$t('system.bsx')}}</Option>
                </Select>

                <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
            </p>
            <Table :columns="columns" :data="data" style="margin-top:10px;"></Table>
            <Page :current="page" :total="total" :page-size="size"
                  @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>

<script>
    import system from '../../api/systemparam';
    import util from '../../libs/util';
    import dialog from './trade-rate/dialog'
    import add from './trade-rate/add'

    export default {
        data() {
            return {
                form: {
                    username: null,
                    symbol: 0,
                    role: '0',
                    discountByGrade: '3',
                },
                size: 10,
                page: 1,
                total: 0,
                data: [],
                columns: [
                    {title: this.$t('system.yhid'), key: 'userId'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {title: this.$t('common.bz'), key: 'symbol'},
                    {title: this.$t('exchange.fx'),
                        render: (h, params)=>{
                            return h('div', params.row.role == 1 ? 'Taker' : 'Maker')
                        }},
                    {title: this.$t('system.yhjbsfsx'),
                        render: (h, params)=>{
                            return h('div', params.row.discountByGrade == 1 ? this.$t('system.sx') : this.$t('system.bsx'))
                        }},
                    {title: this.$t('system.fl'), key: 'rate'},
                    {title: this.$t('common.gxsj'), key: 'updatedAt'},
                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            util.setDialog(dialog, {
                                                item: params.row,
                                                okCallback: () => {
                                                    this.getList();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('common.xg')),
                                h('Button', {
                                    props: {
                                        type: 'warning',
                                        size: 'small',
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            let data= {
                                                role: params.row.role,
                                                userId: params.row.userId,
                                                symbol: params.row.symbol,
                                            }
                                            system.deleteOtcTransactionRate(data,res=>{
                                                this.getList();
                                                this.$Message.success({content: res})
                                            },msg=>{
                                                this.$Message.error({content: msg})
                                            })
                                        }
                                    }
                                }, this.$t('common.sc'))
                            ])
                        }
                    }
                ],
                sumbolList: [],
                outParams: {}
            };
        },
        watch: {},
        created() {
            this.getList();
            this.getAll();
        },
        methods: {
            getAll() {
                this.sumbolList = JSON.parse(window.localStorage.symbolTypes);
            },
            getList() {
                let data = {
                    page: this.page,
                    pageSize: this.size,
                    username: this.form.username,
                    role: this.form.role === '0' ? '' : this.form.role,
                    discountByGrade: this.form.discountByGrade === '3' ? '' : this.form.discountByGrade,
                    symbol: this.form.symbol === 0 ? '' : this.form.symbol,
                }
                this.outParams = data
                system.listPageOtcTransactionRate(data,(data, total) => {
                    this.data = data;
                    this.total = total;
                    console.log(this.data)
                }, (msg) => {
                    console.error(msg);
                });
            },
            add() {
                util.setDialog(add, {
                    okCallback: () => {
                        this.getList();
                    }
                });
            },
            changePage(page) {
                this.page = page
                this.getList()
            },
            output(){
                util.outExl('api/bm/sysParam/transactionSettings/exportOtcTransactionRate', this.outParams)
            }
        }
    };
</script>

<style scoped>

</style>
