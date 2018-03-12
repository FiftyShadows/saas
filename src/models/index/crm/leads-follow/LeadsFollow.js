import {
    GetDictKey,                             /*获取业务参数信息*/
    GetSecondChannel,                       /*获取二级来源*/
    GetFollowState,                         /*从数据字典获取跟进状态*/
    GetStuSource,                           /*获取来源下拉列表内容*/
    GetStuType,                             /*获取机构类型*/
    GetFollowWay,                           /*获取跟进方式下拉列表内容*/
    GetUserBranch,                          /*获取我和我下属的id,获取成功后组装uids后进行列表查询*/
    GetTableList,                           /*获取全部列表数据*/
    LeadsFollowTableDispatch,               /*leftBars点击分配*/
    LeadsFollowTableChangeStatus,           /*leftBars修改状态，放入回收站，还原，彻底删除*/
    GetOrgStaffLeadsDetail,                 /*获取当前机构下销售人员所拥有的leads详情*/
    LeadsFollowLeadsDispatchModalSubmit,    /*分配modal提交*/
    GetCurrentStaffSubordinate,             /*转给他人modal获取当前员工下属信息*/

    LeadsFollowFollowRecordAdd,             /*新增跟进记录*/
    LeadsFollowFollowRecordDeleteItem,      /*leads跟进记录删除*/
    LeadsFollowFollowRecordEditSubmit,      /*跟进记录编辑modal提交*/
    GetFollowRecordList,                    /*开启详情时获取跟进记录列表，和滚动条滚动到底部时继续查询*/

    GetVisitingPlanList,                    /*获取到访计划list*/
    LeadsFollowVisitingPlanModalSubmit,     /*新增编辑到访计划modal提交*/
    LeadsFollowVisitingPlanChangeItemStatus,/*到访记录改变状态*/

    GetReservationList,                     /*获取预约试听list*/
    ReservationGetCourse,                   /*预约试听获取选中校区的课程信息*/
    ReservationGetSellerDetail,             /*获取当前操作用户信息作为跟进人信息*/
    CheckZJLReservationCourseDetail,        /*早教类预约试听查看排课信息*/
    LeadsFollowReservationModalSubmit,      /*新增预约试听*/
    LeadsFollowReservationChangeItemStatus, /*leads预约试听改变状态*/

    GetRecommend,                           /*获取推荐人(联系人)信息*/
    GetCollector,                           /*获取收集者信息(租户下所有销售员工)*/
    DetailEditModalSubmit,                  /*leads编辑提交*/

    LeadsMergeGetParent,                    /*点击转为学员时获取联系人信息并且打开modal*/
    GetSelfCrmStuTable,                     /*点击合并已有学员请求crm学员列表(自己和自己下属的)*/
    LeadsFollowStuMergeModalSubmit,         /*转为学员点击提交*/

    EditLeadsCheckSameOnBlur,               /*leads编辑学员姓名，联系人姓名，联系人手机号*/

	selectYearToDate,
	getCourseList

} from '../../../../services/crm/leads-follow/LeadsFollow';
import { parse } from 'qs';
import { message } from 'antd';

