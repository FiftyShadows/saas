import qs from 'qs';

//确认新增记录
export async function confrimAddFollowUpRecord(params) {
  return requestData(`${BASE_URL}/commRecordService/create`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认修改记录
export async function confirmUpdateFollowUpRecord(params) {
  return requestData(`${BASE_URL}/commRecordService/update`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//新增修改时获得跟进记录信息
export async function getFollowUpInfo(params) {
  return requestData(`${BASE_URL}/commRecordService/getMsg`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到跟进记录列表
export async function getFollowUpTypeList(params) {
  return requestData(`${BASE_URL}/dictController/get`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//获取下拉学员下拉列表
export async function getStudentList(params) {
  return requestData(`${BASE_URL}/stu/stusOfUser`, {
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

