import qs from 'qs';

/*得到请假申请 记录*/
export async function getVacateList(params) {
    return requestData(`${BASE_URL}/vacation/queryVacationList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*审核*/
export async function confirmCheckVacate(params) {
    return requestData(`${BASE_URL}/vacation/vacationAudit`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
