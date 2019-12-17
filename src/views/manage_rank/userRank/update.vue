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
                <span>{{vm.$t('rank.jb')}}</span>
                <span>{{state(data.otcGrade)}}</span>
                <span>
                    <Select v-model="otcGrade">
                        <Option :value="0">Normal</Option>
                        <Option :value="1">Silver</Option>
                        <Option :value="2">Gold</Option>
                        <Option :value="3">Platinum</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('otcGrade')">{{vm.$t('common.bc')}}</Button></span>
            </p>

            <p>
                <span>{{vm.$t('rank.jbsfgx')}}</span>
                <span>{{data.otcGradeUpdate === 1 ? vm.$t('common.s') : vm.$t('common.f')}}</span>
                <span>
                    <Select v-model="otcGradeUpdate">
                        <Option :value="1">{{vm.$t('common.s')}}</Option>
                        <Option :value="0">{{vm.$t('common.f')}}</Option>
                    </Select>
                </span>
                <span><Button type="primary" @click="tabs('otcGradeUpdate')">{{vm.$t('common.bc')}}</Button></span>
            </p>

        </div>
    </Card>
</template>

<script>
    import rank from '../../../api/rank'

    export default {
        props: ['item'],
        data() {
            const vm = window.vm;
            return {
                vm: vm,
                data: this.item,
                otcGrade: 0,
                otcGradeUpdate: 1,
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
                rank.updateUserGrade(data, res => {
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
            state(id) {
                let list = ['Normal', 'Silver', 'Gold', 'Platinum']
                return list[id]
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
