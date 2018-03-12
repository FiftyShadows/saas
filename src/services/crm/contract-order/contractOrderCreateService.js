import qs from 'qs';

//获取已经支付的方式
export async function getPayWayList(params) {
  return requestData(`${BASE_URL}/orderController/getPayInfo`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//获取联系人下拉列表
export async function getParentIdList(params) {
  return requestData(`${BASE_URL}/stu/parentSummary`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//获取会员卡下拉列表
export async function getVipCardList(params) {
  return requestData(`${BASE_URL}/stuCardInfo/stuCardSummary`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//获取学员下拉列表
export async function getStuIdList(params) {
  return requestData(`${BASE_URL}/stu/getStuInfoByParentId`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//通过vipcard获取学员下拉列表
export async function getStuIdListByCard(params) {
  return requestData(`${BASE_URL}/stuCardInfo/cardStuInfoById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到产品下拉列表
export async function getProductList(params) {
  return requestData(`${BASE_URL}/productController/getProductList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到教材下拉列表
export async function getTeachingList(params) {
  return requestData(`${BASE_URL}/teachingAidController/queryTeachingAid`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到销售下拉列表
export async function getSalesList(params) {
  return requestData(`${BASE_URL}/tenantUserController/summaryQueryFromNewTable`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到收款下拉列表
export async function getPaywayList(params) {
  return requestData(`${BASE_URL}/PaymentAcctController/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认新增充值
export async function confirmAddContractOrder(params) {
  return requestData(`${BASE_URL}/orderController/addMoneyOrder`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认新增充值
export async function confirmAddContractOrderProduct(params) {
  return requestData(`${BASE_URL}/orderController/addClassOrder`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到订单详情
export async function getOrderInfo(params) {
  return requestData(`${BASE_URL}/orderController/getOrder`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//编辑课时包
export async function updateContractOrderProduct(params) {
  return requestData(`${BASE_URL}/orderController/updateClassOrder`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//编辑充值
export async function updateContractOrder(params) {
  return requestData(`${BASE_URL}/orderController/updateMoneyOrder`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//编辑充值
export async function getOrderNum(params) {
  return requestData(`${BASE_URL}/orderController/getOrderNum`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}


//获取客户下拉列表
export async function getCustomerIdList(params) {
  return requestData(`${BASE_URL}/customer/getAllCustomer`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

