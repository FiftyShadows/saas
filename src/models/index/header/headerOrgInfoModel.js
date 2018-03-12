import {
    GetTenantPic            /*获取机构图片*/
} from '../../../services/index/common/GetOrgInfoService';
import { parse } from 'qs';
import { message } from 'antd';
//顶部导航-机构信息
export default {
    namespace: 'headerOrgInfoModel',

    state: {
        imgUrl: ''
    },

    effects: {
        /*获取机构图片*/
        *'GetTenantPic'({ payload }, { call, put, select }){
            const { ret } = yield call(GetTenantPic);
            if( ret && ret.errorCode === 9000){
                let imgUrl = ret && ret.imgUrl ? ret.imgUrl : 'https://img.ishanshan.com/gimg/img/fa78332e0d89045a645a31c6f34ef223';
                yield put({
                    type:'updateState',
                    payload:{
                        imgUrl
                    }
                })
                yield put({
                    type:'indexMainLayoutModel/updateState',
                    payload:{
                        orgImg : imgUrl
                    }
                })
            }else{
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }
        }
    },
    reducers: {
        updateState(state, action) {
            return {...state, ...action.payload};
        },
    },
}
