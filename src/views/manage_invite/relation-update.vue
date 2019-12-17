<template>
    <Card>
        <p slot="title">{{$t('invite.yqgxxg')}}</p>
        <div>
            <p>
                <span>{{$t('common.yhm')}}： <Input v-model="name" style="width: 300px"></Input></span>
                <Button type="primary" @click="getList()">{{$t('common.cx')}}</Button>
                <Button type="primary" style="float: right" @click="historyList()">{{$t('finance.xgjl')}}</Button>
            </p>
            <div class="cont">
                <Table :columns="columns" :data="tabData"></Table>
                <Page :current="page" :total="total" @on-change="changePage" :page-size="size"
                      style="text-align:center;margin-top:20px;"></Page>
            </div>
        </div>
    </Card>
</template>

<script>
    import util from '../../libs/util';
    import update from './relation-update/update'
    import history from './relation-update/history'
    import invite from '../../api/invite'
    export default {
        data() {
            return {
                name: null,
                code: null,
                size: 10,
                page: 1,
                total: 1,
                tabData: [],
                columns: [
                    {title: this.$t('common.yhm'), render: (h, params)=>{
                        return h('div', this.name)
                        }},
                    {key: 'username', title: this.$t('invite.tjr')},
                    {key: 'invitedCode', title: this.$t('exchange.tjryqm')},
                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            return h('Button', {
                                props: {type: 'primary', size: 'small'},
                                on: {
                                    click: () => {
                                        util.setDialog(update, {
                                            item: params.row,
                                            name: this.name,
                                            okCallback: () => {
                                                this.getList();
                                            }
                                        });
                                    }
                                }
                            }, this.$t('invite.xgtjr'))
                        }
                    },
                ]
            }
        },
        created() {

        },
        methods: {
            getList() {
                let data = {
                    username: this.name
                }
                invite.findUserInviteRecommend(data, res=>{
                    this.tabData = [res]
                },msg=>{
                    this.$Message.error({content: msg})
                })
            },
            historyList() {
                util.setDialog(history, {
                    name: this.name,
                    okCallback: () => {
                        // this.getList();
                    }
                });
            },
            changePage() {

            },
        }

    }
</script>

<style scoped>
    .cont {
        margin-top: 10px;
    }
</style>
