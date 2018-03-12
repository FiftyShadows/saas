import {message} from 'antd';
import { parse } from 'qs';

import  {
	getOfflineBookList,getCourses,getCreate,getOfflineBookupdateStatus,getLeadsSummary,getMsg ,getCoursequery,getstusOfUser,

	selectYearToDate,  //选择年月得到日期列表
	getCourseList,     //得到课程下拉列表
	getCourseDataSource //得到排课信息
} from '../../../../services/crm/crmOfflineBooking-service/crmOfflineBooking-service';

//学员签到记录
export default {

	namespace: 'crmOfflineBookingModel',

  state: {
      isChecked         : true, //学员名单 是否被选中
      isPickOn          : false,   //学员试听是否被中
      loading           : false,
      dataSource        : [],
      resultCount       : 0,
      pageIndex         : 0,
      pageSize          : 20,
      selectedRowKeys   : [],
      selectedRows      : [],
      selectedRecordIds : [],

      wetherChear : false,      //是否清空搜索


      wetherClearSearchContent : false,               //切换路由时判断要清空搜索栏数据

      uids : '',
      condition : '',
      source : '',

      createOfflinebookModalVisible : false,
      createOrgId : '',                    //默认选择的校区Id
      createOrgName : '',                  //默认选择的校区名字
      OfflinebookInfo : '',
      createSellerList : [],               //跟进人Leads
      LessonList : [],                     //校区课程
      LeadsList : [],                      //当前账号及其当前账号下属的leads
      CourseList : [],                     //当前校区下某个课程的排课list
      sellerName : '',                     //本账号 跟进人
      sellerId : '' ,                      //本账号 跟进人id


      FastSearchContent : {},              //快捷搜索栏搜索内容

      /*高级搜索*/
      CreateOfflinebookSuperSearchVisible : false,  //高级搜索是否显示
      SuperSearchContent : {},                      //高级搜索栏搜

      selectLessonId : '',                          //新增表单里面选中的课程
      selecttime : '',                              //选中的日期
      selectCourseTime : '',                        //选择课程教室时间

      TableNewColumns : [],                         //table设置
      OfflineType : '',

      routeChange : false,                          //路由改变
      nokindaarr : [],

	  createOfflineBookingBtnLoading : false,

	  dayList          : [],              //有课日期列表
	  courseList       : [],              //课程下拉列表
	  courseDataSource : [],              //当日有课列表

  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/crm_rsv_all') {
                   dispatch({
                       type: 'getMsg',
                       payload: {
                           condition:'all',
                       }
                    });
              }else if ( pathname === 'crm_rsv_mine'){
                  dispatch({
                      type: 'mainLayoutModel/updateState',
                      payload:{
                          SubordinateType : '试听',
                      }
                  });
                  dispatch({
                      type: 'getMsg',
                      payload: {
                          condition:'my',
                      }
                  });

              }
          });
      },
  },

  effects: {
       //获取当前用户名
       *getMsg({ payload },{ call, put, select }){
			yield put({
			   type : 'updateState',
			   payload : {
				   routeChange:true ,
			   }
			});
		 	let { ret } = yield call( getMsg, ({}) );
            if( ret &&  ret.errorCode == '9000')  {
                let condition = payload && payload.condition;
                if (condition == 'my') {
                    yield put({
                        type : 'updateState',
                        payload : {
                            uids:ret.uid ,
                        }
                    })
                    yield put({
                        type: 'getOfflineBookingParams',
                        payload: {
                            condition : 'my',
                            source : '2',
                            isChecked  :false, //学员名单 是否被选中
                            isPickOn : true,   //学员试听是否被中
                            uids : ret.uid ,
                        }
                    });
                }else {
                    yield put({
                        type: 'getOfflineBookingParams',
                        payload: {
                            condition :'all',
                            source : '2',
                            isChecked : false, //学员名单 是否被选中
                            isPickOn : true,   //学员试听是否被中
                        }
                    });
                }
                yield put({
                    type : 'updateState',
                    payload : {
                         sellerName : ret.uName,
                         sellerId : ret.uid ,
                    }
                })
			}
	  },

      //得到预约试听所需参数
      *getOfflineBookingParams({ payload },{ call, put, select }){
          let condition = payload && payload.condition;
          let source =  payload && payload.source;
          let uids = payload.uids;
          yield put({
              type:'updateState',
              payload:{
                  wetherClearSearchContent : true,
                  condition                : condition,
                  source                   : source,
              }
          });

          //uids
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
          if (condition == 'my'){
              yield put({
                  type : 'GetTableList',
                  payload : {
                      pageIndex : 0,
                      pageSize : 20,
                      condition : (condition==undefined) ? crmOfflineBookingModel.condition : condition,
                      source : source,
                      FastSearchContent : crmOfflineBookingModel.FastSearchContent,
                      SuperSearchContent : crmOfflineBookingModel. SuperSearchContent,
                      uids : crmOfflineBookingModel.uids,
                  }
              })
          }else  {
              yield put({
                  type : 'GetTableList',
                  payload : {
                      pageIndex : 0,
                      pageSize : 20,
                      condition : (condition==undefined) ? crmOfflineBookingModel.condition : condition,
                      source : source,
                      FastSearchContent:crmOfflineBookingModel.FastSearchContent,
                      SuperSearchContent:crmOfflineBookingModel. SuperSearchContent,
                  }
              })
          }
      },

      //选择校区查询学员负责人下拉列表
      *TenantSelectOnSelect({ payload },{ call, put, select }){
          let { value } = payload;
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
          if ( crmOfflineBookingModel.isChecked ) {
              let newret = yield call( getLeadsSummary, ({ orgId : value, condition : crmOfflineBookingModel.condition }) );
              if ( newret.ret && newret.ret.errorCode == '9000' )  {
                  yield put({
                      type : 'updateState',
                      payload : {
                          LeadsList : newret.ret.results,
                          createOrgId      : value,
                      }
                  })
              }
          }else{
              let newret = yield call( getstusOfUser, ({ orgId : value, condition:crmOfflineBookingModel.condition}) );
              if ( newret.ret && newret.ret.errorCode == '9000' )  {
                  yield put({
                      type : 'updateState',
                      payload : {
                          LeadsList    : newret.ret.results,
                          createOrgId  : value,
                      }
                  })
              }
          }
      },

      //新增试听记录
      *createOfflinebook({ payload },{ call, put, select }){
		  yield put({
			  type : 'updateState',
			  payload : {
				  createOfflineBookingBtnLoading : true
			  }
		  })
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
          let { orgId, sellerId, stuId, courseId, auditionTime, remark, source, courseName, cpdId, cpmId, auditionEndTime } = payload;
          var newparams = {};
          newparams.orgId = orgId;
          newparams.sellerId = sellerId;
          newparams.stuId = stuId;
          newparams.courseId = courseId;
          newparams.cpdId = cpdId;
          newparams.cpmId =cpmId;
          newparams.auditionTime =  auditionTime;
          newparams.auditionEndTime =auditionEndTime;
          newparams.remark = remark;
          newparams.source = source;
          newparams.courseName = courseName;
          let { ret } = yield call( getCreate, ( newparams ) );
          if( ret && ret.errorCode == '9000' ){
             message.success('新增预约试听成功');
              yield put({
                  type : 'updateState',
                  payload : {
                      selectLessonId   : "",
                      selecttime       : "",
                      selectCourseTime : "",
                      CourseList       : [],
					  courseDataSource              : [],
					  dayList                       : [],
                  }
              })
              yield put({
				type : 'GetTableList',
                 payload : {
                     pageIndex          : crmOfflineBookingModel.pageIndex,
                     pageSize           : crmOfflineBookingModel.pageSize,
                     FastSearchContent  : crmOfflineBookingModel.FastSearchContent,
                     SuperSearchContent : crmOfflineBookingModel.SuperSearchContent,
				  }
              })
          }else{
              message.error( (ret && ret.errorMessage ) || '新增预约试听失败' );
          }
		  yield put({
			  type : 'updateState',
			  payload : {
				  createOfflineBookingBtnLoading : false
			  }
		  })
      },

      *CouseList({ payload },{ call, put, select }){
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
          let { endDate, startDate, lessonId, orgId } = payload;
          var params = {};
          params.orgId = orgId;
          params.courseId = lessonId;
          params.startDate = startDate;
          params.endDate = endDate;
		  params.canTry = 1;

          let { ret } = yield call( getCoursequery, (params) );

          if( ret && ret.errorCode == '9000' ){
              if( ret.results.length  > 0 ){
                  yield put({
                      type : 'updateState',
                      payload : {
                          courseDataSource : ret.results,
                      }
                  })
              }else{
                  message.warn( '没有预约排课明细' );
                  yield put({
                      type : 'updateState' ,
                      payload : {
                          courseDataSource : [],
                      }
                  })
              }
          }else {
              message.error( ( ret && ret.errorMessage ) || '查询预约排课加载失败' );
          }
      },

      //分页
      *pagination({ payload },{ call, put, select }){
          let { pageIndex, pageSize, } = payload;
          let condition = payload && payload.condition;
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
		  yield put({
			 type : 'GetTableList',
			 payload : {
			   pageIndex : payload.pageIndex - 1,
			   pageSize  : payload.pageSize,
			   condition : ( condition == undefined ) ? crmOfflineBookingModel.condition : condition,
			   source : crmOfflineBookingModel.source,
			   FastSearchContent : crmOfflineBookingModel.FastSearchContent,       //更新常用搜索内容项
			   SuperSearchContent : crmOfflineBookingModel.SuperSearchContent,     //更新高级搜索内同
			 }
		  })
      },

      *GetTableList({ payload },{ call, put, select }){
          yield put({
              type : 'updateState',
              payload : {
                  loading : true,
              }
          })
          let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
          payload.condition = crmOfflineBookingModel.condition;
          payload.source = crmOfflineBookingModel.source;
          let fastSearchContent = payload.FastSearchContent || {};
          let superSearchContent = payload.SuperSearchContent || {};
          delete payload.FastSearchContent;
          delete payload.SuperSearchContent;
          let params = { ...payload , ...fastSearchContent , ...superSearchContent };
          let { ret } = yield call(getOfflineBookList,parse(params));
          if (ret && ret.errorCode === 9000 ) {
              if ((ret.results).length == 0 && params.pageIndex > 0){
                  params.pageIndex -= 1;
                  let { ret } = yield call(getOfflineBookList,parse(params));
                  if (ret && ret.errorCode === 9000){
					  yield put({
						  type  :'updateState',
						  payload : {
							  wetherChear       : false,

							  dataSource        : ret.results,
							  resultCount       : ret.data.resultCount,
							  pageIndex         : ret.data.pageIndex,
							  pageSize          : ret.data.pageSize,
							  selectedRowKeys   : [],
							  selectedRows      : [],
							  selectedRecordIds : [],
							  wetherClearSearchContent : false,
							  FastSearchContent : fastSearchContent,    //更新常用搜索内容项
							  SuperSearchContent : superSearchContent,     //更新高级搜索内同
						  }
					  });
                  }else if(ret && ret.errorMessage){
					  message.error(ret.errorMessage);
				  }else{
					  message.error('获取列表数据失败');
                  }
              }else{
                  yield put({
                      type  :'updateState',
                      payload : {
                          wetherChear:false,
                          dataSource        : ret.results,
                          resultCount       : ret.data.resultCount,
                          pageIndex         : ret.data.pageIndex,
                          pageSize          : ret.data.pageSize,
                          selectedRowKeys   : [],
                          selectedRows      : [],
                          selectedRecordIds : [],
                          wetherClearSearchContent : false,
                          FastSearchContent : fastSearchContent,    //更新常用搜索内容项
                          SuperSearchContent : superSearchContent,     //更新高级搜索内同
                      }
                  });
              }

          } else if( ret && ret.errorMessage ){
             ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
               message.error('获取列表数据失败');
            }
          yield put({
              type : 'updateState',
              payload : {
                  loading : false,
              }
          })
      },

	  //取消
      *cancelled({ payload },{ call, put, select }){
          let { ids, status,orgId,orgKind } = payload;
          let { ret } = yield call( getOfflineBookupdateStatus, ({ ids:ids,status:status,orgId:orgId,orgKind:orgKind }) );
          if (ret && ret.errorCode == '9000'){
              let crmOfflineBookingModel = yield select( state => state.crmOfflineBookingModel );
              let params = {
                  pageIndex : crmOfflineBookingModel.pageIndex,
                  pageSize  : crmOfflineBookingModel.pageSize ,
                  condition : crmOfflineBookingModel.condition ,
                  source    : crmOfflineBookingModel.source,
              }
              let { ret } = yield call( getOfflineBookList, ({ ...params }) );
              if( ret && ret.errorCode == '9000' ){
                  message.success(ret.errorMessage || '取消成功')
                  yield put({
                      type : 'updateState',
                      payload : {
                          dataSource        : ret.results,
                          resultCount       : ret.data.resultCount,
                          pageIndex         : ret.data.pageIndex,
                          pageSize          : ret.data.pageSize,
                          selectedRowKeys   : [],
                          selectedRows      : [],
                          selectedRecordIds : [],
                          wetherClearSearchContent : false,
                          ...params
                      }
                  })
              }else{
                  message.error( (ret && ret.errorMessage ) || '试听列表加载失败' );
              }
          }else{
              message.error( (ret && ret.errorMessage )  );
          }
          yield put({
              type : 'updateState',
              payload : {
                  loading : false,
              }
          })
      },

	  //选择日期得到有课的日期
	  *selectYearToDate({ payload },{ call, put, select }){
		  let { month, orgId } = payload;
		  let { ret } = yield call( selectYearToDate, ({ month, orgId }) );
		  if( ret && ret.errorCode == 9000 ){
			  yield put({
				  type : 'updateState',
				  payload : {
					  dayList : ret.dayList
				  }
			  })
		  }else{
			  message.error( ret && ret.errorMessage || '日期列表加载失败' )
		  }
	  },

	  //选择日期得到 课程下拉列表和课程列表
	  *selectDate({ payload },{ call, put, select }){
		  let { value, orgId } = payload;
		  let { ret } = yield call( getCourseList, ({ orgId, studyDate : value }) );
		  if( ret && ret.errorCode == 9000 ){
			  yield put({
				  type : 'updateState',
				  payload : {
					  courseList : ret.results
				  }
			  })
		  }else{
			  message.error( ret && ret.errorMessage || '课程下拉列表加载失败' )
		  }
		  let courseDataSource = yield call( getCoursequery, ({ startDate : value, endDate : value, orgId, canTry : 1 }));
		  if( courseDataSource && courseDataSource.ret && courseDataSource.ret.errorCode == 9000 ){
			  if( courseDataSource.ret.results.length > 0 ){
				  yield put({
					  type : 'updateState',
					  payload : {
						 courseDataSource : courseDataSource.ret.results
					  }
				  })
			  }else{
				  message.warn( '没有预约排课明细' );
				  yield put({
					  type : 'updateState' ,
					  payload : {
						  courseDataSource : [],
					  }
				  })
			  }
		  }else{
			  message.error( ret && ret.errorMessage || '排课明细加载失败' );
		  }
	  }
  },

  reducers: {
	  updateState(state, action) {
          return {...state, ...action.payload};
      },
  }
}
