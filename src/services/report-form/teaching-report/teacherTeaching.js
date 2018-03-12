import qs from 'qs';

//查询老师搜客列表数据
export async function GetTeacherTeachingTable(params) {
    return requestData(`${BASE_URL}/classSignInfo/sqList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
    });
}

//查询老师授课详情
export async function OpenTeachingDetail(params) {
    return requestData(`${BASE_URL}/classSignInfo/queryDetail`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
    });
}
