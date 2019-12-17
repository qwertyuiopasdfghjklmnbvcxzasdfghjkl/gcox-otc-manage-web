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
                <span>{{vm.$t('kyc.sfjnbzj')}}</span>
                <span>{{data.deposit === '0' ? this.vm.$t('kyc.wjbzj'): this.vm.$t('kyc.yjbzj')}}</span>
                <span>
                    <Select v-model="deposit">
                        <Option value="1">{{vm.$t('kyc.yjbzj')}}</Option>
                        <Option value="0">{{vm.$t('kyc.wjbzj')}}</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('deposit')">{{vm.$t('common.bc')}}</Button></span>
            </p>

        </div>
    </Card>
</template>

<script>
    import kyc from '../../../api/kyc'

    export default {
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                data: this.item,
                deposit: null
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {}
                data.userId = this.item.userId
                data[name] = this[name];
                console.log(data)
                kyc.updateUserKycDeposit(data, res => {
                    this.$Message.success({content: this.vm.$t('common.xgcg')})
                    this.data[name] = this[name]
                }, msg => {
                    this.$Message.error({content: msg})
                })
            },
            closeDialog() {
                this.$emit('removeDialog');
                this.$emit('okCallback');
            },
            payWay(id){
                return this.vm.$t('otc.yhk')
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
