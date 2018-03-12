import qs from 'qs';

//查询续费提醒列表
export async function GetCourseAlertList(params) {
    return requestData(`${BASE_URL}/stuCardInfo/periodRemindList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
};

//table点击取消提醒
export async function CourseAlertTableOnCancelAlert(params) {
    return requestData(`${BASE_URL}/stuCard/removePeriodRemind`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
};

//恢复提醒
export async function RecoveryModalSubmit(params) {
    return requestData(`${BASE_URL}/stuCard/recoverPeriodRemind`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
};
