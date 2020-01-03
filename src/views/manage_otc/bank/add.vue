<template>
    <Card style="width: 600px">
        <p slot="title">
            <span>{{this.item?vm.$t('common.xg'):vm.$t('common.xz')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="form" :model="form" :rules="rule" :label-width="100" >
                <FormItem :label="vm.$t('otc.khh')"  prop="bankName">
                    <Input type="text" v-model.trim="form.bankName"></Input>
                </FormItem>
                <FormItem :label="vm.$t('otc.dyfb')"  prop="currency">
                    <Input type="text" v-model.trim="form.currency"></Input>
                </FormItem>
                <FormItem :label="vm.$t('otc.xh')"  prop="orderSort">
                    <Input type="text" v-model.trim="form.orderSort"></Input>
                </FormItem>
                <FormItem :label="vm.$t('common.zt')"  prop="state">
                    <Select v-model="form.state">
                        <Option :value="1">{{vm.$t('system.sx')}}</Option>
                        <Option :value="2">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <p style="text-align: center">
                <Button type="primary" @click="submit()">{{this.item?vm.$t('common.bc'):vm.$t('common.tj')}}</Button>
            </p>

        </div>
    </Card>
</template>

<script>
    import otc from '../../../api/otc'
    import Numberbox from "../../components/dialog/numberbox";
    export default {
        props: ['item'],
        components: {Numberbox},
        data() {
            const vm = window.vm
            return {
                vm: vm,
                form:{
                    bankName: null,
                    currency: null,
                    orderSort: null,
                    state: null
                },
                rule:null,
                sumbolList: []
            }
        },
        created() {
            if(this.item){
                this.form.bankId = this.item.bankId
                this.form.bankName = this.item.bankName
                this.form.currency = this.item.currency
                this.form.orderSort = this.item.orderSort
                this.form.state = this.item.state
            }else{
                this.rule = {
                    bankName: [{required: true, message:vm.$t('common.qsr')+vm.$t('otc.khh') }],
                    currency: [{required: true, message:vm.$t('common.qsr')+vm.$t('otc.dyfb') }],
                    orderSort: [{required: true, message:vm.$t('common.qsr')+vm.$t('otc.xh') }],
                    state: [{required: true, message:vm.$t('common.qxz')+vm.$t('common.zt') }]
                }
            }
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
                        otc.addOrUpdate(this.form,res=>{
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
