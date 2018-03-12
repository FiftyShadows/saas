import qs from 'qs';

//得到校区下拉列表
//export async function getOrgOptionsList(params) {
//  return requestData(`${BASE_URL}/tenantOrgController/summaryQuery`, {
//    method: 'post',
//    headers: {
//        "Content-Type": "application/x-www-form-urlencoded",
//    },
//    body: qs.stringify(params),
//  });
//}

//得到课程列表
export async function getCourseList(params) {
  return requestData(`${BASE_URL}/cerpCourse/query`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//删除课程
export async function deleteCourse(params) {
  return requestData(`${BASE_URL}/cerpCourse/statusUpdate`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//确认新增课程
export async function confirmCreateForm(params) {
  return requestData(`${BASE_URL}/cerpCourse/create`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//修改得到单个课程信息
export async function CourseInfoUpdate(params) {
  return requestData(`${BASE_URL}/cerpCourse/update`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//得到所选校区
export async function getCourseOrgIds(params) {
  return requestData(`${BASE_URL}/courseOrgController/getCourseOrgMsg`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
};

//课程下拉框数据
export async function getCourseComList(params) {
  return requestData(`${BASE_URL}/courseController/summaryQuery`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//課程詳情頁面
export async function getCourseDetail(params) {
  return requestData(`${BASE_URL}/cerpCourse/queryById`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//打开课系列表
export async function CourseOrderSystemOpen(params) {
    return requestData(`${BASE_URL}/cerpCourseGroup/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增课系
export async function CourseOrderSystemAdd(params) {
    return requestData(`${BASE_URL}/cerpCourseGroup/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//编辑课系
export async function CourseOrderSystemEdit(params) {
    return requestData(`${BASE_URL}/cerpCourseGroup/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//删除课系
export async function CourseOrderSystemDelete(params) {
    return requestData(`${BASE_URL}/cerpCourseGroup/delete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
