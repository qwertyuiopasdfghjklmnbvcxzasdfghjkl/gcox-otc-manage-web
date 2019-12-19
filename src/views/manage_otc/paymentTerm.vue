<template>
    <Card>
        <p slot="title">
            {{$t('otc.skfs')}}
            <!-- <Button @click="outExl()">{{$t('systemlog.dc')}}</Button> -->
        </p>
        <p class="search">
            <span>{{$t('common.yhm')}}</span>
            <Input v-model="form.username" style="width: 200px;"/>
            <span>{{$t('finance.lx')}}</span>
            <Select v-model="form.payType" style="width: 200px;">
                <Option value="0">{{$t('common.qb')}}</Option>
                <Option value="1">{{$t('otc.yhk')}}</Option>
                <!--<Option value="2">{{$t('otc.wx')}}</Option>-->
                <!--<Option value="3">{{$t('otc.zfb')}}</Option>-->
                <!--<Option value="4">Paypal</Option>-->
            </Select>
            <span>{{$t('common.xm')}}</span>
            <Input v-model="form.cardName" style="width: 200px;"/>
            <span>{{$t('common.zh')}}</span>
            <Input v-model="form.cardNumber" style="width: 200px;"/>
            <span>{{$t('otc.sfsx')}}</span>
            <Select v-model="form.invalid" style="width: 200px;">
                <Option :value="3">{{$t('common.qb')}}</Option>
                <Option :value="0">{{$t('system.sx')}}</Option>
                <Option :value="1">{{$t('system.bsx')}}</Option>
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
    import otc from '../../api/otc'
    import util from '../../libs/util';
    import update from './payment/update'
    import Cookies from 'js-cookie';
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
                    payType: '0',
                    cardName:null,
                    cardNumber:null,
                    invalid: 3
                },
                updateDis: false,
                columns: [
                    {title: this.$t('system.yhid'),key: 'userId'},
                    {title: this.$t('common.yhm'),key: 'username'},
                    {title: this.$t('finance.lx'),render: (h, params)=>{
                        return h('div',this.payWay(params.row.payType))
                        }},
                    {title: this.$t('common.xm'),key: 'cardName'},
                    {title: this.$t('common.zh'),key: 'cardNumber'},
                    {title: this.$t('otc.khh'),key: 'cardBank'},
                    {title: this.$t('otc.sfsx'),render: (h, params)=>{
                        return h('div',params.row.invalid == 1 ? this.$t('system.bsx') : this.$t('system.sx'))
                    }},
                    {title: this.$t('common.gxsj'),key: 'updatedAt'},
                    {title: this.$t('common.cz'),render:(h, parame)=>{
                        return h('Button',{
                            props: {
                                type: 'primary',
                                size: 'small',
                                disabled: this.updateDis
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
                ],
                outData: {}
            }
        },
        created() {
            this.getList()
            let r = Cookies.get('roles')
            if(r.indexOf('ROLE_ADMIN') === -1){
                if(r.indexOf('ROLE_OPERATION') === -1){
                    this.updateDis = true
                }
            }
        },
        methods: {
            outExl(){
                // GET /otcManage/otcPayType/exportOtcPayTypeExcel
                // 导出用户收款方式报表
                util.outExl('api/bm/otcManage/otcPayType/exportOtcPayTypeExcel', this.outData)
            },
            getList(){
                let data = {
                    // page: this.page,
                    // pageSize: this.size,
                    payType: this.form.payType === '0' ? null: this.form.payType,
                    invalid: this.form.invalid === 3 ? null: this.form.invalid,
                    cardName: this.form.cardName,
                    cardNumber: this.form.cardNumber,
                    username: this.form.username,
                }
                this.outData = data
                otc.listPageOtcPayType(this.size, this.page, data, (res, total)=>{
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
            payWay(id){
                return this.$t('otc.yhk')
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
