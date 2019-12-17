import api from './api';

export default {
    // 分页查询用户级别
    listPageUserGrade (data, success, error) {
        api.post(`api/bm/userGrade/listPageUserGrade/${data.size}/${data.page}`,data, (res)=>{
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        },error)
    },

    // 更新用户级别
    updateUserGrade (data, success, error) {
        api.post(`api/bm/userGrade/updateUserGrade`,data, (res)=>{
            if (res.rst === 1) {
                success && success(res.msg);
            } else {
                error && error(res.msg);
            }
        },error)
    },

    // 交易量查询
    listTransactionAmount (data, success, error) {
        api.post(`api/bm/userGrade/listTransactionAmount/${data.size}/${data.page}`,data, (res)=>{
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        },error)
    },
    // 分页查询分级规则
    listPageOtcGrade (data, success, error) {
        api.post(`api/bm/otcGrade/listPageOtcGrade/${data.size}/${data.page}`,data, (res)=>{
            if (res.rst === 1) {
                success && success(res.data, res.total);
            } else {
                error && error(res.msg);
            }
        },error)
    },
    // 更新分级规则
    updateGrade (data, success, error) {
        api.post(`api/bm/otcGrade/updateUserGrade`,data, (res)=>{
            if (res.rst === 1) {
                success && success(res.msg);
            } else {
                error && error(res.msg);
            }
        },error)
    },

}
