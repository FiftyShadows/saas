import qs from 'qs';

//获取当前日期
export async function GetNowTime(params) {
	return requestData(`${BASE_URL}/sys/get`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取学员信息
export async function GetStu(params) {
	return requestData(`${BASE_URL}/stu/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取主教和助教信息
export async function GetTeacher(params) {
	return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取首页默认展示的排课数据
export async function GetFirstArrangeCourse(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/nearQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取排课列表
export async function GetArrangeCourseList(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//左侧下方灰色区域点击事件查询考勤明细
export async function GetSignDetail(params) {
	return requestData(`${BASE_URL}/cerpCpbook/signQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//首页签到点击签到
export async function CerpOverviewSignModalSubmit(params) {
	return requestData(`${BASE_URL}/cerpCpbook/batchStuSign`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取今日签到信息
export async function GetTodaySignData(params) {
	return requestData(`${BASE_URL}/cerpCpbook/attendStatistics`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取续费提醒课时信息
export async function GetCourseAlertNum(params) {
	return requestData(`${BASE_URL}/stuCardInfo/getPeriodRemindNum`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}
