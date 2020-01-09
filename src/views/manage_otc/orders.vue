<!-- 订单管理 -->
<template>
    <Card>
        <p slot="title">{{$t('otc.ddgl')}}
            <span class="refresh" @click="getOrdersList"></span>
        </p>
        <Row>
            <Select v-model="formData.symbol" style="width:200px">
                <Option v-for="(item,i) in symbolTypeList" :value="item.symbol" :key="i">{{item.symbol}}</Option>
            </Select>
            <Input v-model="formData.orderNumber" clearable style="width: 300px;"
                   placeholder="OTC45941545316384768"></Input>
            <Button type="primary" @click="curPage=1;getOrdersList()">{{$t('common.cx')}}</Button>
        </Row>
        <Table :columns="columns1" :data="data1" style="margin-top:10px;"></Table>
        <Page :current="curPage" :total="total" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import util from '../../libs/util';
    import chatModel from './orders/chatModel';
    import otcApi from '../../api/otc';
    import {orderStates} from '../../libs/config';
    import Cookies from 'js-cookie';
    import currenyApi from '@/api/currency';

    export default {
        data () {
            return {
                curPage: 1,
                total: 0,
                formData: {
                    symbol: 'BTC',
                    orderNumber: ''
                },
                columns1: [
                    {title: this.$t('risk.ddbh'), key: 'orderNumber'},
                    {
                        title: this.$t('risk.ddzt'), key: 'state', render: (h, params) => {
                            return h('div', this.switchStaus(params.row.state, params.row.payState));
                        }
                    },
                    {
                        title: this.$t('exchange.jg'), key: 'curPrice',
                        render: (h, params) => {
                            return h('div', [(params.row.curPrice).toFixed(2).toMoney(), 'CNY']);
                        }
                    },
                    {
                        title: this.$t('common.sl'), key: 'symbolCount',
                        render: (h, params) => {
                            return h('div', [params.row.symbolCount, '', params.row.symbol]);
                        }
                    },
                    {
                        title: this.$t('common.je'), key: 'currencyCount',
                        render: (h, params) => {
                            return h('div', [(params.row.currencyCount).toFixed(2).toMoney(), 'CNY']);
                        }
                    },
                    {title: this.$t('otc.mjzh'), key: 'toUserName'},
                    {title: this.$t('otc.maijzh'), key: 'fromUserName'},
                    {
                        title: this.$t('otc.syzfsj'), key: 'surplus_Time',
                        render: (h, params) => {
                            return h('div', [params.row.state == 2 ? '00:00' : params.row.surplus_Time]);
                        }
                    },
                    {title: this.$t('common.cjsj'), key: 'updatedAt'},
                    {
                        title: this.$t('common.cz'), key: 'action', width: 300, render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.state == 2 || params.row.state == 3 || (params.row.state == 1 && params.row.payState == 0) || !util.showThisRoute(['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_OTC_AUDIT'], Cookies.get('roles')) && util.showThisRoute(['ROLE_OTC_APPEAL', 'ROLE_CUSTOMER'], Cookies.get('roles'))
                                    },
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            otcApi.sendMsg({
                                                userId: params.row.fromUserId,
                                                orderId: params.row.orderId,
                                                orderNumber: params.row.orderNumber
                                            }, (res) => {
                                                this.$Message.success({content: this.$t('otc.txcg')});
                                            }, (msg) => {
                                                this.$Message.error({content: msg});
                                            });
                                        }
                                    }
                                }, this.$t('otc.txfb')),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.state == 2 || params.row.state == 3 || (params.row.state == 1 && params.row.payState == 0) || !util.showThisRoute(['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_OTC_AUDIT'], Cookies.get('roles')) && util.showThisRoute(['ROLE_OTC_APPEAL', 'ROLE_CUSTOMER'], Cookies.get('roles'))
                                    },
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                content: '<p style="font-size:18px;">'+ this.$t('otc.sfqzsfhb') +'？</p>',
                                                onOk: () => {
                                                    otcApi.releaseCoin({
                                                        orderId: params.row.orderId
                                                    }, (res) => {
                                                        this.$Message.success({content: this.$t('otc.fbcg')});
                                                        this.getOrdersList();
                                                    }, (msg) => {
                                                        this.$Message.success({content: msg});
                                                    });
                                                },
                                                onCancel: () => {
                                                    this.$emit('removeDialog');
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('otc.qzfb')),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.state == 2 || params.row.state == 3 || (params.row.state == 1 && params.row.payState == 0) || !util.showThisRoute(['ROLE_ADMIN', 'ROLE_OPERATION', 'ROLE_OTC_AUDIT'], Cookies.get('roles')) && util.showThisRoute(['ROLE_OTC_APPEAL', 'ROLE_CUSTOMER'], Cookies.get('roles'))
                                    },
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            this.$Modal.confirm({
                                                content: '<p style="font-size:18px;margin-top:-6px;">'+ this.$t('otc.sfjcsb')+'？</p>',
                                                onOk: () => {
                                                    otcApi.unlockCoin({
                                                        orderId: params.row.orderId
                                                    }, (res) => {
                                                        this.$Message.success({content: this.$t('otc.jscg')});
                                                        this.getOrdersList();
                                                    }, (msg) => {
                                                        this.$Message.error({content: msg});
                                                    });
                                                },
                                                onCancel: () => {
                                                    this.$emit('removeDialog');
                                                }
                                            });
                                        }
                                    }
                                }, this.$t('otc.jcsb')),
                                h('i', {
                                    class: 'ivu-icon ivu-icon-ios-chatboxes-outline',
                                    style: {verticalAlign: 'middle', cursor: 'pointer', fontSize: '28px'},
                                    on: {
                                        click: () => {
                                            util.setDialog(chatModel, {
                                                orderNumber: params.row.orderNumber,
                                                type: 'chat'
                                            });
                                        }
                                    }
                                })
                            ]);
                        }
                    }
                ],
                data1: [],
                symbolTypeList: null
            };
        },
        created () {
            this.getdataSymbol();
            this.getOrdersList();
            // this.symbolTypeList = JSON.parse(window.localStorage.symbolTypes);
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolTypeList = res;
                });
            },
            switchStaus (state, payState) {
                switch (state) {
                    case 1:
                        return payState === 1 ? this.$t('otc.yfk') : this.$t('otc.wfk');
                    case 2:
                        return this.$t('common.ywc');
                    case 3:
                        return this.$t('common.yqx');
                }
            },
            getOrdersList () {
                otcApi.listAllOrders(this.curPage, {
                    symbol: this.formData.symbol,
                    orderNumber: this.formData.orderNumber
                }, (res, total) => {
                    res.forEach((item, index) => {
                        item.createTime = item.createdAt;
                        let date = util.formatDate(item.createTime).getTime();
                        let ndate = util.formatDate(item.nowTime).getTime();
                        var diffTime = Math.floor((ndate - date) / 1000);
                        var surplusTime = item.payApplyTime * 60 - diffTime;
                        util.countDown(surplusTime, (time) => {
                            item.surplus_Time = time;
                        });
                        item.surplus_Time = '00:00';
                    });
                    this.total = total;
                    this.data1 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getOrdersList();
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
