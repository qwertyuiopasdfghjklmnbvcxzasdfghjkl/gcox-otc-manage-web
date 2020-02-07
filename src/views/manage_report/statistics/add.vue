<template>
        <Card>
            <p slot="title">{{vm.$t('common.xz')}}</p>
            <Form ref="formItem" :model="formLeft" :rules="ruleInline"
                  label-position="left" :label-width="120"
                  style="width:600px;overflow:auto;">
                <FormItem :label="vm.$t('report.tjzb')" prop="statisticItem">
                    <Input v-model="formLeft.statisticItem" ></Input>
                </FormItem>
                <FormItem :label="vm.$t('report.zbms')" prop="itemDesc">
                    <Input v-model="formLeft.itemDesc"
                           type="textarea"
                           :rows="4"
                           :maxlength="255"></Input>
                </FormItem>
                <FormItem :label="vm.$t('report.csy')" prop="param1">
                    <Input v-model="formLeft.param1"></Input>
                </FormItem>
                <FormItem :label="vm.$t('report.sfpctszh')" prop="excludeSpecialUsers">
                    <Select v-model="formLeft.excludeSpecialUsers">
                        <Option :value="1">{{vm.$t('report.pc')}}</Option>
                        <Option :value="0">{{vm.$t('report.bpc')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('common.zt')" prop="status">
                    <Select v-model="formLeft.status">
                        <Option :value="0">{{vm.$t('exchange.kq')}}</Option>
                        <Option :value="1">{{vm.$t('exchange.gb')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('report.px')" prop="orderNo">
                    <numberbox :accuracy="0" v-model="formLeft.orderNo"/>
                </FormItem>
                <div class="bannerBtn">
                    <Button type="primary" @click="addCurreny()">{{vm.$t('common.tj')}}</Button>
                    <Button @click="closeDialog()">{{vm.$t('common.qx')}}</Button>
                </div>
            </Form>
        </Card>

</template>
<script>
    import reportApi from '../../../api/report';
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        components: {Numberbox},
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                formLeft: {
                    statisticItem: null,
                    itemDesc: null,
                    param1: null,
                    excludeSpecialUsers: 0,
                    status: 0,
                    orderNo: null,
                },
                ruleInline: {
                    statisticItem: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('report.tjzb')},
                    ],
                    itemDesc: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('report.zbms')},
                    ],
                    excludeSpecialUsers: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('report.sfpctszh')},
                    ],
                    status: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('common.zt')},
                    ],
                    orderNo: [
                        {required: true, message: vm.$t('common.qsr') + vm.$t('report.px')},
                    ],
                }
            };
        },
        methods: {
            closeDialog () {
                this.$emit('removeDialog');
            },
            addCurreny () {
                let form = this.$refs.formItem;
                form.validate((valid) => {
                    if (valid) {
                        reportApi.insertOrUpdateDailyStatistic(this.formLeft, (res) => {
                            this.$Message.success({content: this.vm.$t('common.tjcg')});
                            this.$emit('removeDialog');
                            this.$emit('okCallback');
                        }, (msg) => {
                            this.$Message.error({content: msg});
                        });
                    }
                });
            }
        }
    };
</script>
<style>
    .addPlacard {
    }
</style>

