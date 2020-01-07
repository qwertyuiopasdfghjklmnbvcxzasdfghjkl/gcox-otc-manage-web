<template>
    <Card style="width: 600px">
        <p slot="title">
            <span>{{vm.$t('otc.xzkhh')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="form" :model="form" :rules="rule" :label-width="100" >
                <FormItem :label="vm.$t('otc.khh')"  prop="userName">
                    <numberbox type="text" v-model="form.userName" :maxLength="250"/>
                </FormItem>
                <FormItem :label="vm.$t('otc.dyfb')"  prop="roleName">
                    <Select v-model="form.roleName">
                        <Option value="Taker">Taker</Option>
                        <Option value="Maker">Maker</Option>
                    </Select>
                </FormItem>
                <FormItem :label="vm.$t('otc.xh')"  prop="kycLevel">
                    <numberbox v-model="form.userName" :accuracy="0" :maxLength="250"/>
                </FormItem>
                <FormItem :label="vm.$t('common.zt')"  prop="direction">
                    <Select v-model="form.direction">
                        <Option :value="1">{{vm.$t('system.sx')}}</Option>
                        <Option :value="2">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </FormItem>
            </Form>
            <p style="text-align: center">
                <Button type="primary" @click="submit()">{{vm.$t('common.tj')}}</Button>
            </p>

        </div>
    </Card>
</template>

<script>
    import otc from '../../../api/otc'
    import Numberbox from "../../components/dialog/numberbox";
    export default {
        components: {Numberbox},
        data() {
            const vm = window.vm
            return {
                vm: vm,
                form:{
                    userName: null,
                    roleName: 'Taker',
                    kycLevel: 0,
                    direction: 0,
                    permission: 1
                },
                rule:{
                    userName: [{required: true, message:vm.$t('common.qsr')+vm.$t('common.yhm') }],
                    roleName: [{required: true }],
                    kycLevel: [{required: true }],
                    direction: [{required: true }],
                    permission: [{required: true }],
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
                        otc.insertOtcTradePermission(this.form,res=>{
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
