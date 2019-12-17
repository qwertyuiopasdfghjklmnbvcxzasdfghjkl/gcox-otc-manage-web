<template>
    <Card>
        <p slot="title">{{$t('exchange.scjl')}}</p>
        <p style="margin-bottom: 10px;">
            {{$t('common.yhm')}}
            <Input v-model="form.username" style="width: 200px"></Input>
            {{$t('lock.sclx')}}
            <Select v-model="form.type" style="width: 200px">
                <Option :value="0">{{$t('common.qb')}}</Option>
                <Option :value="1">{{$t('exchange.yhsc')}}</Option>
                <Option :value="2">{{$t('exchange.scxtjl')}}</Option>
                <Option :value="3">{{$t('exchange.zhucejl')}}</Option>
                <Option :value="4">{{$t('exchange.tjxyhjl')}}</Option>
                <Option :value="5">{{$t('exchange.tjyhscjl')}}</Option>
            </Select>
            {{$t('common.zt')}}
            <Select v-model="form.status" style="width: 200px">
                <Option :value="2">{{$t('common.qb')}}</Option>
                <Option :value="0">{{$t('lock.www')}}</Option>
                <Option :value="1">{{$t('lock.yww')}}</Option>
            </Select>
            {{$t('common.cjsj')}}：
            <DatePicker type="datetime" v-model="form.createdStart" :placeholder="$t('common.kssj')"
                        format="yyyy-MM-dd HH:mm:ss"
                        style="width: 160px"></DatePicker>
            <DatePicker type="datetime" v-model="form.createdEnd" :placeholder="$t('common.jssj')"
                        format="yyyy-MM-dd HH:mm:ss"
                        style="width: 160px"></DatePicker>
            <Button type="primary" @click="form.page=1;getList()">{{$t('common.cx')}}</Button>
            <Button type="primary" @click="downloadList()" style="float: right">{{$t('systemlog.dc')}}</Button>
        </p>
        <lock-list-tab :data="data"></lock-list-tab>
        <Page :current="form.page" :total="total"
              @on-change="changePage" :page-size="form.size"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import LockListTab from "./lock/lock-list-tab";
    import lock from '../../api/lock'
    import util from '../../libs/util';
    export default {
        name: "lock-list",
        components: { LockListTab},
        data(){
            return{
                data: [],
                form: {
                    page: 1,
                    size: 10,
                    username: null,
                    type: 0,
                    status: 2,
                    createdStart: null,
                    createdEnd: null,
                },
                total: 0,
                downloadparmes: {}
            }
        },
        created() {
            this.getList()
        },
        methods:{
            getList(){
                let Data = JSON.stringify(this.form)
                let formData = JSON.parse(Data)
                formData.type = formData.type === 0 ? null : formData.type
                formData.status = formData.status === 2 ? null : formData.status
                formData.createdStart = formData.createdStart ? util.dateToStr(new Date(formData.createdStart)) : null;
                formData.createdEnd = formData.createdEnd ? util.dateToStr(new Date(formData.createdEnd)) : null;
                this.downloadparmes = formData
                lock.getRecord(formData,res=>{
                    this.data = res.data;
                    this.total = res.total
                })
            },
            changePage(e){
                this.form.page = e;
                this.getList()
            },
            downloadList() {
                let arr = []
                for (let i in this.downloadparmes){
                    if(this.downloadparmes[i]!== null){
                        let v = this.downloadparmes[i]
                        arr.push(i+'='+v)
                    }
                }
                console.log(arr, this.downloadparmes)
                window.location.href = `${util.baseURL}api/bm/stake/record?export=1&${arr.join('&')}`
            },
        }
    }
</script>

<style scoped>

</style>
