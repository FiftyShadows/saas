import qs from 'qs';

//获取系统当前时间
export async function GetNowTime(params) {
	return requestData(`${BASE_URL}/sys/get`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取课程信息
export async function GetCourseInfo(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取员工信息
export async function GetStaffList(params) {
	return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取教室信息
export async function GetClsRoomList(params) {
	return requestData(`${BASE_URL}/cerpClsroom/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取课程表时段
export async function GetTimeStartAndEnd(params) {
	return requestData(`${BASE_URL}/confController/get`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}
