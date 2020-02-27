<template>
    <div class="operation_placard">
        <Card>
            <p slot="title">{{$t('report.sxfxqb')}}</p>
            <Row>
                <Col span="16">
                    {{$t('common.yhm')}}
                    <Input v-model="userName" clearable style="width: 200px"
                           :placeholder="$t('common.qsr')"></Input>
                    <!-- {{$t('common.cjsj')}} -->
                    <!-- <DatePicker type="datetime" v-model="start" :placeholder="$t('common.kssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker>
                    <DatePicker type="datetime" v-model="end" :placeholder="$t('common.jssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker> -->
                    <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                </Col>
                <!-- <Col span="8" style="text-align: right">
                    <Button type="primary" @click="outExl()">{{$t('systemlog.dc')}}</Button>
                </Col> -->
            </Row>
            <Table :columns="columns1" :data="data1" style="margin-top: 10px"></Table>
            <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                  style="text-align:center;margin-top:20px;"></Page>
        </Card>
    </div>
</template>
<script>
    import reportApi from '../../api/report';
    import util from '../../libs/util';

    export default {
        data () {
            return {
                page: 1,
                size: 10,
                total: 0,
                userName: null,
                start: null,
                end: null,
                columns1: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: this.$t('mall.ddid'),
                        key: 'orderId',
                    },
                    {
                        title: this.$t('report.sxffx'),
                        key: 'direction',
                        render: (h, params) => {
                            return h('div', this.directionSwith(params.row.direction))
                        }
                    },
                    {
                        title: this.$t('common.yhm'),
                        key: 'userName',
                    },
                    {
                        title: this.$t('system.yhid'),
                        key: 'userId',
                    },
                    {
                        title: this.$t('system.zhid'),
                        key: 'accountId',
                    },
                    {
                        title: this.$t('report.sxfsl'),
                        key: 'amount',
                    },
                    {
                        title: this.$t('report.sxfbz'),
                        key: 'symbol',
                    },
                    {
                        title: this.$t('common.cjsj'),
                        key: 'createdAt'
                    }
                ],
                data1: [],
                outData: {}
            };
        },
        created () {
            this.getList();
        },
        methods: {
            getList () {
                let data = {
                    size: this.size,
                    page: this.page,
                    userName: this.userName,
                };
                // data.start = this.start ? util.dateToStr(new Date(this.start)).toString() : null;
                // data.end = this.end ? util.dateToStr(new Date(this.end)).toString() : null;
                this.outData = data
                reportApi.selectFeeDetailsPage(data, (res,total) => {
                    this.data1 = res;
                    this.total = total;
                });
            },
            directionSwith(dir){
                let d = {
                    1: '收入',
                    2: '支出'
                }
                return d[dir]
            },
            changePage (e) {
                this.page = e;
                this.getList();
            },
            outExl(){
                util.outExl('api/bm/otcManage/exportDailyDataExcel', this.outData)
            }
        }
    };
</script>
