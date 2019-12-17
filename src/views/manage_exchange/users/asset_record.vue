<!--资产记录-->
<template>
    <div>
        <Card style="width:1200px;">
            <p slot="title">
                <span>{{vm.$t('exchange.zcjl')}}</span>
                <span>
                <!--<span class="refresh" @click="reshAll" style="margin-right:50px;"></span>-->
                <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer; margin-top: 14px;"
                   @click="closeDialog"></i>
            </span>
            </p>
            <Tabs value="name1">
                <TabPane :label="vm.$t('exchange.dqzc')" name="name1">
                    <Card>
                        <p slot="title">{{vm.$t('exchange.zzc')}}：{{totalAssets.totalAmountByBTC}}BTC
                            {{totalAssets.totalAmountByCNY}}CNY</p>
                    </Card>
                    <Table :columns="columns1" :data="data1"></Table>
                    <Page :current="curPage" :total="total"
                          @on-change="changePage" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.czjl')" name="name2">
                    <Table :columns="columns2" :data="data2"></Table>
                    <Page :current="curPage1" :total="total1"
                          @on-change="changePage1" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.tbjl')" name="name3">
                    <Table :columns="columns3" :data="data3"></Table>
                    <Page :current="curPage2" :total="total2"
                          @on-change="changePage2" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.czdzjl')" name="name4">
                    <Table :columns="columns4" :data="data4"></Table>
                    <Page :current="curPage3" :total="total3"
                          @on-change="changePage3" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.tbdzjl')" name="name5">
                    <Table :columns="columns5" :data="data5"></Table>
                    <Page :current="curPage4" :total="total4"
                          @on-change="changePage4" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.ffjl')" name="name6">
                    <div>
                        <p style="text-align: right; margin-bottom: 10px;">
                            <Button type="primary" @click="download()">{{vm.$t('systemlog.dc')}}</Button>
                        </p>


                        <Table :columns="columns6" :data="data6"></Table>
                        <Page :current="curPage5" :total="total5"
                              @on-change="changePage5" :page-size="10"
                              style="text-align:center;margin-top:20px;"></Page>
                    </div>
                </TabPane>
                <!--<TabPane :label="vm.$t('exchange.wkzhlb')" name="name7">-->
                    <!--<Table :columns="columns7" :data="data7"></Table>-->
                    <!--<Page :current="curPage7" :total="total7"-->
                          <!--@on-change="changePage7" :page-size="10"-->
                          <!--style="text-align:center;margin-top:20px;"></Page>-->
                <!--</TabPane>-->
                <!--<TabPane :label="vm.$t('exchange.scjl')" name="name8">-->
                    <!--<Card class="flex">-->
                        <!--<span>{{vm.$t('exchange.zbs')}}:{{statistics.voteCount}}</span>-->
                        <!--<span>{{vm.$t('common.zje')}}:{{statistics.voteAmount}}</span>-->
                        <!--<span>{{vm.$t('exchange.zyhs')}}:{{statistics.userCount}}</span>-->
                        <!--<span>{{vm.$t('exchange.rxzbs')}}:{{statistics.dailyVoteCount}}</span>-->
                        <!--<span>{{vm.$t('exchange.rxzje')}}:{{statistics.dailyVoteAmount}}</span>-->
                        <!--<span>{{vm.$t('exchange.rxzhs')}}:{{statistics.dailyUserCount}}</span>-->
                    <!--</Card>-->
                    <!--<p style="text-align: right; margin: 10px auto;">-->
                        <!--<Button type="primary" @click="downloadList()">{{vm.$t('systemlog.dc')}}</Button>-->
                    <!--</p>-->
                    <!--<Table :columns="columns8" :data="data8" style="margin-top: 10px"></Table>-->
                    <!--<Page :current="curPage8" :total="total8"-->
                          <!--@on-change="changePage8" :page-size="10"-->
                          <!--style="text-align:center;margin-top:20px;"></Page>-->
                <!--</TabPane>-->
                <TabPane :label="vm.$t('exchange.bbjyjl')">
                    <Table :columns="columns9" :data="data9"></Table>
                    <Page :current="curPage9" :total="total9"
                          @on-change="changePage9" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
                <TabPane :label="vm.$t('exchange.yebgmx')">
                    <p style="text-align: right; margin: 10px auto;">
                        <Button type="primary" @click="download10()">{{vm.$t('systemlog.dc')}}</Button>
                    </p>
                    <Table :columns="columns10" :data="data10"></Table>
                    <Page :current="curPage10" :total="total10"
                          @on-change="changePage10" :page-size="10"
                          style="text-align:center;margin-top:20px;"></Page>
                </TabPane>
            </Tabs>
        </Card>
    </div>
