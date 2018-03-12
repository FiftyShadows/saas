import qs from 'qs';

//收款单列表
export async function getReceiptList(params) {
    return requestData(`${BASE_URL}/orderController/payInfoList`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//赠送课时列表
export async function getSendClassList(params) {
    return requestData(`${BASE_URL}/stuCardInfo/givePeriodList`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//合同详情
export async function getContractOrderDetail(params) {
    return requestData(`${BASE_URL}/orderController/getOrderDetailById`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//打印合同
export async function getOrder(params) {
    return requestData(`${BASE_URL}/orderController/orderPrint`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//合同编号查询得到单条记录
export async function getCurrentItem(params) {
    return requestData(`${BASE_URL}/orderController/list`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}

//删除合同订单
export async function deleteContractOrder(params) {
    return requestData(`${BASE_URL}/orderController/deleteOrder`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
    	body: qs.stringify(params),
    });
}
