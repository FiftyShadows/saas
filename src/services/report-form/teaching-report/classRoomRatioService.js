import qs from 'qs';

/*获取系统当前日期与时间*/
export async function queryList(params) {
    return requestData(`${BASE_URL}/erpStatsRoom/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
