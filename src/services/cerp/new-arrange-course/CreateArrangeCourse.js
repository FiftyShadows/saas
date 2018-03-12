import qs from 'qs';

//选择校区onChange事件获取课程信息
export async function GetCourse(params) {
	return requestData(`${BASE_URL}/cerpCourse/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//选择课程onChange事件，通过机构ID和课程ID获取课程详情用于填写课程后面的俩空
export async function GetCourseDetail(params) {
	return requestData(`${BASE_URL}/cerpCourse/queryById`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//选择校区onChange事件，获取主教和助教信息
export async function GetTeacher(params) {
	return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}


//选择校区onChange事件获取教室信息
export async function GetClassRoom(params) {
	return requestData(`${BASE_URL}/cerpClsroom/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//点击生成排课
export async function CreateNewCourse(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/create`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}
