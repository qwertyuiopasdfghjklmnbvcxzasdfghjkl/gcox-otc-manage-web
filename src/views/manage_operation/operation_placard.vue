<template>
    <div class="operation_placard">
        <Card>
            <p slot="title">{{$t('operation.gg')}}
                <Button type="primary" @click="addMarket">{{$t('common.xz')}}</Button>
            </p>
            <Table :columns="columns1" :data="data1"></Table>
            <Page :current="curPage" :total="total" @on-change="changePage"
                  style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>
<script>
    import extendApi from '../../api/extend';
    import util from '../../libs/util';
    import addPlacard from './placard/addPlacard';
    import upPlacard from './placard/upPlacard';

    export default {
        data () {
            return {
                curPage: 1,
                total: 0,
                columns1: [
                    {
                        title: this.$t('operation.sx'),
                        key: 'sequence'
                    },
                    {
                        title: this.$t('operation.jtggbt'),
                        key: 'title'
                    },
                    {
                        title: this.$t('operation.jtgglj'),
                        key: 'link',
                    },
                    {
                        title: this.$t('operation.ywggbt'),
                        key: 'titleEn'
                    },
                    {
                        title: this.$t('operation.ywgglj'),
                        key: 'linkEn'
                    },
                    {
                        title: this.$t('operation.ftggbt'),
                        key: 'titleCht',
                    },
                    {
                        title: this.$t('operation.ftgglj'),
                        key: 'linkCht'
                    },
                    {
                        title: this.$t('common.gxsj'),
                        key: 'updatedTime'
                    },
                    {
                        title: this.$t('common.zt'),
                        key: 'displayStatus',
                        render: (h, params) => {
                            return h('div', params.row.displayStatus === 1 ?
                                this.$t('operation.zs') : this.$t('operation.bzs'));
                        }
                    },
                    {
                        title: this.$t('common.cz'),
                        key: 'opreat',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {margin: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(upPlacard, {
                                                item: params.row,
                                                okCallback: () => {
                                                    this.getfindAllAnnouncement();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('common.xg')),
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    on: {
                                        click: () => {
                                            extendApi.deleteAnnouncement({
                                                announcementId: params.row.announcementId
                                            }, (res) => {
                                                if((this.total>10)&&(this.total%10 == 1)){
                                                    this.curPage = this.curPage-1
                                                }
                                                this.getfindAllAnnouncement();
                                                this.$Message.success({content: this.$t('operation.qxcg')});

                                            }, (msg) => {
                                                this.$Message.error({content: msg});
                                            });
                                        }
                                    }
                                }, this.$t('operation.scgg'))
                            ]);
                        }
                    }
                ],
                data1: []
            };
        },
        created () {
            this.getfindAllAnnouncement();
            console.log(this.curTotal(101));
        },
        methods: {
            addMarket () {
                util.setDialog(addPlacard, {
                    okCallback: () => {
                        this.getfindAllAnnouncement();
                    }
                });
            },
            curTotal (total){
                let t = total%10
                return t
            },
            getfindAllAnnouncement () {
                extendApi.findAllAnnouncement(this.curPage, {}, (res,total) => {
                    this.data1 = res;
                    this.total = total;
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getfindAllAnnouncement();
            }
        }
    };
</script>
