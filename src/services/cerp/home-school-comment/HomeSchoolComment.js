import qs from 'qs';

//获取教师数据渲染搜索栏下拉列表
export async function GetTeacherMsg(params) {
	return requestData(`${BASE_URL}/tenantUserController/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取课程数据渲染搜索栏下拉列表
export async function GetCourseMsg(params) {
	return requestData(`${BASE_URL}/cerpCourse/summaryQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取列表数据，列表数据不存在删除功能，无须做非第一页空数据则请求前一页数据的功能
export async function GetTableList(params) {
	return requestData(`${BASE_URL}/hsComm/cpQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//获取详情老师评价和联系人评价列表数据
export async function GetDetail(params) {
	return requestData(`${BASE_URL}/hsComm/commAllQuery`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//老师评价编辑modal提交
export async function SubmitCommentEditModal(params) {
	return requestData(`${BASE_URL}/hsComm/tcrCommUpdate`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

//上课内容编辑modal提交
export async function SubmitContentEditModal(params) {
	return requestData(`${BASE_URL}/hsComm/cpContentUpdate`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}

