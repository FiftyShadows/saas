import qs from 'qs';

/*获取业务参数信息*/
export async function GetDictKey(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取联系人关系*/
export async function GetParentRelationship(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*从数据字典获取二级来源*/
export async function GetSecondChannel(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//得到机构类型下拉列表
export async function GetStuType(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*从数据字典获取跟进状态*/
export async function GetFollowState(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取请假列表数据*/
export async function GetStuSource(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取跟进方式下拉列表内容*/
export async function GetFollowWay(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取我和我下属的id,获取成功后组装uids后进行列表查询*/
export async function GetUserBranch(params) {
    return requestData(`${BASE_URL}/tenantUserController/queryUserBranch`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取全部列表数据*/
export async function GetTableList(params) {
    return requestData(`${BASE_URL}/cluePoolController/queryClueStuList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*leftBars点击分配*/
export async function LeadsFollowTableDispatch(params) {
    return requestData(`${BASE_URL}/tenantUserController/summaryQueryFromNewTable`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*放入回收站*/
export async function LeadsFollowTableChangeStatus(params) {
    return requestData(`${BASE_URL}/cluePoolController/recycle`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取当前机构下销售人员所拥有的leads详情*/
export async function GetOrgStaffLeadsDetail(params) {
    return requestData(`${BASE_URL}/cluePoolController/queryAllotData`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


/*分配modal提交*/
export async function LeadsFollowLeadsDispatchModalSubmit(params) {
    return requestData(`${BASE_URL}/cluePoolController/changeLeadsSeller`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*转给他人modal获取当前员工下属信息*/
export async function GetCurrentStaffSubordinate(params) {
    return requestData(`${BASE_URL}/tenantUserController/queryUserBranch`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增跟进记录*/
export async function LeadsFollowFollowRecordAdd(params) {
    return requestData(`${BASE_URL}/commRecordService/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*跟进记录编辑modal提交*/
export async function LeadsFollowFollowRecordEditSubmit(params) {
    return requestData(`${BASE_URL}/commRecordService/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*leads跟进记录删除*/
export async function LeadsFollowFollowRecordDeleteItem(params) {
    return requestData(`${BASE_URL}/commRecordService/delete`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*开启详情时获取跟进记录列表，和滚动条滚动到底部时继续查询*/
export async function GetFollowRecordList(params) {
    return requestData(`${BASE_URL}/commRecordService/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取到访计划list*/
export async function GetVisitingPlanList(params) {
    return requestData(`${BASE_URL}/visitRecordController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增编辑到访计划modal提交*/
export async function LeadsFollowVisitingPlanModalSubmit(params) {
    return requestData(`${BASE_URL}/visitRecordController/createVisitRecord`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*到访记录点击关闭*/
export async function LeadsFollowVisitingPlanChangeItemStatus(params) {
    return requestData(`${BASE_URL}/visitRecordController/updateStatus`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取预约试听list*/
export async function GetReservationList(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*预约试听获取选中校区的课程信息*/
export async function ReservationGetCourse(params) {
    return requestData(`${BASE_URL}/cerpCourse/summaryQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*获取当前操作用户信息作为跟进人信息*/
export async function ReservationGetSellerDetail(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/getMsg`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*早教类预约试听查看排课信息*/
export async function CheckZJLReservationCourseDetail(params) {
    return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增预约试听*/
export async function LeadsFollowReservationModalSubmit(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*leads预约试听改变状态*/
export async function LeadsFollowReservationChangeItemStatus(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/updateStatus`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取机构下的员工下拉列表内容
export async function GetCollector(params) {
    return requestData(`${BASE_URL}/tenantUserController/summaryQueryFromNewTable`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//获取推荐人(联系人)下拉列表内容
export async function GetRecommend(params) {
    return requestData(`${BASE_URL}/stu/parentSummary`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*leads编辑提交*/
export async function DetailEditModalSubmit(params) {
    return requestData(`${BASE_URL}/cluePoolController/addClueStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击转为学员时获取联系人信息并且打开modal*/
export async function LeadsMergeGetParent(params) {
    return requestData(`${BASE_URL}/cluePoolController/queryCRMStudentResponse`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*点击合并已有学员请求crm学员列表(自己和自己下属的)*/
export async function GetSelfCrmStuTable(params) {
    return requestData(`${BASE_URL}/stu/queryCRMStuList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*转为学员点击提交*/
export async function LeadsFollowStuMergeModalSubmit(params) {
    return requestData(`${BASE_URL}/cluePoolController/changeStudent`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//leads编辑学员姓名，联系人姓名，联系人手机号
export async function EditLeadsCheckSameOnBlur(params) {
    var requestPath = '';
    if(params && params.type == 'name'){
        requestPath = `${BASE_URL}/cluePoolController/leadsDupCheck`;
    }else{
        requestPath = `${BASE_URL}/cluePoolController/parentDupCheck`;
    }
    delete params.type;
    return requestData(requestPath, {
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
