import qs from 'qs';

//得到课程列表
export async function getCourseIntroduceList(params) {
  return requestData(`${BASE_URL}/courseintroduce/introduceList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//批量操作
export async function batchOperation(params) {
  return requestData(`${BASE_URL}/courseintroduce/updateStatus`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到单个课程信息
export async function getSingleCourseInfo(params) {
  return requestData(`${BASE_URL}/courseintroduce/getCourse`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认新增课程
export async function confirmAddCourse(params) {
  return requestData(`${BASE_URL}/courseintroduce/saveOrupdate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//富文本编辑器
export async function tableOnUpdateHtmldetailItem(params) {
  return requestData(`${BASE_URL}/courseintroduce/openText`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认课程详情
export async function confirmAddCourseEditor(params) {
  return requestData(`${BASE_URL}/courseintroduce/saveText`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
