<template>
    <Card style="width: 600px;">
        <p slot="title">
            {{vm.$t('common.xg')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Row style="margin:0 20px;">
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('common.bz')}}</Col>
                <Col span="6">{{item.symbol}}</Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('common.yhm')}}</Col>
                <Col span="6">{{item.username}}</Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('exchange.ygm')}}</Col>
                <Col span="6">{{item.purchased }}</Col>
                <Col span="6">
                    <input-number v-model="purchased"></input-number>
                </Col>
                <Col span="6">
                    <Button type="primary" style="float:right;" @click="sumbit('purchased')">{{vm.$t('common.bc')}}</Button>
                </Col>
            </Row>
            <Row style="margin-bottom:10px;">
                <Col span="3">{{vm.$t('exchange.ymc')}}</Col>
                <Col span="6">{{item.sold }}</Col>
                <Col span="6">
                    <input-number v-model="sold"></input-number>
                </Col>
                <Col span="6">
                    <Button type="primary" style="float:right;" @click="sumbit('sold')">{{vm.$t('common.bc')}}</Button>
                </Col>
            </Row>
        </Row>
    </Card>
</template>

<script>
    import currencyApi from '../../../api/currency';
    export default {
        props:['item'],
        data(){
            const vm = window.vm
            return{
                vm: vm,
                purchased: null,
                sold: null
            }
        },
        methods:{
            sumbit(id){
                console.log(data)
                let data = {
                    userId: this.item.userId,
                    statisticsId: this.item.statisticsId,
                    symbol: this.item.symbol,
                }
                data[id] = this[id]
                currencyApi.updateSymbolTransaction(data,res=>{
                    this.item[id] = this[id]
                    this.$Message.success({content: this.vm.$t('common.xgcg')});
                },msg=>{
                    this.$Message.error({content: msg});
                })
            },
            closeDialog(){
                this.$emit('okCallback')
                this.$emit('removeDialog');
            }
        }
    }
</script>

<style scoped>

</style>
