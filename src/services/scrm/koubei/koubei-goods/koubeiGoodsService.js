import qs from 'qs';

/*查询口碑商品-课程*/
export async function queryKoubeiGoodsCourse(params) {
  return requestData(`${BASE_URL}/orderGoodController/courseList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品-课程*/
export async function queryKoubeiGoodsActivity(params) {
  return requestData(`${BASE_URL}/orderGoodController/activityList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*口碑商品  各个状态数量*/
export async function queryKoubeiGoodsCountOfStatus(params) {
  return requestData(`${BASE_URL}/orderGoodController/countOfStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*口碑商品 更改状态*/
export async function updateCourseStatus(params) {
  return requestData(`${BASE_URL}/orderGoodController/updateCourseStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*口碑商品 更改状态*/
export async function updateActivityStatus(params) {
  return requestData(`${BASE_URL}/orderGoodController/updateActivityStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品详情-课程*/
export async function getKoubeiGoodsDetailCourse(params) {
  return requestData(`${BASE_URL}/orderGoodController/getCourseById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品详情-课程*/
export async function getKoubeiGoodsDetailActivity(params) {
  return requestData(`${BASE_URL}/orderGoodController/getActivityById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品表单项的下拉框*/
export async function initKoubeiFormData(params) {
  return requestData(`${BASE_URL}/organController/getOrganDict`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*修改口碑商品*/
export async function createKoubeiGoodsCourse(params) {
  return requestData(`${BASE_URL}/orderGoodController/courseCreate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*修改口碑商品*/
export async function createKoubeiGoodsActivity(params) {
  return requestData(`${BASE_URL}/orderGoodController/activityCreate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*修改口碑商品*/
export async function updateKoubeiGoodsCourse(params) {
  return requestData(`${BASE_URL}/orderGoodController/courseUpdate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*修改口碑商品*/
export async function updateKoubeiGoodsActivity(params) {
  return requestData(`${BASE_URL}/orderGoodController/activityUpdate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品订单*/
export async function queryKoubeiGoodsOrder(params) {
  return requestData(`${BASE_URL}/purchaseController/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品核销*/
export async function queryKoubeiGoodsVerify(params) {
  return requestData(`${BASE_URL}/purchaseController/settleList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*获取商品类目*/
export async function queryCategoryId(params) {
  return requestData(`${BASE_URL}/kbGoodCatController/query`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品的门店*/
export async function queryKoubeiGoogsOrg(params) {
  return requestData(`${BASE_URL}/orderOrgController/kbOpenShop`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
