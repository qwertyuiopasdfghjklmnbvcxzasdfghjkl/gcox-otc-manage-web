<template>
    <div class="operation_placard">
        <Card>
            <p slot="title">{{$t('nav.lsshcx')}}</p>
            <Row>
                <Col span="16">
                    {{$t('report.tjzb')}}
                    <Input v-model="statisticItem" clearable style="width: 200px"
                           :placeholder="$t('common.qsr')"></Input>
                    {{$t('common.cjsj')}}
                    <DatePicker type="datetime" v-model="start" :placeholder="$t('common.kssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker>
                    <DatePicker type="datetime" v-model="end" :placeholder="$t('common.jssj')"
                                format="yyyy-MM-dd HH:mm:ss"
                                style="width: 160px"></DatePicker>
                    <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                </Col>
                <Col span="8" style="text-align: right">
                    <Button type="primary" @click="outExl()">{{$t('systemlog.dc')}}</Button>
                </Col>
            </Row>
            <Table :columns="columns1" :data="data" style="margin-top: 10px"></Table>
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
                size: 20,
                total: 0,
                statisticItem: null,
                start: null,
                end: null,
                columns1: [
                    {
                        title: 'ID',
                        key: 'id'
                    },
                    {
                        title: this.$t('report.tjzb'),
                        key: 'statisticItem',
                    },
                    {
                        title: this.$t('report.tjz'),
                        key: 'value'
                    },
                    {
                        title: this.$t('common.beiz'),
                        key: 'itemDesc',
                    },
                    {
                        title: this.$t('common.cjsj'),
                        key: 'createdAt'
                    }
                ],
                data: [],
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
                    statisticItem: this.statisticItem,
                };
                data.start = this.start ? util.dateToStr(new Date(this.start)).toString() : null;
                data.end = this.end ? util.dateToStr(new Date(this.end)).toString() : null;
                this.outData = data
                reportApi.selectDailyExportData(data, (res,total) => {
                    this.data = res;
                    this.total = total;
                });
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
