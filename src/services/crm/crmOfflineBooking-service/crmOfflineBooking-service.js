/**
 * Created by zhaosi on 2017/6/29.
 */

import qs from 'qs';

export async function huoqudangqianyonghuid(params) {
    return requestData(`${BASE_URL}/tenantUserController/getUserHeadImg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//得到学员列表
export async function getOfflineBookList(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//课程查询
export async function getCourses(params) {
    return requestData(`${BASE_URL}/cerpCourse/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
///stu/stusOfUser 获取校区下所有学员

export async function getstusOfUser(params) {
    return requestData(`${BASE_URL}/stu/stusOfUser`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//预约试听新增
export async function getCreate(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//getOfflineBookupdateStatus
//修改
export async function getOfflineBookupdateStatus(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/updateStatus`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

// getLeadsSummary leads查询

export async function getLeadsSummary(params) {
    return requestData(`${BASE_URL}/cluePoolController/leadsSummary`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//获取当前用户名字及ID
export async function getMsg(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/getMsg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//预约试听 排课查询
export async function getCoursequery(params) {
    return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//选择年月得到日期列表
export async function selectYearToDate(params) {
    return requestData(`${BASE_URL}/cerpCoursePlan/tryDayQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//得到课程下拉列表
export async function getCourseList(params) {
    return requestData(`${BASE_URL}/cerpCoursePlan/tryCourseQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
