<template>
    <Card style="width: 600px">
        <p slot="title">
            <span>{{vm.$t('common.xz')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="form" :model="form" :rules="rule" :label-width="80" >
                <FormItem :label="vm.$t('common.yhm')"  prop="username">
                    <Input type="text" v-model="form.username"></Input>
                </FormItem>
                <FormItem :label="vm.$t('common.bz')"  prop="symbol">
                    <Select v-model="form.symbol">
                        <Option v-for="data in sumbolList" :value="data.name">{{data.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('exchange.fx')"  prop="role">
                    <Select v-model="form.role">
                        <Option :value="1">Taker</Option>
                        <Option :value="2">Maker</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('system.yhjbsfsx')"  prop="discountByGrade">
                    <Select v-model="form.discountByGrade">
                        <Option :value="1">{{vm.$t('system.sx')}}</Option>
                        <Option :value="2">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('system.fl')"  prop="rate">
                    <InputNumber style="width:100%" v-model="form.rate"/>
                </FormItem>
            </Form>
            <p style="text-align: center">
                <Button type="primary" @click="submit()">{{vm.$t('common.tj')}}</Button>
            </p>

        </div>
    </Card>
</template>

<script>
    import system from '../../../api/systemparam'
    import Numberbox from "../../components/dialog/numberbox";
    export default {
        components: {Numberbox},
        data() {
            const vm = window.vm
            return {
                vm: vm,
                form:{
                    username: null,
                    symbol: 'BTC',
                    role: 1,
                    discountByGrade: 1,
                    rate: null
                },
                rule:{
                    username: [{required: true, type: 'string', message:vm.$t('common.qsr')+vm.$t('common.yhm') }],
                    symbol: [{required: true, message:vm.$t('common.qsr')+vm.$t('common.bz') }],
                    role: [{required: true, message:vm.$t('common.qsr')+vm.$t('exchange.fx') }],
                    discountByGrade: [{required: true, message:vm.$t('common.qsr')+vm.$t('system.yhjbsfsx') }],
                    rate: [{required: true, message:vm.$t('common.qsr')+vm.$t('system.fl') }],
                },
                sumbolList: []
            }
        },
        created() {
            this.getAll();
        },
        methods: {
            getAll () {
                this.sumbolList = JSON.parse(window.localStorage.symbolTypes);
            },
            closeDialog () {
                this.$emit('removeDialog');
            },
            submit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        system.insertOtcTransactionRate(this.form,res=>{
                            this.$Message.success({content: res})
                            this.$emit('okCallback');
                            this.$emit('removeDialog');
                        },msg=>{
                            this.$Message.error({content: msg})
                        })
                    }
                })
            }
        }
    }
</script>

<style scoped>

</style>
