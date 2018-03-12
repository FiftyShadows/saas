import qs from 'qs';

export async function GetClassRoomList(params) {
    return requestData(`${BASE_URL}/cerpClsroom/query`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*新增教室*/
export async function CreateClassRoom(params) {
    return requestData(`${BASE_URL}/cerpClsroom/create`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*编辑教室*/
export async function UpdateClassRoom(params) {
    return requestData(`${BASE_URL}/cerpClsroom/update`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*教室摘要信息*/
export async function classroomDetail(params) {
    return requestData(`${BASE_URL}/cerpClsroom/queryById`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

/*删除教室*/
export async function DeleteClassroom(params) {
    return requestData(`${BASE_URL}/cerpClsroom/statusUpdate`, {
        method: 'post',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: qs.stringify(params),
    });
}

