import React from 'react';
import Media from 'react-media';
import { Popover , Icon } from 'antd';
import ManagerList from '../../../common/new-component/manager-list/ManagerList';

/*学员考勤表*/
function StuAttendanceSheetTable({
    tabKey,
    sTable,                 //小屏下table
    lTable,                 //大屏下table
    pagination,
}){
    let columns = [{
        title : tabKey == 'Course' ? '课程名称' : tabKey == 'Mteacher' ? '主教名称' : tabKey == 'Ateacher' ? '助教名称' : '未知',
        key : tabKey == 'Course' ? 'courseName' : 'userName',
        dataIndex : tabKey == 'Course' ? 'courseName' : 'userName',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '预约报读',
        key : tabKey == 'Course' ? 'studyMaa' : tabKey == 'Mteacher' ? 'mstudyMaa' : tabKey == 'Ateacher' ? 'astudyMaa' : 'maa',
        dataIndex : tabKey == 'Course' ? 'studyMaa' : tabKey == 'Mteacher' ? 'mstudyMaa' : tabKey == 'Ateacher' ? 'astudyMaa' : 'maa',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '出勤',
        key : tabKey == 'Course' ? 'studyAttend' : tabKey == 'Mteacher' ? 'mstudyAttend' : tabKey == 'Ateacher' ? 'astudyAttend' : 'attend',
        dataIndex : tabKey == 'Course' ? 'studyAttend' : tabKey == 'Mteacher' ? 'mstudyAttend' : tabKey == 'Ateacher' ? 'astudyAttend' : 'attend',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '请假',
        key : tabKey == 'Course' ? 'studyLeave' : tabKey == 'Mteacher' ? 'mstudyLeave' : tabKey == 'Ateacher' ? 'astudyLeave' : 'leave',
        dataIndex : tabKey == 'Course' ? 'studyLeave' : tabKey == 'Mteacher' ? 'mstudyLeave' : tabKey == 'Ateacher' ? 'astudyLeave' : 'leave',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '旷课',
        key : tabKey == 'Course' ? 'studyAbsent' : tabKey == 'Mteacher' ? 'mstudyAbsent' : tabKey == 'Ateacher' ? 'astudyAbsent' : 'absent',
        dataIndex : tabKey == 'Course' ? 'studyAbsent' : tabKey == 'Mteacher' ? 'mstudyAbsent' : tabKey == 'Ateacher' ? 'astudyAbsent' : 'absent',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '出勤率',
        key : 'rate',
        dataIndex : 'rate',
        width : 150,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }];

    sTable.columns = columns;

    lTable.columns = columns;

    return(
        <Media query="(max-width: 1350px)">
            { matches => matches ?
                (<ManagerList
                    table = { sTable }
                    pagination = { pagination }
                    />)
                :
                (<ManagerList
                    table = { lTable }
                    pagination = { pagination }
                    />)
            }
        </Media>
    );
}

export default StuAttendanceSheetTable;
