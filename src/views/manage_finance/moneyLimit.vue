<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.tbxe')}}</span>
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
                    <!-- <Option v-for="(data,i) in sumbolList" :value="data.name" :key="i">{{data.name}}</Option> -->
                    <Option v-for="(item,i) in symbolTypeList" :value="item.symbol" :key="i">{{item.symbol}}</Option>
                </Select>

                <span>{{$t('otc.kycjb')}}</span>
                <Select style="width:200px" v-model="form.kycLevel">
                    <Option value="5">{{$t('common.qb')}}</Option>
                    <Option value="0">0</Option>
                    <Option value="1">1</Option>
                    <Option value="2">2</Option>
                    <Option value="3">3</Option>
                </Select>

                <span>{{$t('nav.tbxe')}}</span>
                <Select style="width:200px" v-model="form.quotoFlag">
                    <Option value="0">{{$t('common.qb')}}</Option>
                    <Option value="1">{{$t('common.dyl')}}</Option>
                    <Option value="2">{{$t('finance.dylxys')}}</Option>
                    <Option value="3">{{$t('finance.dydysxyyb')}}</Option>
                    <Option value="4">{{$t('finance.dydyyb')}}</Option>
                </Select>

                <Button type="primary" @click="getList()">{{$t('common.cx')}}</Button>
            </p>
            <Table :columns="columns" :data="data" style="margin-top:10px;"></Table>
            <Page :current="page" :total="total" :page-size="size"
                  @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>

<script>
    import finance from '../../api/finance';
    import util from '../../libs/util';
    import dialog from './moneyLimit/dialog'
    import add from './moneyLimit/add'
    import currenyApi from '@/api/currency';

    export default {
        data() {
            return {
                form: {
                    username: null,
                    symbol: 0,
                    kycLevel: '5',
                    quotoFlag: '0',
                },
                size: 10,
                page: 1,
                total: 0,
                data: [],
                columns: [
                    {title: this.$t('system.yhid'), key: 'userId'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {title: this.$t('common.bz'), key: 'symbol'},
                    {title: this.$t('otc.kycjb'), key: 'kycLevel'},
                    {title: this.$t('nav.tbxe'), key: 'quoto'},
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
                                            let data = {
                                                id: params.row.id,
                                                username: params.row.username
                                            }
                                            finance.deleteWithdrawPermission(data,res=>{
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
                symbolTypeList: null,
                exlData: {}
            };
        },
        watch: {},
        created() {
            this.getdataSymbol();
            this.getList();
            this.getAll();
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolTypeList = res;
                });
            },
            getAll() {
                this.sumbolList = JSON.parse(window.localStorage.symbolTypes);
            },
            getList() {
                let data = {
                    page: this.page,
                    pageSize: this.size,
                    username: this.form.username,
                    kycLevel: this.form.kycLevel === '5' ? '' : this.form.kycLevel,
                    quotoFlag: this.form.quotoFlag === '0' ? '' : this.form.quotoFlag,
                    symbol: this.form.symbol === 0 ? '' : this.form.symbol,
                }
                this.exlData = data
                finance.listPageWithdrawPermission(data,(res, total) => {
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
                //GET /account/transfer/exportWithdrawPermissionExcel GET /account/transfer/exportWithdrawPermissionExcel
                util.outExl('api/bm/account/transfer/exportWithdrawPermissionExcel', this.exlData)
            }
        }
    };
</script>

<style scoped>

</style>
