import React from 'react';
import qs from 'qs';
import { message } from 'antd';
import TeacherTeachingBar from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import TeacherTeachingTable from '../../../../components/report-form/teaching-report/teacher-teaching/TeacherTeachingTable';
import TeacherTeachingDetailModal from '../../../../components/report-form/teaching-report/teacher-teaching/TeacherTeachingDetailModal';

import { connect } from 'dva';

function TeacherTeaching({ dispatch, teacherTeachingSheet }) {

    let {
        firstEnter,                     //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        pageIndex,                      //页码
        pageSize,                       //默认永远是20

        sortParams,                     //排序方式(放在state里方便做统一处理)

        exportSearchContent,            //查询的数据(时间范围)

        tableLoading,                   //table是否在加载状态
        listTopAllContent ,             //table列表上方所有数据
        listBottomTeacherContent,       //table列表下方老师所有数据
        listBottomTeacherCount,         //下方table总数据

        teachingDetailVisible,          //授课详情modal展示
        teachingDetailNameHeight,       //授课详情姓名栏高度
        teachingDetailName,             //授课详情老师姓名
        teachingDetailContent,          //授课详情内容
        teachingDetailSpining,          //授课详情模态框是否加载状态

        buttonLoading,                  //生成报表按钮加载状态
    } = teacherTeachingSheet

    //点击生成报表
    let GeneratingReports = function(data){
        dispatch({
            type:'teacherTeachingSheet/GetTeacherTeachingTable',
            payload:{
                pageIndex : 0,
                pageSize,
                exportSearchContent : data
            }
        });
    }


    //table分页改变
    let tableOnChange = function(pagination, filters, sorter){
        dispatch({
            type:'teacherTeachingSheet/GetTeacherTeachingTable',
            payload:{
                pageIndex : pagination.current-1,
                pageSize : pagination.pageSize,
                exportSearchContent,
            }
        });
    }

    //打开授课详情modal
    let tableOnOpenDetail = function(uid,orgId){
        let { startDate , endDate } = exportSearchContent;
        dispatch({
            type:'teacherTeachingSheet/OpenTeachingDetail',
            payload:{
                uid,
                orgId,
                pageSize : 99999,
                pageIndex : 0,
                startDate,
                endDate
            }
        });
    }

    //关闭授课详情modal
    let teachingDetailModalCancel = function(){
        dispatch({
            type:'teacherTeachingSheet/updateState',
            payload:{
                teachingDetailVisible : false,
            }
        });
    }

    let TeacherTeachingBarProps = {
        GeneratingReports,                  //点击生成报表
        dataTotal : listBottomTeacherCount,
        exportPath : `${BASE_URL}/classSignInfo/exportExcelDetail?${qs.stringify(exportSearchContent)}&flag=detail`,
        searchContent : [
            {
                type : 'select' ,
                key : 'sortParam',
                placeholder : '排序方式',
                options : sortParams
            }
        ],
        buttonLoading,                      //生成报表按钮加载状态
        firstEnter : true,                  //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
    }

    let teacherTeachingTableProps = {
        pageIndex,                      //页码
        pageSize,                       //默认永远是20
        tableLoading,                   //table是否在加载状态
        listTopAllContent ,             //table列表上方所有数据
        listBottomTeacherContent,       //table列表下方老师所有数据
        listBottomTeacherCount,         //下方table总数据
        tableOnChange,                  //table分页改变
        tableOnOpenDetail,              //打开授课详情
    }

    let teacherTeachingDetailModalProps = {
        teachingDetailVisible,
        teachingDetailName,
        teachingDetailNameHeight,
        teachingDetailContent,
        teachingDetailSpining,
        teachingDetailModalCancel
    }

    return (
        <div style = {{ overflow : 'hidden' , height : '100%' }}>
            <TeacherTeachingBar {...TeacherTeachingBarProps} style = {{ marginBottom : 20 }}/>
            <TeacherTeachingTable {...teacherTeachingTableProps}/>
            <TeacherTeachingDetailModal {...teacherTeachingDetailModalProps} />
        </div>
  );
}

function mapStateToProps({ teacherTeachingSheet }) {
  return { teacherTeachingSheet };
}

export default connect(mapStateToProps)(TeacherTeaching);
