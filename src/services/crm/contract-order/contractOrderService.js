import qs from 'qs';

//销售订单列表
export async function getContractOrderList(params) {
    return requestData(`${BASE_URL}/orderController/list`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//审核通过
export async function passOrder(params) {
    return requestData(`${BASE_URL}/orderController/passOrder`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//审核不通过
export async function rejectOrder(params) {
    return requestData(`${BASE_URL}/orderController/rejectOrder`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//得到收款方式
export async function getPaymentList(params) {
    return requestData(`${BASE_URL}/PaymentAcctController/list`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//得到余额
export async function getBalance(params) {
    return requestData(`${BASE_URL}/stuCardInfo/cardAmountSummaryById`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//确认支付
export async function confirmReceiptContract(params) {
    return requestData(`${BASE_URL}/orderController/payOrder`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//查看是不是模板文件
export async function CheckWetherModalFile(params) {
    return requestData(`${BASE_URL}/purInfoImport/isModelFile`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取预览表格
export async function ContractOrderImportPreview(params) {
    return requestData(`${BASE_URL}/purInfoImport/previewData`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//批量导入合同提交
export async function ContractImportSubmit(params) {
    return requestData(`${BASE_URL}/purInfoImport/importData`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//轮询查看合同是否导入完毕
export async function PollingCheckImport(params) {
    return requestData(`${BASE_URL}/purInfoImport/isComplete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//合同开通
export async function openContractOrder(params) {
    return requestData(`${BASE_URL}/order/openOrder`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
