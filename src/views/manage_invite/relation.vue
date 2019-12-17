<template>
    <Card>
        <p slot="title">{{$t('invite.yqgxcx')}}</p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="username" style="width: 300px"></Input></span>
                <span>{{$t('invite.xscj')}}： <Input v-model="upLevel" style="width: 300px"></Input></span>
                <span>{{$t('invite.xxcj')}}： <Input v-model="downLevel" style="width: 300px"></Input></span>
                <Button type="primary" @click="page=1;getInfo()">{{$t('common.cx')}}</Button>
                <Button type="primary" @click="output()">{{$t('systemlog.dc')}}</Button>
            </p>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import invite from '../../api/invite'
    import util from '../../libs/util';
    export default {
        name: "relation",
        data() {
            return {
                username: null,
                upLevel: null,
                downLevel: null,
                page: 1,
                size: 10,
                total: 0,
                tabData: [],
                datas:[],
                columns:[
                    {key: 'levelSign',title: this.$t('invite.cj')},
                    {key: 'username',title: this.$t('common.yhm')},
                ],
                outParams: {}
            }
        },
        created() {

        },
        methods: {
            getInfo(){
                let data = {
                    // page: this.page,
                    // pageSize: this.size,
                    username: this.username,
                    upLevel: this.upLevel,
                    downLevel: this.downLevel
                }
                this.outParams = data
                invite.findUserInviteRecommendLevel(data, (res,total)=>{
                    this.datas = res
                    this.total = total
                    this.tabData = this.datas.slice(0, this.size)
                    console.log(this.tabData)
                },msg=>{
                    this.$Message.error({content: msg})
                })
            },
            output(){
                util.outExl('api/bm/userInvite/exportInviteModifyRecordExcel', this.outParams)
            },
            changePage(page) { //前端分页处理
                this.page = page;
                // this.getInfo();
                this.tabData = this.datas.slice(this.size*(page-1), this.size*page);
                console.log(this.tabData)
            },
        }

    }
</script>

<style scoped>
.cont{
    margin-top: 10px;
}
</style>
