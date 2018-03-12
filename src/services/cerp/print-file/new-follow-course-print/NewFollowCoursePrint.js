import qs from 'qs';

//获取系统当前时间
export async function GetCourseListByDay(params) {
	return requestData(`${BASE_URL}/cerpCoursePlan/query`, {
		method: 'post',
		headers: {
			"Content-Type": "application/x-www-form-urlencoded",
		},
		body: qs.stringify(params),
	});
}
