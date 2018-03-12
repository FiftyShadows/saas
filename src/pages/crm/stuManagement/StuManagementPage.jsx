import React from 'react';
import { connect } from 'dva';

import StuManagement                 from '../../../components/crm/stuManagement/StuManagement';
import StuMdoalCreat                 from '../../../components/crm/stuManagement/StuMdoalCreat';
import StuDetail                     from '../../../components/crm/stuManagement/StuDetail'

import StudentManageCheckStudentForm from '../../../components/scrm/student-manage/StudentManageCheckStudentForm';
import AddOrEditVisitingPlanModal    from '../../../components/crm/stuManagement-Detail/StumanageVisitplan/AddOrEditVisitingPlanModal'
import StudentWorksUpload            from '../../../pages/erp/student-works/StudentWorksUploadPage';    //上传作品框
import StudentWorksUpdate            from '../../../pages/erp/student-works/StudentWorksUpdatePage';
import ParentManageCreateForm        from '../../../components/crm/parent-manage/ParentManageCreateForm'

import StudentManageTranslateModal   from '../../../components/crm/stuManagement/StudentTransModal'
import Stusuperserach                from '../../../components/crm/stuManagement/StuManagementSupersearch'
import ListrecordsModalL             from '../../../components/crm/stuManagement/ListrecordsModalL'
import ToClassModalPage              from '../../../pages/erp/student-detail/ToClassModalPage';         //报班模态框
import { AlertModal }                from '../../../components/common/new-component/NewComponent';
import ClassInfoEndClassReason       from '../../../components/erp/student-detail/class-info/ClassInfoEndClassReason';
import Offlinecrate                  from '../../../components/crm/stuManagement-Detail/Offlinecrate';

import ContractOrderCreate           from '../../../pages/crm/contract-order/ContractOrderCreatePage';   //合同创建
import ContractOrderReceiptFormPage  from '../../../pages/crm/contract-order/ContractOrderReceiptFormPage';

