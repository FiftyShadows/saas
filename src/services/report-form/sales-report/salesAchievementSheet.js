import qs from 'qs';

/*查询*/
export async function QueryList(params) {
    return requestData(`${BASE_URL}/sellerReport/getSellerPerformanceList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
