<template>
    <Card style="width:500px;">
        <p slot="title">
            {{vm.$t('otc.yhxx')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Form style="margin:0 20px;">
            <FormItem :label="vm.$t('monitoring.yx')">{{data.email || '--'}}</FormItem>
            <FormItem :label="vm.$t('common.nc')">{{data.nickName || '--'}}</FormItem>
            <FormItem :label="vm.$t('common.sjh')">{{data.mobile || '--'}}</FormItem>
            <FormItem :label="vm.$t('otc.gj')">{{data.cn || '--'}}</FormItem>
            <FormItem :label="vm.$t('otc.zjid')">{{data.verifyIdCard || '--'}}</FormItem>
        </Form>
        <!--<Form label-position="top" style="margin:0 20px;">-->
        <!--<FormItem label="1.">-->
        <!--<span>{{data.cardBank || '&#45;&#45;'}}</span>-->
        <!--<span style="margin-left:20px">{{data.cardName || '&#45;&#45;'}}</span>-->
        <!--<span style="margin-left:20px">卡号：{{data.cardNumber || '&#45;&#45;'}}</span>-->
        <!--</FormItem>-->
        <!--</Form>-->
        <div>
            <p>{{vm.$t('otc.yhkzf')}}</p>
            <table width="100%" border="0">
                <tr v-for="item in data.bankList">
                    <td height="40">{{item.cardBank}}</td>
                    <td>{{item.cardName}}</td>
                    <td>{{item.cardNumber}}</td>
                </tr>
            </table>
        </div>
    </Card>
</template>

<script>
    import util from '../../../libs/util';
    import qs from 'qs';
    import otcApi from '../../../api/otc';

    export default {
        props: ['userId'],
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                data: {},
                imgData: []
            };
        },
        created () {
            this.getfindUserInfo();
        },
        methods: {
            getfindUserInfo () {
                otcApi.findUserInfoManage({
                    userId: this.userId
                }, (res) => {
                    this.data = res;
                });
            },
            closeDialog () {
                this.$emit('removeDialog');
            }
        }
    };
</script>

<style>

</style>
