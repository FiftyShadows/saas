import qs from 'qs';

/*查询口碑商品-课程*/
export async function queryKbReservation(params) {
  return requestData(`${BASE_URL}/koubeiReservationController/list`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

/*查询口碑商品-课程*/
export async function batchDeal(params) {
  return requestData(`${BASE_URL}/koubeiReservationController/batchDeal`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}


/*查询口碑商品-课程*/
export async function updateRemark(params) {
  return requestData(`${BASE_URL}/koubeiReservationController/updateRemark`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
