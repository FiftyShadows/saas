import {
	getVisitRecordList,
	cancelVisitRecord
} from '../../../../services/crm/visit-record/visitRecordService';
import parse from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace : 'visitRecordModel',

    state : {
		searchVisible            : false,         //高级搜索是否显示
		pageSize                 : 10,
		pageIndex                : 0,
		dataSource               : [],
		resultCount              : 0,

		selectedId               : undefined,    //所选择的列表项
		selectedItem             : {},           //列表项内容

		typeSelectList           : [],

		/*搜索条件*/
		stuName                  : undefined,
		status                   : undefined,   //跟进方式
		startVisitTime           : undefined,   //开始时间
		endVisitTime             : undefined,   //结束时间
		uidName                  : undefined,   //跟进人姓名( 全部页面用 )
		uids                     : undefined,   //跟进人( 我的页面用 )
		orgId                    : undefined,   //所属校区( 全部页面用 )
		source                   : '2',         //来源
		condition                : undefined,   //所有数据

		reset                    : undefined,   //切换tab是清空高级搜索
    },

    subscriptions : {
        setup({ dispatch, history }){
            history.listen( ({ pathname, query }) => {
                if( pathname === '/crm_visit_mine' ){
					let params = {
						pageSize                 : 10,
						pageIndex                : 0,

						stuName                  : undefined,
						status                   : undefined,   //跟进方式
						startVisitTime           : undefined,   //开始时间
						endVisitTime             : undefined,   //结束时间
						uidName                  : undefined,   //跟进人姓名( 全部页面用 )
						uids                     : undefined,   //跟进人( 我的页面用 )
						orgId                    : undefined,   //所属校区( 全部页面用 )
						source                   : '2',         //来源
						condition                : undefined,
					}
                    dispatch({
                        type    : 'getVisitRecordList',
                        payload : {
							params
                        }
                    });
					 dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType : '到访',
                        }
                    });
				}else if( pathname == '/crm_visit_all' ){
					let params = {
						pageSize                 : 10,
						pageIndex                : 0,

						stuName                  : undefined,
						status                   : undefined,   //跟进方式
						startVisitTime           : undefined,   //开始时间
						endVisitTime             : undefined,   //结束时间
						uidName                  : undefined,   //跟进人姓名( 全部页面用 )
						uids                     : undefined,   //跟进人( 我的页面用 )
						orgId                    : undefined,   //所属校区( 全部页面用 )
						source                   : '2',         //来源
						condition                : 'all',
					}
					dispatch({
						type : 'getVisitRecordList',
						payload : {
							params
						}
					})
				}
			})
        }
    },

    effects : {
		/*得到到訪列表所需参数*/
		*getVisitRecordListParams({ payload },{ call, put, select }){
			let condition = undefined;
			if( !!payload ){
				condition = payload.condition;
			}
			let state = yield select( state => state.visitRecordModel );
			let params = {
				pageSize       : state.pageSize,
				pageIndex      : 0,
				uids           : state.uids,
				stuName        : state.name,
				status         : state.type,
				uidName        : state.uidName,
				startVisitTime : state.startTime,
				endVisitTime   : state.endTime,
				orgId          : state.orgId,
				source         : state.source,
				condition      : condition || state.condition,
			}
			yield put({
				type : 'getVisitRecordList',
				payload : {
					params
				}
			})
		},

		/*得到跟进列表*/
		*getVisitRecordList({ payload },{ call, put, select }){
			let { params } = payload;
			let { ret } = yield call( getVisitRecordList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource : ret.results,
						resultCount : ret.data.resultCount,
						selectedId  : !!ret.results && !!ret.results[0] && ret.results[0].id,
						selectedItem : !!ret.results && ret.results[0],
						...params
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取列表失败' )
			}
		},

		/*切换crm leads*/
		*clickGetFollowRecordList({ payload },{ call, put, select }){
			let state = yield select( state => state.visitRecordModel );
			let { source } = payload;
			let params = {
				pageIndex      : 0,
				pageSize       : state.pageSize,
				source         : source,
				condition      : state.condition,
				uids           : state.uids,
				stuName        : undefined,
				status         : undefined,
				uidName        : undefined,
				startVisitTime : undefined,
				endVisitTime   : undefined,
				orgId          : undefined,
			}
			yield put({
				type : 'getVisitRecordList',
				payload : {
					params
				}
			})
		},

		/*搜索*/
		*searchFunction({ payload },{ call, put, select }){
			let state = yield select( state => state.visitRecordModel );
			let { values } = payload;
			let params = {
				pageIndex      : 0,
				pageSize       : state.pageSize,
				source         : state.source,
				condition      : state.condition,
				uids           : state.uids,
				uidName        : state.uidName,
				startVisitTime : state.startVisitTime,
				endVisitTime   : state.endVisitTime,
				orgId          : state.orgId,
				...values
			}
			yield put({
				type : 'getVisitRecordList',
				payload : {
					params
				}
			})
		},

		/*高级搜索*/
		*onSuperSearch({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.visitRecordModel );
			let startVisitTime = undefined;
			let endVisitTime = undefined;
			if( !!values.time ){
				startVisitTime = values.time[0].format('YYYY-MM-DD HH-mm-ss');
				endVisitTime   = values.time[1].format('YYYY-MM-DD HH-mm-ss');
			}
			let params = {
				pageIndex : 0,
				pageSize  : state.pageSize,
				source    : state.source,
				condition : state.condition,
				uids      : state.uids,
				orgId     : values.orgId || undefined,
				uidName   : values.uidName,
				stuName   : state.stuName,
				status    : state.status,
				startVisitTime,
				endVisitTime,
			}
			yield put({
				type : 'getVisitRecordList',
				payload : {
					params
				}
			})
		},

		/*表格搜索*/
		*subordinateChange({ payload },{ call, put, select }){
            let { uids } = payload;
            let state = yield select( state => state.visitRecordModel );
            let params = {
                uids            : uids,
                pageIndex       : 0,
                pageSize        : state.pageSize,
				condition       : state.condition,
				source          : state.source,
                stuName         : state.stuName,
                status          : state.status,
				uidName         : state.uidName,
                startVisitTime  : state.startVisitTime,
                endVisitTime	: state.endVisitTime,
				orgId           : state.orgId,
            };
            yield put({
                type : 'getVisitRecordList',
                payload : {
                    params
                }
            })
		},

		/*跟进列表分页*/
		*pagination({ payload },{ call, put, select }){
			let state = yield select( state => state.visitRecordModel );
			let params = {
				pageSize       : payload.pageSize,
				pageIndex      : payload.pageIndex - 1,
				condition      : state.condition,
				source         : state.source,
				uids           : state.uids,
				stuName        : state.stuName,
				status         : state.status,
				uidName        : state.uidName,
				startVisitTime : state.startVisitTime,
				endVisitTime   : state.endVisitTime,
				orgId          : state.orgId,
			}
			yield put({
				type : 'getVisitRecordList',
				payload : {
					params
				}
			})
		},

		/*删除跟进记录*/
		*cancelVisitRecord({ payload },{ call, put, select }){
			let { id, status } = payload;
			let { ret } = yield call( cancelVisitRecord, ({ ids : id, status : status }));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'getVisitRecordListParams'
				})
			}else{
				message.error( ret && ret.errorCode || '删除失败' )
			}
		}

    },

    reducers : {
        updateState( state, action ){
            return { ...state, ...action.payload };
        }
    }
}
