import api from './api'
let lock = {
    // 锁仓数据统计
    getStatistics( success, error){
        api.get(`api/bm/stake/statistics`,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },

    // 挖矿帐户列表
    getAccounts(data, success, error){
        api.get(`api/bm/stake/accounts`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 锁仓记录
    getRecord(data, success, error){
        api.get(`api/bm/stake/record`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    },
    // 分发记录
    getDispense(data, success, error){
        api.get(`api/bm/stake/dispense/record`,data,(res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg);
            }
        }, error)
    }
}
export default lock
