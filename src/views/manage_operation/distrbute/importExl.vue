<template>
    <Card style="width:600px;">
        <p slot="title">
            {{vm.$t('operation.plff')}}
            <i class="ivu-icon ivu-icon-close" style="float:right;cursor:pointer;" @click="closeDialog"></i>
        </p>
        <div class="file">
            <p>{{vm.$t('operation.scwj')}}：<input type="file" ref="exl" @change="getFile()"/></p>
            <Button @click="push()" type="primary">{{vm.$t('operation.scbff')}}</Button>
        </div>
        <div class="tab">
            <Spin fix v-show="load">
                <Icon type="load-c" size=18 class="demo-spin-icon-load"></Icon>
                <div>{{vm.$t('operation.ffz')}}</div>
            </Spin>
            <Table v-if="data.length" :columns="columns" :data="data" style="margin-top:20px;"></Table>
        </div>
    </Card>
</template>

<script>
    import extendApi from '../../../api/extend';

    export default {
        name: 'importExl',
        data () {
            let vm = window.vm;
            return {
                vm: vm,
                file: null,
                page: 1,
                size: 10,
                total: 0,
                data: [],
                columns: [
                    {title: vm.$t('common.yhm'), key: 'username'},
                    {title: vm.$t('common.bz'), key: 'symbol'},
                    {title: vm.$t('common.sl'), key: 'quantity'},
                    {title: vm.$t('finance.sbyy'), key: 'msg'},
                ],
                load: false,
            };
        },
        created () {

        },
        methods: {
            closeDialog () {
                this.$emit('removeDialog');
                this.$emit('okCallback');
            },
            getFile () {
                this.file = this.$refs.exl.files[0];
            },
            push () {
                let file = new FormData();
                if (!this.file) {
                    this.$Message.error({content: this.vm.$t('operation.qxzwj')});
                    return
                }
                file.append('file', this.file);
                this.load = true
                extendApi.batchDistribute(file, res => {
                    this.data = res;
                    this.load = false
                }, msg => {
                    this.$Message.error({content: msg});
                });
            }
        }
    };
</script>

<style scoped lang="less">
    .file {
        display: flex;
        align-items: center;
        justify-content: space-between;
    }

    .demo-spin-icon-load {
        animation: ani-demo-spin 1s linear infinite;
    }

    @keyframes ani-demo-spin {
        from {
            transform: rotate(0deg);
        }
        50% {
            transform: rotate(180deg);
        }
        to {
            transform: rotate(360deg);
        }
    }
</style>
