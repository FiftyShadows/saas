import qs from 'qs';

//口碑商户绑定租户
export async function bindTenant(params) {
  return requestData(`${BASE_URL}/tenantMappingController/createTenantMapping`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//口碑商户绑定租户
export async function initSaasOrgList(params) {
  return requestData(`${BASE_URL}/tenantMappingController/queryTenantOrgList`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//口碑商户绑定租户
export async function initKoubeiShopList(params) {
  return requestData(`${BASE_URL}/tenantMappingController/queryMerchantShop`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//口碑商户绑定租户
export async function initMapList(params) {
  return requestData(`${BASE_URL}/tenantMappingController/queryOrgMapping`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}

//口碑商户绑定租户
export async function updateOrgMap(params) {
  return requestData(`${BASE_URL}/tenantMappingController/bindShop`, {
    method: 'post',
    headers: {
        "Content-Type": "application/x-www-form-urlencoded",
    },
    body: qs.stringify(params),
  });
}
