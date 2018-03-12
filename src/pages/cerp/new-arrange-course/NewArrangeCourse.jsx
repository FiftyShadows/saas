import React from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { FormatDate } from '../../../utils/dateFormat';
import OperationBar from '../../../components/cerp/new-arrange-course/new-arrange-course-table/OperationBar/OperationBar';
import Table from '../../../components/cerp/new-arrange-course/new-arrange-course-table/Table/Table';
import CourseEditModal from '../../../components/cerp/new-arrange-course/new-arrange-course-table/CourseEditModal/CourseEditModal';
import { AlertModal } from '../../../components/common/new-component/NewComponent';

/*排课列表*/
function NewArrangeCourse({ dispatch , newArrangeCourse }) {

    let {
        nowDate,                            //当前日期(只做保存，不做修改)
        startDate,                          //操作改变开始时间
        endDate,                            //操作改变结束时间
        currentOrgId,                       //当前机构id

        //operationBar
        radioGroupValue,                    //radiogroup的值

        //table
        tableLoading,                       //整个页面是否加载状态
        tableNewColumns,                    //列表控制显示行数组
        tableDataSource,                    //从接口获取的列表数据
        tableDataTotal,                     //列表数据条数
        tablePageIndex,                     //列表页码
        tablePageSize,                      //列表每页条数
        tableSelectedRowKeys,               //复选框选中对象的key数组
        tableSelectedRows,                  //复选框选中对象的数组

        //alert modal
        alertModalVisible,                  //提示框是否显示
        alertModalTitle,                    //提示框标题
        alertModalContent,                  //提示框内容
        alertModalButtonLoading,            //提示框按钮是否加载状态
        alertModalSubmitContent,            //提示框点击确定需要请求后台的数据

        //编辑modal
        courseEditModalVisible,                 //主排课编辑modal是否显示
        courseEditModalButtonLoading,           //主排课编辑modal按钮是否加载
        courseEditModalTableLoading,            //主排课编辑modal中的子排课列表加载状态
        courseEditModalSelectedRowKeys,         //子排课查询选中项的key数组
        courseEditModalSelectedRows,            //子排课查询选中项的对象数组

        courseEditModalGetContent,              //主排课点击编辑获取到的详情

        courseEditModalTeacherSelectContent,       //主教和助教下拉列表数据
        courseEditModalClassRoomSelectContent,     //教室下拉列表数据
        courseEditModalRangeCourseDetail,          //选择时间范围后出来的子排课数据

        wetherClearCourseEditModal,             //是否编辑成功(用来清空表单)

    } = newArrangeCourse

    //radioGroup的onChange事件
    function RadioGroupOnChange(e){
        let value = e.target.value;
        if(value == 'day'){
            dispatch({
                type:'newArrangeCourse/GetCourseList',
                payload:{
                    orgId : currentOrgId,
                    startDate : nowDate,
                    endDate : nowDate,
                    pageIndex : 0,
                    pageSize : tablePageSize,
                    radioGroupValue : value
                }
            });
        }else if(value == 'week'){
            let week = new Date(nowDate).getDay();          //获取当前星期几(0-6/周日-周六)
            let start;
            let end;
            if(week == 0){      //如果当前日期是周日
                start = new Date(nowDate).getTime() - 6*24*60*60*1000;
                start = FormatDate(start).substr(0,10);
                end = nowDate;
            }else{
                start = new Date(nowDate).getTime() - (week-1)*24*60*60*1000;
                start = FormatDate(start).substr(0,10);
                end = new Date(nowDate).getTime() - (week-1-6)*24*60*60*1000;
                end = FormatDate(end).substr(0,10);
            }
            dispatch({
                type:'newArrangeCourse/GetCourseList',
                payload:{
                    orgId : currentOrgId,
                    startDate : start,
                    endDate : end,
                    pageIndex : 0,
                    pageSize : tablePageSize,
                    radioGroupValue : value
                }
            });
        }
    }

    //列表控制显示行
    function TableChangeColumns(tableNewColumns){
        dispatch({
            type:'newArrangeCourse/updateState',
            payload:{
                tableNewColumns
            }
        });
    }

    //复选框onChange事件
    function tableSelectedRowOnChange(selectedRowKeys, selectedRows){
        dispatch({
            type:'newArrangeCourse/updateState',
            payload:{
                tableSelectedRowKeys : selectedRowKeys,
                tableSelectedRows : selectedRows
            }
        });
    }

    //分页改变事件
    function TablePageOnChange(pageIndex,pageSize){
        dispatch({
            type:'newArrangeCourse/GetCourseList',
            payload:{
                orgId : currentOrgId,
                startDate,
                endDate,
                pageIndex : pageIndex - 1,
                pageSize : pageSize,
                radioGroupValue,
            }
        });
    }

    //查询上一天/下一天 上一周/下一周数据
    function OperationQuery(type){
        let start;
        let end;
        if(type == 'yesterday'){        //点击上一天
            start = new Date(startDate).getTime() - 24*60*60*1000;
            start = FormatDate(start).substr(0,10);
            end = new Date(endDate).getTime() - 24*60*60*1000;
            end = FormatDate(end).substr(0,10);
        }else if(type == 'tomorrow'){   //点击下一天
            start = new Date(startDate).getTime() + 24*60*60*1000;
            start = FormatDate(start).substr(0,10);
            end = new Date(endDate).getTime() + 24*60*60*1000;
            end = FormatDate(end).substr(0,10);
        }else if(type == 'backToday'){  //点击返回今天
            start = nowDate;
            end = nowDate;
        }else if(type == 'lastWeek'){   //点击上一周
            //state中的startDate只能是周一
            start = new Date(startDate).getTime() - 7*24*60*60*1000;
            start = FormatDate(start).substr(0,10);
            end = new Date(startDate).getTime() - 1*24*60*60*1000;
            end = FormatDate(end).substr(0,10);
        }else if(type == 'nextWeek'){   //点击下一周
            //state中的endDate只能是周日
            start = new Date(endDate).getTime() + 1*24*60*60*1000;
            start = FormatDate(start).substr(0,10);
            end = new Date(endDate).getTime() + 7*24*60*60*1000;
            end = FormatDate(end).substr(0,10);
        }else if(type == 'backToWeek'){ //点击返回本周
            let week = new Date(nowDate).getDay();          //获取当前星期几(0-6/周日-周六)
            if(week == 0){      //如果当前日期是周日
                start = new Date(nowDate).getTime() - 6*24*60*60*1000;
                start = FormatDate(start).substr(0,10);
                end = nowDate;
            }else{
                start = new Date(nowDate).getTime() - (week-1)*24*60*60*1000;
                start = FormatDate(start).substr(0,10);
                end = new Date(nowDate).getTime() - (week-1-6)*24*60*60*1000;
                end = FormatDate(end).substr(0,10);
            }
        }else{          //按理说不会进入最后的else
            start = nowDate;
            end = nowDate;
        }
        dispatch({
            type:'newArrangeCourse/GetCourseList',
            payload:{
                orgId : currentOrgId,
                startDate : start,
                endDate : end,
                pageIndex : 0,
                pageSize : tablePageSize,
                radioGroupValue
            }
        });
    }

    //操作栏点击更改状态操作(这里只有删除)
    function OperationChangeStatus(type){
        if(type == 'delete'){
            if(tableSelectedRows.length == 0){
                message.warn('请至少选中一项删除');
            }else{
                let cpdIds = [];
                for(let i in tableSelectedRows){
                    cpdIds.push(tableSelectedRows[i].cpdId);
                }
                dispatch({
                    type:'newArrangeCourse/updateState',
                    payload:{
                        alertModalVisible : true,
                        alertModalTitle : '删除排课',
                        alertModalSubmitContent : { orgId : currentOrgId , cpdIds : cpdIds.join(',') },
                        alertModalContent : (<div>
                                                <div style = {{ marginBottom : 5 }}>是否删除已选中的{tableSelectedRows.length}条排课记录</div>
                                                <div style = {{ color : '#ff7f75' }}>已预约的上课和试听学员将全部取消</div>
                                             </div>)
                    }
                });
            }
        }
    }

    //提醒框点击确定
    function AlertModalOnOk(){
        dispatch({
            type:'newArrangeCourse/OperationChangeStatus',
            payload:alertModalSubmitContent
        });
    }

    //提醒框点击关闭
    function AlertModalOnCancel(){
        dispatch({
            type:'newArrangeCourse/updateState',
            payload:{
                alertModalVisible : false,
                tableSelectedRowKeys : [],              //复选框选中对象的key数组
                tableSelectedRows : [],                 //复选框选中对象的数组
            }
        });
    }


    //操作栏点击编辑打开编辑modal
    function OperationChangeEdit(){
        if(tableSelectedRows.length == 0){
            message.warn('请选中一项编辑');
        }else if(tableSelectedRows.length > 1){
            message.warn('最多选中一项编辑');
        }else{
            //主排课信息查询
            dispatch({
                type:'newArrangeCourse/GetMainArrangeCourseMessage',
                payload:{
                    orgId : currentOrgId,
                    cpmId : tableSelectedRows[0].cpmId
                }
            });
        }
    }

    //主排课编辑modal关闭
    function CourseEditModalCancel(){
        dispatch({
            type:'newArrangeCourse/updateState',
            payload:{
                courseEditModalVisible : false,
                courseEditModalButtonLoading : false,
                tableSelectedRowKeys : [],                  //table复选框选中对象的key数组清空
                tableSelectedRows : [],                     //table复选框选中对象的数组清空
                courseEditModalSelectedRowKeys : [],        //子排课查询选中项的key数组清空
                courseEditModalSelectedRows : [],           //子排课查询选中项的对象数组清空
                courseEditModalRangeCourseDetail : [],      //清空子排课列表
                wetherClearCourseEditModal : false,
            }
        });
    }

    //子排课记录批量删除
    function CourseBatchDelete(selectRows,startDate,endDate){
        let cpdIds = [];
        selectRows.map((item,index) => {
            cpdIds.push(item.cpdId);
        })
        dispatch({
            type : 'newArrangeCourse/CourseBatchDelete',
            payload : {
                orgId : selectRows[0].orgId,
                cpdIds : cpdIds.join(','),
                cpmId :  selectRows[0].cpmId,                   //操作成功后刷新列表用到
                startDate : startDate.format('YYYY-MM-DD'),     //操作成功后刷刷列表用到
                endDate : endDate.format('YYYY-MM-DD')          //操作成功后刷刷列表用到
            }
        })
    }

    //编辑周期内开始时间和结束时间onChange事件(用于请求排课列表)
    function EditDateOnChange(data,type){
        //如果两个都不选 清空数据数组
        if(type == 'clear'){
            dispatch({
                type:'newArrangeCourse/updateState',
                payload:{
                    courseEditModalRangeCourseDetail : []
                }
            });
        }else{
            dispatch({
                type:'newArrangeCourse/EditDateOnChange',
                payload:{
                    orgId : currentOrgId,
                    pageIndex : 0,
                    pageSize : 99999,
                    ...data
                }
            });
        }
    }

    //子排课复选框onChange事件
    function CourseEditModalSelectedRowOnChange(selectedRowKeys, selectedRows){
        dispatch({
            type:'newArrangeCourse/updateState',
            payload:{
                courseEditModalSelectedRowKeys : selectedRowKeys,
                courseEditModalSelectedRows : selectedRows
            }
        });
    }

    //主排课编辑modal提交
    function CourseEditModalSubmit(data){
        dispatch({
            type:'newArrangeCourse/CourseEditModalSubmit',
            payload:{
                orgId : currentOrgId,
                ...data
            }
        });
    }


    //提示框属性
    let AlertModalProps = {
        visible : alertModalVisible,                //提示框是否显示
        title : alertModalTitle,                    //提示框标题
        content : alertModalContent,                //提示框内容
        buttonLoading : alertModalButtonLoading,    //提示框按钮是否加载状态
        onOk : AlertModalOnOk,                      //提示框点击确认
        onCancel : AlertModalOnCancel,              //提示框点击取消
    }

    //operationBars
    let OperationBarProps = {
        nowDate,                            //当前日期(只做保存，不做修改)
        startDate,                          //操作改变开始时间
        endDate,                            //操作改变结束时间
        radioGroupValue,                    //radiogroup的值
        tableSelectedRowKeys,               //复选框选中对象的key数组
        tableSelectedRows,                  //复选框选中对象的数组

        OperationQuery,                     //查询上一天/下一天 上一周/下一周数据
        OperationChangeStatus,              //操作栏点击状态改变(这里只有删除)
        OperationChangeEdit,                //操作栏点击编辑
        RadioGroupOnChange,                 //radioGroup的onChange事件
    }

    //排课编辑modal属性
    let CourseEditModalProps = {
        courseEditModalVisible,                 //主排课编辑modal是否显示
        courseEditModalButtonLoading,           //主排课编辑modal按钮是否加载
        courseEditModalTableLoading,            //主排课编辑modal中的子排课列表加载状态
        courseEditModalSelectedRowKeys,         //子排课查询选中项的key数组
        courseEditModalSelectedRows,            //子排课查询选中项的对象数组

        courseEditModalGetContent,              //主排课点击编辑获取到的详情

        courseEditModalTeacherSelectContent,       //主教和助教下拉列表数据
        courseEditModalClassRoomSelectContent,     //教室下拉列表数据
        courseEditModalRangeCourseDetail,          //选择时间范围后出来的子排课数据

        wetherClearCourseEditModal,             //是否编辑成功(用来清空表单)

        CourseBatchDelete,                      //子排课记录批量删除
        EditDateOnChange,                       //编辑周期内开始时间和结束时间onChange事件(用于请求排课列表)
        CourseEditModalSelectedRowOnChange,     //子排课复选框onChange事件
        CourseEditModalCancel,                  //主排课编辑modal关闭
        CourseEditModalSubmit,                  //主排课编辑modal提交
    }

    //table整体属性
    let TableProps = {
        table : {
            newColumns : tableNewColumns,
            changeColumns : TableChangeColumns,
            loading : tableLoading,
            dataSource : tableDataSource,
            rowSelection : {
                selectedRowKeys : tableSelectedRowKeys,
                onChange : tableSelectedRowOnChange,        //复选框onChange事件
            },
            rowKey : 'cpdId'
        },
        pagination : {
            total : tableDataTotal,
            pageIndex : tablePageIndex,
            pageSize : tablePageSize,
            onChange : TablePageOnChange,
            onShowSizeChange : TablePageOnChange,
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : () => (`共${tableDataTotal}条`),
        },
    };

    return (
        <div style = {{ overflow : 'hidden', height : '100%' }}>
            <OperationBar {...OperationBarProps}/>
            <Table {...TableProps}/>
            { courseEditModalVisible ? <CourseEditModal {...CourseEditModalProps}/> : null }
            <AlertModal {...AlertModalProps}/>
        </div>
    );
}

function mapStateToProps({ newArrangeCourse }) {
    return { newArrangeCourse };
}

export default connect(mapStateToProps)(NewArrangeCourse);
