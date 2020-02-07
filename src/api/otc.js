import api from './api';

let otc = {};

// 用户管理列表
const findUserManage = function (curPage, data, success, error) {
    api.post(`api/bm/otcManage/findUser/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findUserManage = findUserManage;

// 用户管理列表--用户详情
const findUserInfoManage = function (data, success, error) {
    api.post('api/bm/otcManage/findUserInfo', data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findUserInfoManage = findUserInfoManage;

// 用户管理列表--用户资产
const findAssetInfoManage = function (curPage, data, success, error) {
    api.post(`api/bm/otcManage/findAssetInfo/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findAssetInfoManage = findAssetInfoManage;

// 用户管理列表--交易信息--广告信息
const findAdInfoManage = function (curPage, data, success, error) {
    api.post(`api/bm/otcManage/findAdInfo/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findAdInfoManage = findAdInfoManage;

// 用户管理列表--交易信息--订单信息
const findOrderInfoManage = function (curPage, data, success, error) {
    api.post(`api/bm/otcManage/findOrderInfo/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findOrderInfoManage = findOrderInfoManage;

// 用户管理列表--解除封禁
const relieveFrozenManage = function (data, success, error) {
    api.post(`api/bm/otcManage/relieveFrozen`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.relieveFrozenManage = relieveFrozenManage;

// 用户管理列表--封禁
const frozenUserManage = function (data, success, error) {
    api.post(`api/bm/otcManage/frozenUser`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.frozenUserManage = frozenUserManage;

// 用户管理列表--封禁条件
const findFrozenConditionManage = function (data, success, error) {
    api.post(`api/bm/otcManage/findFrozenCondition`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findFrozenConditionManage = findFrozenConditionManage;

// 用户管理列表--封禁条件
const sendSystemMessageManage = function (data, success, error) {
    api.post(`api/bm/otcManage/sendSystemMessage`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.sendSystemMessageManage = sendSystemMessageManage;

// 广告管理--分页查找otc广告
const findAdInfoOtc = function (curPage, data, success, error) {
    api.post(`api/bm/advertiseManage/findAdInfo/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findAdInfoOtc = findAdInfoOtc;

// 广告管理--分页查找otc广告对应订单
const findOrderInfoOtc = function (curPage, data, success, error) {
    api.post(`api/bm/advertiseManage/findOrderInfo/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findOrderInfoOtc = findOrderInfoOtc;

// 广告管理--otc下架广告
const soldOutAd = function (data, success, error) {
    api.post(`api/bm/advertiseManage/soldOutAd`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg||res.error);
        }
    }, error);
};
otc.soldOutAd = soldOutAd;

// 审核管理--审核管理列表
const listAppealRequestManage = function (curPage, data, success, error) {
    api.post(`api/bm/OtcManage/listAppealRequestManage/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listAppealRequestManage = listAppealRequestManage;

// 审核管理--查看列表详情
const selectUserAndOrderInfoOtc = function (data, success, error) {
    api.post(`api/bm/OtcManage/selectUserAndOrderInfo`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.selectUserAndOrderInfoOtc = selectUserAndOrderInfoOtc;

// 审核管理--查看聊天记录
const listChatInfo = function (data, success, error) {
    api.post(`api/bm/OtcManage/listChatInfo`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listChatInfo = listChatInfo;

// 审核管理--处理用户申请
const appealHandleSecond = function (data, success, error) {
    api.post(`api/bm/OtcManage/appealHandleSecond`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.appealHandleSecond = appealHandleSecond;

// 审核管理--修改申诉管理
const updateHandle = function (data, success, error) {
    api.post(`api/bm/OtcManage/updateHandle`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.updateHandle = updateHandle;

// 审核管理--申诉管理--查看处理结果
const showAppealResult = function (data, success, error) {
    api.post(`api/bm/OtcManage/showAppealResult`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.showAppealResult = showAppealResult;

// 审核管理--订单管理--订单列表
const listAllOrders = function (curPage, data, success, error) {
    api.post(`api/bm/OtcManage/listAllOrders/10/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listAllOrders = listAllOrders;

// 审核管理--订单管理--提醒放币
const sendMsg = function (data, success, error) {
    api.post(`api/bm/OtcManage/sendMsg`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.sendMsg = sendMsg;

// 审核管理--订单管理--强制放币
const releaseCoin = function (data, success, error) {
    api.post(`api/bm/OtcManage/releaseCoin`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.releaseCoin = releaseCoin;

// 审核管理--订单管理--解锁货币
const unlockCoin = function (data, success, error) {
    api.post(`api/bm/OtcManage/unlockCoin`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.unlockCoin = unlockCoin;

// 申诉管理--申诉管理全部列表
const listAppealRequest = function (pageSize, curPage, data, success, error) {
    api.post(`api/bm/OtcManage/listAppealRequest/${pageSize}/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listAppealRequest = listAppealRequest;

// 申诉管理--申诉管理--查看详情
const selectOneOrderInfo = function (data, success, error) {
    api.post(`api/bm/OtcManage/selectOneOrderInfo`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.selectOneOrderInfo = selectOneOrderInfo;

// 申诉管理--申诉管理--申诉被申诉人信息
const selectUserInfo = function (data, success, error) {
    api.post(`api/bm/OtcManage/selectUserInfo`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.selectUserInfo = selectUserInfo;

// 申诉管理--申诉管理--申诉管理员处理用户申请
const appealHandleFirst = function (data, success, error) {
    api.post(`api/bm/OtcManage/appealHandleFirst`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.appealHandleFirst = appealHandleFirst;

// 数据统计
const findDataStatistic = function (data, success, error) {
    api.get(`api/bm/otcManage/findDataStatistic`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findDataStatistic = findDataStatistic;

// 数据统计--交易数据
const findTransactionData = function (curPage, data, success, error) {
    api.get(`api/bm/otcManage/findTransactionData/100/${curPage}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findTransactionData = findTransactionData;

// 数据统计--图表数据
const findChartDataList = function (data, success, error) {
    api.post(`api/bm/otcManage/findChartDataList`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findChartDataList = findChartDataList;

// OTC管理-用户收款方式管理
const listPageOtcPayType = function (size, page, data, success, error) {
    api.post(`api/bm/otcManage/otcPayType/listPageOtcPayType/${size}/${page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listPageOtcPayType = listPageOtcPayType;

// OTC管理-更新交易权限
const updateOtcPayType = function (data, success, error) {
    api.post(`api/bm/otcManage/otcPayType/updateOtcPayType`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.updateOtcPayType = updateOtcPayType;

// OTC管理-交易权限列表
const listPageOtcTradePermission = function (data, success, error) {
    api.post(`api/bm/otcManage/otcTradePermission/listPageOtcTradePermission/${data.pageSize}/${data.page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.listPageOtcTradePermission = listPageOtcTradePermission;

// OTC管理-更新权限管理
const updateOtcTradePermission = function (data, success, error) {
    api.post(`api/bm/otcManage/otcTradePermission/updateOtcTradePermission`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.updateOtcTradePermission = updateOtcTradePermission;

// OTC管理-删除权限管理
const deleteOtcTradePermission = function (data, success, error) {
    api.post(`api/bm/otcManage/otcTradePermission/deleteOtcTradePermission`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.deleteOtcTradePermission = deleteOtcTradePermission;

// OTC管理-新增权限管理
const insertOtcTradePermission = function (data, success, error) {
    api.post(`api/bm/otcManage/otcTradePermission/insertOtcTradePermission`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.insertOtcTradePermission = insertOtcTradePermission;

// OTC管理-开户行管理 api/bm/otcBank/findBankList/10/1
const findBankList = function (size,page,data, success, error) {
    api.post(`api/bm/otcBank/findBankList/${size}/${page}`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data,res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.findBankList = findBankList;

// 新增/修改开户行管理
const addOrUpdate = function (data, success, error) {
    api.post(`api/bm/otcBank/addOrUpdate`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.msg);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.addOrUpdate = addOrUpdate;

// 矿工费分发展示
const selectMinerDistributeList = function (data, success, error) {
    api.post(`api/bm/minerFee/distribute/selectMinerDistributeList/${data.size}/${data.page} `, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data,res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.selectMinerDistributeList = selectMinerDistributeList;

// 分发矿工费
const distributeFee = function (data, success, error) {
    api.post(`api/bm/minerFee/distribute/distributeFee`, data, (res) => {
        if (res.rst === 1) {
            success && success(res.data);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.distributeFee = distributeFee;

// 分发记录展示
const selectDistributeRecordList = function (data, success, error) {
    api.post(`api/bm/minerFee/distribute/selectDistributeRecordList/${data.size}/${data.page}?${data.address}`, (res) => {
        if (res.rst === 1) {
            success && success(res.data, res.total);
        } else {
            error && error(res.msg);
        }
    }, error);
};
otc.selectDistributeRecordList = selectDistributeRecordList;

export default otc;
