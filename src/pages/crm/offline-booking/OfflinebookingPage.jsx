import React from 'react';
import  { message } from 'antd';
import { connect } from 'dva';
import moment from 'moment';

import OfflinebookingComponent from '../../../components/crm/offline-booking/OfflinebookingComponent';
import CreateOfflinebooking from '../../../components/crm/offline-booking/CreateOfflinebooking';
import CreateOfflinebookSuperSearch from '../../../components/crm/offline-booking/CreateOfflinebookSuperSearch';

function OfflinebookingPage({dispatch, crmOfflineBookingModel}) {

	let {
        isChecked,
        isPickOn,
        loading,
        dataSource,
        resultCount,
        pageIndex,
        pageSize,
        selectedRowKeys,
        selectedRows,
        selectedRecordIds,
        uids,
        condition,
        source,
        wetherChear,      //是否清空搜索


        wetherClearSearchContent ,               //切换路由时判断要清空搜索栏数据

        createOfflinebookModalVisible,
        createOrgId, //默认选择的校区Id
        createOrgName, //默认选择的校区名字
        OfflinebookInfo,
        createSellerList,//跟进人Leads
        LessonList,//校区课程
        LeadsList,//当前账号及其当前账号下属的leads
        CourseList, //当前校区下某个课程的排课list
        sellerName, //本账号 跟进人
        sellerId, //本账号 跟进人id


        FastSearchContent,           //快捷搜索栏搜索内容

        /*高级搜索*/
        CreateOfflinebookSuperSearchVisible,  //高级搜索是否显示
        SuperSearchContent,     //高级搜索栏搜

        selectLessonId,//新增表单里面选中的课程
        selecttime,//选中的日期
        selectCourseTime,

        TableNewColumns,//table设置
        OfflineType,

        routeChange,//路由改变
        nokindaarr,

		createOfflineBookingBtnLoading,

		dayList,               //有课日期列表
		courseList,            //课程下拉列表
	  	courseDataSource,      //当日有课列表

    } = crmOfflineBookingModel;


	 function  highsearch() {

         dispatch({
             type:'crmOfflineBookingModel/updateState',
             payload:{
                 CreateOfflinebookSuperSearchVisible : !CreateOfflinebookSuperSearchVisible
             }
         });

     }
     function createOfflinebook() {
         let org;
         /*取到第一个校区(默认校区)ID*/
         if(window._init_data.firstOrg != undefined){
             org = window._init_data.firstOrg;                //获取选择校区下的第一间校区

             dispatch({
                 type : 'crmOfflineBookingModel/TenantSelectOnSelect',
                 payload : {
                     value:org.key,
                 }
             })
             dispatch({
                 type:'crmOfflineBookingModel/updateState',
                 payload:{
                     createOrgId : org.key,
                     createOrgName : org.label,
                 }
             });
         }

         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 createOfflinebookModalVisible:true,
             }
         })
     }

     //取消
     function deleteClassPackage() {
         var ids = [];
         var orgId = [];
         let flag = true;
         let arr = []
         for(let i in selectedRows){
             arr.push({
                orgId : i,
                id : i
             })
         }

         for(let i in selectedRows){
            if(parseInt(i) > 0 && selectedRows[i].orgId != selectedRows[i-1].orgId){
                flag = false;
                break;
            }
         }

         for(let i in selectedRows){
            ids.push(selectedRows[i].id);
         }

         if(flag){
             let neworgId= selectedRows[0].orgId;
             let orgKind = 2; //默认培训类
             window._init_data.orgIdList && window._init_data.orgIdList  != 'undefined' && window._init_data.orgIdList.map(function (item) {
                 if (neworgId == item.orgId && item.orgKind == 1 ){
                     orgKind = 1; //早教类
                 }
             });
            dispatch({
                 type : 'crmOfflineBookingModel/cancelled',
                 payload: {
                     ids:ids.join(','),
                     status:0,
                     orgId:neworgId,
                     orgKind:orgKind,
                 }

             });
         } else  {
             message.warn('选择的预约学员必须在同一校区');
         }
     }

     function updateClassPackage() {

     }
     function checkSelectAll() {

     }

    //选择表格项
    function rowSelectChange(selectedRowKeys, selectedRows) {
        dispatch({
            type: 'crmOfflineBookingModel/updateState',
            payload: {
                selectedRowKeys,
                selectedRows
            }
        })
    }

     function  pageIndexChange(pageIndex) {
         dispatch({
             type : 'crmOfflineBookingModel/pagination',
             payload : {
                 pageIndex,
                 pageSize,
             }
         })
     }

     function pageSizeChange(pageIndex, pageSize) {
         dispatch({
             type : 'crmOfflineBookingModel/pagination',
             payload : {
                 pageIndex,
                 pageSize,
             }
         })
     }

    function searchFunction(data) {
         if (condition == 'all') {
             dispatch({
                 type: 'crmOfflineBookingModel/GetTableList',
                 payload: {
                     pageIndex: pageIndex,
                     pageSize: pageSize,
                     FastSearchContent: data,
                     SuperSearchContent: SuperSearchContent
                 }
             })
         }else if(condition == 'my'){

             dispatch({
                 type: 'crmOfflineBookingModel/GetTableList',
                 payload: {
                     pageIndex: pageIndex,
                     pageSize: pageSize,
                     FastSearchContent: data,
                     SuperSearchContent: SuperSearchContent,
                     uids:uids,
                 }
             })
         }
    }
    function clearFunction() {
        if (condition == 'my'){
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    FastSearchContent: {},
                    SuperSearchContent: SuperSearchContent,
                    source: source,
                    uids:uids,
                }
            });
        }else  {
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    FastSearchContent: {},
                    SuperSearchContent: SuperSearchContent,
                    source: source,

                }
            });
        }

    }
    function handleleadsrecord() {
        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                routeChange:false,
            }
        });

        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                wetherChear:true,
            }
        });

        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                source : '2',
                isChecked : true,
                isPickOn : false,
                pageIndex : 0,
                pageSize : 20,
            }
        });

        if (condition == 'my'){
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: 0,
                    pageSize: 20,
                    FastSearchContent: {},
                    SuperSearchContent: {},
                    uids:uids,
                }
            })
        }else  {
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: 0,
                    pageSize: 20,
                    FastSearchContent: {},
                    SuperSearchContent: {},
                }
            })
        }

    }
    function handlesturecord() {
        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                routeChange:false,
            }
        });
        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                wetherChear:true,
            }
        });
        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                source: '1',
                isChecked: false,
                isPickOn:true,
                pageIndex: 0,
                pageSize: 20,
            }
        });

        if (condition == 'my'){
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: 0,
                    pageSize: 20,
                    FastSearchContent: {},
                    SuperSearchContent: {},
                    uids:uids,
                }
            })
        }else  {
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex: 0,
                    pageSize: 20,
                    FastSearchContent: {},
                    SuperSearchContent: {},
                }
            })
        }
    }

    function TableChangeColumns(TableNewColumns) {
        dispatch({
            type:'crmOfflineBookingModel/updateState',
            payload:{
                TableNewColumns:TableNewColumns,
            }
        });
    }

    //下属变更时事件
    function SubordinateChange(id){

        if( condition == 'my'){
            dispatch({
                type:'crmOfflineBookingModel/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : pageSize,
                    uids : id,
                    FastSearchContent : FastSearchContent,
                    SuperSearchContent : SuperSearchContent,
                }
            });

            dispatch({
                type:'crmOfflineBookingModel/updateState',
                payload:{

                    uids : id,

                }
            });
        }
    }

    let componProps = {
        table: {
            wetherChear,      //是否清空搜索
            isChecked,
            isPickOn,

            loading,
            dataSource,
            resultCount,

            selectedRowKeys,
            selectedRows,
            selectedRecordIds,

            rowSelectChange,
            checkSelectAll,
            pageSizeChange,
            pageIndexChange,
            updateClassPackage,
            pageIndex,
            pageSize,
            TableNewColumns,//table设置
            TableChangeColumns,

        },
        search: {
            searchFunction,
            clearFunction,
        },
        deleteClassPackage,
        createOfflinebook,
        highsearch,
        handleleadsrecord, //名单试听选中
        handlesturecord,  //学员名单选中

        CreateOfflinebookSuperSearchVisible,         //高级搜索是否显示

        CreateOfflinebookSuperSearchClick,           //高级搜索点击搜索或者重置
        CreateOfflinebookSuperSearchOnSearch,

        onClearSuperSearchClick,

        OfflineType,
        SubordinateChange,

        condition,
        routeChange,//路由改变
    };

	 function confirmCreateForm(values) {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 selectLessonId   : "",
                 selecttime       : "",
                 selectCourseTime : "",
             }
         })
         if ( values.classinfro == 2){
             dispatch({
                 type : 'crmOfflineBookingModel/createOfflinebook',
                 payload : {
                     orgId           : values.orgId,
                     sellerId        : values.sellerId,
                     stuId           : values.sellerIdLeads,
                     auditionTime    : values.time,
                     auditionEndTime : values.endtime,
                     remark          : values.remark,
                     source          : source,
                 }
             })
         }else {
             dispatch({
                 type : 'crmOfflineBookingModel/createOfflinebook',
                 payload : {
                     orgId           : values.orgId,
                     sellerId        : values.sellerId,
                     stuId           : values.sellerIdLeads,
                     courseId        : values.courseName,
                     auditionTime    : values.time,
                     auditionEndTime : values.endtime,
                     remark          : values.remark,
                     source          : source,
                     courseName      : values.selectCourseTime.courseName,
                     cpdId           : values.selectCourseTime.cpdId,
                     cpmId           : values.selectCourseTime.cpmId,
                 }
             })
         }

     }

     function cancelCreateForm() {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 createOfflinebookModalVisible : false,
                 selectLessonId                : "",
                 selecttime                    : "",
                 selectCourseTime              : "",
                 courseDataSource              : [],
				 dayList                       : [],
				 courseList                    : []
             }
         })
     }

	 function TenantSelectOnSelect(value) {
         dispatch({
             type : 'crmOfflineBookingModel/TenantSelectOnSelect',
             payload : {
                 value
             }
         })
     }

     function OnselectLessonIdAction(value) {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 selectLessonId:value,
             }
         })
     }
     function OnselecttimeAction(date) {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 selecttime:date,
             }
         })
     }

     function OnCourseListAction( value, time, orgId ) {
         dispatch({
             type : 'crmOfflineBookingModel/CouseList',
             payload : {
                 lessonId  : value,
                 orgId     : orgId,
                 endDate   : time,
                 startDate : time
             }
         })
     }

     function selectCouseandtimeAction(data) {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 selectCourseTime:data,
             }
         })
     }

     function OnCourseListreset() {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 courseDataSource : [],
                 selectCourseTime : [],
             }
         })
     }


     function NOorgKindArr(arr) {
         dispatch({
             type : 'crmOfflineBookingModel/updateState',
             payload : {
                 nokindaarr : arr,
             }
         })
     }

	//选择年月得到有课的日期
	function selectYearToDate( month, orgId ){
		dispatch({
			type : 'crmOfflineBookingModel/selectYearToDate',
			payload : {
				month, orgId
			}
		})
		dispatch({
			type : 'crmOfflineBookingModel/updateState',
			payload : {
				courseDataSource : [],
			 	selectCourseTime : [],
			}
		})
	}

	//选择日期得到课程列表以及课程信息
	function selectDate( value, orgId ){
		dispatch({
			type : 'crmOfflineBookingModel/selectDate',
			payload : {
				value, orgId
			}
		})
	}

	 let createOfflieProps ={
         createOfflinebookModalVisible,
         isChecked,
         isPickOn,

         OnCourseListreset,

         createOrgId,          //默认选择的校区Id
         createOrgName,        //默认选择的校区名字
         OfflinebookInfo,
         confirmCreateForm,
         cancelCreateForm,
         TenantSelectOnSelect,

         //选择器下拉列表
         createSellerList,    //跟进人Leads
         LessonList,          //校区课程
         LeadsList,           //当前账号及其当前账号下属的leads
         CourseList,          //当前校区下某个课程的排课list
         sellerName,          //本账号 跟进人
         sellerId,            //本账号 跟进人id

         selectLessonId,      //新增表单里面选中的课程
         selecttime,          //选中的日期
         OnselectLessonIdAction,
         OnselecttimeAction,
         OnCourseListAction,
         selectCourseTime,
         selectCouseandtimeAction,

         NOorgKindArr,
         nokindaarr,

		 createOfflineBookingBtnLoading,

		 dayList,                   //有课日期列表
		 courseList,                //课程下拉列表
	  	 courseDataSource,          //当日有课列表
		 selectYearToDate,          //选择年月得到有课的日期
		 selectDate,                //选择日期

     }

    //table点击高级搜索事件和高级搜索点击右上角的X
    function CreateOfflinebookSuperSearchOnSearch(){
        dispatch({
            type : 'crmOfflineBookingModel/updateState',
            payload : {
				CreateOfflinebookSuperSearchVisible : !CreateOfflinebookSuperSearchVisible
            }
        });
    }

 	function onClearSuperSearchClick() {
        if ( condition == 'my' ){
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex : pageIndex,
                    pageSize  : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : {},
                    uids               : uids
                }
            })
        }else if( condition == 'all' ){
            dispatch({
                type : 'crmOfflineBookingModel/GetTableList',
                payload : {
                    pageIndex : pageIndex,
                    pageSize : pageSize,
                    FastSearchContent : FastSearchContent,
                    SuperSearchContent : {}
                }
            })
        }
 }
    //高级搜索点击搜索
    function  CreateOfflinebookSuperSearchClick(data){
     var newdata ={ } ;
     if (data && data.auditionTime  ) {
         newdata.startAuditionTime = data.auditionTime[0].format("YYYY-MM-DD");
         newdata.endAuditionTime = data.auditionTime[1].format("YYYY-MM-DD");
     }else  {
     }
     if ( data.sellerName == '' ||  data.sellerName == undefined || data.sellerName == null  ){
     }else if (  /^[\s]*$/.test(data.sellerName) ){
     }else {
         newdata.sellerName =  data.sellerName;
     }
        if (condition == 'all') {
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    // pageIndex: 0,
                    pageIndex: pageIndex,
                    pageSize: pageSize,
                    FastSearchContent: FastSearchContent,
                    SuperSearchContent: newdata
                }
            })
        }else if(condition == 'my'){
            dispatch({
                type: 'crmOfflineBookingModel/GetTableList',
                payload: {
                    pageIndex          : pageIndex,
                    pageSize           : pageSize,
                    FastSearchContent  : FastSearchContent,
                    SuperSearchContent : newdata,
                    uids               : uids,
                }
            })
        }
    }

    /*高级搜索属性*/
    let createOfflinebookSuperSearchProps = {
            CreateOfflinebookSuperSearchVisible,         //高级搜索是否显示
            wetherClearSearchContent ,                         //是否切换路由，用于清空快捷搜索与高级搜索栏内容
            CreateOfflinebookSuperSearchClick,           //高级搜索点击搜索或者重置
            CreateOfflinebookSuperSearchOnSearch,
            wetherChear,
            onClearSuperSearchClick,
    };

    return (
        <div style = {{ overflowX : 'hidden' }}>
            <OfflinebookingComponent {...componProps} />
            <CreateOfflinebookSuperSearch  {...createOfflinebookSuperSearchProps} />
            <CreateOfflinebooking  {...createOfflieProps}/>
        </div>
    );
}

function mapStateToProps({ crmOfflineBookingModel }) {
  	return { crmOfflineBookingModel };
}

export default connect(mapStateToProps)(OfflinebookingPage);
