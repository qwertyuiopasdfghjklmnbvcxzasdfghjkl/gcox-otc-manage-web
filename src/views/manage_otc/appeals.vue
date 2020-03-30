<!-- 申诉管理 -->
<template>
    <Row>
        <Card>
            <p slot="title">{{$t('otc.sscx')}} </p>
            <Row>
                <Select v-model="searchKey" style="width:200px">
                    <Option value="appealUsername">{{$t('otc.ssrzh')}}</Option>
                    <Option value="oppositeUsername">{{$t('otc.bssrzh')}}</Option>
                    <Option value="orderNumber">{{$t('otc.ssddbh')}}</Option>
                </Select>
                <Input v-model="searchContent" clearable style="width: 300px;" :placeholder="$t('otc.cxnr')"></Input>
                <Button type="primary" @click="curPage=1;unprocessed()">{{$t('common.cx')}}</Button>
            </Row>
        </Card>
        <Card style="margin-top: 10px;">
            <Row>
                <Col span="6">
                    {{$t('nav.ssgl')}}：
                    <Checkbox v-model="single" @on-change="curPage=1;unprocessed()">{{$t('otc.zxsdcl')}}</Checkbox>
                </Col>
                <Col span="6">{{$t('otc.ssbhpx')}}：
                    <RadioGroup v-model="orderNumber" @on-change="setOrderNumberSort">
                        <Radio label="">{{$t('otc.mr')}}</Radio>
                        <Radio label="asc">{{$t('otc.sx')}}</Radio>
                        <Radio label="desc">{{$t('otc.jx')}}</Radio>
                    </RadioGroup>
                </Col>
                <Col span="6">{{$t('otc.sxsjpx')}}：
                    <RadioGroup v-model="createdAt" @on-change="setCreatedAtSort">
                        <Radio label="">{{$t('otc.mr')}}</Radio>
                        <Radio label="asc">{{$t('otc.sx')}}</Radio>
                        <Radio label="desc">{{$t('otc.jx')}}</Radio>
                    </RadioGroup>
                </Col>
            </Row>
        </Card>
        <Card style="margin-top:10px;">
            <Table :columns="columns1" :data="datas"></Table>
        </Card>
        <Page :current="curPage" :page-size="pageSize" :total="total" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Row>
</template>

<script>
    import util from '../../libs/util';
    import info from './appeals/info';
    import vieworder from './appeals/vieworder';
    import handle from './appeals/handle';
    import otcApi from '../../api/otc';
    import Cookies from 'js-cookie';

    export default {
        data () {
            return {
                curPage: 1,
                pageSize: 5,
                total: 0,
                single: false,
                orderNumber: '',
                createdAt: '',
                searchKey: '',
                searchContent: '',
                columns1: [
                    {title: this.$t('otc.ssbh'), key: 'msgNumber'},
                    {
                        title: this.$t('otc.sxrxm'), key: 'appealUserRealName', render: (h, params) => {
                            return h('span', params.row.appealUserRealName ? params.row.appealUserRealName : '-');
                        }
                    },
                    {
                        title: this.$t('otc.ssrzh'), key: 'appealUsername', render: (h, params) => {
                            return h('span', params.row.appealUsername ? params.row.appealUsername : '-');
                        }
                    },
                    {
                        title: this.$t('otc.bsxrxm'), key: 'oppositeUserRealName', render: (h, params) => {
                            return h('span', params.row.oppositeUserRealName ? params.row.oppositeUserRealName : '-');
                        }
                    },
                    {
                        title: this.$t('otc.bssrzh'), key: 'oppositeUsername', render: (h, params) => {
                            return h('span', params.row.oppositeUsername ? params.row.oppositeUsername : '-');
                        }
                    },
                    {title: this.$t('risk.ddbh'), key: 'orderNumber'},
                    {
                        title: this.$t('otc.wtlx'), key: 'appealTypeName', render: (h, params) => {
                            return h('span', params.row.appealTypeName ? params.row.appealTypeName : '-');
                        }
                    },
                    {
                        title: this.$t('otc.ssnr'), key: 'description', render: (h, params) => {
                            return h('span', params.row.description ? params.row.description : '-');
                        }
                    },
                    {
                        title: this.$t('common.zt'), key: 'state',
                        render: (h, params) => {  // 0: 未处理  1:已处理  2：已取消  3：已审核
                            return h('div', this.switchStaus(params.row.state));
                        }
                    },
                    {title: this.$t('otc.sxsj'), key: 'createdAt'},
                    {
                        title: this.$t('common.cz'), key: 'action', render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {type: 'primary', size: 'small'},
                                    style: {margin: '3px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(vieworder, {
                                                msgNumber: params.row.msgNumber
                                            });
                                        }
                                    }
                                }, this.$t('otc.ckdd')),
                                h('Button', {
                                    style: {margin: '3px'},
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.state !== 0 || !util.showThisRoute(['ROLE_ADMIN', 'ROLE_OTC_APPEAL', 'ROLE_OTC_AUDIT'], Cookies.get('roles')) && util.showThisRoute('ROLE_CUSTOMER', Cookies.get('roles'))
                                    },
                                    on: {
                                        click: () => {
                                            util.setDialog(handle, {
                                                winUserId: params.row.winUserId,
                                                punishTypeId: params.row.punishTypeId,
                                                appealManageId: params.row.appealManageId,
                                                oppositeUserId: params.row.oppositeUserId,
                                                userId: params.row.userId,
                                                type: 'chuli',
                                                okCallback: () => {
                                                    this.unprocessed();
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('risk.cl'))
                            ]);
                        }
                    }
                ],
                datas: []
            };
        },
        created () {
            this.unprocessed();
        },
        methods: {
            setCreatedAtSort () {
                this.curPage = 1;
                this.orderNumber = '';
                this.unprocessed();
            },
            setOrderNumberSort () {
                this.createdAt = '';
                this.unprocessed();
            },
            switchStaus (state) {
                switch (state) {// 0: 未处理  1:已处理  2：已取消  3：已审核
                    case 0:
                        return this.$t('risk.wcl');
                    case 1:
                        return this.$t('risk.ycl');
                    case 2:
                        return this.$t('operation.yqx');
                    case 3:
                        return this.$t('otc.ysh');
                }
            },
            viewInfo (index) {
                util.setDialog(info, {
                    msgNumber: this.datas[index].msgNumber
                });
            },
            changePage (page) {
                this.curPage = page;
                this.unprocessed();
            },
            unprocessed () {
                let data = {};
                if (this.orderNumber) {
                    data.sortKey = `orderNumber ${this.orderNumber}`;
                }
                if (this.createdAt) {
                    data.sortKey = `createdAt ${this.createdAt}`;
                }
                let searchContent = this.searchContent.replace(/(^\s*)|(\s*$)/g, '');
                if (this.searchKey && searchContent) {
                    data[this.searchKey] = searchContent;
                }
                if (this.single) {
                    data.state = 0;
                    otcApi.listAppealRequest(this.pageSize, this.curPage, data, (res, total) => {
                        this.total = total;
                        this.datas = res;
                    });
                } else {
                    otcApi.listAppealRequest(this.pageSize, this.curPage, data, (res, total) => {
                        this.total = total;
                        this.datas = res;
                    });
                }
            }
        }
    };
</script>

<style lang="less">
.refresh{width: 49px;height: 24px;background: url(../../images/frsh.png) center/cover no-repeat;background-size: contain;cursor: pointer;color: #2d8cf0;}
.ivu-card-head-inner, .ivu-card-head p{display: flex !important;justify-content: space-between  !important;height: 40px !important; line-height: 40px !important;}
</style>
