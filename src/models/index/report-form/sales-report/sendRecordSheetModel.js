import {
	getSendClassByType,
	getSendClassByTime

} from '../../../../services/report-form/sales-report/sendRecordSheetService';
import { parse } from 'qs';
import qs from 'qs';
import { message } from 'antd';

//统计报表 赠课记录
export default {

    namespace: 'sendRecordSheetModel',

    state: {
		firstEnter                     : true,          //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
		addSendClass                   : 0,
		useSendClass                   : 0,
		createContractSendClass        : 0,
		afterContractSendClass         : 0,

		/*成本*/
		costPeriodExtMoney             : 0,
		newPeriodExtMoney              : 0,
		newPurPeriodExtMoney           : 0,
		newSerPeriodExtMoney           : 0,

		loading                        : false,
		exportSearchData               : {}
	},

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/report_crm_extperiod') {
                    dispatch({
                        type : 'updateState',
						payload : {
							addSendClass              : 0,
							useSendClass              : 0,
							createContractSendClass   : 0,
							afterContractSendClass    : 0,
							exportSearchData          : {}
						}
                    });
					dispatch({
						type : 'generatingReports',
						payload : {
							exportSearchContent : window.GetNowDateAndTime(),
							firstEnter          : true
						}
					})
                }
            });
        },
    },

    effects: {
		*generatingReports({ payload },{ call, put, select }){
			yield put({ type : 'updateState' , payload : { firstEnter : payload.firstEnter || false }});        //更新变量，使报表头部初始化
			let { exportSearchContent } = payload;
			yield put({
				type : 'updateState',
				payload : {
					exportSearchContent,
					loading : true
				}
			})
			let sendClassByType = yield call( getSendClassByType ,( exportSearchContent ));
			if( sendClassByType && sendClassByType.ret && sendClassByType.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						addSendClass : sendClassByType.ret.newPeriodExtNum,
						useSendClass : sendClassByType.ret.costPeriodExtNum,

						costPeriodExtMoney : sendClassByType.ret.costPeriodExtMoney,
						newPeriodExtMoney  : sendClassByType.ret.newPeriodExtMoney
					}
				})
			}else{
				message.error( sendClassByType && sendClassByType.ret && sendClassByType.ret.errorMessage || '按类型查询失败' );
			}

			let sendClassByTime = yield call( getSendClassByTime, ( exportSearchContent ));
			if( sendClassByTime && sendClassByTime.ret && sendClassByTime.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						createContractSendClass : sendClassByTime.ret.newPurPeriodExtNum,
						afterContractSendClass : sendClassByTime.ret.newSerPeriodExtNum,

						newPurPeriodExtMoney    : sendClassByTime.ret.newPurPeriodExtMoney,
						newSerPeriodExtMoney    : sendClassByTime.ret.newSerPeriodExtMoney
					}
				})
			}else{
				message.error( sendClassByTime && sendClassByTime.ret && sendClassByTime.ret.errorMessage || '按创建时间查询失败' )
			}
			yield put({
				type : 'updateState',
				payload : {
					loading : false,
					firstEnter : false
				}
			})
		}
	},


    reducers: {
        updateState(state, action) {
            return {...state, ...action.payload};
        },
    },
};
