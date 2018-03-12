import qs from 'qs';

/*确认新增班级*/
export async function classCreateConfirm(params) {
    return requestData(`${BASE_URL}/classGrade/addClassGrade`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*确认修改班级*/
export async function classUpdateConfirm(params) {
    return requestData(`${BASE_URL}/classGrade/updateClassGrade`, {
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

