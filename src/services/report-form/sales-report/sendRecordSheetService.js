import qs from 'qs';

/*赠送课时数量查询*/
export async function getSendClassByType(params) {
    return requestData(`${BASE_URL}/sellerReport/getGivePeriodNum`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*赠送课时新增数量按赠送时间查询*/
export async function getSendClassByTime(params) {
    return requestData(`${BASE_URL}/sellerReport/getGivePeriodNumTime`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
