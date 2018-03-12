import qs from 'qs';

/*获取机构图片*/
export async function GetTenantPic(params) {
    return requestData(`${BASE_URL}/organController/getTenant`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
