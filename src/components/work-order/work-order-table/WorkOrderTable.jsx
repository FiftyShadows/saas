import React from 'react';
import { Popover , Icon , message , Modal , Button } from 'antd';
import { StatusFlag } from '../../common/new-component/NewComponent';
import ManagerList from '../../common/new-component/manager-list/ManagerList';

/*全部工单，我的工单*/
function WorkOrderTable({
    tableType,                              //全部工单(all),我的工单(my)
    workOrderPriority,                      //工单优先级
    workOrderType,                          //工单类型
    tableItemStatus,                        //工单状态
    TableClickOpenDetail,                   //table点击姓名打开详情
    search,
    table,
    pagination,
    leftBars,
    rightBars,
}){

    let columns = [{
        title : '工单标题',
        key : 'title',
        dataIndex : 'title',
        width : 160,
        render : (text,record) => (
            <Popover placement = "top" content = { text } trigger = "hover">
                <a onClick = {() => TableClickOpenDetail(record)}>{ text }</a>
            </Popover>
        )
    }, {
        title : '工单优先级',
        key : 'priority',
        dataIndex : 'priority',
        width : 120,
        render : (text,record) => {
            let text_format = '';
            for(let i = 0 ; i < workOrderPriority.length ; i++){
                if(workOrderPriority[i].key == text){ text_format = workOrderPriority[i].value ; break ; }
            }
            return(
                <Popover placement = "top" content = { text_format } trigger = "hover">
                    { text_format }
                </Popover>
            )
        }
    }, {
        title : '工单类型',
        key : 'type',
        dataIndex : 'type',
        width : 120,
        render : (text,record) => {
            let text_format = '';
            for(let i = 0 ; i < workOrderType.length ; i++){
                if(workOrderType[i].key == text){ text_format = workOrderType[i].value ; break ; }
            }
            return(
                <Popover placement = "top" content = { text_format } trigger = "hover">
                    { text_format }
                </Popover>
            )
        }
    }, {
        title : '工单状态',
        key : 'status',
        dataIndex : 'status',
        width : 120,
        render : (text,record) => {
            let render_item = '';
            for(let i = 0 ; i < tableItemStatus.length ; i++){
                if(tableItemStatus[i].key == text){
                    let item = tableItemStatus[i];
                    render_item = <StatusFlag type = { item.type }>{ item.value }</StatusFlag> ; break ;
                }

            }
            return <div>{ render_item }</div>
        }
    }, {
        title : '创建人',
        key : 'creatorName',
        dataIndex : 'creatorName',
        width : 120,
        render : (text,record) => (
            <Popover placement = "top" content = { text } trigger = "hover">
                { text }
            </Popover>
        )
    }, {
        title : '受理人',
        key : 'acceptorName',
        dataIndex : 'acceptorName',
        width : 120,
        render : (text,record) => (
            <Popover placement = "top" content = { text } trigger = "hover">
                { text }
            </Popover>
        )
    }, {
        title : '创建时间',
        key : 'createTime',
        dataIndex : 'createTime',
        render : (text,record) => (
            <Popover placement = "top" content = { text } trigger = "hover">
                { text }
            </Popover>
        )
    }, {
        title : '更新时间',
        key : 'modifyTime',
        dataIndex : 'modifyTime',
        render : (text,record) => (
            <Popover placement = "top" content = { text } trigger = "hover">
                { text }
            </Popover>
        )
    }];

    table.columns = columns;
    table.xScroll = 1120;

    return(
        <ManagerList
            search = { search }
            table = { table }
            pagination = { pagination }
            leftBars = { leftBars }
            rightBars = { rightBars }
            />
    );
}

export default WorkOrderTable;
