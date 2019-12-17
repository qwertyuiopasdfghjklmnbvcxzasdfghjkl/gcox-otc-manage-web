<template>
    <Card style="width: 800px">
        <p slot="title">
            <span>{{vm.$t('common.xg')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}</span>
                <span>{{data.userName}}</span>
            </p>
            <p>
                <span>Taker/Maker</span>
                <span>{{data.roleName}}</span>
            </p>
            <p>
                <span>{{vm.$t('otc.kycjb')}}</span>
                <span>{{data.kycLevel}}</span>
            </p>
            <p>
                <span>{{vm.$t('otc.mmfx')}}</span>
                <span>{{data.direction == 1 ? vm.$t('exchange.m1') : vm.$t('exchange.m4')}}</span>
            </p>
            <p>
                <span>{{vm.$t('nav.qxgl')}}</span>
                <span>{{data.permission == 1 ?
                                vm.$t('exchange.zc') : vm.$t('exchange.dj')}}</span>
                <span>
                  <Select style="width:200px" v-model="permission">
                    <!--<Option value="3">{{vm.$t('common.qb')}}</Option>-->
                    <Option value="1">{{vm.$t('exchange.zc')}}</Option>
                    <Option value="0">{{vm.$t('exchange.dj')}}</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('permission')">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    import otc from '../../../api/otc'
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        name: "dialog",
        components: {Numberbox},
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                permission: null,
                data: this.item
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {
                    tradePermissionId: this.item.tradePermissionId,
                    userId: this.item.userId
                }
                data[name] = this[name];
                console.log(data)
                otc.updateOtcTradePermission(data, res => {
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
