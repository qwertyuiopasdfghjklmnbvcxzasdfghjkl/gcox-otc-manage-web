<template>
    <Card style="width: 800px">
        <p slot="title">
            <span>{{vm.$t('common.xg')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}</span>
                <span>{{data.username}}</span>
            </p>
            <p>
                <span>{{vm.$t('common.bz')}}</span>
                <span>{{data.symbol}}</span>
            </p>
            <p>
                <span>{{vm.$t('otc.kycjb')}}</span>
                <span>{{data.kycLevel}}</span>
            </p>
            <p>
                <span>{{vm.$t('nav.tbxe')}}</span>
                <span>{{data.quoto}}</span>
                <span>
                    <numberbox v-model="quoto" style="border: 1px solid #9e9e9e"/>
                </span>
                <span><Button type="primary" @click="tabs('quoto')">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    import finance from '../../../api/finance'
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        name: "dialog",
        components: {Numberbox},
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                quoto: null,
                data: this.item
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {
                    id: this.item.id,
                    userId: this.item.userId,
                    // symbol: this.item.symbol,
                    // username: this.item.username,
                }
                data[name] = this[name];
                console.log(data)
                finance.updateWithdrawPermission(data, res => {
                    this.$Message.success({content: res})
                    this.data[name] = this[name]
                }, msg => {
                    this.$Message.error({content: msg})
                })
            },
            closeDialog() {
                this.$emit('removeDialog');
                this.$emit('okCallback');
            }
        }
    }
</script>

<style scoped lang="less">
    .cont {
        p {
            display: flex;
            align-items: center;
            justify-content: flex-start;
            margin: 10px 0;

            span:first-child {
                width: 150px;
            }

            span:nth-child(2) {
                width: 200px;
            }

            span:nth-child(3) {
                width: 300px;
            }

            span:nth-child(4) {
                width: 100px;
                padding: 0 10px;
            }
        }
    }
</style>
