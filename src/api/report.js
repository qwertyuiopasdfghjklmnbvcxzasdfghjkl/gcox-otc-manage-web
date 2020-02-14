import api from './api';

let report = {
    // 报表文件列表
    getFileList (data, success, error) {
        api.get('api/bm/statistic/files', data, (res) => {
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        }, error);
    },

    // 历史数据查询
    selectDailyExportData (data, success, error) {
        api.post(`api/bm/otcManage/selectDailyExportData/${data.size}/${data.page}`, data, (res) => {
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        }, error);
    },

    // 统计指标管理
    selectDailyStatistic (data, success, error) {
        api.post(`api/bm/otcManage/selectDailyStatistic/${data.size}/${data.page}`, data, (res) => {
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        }, error);
    },

    // 新增/修改统计指标管理
    insertOrUpdateDailyStatistic (data, success, error) {
        api.post(`api/bm/otcManage/insertOrUpdateDailyStatistic`, data, (res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error);
    },

    // 新增手续费详情表 /api/bm/feeDetails/selectFeeDetailsPage
    selectFeeDetailsPage (data, success, error) {
        api.post(`api/bm/feeDetails/selectFeeDetailsPage`, data, (res) => {
            if (res.rst === 1) {
                success && success(res.data,res.total);
            } else {
                error && error(res.msg);
            }
        }, error);
    },


};

export default report;
