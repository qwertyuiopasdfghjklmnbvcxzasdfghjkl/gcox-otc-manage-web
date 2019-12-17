<!-- 交易量查询 -->
<template>
    <Row>
        <Col span="24">
            <Row>
                <Card>
                    <p slot="title">
                        <Col span="16">
                            {{$t('nav.jylcx')}}
                        </Col>
                        <Col span="8">
                            <Button type="primary" style="float:right;" @click="outExl()">{{$t('systemlog.dc')}}</Button>
                        </Col>
                    </p>
                    <p style="margin-bottom: 20px">
                        {{$t('common.yhm')}}：
                        <Input v-model="username" style="width: 160px"></Input>
                        {{$t('common.sj')}}
                        <DatePicker type="datetime" v-model="form.createdAtStart" :placeholder="$t('common.kssj')"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 160px"></DatePicker>
                        <DatePicker type="datetime" v-model="form.createdAtEnd" :placeholder="$t('common.jssj')"
                                    format="yyyy-MM-dd HH:mm:ss"
                                    style="width: 160px"></DatePicker>
                        {{$t('rank.lscjl')}}
                        <!-- <Input v-model="totalAmount" style="width: 160px"></Input> -->
                        <Select style="width:175px" v-model="volumeLevel">
                            <Option value="">{{$t('common.qb')}}</Option>
                            <Option :value="1">{{$t('systemlog.dylxywq')}}</Option>
                            <Option :value="2">{{$t('systemlog.dywqxyyw')}}</Option>
                            <Option :value="3">{{$t('systemlog.dyywxylw')}}</Option>
                            <Option :value="4">{{$t('systemlog.dylw')}}</Option>
                        </Select>

                        <Button type="primary" @click="page=1;getList()">{{$t('common.cx')}}</Button>
                    </p>
                    <Table :columns="columns" :data="data" style="margin-top: 20px;"></Table>
                    <Page :current="page" :total="total" :page-size="size" @on-change="changePage"
                          style="text-align:center;margin-top:20px;"></Page>
                </Card>
            </Row>
        </Col>
    </Row>
</template>

<script>
    import util from '../../libs/util';
    import update from './userRank/update.vue';
    import rank from '../../api/rank';

    export default {
        data() {
            return {
                page: 1,
                size: 10,
                total: 0,
                username: null,
                totalAmount: null,
                volumeLevel: null,
                form:{
                    createdAtStart: null,
                    createdAtEnd: null
                },
                columns: [
                    {title: this.$t('system.yhid'), key: 'userId'},
                    {title: this.$t('common.yhm'), key: 'username'},
                    {title: this.$t('rank.yf'), key: 'month'},
                    {title: this.$t('rank.jylusd'), key: 'totalAmount'},
                ],
                data: [],
                outDate: {}
            };
        },
        created() {
            this.getList();
        },
        methods: {
            getList() {

                let data = {
                    page: this.page,
                    size: this.size,
                    // otcGrade: this.otcGrade === 5 ? '' : this.otcGrade,
                    // otcGradeUpdate: this.otcGradeUpdate === 5 ? '' : this.otcGradeUpdate,
                    username: this.username,
                    volumeLevel: this.volumeLevel,
                    createdAtStart: this.form.createdAtStart,
                    createdAtEnd: this.form.createdAtEnd
                };
                data.createdAtStart = data.createdAtStart ? util.dateToStr(new Date(data.createdAtStart)) : null;
                data.createdAtEnd = data.createdAtEnd ? util.dateToStr(new Date(data.createdAtEnd)) : null;
                this.outDate = data
                rank.listTransactionAmount(data, (res, total) => {
                    this.data = res;
                    this.total = total;
                });
            },
            changePage(page) {
                this.page = page;
                this.getList();
            },
            outExl() {
                //GET /userGrade/exportTransactionAmountExcel
                // 导出总交易量报表
                util.outExl('api/bm/userGrade/exportTransactionAmountExcel', this.outDate)
            },
            state(id) {
                let list = ['Normal', 'Silver', 'Gold', 'Platinum']
                return list[id]
            }
        }
    };
</script>

<style lang="less" scoped>
    .refresh {
        width: 49px;
        height: 24px;
        background: url(../../images/frsh.png) center/cover no-repeat;
        background-size: contain;
        cursor: pointer;
        color: #2d8cf0;
    }

    .ivu-table-sort i {
        display: none;
    }

    .ivu-table-cell .ivu-table-sort i:first-child {
        display: none;
    }

    .ivu-card-head-inner, .ivu-card-head p {
        display: flex !important;
        justify-content: space-between !important;
        height: 40px !important;
        line-height: 40px !important;
    }
</style>
