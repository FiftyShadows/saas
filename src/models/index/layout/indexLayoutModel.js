/*
 *整体的布局model
 */
import {
    ChangePassWord,          //修改密码表单提交
	getSystemType            //调用接口最左侧 应用类型
} from '../../../services/index/common/mainLayoutService';
import { parse } from 'qs';
import { message } from 'antd';

export default {

    namespace: 'indexMainLayoutModel',

    state: {
        currentApplication: 'saas',    //当前选中的应用编号
        applicationList: [],        //应用列表
        orgImg : undefined,         //机构图片
        userMsg : {},               //用户信息

        /*修改密码modal*/
        passWordChangeModalVisible : false,             //修改密码modal是否显示
        passWordChangeModalButtonLoading : false,       //修改密码modal按钮加载状态

		versionInfoVisible : false,                    //版本更新提示框
		versionInfo: {                                  //版本信息
			version: '4.0.2',                     //版本更新信息-版本号
			title: '闪闪全新版本4.0.2震撼来袭！',
			updateDate: '2017-11-23',             //版本更新信息-更新时间
			details: [
				{
					title: 'CRM',
					items: [
                  	  '名单和学员批量导入增加昵称字段',
						'名单分配新增按照角色筛选，可以快速选出想要分配名单的老师',
						'招生宝市场活动产生的名单在进入名单库里时可以直接把收集人字段带过去',
						'预约试听优化，操作更加方便',
						'其他功能优化'
					]
				},{
					title: '教学',
					items: [
						'学员约课记录新增按照学员名字搜索',
						'可批量打印当天的签到表',
						'增加考勤小票补打功能',
						'其他功能优化'
					]
              	},{
					title: '报表',
					items: [
						'进入报表默认展示今天的数据',
						'其他功能优化'
					]
              	},{
					title: '家校通',
					items: [
						'签到二维码跳转优化',
						'其他功能优化'
					]
				}
			],
		}
    },

    subscriptions: {
        setup({ dispatch, history }) {  // eslint-disable-line

        },
    },

    effects: {
        /*修改密码表单提交*/
        *'ChangePassWord'({ payload }, { call, put, select }){
            yield put({ type : 'openButtonLoading' });
            let { ret } = yield call(ChangePassWord,parse(payload));
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage);
                yield put({
                    type:'updateState',
                    payload:{
                        passWordChangeModalVisible : false
                    }
                });
            }else if(ret && ret.errorMessage){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('您的网络状况不佳，请检查网络情况');
            }
            yield put({ type : 'closeButtonLoading' });
        },

		//调用接口得到招生宝和saas管理
		*getSystemType({ payload },{ call, put, select }){
			let { ret } = yield call( getSystemType );
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						applicationList : ret.results
					}
				})
			}else{
				message.error( ret && ret.errorMessage )
			}
		}
    },

    reducers: {
		changeVersionInfoVisible(state, action) {
            let { versionInfoVisible } = state;
            return {...state, versionInfoVisible: !versionInfoVisible, }
      	},

		closeVersionInfoVisible(state, action) {
            return {...state, versionInfoVisible: false, }
      	},

        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        /*修改密码表单开启按钮加载状态*/
        openButtonLoading(state, action) {
            return { ...state, ...action.payload, passWordChangeModalButtonLoading : true};
        },
        /*修改密码表单关闭按钮加载状态*/
        closeButtonLoading(state, action) {
            return { ...state, ...action.payload, passWordChangeModalButtonLoading : false};
        },
    },
};

