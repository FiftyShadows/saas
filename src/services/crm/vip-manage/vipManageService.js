import qs from 'qs';

//得到会员卡列表
export async function getVipList(params) {
    return requestData(`${BASE_URL}/stuCardInfo/stuCardListByCon`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//得到转课列表
export async function getTransCourseList(params) {
    return requestData(`${BASE_URL}/transferPeriod/transferPeriodList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
