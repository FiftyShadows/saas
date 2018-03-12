import {message} from 'antd';
import { parse } from 'qs';
import { routerRedux } from 'dva/router';
import {
    getDicSelects,
    getSalesList,
} from '../../../../services/index/common/searchSelectListService';
import {
    getTagIdList,              //得到标签下拉列表
    getSpaceSize,              //得到用户空间状况
} from '../../../../services/erp/student-works/studentWorksService';
import {
    getOfflineBookupdateStatus,
    getCreate,
    getCoursequery,//排课查询
    getstusOfUser,
    getCourses,
    confirmEndCourse,
    endCourse,
    getClassHourInfoList,
    getClassInfo,                              //获取报班信息
    getSingleStu,                              //获取学员详情
    GetCollector,                              //获取收集人下拉列表
    getParentInfo,                             //获取联系人信息
    getStudentWorksList,                       //获取学员作品
    LeadsFollowVisitingPlanChangeItemStatus,   //改变到访记录状态
    LeadsFollowVisitingPlanModalSubmit,        //新增到访记录
    GetVisitingPlanList,                       //获取到访记录列表

    LeadsFollowFollowRecordDeleteItem,         //删除跟进记录
    GetFollowRecordList,                       //跟进记录列表
    LeadsFollowFollowRecordAdd,                //新增跟进记录
    getParentList,                             // 根据学员Id获取联系人Id，姓名
    GetFollowWay,                              //跟进方式
    getStudentInfo,                            //学员编辑信息

    confirmTranslate,                          //确认转移学员
    deleteStudent,                             //删除学员
    getStudentList,
    getStudentappointPerByStuId,               //学员ID查询已预约课时记录列表
    getStudentconsumePerByStuId,               //学员ID查询已消耗课时记录列表
    getStudentCardTabList,                     //学员ID查询会员卡记录列表
	getContractTabList,                        //学员id查询合同记录
	getOrderClassTabList,                      //查询约课记录
    getStudentOfflineTabList,                  //学员Id查询预约记录列表
    getStudentTypeList,                        //学员类型

    getSellerIdList,                           //获取校区下学员负责人
    confirmCreateForm,                         //修改学员
	confirmCreateStu,                          //新增学员

    deleteWork,
    getlistrecordsstuList,                     //获取名单转化记录

	checkStuNameAndPhone,

    huoqudangqianyonghuid,

	selectYearToDate,  //选择年月得到日期列表
	getCourseList,     //得到课程下拉列表

} from '../../../../services/crm/stu-manage-service/studentServiceManage';
import  {
    getMsg
} from '../../../../services/crm/crmOfflineBooking-service/crmOfflineBooking-service'
import {
    getFollowUpRecordList     //跟进记录
} from '../../../../services/erp/student-detail/studentDetailService';
import {
    getStudentDetailInfo
} from '../../../../services/erp/student-detail/studentDetailService';
export default {

    namespace: 'stuManagementModel',

    state : {
        loading                              : false,
        dataSource                           : [],
        resultCount                          : 0,
        total                                : 0,
        pageIndex                            : 0,
        pageSize                             : 20,
        selectedRowKeys                      : [],
        selectedRows                         : [],
        condition                            : 'none',         //是否加载全部数据
        uids                                 : undefined,
        stuCheckColumnKey                    : 'stuCheckColumn',    //保存到localstroage中的学员显示列表的字段名

        /*排序搜索*/
        SortSearchContent                    : {},             //排序搜索项

        /*快捷搜索*/
        FastSearchContent                    : {},             //快捷搜索栏搜索内容

        /*高级搜索*/
        CreateOfflinebookSuperSearchVisible  : false,          //高级搜索是否显示
        SuperSearchContent                   : {},             //高级搜索栏搜

        wetherClearSearchContent             : false,

		/*已消耗课时参数*/
        spenthourTabLoading                  : false,
		spenthourTabList                     : [],
		spenthourTabResultCount              : 0,
		spenthourTabPageSize                 : 20,
		spenthourTabPageIndex                : 0,
		/*已消耗课时参数*/

        reservedsessionList                  : [],             //已预约课时记录列表
		reservedsessionLoading               : false,
		reservedsessionResultCount           : 0,
		reservedsessionPageIndex             : 0,
		reservedsessionPageSize              : 20,

        spenthourTabList                     : [],             //已消耗课时记录列表

        cardTabList                          : [],             //会员卡列表

		contractOrderList                    : [],             //合同列表
		contractOrderLoading                 : false,
		contractOrderResultCount             : 0,
		contractOrderPageIndex               : 0,
		contractOrderPageSize                : 20,

		orderClassList                       : [],
		orderClassLoading                    : false,
		orderClassResultCount                : 0,
		orderClassPageIndex                  : 0,
		orderClassPageSize                   : 20,

        OfflineTabList                       : [],             //根据学员id查询预约记录列表
        OfflineTabresultCount                : '',
        OfflineTabpageIndex                  : 0,
        OfflineTabpageSize                   : 20,
        parenttabList                        : [],             //学员联系人列表
        parenttabnum                         : 0,

        VisitplanTabList                     : [],                            //到访计划列表
        secondChannelList                    : [],                            //二级来源
        orgScaleList                         : [],                            //机构规模
        recommenderList                      : [],                            //推荐人
        collecterIdList                      : [],                            //收集人
		parentRelationList                   : [],                            //联系人关系下拉列表

        nokindaarr                           : [],                            //非早教类

        CreateStumanageSuperSearchVisible    : false,                                  //高级搜索是否显示
        studentTypeList                      : [],                                     //学员类型列表
        edtionStuinfro                       : [],                                     //所要编辑的学员信息
		isShowMore                           : false,                                  //是否显示更多
		stuModalCreateBtnLoading             : false,                                  //新增loading

        translateModalVisible                : false,                                  // 转移学员modal显示
        sellerList                           : [],                                     //销售列表

        selectedRecordIds                    : [],                             //分配转移学员是选中学员Id
        selectedOrgId                        : '',                             //分配转移学员是选中校区Id

        parentListArr                        : [],                             //获取联系人Id，姓名
        leadsFollowFollowRecordPageIndex     : 0,
        leadsFollowFollowRecordPageSize      : 5,
        leadsFollowFollowRecordContentLoading: false,          //当前跟进记录loading状态
        leadsFollowFollowRecordContent       : [],                    //当前leads跟进记录list
        leadsFollowFollowRecordScrollFinish  : false,            //滚动加载是否完成(即数据加载完毕)
        leadsFollowFollowRecordNum           : 0,                         //跟进记录数

        leadsFollowVisitingPlanContentLoading: false,          //当前到访计划loading状态
        leadsFollowVisitingPlanContent       : [],                    //当前学员到访计划list

        leadsFollowVisitingPlanScrollFinish  : false,            //滚动加载是否完成(即数据加载完毕)
        leadsFollowVisitingPlanPageIndex     : 0,
        leadsFollowVisitingPlanPageSize      : 5,
        leadsFollowVisitingPlanModalType     : '',
        leadsFollowVisitingPlanModalVisible  : false,
        leadsFollowVisitingPlanModalContent  : [],

        leadsFollowVisitingPlanNum           : 0,
        reservedsessionListNum               : 0,
        spenthourTabListNum                  : 0,
        cardTabListNum                       : 0,

        ProductionList                       : [],  //作品列表
        ProductionNum                        : 0,
        ProductionPageIndex                  : 0,
        ProductionPageSize                   : 20,

        leadsFollowReservationContentLoading : false,      //当前预约试听loading状态
        leadsFollowReservationContent        : [],             //当前leads预约试听list
        leadsFollowReservationScrollFinish   : false,        //滚动加载是否完成(即数据加载完毕)
        leadsFollowReservationNum            : 0,                          //预约试听条数
        leadsFollowReservationPageIndex      : 0,                    //预约试听页码
        leadsFollowReservationPageSize       : 5,                     //预约试听每页条数
        yuyueshitingdangqianyonghuid         : [{ sellerId : '123' , sellerName : '123' }],                  //当前用户id


        //报班信息
        AttendclassTabList                   : [],
        classInfoLeft                        : '0',
        classInfoTotal                       : '0',
        AttendclassNum                       : 0,
        AttendclassPageIndex                 : 0,
        AttendclassPageSize                  : 20,

        createStudentModalVisible            : false,
        studentBirthday                      : "2017-06-25",
        createOrgId                          : "", //默认选择的校区Id
        createOrgName                        : "", //默认选择的校区名字
        createSellerList                     : [],            //新增框内负责人下拉列表
        saleStatusList                       : [], //跟进状态列表
        sourceList                           : [], //来源下拉框
        leadsFollowWay                       : [], //跟进方式列表

        studentInfo                          : {},            //修改获得的学员信息

        checkStudentVisible                  : false,         //学员查重框
        checkStudentList                     : [],            //学员列表

        UploadModalVisible                   : false,


        isStuDetailVisible                   : false,
        closableVisible                      : true,
        studentDetailInfo                    : {},

        showlistrecordsModal                 : false,//名单转化记录是否显示
        listrecordsstuList                   : [],
        listrecordsstuPageIndex              : 0,
        listrecordsstuPageSize               : 20,
        listrecordsstuCount                  : 0,
        listrecordsstustuId                  : '',

        sellerName                           : '',
        sellerId                             : '',

        stuId                                : '',

        checkName                            : '',

        selctStuDetailId                     : '',
        selctStuDetailorgId                  : '',
        changeTableTab                       : '',

        TableNewColumns                      : [],//table设置

        //弹出确认框
        stuDetailModalAlertVisible           : false,
        stuDetailModalAlertMessage           : {   },
        stuDetailDetailModalAlertTitle       : '',
        stuDetailDetailModalAlertContent     : '',

        routeChange                          : false,  //路由是否改变

        //停课
        classEndReasonModalVisible           : false,
        stuCourseId                          : '',

        //新增试听
        createOfflinebookModalVisible        : false,
        isChecked                            : false,
        isPickOn                             : false,
        OfflinebookInfo                      : {},

        LessonList                           : [],//校区课程
        LeadsList                            : [],//当前账号及其当前账号下属的leads
        CourseList                           : [], //当前校区下某个课程的排课list
        OfflinebookcreateOrgId               : '', //默认选择的校区Id
        OfflinebookcreateOrgName             : '', //默认选择的校区名字
        selectLessonId                       : '',//新增表单里面选中的课程
        selecttime                           : '',//选中的日期
        selectCourseTime                     : {},

        serchrouteChange                     :false,

    },

    subscriptions: {
        setup({dispatch, history}) {
            history.listen(({pathname, query}) => {
				 if(pathname === '/crm_stu_alllist') {
                    dispatch({
                        type : 'getParams',
                        payload : {
                            condition: 'all',
                        }
                    });
                     dispatch({
                         type:'huoqudangqianyonghuid'
                     });
                }else if ( pathname === '/crm_stu_list') {
                    dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload: {
                            SubordinateType: '付费客户',
                        }
                    });
                    dispatch({
                        type: 'getParams',
                        payload: {
                            condition: 'my',
                        }
                    });
                    dispatch({
                         type:'huoqudangqianyonghuid'
                     });
                }
            });
        },
    },

    effects: {

		/*新建修改是查重学员 姓名与手机号*/
		*checkStuNameAndPhone({ payload },{ call, put, select }){
			let { ret } = yield call( checkStuNameAndPhone, parse(payload) );
            if( ret && ret.errorCode === 1000 ){
                message.error( ret && ret.errorMessage || '有重复' );
            }
		},

        *huoqudangqianyonghuid({ payload }, { call, put, select }){
            let { ret } = yield call(huoqudangqianyonghuid);
            if(ret && ret.errorCode === 9000){
                let yuyueshitingdangqianyonghuid = [{ sellerId : ret.userId , sellerName : ret.userName }]
                yield put({
                    type:'updateState',
                    payload:{
                        yuyueshitingdangqianyonghuid,
                    }
                });
            }else{
                ret && ret.errorMessage || '获取当前用户信息失败'
            }
        },

        //得到预约试听所需参数
        *getParams({payload}, {call, put, select}){
            yield put({
                type : 'updateState',
                payload : {
                    routeChange : true,
                    serchrouteChange :true,
                }
            })

			let condition = payload && payload.condition;

            yield put({
                type: 'updateState',
                payload: {
                    wetherClearSearchContent : true,
                    condition : condition,
                }
            });

            //获取uids
            let getMsgret = yield call(getMsg);
            if (getMsgret.ret && getMsgret.ret.errorCode == '9000') {
                if (condition == 'my') {
                    yield put({
                        type: 'updateState',
                        payload: {
                            uids: getMsgret.ret.uid,
                        }
                    });
                    yield put({
                        type: 'updateState',
                        payload: {
                            sellerName : getMsgret.ret.uName,
                            sellerId : getMsgret.ret.uid,
                        }
                    });

                    let stuManagementModel = yield select(state => state.stuManagementModel);
                    yield put({
                        type: 'GetStuList',
                        payload: {
                            pageIndex: 0,
                            pageSize: 20,
                            condition: (condition == undefined) ? stuManagementModel.condition : condition,
                            uids : getMsgret.ret.uid,

                            FastSearchContent: stuManagementModel.FastSearchContent,
                            SuperSearchContent: stuManagementModel.SuperSearchContent,
                        }
                    })

                }else if (condition == 'all') {

                    let stuManagementModel = yield select(state => state.stuManagementModel);

                    yield put({
                        type: 'GetStuList',
                        payload: {
                            pageIndex: 0,
                            pageSize: 20,
                            condition : ( condition == undefined ) ? stuManagementModel.condition : condition,
                            uids : getMsgret.ret.uid,
                            FastSearchContent: stuManagementModel.FastSearchContent,
                            SuperSearchContent: stuManagementModel.SuperSearchContent,
                        }
                    })
                }
            }

            //获取机构类型下拉列表
            let studentTypeList = yield call(getStudentTypeList, ({dictkey: 'studentType'}));
            if (studentTypeList.ret && studentTypeList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        studentTypeList: studentTypeList.ret.list
                    }
                })
            } else {
                message.error('获得机构类型下拉列表失败');
            }

            //获取二级来源
            let secondChannelList = yield call(getStudentTypeList, ({dictkey: 'secondChannel'}));
            if (secondChannelList.ret && secondChannelList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        secondChannelList: secondChannelList.ret.list
                    }
                })
            } else {
                message.error('获得二级来源下拉列表失败');
            }

            //获取学员类型下拉列表
            let leadsFollowWayList = yield call(GetFollowWay, ({dictkey: 'studentFollowWay'}));
            if (leadsFollowWayList.ret && leadsFollowWayList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        leadsFollowWay: leadsFollowWayList.ret.list
                    }
                })
            } else {
                message.error('获得跟进方式列表失败');
            }

            //获取跟进状态下拉列表
            let saleStatusList = yield call(getDicSelects, ({ dictkey: 'studentFollowState' }));
            if (saleStatusList.ret && saleStatusList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        saleStatusList: saleStatusList.ret.list
                    }
                })
            } else {
                message.error('获得跟进状态下拉列表失败')
            }

            //获取来源下拉列表
            let sourceList = yield call(getDicSelects, ({ dictkey : 'firstChannel' }));
            if (sourceList.ret && sourceList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        sourceList: sourceList.ret.list
                    }
                })
            } else {
                message.error('获得来源下拉列表失败')
            }

