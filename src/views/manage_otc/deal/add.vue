<template>
    <Card style="width: 600px">
        <p slot="title">
            <span>{{vm.$t('common.xz')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div>
            <Form ref="form" :model="form" :rules="rule" :label-width="100" >
                <FormItem :label="vm.$t('common.yhm')"  prop="userName">
                    <Input type="text" v-model="form.userName"></Input>
                </FormItem>
                <FormItem :label="'Taker/Maker'"  prop="roleName">
                    <Select v-model="form.roleName">
                        <Option value="Taker">Taker</Option>
                        <Option value="Maker">Maker</Option>
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
                <FormItem :label="vm.$t('otc.mmfx')"  prop="direction">
                    <Select v-model="form.direction">
                        <Option :value="1">{{vm.$t('exchange.m1')}}</Option>
                        <Option :value="2">{{vm.$t('exchange.m4')}}</Option>
                    </Select>
                </FormItem>

                <FormItem :label="vm.$t('nav.qxgl')"  prop="permission">
                    <Select v-model="form.permission">
                        <Option :value="1">{{vm.$t('exchange.zc')}}</Option>
                        <Option :value="0">{{vm.$t('exchange.dj')}}</Option>
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
