import qs from 'qs';

/*得到班级列表*/
export async function getClassList(params) {
    return requestData(`${BASE_URL}/classGrade/queryClassGradeList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到员工下拉列表*/
export async function getUserList(params) {
    return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到课程下拉列表*/
export async function getCourseList(params) {
    return requestData(`${BASE_URL}/cerpCourse/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到学员下拉列表*/
export async function getStuList(params) {
    return requestData(`${BASE_URL}/stu/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到教室下拉列表*/
export async function getRoomList(params) {
    return requestData(`${BASE_URL}/cerpClsroom/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除班级*/
export async function deleteClass(params) {
    return requestData(`${BASE_URL}/classGrade/deleteClassGrade`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

