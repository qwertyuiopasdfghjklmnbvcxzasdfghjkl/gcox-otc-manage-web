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
                {key: 'dispenseId', title: this.vm.$t('lock.scffjlid')},
                {key: 'username', title: this.vm.$t('common.yhm')},
                {key: 'minerId', title: this.vm.$t('lock.scjlid')},
                {key: 'quantity', title: this.vm.$t('lock.ffsl'),},
                {
                    key: 'status', title: this.vm.$t('common.zt'),
                    render: (h, params) => {
                        return h('div', this.state(params.row.status))
                    }
                },
                {key: 'createdAt', title: this.vm.$t('common.cjsj')},
            ]
        },
        methods: {
            state(id) { // 0 未完成 1 已完成 ,
                let state = {
                    '0': this.vm.$t('lock.wwc'),
                    '1': this.vm.$t('lock.ywc'),
                }
                return state[id]
            }
        }

    }
</script>

<style scoped>

</style>
