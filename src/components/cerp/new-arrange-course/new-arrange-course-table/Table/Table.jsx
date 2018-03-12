import React from 'react';
import { Popover , Icon } from 'antd';
import { StatusFlag } from '../../../../common/new-component/NewComponent'
import ManagerList from '../../../../common/new-component/manager-list/ManagerList';

/*排课列表*/
function Table({
    table,
    pagination,
}){

    let columns = [{
        title : '排课标题',
        key : 'title',
        dataIndex : 'title',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '课程名称',
        key : 'courseName',
        dataIndex : 'courseName',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '进度',
        key : 'process',
        dataIndex : 'process',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '日期',
        key : 'studyDate',
        dataIndex : 'studyDate',
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '时间段',
        key : 'tiemRange',
        dataIndex : 'tiemRange',
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={<span>{ record.startTime } ~ { record.endTime }</span>} trigger="hover">
                { record.startTime } ~ { record.endTime }
            </Popover>
        )
    }, {
        title : '主教',
        key : 'mtNames',
        dataIndex : 'mtNames',
        width : 140,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '教室',
        key : 'roomName',
        dataIndex : 'roomName',
        width : 112,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '消耗课时',
        key : 'cost',
        dataIndex : 'cost',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="click">
                { text }
            </Popover>
        )
    }, {
        title : '上课人数',
        key : 'numAndMaxNum',
        dataIndex : 'numAndMaxNum',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.num) >= parseInt(record.maxNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.num } / { record.maxNum }</span> } trigger="hover">
                <span style = { parseInt(record.num) >= parseInt(record.maxNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.num } / { record.maxNum }</span>
            </Popover>
        )
    }, {
        title : '补课人数',
        key : 'mulNum',
        dataIndex : 'mulNum',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.mulNum) >= parseInt(record.maxMulNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.mulNum } / { record.maxMulNum }</span> } trigger="hover">
                <span style = { parseInt(record.mulNum) >= parseInt(record.maxMulNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.mulNum } / { record.maxMulNum }</span>
            </Popover>
        )
    }, {
        title : '试听人数',
        key : 'tryNum',
        dataIndex : 'tryNum',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.tryNum) >= parseInt(record.maxTryNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.tryNum } / { record.maxTryNum }</span> } trigger="hover">
                <span style = { parseInt(record.tryNum) >= parseInt(record.maxTryNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.tryNum } / { record.maxTryNum }</span>
            </Popover>
        )
    }, {
        title : '排队人数',
        key : 'lineNum',
        dataIndex : 'lineNum',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '状态',
        key : 'status',
        dataIndex : 'status',
        width : 68,
        render : (text,record) => (
            <StatusFlag type = { text == '0' ? 'gray' :
                                 text == '1' ? 'green' : ''}>{ text == '0' ? '无效' :
                                                               text == '1' ? '有效' : '无'}</StatusFlag>
        )
    }, {
        title : '所属校区',
        key : 'orgName',
        dataIndex : 'orgName',
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }];

    table.columns = columns;
    table.xScroll = 1600;
	table.height = 253;

    return(
        <ManagerList
            table = { table }
            pagination = { pagination }
            />
    );
}

export default Table;
