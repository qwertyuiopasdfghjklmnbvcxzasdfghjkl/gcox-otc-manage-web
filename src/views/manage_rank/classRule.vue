<!-- 用户级别管理 -->
<template>
    <Row>
        <Col span="24">
            <Row>
                <Card>
                    <p slot="title">
                        <Col span="16">
                            {{$t('nav.fjgz')}}
                        </Col>
                    </p>
                    <Table :columns="columns" :data="data" style="margin-top: 20px;"></Table>
                    <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                          style="text-align:center;margin-top:20px;"></Page>
                </Card>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import util from '../../libs/util';
    import update from './classRule/update.vue';
    import rank from '../../api/rank';
    import Cookies from 'js-cookie';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
                total: 0,
                username: null,
                otcGrade: 5,
                otcGradeUpdate: 5,
                columns: [
                    {title: 'ID', key: 'grade'},
                    {title: this.$t('rank.yhjb'), key: 'grade'},
                    {title: this.$t('rank.jbmc'), key: 'name'},
                    {title: this.$t('rank.zxjyl')+ '≥', key: 'minVolume'},
                    {title: this.$t('rank.zk'), key: 'discount'},
                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            let accessCode = Cookies.get('roles');
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: (accessCode.indexOf('ROLE_ADMIN') === -1) && (accessCode.indexOf('ROLE_CUSTOMER') === -1),
                                    },
                                    style: {marginRight: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(update,
                                                {
                                                    item: params.row,
                                                    okCallback: () => {
                                                        this.getList();
                                                    }
                                                }
                                            )
                                        }
                                    }
                                }, this.$t('common.xg'))
                            ]);
                        }
                    }
                ],
                data: [],
            };
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let data = {
                    page: this.page,
                    size: this.size,
                };
                rank.listPageOtcGrade(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage(page) {
                this.page = page;
                this.getList();
            },
            state(id) {
                let list = ['Normal', 'Silver', 'Gold', 'Platinum']
                return list[id]
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

    .ivu-table-sort i {
        display: none;
    }

    .ivu-table-cell .ivu-table-sort i:first-child {
        display: none;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }
</style>
