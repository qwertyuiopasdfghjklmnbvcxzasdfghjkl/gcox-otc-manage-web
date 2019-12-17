<template>
    <Card style="width: 800px">
        <p slot="title">
            <span>{{vm.$t('common.xg')}}</span>
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div class="cont">
            <p>
                <span>{{vm.$t('rank.yhjb')}}</span>
                <span>{{data.grade}}</span>
            </p>

            <p>
                <span>{{vm.$t('rank.jbmc')}}</span>
                <span>{{data.name}}</span>
                <span>
                    <Input v-model="name"/>
                </span>
                <span><Button type="primary" @click="tabs('name')">{{vm.$t('common.bc')}}</Button></span>
            </p>

            <p>
                <span>{{vm.$t('rank.zxjyl')}}≥</span>
                <span>{{data.minVolume}}</span>
                <span>
                    <numberbox v-model="minVolume"/>
                </span>
                <span><Button type="primary" @click="tabs('minVolume')">{{vm.$t('common.bc')}}</Button></span>
            </p>
            <p>
                <span>{{vm.$t('rank.zk')}}</span>
                <span>{{data.discount}}</span>
                <span>
                    <numberbox v-model="discount"/>
                </span>
                <span><Button type="primary" @click="tabs('discount')">{{vm.$t('common.bc')}}</Button></span>
            </p>

        </div>
    </Card>
</template>

<script>
    import rank from '../../../api/rank'
    import Numberbox from "../../components/dialog/numberbox";

    export default {
        components: {Numberbox},
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                data: this.item,
                name: null,
                minVolume: null,
                discount: null,
            }
        },
        created() {

        },
        methods: {
            tabs(name) {
                let data = {}
                data.grade = this.item.grade
                data[name] = this[name];
                console.log(data)
                rank.updateGrade(data, res => {
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
