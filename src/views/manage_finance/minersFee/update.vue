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
            <span>{{item.address}}</span>
        </p>
        <p>
            <span>{{vm.$t('finance.ffsl')}}</span>
            <span><InputNumber v-model="amount" :min="0.001" style="width: 300px"/></span>
        </p>
        <p style="justify-content: center">
            <Button type="primary" @click="submit()">{{vm.$t('common.bc')}}</Button>
        </p>
    </Card>
</template>

<script>
    import otcApi from '../../../api/otc';

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
            closeDialog () {
                this.$emit('removeDialog');
            },
            submit () {
                let data = {
                    username: this.item.username,
                    symbol: this.item.symbol,
                    address: this.item.address,
                    number: this.amount
                };
                otcApi.distributeFee(data, res => {
                    this.$Message.success({content: this.vm.$t('operation.ffcg')});
                    this.$emit('okCallback');
                    this.$emit('removeDialog');
                }, msg => {
                    this.$Message.error({content: msg});
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .market_setting {
        p {
            margin-bottom: 10px;
            display: flex;
            align-items: center;
            justify-content: space-between;

            span:first-child {
                width: 120px;
            }

            span:last-child {
                flex: 1;
            }
        }
    }

</style>
