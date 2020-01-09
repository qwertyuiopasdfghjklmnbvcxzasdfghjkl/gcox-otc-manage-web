<template>
    <Card class="manage_otc_appeals_handle" style="width:600px;">
        <p slot="title">
            {{vm.$t('risk.cl')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <Row class="manage_otc_appeals_handle_row" type="flex">
            <div class="manage_otc_appeals_info_row_title">{{vm.$t('otc.ssr')}}</div>
            <div style="padding-left:10px;">
                <input type="radio" v-model="checkfromUserId" name="radio" value="1">{{vm.$t('otc.hs')}}
                <span style="margin-left:20px;">{{vm.$t('risk.cl')}}</span>
                <Select v-model="punishTypeId1" style="width:200px">
                    <Option value="0">{{vm.$t('common.w')}}<Option>
                    <Option value="1">{{vm.$t('otc.fsjg')}}</Option>
                    <Option value="2">{{vm.$t('otc.jfesh')}}</Option>
                    <Option value="3">{{vm.$t('otc.jfqsh')}}</Option>
                    <Option value="4">{{vm.$t('otc.yjjf')}}</Option>
                </Select>
            </div>
        </Row>
        <Row class="manage_otc_appeals_handle_row" type="flex">
            <div class="manage_otc_appeals_info_row_title">{{vm.$t('otc.bssr')}}</div>
            <div style="padding-left:10px;">
                <input type="radio" v-model="checkfromUserId" name="radio" value="2">{{vm.$t('otc.hs')}}
                <span style="margin-left:20px;">{{vm.$t('risk.cl')}}</span>
                <Select v-model="punishTypeId2" style="width:200px">
                    <Option value="0">{{vm.$t('common.w')}}</Option>
                    <Option value="1">{{vm.$t('otc.fsjg')}}</Option>
                    <Option value="2">{{vm.$t('otc.jfesh')}}</Option>
                    <Option value="3">{{vm.$t('otc.jfqsh')}}</Option>
                    <Option value="4">{{vm.$t('otc.yjjf')}}</Option>
                </Select>
            </div>
        </Row>
        <Row type="flex" justify="center" style="height:50px;">
            <Button type="primary" style="width:200px;margin:8px 0;" @click="getupdateHandle()">{{vm.$t('otc.qd')}}</Button>
        </Row>
    </Card>
</template>

<script>
    import otcApi from '../../../api/otc';

    export default {
        props: ['winUserId', 'msgNumber', 'oppositeUserId', 'userId', 'type', 'appealManageId'],
        data () {
            let vm = window.vm;
            return {
                vm: vm,
                model6: '0',
                checkfromUserId: '1',
                punishTypeId1: null,
                punishTypeId2: '0',
                showData: []
            };
        },
        created () {
            this.geAppealResult();
        },
        methods: {
            geAppealResult () {
                otcApi.showAppealResult({
                    appealManageId: this.appealManageId
                }, (res) => {
                    this.showData = res;
                    if (this.type !== 'chuli') {
                        if (this.showData.winUserId === this.showData.oppositeUserId) {
                            this.checkfromUserId = 2;
                            this.punishTypeId1 = this.showData.punishTypeId;
                        } else if (this.showData.winUserId === this.showData.userId) {
                            this.checkfromUserId = 1;
                            this.punishTypeId2 = this.showData.punishTypeId;
                        }
                        this.$emit('okCallback');
                    } else {
                        return;
                    }
                });
            },
            closeDialog () {
                this.$emit('removeDialog');
            },
            getupdateHandle () {
                if (Number(this.checkfromUserId) === 1) {
                    otcApi[this.type !== 'chuli' ? 'updateHandle' : 'appealHandleFirst']({
                        winUserId: this.userId,
                        punishTypeId: this.punishTypeId2,
                        msgNumber: this.msgNumber,
                        appealManageId: this.appealManageId
                    }, (res) => {
                        this.$Message.success({content: this.vm.$t('common.xgcg')});
                        this.$emit('okCallback');
                        this.$emit('removeDialog');
                    }, (msg) => {
                        this.$Message.error({content: msg});
                    });
                } else if (Number(this.checkfromUserId) === 2) {
                    otcApi[this.type !== 'chuli' ? 'updateHandle' : 'appealHandleFirst']({
                        winUserId: this.oppositeUserId,
                        punishTypeId: this.punishTypeId1,
                        msgNumber: this.msgNumber,
                        appealManageId: this.appealManageId,
                    }, (res) => {
                        this.$Message.success({content: this.vm.$t('common.xgcg')});
                        this.$emit('okCallback');
                        this.$emit('removeDialog');
                    }, (msg) => {
                        this.$Message.error({content: msg});
                    });
                } else {
                    otcApi.updateHandle({
                        winUserId: this.checkfromUserId,
                        punishTypeId: this.punishTypeId2,
                        msgNumber: this.msgNumber
                    }, (res) => {
                        this.$Message.success({content: this.vm.$t('common.xgcg')});
                        this.$emit('removeDialog');
                    }, (msg) => {
                        this.$Message.error({content: msg});
                    });
                }

            }
        }
    };
</script>

<style lang="less">
    .manage_otc_appeals_handle .ivu-card-body {
        padding: 0px;
    }

    .manage_otc_appeals_handle_row {
        height: 100px;
        line-height: 100px;
        border-bottom: 1px #ccc solid;
        font-size: 20px;
    }

    .manage_otc_appeals_handle_row_title {
        width: 150px;
        text-align: center;
        border-right: 1px solid #ccc;
    }

    .manage_otc_appeals_handle_row .ivu-radio-large.ivu-radio-wrapper, .manage_otc_appeals_handle_row .ivu-radio-large .ivu-radio-wrapper {
        font-size: 20px;
    }
</style>
