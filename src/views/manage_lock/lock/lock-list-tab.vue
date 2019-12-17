<template>
    <div>
        <Table :columns="column" :data="data"></Table>
    </div>
</template>

<script>
    export default {
        props: ['data'],
        data() {
            const vm = window.vm
            return {
                vm: vm,
                column: []
            }
        },
        created() {
            this.column = [
                {key: 'minerId', title: this.vm.$t('lock.scjlid')},
                {key: 'username', title: this.vm.$t('common.yhm')},
                {key: 'amount', title: this.vm.$t('lock.scsl')},
                {
                    key: 'type', title: this.vm.$t('lock.sclx'),
                    render: (h, params) => {
                        return h('div', this.sw(params.row.type))
                    }
                },
                {key: 'giveAmount', title: this.vm.$t('lock.yff')},
                {
                    key: 'status', title: this.vm.$t('common.zt'),
                    render: (h, params) => {
                        return h('div', this.state(params.row.status))
                    }
                },
                {key: 'createAt', title: this.vm.$t('common.cjsj')},
            ]
        },
        methods: {
            sw(id) { // 1用户锁仓，2 锁仓系统奖励 ， 3 注册奖励， 4 推荐新用户奖励， 5 推荐用户锁仓奖励 ,
                let state = {
                    1: this.vm.$t('exchange.yhsc'),
                    2: this.vm.$t('exchange.scxtjl'),
                    3: this.vm.$t('exchange.zhucejl'),
                    4: this.vm.$t('exchange.tjxyhjl'),
                    5: this.vm.$t('exchange.tjyhscjl'),
                }
                return state[id]
            },
            state(id) { //-1 , 0 未挖完，1 已挖完
                let state = {
                    '-1': this.vm.$t('lock.www'),
                    '0': this.vm.$t('lock.www'),
                    '1': this.vm.$t('lock.yww'),
                }
                return state[id]
            }
        }

    }
</script>

<style scoped>

</style>
