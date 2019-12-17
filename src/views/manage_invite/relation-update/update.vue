<template>
    <Card style="width: 800px;">
        <p slot="title">{{vm.$t('invite.xgtjr')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i></p>
        <div class="cont">
            <p>
                <span>{{vm.$t('common.yhm')}}：</span>
                <span>{{name}}</span>
            </p>
            <p>
                <span>{{vm.$t('exchange.tjryqm')}}：</span>
                <span>{{item.invitedCode}}</span>
                <span><Input v-model="code" style="width: 260px;"></Input></span>
                <span><Button type="primary" @click="save()">{{vm.$t('common.bc')}}</Button></span>
            </p>
        </div>
    </Card>
</template>

<script>
    import invite from '../../../api/invite'

    export default {
        name: "update",
        props: ['item', 'name'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                code: null
            }
        },
        created() {

        },
        methods: {
            closeDialog() {
                this.$emit('okCallback');
                this.$emit('removeDialog');
            },
            save() {
                let data = this.item
                data.invitedCode = this.code
                data.username = this.name
                invite.updateRecommend(data, res => {
                    this.$Message.success({content: this.vm.$t('common.xgcg')})
                }, msg => {
                    this.$Message.error({content: msg})
                })
            }
        }

    }
</script>

<style scoped lang="less">
    .cont p {
        padding: 10px 0;
        span:first-child{
            width: 120px;
        }
    }
</style>
