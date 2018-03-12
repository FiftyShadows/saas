import qs from 'qs';

//得到联系人列表
export async function getParentList(params) {
  return requestData(`${BASE_URL}//stu/zjl/getParentList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到学员下拉列表
export async function getStuIdList(params) {
  return requestData(`${BASE_URL}/stu/stusOfUser`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//得到联系人下拉列表
export async function getParentIdList(params) {
  return requestData(`${BASE_URL}/stu/parentSummary`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//联系人是否存在
export async function checkParent(params) {
  return requestData(`${BASE_URL}/stu/queryHasParent`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//确认新增联系人
export async function confirmAddParent(params) {
  return requestData(`${BASE_URL}/stu/creatOrUpDateParent`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//确认修改联系人
export async function confirmUpdateParent(params) {
  return requestData(`${BASE_URL}/stu/updateParentById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//删除联系人
export async function deleteParent(params) {
  return requestData(`${BASE_URL}/stu/deleteParent`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//获取单个联系人信息
export async function getParentDetailInfo(params) {
  return requestData(`${BASE_URL}/stu/getParentMsg`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//验证联系人姓名是否重复
export async function checkoutParentName(params) {
  return requestData(`${BASE_URL}/stu/parentDupCheck`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};