//			//获取联系人关系下拉列表
//			let parentRelationList = yield call( getDicSelects, ({ dictkey : 'parentRelationship' }));
//			if( parentRelationList && parentRelationList.ret && parentRelationList.ret.errorCode == 9000 ){
//				yield put({
//					type : 'updateState',
//					payload : {
//						parentRelationList : parentRelationList.ret.list
//					}
//				})
//			}else{
//				message.error('获取联系人关系下拉列表失败')
//			}

            let orgScaleList = yield call(getDicSelects, ({ dictkey : 'orgSize' }))
            if( orgScaleList && orgScaleList.ret && orgScaleList.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						orgScaleList : orgScaleList.ret.list
					}
				})
			}else{
				message.error('获取机构规模失败')
			}
        },

        //获取报班信息
        *getAttendclassList({payload}, {call, put, select}){
            let { ret } = yield call( getClassInfo, ({ ...payload }));

            if( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        AttendclassTabList: ret.results,
                        AttendclassNum: ret.data.resultCount,
                        AttendclassPageIndex: ret.data.pageIndex,
                        AttendclassPageSize: ret.data.pageSize,
                    }
                })
            }else {
               // message.error( ( ret && ret.errorMessage ) || '报班列表加载失败' )
            };
        },


        //得到课时余额与总额
        *getClassHourInfoDetail({ payload },{ call, put, select }){
            let { stuId, orgId } = payload;
            let params = {
                stuId     : stuId,
                orgId     : orgId,
               // pageIndex : 0,
               // pageSize  : 10,
            }
            let { ret } = yield call( getClassHourInfoList, ({ ...params }));
            if( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        classInfoLeft:ret.data.periodAvailable,
                        classInfoTotal: ret.data.periodAll,
                    }
                })
            };
        },

        *Attendclasspagination({payload}, {call, put, select}){
            let { pageIndex, pageSize } = payload;

            let stuManagementModel = yield select(state => state.stuManagementModel);

            yield put({
                type: 'getAttendclassList',
                payload: {
                    pageIndex: payload.pageIndex - 1,
                    pageSize : payload.pageSize,
                    stuId: stuManagementModel.studentDetailInfo.id,
                    orgId: stuManagementModel.studentDetailInfo.orgId,
                }
            })
        },

        *GetStuList({ payload },{ call, put, select }){
            yield put({
                type : 'updateState',
                payload : {
                    loading : true,
                }
            })
            let stuManagementModel = yield select(state => state.stuManagementModel);
            payload.condition = stuManagementModel.condition;
            let fastSearchContent = stuManagementModel.serchrouteChange ? {} : payload && payload.FastSearchContent ? payload.FastSearchContent : stuManagementModel.FastSearchContent ;
			let superSearchContent = stuManagementModel.serchrouteChange ? {} : payload && payload.SuperSearchContent ? payload.SuperSearchContent : stuManagementModel.SuperSearchContent;
			let sortSearchContent = stuManagementModel.serchrouteChange ? {} : payload && payload.SortSearchContent ? payload.SortSearchContent : stuManagementModel.SortSearchContent;
            delete payload.FastSearchContent;
            delete payload.SuperSearchContent;
            delete payload.SortSearchContent;
            let params = { ...payload, ...fastSearchContent, ...superSearchContent , ...sortSearchContent };
            let { ret } = yield call(getStudentList, parse(params));
            yield put({
                type : 'updateState',
                payload : {
                    serchrouteChange:false,
                }
            })
            if (ret && ret.errorCode === 9000) {
                // let dataSource = crmOfflineBookingModel.dataSource;        //格式化一级来源时需要遍历比对
                if ((ret.results).length == 0 && params.pageIndex > 0) {
                    params.pageIndex -= 1;
                    let {ret} = yield call(getStudentList, parse(params));
                    if (ret && ret.errorCode === 9000) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                wetherClearSearchContent : false,

                                dataSource               : ret.results,
                                resultCount              : ret.data.resultCount,
                                pageIndex                : ret.data.pageIndex,
                                pageSize                 : ret.data.pageSize,
                                selectedRowKeys          : [],
                                selectedRows             : [],
                                selectedRecordIds        : [],
                                wetherClearSearchContent : false,
                                FastSearchContent        : stuManagementModel.serchrouteChange ? '' : fastSearchContent,     //更新常用搜索内容项
                                SuperSearchContent       : stuManagementModel.serchrouteChange ? '' : superSearchContent,    //更新高级搜索内容
                                SortSearchContent        : stuManagementModel.serchrouteChange ? '' : sortSearchContent,     //更新排序搜索内容

                                isStuDetailVisible       : false
                            }
                        });
                    } else if (ret && ret.errorMessage) {
                        message.error(ret.errorMessage);
                    } else {
                        message.error('获取列表数据失败');
                    }
                } else {
                    yield put({
                        type: 'updateState',
                        payload: {
                            dataSource               : ret.results,
                            resultCount              : ret.data.resultCount,
                            pageIndex                : ret.data.pageIndex,
                            pageSize                 : ret.data.pageSize,
                            selectedRowKeys          : [],
                            selectedRows             : [],
                            selectedRecordIds        : [],
                            wetherClearSearchContent : false,
                            FastSearchContent        : stuManagementModel.serchrouteChange ? '' : fastSearchContent,    //更新常用搜索内容项
                            SuperSearchContent       : stuManagementModel.serchrouteChange ? '' : superSearchContent,   //更新高级搜索内同
                            SortSearchContent        : stuManagementModel.serchrouteChange ? '' : sortSearchContent,    //更新排序搜索内容

                            isStuDetailVisible       : false
                        }
                    });
                }
            }else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else {
                message.error('获取列表数据失败');
            }
            yield put({
                type: 'updateState',
                payload: {
                    loading: false,
                }
            })
        },

        //获取学员详情
        *getSingleStu({payload}, {call, put, select}){
			yield put({
				type : 'updateState',
				payload : {
					classInfoLeft : '0',
					classInfoTotal : '0'
				}
			})
            let { stuId, orgId } = payload;
            let params = {
                stuId : stuId,
                orgId : orgId,
            }
            let {ret} = yield call( getSingleStu, ({...params}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        studentDetailInfo  : ret.data,
                        isStuDetailVisible : true,
                        changeTableTab     : "StuDetailTab",
                    }
                })
            } else {
                message.error((ret && ret.errorMessage ) || '加载失败');
            }
        },

        //分页
        *pagination({payload}, {call, put, select}){
            let { pageIndex, pageSize } = payload;
            let condition = payload && payload.condition;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            yield put({
                type: 'GetStuList',
                payload: {
                    pageIndex          : payload.pageIndex - 1,
                    pageSize           : payload.pageSize,
                    condition          : (condition == undefined) ? stuManagementModel.condition : condition,
                    FastSearchContent  : stuManagementModel.FastSearchContent,
                    SuperSearchContent : stuManagementModel.SuperSearchContent,
                }
            })
        },

        //学员查重
        *checkStudentStatus({payload}, {call, put, select}){
            let { name, orgId } = payload;
            if ( !orgId ) {
                message.error('校区必选');
            } else {
                let params = {
                    pageSize  : 10000,          //拿到所有数据
                    pageIndex : 0,
                    orgId     : orgId,
                    name      : name,
                    condition : 'all',
                }
                let {ret} = yield call(getStudentList, ({...params}));

                if (ret && ret.errorCode == '9000') {
                    yield put({
                        type: 'updateState',
                        payload: {
                            checkStudentList    : ret.results,
                            checkStudentVisible : true,
                            checkName           : name,
                        }
                    })
                } else {
                    message.error((ret && ret.errorMessage ) || '加载失败');
                }
            }
        },

        //查询课程时间
        *CouseList({ payload },{ call, put, select }){

            let stuManagementModel = yield select( state => state.stuManagementModel );
            let { endDate, startDate, lessonId, orgId } = payload;
            var params = {};
            params.orgId = orgId;
            params.courseId = lessonId;
            params.startDate =startDate;
            params.endDate = endDate;


            let { ret } = yield call(getCoursequery,parse(params));

            if  (ret  && ret.errorCode == '9000' ){

                if  (ret.results.length  > 0 ){

                    yield put({
                        type :'updateState' ,
                        payload : {
                            courseDataSource : ret.results,
                        }
                    })
                }else {
                    message.warn( '没有预约排课明细');
                    yield put({
                        type :'updateState' ,
                        payload : {
                            courseDataSource : [],
                        }
                    })
                }
            }else {
                message.error( (ret && ret.errorMessage ) || '查询预约排课加载失败' );
            }



        },
        //新增试听记录
        *createOfflinebook({ payload },{ call, put, select }){
            let stuManagementModel = yield select( state => state.stuManagementModel );
            let {  orgId,sellerId,stuId,courseId,auditionTime,remark,source,courseName,cpdId,cpmId,auditionEndTime } = payload;
            var newparams = { };
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
						courseList       : [],
						dayList          : [],
						courseDataSource : []
                    }
                })
                yield put({
                    type : 'OfflineTabList',
                    payload : {
                        pageIndex: 0,
                        pageSize: stuManagementModel.leadsFollowReservationPageSize,
                        source : 1,
                        orgId : stuManagementModel.studentDetailInfo.orgId,
                        stuId : stuManagementModel.studentDetailInfo.id,
                        Operation : 'openNew'
                    }
                })
            }else  {
                message.error( (ret && ret.errorMessage ) || '新增预约试听失败' );
            }
        },

        //选择校区查询学员负责人下拉列表
        *TenantSelectOnSelect({payload}, {call, put, select}){
            let { value } = payload;
            let stuManagementModel = yield select( state => state.stuManagementModel );
            let { ret } = yield call( getSellerIdList, ({ orgId : value, condition : stuManagementModel.condition }));
            if ( ret && ret.errorCode == '9000' ) {
                yield put({
                    type : 'updateState',
                    payload : {
                        createSellerList : ret.results,
                        createOrgId      : value,
                    }
                })
            }

            //获取推荐人  recommenderList : ret.results, //推荐人 就是联系人
            let recommenderList = yield call(getParentList, ({orgId: value}));
            if (recommenderList.ret && recommenderList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        recommenderList : recommenderList.ret.results,
                    }
                })
            } else {
//                message.error(( recommenderList.ret && recommenderList.ret.errorMessage ) || '查询推荐人列表加载失败');
            }

            //GetCollector,  collecterIdList  收集人列表
            let collecterIdList = yield call(GetCollector, ({orgId: value}));
            if (collecterIdList.ret && collecterIdList.ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        collecterIdList: collecterIdList.ret.results,
                    }
                })
            } else {
//                message.error(( collecterIdList.ret && collecterIdList.ret.errorMessage ) || '查询收集人列表加载失败');
            }

            //查询校区学员列表
            let newret = yield call( getstusOfUser, ({ orgId : value, condition:stuManagementModel.condition}) );
            if (newret.ret && newret.ret.errorCode == '9000')  {
                yield put({
                    type : 'updateState',
                    payload : {
                        LeadsList              : newret.ret.results,
                        OfflinebookcreateOrgId : value,
                    }
                })
            }

            //查询校区课程
            let  Coursesret  = yield call( getCourses, ({ orgId : value }) );
            if( Coursesret.ret && Coursesret.ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        LessonList : Coursesret.ret.results,
                    }
                })
            }
        },

		//查询学员预约课时记录
		*ReservedsessionTabList({ payload },{ call, put, select }){
			let state = yield select( state => state.stuManagementModel )
			let { id, orgId } = payload;
			let params = {
				stuId : id,
				pageIndex : 0,
				pageSize : state.reservedsessionPageSize
			}
			yield put({
				type : 'getReservedsessionList',
				payload : {
					params
				}
			})
		},

		*getReservedsessionList({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					loading : true,
					reservedsessionLoading : true
				}
			})
			let { params } = payload;
			let { ret } = yield call( getStudentappointPerByStuId, ( params ) );
			if( ret && ret.errorCode == 9000 ){
				yield put({
                    type: 'updateState',
                    payload: {
                        reservedsessionList        : ret.results,
                        reservedsessionResultCount : ret.data.resultCount,
						reservedsessionPageSize    : params.pageSize,
						reservedsessionPageIndex   : params.pageIndex,
                    }
                })
			}else {
                message.error((ret && ret.errorMessage ) || '查询学员预约课时记录加载失败');
            }
			yield put({
				type : 'updateState',
				payload : {
					loading : false,
					reservedsessionLoading : false
				}
			})
		},

		//已预约课时记录分页
		*reservedsessionPagination({ payload },{ call, put, select }){
			let state = yield select( state => state.stuManagementModel );
			let studentDetailInfo = state.studentDetailInfo;
			let { reservedsessionPageSize, reservedsessionPageIndex } = payload;
			let params = {
				pageSize : reservedsessionPageSize,
				pageIndex : reservedsessionPageIndex - 1,
				stuId : studentDetailInfo.id
			}
			yield put({
				type : 'getReservedsessionList',
				payload : {
					params
				}
			})
		},


        //查询学员消耗课时记录
		*SpenthourTabList({ payload },{ call, put, select }){
			let { id, orgId } = payload;
			let params = {
				stuId     : id,
				pageIndex : 0,
				pageSize  : 20
			}
			yield put({
				type : 'getSpenthoutTabList',
				payload : {
					params
				}
			})
		},
		*getSpenthoutTabList({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					loading : true,
					spenthourTabLoading : true
				}
			})
			let { params } = payload;
			let { ret } = yield call( getStudentconsumePerByStuId, ( params ) );
			if( ret && ret.errorCode == 9000 ){
				 yield put({
                    type : 'updateState',
                    payload : {
                        spenthourTabList        : ret.results,
                        spenthourTabResultCount : ret.data.resultCount,
						spenthourTabPageSize    : params.pageSize,
						spenthourTabPageIndex   : params.pageIndex,
                    }
                })
			}else {
                message.error((ret && ret.errorMessage ) || '查询学员消耗课时记录加载失败');
            }
			yield put({
                type : 'updateState',
                payload : {
                    loading : false,
					spenthourTabLoading : false
                }
            })
		},

		//已消耗课时列表分页
		*spenthourTabPagination({ payload },{ call, put, select }){
			let state = yield select( state => state.stuManagementModel );
			let studentDetailInfo = state.studentDetailInfo;
			let { spenthourTabPageSize, spenthourTabPageIndex } = payload;
			let params = {
				pageIndex : spenthourTabPageIndex - 1,
				pageSize : spenthourTabPageSize,
				stuId    : studentDetailInfo.id
			}
			yield put({
				type : 'getSpenthoutTabList',
				payload : {
					params
				}
			})
		},

		*orderClassTabList({ payload },{ call, put, select }){
			let { id, orgId } = payload;
			let state = yield select( state => state.stuManagementModel );
			let params = {
				stuId : id,
				pageIndex : 0,
				pageSize  : 20,
				orgId
			}
			yield put({
				type : 'getOrderClassTabList',
				payload : { params }
			})
		},

		*getOrderClassTabList({ payload },{ call, put, select }){
			let { params } = payload;
			yield put({ type : 'updateState', payload : { orderClassTabLoading : true } });
			let { ret } = yield call( getOrderClassTabList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						orderClassList        : ret.results,
						orderClassResultCount : ret.data.resultCount,
						orderClassPageIndex   : params.pageIndex,
						orderClassPageSize    : params.pageSize,
					}
				})
			}
			yield put({ type : 'updateState', payload : { orderClassTabLoading : false } });
		},

		*orderClassPagination({ payload },{ call, put, select }){
			let { pageIndex, pageSize } = payload;
			let state = yield select( state => state.stuManagementModel );
			let studentDetailInfo = state.studentDetailInfo;
			let params = {
				pageSize  : 20,
				pageIndex : pageIndex - 1,
				stuId     : studentDetailInfo.id,
				orgId     : studentDetailInfo.orgId
			}
			yield put({
				type : 'getOrderClassTabList',
				payload : {
					params
				}
			})
		},

        //根据学员Id查询会员卡
        *CardTabList({ payload }, { call, put, select }){
            yield put({ type : 'updateState', payload : { loading: true } })
            let { studentDetailInfo } = payload;
			let params = {
				orgId  : studentDetailInfo.orgId,
				stuId : studentDetailInfo.id
			}
            let { ret } = yield call( getStudentCardTabList, ( params ));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        cardTabList : ret
                    }
                })
            } else {
                message.error(( ret && ret.errorMessage ) || '查询会员卡记录加载失败');
            }
            yield put({ type: 'updateState', payload: { loading : false } })
        },

		//根据学员id查询合同
		*contractTabList({ payload },{ call, put, select }){
			let state = yield select( state => state.stuManagementModel );
			let { id, orgId } = payload;
			let params = {
				stuId : id,
				pageSize  : state.contractOrderPageSize,
				pageIndex : 0,
				condition : 'all'
			}
			yield put({
				type : 'getContractTabList',
				payload : {
					params
				}
			})
		},

		*getContractTabList({ payload },{ call, put, select }){
			let { params } = payload;
			yield put({
				type : 'updateState',
				payload : {
					contractLoading : true
				}
			})
			let { ret } = yield call( getContractTabList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						contractOrderList        : ret.results,
						contractOrderResultCount : ret.data.resultCount,
						contractOrderPageIndex   : params.pageIndex,
						contractOrderPageSize    : params.pageSize,
					}
				})
			}
			yield put({
				type : 'updateState',
				payload : {
					contractLoading : false
				}
			})
		},

		//合同tab分页
		*contractOrderPagination({ payload },{ call, put, select }){
			let state = yield select( state => state.stuManagementModel );
			let studentDetailInfo = state.studentDetailInfo;
			let { contractOrderPageIndex, contractOrderPageSize } = payload;
			let params = {
				pageSize  : contractOrderPageSize,
				pageIndex : contractOrderPageIndex - 1,
				stuId     : studentDetailInfo.id,
				condition : 'all'
			}
			yield put({
				type : 'getContractTabList',
				payload : {
					params
				}
			})
		},

        //根据学员Id查询学员联系人
        *ParentTabList ({payload}, {call, put, select}){
            yield put({
                type: 'updateState',
                payload: {
                    loading: true,
                }
            })
            let {
                id,
                orgId,
            } = payload;


            yield put({
                type: 'updateState',
                payload: {
                    loading: false,
                }
            })
        },

        //取消
        *cancelled({ payload },{ call, put, select }){
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let { ids, status, orgId, orgKind } = payload;
            let { ret } = yield call( getOfflineBookupdateStatus, ({ ids:ids,status:status,orgId:orgId,orgKind:orgKind }) );
            if (ret && ret.errorCode == '9000'){
                yield put({
                    // type: 'updateState',
                    // payload: {
                    //     leadsFollowReservationNum: ret.data.resultCount,
                    //     leadsFollowReservationScrollFinish: true,                 //已结束
                    //     leadsFollowReservationContent: ret.results,
                    //     leadsFollowReservationPageIndex: ret.data.pageIndex,
                    //     leadsFollowReservationPageSize: ret.data.pageSize,
                    // }
                    type : 'OfflineTabList',
                    payload : {
                        pageIndex : 0,
                        pageSize : stuManagementModel.leadsFollowReservationPageSize,
                        // condition : condition,
                        source : 1,
                        orgId : stuManagementModel.studentDetailInfo.orgId,
                        stuId : stuManagementModel.studentDetailInfo.id,
                        Operation : 'openNew'
                    }
                });
            }else  {
                message.error( (ret && ret.errorMessage )  );
            }
            yield put({
                type : 'updateState',
                payload : {
                    loading : false,
                }
            })
        },

    	//根据学员Id查询预约列表
        *OfflineTabList({payload}, {call, put, select}){
            yield put({
                type: 'updateState',
                payload: {
                    leadsFollowReservationContentLoading : true,
                }
            })

            let Operation = '';
            if (payload && payload.Operation) {
                Operation = payload.Operation;
                delete payload.Operation;
            }

            let {ret} = yield call(getStudentOfflineTabList, parse(payload));
            if (ret && ret.errorCode === 9000) {
                //格式化status
                for (let i in ret.results) {
                    switch (ret.results[i].status) {
                        case '0' :
                            ret.results[i].status = '取消';
                            break;
                        case '1' :
                            ret.results[i].status = '已预约';
                            break;
                        case '2' :
                            ret.results[i].status = '已试听';
                            break;
                        case '3' :
                            ret.results[i].status = '旷课';
                            break;
                        default :
                            ret.results[i].status = '无';
                            break;
                    }
                }
                let leadsFollow = yield select(state => state.leadsFollow);
                let pageSize = leadsFollow.leadsFollowReservationPageSize;                              //预约试听列表pageSize
                let leadsFollowReservationContent = leadsFollow.leadsFollowReservationContent;          //预约试听列表list
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if (Operation == 'add' || Operation == 'openNew') {
                    //新增预约试听成功后或者打开新的leads查看预约试听时平滑滚动到滚动条顶端
                    if (document.getElementById('leads_reservation_inner_list')) {
                        let div = document.getElementById('leads_reservation_inner_list');
                        let timer = setInterval(function () {
                            let scrollTop = div.scrollTop;
                            let ispeed = Math.floor(-scrollTop / 6);
                            if (scrollTop == 0) {
                                clearInterval(timer);
                            }
                            div.scrollTop = scrollTop + ispeed;
                        }, 30);
                    }
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowReservationNum: ret.data.resultCount,
                                leadsFollowReservationScrollFinish: true,
                                leadsFollowReservationContent: ret.results,
                                leadsFollowReservationPageIndex: ret.data.pageIndex,
                                leadsFollowReservationPageSize: ret.data.pageSize,
                            }
                        });
                    } else {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowReservationNum: ret.data.resultCount,
                                leadsFollowReservationScrollFinish: false,
                                leadsFollowReservationContent: ret.results,
                                leadsFollowReservationPageIndex: ret.data.pageIndex,
                                leadsFollowReservationPageSize: ret.data.pageSize,
                            }
                        });
                    }
                } else {
                    //如果不是新增，则表明是刚打开或者下拉刷新
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowReservationNum: ret.data.resultCount,
                                leadsFollowReservationScrollFinish: true,                     //已结束
                                leadsFollowReservationContent: ret.results,
                                leadsFollowReservationPageIndex: ret.data.pageIndex,
                                leadsFollowReservationPageSize: ret.data.pageSize,
                            }
                        });
                    } else if (payload.pageIndex > 0 && ret.results.length < pageSize) {       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for (let i in ret.results) {
                            leadsFollowReservationContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowReservationNum: ret.data.resultCount,
                                leadsFollowReservationScrollFinish: true,                 //已结束
                                leadsFollowReservationContent,
                                leadsFollowReservationPageIndex: ret.data.pageIndex,
                                leadsFollowReservationPageSize: ret.data.pageSize,
                            }
                        });
                    } else {      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for (let i in ret.results) {
                            leadsFollowReservationContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowReservationNum: ret.data.resultCount,
                                leadsFollowReservationScrollFinish: false,                //未结束
                                leadsFollowReservationContent,
                                leadsFollowReservationPageIndex: ret.data.pageIndex,
                                leadsFollowReservationPageSize: ret.data.pageSize,
                            }
                        });
                    }
                }
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('获取预约试听列表失败');
            }

            yield put({
                type: 'updateState',
                payload: {
                    leadsFollowReservationContentLoading: false,
                }
            })
        },

        //转移学员
        *translateStudent({payload}, {call, put, select}){
            let {selectedRecordIds, selectedOrgIds, translateModalVisible} = payload;
            let isTranslate = true;
            selectedOrgIds.map(function (item, index) {
                if (item !== selectedOrgIds[0]) {
                    isTranslate = false;
                    message.error('不能选择不同校区的学员');
                    return;
                }
            });
            if (!!isTranslate) {
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let condition = stuManagementModel.condition;
                let {ret} = yield call(getSellerIdList, ({orgId: selectedOrgIds[0], condition,}));
                if (ret && ret.errorCode == '9000') {
                    yield put({
                        type: 'updateState',
                        payload: {
                            selectedRecordIds,
                            sellerList: ret.results,
                            selectedOrgId: selectedOrgIds[0],
                            translateModalVisible: !translateModalVisible
                        }
                    });
                }
            }
        },

        //确认转移学员
        *confirmTranslate({payload}, {call, put, select}){
            let {values} = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let obj = {
                orgId: stuManagementModel.selectedOrgId,
                ids: stuManagementModel.selectedRecordIds.join(','),
                ...values
            }
            let {ret} = yield call(confirmTranslate, ({...obj}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'GetStuList',
                    payload: {
                        pageIndex: stuManagementModel.pageIndex,
                        pageSize: stuManagementModel.pageSize,
                        condition: stuManagementModel.condition,

                        FastSearchContent: stuManagementModel.FastSearchContent,
                        SuperSearchContent: stuManagementModel.SuperSearchContent,
                    }
                });
                yield put({
                    type: 'updateState',
                    payload: {
                        selectedOrgId: '',
                        sellerList: [],
                        selectedRecordIds: [],
                        translateModalVisible: false,
                    }
                })
            }
        },

        *confirmEndCourse({ payload },{ call, put, select }){
            let { parpam, classEndReasonModalVisible } = payload;
            let stuManagementModel = yield select( state => state.stuManagementModel );
            let values = {
                stuCourseId : stuManagementModel.stuCourseId,
                orgId       : stuManagementModel.studentDetailInfo.orgId,
                reason      : parpam.endClassReason,
                backDay     : parpam.endClassTime.format('YYYY-MM-DD'),
            }
            let { ret } = yield call( confirmEndCourse, ({ ...values }));
            if( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        classEndReasonModalVisible : !classEndReasonModalVisible,
                        stuCourseId                : '',
                    }
                });
                yield put({
                    type : 'getAttendclassList',
                    payload : {
                        orgId     : stuManagementModel.studentDetailInfo.orgId,
                        stuId     : stuManagementModel.studentDetailInfo.id,
                        pageIndex : stuManagementModel.AttendclassPageIndex,
                        pageSize  : 20,
                    }
                })
            }
		},

        *reshList({ payload },{ call, put, select }){
            let stuManagementModel = yield select( state => state.stuManagementModel );
            yield put({
                type : 'getAttendclassList',
                payload : {
                    orgId     : stuManagementModel.studentDetailInfo.orgId,
                    stuId     : stuManagementModel.studentDetailInfo.id,
                    pageIndex : 0,
                    pageSize  : 20,
                }
            })
		},

        //报课信息结束课程
         *endCourse({ payload },{ call, put, select }){

             let { id } = payload;
             let stuManagementModel = yield select( state => state.stuManagementModel );
             let params = {
                 orgId       : stuManagementModel.studentDetailInfo.orgId,
                 stuCourseId : id,
             };
             let { ret } = yield call( endCourse, ({ ...params }));
             if( ret && ret.errorCode == '9000' ){
                 yield put({
                     type : 'getAttendclassList',
                     payload : {
                         orgId: stuManagementModel.studentDetailInfo.orgId,
                         stuId: stuManagementModel.studentDetailInfo.id,
                         pageIndex: stuManagementModel.AttendclassPageIndex,
                         pageSize: 20,
                     }
                 })
             }


         },

        //删除学员
        *deleteStudent({payload}, {call, put, select}){
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let {id} = payload;
            let {ret} = yield call(deleteStudent, ({stuIds: id}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'GetStuList',
                    payload: {
                        pageIndex: stuManagementModel.pageIndex,
                        pageSize: stuManagementModel.pageSize,
                        condition: stuManagementModel.condition,

                        FastSearchContent: stuManagementModel.FastSearchContent,
                        SuperSearchContent: stuManagementModel.SuperSearchContent,
                    }
                });

                yield put({
                    type: 'updateState',
                    payload: {
                        isStuDetailVisible: false,
                        stuDetailModalAlertVisible : false,
                    }
                });

            }
        },

        //学员新增
        *confirmCreateForm({payload}, {call, put, select}){
			yield put({
				type : 'updateState',
				payload : {
					stuModalCreateBtnLoading : true
				}
			})
            let { values, createStudentModalVisible } = payload;
            let stuManagementModel = yield select( state => state.stuManagementModel );
            let birthday   = '';
            let headimgurl = '';
            if ( values.headimgurl && values.headimgurl.length > 0 ) {
                let head_img_item = values.headimgurl[0];
                let head_img_item_res = head_img_item.response;
                if (head_img_item_res && head_img_item_res.errorCode == 9000) {
                    headimgurl = head_img_item_res.data.url;
                } else {
                    headimgurl = head_img_item.url || "";
                }
            } else {
                if ( values.sex == '1' ) {
                    headimgurl = 'https://img.ishanshan.com/gimg/img/300f433150bdfe4c13fa0e137efce725'
                } else if ( values.sex == '2' ) {
                    headimgurl = 'https://img.ishanshan.com/gimg/img/85148fc80751d0efcf809ddab826ca11'
                }
            }
            if ( !!values.birthday ) {
                birthday = values.birthday.format('YYYY-MM-DD');
            }
			let valuesNew = {
				orgId          : values.orgId,
				name           : values.name,
				channel        : values.channel,
				sex            : values.sex,

				/*新增字段*/
                addrColumn     : values.addrColumn,
                province       : values.province,
                city           : values.city,
                county         : values.county,
                seller         : values.seller,
				nickName       : values.nickName,
				socialSecurityNum : values.socialSecurityNum,
				nation         : values.nation,
				speciality     : values.speciality,
				hobby          : values.hobby,
				bloodType      : values.bloodType,
				constellation  : values.constellation,
                orgSize        : values.orgSize,

				mobile         : values.mobile,
				seller         : values.seller,
				counselorId    : values.counselorId,
				secondChannel  : values.secondChannel,
				intention      : values.intention,
                type           : values.type,
				conaddress     : values.conaddress,
				schaddress     : values.schaddress,
				recommender    : values.recommender,
				collecterId    : values.collecterId,
				community      : values.community,
				parentId       : values.parentId,
				parentName     : values.parentName,
                pbirthday      : values.pbirthday,
                weixin         : values.weixin,
                duty           : values.duty,
                address        : values.address,
                psex           : values.psex,
                qqNumber       : values.qqNumber,
                department     : values.department,
                email          : values.email,
                remarks        : values.remarks,
				parentMobile   : values.parentMobile,
				parentRelation : values.parentRelation,
				parentEmail    : values.parentEmail,
				parentWorkUnit : values.parentWorkUnit,
				grade          : values.grade,
				remark         : values.remark

			}
            let id = values.stuId;
			let ret = {};
			if( !!values && !!values.stuId ){
				//修改
				ret = yield call( confirmCreateForm, ({ birthday, headimgurl, id,  ...valuesNew }) );
			}else{
				//新增
				ret = yield call( confirmCreateStu, ({ birthday, headimgurl, ...valuesNew }));
			}
			ret = ret.ret;
            if ( ret && ret.errorCode == 9000 ) {
                message.success('保存成功');
                yield put({
                    type: 'GetStuList',
                    payload: {
                        pageIndex          : stuManagementModel.pageIndex,
                        pageSize           : stuManagementModel.pageSize,
                        condition          : stuManagementModel.condition,
                        FastSearchContent  : stuManagementModel.FastSearchContent,
                        SuperSearchContent : stuManagementModel.SuperSearchContent,
                    }
                });
                if( id == undefined || id == "" || !id ) {
                    yield put({
                        type: 'updateState',
                        payload: {
                            createStudentModalVisible : false,
                            confirmCreateForm         : [],
                            edtionStuinfro            : {},
                            createOrgId               : '',
                        }
                    });
                }else {
                    let params = {
                        stuId : id,
                        orgId : values.orgId,
                    };
                    let Sturet = yield call( getSingleStu, ({...params}));
                    if ( Sturet.ret && Sturet.ret.errorCode == '9000' ) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                studentDetailInfo  : Sturet.ret.data,
                                isStuDetailVisible : true,
                                changeTableTab     : stuManagementModel.changeTableTab,
                            }
                        })
                    }else {
                        message.error(( Sturet.ret && Sturet.ret.errorMessage ) || '加载失败');
                    }
                    yield put({
                        type: 'updateState',
                        payload: {
                            createStudentModalVisible : false,
                            confirmCreateForm         : [],
                            edtionStuinfro            : {},
                            createOrgId               : '',
                        }
                    });
                }
            }else{
				message.error( ret && ret.errorMessage || '新增学员失败' )
			}
			yield put({
				type : 'updateState',
				payload : {
					stuModalCreateBtnLoading : false
				}
			})
        },

        *parentList({payload}, {put, call, select}){
            let {id, orgId} = payload;
            let {ret} = yield call(getParentList, ({stuId: id, orgId: orgId}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        parentListArr: ret.results,
                    }
                })
            } else {
                message.error((ret && ret.errorMessage ) || '查询预约记录加载失败');
            }
        },

        /*到访记录改变状态*/
        *'LeadsFollowVisitingPlanChangeItemStatus'({payload}, {put, call, select}){
            // yield put({ type:'showVisitingPlanListLoading' });
            let {ret} = yield call(LeadsFollowVisitingPlanChangeItemStatus, parse(payload));
            //到访计划的新增编辑对leads列表无影响，不用像跟进记录一样进行列表查询来更新状态(爽!)
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage || '修改成功');
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let leadsFollowVisitingPlanContent = stuManagementModel.leadsFollowVisitingPlanContent;        //到访计划list
                //若状态修改成功，则直接重写当前项
                for (let i in leadsFollowVisitingPlanContent) {
                    //找到修改项的id
                    if (leadsFollowVisitingPlanContent[i].id == payload.ids) {
                        //重写当前项
                        switch (payload.status) {
                            case '0' :
                                leadsFollowVisitingPlanContent[i].status = '已关闭';
                                break;
                            case '1' :
                                leadsFollowVisitingPlanContent[i].status = '已到访';
                                break;
                            case '2' :
                                leadsFollowVisitingPlanContent[i].status = '待跟进';
                                break;
                            default :
                                ret.results[i].status = '无';
                                break;
                        }
                        break;
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        leadsFollowVisitingPlanModalVisible: false,
                        leadsFollowVisitingPlanContent
                    }
                });
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('到访计划关闭失败');
            }
            //yield put({ type:'closeVisitingPlanListLoading' });
        },


        /*新增编辑到访计划modal提交*/
        *'LeadsFollowVisitingPlanModalSubmit'({payload}, {put, call, select}){
            // yield put({ type:'showVisitingPlanListLoading' });
            // yield put({ type:'showVisitingPlanModalButtonLoading' });
            let {ret} = yield call(LeadsFollowVisitingPlanModalSubmit, parse(payload));
            //到访计划的新增编辑对leads列表无影响，不用像跟进记录一样进行列表查询来更新状态(爽!)
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage || '到访计划提交成功');
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let leadsFollowDetailLeadMessage = stuManagementModel.studentDetailInfo;                       //当前leads的详细信息
                let leadsFollowVisitingPlanModalType = stuManagementModel.leadsFollowVisitingPlanModalType;    //表单类型
                let leadsFollowVisitingPlanContent = stuManagementModel.leadsFollowVisitingPlanContent;        //到访计划list
                let leadsFollowVisitingPlanPageSize = stuManagementModel.leadsFollowVisitingPlanPageSize;      //当前到访计划每页条数

                if (leadsFollowVisitingPlanModalType == 'add') {
                    yield put({
                        type: 'GetVisitingPlanList',
                        payload: {
                            pageIndex: 0,
                            pageSize: leadsFollowVisitingPlanPageSize,
                            condition: stuManagementModel.condition,
                            source: 1,
                            orgId: leadsFollowDetailLeadMessage.orgId,
                            stuId: leadsFollowDetailLeadMessage.id,
                            Operation: 'add'
                        }
                    });
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        leadsFollowVisitingPlanModalVisible: false,
                    }
                });
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('到访计划提交失败');
            }
        },


        /*获取到访计划list，开启详情时获取到访计划列表，和滚动条滚动到底部时继续查询*/
        *'GetVisitingPlanList'({payload}, {put, call, select}){
            //获取标识(新增/点击列表姓名/无)
            let Operation = '';
            if (payload && payload.Operation) {
                Operation = payload.Operation;
                delete payload.Operation;
            }
            let {ret} = yield call(GetVisitingPlanList, parse(payload));
            if (ret && ret.errorCode === 9000) {
                //格式化status
                for (let i in ret.results) {
                    switch (ret.results[i].status) {
                        case '0' :
                            ret.results[i].status = '已关闭';
                            break;
                        case '1' :
                            ret.results[i].status = '已到访';
                            break;
                        case '2' :
                            ret.results[i].status = '待跟进';
                            break;
                        default :
                            ret.results[i].status = '无';
                            break;
                    }

                }
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let pageSize = stuManagementModel.leadsFollowVisitingPlanPageSize;                             //到访计划列表pageSize
                let leadsFollowVisitingPlanContent = stuManagementModel.leadsFollowVisitingPlanContent;        //到访计划列表list
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if (Operation == 'add' || Operation == 'openNew') {
                    //新增到访计划成功后或者打开新的leads查看到访计划时平滑滚动到滚动条顶端
                    if (document.getElementById('stumanage_visiting_plan_inner_list')) {
                        let div = document.getElementById('stumanage_visiting_plan_inner_list');
                        let timer = setInterval(function () {
                            let scrollTop = div.scrollTop;
                            let ispeed = Math.floor(-scrollTop / 6);
                            if (scrollTop == 0) {
                                clearInterval(timer);
                            }
                            div.scrollTop = scrollTop + ispeed;
                        }, 30);
                    }
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowVisitingPlanNum: ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish: true,
                                leadsFollowVisitingPlanContent: ret.results,
                                leadsFollowVisitingPlanPageIndex: ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize: ret.data.pageSize,
                            }
                        });
                    } else {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowVisitingPlanNum: ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish: false,
                                leadsFollowVisitingPlanContent: ret.results,
                                leadsFollowVisitingPlanPageIndex: ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize: ret.data.pageSize,
                            }
                        });
                    }
                } else {
                    //如果不是新增，则表明是刚打开或者下拉刷新
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowVisitingPlanNum: ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish: true,                 //已结束
                                leadsFollowVisitingPlanContent: ret.results,
                                leadsFollowVisitingPlanPageIndex: ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize: ret.data.pageSize,
                            }
                        });
                    } else if (payload.pageIndex > 0 && ret.results.length < pageSize) {       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for (let i in ret.results) {
                            leadsFollowVisitingPlanContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowVisitingPlanNum: ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish: true,                 //已结束
                                leadsFollowVisitingPlanContent,
                                leadsFollowVisitingPlanPageIndex: ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize: ret.data.pageSize,
                            }
                        });
                    } else {      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for (let i in ret.results) {
                            leadsFollowVisitingPlanContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowVisitingPlanNum: ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish: false,                //未结束
                                leadsFollowVisitingPlanContent,
                                leadsFollowVisitingPlanPageIndex: ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize: ret.data.pageSize,
                            }
                        });
                    }
                }
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('获取到访计划列表数据失败');
            }
        },

        /*跟进记录列表查询,开启详情时获取跟进记录列表，和滚动条滚动到底部时继续查询*/
        *'GetFollowRecordList'({payload}, {put, call, select}){
            //获取标识(新增/点击列表姓名/无)
            let Operation = '';
            if (payload && payload.Operation) {
                Operation = payload.Operation;
                delete payload.Operation;
            }
            let {ret} = yield call(GetFollowRecordList, parse(payload));
            if (ret && ret.errorCode === 9000) {
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let pageSize = stuManagementModel.leadsFollowFollowRecordPageSize;
                let leadsFollowFollowRecordContent = stuManagementModel.leadsFollowFollowRecordContent;
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if (Operation == 'add' || Operation == 'openNew') {
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowFollowRecordNum: ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish: true,
                                leadsFollowFollowRecordContent: ret.results,
                                leadsFollowFollowRecordPageIndex: ret.data.pageIndex,              //跟进记录页码
                                leadsFollowFollowRecordPageSize: ret.data.pageSize,                //跟进记录每页条数
                            }
                        });
                    } else {
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowFollowRecordNum: ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish: false,
                                leadsFollowFollowRecordContent: ret.results,
                                leadsFollowFollowRecordPageIndex: ret.data.pageIndex,              //跟进记录页码
                                leadsFollowFollowRecordPageSize: ret.data.pageSize,                //跟进记录每页条数
                            }
                        });
                    }
                } else {
                    //如果不是新增，则表明是刚打开或者下拉刷新
                    if (payload.pageIndex == 0 && ret.results.length < pageSize) {             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowFollowRecordNum: ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish: true,                 //已结束
                                leadsFollowFollowRecordContent: ret.results,
                                leadsFollowFollowRecordPageIndex: ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize: ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    } else if (payload.pageIndex > 0 && ret.results.length < pageSize) {       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for (let i in ret.results) {
                            leadsFollowFollowRecordContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowFollowRecordNum: ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish: true,                 //已结束
                                leadsFollowFollowRecordContent,
                                leadsFollowFollowRecordPageIndex: ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize: ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    } else {      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for (let i in ret.results) {
                            leadsFollowFollowRecordContent.push(ret.results[i]);
                        }
                        yield put({
                            type: 'updateState',
                            payload: {
                                leadsFollowFollowRecordNum: ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish: false,                //未结束
                                leadsFollowFollowRecordContent,
                                leadsFollowFollowRecordPageIndex: ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize: ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    }
                }
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('获取跟进记录列表数据失败');
            }
        },

        //LeadsFollowFollowRecordDeleteItem
        /*leads跟进记录删除*/
        *'LeadsFollowFollowRecordDeleteItem'({payload}, {put, call, select}){
            //yield put({ type:'showFollowRecordContentLoading' });
            let {ret} = yield call(LeadsFollowFollowRecordDeleteItem, parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage || '跟进记录删除成功');
                let stuManagementModel = yield select(state => state.stuManagementModel);
                let leadsFollowFollowRecordContent = stuManagementModel.leadsFollowFollowRecordContent;
                for (let i in leadsFollowFollowRecordContent) {
                    if (leadsFollowFollowRecordContent[i].id == payload.id) {
                        leadsFollowFollowRecordContent.splice(i, 1);
                        break;
                    }
                }
                yield put({
                    type: 'updateState',
                    payload: {
                        leadsFollowFollowRecordContent
                    }
                });
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('跟进记录删除失败');
            }
            // yield put({ type:'closeFollowRecordContentLoading' });
        },

        /*新增跟进记录*/
        *'LeadsFollowFollowRecordAdd'({payload}, {put, call, select}){
            // yield put({ type:'showFollowRecordButtonLoading' });
            // yield put({ type:'showFollowRecordContentLoading' });
            //获取新增标识
            let Operation = '';
            if (payload && payload.Operation) {
                Operation = payload.Operation;
            }
            delete payload.Operation;
            let {ret} = yield call(LeadsFollowFollowRecordAdd, parse(payload));
            if (ret && ret.errorCode === 9000) {
                message.success(ret.errorMessage || '跟进记录发布成功');
                let stuManagementModel = yield select(state => state.stuManagementModel);
                //跟进记录列表查询刷新
                let leadsFollowDetailLeadMessage = stuManagementModel.studentDetailInfo;
                let pageSize = stuManagementModel.leadsFollowFollowRecordPageSize;
                yield put({
                    type: 'GetFollowRecordList',
                    payload: {
                        pageIndex: 0,
                        pageSize,
                        condition: stuManagementModel.condition,
                        source: 1,
                        orgId: leadsFollowDetailLeadMessage.orgId,
                        stuId: leadsFollowDetailLeadMessage.id,
                        Operation,
                    }
                });
            } else if (ret && ret.errorMessage) {
                ret && ret.errorMessage && message.error(ret.errorMessage);
            } else {
                message.error('跟进记录发布失败');
            }

        },
        //学员作品列表
        *getStudentWorksList({payload}, {call, put, select}){
            let {ret} = yield call(getStudentWorksList, ({...payload}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        ProductionList: ret.results,  //作品列表
                        ProductionNum: ret.data.resultCount,
                        ProductionPageIndex: ret.data.pageIndex,
                        ProductionPageSize: ret.data.pageSize,
                    }
                })
            }else {
                message.error(( ret && ret.errorMessage ) || '作品列表加载失败')
            };
        },

        //上传作品
        *uploadWorks({payload}, {call, put, select}){
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let tagIdListCall = yield call(getTagIdList);
            let spaceSizeCall = yield call(getSpaceSize);
            let tagIdList, allSize, usedSize;
            if (tagIdListCall && tagIdListCall.ret && tagIdListCall.ret.errorCode == '9000') {
                tagIdList = tagIdListCall.ret.results
            }else {
                message.error(tagIdListCall && tagIdListCall.ret && tagIdListCall.ret.errorMessage || '获取分类列表失败')
            };
            if (spaceSizeCall && spaceSizeCall.ret && spaceSizeCall.ret.errorCode == '9000') {
                allSize = Number(spaceSizeCall.ret.allsize);
                usedSize = Number(spaceSizeCall.ret.usedsize);
                yield put({
                    type: 'studentWorksUploadModel/openUploadModal',
                    payload: {
                        allSize, usedSize, tagIdList,
                        stuId: stuManagementModel.studentDetailInfo.id,
                        orgId: stuManagementModel.studentDetailInfo.orgId
                    }
                })
            }

        },

        //删除作品
        *deleteWork({payload}, {call, put, select}){
            let { id } = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let {ret} = yield call(deleteWork, ({workIds: id}));
            if (ret && ret.errorCode == '9000') {
                let params = {
                    stuId     : stuManagementModel.studentDetailInfo.id,
                    orgId     : stuManagementModel.studentDetailInfo.orgId,
                    pageSize  : 20,
                    pageIndex : 0,
                }
                yield put({
                    type: 'getStudentWorksList',
                    payload: {
                        params
                    }
                })
            }
        },

        //点击修改作品
        *updateStudentWork({payload}, {call, put, select}){
            let {id, url} = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            yield put({
                type: 'studentWorksUpdateModel/openUpdateModal',
                payload: {
                    id,
                    imgUrl: url,
                    stuId: stuManagementModel.studentDetailInfo.id,
                }
            });
        },

        //刷新学员作品列表
        *refreshStudentWorks({payload}, {call, put, select}){
            let stuManagementModel = yield select(state => state.stuManagementModel);
            yield put({
                type: 'getStudentWorksList',
                payload: {
                    pageIndex: 0,
                    pageSize: 20,
                    stuId: stuManagementModel.studentDetailInfo.id,
                    orgId: stuManagementModel.studentDetailInfo.orgId,
                }
            })
        },

        *Productionpagination({payload}, {call, put, select}){
            let {
                pageIndex,
                pageSize,
            } = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            yield put({
                type: 'getStudentWorksList',
                payload: {
                    pageIndex: payload.pageIndex - 1,
                    pageSize: payload.pageSize,
                    stuId: stuManagementModel.studentDetailInfo.id,
                    orgId: stuManagementModel.studentDetailInfo.orgId,
                }
            })
        },

        //点击联系人tab
        *getNewParentInfo({payload}, {call, put, select}){
            let { id, orgId } = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let params = {
                pageSize  : 20,
                pageIndex : 0,
                orgId     :orgId,
                stuId     :  id,
            };
            let { ret } = yield call(getParentInfo, ({...params}));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        parenttabList: ret.results,                                //学员联系人列表
                        parenttabnum: ret.data.resultCount,
                    }
                });
            } else {
                message.error((ret && ret.errorMessage ) || '联系人列表加载失败')
            }
        },

        //名单转化记录列表
        *listrecordstumanage({payload}, {call, put, select}){
            let {showlistrecordsModal, orgId, stuId} = payload;
            let stuManagementModel = yield select(state => state.stuManagementModel);
            let params = {
				pageSize: 20,
				pageIndex: 0,
				stuId: payload.stuId,
				orgId: payload.orgId
			};
            let { ret } = yield call(getlistrecordsstuList, ({ ...params }));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        listrecordsstuList: ret.results,
                        listrecordsstuCount: ret.data.resultCount,
                        listrecordsstuPageIndex: ret.data.pageIndex,
                        listrecordsstuPageSize: ret.data.pageSize,
                        listrecordsstustuId: payload.stuId,
                    }
                });
                //先请求接口 获取   全部跟进记录
                //显示全部跟进记录
                yield put({
                    type: 'updateState',
                    payload: {
                        showlistrecordsModal: !showlistrecordsModal
                    }
                });
            }
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
        updateState(state, action){
            return {...state, ...action.payload}
        }
    }
};
