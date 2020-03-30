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
                <span>{{vm.$t('finance.lx')}}</span>
                <span>{{payWay(data.payType)}}</span>
            </p>
            <p>
                <span>{{vm.$t('common.xm')}}</span>
                <span>{{data.cardName}}</span>
                <span>
                   <Input v-model="cardName"/>
                </span>
                <span><Button type="primary" @click="tabs('cardName')">{{vm.$t('common.bc')}}</Button></span>
            </p>
            <p>
                <span>{{vm.$t('common.zh')}}</span>
                <span>{{data.cardNumber}}</span>
                <span>
                   <Input v-model="cardNumber"/>
                </span>
                <span><Button type="primary" @click="tabs('cardNumber')">{{vm.$t('common.bc')}}</Button></span>
            </p>
            <p>
                <span>{{vm.$t('otc.khh')}}</span>
                <span>{{data.cardBank}}</span>
                <span>
                   <Input v-model="cardBank"/>
                </span>
                <span><Button type="primary" @click="tabs('cardBank')">{{vm.$t('common.bc')}}</Button></span>
            </p>
            <p>
                <span>{{vm.$t('otc.sfsx')}}</span>
                <span>{{data.invalid == 0 ? vm.$t('system.sx') : vm.$t('system.bsx')}}</span>
                <span>
                    <Select v-model="invalid">
                        <Option value="0">{{vm.$t('system.sx')}}</Option>
                        <Option value="1">{{vm.$t('system.bsx')}}</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('invalid')">{{vm.$t('common.bc')}}</Button></span>
            </p>

        </div>
    </Card>
</template>

<script>
    import otc from '../../../api/otc'

    export default {
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                data: this.item,
                cardName: null,
                cardNumber: null,
                cardBank: null,
                invalid: null,
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {}
                data.userId = this.item.userId
                data[name] = this[name];
                data.id = this.item.id
                console.log(data)
                otc.updateOtcPayType(data, res => {
                    this.$Message.success({content: res})
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
