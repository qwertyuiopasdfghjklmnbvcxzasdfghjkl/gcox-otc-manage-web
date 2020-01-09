<!-- 数据统计 -->
<template>
    <Row>
        <Card>
            <p slot="title">{{$t('exchange.sjtj')}}
                <span class="refresh" @click="refreshAll"></span>
            </p>
            <Row>
                <Col span="8">
                    {{$t('exchange.zxyhsl')}}：{{data1.onlineAmount || 0}}
                </Col>
                <Col span="8">
                    {{$t('otc.dclss')}}：{{data1.waitHandleAppealAmount || 0}}
                </Col>
                <Col span="8">
                    {{$t('otc.jrycyjqksl')}}：{{data1.abnormalAmount || 0}}
                </Col>
            </Row>
        </Card>
        <Card style="margin-top:10px;">
            <p slot="title">{{$t('otc.jysj')}}</p>
            <Row v-for="(data, index) in data2" :key="data.id">
                <Col span="6">
                    {{data.symbol}}{{$t('otc.jyzl')}}：{{data.transactionAmount || 0}}
                </Col>
                <Col span="6">
                    {{data.symbol}}{{$t('otc.sjggsl')}}：{{data.onShelfAmount || 0}}
                </Col>
                <Col span="6">
                    {{data.symbol}}{{$t('otc.zzjydds')}}：{{data.beingTransactionOrderAmount || 0}}
                </Col>
                <Col span="6">
                    {{data.symbol}}{{$t('otc.wcjyds')}}：{{data.accomplishTransactionOrderAmount || 0}}
                </Col>
            </Row>
            <Page :current="curPage" :total="total" @on-change="changePage"
                  style="text-align:center;margin-top:20px;"></Page>
        </Card>
        <Card style="margin-top:10px;">
            <p slot="title">{{$t('exchange.tbzs')}}</p>
            <Form ref="formItem" :model="formItem" :label-width="80" inline>
                <FormItem prop="user" :label="$t('common.bz')">
                    <Select v-model="formItem.symbol" style="width:100px">
                        <Option v-for="(item,i) in symbolTypeList" :value="item.symbol" :key="i">{{item.symbol}}
                        </Option>
                    </Select>
                </FormItem>
                <FormItem prop="password" :label="$t('system.xm')">
                    <!--1,在线用户数量 2,上架广告数量 3,正在交易的订单数 4,当天完成订单数 5,当天交易额 6,待处理申述数 7,当天异常预警数-->
                    <Select v-model="formItem.project" style="width:150px">
                        <Option value="1">{{$t('exchange.zxyhsl')}}</Option>
                        <Option value="2">{{$t('otc.sjggsl')}}</Option>
                        <Option value="3">{{$t('otc.zzjydds')}}</Option>
                        <Option value="4">{{$t('otc.dtwcdds')}}</Option>
                        <Option value="5">{{$t('otc.dtjye')}}</Option>
                        <Option value="6">{{$t('otc.dclsss')}}</Option>
                        <Option value="7">{{$t('otc.dtycyjs')}}</Option>
                    </Select>
                </FormItem>
                <FormItem prop="password" :label="$t('exchange.sjd')">
                    <DatePicker v-model="formItem.date" format="yyyy-MM-dd" type="daterange" placement="bottom-end"
                                style="width: 200px"></DatePicker>
                </FormItem>
                <FormItem prop="password" :label="$t('exchange.sjbc')">
                    <Select v-model="formItem.du" style="width:150px">
                        <Option value="1">{{$t('exchange.yxs')}}</Option>
                        <Option value="12">{{$t('exchange.srsx')}}</Option>
                        <Option value="24">{{$t('exchange.esxs')}}</Option>
                        <Option value="168">{{$t('exchange.qt')}}</Option>
                        <Option value="360">{{$t('exchange.swt')}}</Option>
                        <Option value="720">{{$t('exchange.yy')}}</Option>
                    </Select>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="getfindChartDataList()">{{$t('common.cx')}}</Button>
                </FormItem>
                <FormItem>
                    <Button type="primary" @click="exportTable">{{$t('exchange.scbb')}}</Button>
                </FormItem>
            </Form>
            <div ref="canvas" class="manage_exchange_canvas"></div>
        </Card>
    </Row>
</template>

