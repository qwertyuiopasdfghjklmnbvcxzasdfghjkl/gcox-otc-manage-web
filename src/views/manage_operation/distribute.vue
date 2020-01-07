<!-- 分发 -->
<template>
    <Card>
        <p slot="title">{{$t('operation.ff')}}</p>
        <Row>
            <Col span="20">
                {{$t('common.yhm')}}
                <Input v-model="username" style="width: 200px;"/>
                {{$t('common.zt')}}：
                <Select v-model="stauts" style="width:200px">
                    <Option :value="3">{{$t('common.qb')}}</Option>
                    <Option :value="0">{{$t('operation.wff')}}</Option>
                    <Option :value="1">{{$t('operation.yff')}}</Option>
                    <Option :value="2">{{$t('operation.yqx')}}</Option>
                </Select>
                {{$t('common.cjsj')}}
                <DatePicker type="datetime" v-model="startTime"
                            :placeholder="$t('common.kssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 200px"></DatePicker>
                <DatePicker type="datetime" v-model="endTime"
                            :placeholder="$t('common.jssj')"
                            format="yyyy-MM-dd HH:mm:ss"
                            style="width: 200px"></DatePicker>

                <Button type="primary" @click="curPage=1;getDistribute()">{{$t('common.cx')}}</Button>
                <Button type="primary" @click="outExl()">{{$t('systemlog.dc')}}</Button>
            </Col>
            <Col span="4">
                <Button type="primary" style="float:right;margin-left: 10px" @click="creates()">{{$t('operation.cjff')}}</Button>
                <Button type="primary" style="float:right" @click="importCreates()">{{$t('operation.plff')}}</Button>
            </Col>
        </Row>
        <Table :columns="columns1" :data="data1" style="margin-top:20px;"></Table>
        <Page :current="curPage" :total="total" @on-change="changePage"
              style="text-align:center;margin-top:20px;"></Page>
    </Card>
</template>

<script>
    import util from '../../libs/util';
    import create from './distrbute/create';
    import importExl from './distrbute/importExl';
    import extendApi from '../../api/extend';

    export default {
        data () {
            return {
                username: null,
                stauts: 3,
                startTime: null,
                endTime: null,
                curPage: 1,
                total: 0,
                columns1: [
                    {
                        title: this.$t('operation.bh'),
                        key: 'serialNumber'
                    },
                    {
                        title: this.$t('common.bz'),
                        key: 'symbol'
                    },
                    {
                        title: this.$t('operation.mbyhid'),
                        key: 'username'
                    },
                    {
                        title: this.$t('common.sl'),
                        key: 'quantity'
                    },
                    {
                        title: this.$t('common.zt'),
                        key: 'distributeState',
                        render: (h, params) => {
                            return h('div', this.swithStatus(params.row.distributeState));
                        }
                    },
                    {
                        title: this.$t('common.beiz'),
                        key: 'remarks'
                    },
                    {
                        title: this.$t('common.cjsj'),
                        key: 'createdTime'
                    },
                    {
                        title: this.$t('operation.ffcz'),
                        key: 'opreat',
                        render: (h, params) => {
                            return h('div', [
                                h('Button', { //分发状态(0：未分发 1：已分发 2：已取消)
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.distributeState === 1 || params.row.distributeState === 2
                                    },
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            extendApi.distribute(params.row.distributeId, (res) => {
                                                this.$Message.success({content: this.$t('operation.ffcg')});
                                                this.getDistribute();
                                            }, (msg) => {
                                                this.$Message.error({content: msg});
                                            });
                                        }
                                    }
                                }, this.$t('operation.ff')),
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                        disabled: params.row.distributeState === 1 || params.row.distributeState === 2
                                    },
                                    style: {marginRight: '10px'},
                                    on: {
                                        click: () => {
                                            extendApi.cancelDistribute(params.row.distributeId, (res) => {
                                                this.$Message.success({content: this.$t('operation.qxcg')});
                                                this.getDistribute();
                                            });
                                        }
                                    }
                                }, this.$t('common.qx'))
                            ]);
                        }
                    }
                ],
                data1: [],
                outData: {}
            };
        },
        created () {
            this.getDistribute();
        },
        methods: {
            swithStatus (stauts) {
                switch (stauts) {
                    case 0:
                        return this.$t('operation.wff');
                    case 1:
                        return this.$t('operation.yff');
                    case 2:
                        return this.$t('operation.yqx');
                }
            },
            getDistribute () {
                let data = {
                    distributeState: this.stauts === 3 ? null : this.stauts,
                    username: this.username || null,
                    startTime: this.startTime ? util.dateToStr(new Date(this.startTime)) : null,
                    endTime: this.endTime ? util.dateToStr(new Date(this.endTime)) : null,
                };
                this.outData = data;
                extendApi.findAllDistribute(this.curPage, data, (res, total) => {
                    this.total = total;
                    this.data1 = res;
                });
            },
            changePage (page) {
                this.curPage = page;
                this.getDistribute();
            },
            creates () {
                util.setDialog(create, {
                    okCallback: () => {
                        this.getDistribute();
                    }
                });
            },
            importCreates(){
                util.setDialog(importExl, {
                    okCallback: () => {
                        this.getDistribute();
                    }
                });
            },
            outExl(){
                util.outExl('api/bm/promotionManage/distribute/exportDistributesExcel',this.outData)
            }
        }
    };
</script>
