/**
 * Created by zhaosi on 2017/6/27.
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
export async function getStudentList(params) {

    return requestData(`${BASE_URL}/stu/zjl/queryCRMStuList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//获取报班信息
//getClassInfo
export async function getClassInfo(params) {
    return requestData(`${BASE_URL}/stuCourse/stuCourseQuery`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//getSingleStu,//获取学员详情
export async function getSingleStu(params) {
    return requestData(`${BASE_URL}/stu/getSingleStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//根据学员Id获取已预约课时记录
export async function getStudentappointPerByStuId(params) {
    return requestData(`${BASE_URL}/stuCardInfo/appointPerByStuId`, {
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
//getlistrecordsstuList,     //获取名单转化记录
export async function getlistrecordsstuList(params) {
    return requestData(`${BASE_URL}/stu/changeRecord`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

export async function getbatchStuSign(params) {
    return requestData(`${BASE_URL}/cerpCpbook/batchStuSign`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//确认停课
export async function confirmEndCourse(params) {
    return requestData(`${BASE_URL}/stuCourse/pauseCourse`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//结束课程
export async function endCourse(params) {
    return requestData(`${BASE_URL}/stuCourse/endCourse`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//得到课时信息
export async function getClassHourInfoList(params) {
    return requestData(`${BASE_URL}/stuCardInfo/cardSummaryPeriodByStuId`, {
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

//根据学员Id获取已消耗课时记录
export async function getStudentconsumePerByStuId(params) {
    return requestData(`${BASE_URL}/stuCardInfo/consumePerByStuId`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//根据学员Id获取会员卡记录
export async function getStudentCardTabList(params) {
    return requestData(`${BASE_URL}/stuCardInfo/getBaseInfo`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}


//得到机构类型下拉列表
export async function getStudentTypeList(params) {
    return requestData(`${BASE_URL}/dictController/get`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//getStudentOfflineTabList

//根据学员Id获取预约记录
export async function getStudentOfflineTabList(params) {
    return requestData(`${BASE_URL}/subscribeAuditionController/list`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//得到联系人列表
export async function getParentInfo(params) {
    return requestData(`${BASE_URL}/stu/getStuParentList`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//得到负责人下拉列表
export async function getSellerIdList(params) {
    return requestData(`${BASE_URL}/tenantUserController/queryMyUsers`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}
//得到作品信息列表
export async function getStudentWorksList(params) {
    return requestData(`${BASE_URL}/stuWorkController/listWorks`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
};

//删除作品
export async function deleteWork(params) {
    return requestData(`${BASE_URL}/stuWorkController/stuWorkDel`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
};

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
// * 获取联系人Id 名字 getParentList
export async function getParentList(params) {
    return requestData(`${BASE_URL}/stu/parentSummary`, {
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
//获得单个学员信息
export async function getStudentInfo(params) {
    return requestData(`${BASE_URL}/stu/crmSingleStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//新增学员
export async function confirmCreateStu(params) {
    return requestData(`${BASE_URL}/stu/createStuOrParent`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//修改学员
export async function confirmCreateForm(params) {
    return requestData(`${BASE_URL}/stu/createStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//确认转移学员
export async function confirmTranslate(params) {
    return requestData(`${BASE_URL}/stu/moveStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//删除学员
export async function deleteStudent(params) {
    return requestData(`${BASE_URL}/stu/deleteStu`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

//查询约课记录
export async function getOrderClassTabList(params) {
	return requestData(`${BASE_URL}/cerpCpbook/stuCpbookQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//学员id查询合同列把你
export async function getContractTabList(params) {
	return requestData(`${BASE_URL}/orderController/list`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

export async function checkStuNameAndPhone(params) {
    var requestPath = '';
    if( !!params && (params.type == 'name' || params.type == 'mobile') ){
        requestPath = `${BASE_URL}/stu/stuDupCheck`;
    }else{
        requestPath = `${BASE_URL}/stu/parentDupCheck`;
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
