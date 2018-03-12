import qs from 'qs';

/*课程统计*/
export async function getCourseList(params) {
    return requestData(`${BASE_URL}/erpStatsCost/queryByCourse`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*机构统计*/
export async function getOrganList(params) {
    return requestData(`${BASE_URL}/erpStatsCost/queryByOrg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*学员生日统计*/
export async function getBirthdayList(params) {
    return requestData(`${BASE_URL}/erpStatsStuCheck/queryStuCheckBy`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*老师统计*/
export async function getTeacherList(params) {
    return requestData(`${BASE_URL}/erpStatsCost/queryByTeacher`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*负责销售统计*/
export async function getSalesList(params) {
    return requestData(`${BASE_URL}/erpStatsCost/queryBySeller`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*负责顾问统计*/
export async function getCounselorList(params) {
    return requestData(`${BASE_URL}/erpStatsCost/queryByCounselor`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