</template>

<script>
    import currenyApi from '../../../api/currency';
    import util from '../../../libs/util';
    export default {
        props: ['userId'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                curPage: 1,
                total: 0,
                curPage1: 1,
                total1: 0,
                curPage2: 1,
                total2: 0,
                curPage3: 1,
                total3: 0,
                curPage4: 1,
                total4: 0,
                curPage5: 1,
                total5: 0,
                curPage7: 1,
                total7: 0,
                curPage8: 1,
                total8: 0,
                curPage9: 1,
                total9: 0,
                curPage10: 1,
                total10: 0,
                statistics: {},
                columns1: [
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.qblx'),
                        key: 'type',
                        render: (h, params) => {
                            return h('div', params.row.type === 1 ? vm.$t('common.zqb') : vm.$t('common.fzqb'));
                        }
                    },
                    {
                        title: vm.$t('exchange.ky'),
                        key: 'availableAmount'
                    },
                    {
                        title: vm.$t('exchange.sd'),
                        key: 'frozenAmount'
                    },
                    {
                        title: vm.$t('exchange.hj'),
                        key: 'totalAmount'
                    }
                ],
                data1: [],
                columns2: [
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.sl'),
                        key: 'quantity'
                    },
                    {
                        title: vm.$t('common.zrdz'),
                        key: 'toAddress'
                    },
                    {
                        title: vm.$t('common.jyid'),
                        key: 'txId'
                    },
                    {
                        title: vm.$t('exchange.qkjd'),
                        key: 'confirmation'
                    },
                    {
                        title: vm.$t('common.zt'),
                        key: 'status',
                        render: (h, params) => {
                            return h('div', params.row.status === 1 ? vm.$t('common.dd') : vm.$t('common.wc'));
                        }
                    },
                    {
                        title: vm.$t('exchange.dzsj'),
                        key: 'createdTime'
                    }
                ],
                data2: [],
                columns3: [
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.sl'),
                        key: 'quantity'
                    },
                    {
                        title: vm.$t('common.zrdz'),
                        key: 'toAddress'
                    },
                    {
                        title: vm.$t('common.jyid'),
                        key: 'txId'
                    },
                    {
                        title: vm.$t('common.zt'),
                        key: 'status',
                        render: (h, params) => {
                            return h('div', this.switchStaus(params.row.status));
                        }
                    },
                    {
                        title: vm.$t('exchange.fssj'),
                        key: 'createdTime'
                    }
                ],
                data3: [],
                columns4: [
                    {
                        title: vm.$t('common.zh'),
                        key: 'accountName'
                    },
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.zrdz'),
                        key: 'toAddress'
                    },
                    {
                        title: 'MEMO',
                        key: 'memo'
                    }
                ],
                data4: [],
                columns5: [
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.zrdz'),
                        key: 'toAddress'
                    },
                    {
                        title: vm.$t('exchange.dzbm'),
                        key: 'addrAlias'
                    },
                    {
                        title: 'MEMO',
                        key: 'memo'
                    }
                ],
                data5: [],
                columns6: [
                    {
                        title: vm.$t('common.sj'),
                        key: 'createdAt'
                    },
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.sl'),
                        key: 'quantity'
                    },
                    {
                        title: vm.$t('common.beiz'),
                        key: 'remarks'
                    }
                ],
                data6: [],
                columns7: [
                    {
                        title: vm.$t('system.zhid'),
                        key: 'accountId'
                    },
                    {
                        title: vm.$t('common.kyye'),
                        key: 'availableBalance'
                    },
                    {
                        title: vm.$t('common.djje'),
                        key: 'frozenBalance'
                    },
                    // {
                    //     title: vm.$t('common.dh'),
                    //     key: 'mobile'
                    // },
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('common.zje'),
                        key: 'totalBalance'
                    },
                    {
                        title: vm.$t('common.qblx'),
                        key: 'type',
                        render: (h, params) => {
                            return h('div', this.wallet(params.row.type))
                        }
                    }
                ],
                data7: [],
                columns8: [
                    {
                        title: vm.$t('common.cjsj'),
                        key: 'createAt'
                    },
                    {
                        title: vm.$t('common.jssj'),
                        key: 'finishTime'
                    },
                    {
                        title: vm.$t('exchange.syzje'),
                        key: 'amount'
                    },
                    {
                        title: vm.$t('exchange.mrsyje'),
                        key: 'dailyAmount'
                    },
                    // {
                    //     title: vm.$t('exchange.sqsy'),
                    //     key: 'forCommunity'
                    // },
                    {
                        title: vm.$t('exchange.yffsy'),
                        key: 'giveAmount'
                    },
                    {
                        title: vm.$t('exchange.sybl'),
                        key: 'rate'
                    },
                    {
                        title: vm.$t('exchange.syje'),
                        key: 'remainAmount'
                    },
                    // {
                    //     title: vm.$t('exchange.wkjlzt'),
                    //     key: 'status'
                    // },
                    {
                        title: vm.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: vm.$t('exchange.zjycffsyrq'),
                        key: 'updateTime'
                    },
                    {
                        title: vm.$t('exchange.jllx'),
                        key: 'type',
                        render: (h, params) => {
                            return h('div', this.swType(params.row.type))
                        }
                    }
                ],
                data8: [],
                columns9: [
                    {title: vm.$t('common.sj'), key: 'exchangeTime'},
                    {title: vm.$t('exchange.sc'), key: 'market'},
                    {
                        title: vm.$t('exchange.fx'), key: 'direction',
                        render: (h, params) => {
                            return h('div', params.row.direction == 1 ? vm.$t('exchange.m1') : vm.$t('exchange.m4'));
                        }
                    },
                    {title: vm.$t('exchange.cjjj'), key: 'averagePrice'},
                    {title: vm.$t('exchange.cjl'), key: 'exchangeQuantity'},
                    {
                        title: vm.$t('exchange.cjje'), key: 'exchangeAmount',
                        render: (h, params) => {
                            return h('div', (params.row.exchangeAmount).toFixed(8));
                        }
                    },
                    {title: vm.$t('exchange.sxf'), key: 'fee'}
                ],
                data9: [],
                columns10: [
                    {title: vm.$t('mall.cjsj'), key: 'createdAt'},
                    {title: vm.$t('common.kyye'), key: 'availableBalance'},
                    {title: vm.$t('common.djje'), key: 'frozenBalance'},
                    {title: vm.$t('common.zje'), key: 'totalBalance'},
                    {title: vm.$t('common.bz'), key: 'symbol'},
                    {title: vm.$t('exchange.mb'), key: 'target'},
                    {title: vm.$t('finance.lx'), key: 'type'}
                ],
                data10: [],
                totalAssets: []
            };
        },
        created() {
            this.getAssetsList();
            this.getRecordList();
            this.getWithdraw();
            this.getRecharge();
            this.getWithdrawAddrList();
            this.getDistribute();
            this.allRecord();
            this.getAccountsList();
            this.getStakeList();
            this.getStatisticsList();
            this.tradeCurreny();
            this.getStatistic();
        },
        methods: {
            // reshAll () {
            //     this.getAssetsList();
            //     this.getRecordList();
            //     this.getWithdraw();
            //     this.getRecharge();
            //     this.getWithdrawAddrList();
            //     this.getDistribute();
            //     this.allRecord();
            // },
            switchStaus(state) {
                switch (state) {
                    case 1:
                        return '提现中';
                        break;
                    case 2:
                        return '已完成';
                        break;
                }
            },
            allRecord() {
                currenyApi.findUserCurrentAssetsByBTC({
                    userId: this.userId
                }, (res) => {
                    this.totalAssets = res;
                });
            },
            getAccountsList() {
                currenyApi.findMiningList({
                    page: this.curPage7,
                    userId: this.userId,
                    size: 10,
                }, (res) => {
                    this.data7 = res.data;
                    this.total7 = res.total;
                });
            },
            getStakeList() {
                currenyApi.findStakeList({
                    page: this.curPage7,
                    userId: this.userId,
                    size: 10,
                }, (res) => {
                    this.data8 = res.data;
                    this.total8 = res.total;
                });
            },
            getStatisticsList() {
                currenyApi.findStatisticsList((res) => {
                    console.log(res)
                    this.statistics = res.data
                });
            },
            closeDialog() {
                this.$emit('removeDialog');
            },
            getAssetsList() {
                currenyApi.findUserCurrentAssetsList(this.curPage, this.userId, (res, total) => {
                    this.total = total;
                    this.data1 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage(page) {
                this.curPage = page;
                this.getAssetsList();
            },
            getRecordList() {
                currenyApi.findUserRechargeRecordList(this.curPage1, this.userId, (res, total) => {
                    this.total1 = total;
                    this.data2 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage1(page) {
                this.curPage1 = page;
                this.getRecordList();
            },
            getWithdraw() {
                currenyApi.findUserWithdrawRecordList(this.curPage2, this.userId, (res, total) => {
                    this.total2 = total;
                    this.data3 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage2(page) {
                this.curPage2 = page;
                this.getWithdraw();
            },
            getRecharge() {
                currenyApi.findUserRechargeAddrList(this.curPage3, this.userId, (res, total) => {
                    this.total3 = total;
                    this.data4 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage3(page) {
                this.curPage3 = page;
                this.getRecharge();
            },
            getWithdrawAddrList() {
                currenyApi.findUserWithdrawAddrList(this.curPage4, this.userId, (res, total) => {
                    this.total4 = total;
                    this.data5 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage4(page) {
                this.curPage4 = page;
                this.getWithdrawAddrList();
            },
            getDistribute() {
                let data = {
                    page: this.curPage5,
                    size: 10
                }
                currenyApi.findUserDistributeRecordList(data, (res, total) => {
                    this.total5 = total;
                    this.data6 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage5(page) {
                this.curPage5 = page;
                this.getDistribute();
            },
            changePage7(page) {
                this.curPage7 = page;
                this.getAccountsList();
            },
            changePage8(page) {
                this.curPage8 = page;
                this.getStakeList();
            },
            wallet(id) {
                let wallet = {
                    1: this.vm.$t('common.zqb'),
                    2: this.vm.$t('common.fzqb'),
                }
                return wallet[id]
            },
            swType(id) {
                let wallet = {
                    1: this.vm.$t('exchange.yhsc'),
                    2: this.vm.$t('exchange.scxtjl'),
                    3: this.vm.$t('exchange.zhucejl'),
                    4: this.vm.$t('exchange.tjxyhjl'),
                    5: this.vm.$t('exchange.tjyhscjl'),
                }
                return wallet[id]
            },
            tradeCurreny() {
                currenyApi.findUserExchangeRecordList(this.curPage9, this.userId, (res, total) => {
                    this.total9 = total;
                    this.data9 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage9(page) {
                this.curPage9 = page;
                this.tradeCurreny();
            },
            getStatistic() {
                currenyApi.financialStatistics({
                    page: this.curPage10,
                    userId: this.userId,
                    size: 10
                }, (res, total) => {
                    this.total10 = total;
                    this.data10 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage10(page) {
                this.curPage10 = page;
                this.getStatistic();
            },
            download() {
                window.location.href = `${util.baseURL}api/bm/stake/dispense/record?export=1&userId=${this.userId}`
            },
            downloadList() {
                window.location.href = `${util.baseURL}api/bm/stake/record?export=1&userId=${this.userId}`
            },
            download10() {
                window.location.href = `${util.baseURL}api/bm/financialManage/financialStatistics/accounts?export=1&userId=${this.userId}`
            }
        }
    };
</script>
<style>
    .refresh {
        width: 49px;
        height: 24px;
        background: url(../../../images/frsh.png) center/cover no-repeat;
        background-size: contain;
        cursor: pointer;
        color: #2d8cf0;
    }

    .flex span {
        display: inline-block;
        padding-right: 25px;
    }
</style>

