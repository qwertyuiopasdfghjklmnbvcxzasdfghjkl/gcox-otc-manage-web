<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.qxgl')}}</span>
                <span>
                    <Button type="primary" @click="add">{{$t('common.tj')}}</Button>

                    <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
                </span>

            </p>
            <p>
                <span>{{$t('common.yhm')}}</span>
                <Input type="text" v-model="form.userName"
                       style="width:200px"></Input>

                <span>Taker/Maker</span>
                <Select style="width:200px" v-model="form.roleName">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option value="Taker">Taker</Option>
                    <Option value="Maker">Maker</Option>
                </Select>

                <span>{{$t('otc.mmfx')}}</span>
                <Select style="width:200px" v-model="form.direction">
                    <Option value="3">{{$t('common.qb')}}</Option>
                    <Option value="1">{{$t('exchange.m1')}}</Option>
                    <Option value="0">{{$t('exchange.m4')}}</Option>
                </Select>

                <span>{{$t('otc.kycjb')}}</span>
                <Select style="width:200px" v-model="form.kycLevel">
                    <Option value="5">{{$t('common.qb')}}</Option>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>

                <span>{{$t('nav.qxgl')}}</span>
                <Select style="width:200px" v-model="form.permission">
                    <Option value="3">{{$t('common.qb')}}</Option>
                    <Option value="1">{{$t('exchange.zc')}}</Option>
                    <Option value="0">{{$t('exchange.dj')}}</Option>
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
    import otc from '../../api/otc';
    import util from '../../libs/util';
    import dialog from './deal/dialog'
    import add from './deal/add'

    export default {
        data() {
            return {
                form: {
                    userName: null,
                    roleName: '0',
                    direction: '3',
                    kycLevel: '5',
                    permission: '3'
                },
                size: 10,
                page: 1,
                total: 0,
                data: [],
                columns: [
                    {title: this.$t('system.yhid'), key: 'userId'},
                    {title: this.$t('common.yhm'), key: 'userName'},

                    {title: 'Taker/Maker',
                        render: (h, params)=>{
                            return h('div', params.row.roleName)
                        }},
                    {title: this.$t('otc.kycjb'), key: 'kycLevel'},

                    {title: this.$t('otc.mmfx'),
                        render: (h, params)=>{
                            return h('div',
                                {
                                  style: {
                                      color: params.row.direction == 1 ? 'green': 'blue'
                                  }
                                }, params.row.direction == 1 ?
                                this.$t('exchange.m1') : this.$t('exchange.m4'))
                        }},
                    {title: this.$t('nav.qxgl'),
                        render: (h, params)=>{
                            return h('div', {
                                style: {
                                    color: params.row.permission == 1 ? '#333': 'red'
                                }
                            },params.row.permission == 1 ?
                                this.$t('exchange.zc') : this.$t('exchange.dj'))
                        }},
                    {title: this.$t('common.gxsj'), key: 'updateAt'},
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
                                            let data = {
                                                tradePermissionId: params.row.tradePermissionId,
                                                userId: params.row.userId
                                            }
                                            otc.deleteOtcTradePermission(data, res=>{
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
                exlData: {}
            };
        },
        watch: {},
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let data = {
                    page: this.page,
                    pageSize: this.size,
                    userName: this.form.userName,
                    roleName: this.form.roleName === '0' ? '' : this.form.roleName,
                    direction: this.form.direction === '3' ? '' : this.form.direction,
                    kycLevel: this.form.kycLevel === '5' ? '' : this.form.kycLevel,
                    permission: this.form.permission === '3' ? '' : this.form.permission,
                }
                otc.listPageOtcTradePermission(data,(res, total) => {
                    this.exlData = data;
                    this.data = res;
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
                // 导出交易权限报表
                util.outExl('api/bm/otcManage/otcTradePermission/exportOtcTradePermissionExcel', this.exlData)
            }
        }
    };
</script>

<style scoped>

</style>
