import qs from 'qs';

export async function loadAllMenuList(params) {
  return requestData(`${BASE_URL}/menuController/loadAllMenuList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*得到校区列表用来判断是否需要选择校区*/
export async function getOrgIdList(params) {
  return requestData(`${BASE_URL}/tenantOrgController/upOrgsNoPatch`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function getOrgPermissionList(params) {
  return requestData(`${BASE_URL}/tenantOrgController/userPermOrgs`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function getMySubordinates(params) {
  return requestData(`${BASE_URL}/tenantUserController/queryUserBranch`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

export async function queryUserImg(params) {
  return requestData(`${BASE_URL}/tenantUserController/getUserHeadImg`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*修改密码表单提交*/
export async function ChangePassWord(params) {
    return requestData(`${BASE_URL}/tenantUserController/changePassword`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*调用接口最左侧 应用类型*/
export async function getSystemType(params) {
    return requestData(`${BASE_URL}/appService/queryAppInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
