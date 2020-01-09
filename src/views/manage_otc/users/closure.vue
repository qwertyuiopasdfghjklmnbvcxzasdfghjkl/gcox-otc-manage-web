<template>
    <Card style="width:400px">
        <p slot="title">
            {{vm.$t('otc.fj')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form :model="formItem">
            <FormItem :label="vm.$t('otc.jfsj')">
                <Select v-model="formItem.punishTypeId"> <!--1.警告 2.封禁24小时 3.封禁72小时 4.永久封禁-->
                    <Option value="1" name="1">{{vm.$t('otc.jg')}}</Option>
                    <Option value="2" name="2">{{vm.$t('otc.jfesh')}}</Option>
                    <Option value="3" name="3">{{vm.$t('otc.jfqsh')}}</Option>
                    <Option value="4" name="4">{{vm.$t('otc.yjjf')}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="vm.$t('otc.fjyy')"><!--1.申诉失败 2.恶意买卖 3.欺诈行为 4.其他-->
                <Select v-model="formItem.frozenReasonTypeId">
                    <Option value="1">{{vm.$t('otc.sssb')}}</Option>
                    <Option value="2">{{vm.$t('otc.eymm')}}</Option>
                    <Option value="3">{{vm.$t('otc.qzxw')}}</Option>
                    <Option value="4">{{vm.$t('otc.qt')}}</Option>
                </Select>
            </FormItem>
            <FormItem :label="vm.$t('otc.fjyysm')">
                <Input v-model="formItem.frozenReason" type="textarea" :rows="4"></Input>
            </FormItem>
            <FormItem>
                <Button type="primary" style="width:100%;" @click="bannedTab()">{{vm.$t('common.qd')}}</Button>
            </FormItem>
        </Form>
    </Card>
</template>

<script>
    import otcApi from '../../../api/otc';

    export default {
        props: ['userId', 'curPage'],
        data () {
            const vm = window.vm
            return {
                vm: vm,
                formItem: {
                    punishTypeId: '1',
                    frozenReasonTypeId: '1',
                    frozenReason: ''
                },
                reason1: [],
                reason2: []
            };
        },
        methods: {
            frozen () {
                otcApi.findFrozenConditionManage((res) => {
                    this.reason1 = res;
                });
            },
            closeDialog () {
                this.$emit('removeDialog');
            },
            bannedTab () {
                otcApi.frozenUserManage({
                    userId: this.userId,
                    punishTypeId: this.formItem.punishTypeId,
                    frozenReasonTypeId: this.formItem.frozenReasonTypeId,
                    frozenReason: this.formItem.frozenReason
                }, (res) => {
                    this.$Message.success({content: this.$t('otc.jfcg')});
                    this.$emit('removeDialog');
                    this.$emit('okCallback');
                }, (msg) => {
                    this.$Message.error({content: msg});
                });
            }
        }
    };
</script>

<style>

</style>
