<template>
    <Card style="width:500px;">
        <p slot="title">
             {{vm.$t('otc.gyhfsxx')}} {{username}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form ref="formItem" :model="formItem" :rules="ruleItem" style="margin:0 20px;">
            <FormItem prop="msg" :label="vm.$t('kyc.qsrxtxx')">
                <Input v-model="formItem.msg" type="textarea" :rows="10" :placeholder="vm.$t('kyc.dhsr')"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" style="width:100px;" @click="sendMessage">{{vm.$t('kyc.fs')}}</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import otcApi from '../../../api/otc';

    export default {
        props: ['userId', 'username'],
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                formItem: {
                    msg: ''
                },
                ruleItem: {
                    msg: [
                        {required: true, message: vm.$t('kyc.qsrxtxx')}
                    ]
                }
            };
        },
        methods: {
            closeDialog () {
                this.$emit('removeDialog');
            },
            sendMessage () {
                this.$refs.formItem.validate((valid) => {
                    if (valid) {
                        otcApi.sendSystemMessageManage({
                            userId: this.userId,
                            msg: this.formItem.msg
                        }, (res) => {
                            this.$Message.success({content: this.vm.$t('kyc.fscg')});
                            this.$emit('removeDialog');
                        });
                    }
                });
            }
        }
    };
</script>

<style>

</style>
