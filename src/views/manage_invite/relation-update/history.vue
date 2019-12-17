<template>
    <Card style="width: 800px;">
        <p slot="title">{{vm.$t('finance.xgjl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}</span>
                <Input v-model="username" style="width: 200px;"></Input>
                <Button type="primary" @click="page=1;getList()">{{vm.$t('common.cx')}}</Button>
            </p>
            <Table :columns="columns" :data="tabData"></Table>
            <Page :current="page" :total="total" @on-change="changePage" :page-size="size"
                  style="text-align:center;margin-top:20px;"></Page>
        </div>
    </Card>
</template>

<script>
    import invite from '../../../api/invite'
    export default {
        props: ['name'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                username: this.name || null,
                page: 1,
                total: 0,
                size: 10,
                tabData: [],
                columns: [
                    {key: 'createdAt',title: vm.$t('mall.cjsj')},
                    {key: 'username',title: vm.$t('common.yhm')},
                    {key: 'beforeCode',title: vm.$t('invite.xgq')},
                    {key: 'afterCode',title: vm.$t('invite.xgh')},
                    {key: 'operatorUsername',title: vm.$t('finance.czr')},
                ]
            }
        },
        created() {
            if(this.name){
                this.getList()
            }
        },
        methods: {
            getList(){
                let data = {
                    pageSize: this.size,
                    page: this.page,
                    username: this.username
                }
                invite.findUserInviteModifyRecord(data,(res,total)=>{
                    this.tabData = res
                    this.total = total
                })
            },
            closeDialog(){
                this.$emit('removeDialog');
            },
            changePage(e){
                this.page = e
                this.getList()
            }
        }

    }
</script>

<style scoped>
.cont p{
    margin-bottom: 10px;
}
</style>
