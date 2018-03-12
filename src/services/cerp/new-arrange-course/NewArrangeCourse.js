import qs from 'qs';

//获取当前日期
export async function GetNowDateAndTime(params) {
	return requestData(`${BASE_URL}/sys/get`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取排课列表数据
export async function GetCourseList(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//操作栏点击更改状态操作(这里只有删除)
export async function OperationChangeStatus(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/delete`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//点击编辑主排课信息查询
export async function GetMainArrangeCourseMessage(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/mainQuery`, {
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


//获取教室信息
export async function GetClassRoom(params) {
	return requestData(`${BASE_URL}/cerpClsroom/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//主排课编辑modal提交
export async function CourseEditModalSubmit(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/update`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

