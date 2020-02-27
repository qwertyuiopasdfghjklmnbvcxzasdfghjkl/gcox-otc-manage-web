<template>
    <Card>
        <p slot="title">{{$t('invite.yqfyjl')}}</p>
        <div>
            <Row>
                <Col :lg='22' :md='20' :xs='20'>
                    <span>{{$t('common.yhm')}}： <Input v-model.trim="data.userName" @keyup.enter.native="page=1;getList()" style="width: 150px"></Input></span>
                    {{$t('common.bz')}}
                    <Select v-model="data.symbol" style="width: 100px">
                        <Option value="">{{$t('common.qb')}}</Option>
                        <Option v-for="item in symbolList" :value="item.symbol" :key="item.symbol">{{ item.symbol }}</Option>
                    </Select>
                    {{$t('common.cjsj')}}：
                    <DatePicker type="datetime" v-model="data.start" :placeholder="$t('common.kssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker>
                    <DatePicker type="datetime" v-model="data.end" :placeholder="$t('common.jssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker>
                    {{$t('common.zt')}}
                    <Select v-model="data.status" style="width: 100px">
                        <Option value="">{{$t('common.qb')}}</Option>
                        <Option :value="2">{{$t('lock.ywc')}}</Option>
                        <Option :value="1">{{$t('lock.wwc')}}</Option>
                    </Select>
                    <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                </Col>
                <Col :lg='2' :md='4' :xs='4'>
                    <Button style="float:right" type="primary" @click="downloadList()">{{$t('systemlog.dc')}}</Button>
                </Col>
            </Row>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import inviteApi from '@/api/invite';
    import util from '@/libs/util';
    import currenyApi from '@/api/currency';
    export default {
        name: "rake-record",
        data() {
            return {
                data: {
                    userName: null,
                    symbol: null,
                    start: null,
                    end: null,
                    status: null
                },
                outData:{
                    username: null
                },
                page: 1,
                size: 10,
                total: 0,
                tabData: [],
                columns:[
                    {key: 'createdAt',title: this.$t('common.cjsj')},
                    {key: 'userName',title: this.$t('common.yhm')},
                    {key: 'symbol',title: this.$t('common.bz')},
                    {key: 'amount',title: this.$t('invite.fyje')},
                    {key: 'orderId',title: this.$t('risk.ddh')},
                    // {key: 'commissionAmountUsdt',title: this.$t('invite.zhusdt')},
                    // {key: 'fromUserName',title: this.$t('invite.yqr')},
                    // {key: 'status',title: this.$t('common.zt')},
                ],
                downloadparmes: {},
                symbolList:[]
            }
        },
        created() {
            this.getdataSymbol();
            // this.getList()
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolList = res;
                });
            },
            getList(){
                let formData = JSON.parse(JSON.stringify(this.data))
                formData.start = formData.start ? util.dateToStr(new Date(formData.start)) : null;
                formData.end = formData.end ? util.dateToStr(new Date(formData.end)) : null;
                this.downloadparmes = formData
                if(formData.userName){
                    inviteApi.inviteCommissionRecord(this.size,this.page,formData, res => {
                        // this.$Message.success({content: res.msg});
                        this.tabData = res.data
                        this.total = res.total
                    }, msg => {
                        this.$Message.error({content: msg});
                    });    
                }else{
                    this.$Message.error({content: this.$t('common.yhm')+this.$t('common.bnwk')});
                }
            },
            downloadList() {
                let arr = []
                for (let i in this.downloadparmes){
                    if(this.downloadparmes[i]!== null){
                        let v = this.downloadparmes[i]
                        arr.push(i+'='+v)
                    }
                }
                if(this.downloadparmes.userName){
                    window.location.href = `${util.baseURL}api/bm/feeDetails/exportRakeBackExcel?export=1&${arr.join('&')}`
                }else{
                    this.$Message.error({content: this.$t('common.yhm')+this.$t('common.bnwk')});
                }
            },
            changePage(page){
                this.page = page
                this.getList()
            },
        }

    }
</script>

<style scoped>
.cont{
    margin-top: 10px;
}
</style>
