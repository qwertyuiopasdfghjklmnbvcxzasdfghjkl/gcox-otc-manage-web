<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.khhgl')}}</span>
                <span>
                    <Button type="primary" @click="add">{{$t('common.tj')}}</Button>
                </span>

            </p>
            <p>
                <span>{{$t('otc.khhmc')}}</span>
                <Input type="text" v-model="form.userName"
                       style="width:200px"></Input>

                <span>{{$t('otc.fb')}}</span>
                <Select style="width:200px" v-model="form.roleName">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option value="Taker">Taker</Option>
                    <Option value="Maker">Maker</Option>
                </Select>

                <span>{{$t('common.zt')}}</span>
                <Select style="width:200px" v-model="form.permission">
                    <Option value="3">{{$t('common.qb')}}</Option>
                    <Option value="1">{{$t('system.sx')}}</Option>
                    <Option value="0">{{$t('system.bsx')}}</Option>
                </Select>

                <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
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
    import updata from './bank/updata';
    import add from './bank/add';

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
                    {title: 'ID', key: 'userId'},
                    {title: this.$t('otc.khhmc'), key: 'userName'},
                    {title: this.$t('otc.dyfb'), key: 'kycLevel'},
                    {title: this.$t('otc.xh'), key: 'kycLevel'},
                    {title: this.$t('common.zt'),
                        render: (h, params)=>{
                            return h('div',
                                {
                                    style: {
                                        color: params.row.direction == 1 ? 'green': 'blue'
                                    }
                                }, params.row.direction == 1 ?
                                    this.$t('exchange.m1') : this.$t('exchange.m4'))
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
                                            util.setDialog(updata, {
                                                item: params.row,
                                                okCallback: () => {
                                                    this.getList();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('common.xg'))
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
