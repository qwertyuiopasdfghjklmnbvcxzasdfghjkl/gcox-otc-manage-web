<template>
    <Card style="width: 600px">
        <p slot="title">
            <span>{{vm.$t('common.xz')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="form" :model="form" :rules="rule" :label-width="120" >
                <FormItem :label="vm.$t('common.yhm')"  prop="username">
                    <Input type="text" v-model="form.username"></Input>
                </FormItem>
                <FormItem :label="vm.$t('common.bz')"  prop="symbol">
                    <Select v-model="form.symbol">
                        <Option v-for="item in symbolList" :value="item.name" :key="item.code">{{item.name}}</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('otc.kycjb')"  prop="kycLevel">
                    <Select v-model="form.kycLevel">
                        <Option :value="0">0</Option>
                        <Option :value="1">1</Option>
                        <Option :value="2">2</Option>
                        <Option :value="3">3</Option>
                    </Select>
                </FormItem>

                <FormItem :label="vm.$t('nav.tbxe')"  prop="quoto">
                    <numberbox v-model="form.quoto"/>
                </FormItem>
            </Form>
            <p style="text-align: center">
                <Button type="primary" @click="submit()">{{vm.$t('common.tj')}}</Button>
            </p>

        </div>
    </Card>
</template>

<script>
    import finance from '../../../api/finance'
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
                    kycLevel: 0,
                    quoto: null
                },
                rule:{
                    username: [{required: true, type: 'string', message:vm.$t('common.qsr')+vm.$t('common.yhm') }],
                    symbol: [{required: true, message:vm.$t('common.qsr')+vm.$t('common.bz') }],
                    kycLevel: [{required: true, message:vm.$t('common.qsr')+vm.$t('exchange.fx') }],
                    quoto: [{required: true, message:vm.$t('common.qsr')+vm.$t('system.yhjbsfsx') }],
                },
                symbolList: []
            }
        },
        created() {
            this.getAll();
        },
        methods: {
            getAll () {
                this.symbolList = JSON.parse(window.localStorage.symbolTypes);
                console.log(this.symbolList)
            },
            closeDialog () {
                this.$emit('removeDialog');
            },
            submit(){
                this.$refs.form.validate((valid) => {
                    if (valid) {
                        finance.insertWithdrawPermission(this.form,res=>{
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
