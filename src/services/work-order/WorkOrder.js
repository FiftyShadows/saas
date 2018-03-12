import qs from 'qs';

/*获取业务参数*/
export async function GetDictKey(params) {
	return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取列表*/
export async function GetTable(params) {
	return requestData(`${BASE_URL}/workOrders/queryList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取受理人*/
export async function GetAcceptor(params) {
	return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增工单
export async function WorkOrderCreate(params) {
	return requestData(`${BASE_URL}/workOrders/createWorkOrder`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取工单详情
export async function GetDetail(params) {
	return requestData(`${BASE_URL}/workOrders/getSingleInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取工单服务列表
export async function GetItemService(params) {
	return requestData(`${BASE_URL}/workOrders/serverRecordList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//工单作废或完结
export async function WorkOrderAbolishOrOver(params) {
	return requestData(`${BASE_URL}/workOrders/changeStatus`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//工单回复或重新开启
export async function WorkOrderReplyOrRestart(params) {
	return requestData(`${BASE_URL}/workOrders/serverRecord/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//工单转交
export async function WorkOrderTransfer(params) {
	return requestData(`${BASE_URL}/workOrders/updateWorkOrders`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

