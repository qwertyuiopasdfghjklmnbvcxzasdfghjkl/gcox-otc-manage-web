<!-- 用户级别管理 -->
<template>
    <Row>
        <Col span="24">
            <Row>
                <Card>
                    <p slot="title">
                        <Col span="16">
                            {{$t('nav.yhjbgl')}}
                        </Col>
                        <Col span="8">
                            <Button type="primary" style="float:right;" @click="outExl()">{{$t('systemlog.dc')}}</Button>
                        </Col>
                    </p>
                    <p style="margin-bottom: 20px">
                        {{$t('common.yhm')}}：
                        <Input v-model="username" style="width: 200px"></Input>
                        {{$t('rank.jb')}}
                        <Select style="width:200px" v-model="otcGrade">
                            <Option :value="5">{{$t('common.qb')}}</Option>
                            <Option :value="0">Normal</Option>
                            <Option :value="1">Silver</Option>
                            <Option :value="2">Gold</Option>
                            <Option :value="3">Platinum</Option>
                        </Select>
                        {{$t('rank.jbsfgx')}}
                        <Select style="width:200px" v-model="otcGradeUpdate">
                            <Option :value="5">{{$t('common.qb')}}</Option>
                            <Option :value="1">{{$t('common.s')}}</Option>
                            <Option :value="0">{{$t('common.f')}}</Option>
                        </Select>
                        <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
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
    import update from './userRank/update.vue';
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
                    {title: this.$t('system.yhid'), key: 'userId'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {
                        title: this.$t('rank.jb'),
                        render: (h, params) => {
                            return h('span', this.state(params.row.otcGrade))
                        }
                    },
                    {
                        title: this.$t('rank.jbsfgx'),
                        render: (h, params) => {
                            return h('span', params.row.otcGradeUpdate === 0 ? this.$t('common.f') : this.$t('common.s'))
                        }
                    },

                    {title: this.$t('common.gxsj'), key: 'updatedAt'},

                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            let accessCode = Cookies.get('roles');
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled:(accessCode.indexOf('ROLE_ADMIN') === -1) && (accessCode.indexOf('ROLE_CUSTOMER') === -1)
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
                outDate: {}
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
                    otcGrade: this.otcGrade === 5 ? '' : this.otcGrade,
                    otcGradeUpdate: this.otcGradeUpdate === 5 ? '' : this.otcGradeUpdate,
                    username: this.username,
                };
                this.outDate = data
                rank.listPageUserGrade(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage(page) {
                this.page = page;
                this.getList();
            },
            outExl() {
                // GET /userGrade/exportUserGradeExcel
                // 导出用户级别管理报表
                util.outExl('api/bm/userGrade/exportUserGradeExcel', this.outDate)
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
