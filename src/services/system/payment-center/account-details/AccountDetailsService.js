import qs from 'qs';

//账户余额，提现金额
export async function showBalance(params) {
    return requestData(`${BASE_URL}/PayCentreController/account/msg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//账户流水
export async function showAccountFlow(params) {
    return requestData(`${BASE_URL}/PayCentreController/history/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//提现记录
export async function showWithdrawalsRecord(params) {
    return requestData(`${BASE_URL}/PayCentreController/sett/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//提现申请
export async function checkApplication(params) {
    console.info('services');
    return requestData(`${BASE_URL}/PayCentreController/get/telbank`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//提现申请 提交
export async function addSetSubmit(params) {
    return requestData(`${BASE_URL}/PayCentreController/add/sett`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取验证码
export async function getVerificationCode(params) {
    return requestData(`${BASE_URL}/smsVerifyController/genVerifyCode`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
