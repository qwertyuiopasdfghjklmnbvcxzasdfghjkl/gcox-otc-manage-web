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
                <span>{{vm.$t('exchange.fx')}}</span>
                <span>{{data.role == 1 ? 'Taker': 'Maker'}}</span>
            </p>
            <p>
                <span>{{vm.$t('system.yhjbsfsx')}}</span>
                <span>{{data.discountByGrade == 1 ? vm.$t('system.sx') : vm.$t('system.bsx')}}</span>
                <span>
                    <Select v-model="discountByGrade">
                        <Option value="1">{{vm.$t('system.sx')}}</Option>
                        <Option value="0">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('discountByGrade')">{{vm.$t('common.bc')}}</Button></span>
            </p>
            <p>
                <span>{{vm.$t('system.fl')}}</span>
                <span>{{data.rate}}</span>
                <span>
                   <InputNumber style="width:100%" v-model="rate"/>
                </span>
                <span><Button type="primary" @click="tabs('rate')">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    import system from '../../../api/systemparam'
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        name: "dialog",
        components: {Numberbox},
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                discountByGrade: null,
                rate: null,
                data: this.item
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {
                    role: this.item.role,
                    userId: this.item.userId,
                    symbol: this.item.symbol,
                    // username: this.item.username,
                }
                data[name] = this[name];
                console.log(data)
                system.updateOtcTransactionRate(data, res => {
                    this.$Message.success({content: res.msg})
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