function StuManagementPage({ dispatch, stuManagementModel }) {
    let {
		loading,
		dataSource,
		resultCount,
		total,
		pageIndex,
		pageSize,
		selectedRowKeys,
		selectedRows,

        condition,                   //是否加载全部数据
        uids,
        stuCheckColumnKey,              //保存到localstroage中的学员显示列表的字段名

        /*排序搜索*/
        SortSearchContent,             //排序搜索项

        /*快捷搜索*/
        FastSearchContent,           //快捷搜索栏搜索内容

        /*高级搜索*/
        CreateOfflinebookSuperSearchVisible,  //高级搜索是否显示
        SuperSearchContent,                   //高级搜索栏搜
        wetherClearSearchContent ,            //切换路由时判断要清空搜索栏数据

		/*已消耗课时参数*/
        spenthourTabLoading,
		spenthourTabList,
		spenthourTabResultCount,
		spenthourTabPageSize,
		spenthourTabPageIndex,
		/*已消耗课时参数*/

		/*已预约课时列表*/
        reservedsessionLoading,
		reservedsessionList,
		reservedsessionResultCount,
		reservedsessionPageIndex,
		reservedsessionPageSize,
		/*已预约课时列表*/

        cardTabList,                                    //会员卡列表

		/*合同列表*/
		contractOrderList,
		contractOrderLoading,
		contractOrderResultCount,
		contractOrderPageIndex,
		contractOrderPageSize,

		/*约课记录参数*/
		orderClassList,
		orderClassLoading,
		orderClassResultCount,
		orderClassPageIndex,
		orderClassPageSize,
		/*约课记录参数*/

        leadsFollowReservationContentLoading,           //当前预约试听loading状态
        leadsFollowReservationContent,                  //当前leads预约试听list
        leadsFollowReservationScrollFinish,             //滚动加载是否完成(即数据加载完毕)
        leadsFollowReservationNum ,                     //预约试听条数
        leadsFollowReservationPageIndex ,               //预约试听页码
        leadsFollowReservationPageSize ,                //预约试听每页条数

        nokindaarr,

        parenttabList,                                //学员联系人列表
        parenttabnum,
        VisitplanTabList,                             //到访计划列表
        parentListArr,                                //学员联系人Id，姓名


        //高级搜索栏
        CreateStumanageSuperSearchVisible,            //高级搜索是否显示

        studentTypeList,                              //学员类型
        edtionStuinfro,                               //所要编辑的学员信息
		isShowMore,                                   //是否显示更多
		stuModalCreateBtnLoading,                     //学员新增loading
        translateModalVisible,                        //转移学员modal显示

        sellerList,                                   //销售列表
        selectedRecordIds,                            //分配转移学员是选中学员Id
        selectedOrgId,                                //分配转移学员是选中校区Id

        leadsFollowWay,                               //跟进方式列表

        leadsFollowFollowRecordPageIndex ,
        leadsFollowFollowRecordPageSize,
        leadsFollowFollowRecordContentLoading,        //当前跟进记录loading状态
        leadsFollowFollowRecordContent,               //当前学员跟进记录list
        leadsFollowFollowRecordScrollFinish,          //滚动加载是否完成(即数据加载完毕)
        leadsFollowFollowRecordNum ,                  //跟进记录数

        leadsFollowVisitingPlanContentLoading,        //当前到访计划loading状态
        leadsFollowVisitingPlanContent,               //当前学员到访计划list
        leadsFollowVisitingPlanScrollFinish,          //滚动加载是否完成(即数据加载完毕)
        leadsFollowVisitingPlanPageIndex ,
        leadsFollowVisitingPlanPageSize ,
        leadsFollowVisitingPlanModalType ,
        leadsFollowVisitingPlanModalVisible ,
        leadsFollowVisitingPlanModalContent,

        ProductionList,  //作品列表
        ProductionNum,
        ProductionPageIndex,
        ProductionPageSize,



        leadsFollowVisitingPlanNum ,
        reservedsessionListNum,
        spenthourTabListNum,
        cardTabListNum,

        secondChannelList,           //二级来源
        orgScaleList,                //机构规模
        recommenderList,             //推荐人
        collecterIdList,             //收集人

		parentRelationList,          //联系人关系

        showlistrecordsModal, //名单转化记录是否显示
        listrecordsstuList,
        listrecordsstuPageIndex,
        listrecordsstuPageSize,
        listrecordsstuCount,
        listrecordsstustuId,

        //报班信息
        AttendclassTabList,
        classInfoLeft,
        classInfoTotal,
        AttendclassNum,
        AttendclassPageIndex,
        AttendclassPageSize,



        createStudentModalVisible,
        studentBirthday,

        createSellerList,            //新增框内负责人下拉列表

        studentInfo,                 //修改获得的学员信息


        checkStudentVisible,         //学员查重框
        checkStudentList,            //学员列表
        checkName,

        UploadModalVisible,
        sellerName,
        sellerId,



        isStuDetailVisible,
        closableVisible,
        studentDetailInfo,



        saleStatusList ,     //跟进状态列表
        sourceList,          //来源下拉框


        createOrgId,
        createOrgName,
        changeTableTab,
        TableNewColumns,     //table设置


        //弹出确认框
        stuDetailModalAlertVisible ,
        stuDetailModalAlertMessage ,
        stuDetailDetailModalAlertTitle ,
        stuDetailDetailModalAlertContent,

        routeChange,  //路由是否改变

        //停课
        classEndReasonModalVisible ,
        stuCourseId,

       //新增试听
        createOfflinebookModalVisible,
        isChecked,
        isPickOn,
        OfflinebookInfo,

        LessonList,//校区课程
        LeadsList,//当前账号及其当前账号下属的leads
        CourseList, //当前校区下某个课程的排课list
        OfflinebookcreateOrgId, //默认选择的校区Id
        OfflinebookcreateOrgName, //默认选择的校区名字
        selectLessonId,//新增表单里面选中的课程
        selecttime,//选中的日期
        selectCourseTime,
        yuyueshitingdangqianyonghuid,                  //当前用户id和name

        serchrouteChange,

		dayList,                   //有课日期列表
		courseList,                //课程下拉列表
		courseDataSource,          //当日有课列表

    } = stuManagementModel;


    //常用搜索
    function searchFunction(data) {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                serchrouteChange : false,
            }
        });
        if (condition == 'my'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    uids               : uids,
                    FastSearchContent  : data,
                    SuperSearchContent,
                    SortSearchContent
                }
            });
        }else if(condition == 'all'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent  : data,
                    SuperSearchContent,
                    SortSearchContent
                }
            });
        }
    }

    //排序onChange事件
    function TableOnChange(pagination,filters,sorter){
        if (condition == 'my'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    uids               : uids,
                    FastSearchContent,
                    SuperSearchContent,
                    SortSearchContent  : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }else if (condition == 'all'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent,
                    SuperSearchContent,
                    SortSearchContent  : { column : sorter.columnKey , sort : sorter.order }
                }
            });
        }
    }

    //转移学员 分配
    function deleteClassPackage(){
        let selectedRecordIds = [];
        let selectedOrgIds = [];
        selectedRows.map(function(item, index){
            selectedRecordIds.push( item.id );
            selectedOrgIds.push( item.orgId );
        });
        dispatch({
            type : 'stuManagementModel/translateStudent',
            payload : {
                selectedRecordIds,
                selectedOrgIds,
                translateModalVisible
            }
        })
    };
    // //确认转移学员
    function confirmTranslate( values ){
        dispatch({
            type : 'stuManagementModel/confirmTranslate',
            payload : {
                values
            }
        })
    };

    //取消转移学员
    function cancelTranslate(){
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                // selectedOrgId   : '',
                // sellerList      : [],
                // selectedRecordIds  : [],
                translateModalVisible : false,
            }
        })
    };

    function createStu() {
        let org;
        /*取到第一个校区(默认校区)ID*/
        if( window._init_data.firstOrg != undefined ){
            org = window._init_data.firstOrg;                //获取选择校区下的第一间校区
            dispatch({
                type : 'stuManagementModel/TenantSelectOnSelect',
                payload : {
                    value : org.key,
                }
            })
            dispatch({
                type:'stuManagementModel/updateState',
                payload:{
                    createOrgId               : org.key,
                    createOrgName             : org.label,
					isShowMore                : false,
					createStudentModalVisible : true
                }
            });
        }
    }

    function highsearch() {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                CreateStumanageSuperSearchVisible : true,
            }
        });
    }

    function CreateStumanageSuperSearchClick(data) {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                serchrouteChange : false,
            }
        });

        let finalFollowTime = data && data.finalFollowTime ? data.finalFollowTime : "";
        let nextFollowTime = data && data.nextFollowTime ? data.nextFollowTime : "";
        let modifyTime = data && data.modifyTime ? data.modifyTime : "";
        let newdata = {};

        finalFollowTime && finalFollowTime.map(function (item,index) {
            if (index == 0 ){
                newdata.startFinalFollowTime= item.format('YYYY-MM-DD HH:mm');
            }else if (index == 1){
                newdata.endFinalFollowTime=item.format('YYYY-MM-DD HH:mm');
            }
        });

        nextFollowTime && nextFollowTime.map(function (item,index) {
            if (index == 0 ){
                newdata.startNextFollowTime= item.format('YYYY-MM-DD HH:mm');
            }else if (index == 1){
                newdata.endNextFollowTime=item.format('YYYY-MM-DD HH:mm');
            }
        });
        modifyTime && modifyTime.map(function (item,index) {
            if (index == 0 ){
                newdata.startModifyTime= item.format('YYYY-MM-DD HH:mm');
            }else if (index == 1){
                newdata.endModifyTime=item.format('YYYY-MM-DD HH:mm');
            }
        });
        if( data && data.orgId ){
            newdata.orgId = data.orgId;
        }
        if( data && data.stuMobile ){
            newdata.stuMobile = data.stuMobile;
        }
		if( data && data.studentType ){
			newdata.studentType = data.studentType;
		}
        if( data && data.location ){
            newdata.province = !!data.location[0] ? data.location[0] : '';
            newdata.city = !!data.location[1] ? data.location[1] : '';
            newdata.county = !!data.location[2] ? data.location[2] : '';
        }
        if( condition == 'my' ){
            dispatch({
                type : 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : newdata,
                    uids               : uids,
                    SortSearchContent
                }
            })
        }else if ( condition == 'all' ) {
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : newdata,
                    SortSearchContent
                }
            })
        }
    }

    function onClearSuperSearchClick() {
        if (condition == 'my'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : {},
                    uids               : uids,
                    SortSearchContent
                }
            })
        }else if (condition == 'all')  {
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex          : 0,
                    pageSize           : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : {},
                    SortSearchContent
                }
            })
        }
    }

    //table点击高级搜索事件和高级搜索点击右上角的X
    function CreateStumanageSuperSearchOnSearch(){
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                CreateStumanageSuperSearchVisible : !CreateStumanageSuperSearchVisible
            }
        });
    }

    function Importstudents() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload: {
                UploadModalVisible : true,

            }
        });
    }

   //确认新增
    function confirmCreateForm(values) {
        dispatch({
            type : 'stuManagementModel/confirmCreateForm',
            payload : {
                values,
                createStudentModalVisible
            }
        })
    }

    function cancelCreateForm() {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                createStudentModalVisible : false,
                confirmCreateForm         : [],
                edtionStuinfro            : {},
                createOrgId               : '',
            }
        });
    }

    function onModalOK() {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                isStuDetailVisible: false,
            }
        });
    }

    function onCancelModal() {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                isStuDetailVisible: false,
            }
        });
    }

    //选择表格项
    function rowSelectChange(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                selectedRowKeys,
                selectedRows
            }
        })
    };

	//学员详情
    function updateClassPackage(id ,orgId) {
        //路由
        dispatch({
            type: 'stuManagementModel/updateState',
            payload: {
                routeChange : false,
            }
        });
		dispatch({
			type : 'stuManagementModel/getSingleStu',
			payload : {
				stuId : id,
				orgId : orgId,
			}
		});
    }

    //改变pageSize
    function pageSizeChange( pageIndex, pageSize ){
        dispatch({
            type : 'stuManagementModel/pagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };

    //改变pageIndex
    function pageIndexChange( pageIndex ){

        dispatch({
            type : 'stuManagementModel/pagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };


    //学员查重
    function checkStudentStatus( orgId,name ){
        dispatch({
            type : 'stuManagementModel/checkStudentStatus',
            payload : {
                name:name,
                orgId:orgId,
            }
        })
    };

    //选择校区查询学员负责人下拉列表
    function TenantSelectOnSelect( value ){
        dispatch({
            type : 'stuManagementModel/TenantSelectOnSelect',
            payload : {
                value
            }
        })
    };

    function  cancelCheckStudent() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                checkStudentVisible : !checkStudentVisible,
                checkStudentList    : [],
            }
        })
    }

    function confirmCheckStudent(name) {
		 dispatch({
			 type : 'stuManagementModel/checkStudentStatus',
			 payload : {
				 name:name.name,
				 orgId: !edtionStuinfro.orgId ?createOrgId : edtionStuinfro.orgId,

			 }
		 })
     }

     //根据id预约试听记录分页
    function OfflineTabpageSizeChange(pageIndex, pageSize) {
        dispatch({
            type : 'stuManagementModel/OfflineTabpagination',
            payload : {
                OfflineTabpageIndex :pageIndex,
                OfflineTabpageSize:pageSize,
            }
        })
    }

    //改变pageIndex
    function OfflineTabpageIndexChange( pageIndex ){

        dispatch({
            type : 'stuManagementModel/OfflineTabpagination',
            payload : {
                OfflineTabpageIndex :pageIndex,
                OfflineTabpageSize:OfflineTabpageSize,
            }
        })
    };

     function StuDetailModalTabChange(key) {
         switch( key ) {
             case 'StuDetailTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab :'StuDetailTab'
                     }
                 });
                 break;

             case 'ReservedsessionTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'ReservedsessionTab'
                     }
                 });
                 dispatch({
                     type:'stuManagementModel/ReservedsessionTabList',
                     payload:{
                         id:studentDetailInfo.id,
                         orgId:studentDetailInfo.orgId,
                     }
                 });
                 break;

             case 'SpenthourTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'SpenthourTab'
                     }
                 });
                 dispatch({
                     type:'stuManagementModel/SpenthourTabList',
                     payload:{
                         id    : studentDetailInfo.id,
                         orgId : studentDetailInfo.orgId,
                     }
                 });
                 break;

			case 'CardTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'CardTab'
                     }
                 });
                 dispatch({
                     type:'stuManagementModel/CardTabList',
                     payload:{
                     	studentDetailInfo,
                     }
                 });
                 break;

             case 'orderClassTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'orderClassTab'
                     }
                 });
                 dispatch({
                     type:'stuManagementModel/orderClassTabList',
                     payload:{
                         id    : studentDetailInfo.id,
                         orgId : studentDetailInfo.orgId
                     }
                 });
                 break;

			 case 'ContractTab' :
				 dispatch({
					 type : 'stuManagementModel/updateState',
					 payload : {
						 changeTableTab : 'ContractTab'
					 }
				 })
				 dispatch({
					 type : 'stuManagementModel/contractTabList',
					 payload : {
						 id : studentDetailInfo.id
					 }
				 });
				 break;

             case 'OfflineTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'OfflineTab'
                     }
                 });
                 //获取预约试听list
                 dispatch({
                     type:'stuManagementModel/OfflineTabList',
                     payload:{
                         pageIndex : 0,
                         pageSize : leadsFollowReservationPageSize,
                         // condition : condition,
                         source : 1,
                         orgId : studentDetailInfo.orgId,
                         stuId : studentDetailInfo.id,
                         Operation : 'openNew'
                     }
                 });
                 break;

             case 'ParentTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'ParentTab'
                     }
                 });
                 dispatch({
                     type : 'stuManagementModel/getNewParentInfo',
                     payload : {
                         id:studentDetailInfo.id,
                         orgId:studentDetailInfo.orgId,
                     }
                 })
                 break;

			//到访计划列表
             case 'VisitplanTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'VisitplanTab'
                     }
                 });
                 //获取到访计划list
                 dispatch({
                     type:'stuManagementModel/GetVisitingPlanList',
                     payload:{
                         pageIndex : 0,
                         pageSize : leadsFollowVisitingPlanPageSize,
                         //  condition : condition,
                         source : 1,
                         orgId : studentDetailInfo.orgId,
                         stuId : studentDetailInfo.id,
                         Operation : 'openNew'
                     }
                 });
                 break;

             //跟进记录 FollowRecordTab
             case 'FollowRecordTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'FollowRecordTab'
                     }
                 });
                 dispatch({
                     type:'stuManagementModel/parentList',
                     payload:{
                         id:studentDetailInfo.id,
                         orgId:studentDetailInfo.orgId,
                     }
                 });
                 //跟进记录
                 dispatch({
                     type:'stuManagementModel/GetFollowRecordList',
                     payload:{
                         pageIndex : 0,
                         pageSize : 10,
                         condition : condition,
                         source : 1,
                         orgId : studentDetailInfo.orgId,
                         stuId : studentDetailInfo.id
                     }
                 });
                 break;

             case 'ProductionTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'ProductionTab'
                     }
                 });
                 dispatch({
                     type : 'stuManagementModel/getStudentWorksList',
                     payload : {
                         stuId     : studentDetailInfo.id,
                         orgId     : studentDetailInfo.orgId,
                         pageSize  :10,
                         pageIndex : 0,
                     }
                 });
                 break;

             case 'AttendclassTab':
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : 'AttendclassTab'
                     }
                 });
                 dispatch({
                     type : 'stuManagementModel/getClassHourInfoDetail',
                     payload : {
                         stuId     : studentDetailInfo.id,
                         orgId     : studentDetailInfo.orgId,
                     }
                 });
                 //  获取报班信息
                 dispatch({
                     type: 'stuManagementModel/getAttendclassList',
                     payload: {
                         orgId: studentDetailInfo.orgId,
                         stuId: studentDetailInfo.id,
                         pageIndex: 0,
                         pageSize: 20,
                     }
                 });
                 break;

             default:
                 dispatch({
                     type:'stuManagementModel/updateState',
                     payload:{
                         changeTableTab : key
                     }
                 });
         }
     };

	/*编辑学员*/
    function edtionStu() {
         dispatch({
             type: 'stuManagementModel/TenantSelectOnSelect',
             payload: {
                 value : studentDetailInfo.orgId,
             }
         });

         dispatch({
             type: 'stuManagementModel/updateState',
             payload: {
                 createStudentModalVisible : true,
                 edtionStuinfro            : studentDetailInfo,
             }
         });
     };

    //详情内编辑右边转为学员，转给他人，退回公海，放入回收站事件
    function stuDetailMoreMenuChoose(type,studentDetailInfo){
        if(type == 'trans_stu'){
            //学员转给他人
            let selectedRecordIds = [];
            let selectedOrgIds = [];
            //selectedRows.map(function(item, index){
                selectedRecordIds.push( studentDetailInfo.id );
                selectedOrgIds.push( studentDetailInfo.orgId );
           // });
            dispatch({
                type : 'stuManagementModel/translateStudent',
                payload : {
                    selectedRecordIds,
                    selectedOrgIds,
                    translateModalVisible
                }
            })
        }else if( type == 'dele_stu' ){
            dispatch({
                type:'stuManagementModel/updateState',
                payload:{
                    stuDetailModalAlertVisible : true,
                    stuDetailModalAlertMessage : {  id : studentDetailInfo.id, },
                    stuDetailDetailModalAlertTitle : `删除 ( 姓名：${studentDetailInfo.name} )`,
                    stuDetailDetailModalAlertContent : '确定要将此付费客户删除吗'
                }
            });
        }else if (type == 'list_record'){
            //名单转化记录Mdoal
            dispatch({
                type : 'stuManagementModel/listrecordstumanage',
                payload : {
                    orgId : studentDetailInfo.orgId,
                    stuId : studentDetailInfo.id,
                    showlistrecordsModal
                }
            })
        }
    }

    function leadsFollowDetailModalAlertOnOk() {
        dispatch({
            type : 'stuManagementModel/deleteStudent',
            payload : {
                id : studentDetailInfo.id,
            }
        })
    }

    function leadsFollowDetailModalAlertOnCancel() {
        dispatch({
            type:'stuManagementModel/updateState',
            payload:{
                stuDetailModalAlertVisible : false,
            }
        });
    }

    //onOk : leadsFollowDetailModalAlertOnOk,                         //提示框点击确认
    //    onCancel : leadsFollowDetailModalAlertOnCancel,                 //提示框点击取消
    /*跟进记录*/
    //新增跟进记录
    function LeadsFollowFollowRecordAdd(data){
        dispatch({
            type:'stuManagementModel/LeadsFollowFollowRecordAdd',
            payload:{
                Operation:'add',
                ...data
            }
        });
    }

    //下属变更时事件 我的及我的下属
    function SubordinateChange(id){
        if(condition == 'my'){
            dispatch({
                type: 'stuManagementModel/GetStuList',
                payload: {
                    pageIndex: 0,
                    pageSize: pageSize,
                    uids:id,
                    FastSearchContent: FastSearchContent,
                    SuperSearchContent: SuperSearchContent,
                    SortSearchContent
                }
            })
            dispatch({
                type:'stuManagementModel/updateState',
                payload:{
                    uids : id,
                }
            });
        }
    }

    function TableChangeColumns(TableNewColumns) {
        window.localStorage.setItem(stuCheckColumnKey,JSON.stringify(TableNewColumns));
        dispatch({
            type:'stuManagementModel/updateState',
            payload:{
                TableNewColumns:TableNewColumns,
            }
        });
    }


    let componProps = {
        stuCheckColumnKey,              //保存到localstroage中的学员显示列表的字段名
        table: {
            loading,
            selectedRows, //选中某一行
            selectedRowKeys,
            rowSelectChange,
            updateClassPackage,
            dataSource,
            selectedRecordIds ,
            resultCount,
            pageIndex,
            pageSize,

            pageSizeChange,
            pageIndexChange,
            studentTypeList,//学员类型
            saleStatusList ,//跟进状态列表
            sourceList,//来源下拉框
            CreateStumanageSuperSearchVisible,
            TableOnChange
        },
        search: {
            searchFunction, //搜索
        },
        deleteClassPackage, //编辑删除
        createStu,
        highsearch,
        Importstudents,
        SubordinateChange,
        condition,
        TableNewColumns,    //table设置
        TableChangeColumns,

        serchrouteChange,
    };

	/*新增学员时显示更多学员信息*/
	function showMoreStuInfo(){
		dispatch({
			type : 'stuManagementModel/updateState',
			payload : {
				isShowMore : !isShowMore
			}
		})
	}

	//查重
	function checkStuNameAndPhone( e, type, orgId, id ){
		let msg = e.target.value;
        let obj = {};
        if( msg != '' && msg != undefined && msg != null && !/^[\s]*$/.test(msg) ){
            obj[type] = msg;
            obj.orgId = orgId;
            obj.type = type;
			obj.id = id || undefined;
            dispatch({
                type : 'stuManagementModel/checkStuNameAndPhone',
                payload : {
                    ...obj
                }
            });
        }
	}

	let StuMdoalCreatProps = {
         cancelCreateForm,
         createStudentModalVisible,
         studentBirthday,
         createOrgId,               //默认选择的校区Id
         createOrgName,             //默认选择的校区名字
         createSellerList,          //新增框内负责人下拉列表
         studentTypeList,           //学员类型下拉列表
         sourceList,                //来源下拉列表
         saleStatusList,            //跟进状态下拉列表
         studentInfo,               //修改获得的学员信息
         secondChannelList,         //二级来源
         orgScaleList,              //机构规模
         recommenderList,           //推荐人  联系人下拉列表
         collecterIdList,           //收集人
         sellerName,
         sellerId,


         checkStudentVisible,        //学员查重框
         checkStudentList,           //学员列表
         checkName,

         createOrgName,
         checkStudentStatus,
         TenantSelectOnSelect,
         confirmCreateForm,
         cancelCreateForm,

         edtionStuinfro,              //所要编辑的学员信息

		 isShowMore,
		 showMoreStuInfo,

		 parentRelationList,          //联系人关系

		stuModalCreateBtnLoading,

		checkStuNameAndPhone

    };
	 let translateModalProp= {
         translateModalVisible,
         confirmTranslate,
         cancelTranslate,
         selectedRows,
         studentDetailInfo,

         sellerList,
    }

    let checkStudentModalProps = {
        checkStudentVisible,
        checkStudentList,
        checkName,

        cancelCheckStudent,
        confirmCheckStudent,
    };


    //leads跟进记录已经滑动到最底部
    function LeadsFollowFollowRecordScrollBottom(){
        dispatch({
            type : 'stuManagementModel/GetFollowRecordList',
            payload : {
                pageIndex : leadsFollowFollowRecordPageIndex + 1,
                pageSize  : leadsFollowFollowRecordPageSize,
                condition : condition,
                source    : 1,
                orgId     : studentDetailInfo.orgId,
                stuId     : studentDetailInfo.id
            }
        });
    }

    //leads跟进记录删除
    function LeadsFollowFollowRecordDeleteItem(id){
        dispatch({
            type:'stuManagementModel/LeadsFollowFollowRecordDeleteItem',
            payload:{
                id
            }
        });
    }

	//到访记录滑动到底部
    function LeadsFollowVisitingPlanScrollBottom() {
        dispatch({
            type : 'stuManagementModel/GetVisitingPlanList',
            payload : {
                pageIndex : leadsFollowVisitingPlanPageIndex + 1,
                pageSize  : leadsFollowVisitingPlanPageSize,
                condition : condition,
                source    : 1,
                orgId     : studentDetailInfo.orgId,
                stuId     : studentDetailInfo.id
            }
        });

    }

    //leads到访计划新增编辑
    function LeadsFollowVisitingPlanAddOrEditItem(type,data){
        dispatch({
            type:'stuManagementModel/updateState',
            payload:{
                leadsFollowVisitingPlanModalType : type,
                leadsFollowVisitingPlanModalVisible : true,
               // leadsFollowVisitingPlanModalButtonLoading : false,
                leadsFollowVisitingPlanModalContent : data
            }
        });
    }

    //删除作品
    function deleteWork( id ){
        dispatch({
            type : 'stuManagementModel/deleteWork',
            payload : {
                id
            }
        })
    };

    //修改作品
    function updateStudentWork( id, url ){
        dispatch({
            type : 'stuManagementModel/updateStudentWork',
            payload : {
                id,
                url,
            }
        })
    };

    function  ProductionpageSizeChange(pageIndex, pageSize) {
        dispatch({
            type : 'stuManagementModel/Productionpagination',
            payload : {
                pageIndex :pageIndex,
                pageSize:pageSize,
            }
        })
    }


    function ProductionpageIndexChange(pageIndex) {
        dispatch({
            type : 'stuManagementModel/Productionpagination',
            payload : {
                pageIndex :pageIndex,
                pageSize:ProductionPageSize,
            }
        })
    }

    //上传作品
    function uploadWorks(){
        dispatch({
            type : 'stuManagementModel/uploadWorks',
            payload : {

            }
        })
    };

    //添加联系人
    function addParent() {
        dispatch({
            type : 'parentManageModel/updateState',
            payload : {
                createParentVisible : true
            }
        });
    }

    //leads预约试听新增编辑
    function LeadsFollowReservationAddOrEditItem() {
        dispatch({
            type : 'stuManagementModel/TenantSelectOnSelect',
            payload : {
                value : studentDetailInfo.orgId,
            }
        })
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                createOfflinebookModalVisible: true,
            }
        });
    }

    //leads预约试听改变状态
    function LeadsFollownewReservationChangeItemStatus(id) {

        let neworgId= studentDetailInfo.orgId;
        let orgKind = 2; //默认培训类

        window._init_data.orgIdList && window._init_data.orgIdList  != 'undefined' && window._init_data.orgIdList.map(function (item) {

            if (neworgId == item.orgId && item.orgKind == 1 ){
                orgKind = 1; //早教类

            }



        });
        dispatch({
            type : 'stuManagementModel/cancelled',
            payload: {
                ids:id,
                status:0,
                orgId:neworgId,
                orgKind:orgKind,

            }

        });
    }

    function  LeadsFollowReservationScrollBottom() {

    }

    //新建报班信息
    function toJoinClass() {
        dispatch({
            type : 'toClassModalModel/openToClassModal',
            payload : {
                stuId : studentDetailInfo.id,
                orgId :  studentDetailInfo.orgId,
            }
        })
    }

    //改变pageSize
    function AttendclasspageSizeChange( pageIndex, pageSize ){
        dispatch({
            type : 'stuManagementModel/Attendclasspagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };

    //改变pageIndex
    function AttendclasspageIndexChange( pageIndex ){

        dispatch({
            type : 'stuManagementModel/Attendclasspagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };


    //报课信息结束课程
    function endCourse( id ){
        dispatch({
            type : 'stuManagementModel/endCourse',
            payload : {
                id
            }
        })
    };

    //暂停课程
    function puaseCourse( id ){
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                classEndReasonModalVisible : !classEndReasonModalVisible,
                stuCourseId                : id,
            }
        })
    };

    //复原课程
    function backPauseCourse( id ){
        // dispatch({
        //     type : 'stuManagementModel/recoverCourse',
        //     payload : {
        //         id,
        //     }
        // })
    };

    //分班
    function waitForCourse( courseId, stuCourseId ){
        // dispatch({
        //     type : 'stuManagementModel/waitForCourse',
        //     payload : {
        //         courseId,
        //         stuCourseId
        //     }
        // })
    };


    function NOorgKindArr(arr) {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                nokindaarr : arr,
            }
        })
    }

	/*已预约课时tab分页*/
	function reservedsessionPageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'stuManagementModel/reservedsessionPagination',
			payload : {
				reservedsessionPageIndex : pageIndex,
				reservedsessionPageSize  : pageSize
			}
		})
	}

	function reservedsessionPageIndexChange( pageIndex ){
		dispatch({
			type : 'stuManagementModel/reservedsessionPagination',
			payload : {
				reservedsessionPageIndex : pageIndex,
				reservedsessionPageSize
			}
		})
	}

	/*已消耗课时列表分页*/
	function spenthourTabPageIndexChange( pageIndex ){
		dispatch({
			type : 'stuManagementModel/spenthourTabPagination',
			payload : {
				spenthourTabPageSize,
				spenthourTabPageIndex : pageIndex
			}
		})
	}

	/*约课记录分页*/
	function orderClassPageIndexChange( pageIndex, pageSize ){
		dispatch({
			type : 'stuManagementModel/orderClassPagination',
			payload : {
				pageIndex, pageSize
			}
		})
	}

	/*合同tab分页*/
	function contractOrderPageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'stuManagementModel/contractOrderPagination',
			payload : {
				contractOrderPageIndex : pageIndex,
				contractOrderPageSize  : pageSize
			}
		})
	}

	function contractOrderPageIndexChange( pageIndex ){
		dispatch({
			type : 'stuManagementModel/contractOrderPagination',
			payload : {
				contractOrderPageIndex : pageIndex,
				contractOrderPageSize
			}
		})
	}

	/*添加合同*/
	function addContractOrder(){
		dispatch({
			type : 'contractOrderCreateModel/openContractOrderModal',
			payload : {
			}
		})
	}
    let StuDetailprop = {
        studentTypeList,                       //学员类型下拉列表
        isStuDetailVisible,
        closableVisible,
        onModalOK,
        onCancelModal,

        studentDetailInfo,
        saleStatusList ,//跟进状态列表
        LeadsFollowFollowRecordAdd,

        changeTableTab,
        StuDetailModalTabChange,

		/*已预约课时参数*/
        reservedsessionLoading,
		reservedsessionList,
		reservedsessionResultCount,
		reservedsessionPageIndex,
		reservedsessionPageSize,
		reservedsessionPageSizeChange,
		reservedsessionPageIndexChange,
		/*已预约课时参数*/

		/*已消耗课时参数*/
        spenthourTabLoading,
		spenthourTabList,
		spenthourTabResultCount,
		spenthourTabPageSize,
		spenthourTabPageIndex,
		spenthourTabPageIndexChange,
		/*已消耗课时参数*/

		/*约课记录参数*/
		orderClassList,
		orderClassLoading,
		orderClassResultCount,
		orderClassPageIndex,
		orderClassPageSize,

		orderClassPageIndexChange,
		/*约课记录参数*/

        cardTabList,                                   //会员卡列表

		 /*合同所需参数*/
		contractOrderList,
		contractOrderLoading,
		contractOrderResultCount,
		contractOrderPageIndex,
		contractOrderPageSize,
		contractOrderPageSizeChange,
		contractOrderPageIndexChange,

		addContractOrder,
		/*合同所需参数*/

         stuDetailMoreMenuChoose,                       //点击编辑 转给他人
         edtionStu,                                     //编辑学员
         leadsFollowWay,                                //跟进方式列表
         parentListArr,                                 //学员联系人Id，姓名
         leadsFollowFollowRecordContentLoading,         //当前跟进记录loading状态
         leadsFollowFollowRecordContent,                //当前leads跟进记录list
         leadsFollowFollowRecordScrollFinish,           //滚动加载是否完成(即数据加载完毕)
         leadsFollowFollowRecordNum,

         LeadsFollowFollowRecordScrollBottom,           //leads跟进记录已经滑动到最底部
         LeadsFollowFollowRecordDeleteItem,             //leads跟进记录删除

         leadsFollowVisitingPlanContentLoading,         //当前到访计划loading状态
         leadsFollowVisitingPlanContent,                //当前leads到访计划list
         leadsFollowVisitingPlanScrollFinish,           //滚动加载是否完成(即数据加载完毕)

         LeadsFollowVisitingPlanScrollBottom,           //leads到访计划已经滑动到最底部
          LeadsFollowVisitingPlanAddOrEditItem,         //leads到访计划新增编辑
         LeadsFollowVisitingPlanChangeItemStatus,       //leads到访计划改变状态

         leadsFollowVisitingPlanNum ,
         reservedsessionListNum,
         spenthourTabListNum,
         cardTabListNum,

         //报班信息
         AttendclassTabList,
         classInfoLeft,
         classInfoTotal,
         AttendclassNum,
         AttendclassPageIndex,
         AttendclassPageSize,
         toJoinClass,            //报班
         AttendclasspageSizeChange,
         AttendclasspageIndexChange,
         endCourse,//结束
         puaseCourse,//停课
         waitForCourse,//分班
         backPauseCourse,//复原

         leadsFollowReservationContentLoading,      //当前预约试听loading状态
         leadsFollowReservationContent,             //当前leads预约试听list
         leadsFollowReservationScrollFinish,        //滚动加载是否完成(即数据加载完毕)
         leadsFollowReservationNum ,                          //预约试听条数
         leadsFollowReservationPageIndex ,                    //预约试听页码
         leadsFollowReservationPageSize ,                     //预约试听每页条数

         LeadsFollowReservationScrollBottom,        //leads预约试听已经滑动到最底部
         LeadsFollowReservationAddOrEditItem,       //leads预约试听新增编辑
         LeadsFollownewReservationChangeItemStatus,    //leads预约试听改变状态

         parenttabList,                                //学员联系人列表
         addParent,                                      //添加联系人
         parenttabnum,

         VisitplanTabList,                             //到访计划列表

         ProductionList,  //作品列表
         updateStudentWork, //修改作品
         deleteWork,   //删除作品
         ProductionNum,
         ProductionPageIndex,
         ProductionPageSize,
         ProductionpageSizeChange,
         ProductionpageIndexChange,
         uploadWorks,

         nokindaarr,
         NOorgKindArr,//非早教类
         routeChange,  //路由是否改变
    };
     let stuSuperProp = {
		 studentTypeList,                       //学员类型下拉列表
         CreateStumanageSuperSearchVisible,     //高级搜索是否显示
         wetherClearSearchContent,              //是否切换路由，用于清空快捷搜索与高级搜索栏内容
         CreateStumanageSuperSearchClick,       //高级搜索点击搜索或者重置
         CreateStumanageSuperSearchOnSearch,    //点击右上角的X
         onClearSuperSearchClick,               //清除搜索
     }

    //新增编辑到访计划modal提交
    function LeadsFollowVisitingPlanModalSubmit(data){
        dispatch({
            type:'stuManagementModel/LeadsFollowVisitingPlanModalSubmit',
            payload:{
                ...data
            }
        });
    }

    //leads到访计划改变状态
    function LeadsFollowVisitingPlanChangeItemStatus(ids,status){
        dispatch({
            type:'stuManagementModel/LeadsFollowVisitingPlanChangeItemStatus',
            payload:{
                ids,
                status
            }
        });
    }

    //到访计划modal关闭
    function LeadsFollowVisitingPlanModalCancel(){
        dispatch({
            type:'stuManagementModel/updateState',
            payload:{
                leadsFollowVisitingPlanModalVisible : false,
                leadsFollowVisitingPlanModalContent : {}
            }
        });
    }

    //刷新作品列表
    function refreshStudentWorksList() {
        dispatch({
            type: 'stuManagementModel/refreshStudentWorks',
            payload: {}
        })
    }
    let studentWorksUploadProps = {
        refreshList : refreshStudentWorksList
    };
    let studentWorksUpdateProps = {
        refreshList : refreshStudentWorksList
    }

    //新增编辑到访记录modal属性
    let AddOrEditVisitingPlanModalProps = {
        leadsFollowDetailLeadMessage : studentDetailInfo,     //选中leads名单查看详情时当前人的信息
        leadsFollowVisitingPlanModalType,                   //新增编辑到访计划表单类型('add','edit')
        leadsFollowVisitingPlanModalVisible,                //新增编辑到访计划表单是否显示
        leadsFollowVisitingPlanModalContent,                //编辑到访计划时回填数据

        LeadsFollowVisitingPlanModalCancel,                 //到访计划modal关闭
        LeadsFollowVisitingPlanModalSubmit,                 //到访计划modal提交
    }

    function Modalpageion(par) {

        dispatch({
            type : 'scrmStudentManageModel/pageindexStatusrecord',
            payload : {
                pageIndex:par.pageIndex,
                pageSize:par.pageSize,
                stuId:studentDetailInfo.id,
                orgIds:studentDetailInfo.orgId,
            }
        })
    }

    function confirmsaleStatusrecordModal() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                showlistrecordsModal:true,
            }
        })
    }
    function cancelsaleStatusrecordModal() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                showlistrecordsModal:false,
            }
        })
    }

    let ListrecordsModalLProp = {
        showlistrecordsModal ,//名单转化记录是否显示
        listrecordsstuList,
        listrecordsstuPageIndex,
        listrecordsstuPageSize,
        listrecordsstuCount,
        listrecordsstustuId,
        confirmsaleStatusrecordModal,
        cancelsaleStatusrecordModal,
        Modalpageion,
    }

     let AlertModalProps = {
         //弹出确认框
         visible : stuDetailModalAlertVisible ,
         content :stuDetailDetailModalAlertContent,        //内容
         title : stuDetailDetailModalAlertTitle,          //标题
         buttonLoading : false,       //提示框按钮是否加载状态
         onOk : leadsFollowDetailModalAlertOnOk,                         //提示框点击确认
         onCancel : leadsFollowDetailModalAlertOnCancel,                 //提示框点击取消
     }


     function confirmSuspendCourse(parpam) {
         dispatch({
             type : 'stuManagementModel/confirmEndCourse',
             payload : {
                 parpam :parpam,
                 classEndReasonModalVisible,
             }
         })
     }

     function cancelSuspendCourse() {
         dispatch({
             type : 'stuManagementModel/updateState',
             payload : {
                 classEndReasonModalVisible : false,
                 stuCourseId                : '',
             }
         })
     }

    //停课
    let ClassInfoEndClassReasonProps = {
        classEndReasonModalVisible,
        confirmSuspendCourse,
        cancelSuspendCourse,
    };

    //新增预约试听
    function offlineconfirmCreateForm(values) {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                selectLessonId   : "",
                selecttime       : "",
                selectCourseTime : "",
            }
        })

        if (values.classinfro == 2){
            dispatch({
                type : 'stuManagementModel/createOfflinebook',
                payload : {
                    orgId           : values.orgId,
                    sellerId        : values.sellerId,
                    stuId           : values.sellerIdLeads,
                    auditionTime    : values.time,
                    auditionEndTime : values.endtime,
                    remark          : values.remark,
                    source          : 1,
                }
            })
        }else {
            dispatch({
                type : 'stuManagementModel/createOfflinebook',
                payload : {
                    orgId:values.orgId,
                    sellerId:values.sellerId,
                    stuId:values.sellerIdLeads,
                    courseId:values.courseName,
                    // auditionTime:values.time.format("YYYY-MM-DD"),
                    auditionTime:values.time,
                    auditionEndTime:values.endtime,
                    remark:values.remark,
                    source:1,
                    courseName:values.selectCourseTime.courseName,
                    cpdId:values.selectCourseTime.cpdId,
                    cpmId:values.selectCourseTime.cpmId,
                }
            })
        }
    }

    function offlinecancelCreateForm() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                createOfflinebookModalVisible : false,
                selectLessonId  : "",
                selecttime      : "",
                selectCourseTime: "",
                CourseList      : [],

				courseList      : [],
				dayList         : [],
				courseDataSource : []
            }
        });
    }

    function OnselectLessonIdAction(value) {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                selectLessonId:value,
            }
        })
    }
    function OnselecttimeAction(date) {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                selecttime:date,
            }
        })
    }
    function OnCourseListAction( value, time, orgId ) {
        dispatch({
             type : 'stuManagementModel/CouseList',
             payload : {
                 lessonId  : value,
                 orgId     : orgId,
                 endDate   : time,
                 startDate : time
             }
         })
    }
    function OnCourseListreset() {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                CourseList:[],
                selectCourseTime:[],
            }
        })
    }

    function selectCouseandtimeAction(data) {
        dispatch({
            type : 'stuManagementModel/updateState',
            payload : {
                selectCourseTime:data,
            }
        })
    }

	//选择年月得到有课的日期
	function selectYearToDate( month, orgId ){
		dispatch({
			type : 'stuManagementModel/selectYearToDate',
			payload : {
				month, orgId
			}
		})
		dispatch({
			type : 'stuManagementModel/updateState',
			payload : {
				courseDataSource : [],
			 	selectCourseTime : [],
			}
		})
	}

	//选择日期得到课程列表以及课程信息
	function selectDate( value, orgId ){
		dispatch({
			type : 'stuManagementModel/selectDate',
			payload : {
				value, orgId
			}
		})
	}

    let OfflinecrateProps = {
        createOfflinebookModalVisible,
        isChecked,
        isPickOn,
        OfflinebookInfo,
        studentDetailInfo,
        collecterIdList,

        LessonList,                  //校区课程
        LeadsList,                   //当前账号及其当前账号下属的leads
        CourseList,                  //当前校区下某个课程的排课list
        OfflinebookcreateOrgId,      //默认选择的校区Id
        OfflinebookcreateOrgName,    //默认选择的校区名字
        selectLessonId,              //新增表单里面选中的课程
        selecttime,                  //选中的日期
        selectCourseTime,

        OnselectLessonIdAction,
        OnselecttimeAction,
        OnCourseListAction,
        OnCourseListreset,
        selectCouseandtimeAction,

        nokindaarr,
        offlineconfirmCreateForm,
        offlinecancelCreateForm,
        NOorgKindArr,

        TenantSelectOnSelect,

        //选择器下拉列表
        createSellerList,             //跟进人Leads
        sellerName,                   //本账号 跟进人
        sellerId,                     //本账号 跟进人id

        yuyueshitingdangqianyonghuid,                  //当前用户id和name

		dayList,                   //有课日期列表
		courseList,                //课程下拉列表
		courseDataSource,          //当日有课列表
		selectYearToDate,          //选择年月得到有课的日期
		selectDate,                //选择日期


    }

	function refreshContractOrderList(){
		dispatch({
			 type : 'stuManagementModel/contractTabList',
			 payload : {
				 id : studentDetailInfo.id
			 }
		 });
	}

	let contractOrderCreateProps = {
		refreshList : refreshContractOrderList
	}

    return (
        <div style = {{ overflowX : 'hidden', height : '100%' }}>
            <StuManagement { ...componProps } />
            <StuMdoalCreat { ...StuMdoalCreatProps } />
            <StudentManageTranslateModal { ...translateModalProp } />
            { leadsFollowVisitingPlanModalVisible ? <AddOrEditVisitingPlanModal {...AddOrEditVisitingPlanModalProps}/> : null }
            <StudentWorksUpload { ...studentWorksUploadProps } />
            <StudentWorksUpdate { ...studentWorksUpdateProps } />
            <StuDetail   { ...StuDetailprop }/>
            <Stusuperserach  { ...stuSuperProp }  />
            <StudentManageCheckStudentForm { ...checkStudentModalProps } />
            <ListrecordsModalL { ...ListrecordsModalLProp }/>
            <ToClassModalPage />
            <AlertModal { ...AlertModalProps }/>

            <ClassInfoEndClassReason { ...ClassInfoEndClassReasonProps } />
            <Offlinecrate  { ...OfflinecrateProps }/>

			<ContractOrderCreate { ...contractOrderCreateProps } />
			<ContractOrderReceiptFormPage />
        </div>
    );
}

function mapStateToProps({ stuManagementModel }) {
  	return { stuManagementModel};
}

export default connect(mapStateToProps)(StuManagementPage);