/*English*/
export default {

    namespace: 'leadsFollow',

    state: {
        wetherChangeRouter : false,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        leadsCheckColumnKey : 'leadsCheckColumn',       //保存到localstroage中的名单显示列表的字段名
        leadsFollowType : 'all',                        //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowUserOrgId : '',                      //当前操作用户所属的机构ID
        leadsFollowUserId : '',                         //当前操作用户的userId
        leadsFollowMyOrStaffId : '',                    //在'my'条件下查询的uid
        leadsFollowUids : '',                           //查询我的leads时需要传的参数，其余状态下不传或者空字符串
        leadsFollowWay : [],                            //跟进方式
        leadsFollowSecondChannel : [],                  //二级来源
        leadsFollowConnectStatus : [],                  //联系方式
        leadsFollowOrgScale : [],                       //机构规模

        /*排序搜索*/
        sortSearchContent : {},                         //排序搜索条件

        /*快捷搜索*/
        leadsFollowFastSearchFollowState : [],          //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        leadsFollowFastSearchStuSource : [],            //快捷搜索栏一级来源下拉列表内容
        leadsFollowFastSearchContent : {},              //快捷搜索栏搜索内容

        /*高级搜索*/
        leadsFollowRightSuperSearchVisible : false,     //高级搜索是否显示
        leadsFollowRightSuperSearchContent : {},        //高级搜索栏搜索内容

        /*table*/
        leadsFollowTableNewColumns : [],                //选择列表是否显示字段是哪些
        leadsFollowTableLoading : false,                //列表是否加载状态
        leadsFollowTableDataSource : [],                //table列表数据
        leadsFollowTableSelectedRowKeys : [],           //多选框选中项的id,若无id，则取到当前索引
        leadsFollowTableSelectedRows : [],              //多选框选中的项的对象数组

        /*pagination*/
        leadsFollowDataTotal : 0,                       //数据总共数目
        leadsFollowPageIndex : 0,                       //页码
        leadsFollowPageSize : 20,                       //每页条数

        /*分配modal*/
        leadsFollowLeadsDispatchModalVisible : false,           //分配modal是否显示
        leadsFollowLeadsDispatchModalButtonLoading : false,     //分配modal按钮是否加载状态
        leadsFollowLeadsDispatchModalStaffContent : [],         //分配modal校区下的员工信息
        leadsFollowLeadsDispatchModalStaffMaxLeads : '',        //每个员工所拥有的最多leads数
        leadsFollowLeadsDispatchModalAllStaffLeads : '',        //当前校区下员工下的leads数情况
        leadsFollowLeadsDispatchModalCurrentStaffLeads : '',    //当前员工已分配的leads数
        leadsFollowLeadsDispatchModalWetherShowAlert : false,   //是否显示温馨提示，告诉用户当前销售/员工如果增加的leads超过最大leads数，并且终止用户提交

        /*详情左划框*/
        leadsFollowDetailModalVisible : false,          //划入框是否显示
        leadsFollowDetailModalTabKey : '2',             //tab项索引
        leadsFollowDetailLeadMessage : {},              //选中leads名单查看详情时当前人的信息

        /*详情操作(退回公海，放入回收站)提示框modal*/
        leadsFollowDetailModalAlertVisible : false,             //提示框是否显示
        leadsFollowDetailModalAlertTitle : '',                  //提示框标题
        leadsFollowDetailModalAlertContent : '',                //提示框内容
        leadsFollowDetailModalAlertButtonLoading : false,       //提示框按钮是否加载状态
        leadsFollowDetailModalAlertMessage : {},                //提示框点击确定后提交的信息

        /*转给他人modal*/
        leadsFollowDetailSendOtherModalVisible : false,             //转给他人modal是否显示
        leadsFollowDetailSendOtherModalButtonLoading : false,       //转给他人modal按钮是否加载
        leadsFollowDetailSendOtherModalStaffMessage : [],           //转给他人modal选择销售下拉列表内容
        leadsFollowDetailSendOtherModalWetherShowAlert : undefined, //当前员工leads数分配过后是否已超标，超标显示提示信息并且不可提交

        /*跟进记录*/
        leadsFollowFollowRecordNum : 0,                         //跟进记录条数
        leadsFollowFollowRecordPageIndex : 0,                   //跟进记录页码
        leadsFollowFollowRecordPageSize : 5,                    //跟进记录每页条数
        leadsFollowFollowRecordButtonLoading : false,           //新增跟进记录发布按钮是否加载
        leadsFollowFollowRecordContentLoading : false,          //当前跟进记录loading状态
        leadsFollowFollowRecordContent : [],                    //当前leads跟进记录list
        leadsFollowFollowRecordScrollFinish : false,            //滚动加载是否完成(即数据加载完毕)

        /*跟进记录编辑modal*/
        leadsFollowFollowRecordEditVisible : false,             //跟进记录编辑modal是否显示
        leadsFollowFollowRecordEditButtonLoading : false,       //跟进记录编辑modal按钮是否加载
        leadsFollowFollowRecordEditContent : {},                //跟进记录编辑回填数据

        //到访计划
        leadsFollowVisitingPlanNum : 0,                         //到访计划条数
        leadsFollowVisitingPlanPageIndex : 0,                   //到访计划页码
        leadsFollowVisitingPlanPageSize : 5,                    //到访计划每页条数
        leadsFollowVisitingPlanContentLoading : false,          //当前到访计划列表loading状态
        leadsFollowVisitingPlanContent : [],                    //当前leads到访计划list
        leadsFollowVisitingPlanScrollFinish : false,            //滚动加载是否完成(即数据加载完毕)

        //新增编辑到访计划
        leadsFollowVisitingPlanModalType : '',                  //新增编辑到访计划表单类型('add','edit')
        leadsFollowVisitingPlanModalVisible : false,            //新增编辑到访计划表单是否显示
        leadsFollowVisitingPlanModalButtonLoading : false,      //新增编辑到访计划表单按钮是否加载
        leadsFollowVisitingPlanModalContent : {},               //编辑到访计划时回填数据

        //预约试听
        leadsFollowReservationNum : 0,                          //预约试听条数
        leadsFollowReservationPageIndex : 0,                    //预约试听页码
        leadsFollowReservationPageSize : 5,                     //预约试听每页条数
        leadsFollowReservationContentLoading : false,           //当前预约试听列表loading状态
        leadsFollowReservationContent : [],                     //当前leads预约试听list
        leadsFollowReservationScrollFinish : false,             //滚动加载是否完成(即数据加载完毕)

        //新增编辑预约试听
        leadsFollowReservationModalType : '',                   //新增编辑预约试听表单类型('add','edit')
        leadsFollowReservationModalVisible : false,             //新增编辑预约试听表单是否显示
        leadsFollowReservationModalButtonLoading : false,       //新增编辑预约试听表单按钮是否加载
        leadsFollowReservationModalCourseContent : [],          //新增早教类机构预约试听时获取的排课信息
        leadsFollowReservationSelfDetail : {},                  //新增预约试听当前操作人信息作为跟进人
        leadsFollowReservationCourseMessage : [],               //预约试听当前校区下的课程下拉列表内容
        leadsFollowReservationCourseSelectRowKeys : [],         //早教类下选择排课信息数组
        leadsFollowReservationCourseSelectRows : [],            //早教类下选择排课信息数组
		dayList          : [],                                  //选择年月得到的有课日期列表
		courseList       : [],                                  //预约试听课程下拉列表
		courseDataSource : [],                                  //排课信息

        //详情编辑modal
        detailEditModalVisible : false,                         //leads编辑modal是否显示
        detailEditModalLoading : false,                         //leads编辑modal加载状态
        detailEditModalButtonLoading : false,                   //leads编辑按钮加载状态
        detailEditModalBackMessage : {},                        //leads编辑时当前leads的回填信息
        detailEditModalRecommender : [],                        //leads编辑推荐人信息下拉列表
        detailEditModalCollector : [],                          //leads编辑收集人信息
        leadsFollowParentRelationship : [],                     //leads编辑联系人关系下拉列表内容
        leadsFollowEditStuType : [],                            //leads编辑机构类型下拉列表内容

        //转为学员modal
        leadsFollowStuMergeModalVisible : false,                //modal是否显示
        leadsFollowStuMergeModalButtonLoading : false,          //modal按钮是否加载状态
        leadsFollowStuMergeModalParent : [],                    //modal接口请求联系人信息数组
        leadsFollowStuMergeStuTableModalLoading : false,        //点击转化学员加载状态
        stuClueCrmStuWetherFirstChangeMergeStu : 0,             //是否是第一次点击转化学员(用于改变文案)

        //crm学员modal(转为学员modal中点击合并学员弹出)
        leadsFollowCrmStuModalVisible : false,                  //crm学员modal是否显示
        leadsFollowCrmStuModalLoading : false,                  //crm学员modal加载状态
        leadsFollowCrmStuModalPageIndex : 0,                    //crm学员modal页码
        leadsFollowCrmStuModalPageSize : 10,                    //crm学员modal每页条数
        leadsFollowCrmStuModalContent : {},                     //crm学员列表内容
        leadsFollowCrmStuModalTotal : 0,                        //crm学员列表总共个数
        leadsFollowCrmStuModalSelectedRowKeys : [],             //表格多选选中的数组
        leadsFollowCrmStuModalSelectedRow : [],                 //表格多选中的对象数组

        //小屏新增跟进记录
        smallScreenAddFollowRecordModalVisible : false,         //小屏新增跟进记录modal是否显示
        smallScreenAddFollowRecordModalButtonLoading : false,   //小屏新增跟进记录modal按钮加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname == '/crm_leads_all' || pathname == '/crm_leads_mine' || pathname == '/crm_leads_recycle' || pathname == '/crm_leads_sea'){
                    dispatch({
                        type : 'updateState',
                        payload : {
                            leadsFollowDetailModalVisible : false
                        }
                    })
                    //获取机构类型下拉列表
                    dispatch({
                        type : 'GetStuType',
                        payload : {
                            dictkey : 'studentType'
                        }
                    })
                    //获取联系状态
                    dispatch({
                        type : 'GetConnectStatus',
                        payload : {
                            dictkey : 'contactState'
                        }
                    })
                    //获取机构规模
                    dispatch({
                        type : 'GetOrgScale',
                        payload : {
                            dictkey : 'orgSize'
                        }
                    })
                }
                //全部leads
                if(pathname == '/crm_leads_all'){
                    //获取二级来源=>跟进状态=>一级来源=>列表查询
                    dispatch({
                        type:'GetSecondChannel',
                        payload:{
                            dictkey:'secondChannel',
                            leadsFollowType : 'all',
                            fastSearchContent : {},
                            superSearchContent : {},
                        }
                    });
                    //跟进方式
                    dispatch({
                        type:'GetFollowWay',
                        payload:{
                            dictkey:'studentFollowWay',
                        }
                    });
                }
                //我的leads
                if(pathname == '/crm_leads_mine'){
                    if(query.jump){
                        delete query.jump;
                        delete query.type;
                        //获取二级来源=>跟进状态=>一级来源=>列表查询
                        dispatch({
                            type:'GetSecondChannel',
                            payload:{
                                dictkey:'secondChannel',
                                leadsFollowType : 'my',
                                pageIndex : query.pageIndex,
                                pageSize : query.pageSize,
                                fastSearchContent : JSON.parse(query.fastSearchContent) || {},
                                superSearchContent : JSON.parse(query.superSearchContent) || {},
                            }
                        });
                    }else{
                        //获取二级来源=>跟进状态=>一级来源=>列表查询
                        dispatch({
                            type:'GetSecondChannel',
                            payload:{
                                dictkey:'secondChannel',
                                leadsFollowType : 'my',
                                fastSearchContent : {},
                                superSearchContent : {},
                            }
                        });
                    }
                    //跟进方式
                    dispatch({
                        type:'GetFollowWay',
                        payload:{
                            dictkey:'studentFollowWay',
                        }
                    });
                    //修改我的下属文案
                    dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType : '未付费客户',
                        }
                    });
                }
                //回收站
                if(pathname == '/crm_leads_recycle'){
                    //获取二级来源=>跟进状态=>一级来源=>列表查询
                    dispatch({
                        type:'GetSecondChannel',
                        payload:{
                            dictkey:'secondChannel',
                            leadsFollowType : 'recycle',
                            fastSearchContent : {},
                            superSearchContent : {},
                        }
                    });
                    //跟进方式
                    dispatch({
                        type:'GetFollowWay',
                        payload:{
                            dictkey:'studentFollowWay',
                        }
                    });
                }
                //公海池
                if(pathname == '/crm_leads_sea'){
                    //获取二级来源=>跟进状态=>一级来源=>列表查询
                    dispatch({
                        type:'GetSecondChannel',
                        payload:{
                            dictkey:'secondChannel',
                            leadsFollowType : 'public',
                            fastSearchContent : {},
                            superSearchContent : {},
                        }
                    });
                    //跟进方式
                    dispatch({
                        type:'GetFollowWay',
                        payload:{
                            dictkey:'studentFollowWay',
                        }
                    });
                }
            });
        },
    },

    effects: {
        //获取联系状态
        *'GetConnectStatus'({ payload },{ put , call , select }){
            let res = yield call(GetDictKey,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        leadsFollowConnectStatus : ret.list || [],                  //联系方式
                    }
                })
            }else{
                message.error(!!res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取联系状态失败')
            }
        },

        //获取机构规模
        *'GetOrgScale'({ payload },{ put , call , select }){
            let res = yield call(GetDictKey,parse(payload));
            if(!!res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        leadsFollowOrgScale : ret.list || [],                       //机构规模
                    }
                })
            }else{
                message.error(!!res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取联系状态失败')
            }
        },
        /*获取二级来源=>跟进状态=>一级来源=>列表查询*/
        *'GetSecondChannel'({ payload },{ put , call , select }){
            let fastSearchContent = payload.fastSearchContent || {};
            let superSearchContent = payload.superSearchContent || {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            let { ret } = yield call(GetSecondChannel,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowSecondChannel : ret.list
                    }
                });
                //获取来源下拉列表内容,之后请求列表数据
                yield put({
                    type:'GetFollowState',
                    payload:{
                        dictkey:'studentFollowState',
                        leadsFollowType : payload.leadsFollowType,
                        fastSearchContent,
                        superSearchContent,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取二级来源失败');
            }
        },

        /*从数据字典获取跟进状态，然后查询一级来源*/
        *'GetFollowState'({ payload },{ put , call , select }){
            let fastSearchContent = payload.fastSearchContent || {};
            let superSearchContent = payload.superSearchContent || {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            let { ret } = yield call(GetFollowState,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowFastSearchFollowState : ret.list
                    }
                });
                //获取来源下拉列表内容,之后请求列表数据
                yield put({
                    type:'GetStuSource',
                    payload:{
                        dictkey : 'firstChannel',
                        leadsFollowType : payload.leadsFollowType,
                        fastSearchContent,
                        superSearchContent,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取跟进状态下拉列表内容失败');
            }
        },

        /*获取一级来源下拉列表内容，如果是'我的leads'进行uids查询；如果不是进行列表查询*/
        *'GetStuSource'({ payload },{ put , call , select }){
            let fastSearchContent = payload.fastSearchContent || {};
            let superSearchContent = payload.superSearchContent || {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            //除'我的leads'外其余三个路由一旦请求此接口说明切换路由(不包括'我的leads'是因为'我的leads'中请求列表不是在一级来源请求成功之后请求的，而其余三个是)
            if(payload.leadsFollowType != 'my'){
                yield put({
                    type:'updateState',
                    payload:{
                        wetherChangeRouter : true
                    }
                });
            }
            let { ret } = yield call(GetStuSource,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type : 'updateState',
                    payload:{
                        leadsFollowFastSearchStuSource : ret.list,
                        leadsFollowType : payload.leadsFollowType
                    }
                });
                if(payload.leadsFollowType == 'all'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 20,
                        }
                    });
                }else if(payload.leadsFollowType == 'recycle'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 20,
                            status : 3,
                        }
                    });
                }else if(payload.leadsFollowType == 'public'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 20,
                            commonalityLeads : 1,
                        }
                    });
                }else if(payload.leadsFollowType == 'my'){
                    yield put({
                        type:'GetUserBranch',
                        payload:{
                            fastSearchContent,
                            superSearchContent,
                        }
                    });
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取来源下拉列表内容失败');
            }
        },

        /*获取跟进方式*/
        *'GetFollowWay'({ payload },{ put , call , select }){
            let { ret } = yield call(GetFollowWay,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowWay : ret.list
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取跟进方式失败');
            }
        },

        /*获取我和我下属的id,获取成功后组装uids后进行列表查询*/
        *'GetUserBranch'({ payload },{ put , call , select }){
            let fastSearchContent = payload.fastSearchContent || {};
            let superSearchContent = payload.superSearchContent || {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            //我的leads一旦请求此接口说明切换路由(我的leads 请求列表是在这个请求成功之后请求的，故在此修改更换路由状态)
            yield put({
                type:'updateState',
                payload:{
                    wetherChangeRouter : true
                }
            });
            let { ret } = yield call(GetUserBranch,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let ids = [ret.userId + ''];
                for(let i in ret.results){
                    ids.push(ret.results[i].id);
                }
                ret.results.push({ id : ret.userId , name : '我' })
                yield put({
                    type : 'updateState',
                    payload : {
                        leadsFollowUids : ids.join(','),
                        leadsFollowUserId : ret.userId,
                        leadsFollowLeadsDispatchModalStaffContent : ret.results
                    }
                });
                yield put({
                    type : 'GetTableList',
                    payload : {
                        pageIndex : 0,
                        pageSize : 20,
                        uids : ret.userId,
                        fastSearchContent,
                        superSearchContent
                    }
                })
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取我和我的下属信息失败，分配功能可能会失效');
            }
        },

        /*获取全部列表数据*/
        *'GetTableList'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            //判断是不是详情内的跟进记录，到访计划或者预约试听提交，如果是，不收起详情框
            let zj_from;
            if(payload && payload.zj_from){
                zj_from = payload.zj_from;
            }
            delete payload.zj_from;
            let leadsFollow = yield select( state => state.leadsFollow );
            let fastSearchContent = payload && payload.fastSearchContent ? payload.fastSearchContent : !payload.wetherChangeRouter ? leadsFollow.fastSearchContent : {};
            let superSearchContent = payload && payload.superSearchContent ? payload.superSearchContent : !payload.wetherChangeRouter ? leadsFollow.superSearchContent : {};
            let sortSearchContent = payload && payload.sortSearchContent ? payload.sortSearchContent : !payload.wetherChangeRouter ? leadsFollow.sortSearchContent : {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            delete payload.sortSearchContent;
            let params = { ...payload , ...fastSearchContent , ...superSearchContent , ...sortSearchContent };
            let { ret } = yield call(GetTableList,parse(params));
            if( ret && ret.errorCode === 9000 ){
                let leadsFollowFastSearchStuSource = leadsFollow.leadsFollowFastSearchStuSource;        //格式化一级来源时需要遍历比对
                let leadsFollowSecondChannel = leadsFollow.leadsFollowSecondChannel;                    //格式化二级来源时需要比对
                let leadsFollowFastSearchFollowState = leadsFollow.leadsFollowFastSearchFollowState;    //格式化跟进状态时需要遍历比对
                if((ret.results).length == 0 && params.pageIndex > 0){
                    params.pageIndex -= 1;
                    let { ret } = yield call(GetTableList,parse(params));
                    if(ret && ret.errorCode === 9000){
                        for(let i in ret.results){
                            //格式化一级来源
                            for(let j in leadsFollowFastSearchStuSource){
                                if(ret.results[i].channel == leadsFollowFastSearchStuSource[j].key){
                                    ret.results[i].channel = leadsFollowFastSearchStuSource[j].value;
                                    break;
                                }
                            }
                            //格式化二级来源
                            for(let q in leadsFollowSecondChannel){
                                if(ret.results[i].secondChannel == leadsFollowSecondChannel[q].key){
                                    ret.results[i].secondChannel = leadsFollowSecondChannel[q].value;
                                    break;
                                }
                            }
                            //格式化跟进状态
                            for(let k in leadsFollowFastSearchFollowState){
                                if(ret.results[i].studentFollowState == leadsFollowFastSearchFollowState[k].key){
                                    ret.results[i].studentFollowState = leadsFollowFastSearchFollowState[k].value;
                                    ret.results[i].zj_student_follow_state = leadsFollowFastSearchFollowState[k].key;
                                    break;
                                }
                            }
                            //格式化性别
                            switch(ret.results[i].sex){
                                case '1' : ret.results[i].sex = '男' ; break ;
                                case '2' : ret.results[i].sex = '女' ; break ;
                                default : ret.results[i].sex = '--' ; break;
                            }
                        }
                        yield put({
                            type  :'updateState',
                            payload : {
                                wetherChangeRouter : false,
                                leadsFollowUserOrgId : ret.orgId,

                                leadsFollowMyOrStaffId : payload.uids,

                                leadsFollowTableDataSource : ret.results,       //table列表数据
                                leadsFollowTableSelectedRowKeys : [],           //复选框选中项清空
                                leadsFollowTableSelectedRows : [],              //复选框选中项清空

                                leadsFollowDataTotal : ret.data.resultCount,    //数据总共数目
                                leadsFollowPageIndex : ret.data.pageIndex,      //页码
                                leadsFollowPageSize : ret.data.pageSize,        //每页条数

                                sortSearchContent,
                                leadsFollowFastSearchContent : fastSearchContent,           //更新常用搜索内容项
                                leadsFollowRightSuperSearchContent : superSearchContent,    //更新高级搜索内同


                                leadsFollowDetailModalAlertVisible : false,         //关闭alert框
                            }
                        });
                        if(zj_from != 'submit_in_detail'){
                            yield put({
                                type:'updateState',
                                payload:{
                                    leadsFollowDetailModalVisible : false,              //详情modal关闭
                                }
                            });
                        }
                    }else if(ret && ret.errorMessage){
                        message.error(ret.errorMessage);
                    }else{
                        message.error('获取列表数据失败');
                    }
                }else{
                    for(let i in ret.results){
                        //格式化来源
                        for(let j in leadsFollowFastSearchStuSource){
                            if(ret.results[i].channel == leadsFollowFastSearchStuSource[j].key){
                                ret.results[i].channel = leadsFollowFastSearchStuSource[j].value;
                                break;
                            }
                        }
                        //格式化二级来源
                        for(let q in leadsFollowSecondChannel){
                            if(ret.results[i].secondChannel == leadsFollowSecondChannel[q].key){
                                ret.results[i].secondChannel = leadsFollowSecondChannel[q].value;
                                break;
                            }
                        }
                        //格式化跟进状态
                        for(let k in leadsFollowFastSearchFollowState){
                            if(ret.results[i].studentFollowState == leadsFollowFastSearchFollowState[k].key){
                                ret.results[i].studentFollowState = leadsFollowFastSearchFollowState[k].value;
                                ret.results[i].zj_student_follow_state = leadsFollowFastSearchFollowState[k].key;
                                break;
                            }
                        }
                        //格式化性别
                        switch(ret.results[i].sex){
                            case '1' : ret.results[i].sex = '男' ; break ;
                            case '2' : ret.results[i].sex = '女' ; break ;
                            default : ret.results[i].sex = '--' ; break;
                        }
                    }
                    yield put({
                        type  :'updateState',
                        payload : {
                            wetherChangeRouter : false,
                            leadsFollowUserOrgId : ret.orgId,

                            leadsFollowMyOrStaffId : payload.uids,

                            leadsFollowTableDataSource : ret.results,       //table列表数据
                            leadsFollowTableSelectedRowKeys : [],           //复选框选中项清空
                            leadsFollowTableSelectedRows : [],              //复选框选中项清空

                            leadsFollowDataTotal : ret.data.resultCount,    //数据总共数目
                            leadsFollowPageIndex : ret.data.pageIndex,      //页码
                            leadsFollowPageSize : ret.data.pageSize,        //每页条数

                            sortSearchContent,
                            leadsFollowFastSearchContent : fastSearchContent,           //更新常用搜索内容项
                            leadsFollowRightSuperSearchContent : superSearchContent,    //更新高级搜索内同

                            leadsFollowDetailModalAlertVisible : false,         //关闭alert框
                        }
                    });
                    if(zj_from != 'submit_in_detail'){
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowDetailModalVisible : false,              //详情modal关闭
                            }
                        });
                    }
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取列表数据失败');
            }
            yield put({ type : 'closeTableLoading' });
        },

        //leftBars修改状态，放入回收站，还原，彻底删除
        *'LeadsFollowTableChangeStatus'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            yield put({ type : 'showAlertModalButtonLoading' });
            let { ret } = yield call(LeadsFollowTableChangeStatus,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage);
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let pageIndex = leadsFollow.leadsFollowPageIndex;
                let pageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('放入回收站失败');
            }
            yield put({ type : 'closeAlertModalButtonLoading' });
            yield put({ type : 'closeTableLoading' });
        },

        //leftbars分配按钮(在全部名单中点击分配时请求校区及校区下的可使用的员工)
        *'LeadsFollowTableDispatch'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(LeadsFollowTableDispatch,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowLeadsDispatchModalStaffContent : ret.results,
                    }
                });
                //获取当前机构下销售人员所拥有的leads详情
                yield put({
                    type:'GetOrgStaffLeadsDetail',
                    payload:{
                        orgId : payload.orgId,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取机构下员工信息失败');
            }
            yield put({ type : 'closeTableLoading' });
        },

        //获取当前机构下销售人员所拥有的leads详情
        *'GetOrgStaffLeadsDetail'({ payload },{ put , call , select }){
            let { ret } = yield call(GetOrgStaffLeadsDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowUserId = leadsFollow.leadsFollowUserId;
                let leadsFollowTableSelectedRows = leadsFollow.leadsFollowTableSelectedRows;
                //如果是公海池捞取，则是分配到自己的名下，需要进行是否可以分配确认
                if(leadsFollowType == 'public'){
                    let existLeadsNo = 0;
                    for(let i in ret.results){
                        if(leadsFollowUserId == ret.results[i].sellerId){
                            existLeadsNo = ret.results[i].hasNum;        //获取当前销售所拥有的leads数
                            break;
                        }
                    }
                    //判断，如果已拥有leads数加将要分配给他的leads数超过最大数量的话则显示温馨提示并阻止提交
                    if(parseInt(existLeadsNo) + parseInt(leadsFollowTableSelectedRows.length) > parseInt(ret.allowNum)){
                    //if(parseInt(existLeadsNo) + parseInt(leadsFollowTableSelectedRows.length) > parseInt(0)){
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowLeadsDispatchModalWetherShowAlert : true,
                                leadsFollowLeadsDispatchModalCurrentStaffLeads : existLeadsNo,
                            }
                        });
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowLeadsDispatchModalWetherShowAlert : false,
                                leadsFollowLeadsDispatchModalCurrentStaffLeads : '',
                            }
                        });
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowLeadsDispatchModalVisible : true,
                        leadsFollowLeadsDispatchModalButtonLoading : false,
                        leadsFollowLeadsDispatchModalAllStaffLeads : ret.results,
                        leadsFollowLeadsDispatchModalStaffMaxLeads : ret.allowNum,
                        //leadsFollowLeadsDispatchModalStaffMaxLeads : 0,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取机构下员工名单信息失败');
            }
        },

        /*分配modal提交*/
        *'LeadsFollowLeadsDispatchModalSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showTableLoading' });
            yield put({ type:'showDispatchModalButtonLoading' });
            let { ret } = yield call(LeadsFollowLeadsDispatchModalSubmit,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage);
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowLeadsDispatchModalVisible : false,
                    }
                });
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let pageIndex = leadsFollow.leadsFollowPageIndex;
                let pageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                //分配可能出现在全部leads中和我的leads中,在公海池中显示捞取
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('失败');
            }
            yield put({ type:'closeDispatchModalButtonLoading' });
            yield put({ type:'closeTableLoading' });
        },

        /*转给他人modal获取当前员工下属信息*/
        *'GetCurrentStaffSubordinate'({ payload },{ put , call , select }){
            yield put({ type:'showTableLoading' });
            let leadsFollow = yield select( state => state.leadsFollow );
            let leadsFollowType = leadsFollow.leadsFollowType;
            let leadsFollowUserOrgId = leadsFollow.leadsFollowUserOrgId;
            //如果是我的，下拉列表展示我和我的员工；其余展示机构下所有的员工
            if(leadsFollowType == 'my'){
                let { ret } = yield call(GetCurrentStaffSubordinate,parse(payload));
                if( ret && ret.errorCode === 9000 ){
                    let self = { id : ret.userId , name : '我' };
                    ret.results.push(self);
                    yield put({
                        type:'updateState',
                        payload:{
                            leadsFollowDetailSendOtherModalVisible : true,
                            leadsFollowDetailSendOtherModalStaffMessage : ret.results
                        }
                    });
                    yield put({
                        type:'SendOtherGetStaffLeadsMessage',
                        payload:{
                            orgId : leadsFollowUserOrgId,
                        }
                    })
                }else if( ret && ret.errorMessage ){
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }else{
                    message.error('获取员工信息失败');
                }
            }else{
                let params = { orgId : leadsFollowUserOrgId , status : 1 }
                let { ret } = yield call(LeadsFollowTableDispatch,parse(params));
                if( ret && ret.errorCode === 9000 ){
                    yield put({
                        type:'updateState',
                        payload:{
                            leadsFollowDetailSendOtherModalVisible : true,
                            leadsFollowDetailSendOtherModalStaffMessage : ret.results
                        }
                    });
                    yield put({
                        type:'SendOtherGetStaffLeadsMessage',
                        payload:{
                            orgId : leadsFollowUserOrgId,
                        }
                    })
                }else if( ret && ret.errorMessage ){
                    ret && ret.errorMessage && message.error(ret.errorMessage);
                }else{
                    message.error('获取所有员工信息失败');
                }
            }
            yield put({ type:'closeTableLoading' });
        },

        /*转给他人时获取当前机构下销售人员所拥有的leads详情*/
        *'SendOtherGetStaffLeadsMessage'({ payload },{ put , call , select }){
            let { ret } = yield call(GetOrgStaffLeadsDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowLeadsDispatchModalAllStaffLeads : ret.results,
                        leadsFollowLeadsDispatchModalStaffMaxLeads : ret.allowNum,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取员工名单分配情况失败');
            }
        },

        /*转给他人modal提交*/
        *'LeadsFollowDetailSendOtherModalSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showTableLoading' });
            yield put({ type:'showSendOtherModalButtonLoading' });
            //和分配调同样的接口
            let { ret } = yield call(LeadsFollowLeadsDispatchModalSubmit,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage);
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowDetailSendOtherModalVisible : false,
                        leadsFollowDetailSendOtherModalWetherShowAlert : undefined
                    }
                });
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let pageIndex = leadsFollow.leadsFollowPageIndex;
                let pageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex,
                            pageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('转给他人失败');
            }
            yield put({ type:'closeSendOtherhModalButtonLoading' });
            yield put({ type:'closeTableLoading' });
        },

        /*新增跟进记录*/
        *'LeadsFollowFollowRecordAdd'({ payload },{ put , call , select }){
            yield put({ type:'showFollowRecordButtonLoading' });
            yield put({ type:'showFollowRecordContentLoading' });
            //获取新增标识(因为新增需要刷新列表并且回到头部，所以需要此标识)
            let Operation = '';
            if(payload && payload.Operation){
                Operation = payload.Operation;
            }
            delete payload.Operation;
            let { ret } = yield call(LeadsFollowFollowRecordAdd,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage || '跟进记录发布成功');
                let leadsFollow = yield select( state => state.leadsFollow );
                //跟进记录列表查询刷新
                let leadsFollowDetailLeadMessage = leadsFollow.leadsFollowDetailLeadMessage;
                let pageSize = leadsFollow.leadsFollowFollowRecordPageSize;
                yield put({
                    type:'GetFollowRecordList',
                    payload:{
                        pageIndex : 0,
                        pageSize,
                        condition : 'all',
                        source : 2,
                        orgId : leadsFollowDetailLeadMessage.orgId,
                        stuId : leadsFollowDetailLeadMessage.id,
                        Operation,
                    }
                });

                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let leadsFollowPageIndex = leadsFollow.leadsFollowPageIndex;
                let leadsFollowPageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                //全部leads列表查询当前此人的信息(接口和列表查询一样)
                yield put({
                    type:'GetCurrentDetail',
                    payload:{
                        id : leadsFollowDetailLeadMessage.id
                    }
                });

                //leads列表刷新(因为可能修改跟进状态，leads列表中有跟进状态字段)
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }
                yield put({
                    type:'updateState',
                    payload:{
                        smallScreenAddFollowRecordModalVisible : false
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('跟进记录发布失败');
            }
            yield put({ type:'closeFollowRecordContentLoading' });
            yield put({ type:'closeFollowRecordButtonLoading' });
        },

        /*跟进记录编辑modal提交*/
        *'LeadsFollowFollowRecordEditSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showFollowRecordEditButtonLoading' });
            let { ret } = yield call(LeadsFollowFollowRecordEditSubmit,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage || '编辑成功');
                //只需要将已修改的替换
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowFollowRecordContent = leadsFollow.leadsFollowFollowRecordContent;        //当前leads跟进记录list
                let leadsFollowWay = leadsFollow.leadsFollowWay;                                        //跟进方式下拉列表内容
                let leadsFollowDetailLeadMessage = leadsFollow.leadsFollowDetailLeadMessage;            //当前详情的信息
                for(let i in leadsFollowFollowRecordContent){
                    if(leadsFollowFollowRecordContent[i].id == payload.id){
                        //更新跟进记录列表内容
                        let obj = leadsFollowFollowRecordContent[i];
                        obj.type = payload.type;
                        //格式化跟进状态
                        for(let i in leadsFollowWay){
                            if(obj.type == leadsFollowWay[i].key){
                                obj.type = leadsFollowWay[i].value;
                                break;
                            }
                        }
                        obj.content = payload.content;
                        leadsFollowFollowRecordContent.splice(i,1,obj);
                        break;
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowFollowRecordContent,
                        leadsFollowFollowRecordEditVisible : false
                    }
                });
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let leadsFollowPageIndex = leadsFollow.leadsFollowPageIndex;
                let leadsFollowPageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                //全部leads列表查询当前此人的信息(接口和列表查询一样)
                yield put({
                    type:'GetCurrentDetail',
                    payload:{
                        id : leadsFollowDetailLeadMessage.id
                    }
                });

                //leads列表刷新(因为可能修改跟进状态，leads列表中有跟进状态字段)
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'            //用来告知列表刷新不关闭详情框
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('跟进记录编辑失败');
            }
            yield put({ type:'closeFollowRecordEditButtonLoading' });
        },

        /*leads跟进记录删除*/
        *'LeadsFollowFollowRecordDeleteItem'({ payload },{ put , call , select }){
            yield put({ type:'showFollowRecordContentLoading' });
            let { ret } = yield call(LeadsFollowFollowRecordDeleteItem,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage || '跟进记录删除成功');
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowFollowRecordContent = leadsFollow.leadsFollowFollowRecordContent;
                for(let i in leadsFollowFollowRecordContent){
                    if(leadsFollowFollowRecordContent[i].id == payload.id){
                        leadsFollowFollowRecordContent.splice(i,1);
                        break;
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowFollowRecordContent
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('跟进记录删除失败');
            }
            yield put({ type:'closeFollowRecordContentLoading' });
        },

        /*新增跟进记录后全部leads列表查询当前此人的信息(接口和列表查询一样),得到数据数组长度为1*/
        *'GetCurrentDetail'({ payload },{ put , call , select }){
            let { ret } = yield call(GetTableList,parse(payload));
            if(ret && ret.errorCode === 9000){
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowFastSearchStuSource = leadsFollow.leadsFollowFastSearchStuSource;        //格式化一级来源时需要遍历比对
                let leadsFollowSecondChannel = leadsFollow.leadsFollowSecondChannel;                    //格式化二级来源时需要遍历比对
                let leadsFollowFastSearchFollowState = leadsFollow.leadsFollowFastSearchFollowState;    //格式化跟进状态时需要遍历比对
                for(let i in ret.results){
                    //格式化一级来源
                    for(let j in leadsFollowFastSearchStuSource){
                        if(ret.results[i].channel == leadsFollowFastSearchStuSource[j].key){
                            ret.results[i].channel = leadsFollowFastSearchStuSource[j].value;
                            break;
                        }
                    }
                    //格式化二级来源
                    for(let q in leadsFollowSecondChannel){
                        if(ret.results[i].secondChannel == leadsFollowSecondChannel[q].key){
                            ret.results[i].secondChannel = leadsFollowSecondChannel[q].value;
                            break;
                        }
                    }
                    //格式化跟进状态
                    for(let k in leadsFollowFastSearchFollowState){
                        if(ret.results[i].studentFollowState == leadsFollowFastSearchFollowState[k].key){
                            ret.results[i].studentFollowState = leadsFollowFastSearchFollowState[k].value;
                            ret.results[i].zj_student_follow_state = leadsFollowFastSearchFollowState[k].key;
                            break;
                        }
                    }
                    //格式化性别
                    switch(ret.results[i].sex){
                        case '1' : ret.results[i].sex = '男' ; break ;
                        case '2' : ret.results[i].sex = '女' ; break ;
                        default : ret.results[i].sex = '--' ; break;
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowDetailLeadMessage : ret.results[0]                   //更新当前选中查看leads的详情信息
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('查询个人详情失败');
            }
        },

        /*跟进记录列表查询,开启详情时获取跟进记录列表，和滚动条滚动到底部时继续查询*/
        *'GetFollowRecordList'({ payload },{ put , call , select }){
            //获取标识(新增/点击列表姓名/无)
            let Operation = '';
            if(payload && payload.Operation){
                Operation = payload.Operation;
                delete payload.Operation;
            }
            let { ret } = yield call(GetFollowRecordList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let leadsFollow = yield select( state => state.leadsFollow );
                let pageSize = leadsFollow.leadsFollowFollowRecordPageSize;
                let leadsFollowFollowRecordContent = leadsFollow.leadsFollowFollowRecordContent;
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if(Operation == 'add' || Operation == 'openNew'){
//                    //新增跟进记录成功后或者打开新的leads查看跟进记录时平滑滚动到滚动条顶端
//                    if(document.getElementById('leads_follow_record_inner')){
//                        let div = document.getElementById('leads_follow_record_inner');
//                        let timer = setInterval(function(){
//                            let scrollTop = div.scrollTop;
//                            let ispeed = Math.floor( -scrollTop / 6 );
//                            if(scrollTop == 0){
//                                clearInterval(timer);
//                            }
//                            div.scrollTop = scrollTop + ispeed;
//                        },30);
//                    }
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowFollowRecordNum : ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish : true,
                                leadsFollowFollowRecordContent : ret.results,
                                leadsFollowFollowRecordPageIndex : ret.data.pageIndex,              //跟进记录页码
                                leadsFollowFollowRecordPageSize : ret.data.pageSize,                //跟进记录每页条数
                            }
                        });
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowFollowRecordNum : ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish : false,
                                leadsFollowFollowRecordContent : ret.results,
                                leadsFollowFollowRecordPageIndex : ret.data.pageIndex,              //跟进记录页码
                                leadsFollowFollowRecordPageSize : ret.data.pageSize,                //跟进记录每页条数
                            }
                        });
                    }
                }else{
                    //如果不是新增，则表明是刚打开或者下拉刷新
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowFollowRecordNum : ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish : true,                 //已结束
                                leadsFollowFollowRecordContent : ret.results,
                                leadsFollowFollowRecordPageIndex : ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize : ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    }else if(payload.pageIndex > 0 && ret.results.length < pageSize){       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for(let i in ret.results){
                            leadsFollowFollowRecordContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowFollowRecordNum : ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish : true,                 //已结束
                                leadsFollowFollowRecordContent,
                                leadsFollowFollowRecordPageIndex : ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize : ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    }else{      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for(let i in ret.results){
                            leadsFollowFollowRecordContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowFollowRecordNum : ret.data.resultCount,
                                leadsFollowFollowRecordScrollFinish : false,                //未结束
                                leadsFollowFollowRecordContent,
                                leadsFollowFollowRecordPageIndex : ret.data.pageIndex,      //跟进记录页码
                                leadsFollowFollowRecordPageSize : ret.data.pageSize,        //跟进记录每页条数
                            }
                        });
                    }
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取跟进记录列表数据失败');
            }
        },

        /*获取到访计划list，开启详情时获取到访计划列表，和滚动条滚动到底部时继续查询*/
        *'GetVisitingPlanList'({ payload },{ put , call , select }){
            //获取标识(新增/点击列表姓名/无)
            let Operation = '';
            if(payload && payload.Operation){
                Operation = payload.Operation;
                delete payload.Operation;
            }
            let { ret } = yield call(GetVisitingPlanList,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                //ret.results = [{status : '0'},{status : '1'},{status : '2'},{status : '3'}]
                //格式化status
                for(let i in ret.results){
                    switch(ret.results[i].status){
                        case '0' : ret.results[i].status = '已关闭' ; break ;
                        case '1' : ret.results[i].status = '已到访' ; break ;
                        case '2' : ret.results[i].status = '待跟进' ; break ;
                        default : ret.results[i].status = '无' ; break;
                    }

                }
                let leadsFollow = yield select( state => state.leadsFollow );
                let pageSize = leadsFollow.leadsFollowVisitingPlanPageSize;                             //到访计划列表pageSize
                let leadsFollowVisitingPlanContent = leadsFollow.leadsFollowVisitingPlanContent;        //到访计划列表list
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if(Operation == 'add' || Operation == 'openNew'){
                    //新增到访计划成功后或者打开新的leads查看到访计划时平滑滚动到滚动条顶端
                    if(document.getElementById('leads_visiting_plan_inner_list')){
                        let div = document.getElementById('leads_visiting_plan_inner_list');
                        let timer = setInterval(function(){
                            let scrollTop = div.scrollTop;
                            let ispeed = Math.floor( -scrollTop / 6 );
                            if(scrollTop == 0){
                                clearInterval(timer);
                            }
                            div.scrollTop = scrollTop + ispeed;
                        },30);
                    }
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowVisitingPlanNum : ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish : true,
                                leadsFollowVisitingPlanContent : ret.results,
                                leadsFollowVisitingPlanPageIndex : ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize : ret.data.pageSize,
                            }
                        });
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowVisitingPlanNum : ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish : false,
                                leadsFollowVisitingPlanContent : ret.results,
                                leadsFollowVisitingPlanPageIndex : ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize : ret.data.pageSize,
                            }
                        });
                    }
                }else{
                    //如果不是新增，则表明是刚打开或者下拉刷新
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowVisitingPlanNum : ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish : true,                 //已结束
                                leadsFollowVisitingPlanContent : ret.results,
                                leadsFollowVisitingPlanPageIndex : ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize : ret.data.pageSize,
                            }
                        });
                    }else if(payload.pageIndex > 0 && ret.results.length < pageSize){       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for(let i in ret.results){
                            leadsFollowVisitingPlanContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowVisitingPlanNum : ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish : true,                 //已结束
                                leadsFollowVisitingPlanContent,
                                leadsFollowVisitingPlanPageIndex : ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize : ret.data.pageSize,
                            }
                        });
                    }else{      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for(let i in ret.results){
                            leadsFollowVisitingPlanContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowVisitingPlanNum : ret.data.resultCount,
                                leadsFollowVisitingPlanScrollFinish : false,                //未结束
                                leadsFollowVisitingPlanContent,
                                leadsFollowVisitingPlanPageIndex : ret.data.pageIndex,
                                leadsFollowVisitingPlanPageSize : ret.data.pageSize,
                            }
                        });
                    }
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取到访计划列表数据失败');
            }
        },

        /*新增编辑到访计划modal提交*/
        *'LeadsFollowVisitingPlanModalSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showVisitingPlanListLoading' });
            yield put({ type:'showVisitingPlanModalButtonLoading' });
            let { ret } = yield call(LeadsFollowVisitingPlanModalSubmit,parse(payload));
            //到访计划的新增编辑对leads列表无影响，不用像跟进记录一样进行列表查询来更新状态(爽!)
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '到访计划提交成功');
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowDetailLeadMessage = leadsFollow.leadsFollowDetailLeadMessage;            //当前leads的详细信息
                let leadsFollowVisitingPlanModalType = leadsFollow.leadsFollowVisitingPlanModalType;    //表单类型
                let leadsFollowVisitingPlanContent = leadsFollow.leadsFollowVisitingPlanContent;        //到访计划list
                let leadsFollowVisitingPlanPageSize = leadsFollow.leadsFollowVisitingPlanPageSize;      //当前到访计划每页条数
                //如果是编辑成功，则直接重写当前项
                if(leadsFollowVisitingPlanModalType == 'edit'){
                    for(let i in leadsFollowVisitingPlanContent){
                        //找到修改项的id
                        if(leadsFollowVisitingPlanContent[i].id == payload.id){
                            //重写当前项
                            leadsFollowVisitingPlanContent[i].visitTime = payload.visitTime;
                            leadsFollowVisitingPlanContent[i].content = payload.content;
                            break;
                        }
                    }
                    yield put({
                        type:'updateState',
                        payload:{
                            leadsFollowVisitingPlanContent
                        }
                    });
                }else if(leadsFollowVisitingPlanModalType == 'add'){
                    yield put({
                        type:'GetVisitingPlanList',
                        payload:{
                            pageIndex : 0,
                            pageSize : leadsFollowVisitingPlanPageSize,
                            condition : 'all',
                            source : 2,
                            orgId : leadsFollowDetailLeadMessage.orgId,
                            stuId : leadsFollowDetailLeadMessage.id,
                            Operation : 'add'
                        }
                    });
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowVisitingPlanModalVisible : false,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('到访计划提交失败');
            }
            yield put({ type:'closeVisitingPlanModalButtonLoading' });
            yield put({ type:'closeVisitingPlanListLoading' });
        },

        /*到访记录改变状态*/
        *'LeadsFollowVisitingPlanChangeItemStatus'({ payload },{ put , call , select }){
            yield put({ type:'showVisitingPlanListLoading' });
            let { ret } = yield call(LeadsFollowVisitingPlanChangeItemStatus,parse(payload));
            //到访计划的新增编辑对leads列表无影响，不用像跟进记录一样进行列表查询来更新状态(爽!)
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '修改成功');
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowVisitingPlanContent = leadsFollow.leadsFollowVisitingPlanContent;        //到访计划list
                //若状态修改成功，则直接重写当前项
                for(let i in leadsFollowVisitingPlanContent){
                    //找到修改项的id
                    if(leadsFollowVisitingPlanContent[i].id == payload.ids){
                        //重写当前项
                        switch(payload.status){
                            case '0' : leadsFollowVisitingPlanContent[i].status = '已关闭' ; break ;
                            case '1' : leadsFollowVisitingPlanContent[i].status = '已到访' ; break ;
                            case '2' : leadsFollowVisitingPlanContent[i].status = '待跟进' ; break ;
                            default : ret.results[i].status = '无' ; break;
                        }
                        break;
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowVisitingPlanContent
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('到访计划关闭失败');
            }
            yield put({ type:'closeVisitingPlanListLoading' });
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
		  let courseDataSource = yield call( CheckZJLReservationCourseDetail, ({ startDate : value, endDate : value, orgId, canTry : 1 }));
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
			  message.error( ret && ret.errorMessage || '课程数据加载失败' );
		  }
		},

        /*获取预约试听列表*/
        *'GetReservationList'({ payload },{ put , call , select }){
            //获取标识(新增/点击列表姓名/无)
            let Operation = '';
            if(payload && payload.Operation){
                Operation = payload.Operation;
                delete payload.Operation;
            }
            let { ret } = yield call(GetReservationList,parse(payload));
            if(ret && ret.errorCode === 9000){
                //格式化status
                for(let i in ret.results){
                    switch(ret.results[i].status){
                        case '0' : ret.results[i].status = '取消' ; break ;
                        case '1' : ret.results[i].status = '已预约' ; break ;
                        case '2' : ret.results[i].status = '已试听' ; break ;
                        case '3' : ret.results[i].status = '旷课' ; break ;
                        default : ret.results[i].status = '无' ; break;
                    }
                }
                let leadsFollow = yield select( state => state.leadsFollow );
                let pageSize = leadsFollow.leadsFollowReservationPageSize;                              //预约试听列表pageSize
                let leadsFollowReservationContent = leadsFollow.leadsFollowReservationContent;          //预约试听列表list
                //如果点击leads名称进入详情或者新增，则回到第一页，内容只保留pageSize的个数
                if(Operation == 'add' || Operation == 'openNew'){
                    //新增预约试听成功后或者打开新的leads查看预约试听时平滑滚动到滚动条顶端
                    if(document.getElementById('leads_reservation_inner_list')){
                        let div = document.getElementById('leads_reservation_inner_list');
                        let timer = setInterval(function(){
                            let scrollTop = div.scrollTop;
                            let ispeed = Math.floor( -scrollTop / 6 );
                            if(scrollTop == 0){
                                clearInterval(timer);
                            }
                            div.scrollTop = scrollTop + ispeed;
                        },30);
                    }
                    //如果是第一页并且数据少于pageSize，说明数据加载完毕
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowReservationNum : ret.data.resultCount,
                                leadsFollowReservationScrollFinish : true,
                                leadsFollowReservationContent : ret.results,
                                leadsFollowReservationPageIndex : ret.data.pageIndex,
                                leadsFollowReservationPageSize : ret.data.pageSize,
                            }
                        });
                    }else{
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowReservationNum : ret.data.resultCount,
                                leadsFollowReservationScrollFinish : false,
                                leadsFollowReservationContent : ret.results,
                                leadsFollowReservationPageIndex : ret.data.pageIndex,
                                leadsFollowReservationPageSize : ret.data.pageSize,
                            }
                        });
                    }
                }else{
                    //如果不是新增或刚打开，则表明是或者下拉刷新
                    if(payload.pageIndex == 0 && ret.results.length < pageSize){             //如果是第一页且数据个数少于pageSize，则直接展示，加载完毕
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowReservationNum : ret.data.resultCount,
                                leadsFollowReservationScrollFinish : true,                 //已结束
                                leadsFollowReservationContent : ret.results,
                                leadsFollowReservationPageIndex : ret.data.pageIndex,
                                leadsFollowReservationPageSize : ret.data.pageSize,
                            }
                        });
                    }else if(payload.pageIndex > 0 && ret.results.length < pageSize){       //如果不是第一个且当页数据个数少于pageSize，则说明数据加载完成
                        for(let i in ret.results){
                            leadsFollowReservationContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowReservationNum : ret.data.resultCount,
                                leadsFollowReservationScrollFinish : true,                 //已结束
                                leadsFollowReservationContent,
                                leadsFollowReservationPageIndex : ret.data.pageIndex,
                                leadsFollowReservationPageSize : ret.data.pageSize,
                            }
                        });
                    }else{      //如果有数据，说明没有到最后，需要把新的数据和老的数据合并展示
                        for(let i in ret.results){
                            leadsFollowReservationContent.push(ret.results[i]);
                        }
                        yield put({
                            type:'updateState',
                            payload:{
                                leadsFollowReservationNum : ret.data.resultCount,
                                leadsFollowReservationScrollFinish : false,                //未结束
                                leadsFollowReservationContent,
                                leadsFollowReservationPageIndex : ret.data.pageIndex,
                                leadsFollowReservationPageSize : ret.data.pageSize,
                            }
                        });
                    }
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取预约试听列表失败');
            }
        },

        //预约试听获取选中校区的课程信息
        *'ReservationGetCourse'({ payload },{ put , call , select }){
            let { ret } = yield call(ReservationGetCourse,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowReservationModalType : 'add',
                        leadsFollowReservationModalVisible : true,
                        leadsFollowReservationCourseMessage : ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取当前校区课程信息失败');
            }
        },

        //获取当前操作用户信息作为跟进人信息
        *'ReservationGetSellerDetail'({ payload },{ put , call , select }){
            let { ret } = yield call(ReservationGetSellerDetail,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowReservationSelfDetail : ret,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取当前校区课程信息失败');
            }
        },

        //早教类预约试听查看排课信息
        *'CheckZJLReservationCourseDetail'({ payload },{ put , call , select }){
            let { ret } = yield call(CheckZJLReservationCourseDetail,parse({  canTry : 1, ...payload }));
            if(ret && ret.errorCode === 9000){
                if(ret.data.resultCount == '0'){
                    message.warn('未查到排课信息，请重新选择');
                }
                yield put({
                    type:'updateState',
                    payload:{
                        courseDataSource  : ret.results,
                        leadsFollowReservationCourseSelectRowKeys : [],          //早教类下选择排课信息数组
                        leadsFollowReservationCourseSelectRows : [],             //早教类下选择排课信息数组
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取当前校区课程信息失败');
            }
        },

        /*新增预约试听提交*/
        *'LeadsFollowReservationModalSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showReservationListLoading' });
            yield put({ type:'showReservationModalButtonLoading' });
            let { ret } = yield call(LeadsFollowReservationModalSubmit,parse(payload));
            //到访计划的新增编辑对leads列表无影响，不用像跟进记录一样进行列表查询来更新状态(爽!)
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '预约试听提交成功');
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowDetailLeadMessage = leadsFollow.leadsFollowDetailLeadMessage;            //当前leads的详细信息
                let leadsFollowReservationPageSize = leadsFollow.leadsFollowReservationPageSize;      //当前到访计划每页条数
                //如果是编辑成功，则直接重写当前项
                yield put({
                    type:'GetReservationList',
                    payload:{
                        pageIndex : 0,
                        pageSize : leadsFollowReservationPageSize,
                        condition : 'all',
                        source : 2,
                        orgId : leadsFollowDetailLeadMessage.orgId,
                        stuId : leadsFollowDetailLeadMessage.id,
                        Operation : 'add'
                    }
                });
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowReservationModalVisible : false,
                        courseDataSource : [],
						dayList          : [],
						courseList       : [],
                        leadsFollowReservationCourseSelectRowKeys : [],         //早教类下选择排课信息数组
                        leadsFollowReservationCourseSelectRows : [],            //早教类下选择排课信息数组
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('预约试听提交失败');
            }
            yield put({ type:'closeReservationModalButtonLoading' });
            yield put({ type:'closeReservationListLoading' });
        },

        /*leads预约试听改变状态*/
        *'LeadsFollowReservationChangeItemStatus'({ payload },{ put , call , select }){
            yield put({ type:'showReservationListLoading' });
            let { ret } = yield call(LeadsFollowReservationChangeItemStatus,parse(payload));
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '修改成功');
                //替换当前项
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowReservationContent = leadsFollow.leadsFollowReservationContent;
                for(let i in leadsFollowReservationContent){
                    if(leadsFollowReservationContent[i].id == payload.ids){
                        switch(payload.status){
                            case '0' : leadsFollowReservationContent[i].status = '取消' ; break ;
                            case '1' : leadsFollowReservationContent[i].status = '已预约' ; break ;
                            case '2' : leadsFollowReservationContent[i].status = '已试听' ; break ;
                            case '3' : leadsFollowReservationContent[i].status = '旷课' ; break ;
                            default : leadsFollowReservationContent[i].status = '无' ; break;
                        }
                        break;
                    }
                }
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowReservationContent,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('修改失败');
            }
            yield put({ type:'closeReservationListLoading' });
        },

        //获取当前leads的详细信息，数据不能格式化
        *'LeadsEditGetThisDetail'({ payload },{ call, put, select }){
            yield put({ type:'showLeadsDetailEditModalLoading' , payload : { detailEditModalVisible : true }}) ;
            let { ret } = yield call(GetTableList,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        detailEditModalBackMessage : ret.results[0]
                    }
                });
                //获取推荐人(联系人下拉列表内容)
                yield put({
                    type:'GetRecommend',
                    payload:{
                        orgId : ret.results[0].orgId
                    }
                });
                //获取机构类型下拉列表
                yield put({
                    type:'GetStuType',
                    payload : {
                        dictkey : 'studentType'
                    }
                })
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取当前客户信息失败');
            }
            yield put({ type:'closeLeadsDetailEditModalLoading' })
        },

        //获取机构类型下拉列表
        *'GetStuType'({ payload },{ call, put, select }){
            let { ret } = yield call(GetStuType,parse(payload));
            if (ret && ret.errorCode == '9000') {
                yield put({
                    type: 'updateState',
                    payload: {
                        leadsFollowEditStuType : ret.list
                    }
                })
            } else {
                message.error('获得机构类型下拉列表失败');
            }
        },

        //获取推荐人(联系人下拉列表内容)
        *'GetRecommend'({ payload },{ call, put, select }){
            let { ret } = yield call(GetRecommend,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        detailEditModalRecommender : ret.results
                    }
                });
                //获取收集人(租户下所有员工)下拉列表内容
                yield put({
                    type:'GetCollector',
                    payload:{
                        status : 1,
                        orgId : payload.orgId
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取推荐人信息失败');
            }
        },
        //获取收集人(租户下所有员工)下拉列表内容
        *'GetCollector'({ payload },{ call, put, select }){
            let { ret } = yield call(GetCollector,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        detailEditModalCollector : ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取收集人信息失败');
            }
        },

        //leads编辑提交
        *'DetailEditModalSubmit'({ payload },{ call, put, select }){
            yield put({ type:'showLeadsDetailEditModalButtonLoading' });
            let { ret } = yield call(DetailEditModalSubmit,parse(payload));
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '编辑成功');
                //关闭modal
                yield put({
                    type:'updateState',
                    payload:{
                        detailEditModalVisible : false
                    }
                });
                let leadsFollow = yield select( state => state.leadsFollow );
                //当前leads刷新并且格式化数据
                yield put({
                    type:'GetCurrentDetail',
                    payload:{
                        id : payload.id
                    }
                });
                //列表刷新
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let leadsFollowPageIndex = leadsFollow.leadsFollowPageIndex;
                let leadsFollowPageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'            //用来告知列表刷新不关闭详情框
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                            zj_from : 'submit_in_detail'
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取收集人信息失败');
            }
            yield put({ type:'closeLeadsDetailEditModalButtonLoading' });
        },

        //点击转为学员时获取联系人信息并且打开modal
        *'LeadsMergeGetParent'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(LeadsMergeGetParent,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        leadsFollowStuMergeModalVisible : true,
                        leadsFollowStuMergeModalParent : ret.parents,
                        //leadsFollowStuMergeModalParent : [{parentName:'呵呵',parentId:'1'},{parentName:'嘻嘻',parentId:'2'}]
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取联系人信息失败');
            }
            yield put({ type : 'closeTableLoading' });
        },

        //点击合并已有学员请求crm学员列表(自己和自己下属的)
        *'GetSelfCrmStuTable'({ payload },{ put , call , select }){
            yield put({ type:'showStuMergeModalClickMergeLoading' });
            yield put({ type:'showInnerCrmStuTableMergeLoading' });
            let { ret } = yield call(GetSelfCrmStuTable,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let leadsFollow = yield select( state => state.leadsFollow );
                let num = leadsFollow.stuClueCrmStuWetherFirstChangeMergeStu;
                yield put({
                    type : 'updateState',
                    payload : {
                        stuClueCrmStuWetherFirstChangeMergeStu : num + 1,
                        leadsFollowCrmStuModalVisible : true,
                        leadsFollowCrmStuModalContent : ret.results,                      //crm学员列表内容
                        leadsFollowCrmStuModalTotal : !!ret.data && ret.data.resultCount || 0,
                        leadsFollowCrmStuModalPageIndex : !!ret.data && ret.data.pageIndex || 0,
                        leadsFollowCrmStuModalPageSize : !!ret.data && ret.data.pageSize || 20,
                        leadsFollowCrmStuModalSelectedRowKeys : [],             //表格多选选中的数组
                        leadsFollowCrmStuModalSelectedRow : [],                 //表格多选中的对象数组
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取CRM学员信息失败');
            }
            yield put({ type:'closeStuMergeModalClickMergeLoading' });
            yield put({ type:'closeInnerCrmStuTableMergeLoading' });
        },

        //转为学员表单提交
        *'LeadsFollowStuMergeModalSubmit'({ payload },{ put , call , select }){
            yield put({ type:'showStuMergeModalButtonLoading' });
            let { ret } = yield call(LeadsFollowStuMergeModalSubmit,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage || '转为学员成功');
                yield put({
                    type:'updateState',
                    payload:{
                        leadsFollowStuMergeModalVisible : false,                //modal是否显示
                        leadsFollowStuMergeStuTableModalLoading : false,        //关闭点击合并学员加载状态
                        stuClueCrmStuWetherFirstChangeMergeStu : 0,             //重置点击次数
                        leadsFollowCrmStuModalSelectedRowKeys : [],
                        leadsFollowCrmStuModalSelectedRow : [],
                    }
                });
                //列表查询并且关闭详情页，因为当前操作数据已经不在列表中
                let leadsFollow = yield select( state => state.leadsFollow );
                let leadsFollowType = leadsFollow.leadsFollowType;
                let leadsFollowMyOrStaffId = leadsFollow.leadsFollowMyOrStaffId;
                let leadsFollowPageIndex = leadsFollow.leadsFollowPageIndex;
                let leadsFollowPageSize = leadsFollow.leadsFollowPageSize;
                let fastSearchContent = leadsFollow.leadsFollowFastSearchContent;
                let superSearchContent = leadsFollow.leadsFollowRightSuperSearchContent;
                let sortSearchContent = leadsFollow.sortSearchContent;
                if(leadsFollowType == 'all'){
                    //全部leads只需要传分页信息和搜索信息
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent,
                        }
                    })
                }else if(leadsFollowType == 'my'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            uids : leadsFollowMyOrStaffId,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'recycle'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            status : 3,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }else if(leadsFollowType == 'public'){
                    yield put({
                        type : 'GetTableList',
                        payload : {
                            pageIndex : leadsFollowPageIndex,
                            pageSize : leadsFollowPageSize,
                            commonalityLeads : 1,
                            fastSearchContent,
                            superSearchContent,
                            sortSearchContent
                        }
                    })
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取CRM学员信息失败');
            }
            yield put({ type:'closeStuMergeModalButtonLoading' });
        },

        //leads编辑学员姓名，联系人姓名，联系人手机号
        *'EditLeadsCheckSameOnBlur'({ payload },{ call, put, select }){
            let { ret } = yield call(EditLeadsCheckSameOnBlur,parse(payload));
            if(ret && ret.errorCode === 1000){
                message.error(ret && ret.errorMessage || '有重复');
            }
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        //列表加载状态
        showTableLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowTableLoading : true};
        },
        //列表加载状态
        closeTableLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowTableLoading : false};
        },
        //分配表单按钮加载状态
        showDispatchModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowLeadsDispatchModalButtonLoading : true};
        },
        //分配表单按钮加载状态
        closeDispatchModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowLeadsDispatchModalButtonLoading : false};
        },
        //提醒modal按钮加载
        showAlertModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowDetailModalAlertButtonLoading : true};
        },
        //提醒modal按钮加载
        closeAlertModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowDetailModalAlertButtonLoading : false};
        },
        //转给他人表单按钮加载状态
        showSendOtherModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowDetailSendOtherModalButtonLoading : true};
        },
        //转给他人表单按钮加载状态
        closeSendOtherhModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowDetailSendOtherModalButtonLoading : false};
        },
        //新增跟进记录发布按钮加载状态
        showFollowRecordButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordButtonLoading : true , smallScreenAddFollowRecordModalButtonLoading : true };
        },
        //新增跟进记录发布按钮加载状态
        closeFollowRecordButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordButtonLoading : false , smallScreenAddFollowRecordModalButtonLoading : false };
        },
        //跟进记录list加载状态
        showFollowRecordContentLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordContentLoading : true};
        },
        //跟进记录list加载状态
        closeFollowRecordContentLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordContentLoading : false};
        },
        //跟进记录编辑modal按钮加载状态
        showFollowRecordEditButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordEditButtonLoading : true};
        },
        //跟进记录编辑modal按钮加载状态
        closeFollowRecordEditButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowFollowRecordEditButtonLoading : false};
        },
        //到访计划新增编辑list加载状态
        showVisitingPlanListLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowVisitingPlanContentLoading : true};
        },
        //到访计划新增编辑list加载状态
        closeVisitingPlanListLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowVisitingPlanContentLoading : false};
        },
        //新增编辑到访计划按钮加载状态
        showVisitingPlanModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowVisitingPlanModalButtonLoading : true};
        },
        //新增编辑到访计划按钮加载状态
        closeVisitingPlanModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowVisitingPlanModalButtonLoading : false};
        },
        //预约试听新增编辑list加载状态
        showReservationListLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowReservationContentLoading : true};
        },
        //预约试听新增编辑list加载状态
        closeReservationListLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowReservationContentLoading : false};
        },
        //新增编辑预约试听按钮加载状态
        showReservationModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowReservationModalButtonLoading : true};
        },
        //新增编辑预约试听按钮加载状态
        closeReservationModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowReservationModalButtonLoading : false};
        },
        //leads详情编辑modal加载状态
        showLeadsDetailEditModalLoading(state, action) {
            return { ...state, ...action.payload , detailEditModalLoading : true};
        },
        //leads详情编辑modal加载状态
        closeLeadsDetailEditModalLoading(state, action) {
            return { ...state, ...action.payload , detailEditModalLoading : false};
        },
        //leads详情编辑提交按钮加载状态
        showLeadsDetailEditModalButtonLoading(state, action) {
            return { ...state, ...action.payload , detailEditModalButtonLoading : true};
        },
        //leads详情编辑提交按钮加载状态
        closeLeadsDetailEditModalButtonLoading(state, action) {
            return { ...state, ...action.payload , detailEditModalButtonLoading : false};
        },
        //转化学员modal点击转化学员后按钮加载状态
        showStuMergeModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowStuMergeModalButtonLoading : true};
        },
        //转化学员modal点击转化学员后按钮加载状态
        closeStuMergeModalButtonLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowStuMergeModalButtonLoading : false};
        },
        //开启学员合并modal加载状态
        showStuMergeModalClickMergeLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowStuMergeStuTableModalLoading : true};
        },
        //关闭学员合并modal加载状态
        closeStuMergeModalClickMergeLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowStuMergeStuTableModalLoading : false};
        },
        //CRM学员列表加载状态
        showInnerCrmStuTableMergeLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowCrmStuModalLoading : true};
        },
        //CRM学员列表加载状态
        closeInnerCrmStuTableMergeLoading(state, action) {
            return { ...state, ...action.payload , leadsFollowCrmStuModalLoading : false};
        },
    },
};
