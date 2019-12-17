<template>
    <Card>
        <p slot="title">
            {{$t('nav.kycbzjgl')}}
            <Button @click="outExl()">{{$t('systemlog.dc')}}</Button>
        </p>
        <p class="search">
            <span>{{$t('common.yhm')}}</span>
            <Input v-model="form.username" style="width: 200px;"/>
            <span>kyc {{$t('common.zt')}}</span>
            <Select v-model="form.kycState" style="width: 200px;">
                <Option value="4">{{$t('common.qb')}}</Option>
                <Option value="0">{{$t('common.wtg')}}</Option>
                <Option value="1">{{$t('common.ytg')}}</Option>
                <Option value="-1">{{$t('common.shz')}}</Option>
                <Option value="-3">{{$t('common.yjj')}}</Option>
            </Select>
            <span>{{$t('kyc.sfjnbzj')}}</span>
            <Select v-model="form.deposit" style="width: 200px;">
                <Option value="3">{{$t('common.qb')}}</Option>
                <Option value="1">{{$t('kyc.yjbzj')}}</Option>
                <Option value="0">{{$t('kyc.wjbzj')}}</Option>
            </Select>
            <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
        </p>
        <div>
            <Table :columns="columns" :data="data" style="margin-top:10px;"></Table>
            <Page :current="page" :total="total" @on-change="changePage"
                  :page-size="size" style="text-align:center;margin-top:20px;"></Page>
        </div>

    </Card>
</template>

<script>
    import kyc from '../../api/kyc'
    import util from '../../libs/util';
    import update from './cashDeposit/update'

    export default {
        name: "paymentTerm",
        data() {
            return {
                page: 1,
                total: 0,
                size: 10,
                data: [],
                form:{
                    username:null,
                    kycState: '4',
                    deposit: '3',
                },
                columns: [
                    {title: this.$t('system.yhid'),key: 'userId'},
                    {title: this.$t('common.yhm'),key: 'username'},
                    {title: 'kyc'+this.$t('common.zt'),render: (h, params)=>{
                            return h('div',this.state(params.row.kycState))
                        }},
                    {title: this.$t('kyc.sfjnbzj'),render:(h, params)=>{
                        return h('div', params.row.deposit === '0' ? this.$t('kyc.wjbzj'): this.$t('kyc.yjbzj'))
                        }},
                    {title: this.$t('common.gxsj'),key: 'lastUpdatedTime'},
                    {title: this.$t('common.cz'),render:(h, parame)=>{
                            return h('Button',{
                                props: {
                                    type: 'primary',
                                    size: 'small',
                                },
                                on: {
                                    click:()=>{
                                        util.setDialog(update, {
                                            item: parame.row,
                                            okCallback: () => {
                                                this.getList();
                                            }
                                        });
                                    }
                                }
                            }, this.$t('common.xg'))
                        }},
                ]
            }
        },
        created() {
            this.getList()
        },
        methods: {
            outExl(){
                let data = []
                for (let i in this.form) {
                    if(this.form[i]&&this.form.kycState !== '4'&&this.form.deposit !== '3'){
                        let v = this.form[i] ? this.form[i] : ''
                        data.push(i+'='+v)
                    }
                }
                window.location.href = `${util.baseURL}api/bm/kycManage/exportKycExcel?${data.join('&')}`
            },
            getList(){
                let data = {
                    username: this.form.username,
                    kycState: this.form.kycState === '4' ? '' : this.form.kycState,
                    deposit: this.form.deposit === '3' ? '' : this.form.deposit
                }
                kyc.listPageUserKycDeposit(this.size, this.page, data, (res, total)=>{
                    this.data = res;
                    this.total = total
                },msg=>{
                    this.$Message.error({content: msg})
                })
            },
            changePage(e){
                this.page = e
                this.getList()
            },
            state(id){
                // 0未通过，1已通过，-1审核中，-2错误，-3拒绝
                let arr = {
                    0: this.$t('common.wtg'),
                    1: this.$t('common.ytg'),
                    '-1': this.$t('common.shz'),
                    '-2': this.$t('common.yjj'),
                    '-3': this.$t('common.yjj'),
                }
                return arr[id]
            }
        }
    }
</script>

<style scoped lang="less">
    .search{
        &>div{
            width: 200px;
        }
    }
</style>
