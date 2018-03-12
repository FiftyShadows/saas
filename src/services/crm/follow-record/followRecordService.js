import qs from 'qs';

//得到会员卡列表
export async function getFollowRecordList(params) {
  return requestData(`${BASE_URL}/commRecordService/query`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}


//得到跟进类型下拉列表
export async function getSelectList(params) {
  return requestData(`${BASE_URL}/dictController/get`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}


//删除跟进记录
export async function deleteFollowRecord(params) {
  return requestData(`${BASE_URL}/commRecordService/delete`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}


//查看是不是模板文件
export async function CheckWetherModalFile(params) {
    return requestData(`${BASE_URL}/commRecordInfoImport/isModelFile`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取预览表格
export async function FollowRecordImportPreview(params) {
    return requestData(`${BASE_URL}/commRecordInfoImport/previewData`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//批量导入合同提交
export async function FollowRecordImportSubmit(params) {
    return requestData(`${BASE_URL}/commRecordInfoImport/importData`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//轮询查看合同是否导入完毕
export async function PollingCheckImport(params) {
    return requestData(`${BASE_URL}/commRecordInfoImport/isComplete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
