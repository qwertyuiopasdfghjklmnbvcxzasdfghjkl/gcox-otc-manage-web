<template>
    <Card class="market_setting" style="width:500px;">
        <p slot="title">
            {{vm.$t('finance.ffkgf')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <p>
            <span>{{vm.$t('common.yhm')}}</span>
            <span>{{item.username}}</span>
        </p>
        <p>
            <span>{{vm.$t('common.bz')}}</span>
            <span>{{item.symbol}}</span>
        </p>
        <p>
            <span>{{vm.$t('finance.mbdz')}}</span>
            <span>{{item.symbol}}</span>
        </p>
        <p>
            <span>{{vm.$t('finance.ffsl')}}</span>
            <span><InputNumber v-model="amount" :min="0.001" style="width: 300px"/></span>
        </p>
        <p style="justify-content: center">
            <Button type="primary">{{vm.$t('common.bc')}}</Button>
        </p>
    </Card>
</template>

<script>
    export default {
        props: ['item'],
        data () {
            let vm = window.vm;
            return {
                vm: vm,
                amount: null
            };
        },
        created () {

        },
        methods: {
            closeDialog(){
                this.$emit('removeDialog');
            }
        }
    };
</script>

<style scoped lang="less">
    .market_setting{
        p{
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;
            span:first-child{
                width: 120px;
            }
            span:last-child{
                flex: 1;
            }
        }
    }

</style>
