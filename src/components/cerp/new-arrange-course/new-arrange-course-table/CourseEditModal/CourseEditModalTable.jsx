import React from 'react';
import { Popover , Icon } from 'antd';
import { StatusFlag , ProgressBar } from '../../../../common/new-component/NewComponent'
import ManagerList from '../../../../common/new-component/manager-list/ManagerList';

/*排课列表*/
function Table({
    loading,
    table,
}){

    let columns = [{
        title : '日期',
        key : 'studyDate',
        dataIndex : 'studyDate',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '时间段',
        key : 'tiemRange',
        dataIndex : 'tiemRange',
        width : 112,
        render : (text,record) => (
            <Popover placement="top" content={<span>{ record.startTime } ~ { record.endTime }</span>} trigger="hover">
                { record.startTime } ~ { record.endTime }
            </Popover>
        )
    }, {
        title : '主教',
        key : 'mtNames',
        dataIndex : 'mtNames',
        width : 112,
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
        width : 82,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="click">
                { text }
            </Popover>
        )
    }, {
        title : '上课人数',
        key : 'numAndMaxNum',
        dataIndex : 'numAndMaxNum',
        width : 82,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.num) >= parseInt(record.maxNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.num } / { record.maxNum }</span> } trigger="hover">
                <span style = { parseInt(record.num) >= parseInt(record.maxNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.num } / { record.maxNum }</span>
            </Popover>
        )
    }, {
        title : '补课人数',
        key : 'mulNum',
        dataIndex : 'mulNum',
        width : 82,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.mulNum) >= parseInt(record.maxMulNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.mulNum } / { record.maxMulNum }</span> } trigger="hover">
                <span style = { parseInt(record.mulNum) >= parseInt(record.maxMulNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.mulNum } / { record.maxMulNum }</span>
            </Popover>
        )
    }, {
        title : '试听人数',
        key : 'tryNum',
        dataIndex : 'tryNum',
        width : 82,
        render : (text,record) => (
            <Popover placement="top" content={ <span style = { parseInt(record.tryNum) >= parseInt(record.maxTryNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.tryNum } / { record.maxTryNum }</span> } trigger="hover">
                <span style = { parseInt(record.tryNum) >= parseInt(record.maxTryNum) ? { color : '#cc4243' } : { color : '#666' }}>{ record.tryNum } / { record.maxTryNum }</span>
            </Popover>
        )
    }, {
        title : '排队人数',
        key : 'lineNum',
        dataIndex : 'lineNum',
        width : 82,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }];

    table.columns = columns;

    return(
        <ManagerList
            table = { table }
            />
    );
}

export default Table;