<script>
    import echarts from 'echarts';
    import otcApi from '../../api/otc';
    import util from '../../libs/util';
    import currenyApi from '@/api/currency';

    export default {
        data () {
            return {
                curPage: 1,
                total: 0,
                formItem: {
                    symbol: 'BTC',
                    project: '1',
                    date: [],
                    du: '1'
                },
                data1: [],
                data2: [],
                symbolTypeList: null
            };
        },
        computed: {
            params () {
                let data = {
                    symbol: this.formItem.symbol,
                    item: this.formItem.project,
                    step: this.formItem.du
                };
                if (this.formItem.date[0]) {
                    data.beginDate = util.dateToStr(this.formItem.date[0]);
                } else {
                    data.beginDate = util.dateToStr(new Date(), 'yyyy-MM-dd 00:00:00');
                }
                if (this.formItem.date[1]) {
                    data.endDate = util.dateToStr(this.formItem.date[1]);
                } else {
                    data.endDate = util.dateToStr(new Date(), 'yyyy-MM-dd 00:00:00');
                }
                return data;
            }
        },
        created () {
            this.getfindDataStatistic();
            this.getfindTransactionData();
            this.$nextTick(() => {
                this.getfindChartDataList();
            });
            // this.symbolTypeList = JSON.parse(window.localStorage.symbolTypes);
            this.getdataSymbol();
        },
        methods: {
            getdataSymbol () {
                currenyApi.findAllValidSymbolList((res) => {
                    this.symbolTypeList = res;
                });
            },
            refreshAll () {
                this.getfindDataStatistic();
                this.getfindTransactionData();
                this.$nextTick(() => {
                    this.getfindChartDataList();
                });
            },
            exportTable () {
                let paramStr = [];
                for (var i in this.params) {
                    paramStr.push(`${i}=${this.params[i]}`);
                }
                window.location.href = `${util.baseURL}` + `api/bm/otcManage/exportOtcExcel?${paramStr.join('&')}`;
            },
            getfindDataStatistic () {
                otcApi.findDataStatistic((res) => {
                    this.data1 = res.data;
                });
            },
            getfindTransactionData () {
                otcApi.findTransactionData(this.curPage, {}, (res, total) => {
                    this.total = total;
                    this.data2 = res;
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getfindTransactionData();
            },
            getfindChartDataList () {
                otcApi.findChartDataList(this.params, (res) => {
                    let data1 = [];
                    let data2 = [];
                    res.forEach((item) => {
                        data1.push(item.createdAt);
                        if (this.formItem.project === '1') {
                            data2.push(item.onlineUserAmount);
                        } else if (this.formItem.project === '2') {
                            data2.push(item.listAdvertisementAmount);
                        } else if (this.formItem.project === '3') {
                            data2.push(item.transcationingOrderAmount);
                        } else if (this.formItem.project === '4') {
                            data2.push(item.completedOrderAmount);
                        } else if (this.formItem.project === '5') {
                            data2.push(item.transactionSum);
                        } else if (this.formItem.project === '6') {
                            data2.push(item.waitHandleAppealAmount);
                        } else if (this.formItem.project === '7') {
                            data2.push(item.abnormalWarningAmount);
                        }
                    });
                    this.initCanvas(data1, data2);
                });
            },
            initCanvas (data1, data2) {
                let option = {
                    color: ['#3398DB'],
                    tooltip: {
                        trigger: 'axis',
                        axisPointer: {            // 坐标轴指示器，坐标轴触发有效
                            type: 'shadow'        // 默认为直线，可选为：'line' | 'shadow'
                        }
                    },
                    grid: {
                        left: '3%',
                        right: '4%',
                        bottom: '3%',
                        containLabel: true
                    },
                    xAxis: [
                        {
                            type: 'category',
                            data: data1 || [],
                            axisTick: {
                                alignWithLabel: true
                            }
                        }
                    ],
                    yAxis: [
                        {
                            type: 'value'
                        }
                    ],
                    series: [
                        {
                            name: this.$t('otc.zjfw'),
                            type: 'bar',
                            barWidth: '60%',
                            data: data2 || []
                        }
                    ]
                };
                var myChart = echarts.init(this.$refs.canvas);
                myChart.setOption(option);
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

    .manage_exchange_canvas {
        display: flex;
        margin: 20px;
        height: 400px;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }
</style>
