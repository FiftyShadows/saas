import {
	getOrderRecordList,                    //得到约课记录
	getDate,                               //得到当前日期

	updateStatus,                          //改变状态

	confirmUpdateFix,

	getCourseList,
	getClassRoomList,
	getTeacherList

} from '../../../../services/erp/order-class/orderRecordService';
import parse from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace : 'orderRecordModel',

    state : {

		orgId                        : undefined,
		searchVisible                : false,              //高级搜索是否显隐
		courseList                   : [],
		classRoomList                : [],
		teacherList                  : [],

		/*常用搜索项*/
		courseId                     : undefined,
		roomId                       : undefined,
		stuName                      : undefined,

		/*高级搜索项*/
		mtid                         : undefined,
		startTime                    : undefined,
		endTime                      : undefined,

		/*操作栏*/
		currentDate                  : undefined,          //当前日期
		startDate                    : undefined,          //开始日期
		endDate                      : undefined,          //结束日期
		radioGroupValue              : 'day',              //按周 按天
		selectedRowKeys              : [],
		selectedRows                 : [],


		/*表格*/
		dataSource                   : [],
		loading                      : false,
		newColumns                   : [],
		resultCount                  : 0,
		pageIndex                    : 0,
		pageSize                     : 20,


		/*修改状态*/
		updateStatusVisible          : false,


		/*修改固定位*/
		updateFixVisible             : false


	},

    subscriptions : {
        setup({ dispatch, history }){
            history.listen( ({ pathname, query }) => {
                if( pathname === '/cerp_yk_rcd' ){
					dispatch({
						type : 'updateState',
						payload : {
							courseList : [],
							classRoomList : [],
							teacherList : []
						}
					})
					dispatch({
						type : 'getDateAndTime',
						payload : {

						}
					})
					dispatch({
						type : 'getSelectList',
						payload : {}
					})
				}
            })
        }
    },

    effects : {
		/*得到下拉列表*/
		*getSelectList({ payload },{ call, put, select }){
			let orgId = window._init_data.cerp_orgId;
			let courseList = yield call( getCourseList, ({ orgId }));
			if( courseList && courseList.ret && courseList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						courseList : courseList.ret.results
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取课程下拉失败' )
			}
			let classRoomList = yield call( getClassRoomList, ({ orgId }));
			if( classRoomList && classRoomList.ret && classRoomList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						classRoomList : classRoomList.ret.results
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取教室下拉失败' )
			}
			let teacherList = yield call( getTeacherList, ({ orgId }));
			if( teacherList && teacherList.ret && teacherList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						teacherList : teacherList.ret.results
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取主教下拉失败' )
			}
		},

		/*得到当前日期*/
		*getDateAndTime({ payload },{ call, put, select }){
			let state = yield select( state => state.orderRecordModel );
			let orgId = window._init_data.cerp_orgId;
			let { ret } = yield call( getDate );
			let date = new Date();
			let time = date.toLocaleString();
			date = date.toLocaleDateString();
			yield put({
				type : 'updateState',
				payload : {
					startDate : !!ret && ret.date || date,
					endDate   : !!ret && ret.date || date,

					currentDate : !!ret && ret.date || date,

					orgId       : orgId
				}
			})
			let params = {
				orgId : orgId,
				startDate : state.startDate || ret.date || date,
				endDate   : state.endDate || ret.date || date,

				pageSize  : state.pageSize,
				pageIndex : 0,

				/*高级搜索*/
//				mtid      : state.mtid,
//				startTime : state.startTime,
//				endTime   : state.endTime,
//
//				courseId  : state.courseId,
//				roomId    : state.roomId,
//				stuName   : state.stuName

			}

			yield put({
				type : 'getOrderRecordList',
				payload : {
					params
				}
			})
		},

		/*常用搜索*/
		*searchFunction({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.orderRecordModel );
			let params = {

				orgId     : state.orgId,

				startDate : state.startDate,
				endDate   : state.endDate,

				pageSize  : state.pageSize,
				pageIndex : 0,

				/*高级搜索*/
				mtid      : state.mtid,
				startTime : state.startTime,
				endTime   : state.endTime,

				...values
			}
			yield put({
				type : 'getOrderRecordList',
				payload : {
					params
				}
			})
		},

		/*高级搜索*/
		*onSuperSearch({ payload },{ call, put, select }){
			let { values } = payload;
			let startTime = undefined;
			let endTime = undefined;
			if( !!values && !!values.startTime ){
				startTime = startTime.format('HH:mm');
			}
			if( !!values && !!values.endTime ){
				endTime = endTime.format('HH:mm');
			}
			let state = yield select( state => state.orderRecordModel );
			let params = {
				orgId     : state.orgId,

				startDate : state.startDate,
				endDate   : state.endDate,

				pageSize  : state.pageSize,
				pageIndex : 0,

				/*常用搜索*/
				courseId  : state.courseId,
				roomId    : state.roomId,
				stuName   : state.stuName,

				mtid      : values.mtid,
				startTime,
				endTime
			}
			yield put({
				type : 'getOrderRecordList',
				payload : {
					params
				}
			})
		},

		/*分页*/
		*pagination({ payload },{ call, put, select }){
			let { pageSize, pageIndex } = payload;
			let state = yield select( state => state.orderRecordModel );
			let params = {
				orgId     : state.orgId,

				startDate : state.startDate,
				endDate   : state.endDate,

				/*常用搜索*/
				courseId  : state.courseId,
				roomId    : state.roomId,
				stuName   : state.stuName,

				/*高级搜索*/
				mtid      : state.mtid,
				startTime : state.startTime,
				endTime   : state.endTime,

				pageIndex : pageIndex - 1,
				pageSize,
			}

			yield put({
				type : 'getOrderRecordList',
				payload : {
					params
				}
			})
		},

		/*得到列表数据*/
		*getOrderRecordList({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					loading : true
				}
			})
			let { params } = payload;
			let { ret } = yield call( getOrderRecordList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource  : ret.results,
						resultCount : ret.data.resultCount,
						...params
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '列表数据加载出错' )
			}
			yield put({
				type : 'updateState',
				payload : {
					loading : false
				}
			})
		},

		/*通过时间搜索*/
		*searchByTime({ payload },{ call, put, select }){
			let { startDate, endDate, radioGroupValue } = payload;
			let state = yield select( state => state.orderRecordModel );
			yield put({
				type : 'updateState',
				payload : {
					startDate,
					endDate,
					radioGroupValue : radioGroupValue || state.radioGroupValue
				}
			})
			let params = {
				startDate,
				endDate,

				orgId     : state.orgId,

				/*常用搜索*/
				courseId  : state.courseId,
				roomId    : state.roomId,
				stuName   : state.stuName,

				/*高级搜索*/
				mtid      : state.mtid,
				startTime : state.startTime,
				endTime   : state.endTime,

				pageIndex : state.pageIndex,
				pageSize  : state.pageSize,
			}
			yield put({
				type : 'getOrderRecordList',
				payload : {
					params
				}
			})
		},

		/*取消约课记录*/
		*updateStatus({ payload },{ call, put, select }){
			let state = yield select( state => state.orderRecordModel );
			let selectedRows = state.selectedRows;
			if( selectedRows.length > 1 || selectedRows.length == 0 ){
				message.error( '必须选择且只能选择1条记录' );
				return;
			}
			let params = {
				orgId : state.orgId,
				cpStuId : selectedRows[0].cpStuId,
				signType : '6'
			}
			let { ret } = yield call( updateStatus ,( params ));
			if( ret && ret.errorCode == 9000 ){
                message.success('取消成功');
				yield put({
					type : 'updateState',
					payload : {
						selectedRows : [],
						selectedRowKeys : []
					}
				})
				let data = {
					orgId     : state.orgId,

					startDate : state.startDate,
					endDate   : state.endDate,

					/*常用搜索*/
					courseId  : state.courseId,
					roomId    : state.roomId,
					stuName   : state.stuName,

					/*高级搜索*/
					mtid      : state.mtid,
					startTime : state.startTime,
					endTime   : state.endTime,

					pageIndex : state.pageIndex,
					pageSize  : state.pageSize,
				}
				yield put({
					type : 'getOrderRecordList',
					payload : {
						params : data
					}
				})
			}else {
				message.error( ret && ret.errorMessage || '取消失败' )
			}
		},

		/*确认修改固定位*/
		*confirmUpdateFix({ payload },{ call, put, select }){
			let state = yield select( state => state.orderRecordModel );
			let selectedRows = state.selectedRows;
			let ids = [];
			!!selectedRows && selectedRows.length > 0 && selectedRows.map(function( item, index ){
				ids.push( item.cpStuId );
			})
			let { values } = payload;
			let params = {
				fix      : values.status,
				orgId     : state.orgId,
				cpStuIds : !!ids && ids.join(',')
			}
			let { ret } = yield call( confirmUpdateFix, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						updateFixVisible : false,
						selectedRows : [],
						selectedRowKeys : []
					}
				})
				let data = {
					orgId     : state.orgId,

					startDate : state.startDate,
					endDate   : state.endDate,

					/*常用搜索*/
					courseId  : state.courseId,
					roomId    : state.roomId,
					stuName   : state.stuName,

					/*高级搜索*/
					mtid      : state.mtid,
					startTime : state.startTime,
					endTime   : state.endTime,

					pageIndex : state.pageIndex,
					pageSize  : state.pageSize,
				}
				yield put({
					type : 'getOrderRecordList',
					payload : {
						params : data
					}
				})
				message.success( '修改成功' );
			}else{
				message.error( ret && ret.errorMessage || '修改失败' )
			}
		}
	},

    reducers : {
        updateState( state, action ){
            return { ...state, ...action.payload };
        }
    }
}
