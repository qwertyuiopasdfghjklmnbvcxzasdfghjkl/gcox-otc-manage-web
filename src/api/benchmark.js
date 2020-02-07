import api from './api';

export default {
    // --1.法币汇率拉取
    symbolCurrencyRateList (data, success, error) {
        api.post(`api/bm/benchPrice/symbolCurrencyRateList`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },
    // --2.交易所基准价展示
    benchMarkInfoList (data, success, error) {
        api.post(`api/bm/benchPrice/benchMarkInfoList/${data.size}/${data.page}`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },
    // --3.基准交易所
    benchMarkingList (data, success, error) {
        api.post(`api/bm/benchPrice/benchMarkingList`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    }
};
