import qs from 'qs';

//列表查询(列表无删除操作，无需进行查询后零数据判断)
export async function QueryList(params) {
    return requestData(`${BASE_URL}/wageSet/queryUserWageSettingList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//搜索栏获取角色下拉列表内容,之后查询列表
export async function GetRoleSelectContent(params) {
    return requestData(`${BASE_URL}/tenantRoleController/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//打开工资设置modal时获取课程下拉列表内容
export async function GetCourseSummary(params) {
    return requestData(`${BASE_URL}/cerpCourse/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取老师工资设置的详情信息
export async function GetTeacherDetail(params) {
    return requestData(`${BASE_URL}/wageSet/getUserWageSetting`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//工资设置modal提交
export async function SetSalaryModalSubmit(params) {
    return requestData(`${BASE_URL}/wageSet/saveUserWageSetting`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

