import qs from 'qs';

//得到到访管理记录
export async function getVisitRecordList(params) {
  return requestData(`${BASE_URL}/visitRecordController/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//取消到访管理
export async function cancelVisitRecord(params) {
  return requestData(`${BASE_URL}/visitRecordController/updateStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
