/*
* @author yhwu
* 教室利用率 报表
*/
import { queryList } from '../../../../services/report-form/teaching-report/classRoomRatioService';
import { message } from 'antd';
import { parse } from 'qs';
import moment from 'moment';

export default {

  namespace: 'classRoomRatioSheetModel',

    state: {
		firstEnter                 : true,          //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
		tableLoading               : false,          //列表loading状态
		tableResultCount           : 0,              //列表总数据
		tablePageSize              : 40,             //列表分页大小
		tablePageIndex             : 0,              //列表分页页数
		tableDataSource            : [],             //列表数据

		exportData                 : {}              //导出所需要的参数
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(({ pathname, query }) => {
                if(pathname === '/report_erp_roomuse') {
                    dispatch({
                        type : 'updateState',
						payload : {
							exportData       : {},
							tableResultCount : 0,
							tableDataSource  : [],
							tablePageSize    : 40,
							tablePageIndex   : 0
						}
                    });
					dispatch({
						type : 'queryList',
						payload : {
							exportData       : window.GetNowDateAndTime(),
							firstEnter       : true,
							tablePageSize    : 40,
							tablePageIndex   : 0
						}
					})
                }
            });
        },
    },

    effects: {
		/*生成报表得到列表*/
		*queryList({ payload },{ call, put, select }){
			yield put({ type : 'updateState' , payload : { firstEnter : payload.firstEnter || false }});        //更新变量，使报表头部初始化
			let { exportData, tablePageSize, tablePageIndex } = payload;
			yield put({
				type : 'updateState',
				payload : {
					tableLoading : true,
					exportData,
					tablePageSize,
					tablePageIndex
				}
			})
			let params = {
				pageSize  : tablePageSize,
				pageIndex : tablePageIndex,
				...exportData
			}
			let { ret } = yield call( queryList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						tableResultCount   : ret.data.resultCount,
						tableDataSource    : ret.results,
					}
				})
			}
			yield put({
				type : 'updateState',
				payload : {
					tableLoading : false,
					firstEnter   : false
				}
			})
		}
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload, };
        },
    },
}
