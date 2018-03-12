import qs from 'qs';

//获取当前用户的id，用来进行'我负责的退款'列表查询
export async function GetUserBranch(params) {
    return requestData(`${BASE_URL}/tenantUserController/queryUserBranch`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取退款单列表
export async function GetTableList(params) {
    return requestData(`${BASE_URL}/refundOrderQuery/refundOrderList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新建退款单获取学员下拉列表
export async function GetStu(params) {
    return requestData(`${BASE_URL}/stu/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取会员卡下拉列表信息
export async function GetMemCard(params) {
    return requestData(`${BASE_URL}/stuCardInfo/stuCardSummary`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//通过付费客户id获取合同下拉列表信息
export async function GetOrderId(params) {
    return requestData(`${BASE_URL}/order/queryOrderByStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取退款信息(如果是退款，则直接请求退款信息；如果是退课时 需要再选合同之后获取退款信息)
export async function GetRefundDetail(params) {
    return requestData(`${BASE_URL}/refundOrderQuery/getRefundInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//退课时 需要再选合同之后获取退款信息,本接口就是请求合同号
export async function RefundCourseGetContract(params) {
    return requestData(`${BASE_URL}/stuCardInfo/purSummByCardId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新建退款单modal点击提交
export async function RefundFormCreateModalSubmit(params) {
    return requestData(`${BASE_URL}/refundOrder/createRefundOrder`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//点击审核获取当前项的详情
export async function GetRefundFormCheckDetail(params) {
    return requestData(`${BASE_URL}/refundOrderQuery/getRefundOrderById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//审核退款通过
export async function RefundFormCheckModalPass(params) {
    return requestData(`${BASE_URL}/refundOrder/acceptRefundOrder`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//审核退款驳回
export async function RefundFormCheckModalReject(params) {
    return requestData(`${BASE_URL}/refundOrder/rejectRefundOrder`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//点击打印获取打印详情
export async function GetRefundFormPrintDetail(params) {
    return requestData(`${BASE_URL}/refundOrderQuery/getPrintRefundOrderById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


