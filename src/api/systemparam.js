import api from './api';

let system = {};

// 系统参数设置--查找系统参数记录
const findSysParam = function (success, error) {
    api.post('api/bm/sysParam/findSysParam', (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.findSysParam = findSysParam;

// 系统参数设置--保存系统参数
const saveSysParam = function (data, success, error) {
    api.post('api/bm/sysParam/saveSysParam', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.saveSysParam = saveSysParam;

// 系统参数设置--查询交易所手续费账户
const findAdminAccounts = function (pageSize, curPage, data, success, error) {
    api.post(`api/bm/sysParam/findAdminAccounts/${pageSize}/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.findAdminAccounts = findAdminAccounts;

// 系统参数设置--新增交易所手续费账户
const addAdminAccounts = function (data, success, error) {
    api.post('api/bm/sysParam/addAdminAccounts', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.addAdminAccounts = addAdminAccounts;

// 系统参数设置--修改交易所手续费账户
const updateAdminAccounts = function (data, success, error) {
    api.post('api/bm/sysParam/updateAdminAccounts', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.updateAdminAccounts = updateAdminAccounts;

// 系统参数设置--查找提币主地址账户
const findAdminCoinPools = function (pageSize, curPage, data, success, error) {
    api.post(`api/bm/sysParam/findAdminCoinPools/${pageSize}/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.findAdminCoinPools = findAdminCoinPools;

// 系统参数设置--新增提币主地址账户
const addAdminCoinPools = function (data, success, error) {
    api.post('api/bm/sysParam/addAdminCoinPools', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.addAdminCoinPools = addAdminCoinPools;

// 系统参数设置--修改提币主地址账户
const updateAdminCoinPools = function (data, success, error) {
    api.post('api/bm/sysParam/updateAdminCoinPools', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.updateAdminCoinPools = updateAdminCoinPools;

// 系统参数设置--查找提币主地址账户
const findCollectConfig = function (curPage, data, success, error) {
    api.get(`api/bm/sysParam/findCollectConfig/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.findCollectConfig = findCollectConfig;

// 系统参数设置--查找提币主地址账户
const addConfig = function (data, success, error) {
    api.post(`api/bm/sysParam/addConfig`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.addConfig = addConfig;

// 系统参数设置--上传图片logo
const updateAdminImg = function (data, success, error) {
    api.post('api/bm/sysParam/saveSysParamFile', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.error);
        }
    }, error);
};
system.updateAdminImg = updateAdminImg;

// 特殊用户列表
const getAccounts = function (data, success, error) {
    api.get('api/bm/special/users', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.getAccounts = getAccounts;


// 新增特殊用户
const addAccount = function (data, success, error) {
    api.post('api/bm/special/user', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.addAccount = addAccount;

// 删除特殊用户
const deleteAccounts = function (data, success, error) {
    api.delete(`api/bm/special/user?specialUserId=${data}`, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.deleteAccounts = deleteAccounts;

// 修改特殊用户
const updataAccounts = function (data, success, error) {
    api.put(`api/bm/special/user`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.updataAccounts = updataAccounts;

// 分页查询OTC交易费率
const listPageOtcTransactionRate = function (data, success, error) {
    api.post(`api/bm/sysParam/transactionSettings/listPageOtcTransactionRate/${data.pageSize}/${data.page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.listPageOtcTransactionRate = listPageOtcTransactionRate;

// 新增OTC交易费率
const insertOtcTransactionRate = function (data, success, error) {
    api.post('api/bm/sysParam/transactionSettings/insertOtcTransactionRate', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.insertOtcTransactionRate = insertOtcTransactionRate;

// 删除OTC交易费率
const deleteOtcTransactionRate = function (data, success, error) {
    api.post('api/bm/sysParam/transactionSettings/deleteOtcTransactionRate', data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.deleteOtcTransactionRate = deleteOtcTransactionRate;

// 更新OTC交易费率
const updateOtcTransactionRate = function (data, success, error) {
    api.post('api/bm/sysParam/transactionSettings/updateOtcTransactionRate', data, (res) => {
        if (res.rst === 1) {
            success && success(res);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.updateOtcTransactionRate = updateOtcTransactionRate;

// 分页查询OTC法币管理
const listPageLegalCurrency = function (data, success, error) {
    api.post(`api/bm/legalCurrency/listPageLegalCurrency/${data.pageSize}/${data.page}`, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.listPageLegalCurrency = listPageLegalCurrency;

// 更新OTC法币管理
const updateLegalCurrency = function (data, success, error) {
    api.post('api/bm/legalCurrency/updateLegalCurrency', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
system.updateLegalCurrency = updateLegalCurrency;

export default system;
