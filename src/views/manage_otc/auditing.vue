<!-- 审核管理 -->
<template>
    <Row>
        <Card>
            <p slot="title">{{$t('nav.shgl')}}
                <span class="refresh" @click="getRequestManage('1')"></span>
            </p>
            <Row>
                {{$t('nav.shgl')}}：
                <Checkbox v-model="single" @on-change="curPage=1;getRequestManage('1')">{{$t('otc.xsqb')}}</Checkbox>
            </Row>
            <Table :columns="columns1" :data="datas1" style="margin-top:10px;"></Table>
            <Page :current="curPage" :total="total" @on-change="changePage"
                  style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </Row>
</template>

<script>
    import util from '../../libs/util';
    import viewdetail from './auditing/viewdetail';
    import handle from './appeals/handle';
    import otcApi from '../../api/otc';

    export default {
        data () {
            return {
                single: false,
                curPage: 1,
                total: 0,
                columns1: [
                    {title: this.$t('otc.ssbh'), key: 'msgNumber'},
                    {
                        title: this.$t('monitoring.shzt'), key: 'state',
                        render: (h, params) => { // 1：未审核   3：已审核
                            return h('div', params.row.state == 1 ? this.$t('common.wsh') : this.$t('otc.ysh'));
                        }
                    }, // 0,未处理//1:已处理)
                    {title: this.$t('otc.sslx'), key: 'appealTypeName'},
                    {
                        title: this.$t('otc.ssjg'), key: 'winUserId',
                        render: (h, params) => {
                            return h('div', params.row.winUserId != params.row.userId ? this.$t('otc.bssfsl') : this.$t('otc.ssfsl'));
                        }
                    },
                    {title: this.$t('otc.ssgly'), key: 'appealMgrName'},
                    {title: this.$t('otc.clsj'), key: 'updatedAt'},
                    {
                        title: this.$t('common.cz'), key: 'action', render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(viewdetail, {
                                                msgNumber: params.row.msgNumber
                                            });
                                        }
                                    }
                                }, this.$t('kyc.ckxq')),
                                h('Button', {
                                    props: {type: 'primary', size: 'small', disabled: params.row.state == 3},
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            otcApi.appealHandleSecond({
                                                winUserId: params.row.winUserId,
                                                punishTypeId: params.row.punishTypeId,
                                                appealManageId: params.row.appealManageId
                                            }, (res) => {
                                                this.$Message.success({content: this.$t('otc.ssclwb')});
                                                this.getRequestManage();
                                            }, (msg) => {
                                                this.$Message.error({content: msg});
                                            });
                                        }
                                    }
                                }, this.$t('otc.ty')),
                                h('Button', {
                                    props: {type: 'primary', size: 'small', disabled: params.row.state == 3},
                                    on: {
                                        click: () => {
                                            util.setDialog(handle, {
                                                winUserId: params.row.winUserId,
                                                punishTypeId: params.row.punishTypeId,
                                                msgNumber: params.row.msgNumber,
                                                oppositeUserId: params.row.oppositeUserId,//卖
                                                userId: params.row.userId, //买
                                                appealManageId: params.row.appealManageId,
                                                okCallback: () => {
                                                    this.getRequestManage();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('common.xg'))
                            ]);
                        }
                    }
                ],
                datas1: []
            };
        },
        created () {
            this.getRequestManage('1');
        },
        methods: {
            getRequestManage (all) {
                if (this.single) {
                    otcApi.listAppealRequestManage(this.curPage, {
                        state: 3
                    }, (res, total) => {
                        this.total = total;
                        this.datas1 = res;
                    });
                } else {
                    otcApi.listAppealRequestManage(this.curPage, {}, (res, total) => {
                        this.total = total;
                        this.datas1 = res;
                    });
                }
            },
            changePage (page) {
                this.curPage = page;
                this.getRequestManage();
            }
        }
    };
</script>

<style lang="less" scoped>
    .refresh {
        width: 49px;
        height: 24px;
        background: url(../../images/frsh.png) center/cover no-repeat;
        background-size: contain;
        cursor: pointer;
        color: #2d8cf0;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }
</style>
