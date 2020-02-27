import api from './api';

export default {
    // 邀请信息查询
    findUserInvite (data, success, error) {
        api.post(`api/bm/userInvite/findUserInvite/${data.pageSize}/${data.page}`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },

    // 邀请人信息查询
    findUserInviteInfo (data, success, error) {
        api.post(`api/bm/userInvite/findUserInviteInfo`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },

    // 查询推荐人
    findUserInviteRecommend (data, success, error) {
        api.post(`api/bm/userInvite/findUserInviteRecommend`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },

    // 查询推荐人
    findUserInviteRecommendLevel (data, success, error) {
        api.post(`api/bm/userInvite/findUserInviteRecommendLevel`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data, res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },

    // 更新推荐人信息
    updateRecommend (data, success, error) {
        api.post(`api/bm/userInvite/updateRecommend`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.msg);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },

    // 更新推荐人信息
    findUserInviteModifyRecord (data, success, error) {
        api.post(`api/bm/userInvite/findUserInviteModifyRecord/${data.pageSize}/${data.page}`, data,
            (res) => {
                if (res.rst === 1) {
                    success && success(res.data,res.total);
                } else {
                    error && error(res.msg);
                }
            }, error);
    },
    
    //邀请返佣记录  api/bm/feeDetails/{pageSize}/{page}
    inviteCommissionRecord (pageSize, page, data, success, error) {
        api.post(`api/bm/feeDetails/selectRakeBack/${pageSize}/${page}`, data, (res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg||res.error);
            }
        }, error);
    },

    //邀请返佣查询 POST /api/bm/feeDetails/selectStatistic/{pageSize}/{page}
    inviteCommissionCount (pageSize, page, data, success, error) {
        api.post(`api/bm/feeDetails/selectStatistic/${pageSize}/${page}`, data, (res) => {
            if (res.rst === 1) {
                success && success(res);
            } else {
                error && error(res.msg||res.error);
            }
        }, error);
    },

}
