<template>
    <div>
        <Card>
            <p slot="title" style="height:auto;vertical-align:top;overflow:hidden;">
                <span style="height:32px;font-weight:normal;line-height:32px;">{{$t('nav.otcfbgl')}}</span>
            </p>
            <Table :columns="columns" :data="data" style="margin-top:10px;"></Table>
            <Page :current="page" :total="total" :page-size="size"
                  @on-change="changePage" style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>

<script>
    import system from '../../api/systemparam';
    import util from '../../libs/util';
    import dialog from './trade-rate/dialog'
    import add from './trade-rate/add'

    export default {
        data() {
            return {
                size: 10,
                page: 1,
                total: 0,
                data: [],
                columns: [
                    {title: this.$t('otc.fbid'), key: 'id'},
                    {title: this.$t('otc.fbm'), key: 'currencyCn'},
                    {title: this.$t('otc.fbdh'), key: 'currency'},
                    {title: this.$t('common.zt'),render:(h, params)=>{
                        return h('div',
                            {
                                style: {
                                    color: params.row.otcShow === 0 ? 'red': 'green'
                                }
                            },
                            params.row.otcShow === 0 ? this.$t('exchange.xs') : this.$t('exchange.sx'))
                        }},
                    {title: this.$t('common.gxsj'), key: 'updatedAt'},
                    {
                        title: this.$t('common.cz'), render: (h, params) => {
                            return h('div', [
                                h('Button', {
                                    props: {
                                        type: 'primary',
                                        size: 'small',
                                    },
                                    style: {
                                        margin: '5px'
                                    },
                                    on: {
                                        click: () => {
                                            system.updateLegalCurrency(
                                                {
                                                    otcShow: params.row.otcShow === 1 ? 0:1,
                                                    id: params.row.id
                                                },
                                                res => {
                                                    this.getList()
                                                    this.$Message.success({content: params.row.otcShow === 1 ? this.$t('operation.xscg'):this.$t('operation.sxcg')});
                                                }, msg => {
                                                    this.$Message.error({content: msg});
                                                })
                                        }
                                    }
                                }, params.row.otcShow === 1 ? this.$t('exchange.xs') : this.$t('exchange.sx')),
                            ])
                        }
                    }
                ],
            };
        },
        watch: {},
        created() {
            this.getList();
        },
        methods: {
            getList() {
                let data = {
                    page: this.page,
                    pageSize: this.size
                }
                system.listPageLegalCurrency(data, (data, total) => {
                    this.data = data;
                    this.total = total;
                    console.log(this.data)
                }, (msg) => {
                    console.error(msg);
                });
            },
            changePage(page) {
                this.page = page
                this.getList()
            },
            output() {
            }
        }
    };
</script>

<style scoped>

</style>
