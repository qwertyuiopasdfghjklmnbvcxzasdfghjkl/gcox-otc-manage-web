<template>
    <Card>
        <p slot="title">{{$t('exchange.jysjtj')}}</p>
        <Table :columns="columns" :data="data"></Table>
    </Card>
</template>

<script>
    import lock from '../../api/lock'

    export default {
        data() {
            return {
                page: 1,
                total: 0,
                size: 10,
                data: [],
                columns: [
                    {key: 'userCount', title: this.$t('lock.zscyh')},
                    {key: 'voteCount', title: this.$t('lock.zscbs')},
                    {key: 'voteAmount', title: this.$t('lock.zscje')},
                    {key: 'dailyUserCount', title: this.$t('lock.rxzscyh')},
                    {key: 'dailyVoteCount', title: this.$t('lock.rxzscbs')},
                    {key: 'dailyVoteAmount', title: this.$t('lock.rxzscje')},
                ],
            }
        },
        created() {
            this.getList()
        },
        methods: {
            getList() {
                lock.getStatistics( res => {
                    this.data = [res.data];
                })
            },
        }
    }
</script>

<style scoped>

</style>
