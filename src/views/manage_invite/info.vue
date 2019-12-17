<template>
    <Card>
        <p slot="title">
            {{$t('invite.yqxxcx')}}
        </p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="username" style="width: 300px" @keyup.enter.native="page=1;getUserInfo()"></Input></span>
                <span>{{$t('common.yqm')}}： <Input v-model="myInvitationCode" style="width: 300px" @keyup.enter.native="page=1;getUserInfo()"></Input></span>
                <Button type="primary" @click="page=1;getUserInfo()">{{$t('common.cx')}}</Button>
            </p>
            <div class="cont">
                <p><span>{{$t('common.yhm')}}：</span> <b>{{data.username}}</b></p>
                <p><span>{{$t('common.yqm')}}：</span><b> {{data.myInvitationCode}}</b></p>
                <p><span>{{$t('invite.yqjl')}}：</span><b> {{data.awardHasGiven}}</b></p>
                <p><span>{{$t('invite.yqrs')}}：</span><b> {{data.countm}}</b></p>
                <p>
                    <span>{{$t('invite.yqls')}}：</span>
                </p>
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" :page-size="size"
                      @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import invite from '../../api/invite'
    export default {
        name: "info",
        data() {
            return {
                username: null,
                myInvitationCode: null,
                data: {},
                tabData: [],
                page: 1,
                total: 0,
                size: 10,
                columns: [
                    {
                        title: this.$t('common.zh'),
                        key: 'username'
                    },
                    {
                        title: this.$t('exchange.zcsj'),
                        key: 'createdAt'
                    },
                    {
                        title: this.$t('invite.yqzt'),
                        key: 'isInvited',
                        render: (h, pramas)=>{
                            return h('div', pramas.row.isInvited === 1 ? this.$t('common.ywc'): this.$t('lock.wwc'))
                        }
                    },
                    {
                        title: this.$t('invite.yqjl') + '（ACM）',
                        key: 'awardHasGiven'
                    }
                ]
            }
        },
        created() {

        },
        methods: {
            // getInfo() {
            //     let data= {
            //         myInvitationCode: this.myInvitationCode,
            //         username: this.username
            //     }
            //     this.data = {};
            //     this.tabData = []
            //     this.getUserList(data)
            //     this.getUserInfo(data)
            // },
            getUserInfo(){ 
                let datas= {
                    myInvitationCode: this.myInvitationCode,
                    username: this.username
                }
                this.data = {};
                this.tabData = []
                invite.findUserInviteInfo(datas,(res)=>{
                    this.data = res;
                    console.log(this.data)
                    this.getUserList(datas)
                },msg=>{
                    this.$Message.error({content: msg});
                })
            },
            getUserList(data){
                data.page = this.page
                data.pageSize = this.size
                invite.findUserInvite(data,(res, total)=>{
                    this.tabData = res;
                    this.total = total
                    console.log(this.tabData)
                },msg=>{
                    this.$Message.error({content: msg});
                })
            },
            changePage(e){
                let datas= {
                    myInvitationCode: this.myInvitationCode,
                    username: this.username
                }
                this.page = e;
                this.getUserList(datas)
            }
        }
    }
</script>

<style scoped lang="less">
    .cont {
        margin-top: 10px;

        p {
            padding: 10px 0;
        }
    }
</style>
