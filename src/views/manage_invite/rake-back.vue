<template>
    <Card>
        <p slot="title">{{$t('invite.yqfycx')}}</p>
        <div>
            <Row>
                <Col :lg='22' :md='20' :xs='20'>
                <span>{{$t('common.yhm')}}： <Input v-model.trim="data.userName" @keyup.enter.native="page=1;getList()" style="width: 150px"></Input></span>
                {{$t('common.bz')}}
                <Select v-model="data.symbol" style="width: 100px">
                    <Option value="">{{$t('common.qb')}}</Option>
                    <Option v-for="item in symbolList" :value="item.symbol" :key="item.symbol">{{ item.symbol }}</Option>
                </Select>
                <!-- {{$t('common.cjsj')}}：
                <DatePicker type="datetime" v-model="data.createdAtStart" :placeholder="$t('common.kssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 160px"></DatePicker>
                <DatePicker type="datetime" v-model="data.createdAtEnd" :placeholder="$t('common.jssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 160px"></DatePicker> -->
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
        name: "rake-back",
        data() {
            return {
                data: {
                    userName: null,
                    symbol: null,
                    // createdAtStart: null,
                    // createdAtEnd: null,
                },
                outData:{
                    userName: null
                },
                page: 1,
                size: 10,
                total: 0,
                tabData: [],
                datas:[],
                columns:[
                    {key: 'userName',title: this.$t('common.yhm')},
                    {key: 'symbol',title: this.$t('common.bz')},
                    {key: 'amount',title: this.$t('invite.yhdfyhj')},
                    // {key: 'commissionAmountUsdt',title: this.$t('invite.yhdfy')+' USDT'},
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
                // formData.createdAtStart = formData.createdAtStart ? util.dateToStr(new Date(formData.createdAtStart)) : null;
                // formData.createdAtEnd = formData.createdAtEnd ? util.dateToStr(new Date(formData.createdAtEnd)) : null;
                this.downloadparmes = formData
                if(formData.userName){
                    inviteApi.inviteCommissionCount(this.size,this.page,formData, res => {
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
                    window.location.href = `${util.baseURL}api/bm/feeDetails/exportStatisticExcel?export=1&${arr.join('&')}`
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
