import qs from 'qs';

/*通过签约类型查询合同收入*/
export async function getIncomeByType(params) {
    return requestData(`${BASE_URL}/sellerReport/getSignType`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*通过课时套餐查询合同收入*/
export async function getIncomeByClassPackage(params) {
    return requestData(`${BASE_URL}/sellerReport/getPeriodPackList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*通过教材查询合同收入*/
export async function getIncomeByTeachingList(params) {
    return requestData(`${BASE_URL}/sellerReport/getTeachAidList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
