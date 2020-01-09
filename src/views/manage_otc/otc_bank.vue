<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.khhgk')}}</span>
                <span>
                    <Button type="primary" @click="add">{{$t('common.tj')}}</Button>

                    <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
                </span>

            </p>
            <p>
                <span>{{$t('otc.khhmc')}}</span>
                <Input type="text" v-model="form.bankName" style="width:150px"></Input>

                <span>{{$t('otc.fb')}}</span>
                <Input type="text" v-model="form.currency" style="width:150px"></Input>

                <span>{{$t('common.zt')}}</span>
                <Select style="width:100px" v-model="form.state">
                    <Option value="">{{$t('common.qb')}}</Option>
                    <Option :value="1">{{this.$t('system.sx')}}</Option>
                    <Option :value="2">{{this.$t('system.bsx')}}</Option>
                </Select>

                <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
            </p>
            <Table ref="tables" :columns="columns" :data="data" style="margin-top:10px;"></Table>
            <Page :current="page" :total="total" :page-size="size"
                  @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>

<script>
    import otcApi from '../../api/otc';
    import util from '../../libs/util';
    import add from './bank/add'

    export default {
        data() {
            return {
                form: {
                    bankName:null,
                    currency:null,
                    state:null
                },
                size: 10,
                size1: 10000,
                page: 1,
                total: 0,
                data: [],
                columns: [
                    {title: 'ID', key: 'bankId'},
                    {title: this.$t('otc.khhmc'), key: 'bankName'},
                    {title: this.$t('otc.dyfb'), key: 'currency'},
                    {title: this.$t('otc.xh'), key: 'orderSort'},
                    {title: this.$t('common.zt'), key: 'state',
                        render: (h, params)=>{
                            return h('div',
                                {
                                  style: {
                                      color: params.row.state == 1 ? 'green': 'blue'
                                  }
                                }, this.stateStr(params.row.state))
                        }
                    },
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
                                            util.setDialog(add, {
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
                let data = JSON.parse(JSON.stringify(this.form))
                for(let i in data){
                    if(!data[i]){
                        delete data[i]
                    }
                }
                this.exlData = data;
                otcApi.findBankList(this.size,this.page,data,(res, total) => {
                    this.data = res;
                    this.total = total;
                    console.log(this.data)
                },msg=>{
                    this.$Message.error({content: msg})
                });
            },
            add() {
                util.setDialog(add, {
                    okCallback: () => {
                        this.getList();
                    }
                });
            },
            stateStr(state){
                let str = {
                    1: this.$t('system.sx'),
                    2: this.$t('system.bsx'),
                }
                return str[state]
            },
            changePage(page) {
                this.page = page
                this.getList()
            },
            output(){
                // 导出开户行信息报表
                // util.outExl('api/bm/otcManage/otcTradePermission/exportOtcTradePermissionExcel', this.exlData)
                let tabName = this.$t('otc.khhxxbb')
                otcApi.findBankList(this.size1,this.page,this.exlData,(res, total) => {
                    this.dataExl = res;
                    this.$refs.tables.exportCsv({
                        filename: tabName,
                        columns: this.columns.filter((data, index) => index !== 6),
                        data: this.dataExl
                    });

                },msg=>{
                    this.$Message.error({content: msg})
                })
            }
        }
    };
</script>

<style scoped>

</style>
