<template>
    <!--<div class="upPlacard">-->
        <Card style="width: 650px">
            <p slot="title">{{vm.$t('common.xg')}}
                <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
            </p>
            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('report.tjzb')}}</Col>
                <Col span="5">{{datas.statisticItem}}</Col>
                <Col span="11">
                    <Input v-model="statisticItem" style="width: 200px"/>
                </Col>
                <Col span="3">
                    <Button @click="tabs('statisticItem')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>

            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('report.zbms')}}</Col>
                <Col span="5">{{datas.itemDesc}}</Col>
                <Col span="11">
                    <Input v-model="itemDesc"
                           type="textarea"
                           :rows="4"
                           maxlength="255"
                           style="width: 200px"/>
                </Col>
                <Col span="3">
                    <Button @click="tabs('itemDesc')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>

            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('report.csy')}}</Col>
                <Col span="5">{{datas.param1}}</Col>
                <Col span="11">
                    <Input v-model="param1" style="width: 200px"/>
                </Col>
                <Col span="3">
                    <Button @click="tabs('param1')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>

            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('report.sfpctszh')}}</Col>
                <Col span="5">{{datas.excludeSpecialUsers === 0 ? vm.$t('report.bpc') : vm.$t('report.pc')}}</Col>
                <Col span="11">
                    <Select v-model="excludeSpecialUsers" style="width: 200px;">
                        <Option :value="1">{{vm.$t('report.pc')}}</Option>
                        <Option :value="0">{{vm.$t('report.bpc')}}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Button @click="tabs('excludeSpecialUsers')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>
            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('common.zt')}}</Col>
                <Col span="5">{{datas.status === 0 ? vm.$t('exchange.kq') : vm.$t('exchange.gb')}}</Col>
                <Col span="11">
                    <Select v-model="status" style="width: 200px;">
                        <Option :value="0">{{vm.$t('exchange.kq')}}</Option>
                        <Option :value="1">{{vm.$t('exchange.gb')}}</Option>
                    </Select>
                </Col>
                <Col span="3">
                    <Button @click="tabs('status')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>

            <Row style="margin-bottom:20px;">
                <Col span="5">{{vm.$t('report.px')}}</Col>
                <Col span="5">{{datas.orderNo}}</Col>
                <Col span="11">
                    <numberbox :accuracy="0" v-model="orderNo" style="width: 200px;"/>
                </Col>
                <Col span="3">
                    <Button @click="tabs('orderNo')">{{vm.$t('common.xg')}}</Button>
                </Col>
            </Row>

        </Card>
    <!--</div>-->
</template>
<script>
    import reportApi from '../../../api/report';
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        components: {Numberbox},
        props: ['item'],
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                statisticItem: null,
                itemDesc: null,
                param1: null,
                excludeSpecialUsers: 0,
                status: 0,
                orderNo: null,
                datas: {
                    statisticItem: null,
                    itemDesc: null,
                    param1: null,
                    excludeSpecialUsers: null,
                    orderNo: null,
                    status: null,
                }
            };
        },
        created () {
            this.datas = this.item;
        },
        methods: {
            closeDialog () {
                this.$emit('removeDialog');
                this.$emit('okCallback');
            },
            tabs (propName) {
                if (!this[propName]) {
                    this.$Message.error({content: this.vm.$t('common.bnwk')});
                    return;
                }
                let data = {
                    id: this.item.id
                };
                data[propName] = this[propName];
                reportApi.insertOrUpdateDailyStatistic(data, (res) => {
                    this.$Message.success({content: this.vm.$t('common.xgcg')});
                    this.datas[propName] = this[propName];
                    this[propName] = '';
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            },
        }
    };
</script>

<style>
    .upPlacard {
        width: 600px;
        padding: 20px;
        background: #fff;
    }
</style>
