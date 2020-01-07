<template>
    <Card style="width: 800px">
        <p slot="title">
            <span>{{vm.$t('common.xg')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div class="cont">
            <p>
                <span>{{vm.$t('otc.khh')}}</span>
                <span>{{data.userName}}</span>
            </p>
            <p>
                <span>{{vm.$t('otc.dyfb')}}</span>
                <span>{{data.permission}}</span>
                <span>
                  <Select style="width:200px" v-model="permission">
                    <Option value="1">{{vm.$t('exchange.zc')}}</Option>
                    <Option value="0">{{vm.$t('exchange.dj')}}</Option>
                    </Select>
                </span>
                <span>
                    <Button type="primary" @click="tabs('permission')">{{vm.$t('common.bc')}}</Button>
                </span>
            </p>

            <p>
                <span>{{vm.$t('common.zt')}}</span>
                <span>{{data.permission}}</span>
                <span>
                  <numberbox v-model="userName" :accuracy="0" :maxLength="250"/>
                </span>
                <span>
                    <Button type="primary" @click="tabs('permission')">{{vm.$t('common.bc')}}</Button>
                </span>
            </p>

            <p>
                <span>{{vm.$t('common.zt')}}</span>
                <span>{{data.permission}}</span>
                <span>
                  <Select v-model="direction">
                        <Option :value="1">{{vm.$t('system.sx')}}</Option>
                        <Option :value="2">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </span>
                <span>
                    <Button type="primary" @click="tabs('permission')">{{vm.$t('common.bc')}}</Button>
                </span>
            </p>
        </div>
    </Card>
</template>

<script>
    import otc from '../../../api/otc';
    import Numberbox from '../../components/dialog/numberbox';

    export default {
        name: 'dialog',
        components: {Numberbox},
        props: ['item'],
        data () {
            const vm = window.vm;
            return {
                vm: vm,
                permission: null,
                direction: null,
                userName: null,
                data: this.item
            };
        },
        created () {

        },
        methods: {
            tabs (name) {
                let data = {
                    tradePermissionId: this.item.tradePermissionId,
                    userId: this.item.userId
                };
                data[name] = this[name];
                console.log(data);
                otc.updateOtcTradePermission(data, res => {
                    this.$Message.success({content: res});
                    this.data[name] = this[name];
                }, msg => {
                    this.$Message.error({content: msg});
                });
            },
            closeDialog () {
                this.$emit('removeDialog');
                this.$emit('okCallback');
            }
        }
    };
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
