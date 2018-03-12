import qs from 'qs';


/*得到班級學員列表*/
export async function getStudentList(params) {
    return requestData(`${BASE_URL}/classGrade/queryClassStuList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*确认添加学员*/
export async function confirmAddStudent(params) {
    return requestData(`${BASE_URL}/classGrade/addClassStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*移除學員*/
export async function removeStudent(params) {
    return requestData(`${BASE_URL}/classGrade/removeClassStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取学员所预约课程节数*/
export async function getClassNum(params) {
    return requestData(`${BASE_URL}/classGrade/getClassStuInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到上課記錄列表*/
export async function getAttendClassList(params) {
    return requestData(`${BASE_URL}/clsCpbook/cpquery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除班级*/
export async function deleteClassItem(params) {
    return requestData(`${BASE_URL}/classGrade/deleteClassGrade`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*得到班级详情*/
export async function getClassInfo(params) {
    return requestData(`${BASE_URL}/classGrade/getClassGradeDetail`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*查询班级约课学员*/
export async function checkAppointClassStuNum(params) {
    return requestData(`${BASE_URL}/clsCpbook/cpbookStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除日程*/
export async function deleteClassRecord(params) {
    return requestData(`${BASE_URL}/clsCpbook/delete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*确认修改信息*/
export async function classInfoCreateConfirm(params) {
    return requestData(`${BASE_URL}/cerpCoursePlan/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
