<template>
    <Card>
        <p slot="title">{{$t('exchange.scffjl')}}</p>
        <p style="margin-bottom: 10px;">
            {{$t('common.yhm')}}
            <Input v-model="form.username" style="width: 200px"></Input>
            {{$t('lock.scjlid')}}
            <Input v-model="form.minerId" style="width: 200px"></Input>
            {{$t('common.zt')}}
            <Select v-model="form.status" style="width: 200px">
                <Option :value="2">{{$t('common.qb')}}</Option>
                <Option :value="0">{{$t('lock.wwc')}}</Option>
                <Option :value="1">{{$t('lock.ywc')}}</Option>
            </Select>
            {{$t('common.cjsj')}}：
            <DatePicker type="datetime" v-model="form.createdStart" :placeholder="$t('common.kssj')"
                        format="yyyy-MM-dd HH:mm:ss"
                        style="width: 160px"></DatePicker>
            <DatePicker type="datetime" v-model="form.createdEnd" :placeholder="$t('common.jssj')"
                        format="yyyy-MM-dd HH:mm:ss"
                        style="width: 160px"></DatePicker>
            <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
            <Button type="primary" @click="downloadList()" style="float: right">{{$t('systemlog.dc')}}</Button>
        </p>
        <up-list-tab :data="data"></up-list-tab>
        <Page :current="form.page" :total="total"
              @on-change="changePage" :page-size="form.size"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import lock from '../../api/lock'
    import util from '../../libs/util';
    import UpListTab from "./lock/up-list-tab";
    export default {
        name: "lock-list",
        components: {UpListTab},
        data(){
            return{
                data: [],
                form: {
                    page: 1,
                    size: 10,
                    username: null,
                    minerId: null,
                    status: 2,
                    type: 1,
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
                formData.status = formData.status === 2 ? null : formData.status
                formData.createdStart = formData.createdStart ? util.dateToStr(new Date(formData.createdStart)) : null;
                formData.createdEnd = formData.createdEnd ? util.dateToStr(new Date(formData.createdEnd)) : null;
                this.downloadparmes = formData
                lock.getDispense(formData,res=>{
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
                    if(this.downloadparmes[i]!== null&&this.downloadparmes[i]!== undefined){
                        let v = this.downloadparmes[i]
                        arr.push(i+'='+v)
                    }
                }
                console.log(arr, this.downloadparmes)
                window.location.href = `${util.baseURL}api/bm/stake/dispense/record?export=1&${arr.join('&')}`
            },
        }
    }
</script>

<style scoped>

</style>
