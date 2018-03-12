import qs from 'qs';

/*课程统计*/
export async function getContractStuList(params) {
    return requestData(`${BASE_URL}/erpStatsSilence/silenceQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
