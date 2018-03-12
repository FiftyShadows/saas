import React from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import LeadsFollowTable from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowTable';
import LeadsFollowRightSuperSearch from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowSuperSearch';
import LeadsFollowLeadsDispatchModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowLeadsDispatchModal/LeadsFollowLeadsDispatchModal';
import LeadsFollowDetailModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowDetailModal';
import LeadsFollowDetailSendOtherModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowDetailSendOtherModal/LeadsFollowDetailSendOtherModal';
import LeadsFollowEditFollowRecord from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowFollowRecordInner/AddOrEditFollowRecord/EditFollowRecord';
import AddOrEditVisitingPlanModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowVisitingPlanInner/AddOrEditVisitingPlan/AddOrEditVisitingPlanModal';
import AddOrEditReservationModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowReservationInner/AddOrEditReservation/AddOrEditReservationModal';
import DetailEditModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowDetailEdit/DetailEditModal';
import StuMergeModal from '../../../components/crm/leads-follow/leads-follow-table/LeadsFollowStuMerge/StuMergeModal'
import { AlertModal } from '../../../components/common/new-component/NewComponent';

/*leads跟进*/
function LeadsFollow({ dispatch , leadsFollow }) {

    let {
        wetherChangeRouter,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        leadsCheckColumnKey,                    //保存到cookie中的名单显示列表的字段名
        leadsFollowType,                        //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowUserOrgId,                   //当前操作用户所属的机构ID
        leadsFollowUserId,                      //当前操作用户的userId
        leadsFollowMyOrStaffId,                 //在'my'条件下查询的uid
        leadsFollowUids,                        //查询我的leads时需要传的参数，其余状态下不传或者空字符串
        leadsFollowWay,                         //跟进方式
        leadsFollowSecondChannel,               //二级来源
        leadsFollowConnectStatus,               //联系方式
        leadsFollowOrgScale,                    //机构规模

        /*排序搜索*/
        sortSearchContent,                      //排序搜索条件

        /*常用searchBar*/
        leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        leadsFollowFastSearchStuSource,         //快捷搜索栏一级来源下拉列表内容
        leadsFollowFastSearchContent,           //快捷搜索栏搜索内容

        /*高级搜索*/
        leadsFollowRightSuperSearchVisible,     //高级搜索是否显示
        leadsFollowRightSuperSearchContent,     //高级搜索栏搜索内容

        /*table*/
        leadsFollowTableNewColumns,             //选择列表是否显示字段是哪些
        leadsFollowTableLoading,                //列表是否加载状态
        leadsFollowTableDataSource,             //列表数据
        leadsFollowTableSelectedRowKeys,        //多选框选中项的id,若无id，则取到当前索引
        leadsFollowTableSelectedRows,           //多选框选中的项的对象数组

        /*pagination*/
        leadsFollowDataTotal,                   //数据总共数目
        leadsFollowPageIndex,                   //页码
        leadsFollowPageSize,                    //每页条数

        /*分配modal*/
        leadsFollowLeadsDispatchModalVisible,           //分配modal是否显示
        leadsFollowLeadsDispatchModalButtonLoading,     //分配modal按钮是否加载状态
        leadsFollowLeadsDispatchModalStaffContent,      //分配modal校区下的员工信息
        leadsFollowLeadsDispatchModalStaffMaxLeads,     //每个员工所拥有的最多leads数
        leadsFollowLeadsDispatchModalAllStaffLeads,     //当前校区下员工下的leads数情况
        leadsFollowLeadsDispatchModalCurrentStaffLeads, //当前员工已分配的leads数
        leadsFollowLeadsDispatchModalWetherShowAlert,   //是否显示温馨提示，告诉用户当前销售/员工如果增加的leads超过最大leads数，并且终止用户提交

        /*详情左划框*/
        leadsFollowDetailModalVisible,          //划入框是否显示
        leadsFollowDetailModalTabKey,           //tab项索引
        leadsFollowDetailLeadMessage,           //选中leads名单查看详情时当前人的信息

        /*详情右上角操作提示框modal*/
        leadsFollowDetailModalAlertVisible,             //提示框是否显示
        leadsFollowDetailModalAlertTitle,               //提示框标题
        leadsFollowDetailModalAlertContent,             //提示框内容
        leadsFollowDetailModalAlertButtonLoading,       //提示框按钮是否加载状态
        leadsFollowDetailModalAlertMessage,             //提示框点击确定后提交的信息

        /*转给他人modal*/
        leadsFollowDetailSendOtherModalVisible,             //转给他人modal是否显示
        leadsFollowDetailSendOtherModalButtonLoading,       //转给他人modal按钮是否加载
        leadsFollowDetailSendOtherModalStaffMessage,        //转给他人modal选择销售下拉列表内容
        leadsFollowDetailSendOtherModalWetherShowAlert,     //当前员工leads数分配过后是否已超标，超标显示提示信息并且不可提交

        /*跟进记录*/
        leadsFollowFollowRecordNum,                         //跟进记录条数
        leadsFollowFollowRecordPageIndex,                   //跟进记录页码
        leadsFollowFollowRecordPageSize,                    //跟进记录每页条数
        leadsFollowFollowRecordButtonLoading,               //新增跟进记录发布按钮是否加载
        leadsFollowFollowRecordContentLoading,              //当前跟进记录loading状态
        leadsFollowFollowRecordContent,                     //当前leads跟进记录list
        leadsFollowFollowRecordScrollFinish,                //滚动加载是否完成(即数据加载完毕)

        /*跟进记录编辑modal*/
        leadsFollowFollowRecordEditVisible,                 //跟进记录编辑modal是否显示
        leadsFollowFollowRecordEditButtonLoading,           //跟进记录编辑modal按钮是否加载
        leadsFollowFollowRecordEditContent,                 //跟进记录编辑回填数据

        //到访计划
        leadsFollowVisitingPlanNum,                         //到访计划条数
        leadsFollowVisitingPlanPageIndex,                   //到访计划页码
        leadsFollowVisitingPlanPageSize,                    //到访计划每页条数
        leadsFollowVisitingPlanContentLoading,              //当前到访计划loading状态
        leadsFollowVisitingPlanContent,                     //当前leads到访计划list
        leadsFollowVisitingPlanScrollFinish,                //滚动加载是否完成(即数据加载完毕)

        //新增编辑到访计划
        leadsFollowVisitingPlanModalType,                   //新增编辑到访计划表单类型('add','edit')
        leadsFollowVisitingPlanModalVisible,                //新增编辑到访计划表单是否显示
        leadsFollowVisitingPlanModalButtonLoading,          //新增编辑到访计划表单按钮是否加载
        leadsFollowVisitingPlanModalContent,                //编辑到访计划时回填数据

        //预约试听
        leadsFollowReservationNum,                          //预约试听条数
        leadsFollowReservationPageIndex,                    //预约试听页码
        leadsFollowReservationPageSize,                     //预约试听每页条数
        leadsFollowReservationContentLoading,               //当前预约试听列表loading状态
        leadsFollowReservationContent,                      //当前leads预约试听list
        leadsFollowReservationScrollFinish,                 //滚动加载是否完成(即数据加载完毕)

        //新增编辑预约试听
        leadsFollowReservationModalType,                    //新增编辑预约试听表单类型('add','edit')
        leadsFollowReservationModalVisible,                 //新增编辑预约试听表单是否显示
        leadsFollowReservationModalButtonLoading,           //新增编辑预约试听表单按钮是否加载
        leadsFollowReservationModalCourseContent,           //新增早教类机构预约试听时获取的排课信息
        leadsFollowReservationSelfDetail,                   //新增预约试听当前操作人信息作为跟进人
        leadsFollowReservationCourseMessage,                //预约试听当前校区下的课程下拉列表内容
        leadsFollowReservationCourseSelectRowKeys,          //早教类下选择排课信息数组
        leadsFollowReservationCourseSelectRows,             //早教类下选择排课信息数组
		dayList,                                            //选择年月得到的有课日期列表
		courseList,                                         //预约试听课程下拉列表
		courseDataSource,                                   //排课信息

        //详情编辑modal
        detailEditModalVisible,                             //leads编辑modal是否显示
        detailEditModalLoading,                             //leads编辑modal加载状态
        detailEditModalButtonLoading,                       //leads编辑按钮加载状态
        detailEditModalBackMessage,                         //leads编辑时当前leads的回填信息
        leadsFollowParentRelationship,                      //leads编辑联系人关系下拉列表内容
        detailEditModalRecommender,                         //leads编辑推荐人信息下拉列表
        detailEditModalCollector,                           //leads编辑收集人信息
        leadsFollowEditStuType,                             //leads编辑机构类型下拉列表内容

        //转为学员modal
        leadsFollowStuMergeModalVisible,                    //转为学员modal是否显示
        leadsFollowStuMergeModalButtonLoading,              //转为学员modal按钮是否加载状态
        leadsFollowStuMergeModalParent,                     //转为学员modal接口请求联系人信息数组
        leadsFollowStuMergeStuTableModalLoading,            //点击转化学员加载状态
        stuClueCrmStuWetherFirstChangeMergeStu,             //是否是第一次点击转化学员(用于改变文案)

        //crm学员modal(转为学员modal中点击合并学员弹出)
        leadsFollowCrmStuModalVisible,                      //crm学员modal是否显示
        leadsFollowCrmStuModalLoading,                      //crm学员modal加载状态
        leadsFollowCrmStuModalPageIndex,                    //crm学员modal页码
        leadsFollowCrmStuModalPageSize,                     //crm学员modal每页条数
        leadsFollowCrmStuModalContent,                      //crm学员列表内容
        leadsFollowCrmStuModalTotal,                        //crm学员列表总共个数
        leadsFollowCrmStuModalSelectedRowKeys,              //表格多选选中的数组
        leadsFollowCrmStuModalSelectedRow,                  //表格多选中的对象数组

        //小屏新增跟进记录
        smallScreenAddFollowRecordModalVisible,             //小屏新增跟进记录modal是否显示
        smallScreenAddFollowRecordModalButtonLoading,       //小屏新增跟进记录modal按钮加载状态

    } = leadsFollow

    //搜索栏的OnSearch事件
    function LeadsSearchBarOnSearch(data){
        //只有我和我的下属列表需要传uids
        if(leadsFollowType == 'my'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    uids : leadsFollowMyOrStaffId,
                    fastSearchContent : data,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'all'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    fastSearchContent : data,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'recycle'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    status : 3,
                    fastSearchContent : data,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'public'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    commonalityLeads : 1,
                    fastSearchContent : data,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }
    }

    //下属变更时事件
    function SubordinateChange(id){
        if(leadsFollowType == 'my'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    uids : id,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }
    }

    //table点击高级搜索事件和高级搜索点击右上角的X
    function LeadsSuperSearchOnSearch(){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowRightSuperSearchVisible : !leadsFollowRightSuperSearchVisible
            }
        });
    }

    //高级搜索点击搜索
    function LeadsFollowRightSuperSearchClick(data){
        //处理生日时间范围
        if(data && data.birthday && data.birthday.length > 0){
            data.startBirthday = data.birthday[0] != undefined ? data.birthday[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endBirthday = data.birthday[1] != undefined ? data.birthday[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.birthday;
        }

        //处理创建时间范围
        if(data && data.createTime && data.createTime.length > 0){
            data.startCreateTime = data.createTime[0] != undefined ? data.createTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endCreateTime = data.createTime[1] != undefined ? data.createTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.createTime;
        }

        //处理下次跟进时间范围
        if(data && data.nextFollowTime && data.nextFollowTime.length > 0){
            data.startNextFollowTime = data.nextFollowTime[0] != undefined ? data.nextFollowTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endNextFollowTime = data.nextFollowTime[1] != undefined ? data.nextFollowTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.nextFollowTime;
        }

        //处理更新时间范围
        if(data && data.modifyTime && data.modifyTime.length > 0){
            data.startModifyTime = data.modifyTime[0] != undefined ? data.modifyTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endModifyTime = data.modifyTime[1] != undefined ? data.modifyTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.modifyTime;
        }

        //处理最后跟进时间范围
        if(data && data.finalFollowTime && data.finalFollowTime.length > 0){
            data.startFinalFollowTime = data.finalFollowTime[0] != undefined ? data.finalFollowTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endFinalFollowTime = data.finalFollowTime[1] != undefined ? data.finalFollowTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.finalFollowTime;
        }

        if(leadsFollowType == 'my'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    uids : leadsFollowMyOrStaffId,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : data,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'all'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : data,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'recycle'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    status : 3,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : data,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'public'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    commonalityLeads : 1,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : data,
                    sortSearchContent
                }
            });
        }
    }

    //复选框onChange事件
    function LeadsTableSelectedRowOnChange(selectedRowKeys, selectedRows){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowTableSelectedRowKeys : selectedRowKeys,
                leadsFollowTableSelectedRows : selectedRows
            }
        });
    }

    //列表排序事件
    function LeadsFollowTableOnChange(pagination,filters,sorter){
        if(leadsFollowType == 'my'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    uids : leadsFollowMyOrStaffId,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }else if(leadsFollowType == 'all'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    column : sorter.columnKey,
                    sort : sorter.order,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }else if(leadsFollowType == 'recycle'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    status : 3,
                    column : sorter.columnKey,
                    sort : sorter.order,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }else if(leadsFollowType == 'public'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : leadsFollowPageSize,
                    commonalityLeads : 1,
                    column : sorter.columnKey,
                    sort : sorter.order,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }
    }

    //分页改变事件
    function LeadsTablePageOnChange(pageIndex,pageSize){
        if(leadsFollowType == 'my'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    uids : leadsFollowMyOrStaffId,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'all'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'recycle'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    status : 3,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }else if(leadsFollowType == 'public'){
            dispatch({
                type:'leadsFollow/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    commonalityLeads : 1,
                    fastSearchContent : leadsFollowFastSearchContent,
                    superSearchContent : leadsFollowRightSuperSearchContent,
                    sortSearchContent
                }
            });
        }
    }

    //leftbars分配或者捞取按钮(请求校区及校区下的可使用的员工)
    function LeadsFollowTableDispatch(type){
        if(type == 'all'){
            //全部leads中点击分配
            dispatch({
                type:'leadsFollow/LeadsFollowTableDispatch',
                payload:{
                    orgId : leadsFollowUserOrgId,
                    status : 1
                }
            });
        }else if(type == 'my'){
            //我的leads中点击分配
            dispatch({
                type:'leadsFollow/GetOrgStaffLeadsDetail',
                payload:{
                    orgId : leadsFollowUserOrgId
                }
            });
        }else if(type == 'public'){
            //公海池中中点击捞取
            dispatch({
                type:'leadsFollow/GetOrgStaffLeadsDetail',
                payload:{
                    orgId : leadsFollowUserOrgId
                }
            });
        }
    }

    //leftbars的各种按钮
    function LeadsFollowTableChangeStatus(type){
        let stuIds = [];
        for(let i in leadsFollowTableSelectedRows){
            stuIds.push(leadsFollowTableSelectedRows[i].id)
        }
        if(type == 'recycle'){
            //放入回收站
            dispatch({
                type:'leadsFollow/LeadsFollowTableChangeStatus',
                payload:{
                    stuIds : stuIds.join(','),
                    status : 3,
                }
            });
        }else if(type == 'gonghai'){
           //放入公海池
            dispatch({
                type:'leadsFollow/LeadsFollowTableChangeStatus',
                payload:{
                    stuIds : stuIds.join(','),
                    status : 1,
                }
            });
        }else if(type == 'reduction'){
            //还原到公海池
            dispatch({
                type:'leadsFollow/LeadsFollowTableChangeStatus',
                payload:{
                    stuIds : stuIds.join(','),
                    status : 1,
                }
            });
        }else if(type == 'delete'){
            //彻底删除
            dispatch({
                type:'leadsFollow/LeadsFollowTableChangeStatus',
                payload:{
                    stuIds : stuIds.join(','),
                    status : 0,
                }
            });
        }
    }

    //列表控制显示行
    function LeadsTableChangeColumns(leadsFollowTableNewColumns){
        window.localStorage.setItem(leadsCheckColumnKey,JSON.stringify(leadsFollowTableNewColumns));
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowTableNewColumns
            }
        });
    }

    //分配或者捞取modal提交
    function LeadsFollowLeadsDispatchModalSubmit(data){
        if(leadsFollowType == 'public'){
            dispatch({
                type:'leadsFollow/LeadsFollowLeadsDispatchModalSubmit',
                payload:{
                    gain : 1,
                    seller : leadsFollowUserId,
                    ...data
                }
            });
        }else{
            dispatch({
                type:'leadsFollow/LeadsFollowLeadsDispatchModalSubmit',
                payload:{
                    ...data
                }
            });
        }
    }

    //销售员工下拉列表onChange事件
    function LeadsFollowLeadsDispatchModalSelectOnChange(e){
        let existLeadsNo = 0;
        for(let i in leadsFollowLeadsDispatchModalAllStaffLeads){
            if(e == leadsFollowLeadsDispatchModalAllStaffLeads[i].sellerId){
                existLeadsNo = leadsFollowLeadsDispatchModalAllStaffLeads[i].hasNum;        //获取当前销售所拥有的leads数
                break;
            }
        }
        //判断，如果已拥有leads数加将要分配给他的leads数超过最大数量的话则显示温馨提示并阻止提交
        if(parseInt(existLeadsNo) + parseInt(leadsFollowTableSelectedRows.length) > parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads)){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowLeadsDispatchModalWetherShowAlert : true,
                    leadsFollowLeadsDispatchModalCurrentStaffLeads : existLeadsNo,
                }
            });
        }else{
             dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowLeadsDispatchModalWetherShowAlert : false,
                    leadsFollowLeadsDispatchModalCurrentStaffLeads : '',
                }
            });
        }
    }

    //分配modal关闭
    function LeadsFollowLeadsDispatchModalCancel(){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowLeadsDispatchModalVisible : false,
                leadsFollowLeadsDispatchModalButtonLoading : false,
                leadsFollowLeadsDispatchModalWetherShowAlert : undefined,
                leadsFollowTableSelectedRowKeys : [],           //多选框选中项的id,若无id，则取到当前索引
                leadsFollowTableSelectedRows : [],              //多选框选中的项的对象数组
            }
        });
    }

    //table点击姓名打开详情
    function TableClickOpenDetail(data){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowDetailModalVisible : true,
                leadsFollowDetailModalTabKey : '2',
                leadsFollowDetailLeadMessage : data,
            }
        });
        //获取跟进记录list
        dispatch({
            type:'leadsFollow/GetFollowRecordList',
            payload:{
                pageIndex : 0,
                pageSize : leadsFollowFollowRecordPageSize,
                condition : 'all',
                source : 2,
                orgId : data.orgId,
                stuId : data.id,
                Operation : 'openNew'
            }
        });
    }

    //详情内编辑右边转为学员，转给他人，退回公海，放入回收站事件
    function LeadsFollowDetailMoreMenuChoose(type,leads){
        if(type == 'back_public'){
            //退回公海
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowDetailModalAlertVisible : true,
                    leadsFollowDetailModalAlertMessage : { stuIds : leads.id , status : 1 },
                    leadsFollowDetailModalAlertTitle : `退回公海 ( 姓名：${leads.name} )`,
                    leadsFollowDetailModalAlertContent : '确定要将此名单退回公海吗'
                }
            });
        }else if(type == 'put_recycle'){
            //放入回收站
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowDetailModalAlertVisible : true,
                    leadsFollowDetailModalAlertMessage : { stuIds : leads.id , status : 3 },
                    leadsFollowDetailModalAlertTitle : `放入回收站 ( 姓名：${leads.name} )`,
                    leadsFollowDetailModalAlertContent : '确定要将此名单放入回收站吗'
                }
            });
        }else if(type == 'send_other'){
            //转给他人modal获取当前员工下属信息
            dispatch({
                type:'leadsFollow/GetCurrentStaffSubordinate',
            });
        }else if(type == 'transform_stu'){
            //点击转为学员时获取联系人信息并且打开modal
            dispatch({
                type:'leadsFollow/LeadsMergeGetParent',
                payload:{
                    openId : leadsFollowDetailLeadMessage.openId || '',
                    mobile : leadsFollowDetailLeadMessage.parentMobile || '',
                    orgId : leadsFollowDetailLeadMessage.orgId || '',
                }
            });
        }
    }

    //详情点击更多操作(退回公海，放入回收站)后提醒框点击确定
    function leadsFollowDetailModalAlertOnOk(){
        dispatch({
            type:'leadsFollow/LeadsFollowTableChangeStatus',
            payload:leadsFollowDetailModalAlertMessage
        });
    }

    //详情点击更多操作(退回公海，放入回收站)后提醒框点击取消
    function leadsFollowDetailModalAlertOnCancel(){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowDetailModalAlertVisible : false,
            }
        });
    }

    //详情内tab的onChange事件
    function LeadsFollowDetailModalTabChange(e){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowDetailModalTabKey : e
            }
        });
    }

    //详情划入框关闭
    function LeadsFollowDetailModalCancel(){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowDetailModalVisible : false,
                //leadsFollowFollowRecordContent : [],        //清空跟进记录数据
                //leadsFollowVisitingPlanContent : [],        //清空到访计划
                //leadsFollowReservationContent : [],         //清空预约试听
            }
        });
    }

    //详情中 转给他人 销售员工下拉列表onChange事件
    function LeadsFollowDetailSendOtherModalSelectOnChange(e){
        //'-1'代表停用
        if(leadsFollowLeadsDispatchModalStaffMaxLeads == '-1'){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowDetailSendOtherModalWetherShowAlert : false
                }
            });
        }else{
            let flag = false;       //判断此员工是否分配过名单
            for(let i in leadsFollowLeadsDispatchModalAllStaffLeads){
                //如果当前员工已分配过leads，则对比一下如果再分配这个会不会超过最大限额，若超过，则提示并不可提交
                if(e == leadsFollowLeadsDispatchModalAllStaffLeads[i].sellerId && parseInt(leadsFollowLeadsDispatchModalAllStaffLeads[i].hasNum) + 1 >  parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads)){
                    flag = true;        //员工已分配过leads
                    dispatch({
                        type:'leadsFollow/updateState',
                        payload:{
                            leadsFollowDetailSendOtherModalWetherShowAlert : true
                        }
                    });
                    break;
                }
            }
            //如果当前员工没有分配过leads
            if(!flag){
                //如果员工最大分配数小于1
                if(1 > leadsFollowLeadsDispatchModalStaffMaxLeads){
                    dispatch({
                        type:'leadsFollow/updateState',
                        payload:{
                            leadsFollowDetailSendOtherModalWetherShowAlert : true
                        }
                    });
                }else{
                    dispatch({
                        type:'leadsFollow/updateState',
                        payload:{
                            leadsFollowDetailSendOtherModalWetherShowAlert : false
                        }
                    });
                }
            }
        }
    }

    //转给他人modal提交
    function LeadsFollowDetailSendOtherModalSubmit(data){
        dispatch({
            type:'leadsFollow/LeadsFollowDetailSendOtherModalSubmit',
            payload:{
                stuIds : leadsFollowDetailLeadMessage.id,
                ...data
            }
        });
    }

    //转给他人modal关闭
    function LeadsFollowDetailSendOtherModalCancel(){
        dispatch({
            type:'leadsFollow/updateState',
            payload:{
                leadsFollowDetailSendOtherModalVisible : false,             //转给他人modal是否显示
                leadsFollowDetailSendOtherModalButtonLoading : false,       //转给他人modal按钮是否加载
                leadsFollowDetailSendOtherModalWetherShowAlert : undefined, //当前员工leads数分配过后是否已超标，超标显示提示信息并且不可提交
            }
        });
    }

    /*跟进记录*/

        //小屏点击新增跟进记录
        function SmallSereenAddFollowRecord(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    smallScreenAddFollowRecordModalVisible:true,
                }
            });
        }

        //新增跟进记录
        function LeadsFollowFollowRecordAdd(data){
            dispatch({
                type:'leadsFollow/LeadsFollowFollowRecordAdd',
                payload:{
                    Operation:'add',
                    ...data
                }
            });
        }

        //leads跟进记录删除
        function LeadsFollowFollowRecordDeleteItem(id){
            dispatch({
                type:'leadsFollow/LeadsFollowFollowRecordDeleteItem',
                payload:{
                    id
                }
            });
        }

        //leads跟进记录已经滑动到最底部
        function LeadsFollowFollowRecordScrollBottom(){
            dispatch({
                type:'leadsFollow/GetFollowRecordList',
                payload:{
                    pageIndex : leadsFollowFollowRecordPageIndex + 1,
                    pageSize : leadsFollowFollowRecordPageSize,
                    condition : 'all',
                    source : 2,
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    stuId : leadsFollowDetailLeadMessage.id,
                }
            });
        }

        //leads跟进记录编辑
        function LeadsFollowFollowRecordEditItem(item){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowFollowRecordEditVisible : true,              //跟进记录编辑modal是否显示
                    leadsFollowFollowRecordEditContent : item,                //跟进记录编辑回填数据
                }
            });
        }

        //跟进记录编辑modal关闭
        function LeadsFollowFollowRecordEditCancel(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowFollowRecordEditVisible : false,             //跟进记录编辑modal是否显示
                    leadsFollowFollowRecordEditButtonLoading : false,       //跟进记录编辑modal按钮是否加载
                    leadsFollowFollowRecordEditContent : {},                //跟进记录编辑回填数据
                }
            });
        }

        //跟进记录编辑modal提交
        function LeadsFollowFollowRecordEditSubmit(data){
            dispatch({
                type:'leadsFollow/LeadsFollowFollowRecordEditSubmit',
                payload:{
                    ...data
                }
            });
        }


    /*到访计划*/
        //leads到访计划已经滑动到最底部
        function LeadsFollowVisitingPlanScrollBottom(){
            dispatch({
                type:'leadsFollow/GetVisitingPlanList',
                payload:{
                    pageIndex : leadsFollowVisitingPlanPageIndex + 1,
                    pageSize : leadsFollowVisitingPlanPageSize,
                    condition : 'all',
                    source : 2,
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    stuId : leadsFollowDetailLeadMessage.id
                }
            });
        }

        //leads到访计划新增编辑
        function LeadsFollowVisitingPlanAddOrEditItem(type,data){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowVisitingPlanModalType : type,
                    leadsFollowVisitingPlanModalVisible : true,
                    leadsFollowVisitingPlanModalButtonLoading : false,
                    leadsFollowVisitingPlanModalContent : data
                }
            });
        }

        //新增编辑到访计划modal提交
        function LeadsFollowVisitingPlanModalSubmit(data){
            dispatch({
                type:'leadsFollow/LeadsFollowVisitingPlanModalSubmit',
                payload:{
                    ...data
                }
            });
        }

        //leads到访计划改变状态
        function LeadsFollowVisitingPlanChangeItemStatus(ids,status){
            dispatch({
                type:'leadsFollow/LeadsFollowVisitingPlanChangeItemStatus',
                payload:{
                    ids,
                    status
                }
            });
        }

        //到访计划modal关闭
        function LeadsFollowVisitingPlanModalCancel(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowVisitingPlanModalVisible : false,
                    leadsFollowVisitingPlanModalButtonLoading : false,
                    leadsFollowVisitingPlanModalContent : {}
                }
            });
        }

    /*预约试听*/

		//选择年月得到有课的日期
		function selectYearToDate( month, orgId ){
			dispatch({
				type : 'leadsFollow/selectYearToDate',
				payload : {
					month, orgId
				}
			})
			dispatch({
				type : 'leadsFollow/updateState',
				payload : {
					courseDataSource : [],
					selectCourseTime : [],
				}
			})
		}

		//选择日期得到课程列表以及课程信息
		function selectDate( value, orgId ){
			dispatch({
				type : 'leadsFollow/selectDate',
				payload : {
					value, orgId
				}
			})
		}

        //leads预约试听已经滑动到最底部
        function LeadsFollowReservationScrollBottom(){
            dispatch({
                type:'leadsFollow/GetReservationList',
                payload:{
                    pageIndex : leadsFollowReservationPageIndex + 1,
                    pageSize : leadsFollowReservationPageSize,
                    condition : 'all',
                    source : 2,
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    stuId : leadsFollowDetailLeadMessage.id
                }
            });
        }

        //leads预约试听新增编辑
        function LeadsFollowReservationAddOrEditItem(){
            //获取当前操作用户信息作为跟进人信息
            dispatch({
                type:'leadsFollow/ReservationGetSellerDetail',
            });
            //预约试听获取当前校区的课程信息
            dispatch({
                type:'leadsFollow/ReservationGetCourse',
                payload:{
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    status : 1 ,
                }
            });
        }

        //早教类预约试听查看课程信息
        function CheckZJLReservationCourseDetail(data){
            dispatch({
                type : 'leadsFollow/CheckZJLReservationCourseDetail',
                payload : {
                    ...data
                }
            });
        }

        //早教类预约试听下课程单选框onChange事件
        function ChooseZJLCourseArrange(selectedRowKeys, selectedRows){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowReservationCourseSelectRowKeys : selectedRowKeys,        //早教类下选择排课信息数组
                    leadsFollowReservationCourseSelectRows : selectedRows,              //早教类下选择排课信息数组
                }
            })
        }

        //预约试听新增modal提交
        function LeadsFollowReservationModalSubmit(data){
           dispatch({
               type:'leadsFollow/LeadsFollowReservationModalSubmit',
               payload:{
                   ...data
               }
           });
        }

        //预约试听新增modal关闭
        function LeadsFollowReservationModalCancel(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowReservationModalVisible : false,
                    leadsFollowReservationModalButtonLoading : false,
                    courseDataSource : [],
					dayList          : [],
					courseList       : [],
                    leadsFollowReservationCourseSelectRowKeys : [],         //早教类下选择排课信息数组
                    leadsFollowReservationCourseSelectRows : [],            //早教类下选择排课信息数组
                }
            })
        }

        //leads预约试听改变状态
        function LeadsFollowReservationChangeItemStatus(ids,status,orgKind){
            dispatch({
                type:'leadsFollow/LeadsFollowReservationChangeItemStatus',
                payload:{
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    ids,
                    status,
                    orgKind
                }
            });
        }


    /*详情编辑*/
        //leads详情点击编辑
        function LeadsFollowDetailOnEdit(){
            //获取当前leads的详细信息，数据不能格式化，
            dispatch({
                type:'leadsFollow/LeadsEditGetThisDetail',
                payload:{
                    id : leadsFollowDetailLeadMessage.id
                }
            });
        }

        //leads编辑学员姓名，联系人姓名，联系人手机号
        function EditLeadsCheckSameOnBlur(msg,id,type,orgId){
            let obj = {};
            if(msg != '' && msg != undefined && msg != null && !/^[\s]*$/.test(msg)){
                obj[type] = msg;
                obj.orgId = orgId;
                obj.type = type;
                if(type == 'name'){
                    obj.id = id;
                }else{
                    obj.parentId = id;
                }
                dispatch({
                    type:'leadsFollow/EditLeadsCheckSameOnBlur',
                    payload:{
                        ...obj
                    }
                });
            }
        }

        //leads编辑提交
        function DetailEditModalSubmit(data){
            dispatch({
                type:'leadsFollow/DetailEditModalSubmit',
                payload:{
                    ...data
                }
            });
        }

        //leads详情编辑关闭
        function DetailEditModalCancel(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    detailEditModalVisible : false,
                    detailEditModalLoading : false,                         //leads编辑modal加载状态
                    detailEditModalButtonLoading : false,                   //leads编辑按钮加载状态
                }
            });
        }

    /*学员转化*/
        //转为学员表单关闭
        function LeadsFollowStuMergeModalCancel(){
            dispatch({
                type:'leadsFollow/updateState',
                payload:{
                    leadsFollowStuMergeModalVisible : false,                //modal是否显示
                    leadsFollowStuMergeModalButtonLoading : false,          //modal按钮是否加载状态
                    leadsFollowStuMergeStuTableModalLoading : false,        //关闭点击合并学员加载状态
                    stuClueCrmStuWetherFirstChangeMergeStu : 0,             //重置点击次数
                    leadsFollowCrmStuModalSelectedRowKeys : [],
                    leadsFollowCrmStuModalSelectedRow : [],
                }
            });
        }

        //转为学员表单提交
        function LeadsFollowStuMergeModalSubmit(data){
            dispatch({
                type:'leadsFollow/LeadsFollowStuMergeModalSubmit',
                payload:{
                    ...data
                }
            });
        }

        //点击合并已有学员
        function StuMergeOpenCrmStuTable(orgId){
            //请求crm学员列表(自己和自己下属的)
            dispatch({
                type:'leadsFollow/GetSelfCrmStuTable',
                payload:{
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    uids : leadsFollowUids,
                    pageIndex : 0,
                    pageSize : leadsFollowCrmStuModalPageSize
                }
            });
        }

        //内部CRM学员列表点击查询学员姓名
        function LeadsFollowCrmStuModalOnSearch(values){
            dispatch({
                type:'leadsFollow/GetSelfCrmStuTable',
                payload:{
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    uids : leadsFollowUids,
                    pageIndex : 0,
                    pageSize : leadsFollowCrmStuModalPageSize,
                    ...values
                }
            });
        }

        //内部CRM学员列表分页改变
        function LeadsFollowCrmStuModalPageOnChange(current){
            dispatch({
                type:'leadsFollow/GetSelfCrmStuTable',
                payload:{
                    orgId : leadsFollowDetailLeadMessage.orgId,
                    uids : leadsFollowUids,
                    pageIndex : current - 1,
                    pageSize : leadsFollowCrmStuModalPageSize,
                }
            });
        }

        //内部CRM学员列表复选框onChange事件
        function LeadsFollowCrmStuModalRowSelectChange(selectedRowKeys, selectedRows){
            if(selectedRows.length > 1){
                message.warn('最多只能选中一个学员');
            }else{
                dispatch({
                    type:'leadsFollow/updateState',
                    payload:{
                        leadsFollowCrmStuModalSelectedRowKeys : selectedRowKeys,
                        leadsFollowCrmStuModalSelectedRow : selectedRows,
                    }
                });
            }
        }

        //内部CRM学员列表modal点击确认或者关闭(前端自行处理参数传递逻辑)
        function LeadsFollowCrmStuModalOnSubmitOrClose(type){
            if(type == 'ensure'){
                dispatch({
                    type:'leadsFollow/updateState',
                    payload:{
                        leadsFollowCrmStuModalVisible : false,                  //crm学员modal是否显示
                        leadsFollowCrmStuModalLoading : false,                  //crm学员modal加载状态
                    }
                });
            }else{
                dispatch({
                    type:'leadsFollow/updateState',
                    payload:{
                        leadsFollowCrmStuModalVisible : false,                  //crm学员modal是否显示
                        leadsFollowCrmStuModalLoading : false,                  //crm学员modal加载状态
                        leadsFollowCrmStuModalSelectedRowKeys : [],
                        leadsFollowCrmStuModalSelectedRow : [],
                    }
                });
            }
        }


    /*高级搜索属性*/
    let LeadsFollowRightSuperSearchProps = {
        leadsFollowSecondChannel,                   //二级来源
        leadsFollowType,                            //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowSecondChannel,                   //二级来源
        leadsFollowConnectStatus,                   //联系方式
        leadsFollowOrgScale,                        //机构规模
        leadsFollowRightSuperSearchVisible,         //高级搜索是否显示
        leadsFollowRightSuperSearchContent,         //高级搜索栏搜索内容
        wetherChangeRouter,                         //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        LeadsFollowRightSuperSearchClick,           //高级搜索点击搜索或者重置
        LeadsSuperSearchOnSearch,                   //点击右上角的X
    };

    /*分配modal属性*/
    let LeadsFollowLeadsDispatchModalProps = {
        leadsFollowType,                            //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowLeadsDispatchModalVisible,       //分配modal是否显示
        leadsFollowLeadsDispatchModalButtonLoading, //分配modal按钮是否加载状态
        leadsFollowLeadsDispatchModalStaffContent,  //分配modal校区下的员工信息
        leadsFollowLeadsDispatchModalStaffMaxLeads, //每个员工所拥有的最多leads数
        leadsFollowLeadsDispatchModalAllStaffLeads, //当前校区下员工下的leads数情况
        leadsFollowLeadsDispatchModalCurrentStaffLeads, //当前员工已分配的leads数
        leadsFollowLeadsDispatchModalWetherShowAlert,   //是否显示温馨提示，告诉用户当前销售/员工如果增加的leads超过最大leads数，并且终止用户提交
        leadsFollowTableSelectedRowKeys,            //多选框选中项的id,若无id，则取到当前索引
        leadsFollowTableSelectedRows,               //多选框选中的项的对象数组
        LeadsFollowLeadsDispatchModalSelectOnChange,//销售员工下拉列表onChange事件
        LeadsFollowLeadsDispatchModalSubmit,        //分配modal提交
        LeadsFollowLeadsDispatchModalCancel,        //分配modal关闭
    };

    //详情左边划入框属性
    let LeadsFollowDetailModalProps = {
        leadsFollowType,                        //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowDetailModalVisible,          //划入框是否显示
        leadsFollowDetailModalTabKey,           //tab项索引
        leadsFollowDetailLeadMessage,           //选中leads名单查看详情时当前人的信息
        leadsFollowEditStuType,                 //leads编辑机构类型下拉列表内容

        LeadsFollowDetailOnEdit,                //leads详情点击编辑
        LeadsFollowDetailMoreMenuChoose,        //详情内编辑右边转给他人，退回公海，放入回收站事件
        LeadsFollowDetailModalTabChange,        //详情内tab的onChange事件
        LeadsFollowDetailModalCancel,           //详情划入框关闭

        //跟进记录
        leadsFollowWay,                         //跟进方式
        leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        leadsFollowFollowRecordNum,             //跟进记录条数
        leadsFollowFollowRecordButtonLoading,   //新增跟进记录发布按钮是否加载
        leadsFollowFollowRecordContentLoading,  //当前跟进记录loading状态
        leadsFollowFollowRecordContent,         //当前leads跟进记录list
        leadsFollowFollowRecordScrollFinish,    //滚动加载是否完成(即数据加载完毕)

        LeadsFollowFollowRecordAdd,             //新增跟进记录
        SmallSereenAddFollowRecord,             //小屏点击新增跟进记录
        LeadsFollowFollowRecordScrollBottom,    //leads跟进记录已经滑动到最底部
        LeadsFollowFollowRecordEditItem,        //leads跟进记录编辑
        LeadsFollowFollowRecordDeleteItem,      //leads跟进记录删除

        //到访计划
        leadsFollowVisitingPlanNum,                 //到访计划条数
        leadsFollowVisitingPlanContentLoading,      //当前到访计划loading状态
        leadsFollowVisitingPlanContent,             //当前leads到访计划list
        leadsFollowVisitingPlanScrollFinish,        //滚动加载是否完成(即数据加载完毕)

        LeadsFollowVisitingPlanScrollBottom,        //leads到访计划已经滑动到最底部
        LeadsFollowVisitingPlanAddOrEditItem,       //leads到访计划新增编辑
        LeadsFollowVisitingPlanChangeItemStatus,    //leads到访计划改变状态

        //预约试听
        leadsFollowReservationNum,                          //预约试听条数
        leadsFollowReservationContentLoading,               //当前预约试听列表loading状态
        leadsFollowReservationContent,                      //当前leads预约试听list
        leadsFollowReservationScrollFinish,                 //滚动加载是否完成(即数据加载完毕)

        LeadsFollowReservationScrollBottom,                 //leads预约试听已经滑动到最底部
        LeadsFollowReservationAddOrEditItem,                //leads预约试听新增编辑
        LeadsFollowReservationChangeItemStatus,             //leads预约试听改变状态
    }

    //详情提示框属性
    let AlertModalProps = {
        visible : leadsFollowDetailModalAlertVisible,                   //提示框是否显示
        title : leadsFollowDetailModalAlertTitle,                       //提示框标题
        content : leadsFollowDetailModalAlertContent,                   //提示框内容
        buttonLoading : leadsFollowDetailModalAlertButtonLoading,       //提示框按钮是否加载状态
        onOk : leadsFollowDetailModalAlertOnOk,                         //提示框点击确认
        onCancel : leadsFollowDetailModalAlertOnCancel,                 //提示框点击取消
    }

    //转给他人modal属性
    let LeadsFollowDetailSendOtherModalProps = {
        leadsFollowDetailSendOtherModalVisible,             //转给他人modal是否显示
        leadsFollowDetailSendOtherModalButtonLoading,       //转给他人modal按钮是否加载
        leadsFollowDetailSendOtherModalStaffMessage,        //转给他人modal选择销售下拉列表内容
        leadsFollowDetailSendOtherModalWetherShowAlert,     //当前员工leads数分配过后是否已超标，超标显示提示信息并且不可提交

        LeadsFollowDetailSendOtherModalSelectOnChange,      //销售员工下拉列表onChange事件
        LeadsFollowDetailSendOtherModalSubmit,              //转给他人modal提交
        LeadsFollowDetailSendOtherModalCancel,              //转给他人modal关闭
    }

    //详情中跟进记录编辑modal
    let LeadsFollowEditFollowRecordProps = {
        leadsFollowWay,                                     //跟进方式
        leadsFollowFastSearchFollowState,                   //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        leadsFollowDetailLeadMessage,                       //选中leads名单查看详情时当前人的信息
        leadsFollowFollowRecordEditVisible,                 //跟进记录编辑modal是否显示
        leadsFollowFollowRecordEditButtonLoading,           //跟进记录编辑modal按钮是否加载
        leadsFollowFollowRecordEditContent,                 //跟进记录编辑回填数据

        LeadsFollowFollowRecordEditCancel,                  //跟进记录编辑modal关闭
        LeadsFollowFollowRecordEditSubmit,                  //跟进记录编辑modal提交
    }

    //新增编辑到访记录modal属性
    let AddOrEditVisitingPlanModalProps = {
        leadsFollowDetailLeadMessage,                       //选中leads名单查看详情时当前人的信息
        leadsFollowVisitingPlanModalType,                   //新增编辑到访计划表单类型('add','edit')
        leadsFollowVisitingPlanModalVisible,                //新增编辑到访计划表单是否显示
        leadsFollowVisitingPlanModalButtonLoading,          //新增编辑到访计划表单按钮是否加载
        leadsFollowVisitingPlanModalContent,                //编辑到访计划时回填数据
        leadsFollowReservationCourseSelectRowKeys,          //早教类下选择排课信息数组
        leadsFollowReservationCourseSelectRows,             //早教类下选择排课信息数组

        LeadsFollowVisitingPlanModalCancel,                 //到访计划modal关闭
        LeadsFollowVisitingPlanModalSubmit,                 //到访计划modal提交
    }

    //新增编辑预约试听modal属性
    let AddOrEditReservationModalProps = {
        leadsFollowDetailLeadMessage,                       //选中leads名单查看详情时当前人的信息
        leadsFollowReservationModalType,                    //新增编辑预约试听表单类型('add','edit')
        leadsFollowReservationModalVisible,                 //新增编辑预约试听表单是否显示
        leadsFollowReservationModalButtonLoading,           //新增编辑预约试听表单按钮是否加载
        leadsFollowReservationModalCourseContent,           //新增早教类机构预约试听时获取的排课信息
        leadsFollowReservationSelfDetail,                   //新增预约试听当前操作人信息作为跟进人
        leadsFollowReservationCourseMessage,                //预约试听当前校区下的课程下拉列表内容
        leadsFollowReservationCourseSelectRowKeys,          //早教类下选择排课信息数组
        leadsFollowReservationCourseSelectRows,             //早教类下选择排课信息数组
		dayList,                                            //选择年月得到的有课日期列表
		courseList,                                         //预约试听课程下拉列表
		courseDataSource,                                   //排课信息

        CheckZJLReservationCourseDetail,                    //早教类预约试听查看课程信息
        ChooseZJLCourseArrange,                             //早教类预约试听下课程单选框onChange事件
        LeadsFollowReservationModalCancel,                  //预约试听modal关闭
        LeadsFollowReservationModalSubmit,                  //预约试听modal提交

		selectYearToDate,
		selectDate
    }

    //详情编辑modal属性
    let DetailEditModalProps = {
        leadsFollowUserOrgId,                   //当前操作用户所属的机构ID
        detailEditModalVisible,                 //leads左划框是否显示
        detailEditModalLoading,                 //leads编辑modal加载状态
        detailEditModalButtonLoading,           //leads编辑按钮加载状态
        detailEditModalBackMessage,             //leads编辑时当前leads的回填信息
        leadsFollowParentRelationship,          //leads编辑联系人关系下拉列表内容
        leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        leadsFollowFastSearchStuSource,         //快捷搜索栏一级来源下拉列表内容
        leadsFollowSecondChannel,               //二级来源
        leadsFollowConnectStatus,               //联系方式
        leadsFollowOrgScale,                    //机构规模
        detailEditModalRecommender,             //leads编辑推荐人信息下拉列表
        detailEditModalCollector,               //leads编辑收集人信息
        leadsFollowEditStuType,                 //leads编辑机构类型下拉列表内容

        EditLeadsCheckSameOnBlur,               //leads编辑学员姓名，联系人姓名，联系人手机号
        DetailEditModalSubmit,                  //leads编辑提交
        DetailEditModalCancel                   //leads编辑关闭
    }

    //转为学员modal属性
    let StuMergeModalProps = {
        leadsFollowStuMergeModalVisible,                    //转为学员modal是否显示
        leadsFollowStuMergeModalButtonLoading,              //转为学员modal按钮是否加载状态
        leadsFollowDetailLeadMessage,                       //选中leads名单查看详情时当前人的信息
        leadsFollowStuMergeModalParent,                     //转为学员modal接口请求联系人信息数组
        leadsFollowStuMergeStuTableModalLoading,            //点击转化学员加载状态
        stuClueCrmStuWetherFirstChangeMergeStu,             //是否是第一次点击转化学员(用于改变文案)

        StuMergeOpenCrmStuTable,                            //点击合并已有学员
        LeadsFollowStuMergeModalSubmit,                     //转化学员表单提交
        LeadsFollowStuMergeModalCancel,                     //转化学员表单关闭

        //crm学员列表
        leadsFollowCrmStuModalVisible,                      //crm学员modal是否显示
        leadsFollowCrmStuModalLoading,                      //crm学员modal加载状态
        leadsFollowCrmStuModalPageIndex,                    //crm学员modal页码
        leadsFollowCrmStuModalPageSize,                     //crm学员modal每页条数
        leadsFollowCrmStuModalContent,                      //crm学员列表内容
        leadsFollowCrmStuModalTotal,                        //crm学员列表总共个数
        leadsFollowCrmStuModalSelectedRowKeys,              //表格多选选中的数组
        leadsFollowCrmStuModalSelectedRow,                  //表格多选中的对象数组

        LeadsFollowCrmStuModalOnSubmitOrClose,              //内部CRM学员列表modal点击确认
        LeadsFollowCrmStuModalOnSearch,                     //内部CRM学员列表点击查询学员姓名
        LeadsFollowCrmStuModalPageOnChange,                 //内部CRM学员列表分页改变
        LeadsFollowCrmStuModalRowSelectChange,              //内部CRM学员列表复选框onChange事件
    }

    //table整体属性
    let LeadsFollowTableProps = {
        leadsFollowType,                        //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
        TableClickOpenDetail,                   //table点击姓名打开详情
        search : {
            onSearch : (data) => LeadsSearchBarOnSearch(data),
            onClear : (data) => LeadsSearchBarOnSearch(data),
            wetherChear : wetherChangeRouter,
            subordinate : leadsFollowType == 'my' ? true : false,   //是否需要按下属过滤   默认false
            subordinateChange : (data) => SubordinateChange(data),  //下属变更时事件
            fields : [
                { key : 'name' ,
                  type : 'input' ,
                  placeholder : '客户名称' },
                { key : 'firstChannel' ,
                  type : 'select' ,
                  placeholder : '客户来源' ,
                  opt_key : 'key',
                  opt_label : 'value',
                  options : leadsFollowFastSearchStuSource } ,
                { key : 'studentFollowState' ,
                  type : 'select' ,
                  placeholder : '跟进状态' ,
                  initialValue : leadsFollowFastSearchContent && leadsFollowFastSearchContent.studentFollowState ? leadsFollowFastSearchContent.studentFollowState : undefined,
                  opt_key : 'key',
                  opt_label : 'value',
                  options : leadsFollowFastSearchFollowState }
            ],
        },
        table : {
            newColumns : !!window.localStorage && !!window.localStorage[leadsCheckColumnKey] ? JSON.parse(window.localStorage[leadsCheckColumnKey]) : leadsFollowTableNewColumns,
            changeColumns : LeadsTableChangeColumns,
            loading : leadsFollowTableLoading,
            dataSource : leadsFollowTableDataSource,
            onChange : LeadsFollowTableOnChange,
            rowSelection : {
                selectedRowKeys : leadsFollowTableSelectedRowKeys,
                onChange : LeadsTableSelectedRowOnChange,        //复选框onChange事件
            },
        },
        pagination : {
            total : leadsFollowDataTotal,
            pageIndex : leadsFollowPageIndex,
            pageSize : leadsFollowPageSize,
            onChange : LeadsTablePageOnChange,
            onShowSizeChange : LeadsTablePageOnChange,
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : () => (`共${leadsFollowDataTotal}条`),
        },
        leftBars : {
            label : '已选',
            labelNum : leadsFollowTableSelectedRows.length,
            btns : leadsFollowType == 'all' || leadsFollowType == 'my' ?
                                                  [{label : '分配' , handle : () => LeadsFollowTableDispatch(leadsFollowType) , confirm : false},
                                                   {label : '放入回收站' , handle : () => LeadsFollowTableChangeStatus('recycle') , confirm : true},
                                                  {label : '放入公海池' , handle : () => LeadsFollowTableChangeStatus('gonghai') , confirm : true}] :
                   leadsFollowType == 'recycle' ? [{label : '还原' , handle : () => LeadsFollowTableChangeStatus('reduction') , confirm : true},
                                                   {label : '彻底删除' , handle : () => LeadsFollowTableChangeStatus('delete') , confirm : true}] :
                   leadsFollowType == 'public' ? [{label : '捞取' , handle : () => LeadsFollowTableDispatch(leadsFollowType) , confirm : false},
                                                   {label : '放入回收站' , handle : () => LeadsFollowTableChangeStatus('recycle') , confirm : true}] : null
        },
        rightBars : {
            isSuperSearch : true,
            superSearchVisible : leadsFollowRightSuperSearchVisible,
            superSearch : LeadsSuperSearchOnSearch,
            closeSearch : LeadsSuperSearchOnSearch
        }
    };

    return (
        <div style = {{ overflow : 'hidden', height : '100%' }}>
            <LeadsFollowTable {...LeadsFollowTableProps} />
            <LeadsFollowRightSuperSearch {...LeadsFollowRightSuperSearchProps}/>
            { leadsFollowLeadsDispatchModalVisible ? <LeadsFollowLeadsDispatchModal {...LeadsFollowLeadsDispatchModalProps}/> : null }
            <LeadsFollowDetailModal {...LeadsFollowDetailModalProps}/>
            { leadsFollowDetailSendOtherModalVisible ? <LeadsFollowDetailSendOtherModal {...LeadsFollowDetailSendOtherModalProps}/> : null }
            { leadsFollowFollowRecordEditVisible ? <LeadsFollowEditFollowRecord {...LeadsFollowEditFollowRecordProps}/> : null }
            { leadsFollowVisitingPlanModalVisible ? <AddOrEditVisitingPlanModal {...AddOrEditVisitingPlanModalProps}/> : null }
            { leadsFollowReservationModalVisible ? <AddOrEditReservationModal {...AddOrEditReservationModalProps}/> : null }
            { detailEditModalVisible ? <DetailEditModal {...DetailEditModalProps}/> : null }
            { leadsFollowStuMergeModalVisible ? <StuMergeModal {...StuMergeModalProps}/> : null }
            <AlertModal {...AlertModalProps}/>
        </div>
    );
}

function mapStateToProps({ leadsFollow }) {
    return { leadsFollow };
}

export default connect(mapStateToProps)(LeadsFollow);
