<template>
    <Card style="width:450px;">
        <p slot="title">
            {{vm.$t('operation.cjff')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form ref="formValidate" :model="formValidate" :rules="ruleValidate">
            <FormItem :label="vm.$t('operation.bh')" prop="serialNumber">
                <Input v-model="formValidate.serialNumber" :maxlength="255" name="serialNumber"></Input>
            </FormItem>
            <!-- <FormItem label="创建时间" prop="creatTime">
                <DatePicker type="date" placeholder="请选择时间" name="creatTime" v-model="formValidate.creatTime" width="100%"></DatePicker>
            </FormItem> -->
            <FormItem :label="vm.$t('common.bz')" prop="symbol">
                <Select v-model="formValidate.symbol" name="symbol" @on-change="changSelect">
                    <Option :value="data.symbol" v-for="data in symbolData" :key="data.id">{{data.symbol}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="vm.$t('common.sl')" prop="quantity">
                <Input v-model="formValidate.quantity" name="quantity" :maxlength="255"></Input>
            </FormItem>
            <FormItem :label="vm.$t('operation.mbyhid')" prop="username">
                <Input v-model="formValidate.username" name="username"></Input>
            </FormItem>
            <!--<FormItem :label="vm.$t('operation.mbzhid')" prop="accountId">-->
            <!--<Input v-model="formValidate.accountId" name="accountId"></Input>-->
            <!--</FormItem>-->
            <FormItem :label="vm.$t('operation.lyzhid')" prop="sourceUsername">
                <Input v-model="formValidate.sourceUsername" name="sourceUsername"></Input>
            </FormItem>
            <FormItem :label="vm.$t('common.beiz')" prop="remarks">
                <Input v-model="formValidate.remarks" name="remarks" :maxlength="255"></Input>
            </FormItem>
            <div style="text-align:center;margin-top:15px;">
                <Button type="primary" style="margin-right:10px;" @click="creat">{{vm.$t('common.qd')}}</Button>
                <Button type="ghost" @click="cancel()">{{vm.$t('common.qx')}}</Button>
            </div>
        </Form>
    </Card>
</template>
<script>
    import extendApi from '../../../api/extend';

    export default {
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                formValidate: {
                    serialNumber: null,
                    creatTime: '',
                    symbol: '',
                    symbolType: '',
                    quantity: null,
                    username: null,
                    // accountId: null,
                    sourceUsername: null,
                    remarks: null
                },
                ruleValidate: {
                    serialNumber: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.bh'), trigger: 'blur'}
                    ],
                    creatTime: [
                        {required: true, type: 'date', message: '请输入时间', trigger: 'change'}
                    ],
                    symbol: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('common.bz'), trigger: 'blur'}
                    ],
                    quantity: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('common.sl'), trigger: 'blur'}
                    ],
                    username: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.mbyhid'), trigger: 'blur'}
                    ],
                    // accountId: [
                    //     { required: true, message: '请输入目标账户ID', trigger: 'blur' }
                    // ],
                    sourceUsername: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('operation.lyzhid'), trigger: 'blur'}
                    ],
                    remarks: [
                        {required: true, message: vm.$t('common.qsr')+vm.$t('common.beiz'), trigger: 'blur'}
                    ],
                },
                symbolData: []
            };
        },
        created () {
            this.findSymbolInfo();
        },
        methods: {
            changSelect (data) {
                let type = [];
                this.symbolData.forEach((item) => {
                    if (item.symbol == data) {
                        type.push(item);
                    }
                });
                this.formValidate.symbolType = type[0].symbolType;
            },
            findSymbolInfo () {
                extendApi.findSymbolInfo((res) => {
                    this.symbolData = res;
                });
            },
            cancel () {
                this.$emit('removeDialog');
            },
            creat () {
                this.$refs.formValidate.validate((valid) => {
                    if (valid) {
                        let formData = new FormData(this.$refs.formValidate.$el);
                        formData.append('symbolType', this.formValidate.symbolType);
                        extendApi.createSingleDistribute(formData, (res) => {
                            this.$Message.success({content: '创建成功'});
                            // this.findSymbolInfo()
                            this.$emit('okCallback');
                            this.$emit('removeDialog');
                        }, (msg) => {
                            this.$Message.error({content: msg});
                        });
                    }
                });
            },
            closeDialog () {
                this.$emit('okCallback');
                this.$emit('removeDialog');
            }
        }
    };
</script>

