import React from 'react';
import { Popover , Icon , message , Modal , Button } from 'antd';
import { StatusFlag } from '../../../common/new-component/NewComponent';
import ManagerList from '../../../common/new-component/manager-list/ManagerList';
import qs from 'qs';

/*全部leads，我的leads，公海池，回收站*/
function LeadsFollowTable({
    leadsFollowType,                        //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
    leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容
    TableClickOpenDetail,                   //table点击姓名打开详情
    search,
    table,
    pagination,
    leftBars,
    rightBars,
}){

    let columns = [{
        title : '客户名称',
        key : 'name',
        dataIndex : 'name',
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { leadsFollowType != 'recycle' ?
                    <span style={{color:'#5d9cec',cursor:'pointer'}} onClick={() => TableClickOpenDetail(record)}>{ text }</span> : <span>{ text }</span>
                }
            </Popover>
        )
    }, {
        title : '客户来源',
        key : 'channel',
        dataIndex : 'channel',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '客户状态',
        key : 'studentFollowState',
        dataIndex : 'studentFollowState',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '最终来源',
        key : 'secondChannelName',
        dataIndex : 'secondChannelName',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '联系状态',
        key : 'contactStateName',
        dataIndex : 'contactStateName',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '机构规模',
        key : 'orgSize',
        dataIndex : 'orgSize',
        width : 96,
        sorter : true,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { record.orgSizeName }
            </Popover>
        )
    }, {
        title : '客户电话',
        key : 'mobile',
        dataIndex : 'mobile',
        width : 120,
        render : (text,record) => (
            <a onClick = {() => window.CallPhone(text)}>{ text }</a>
        )
    }, {
        title : '接通次数',
        key : 'sucNum',
        dataIndex : 'sucNum',
        width : 120,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '联系人',
        key : 'parentName',
        dataIndex : 'parentName',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '联系人电话',
        key : 'parentMobile',
        dataIndex : 'parentMobile',
        width : 120,
        render : (text,record) => (
            <a onClick = {() => window.CallPhone(text)}>{ text }</a>
        )
    }, {
        title : '联系人备注',
        key : 'remarks',
        dataIndex : 'remarks',
        width : 160,
        render : (text,record) => (
            <a onClick = {() => window.CallPhone(text)}>{ text }</a>
        )
    }, {
        title : '省',
        key : 'province',
        dataIndex : 'province',
        width : 80,
        render : (text,record) => (
            <Popover placement="top" content={text}>
                { text }
            </Popover>
        )
    }, {
        title : '市',
        key : 'city',
        dataIndex : 'city',
        width : 80,
        render : (text,record) => (
            <Popover placement="top" content={text}>
                { text }
            </Popover>
        )
    }, {
        title : '区',
        key : 'county',
        dataIndex : 'county',
        width : 80,
        render : (text,record) => (
            <Popover placement="top" content={text}>
                { text }
            </Popover>
        )
    }, {
        title : '详细地址',
        key : 'conaddress',
        dataIndex : 'conaddress',
        width : 200,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '创建时间',
        key : 'createTime',
        dataIndex : 'createTime',
        sorter : true,
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '更新时间',
        key : 'modifyTime',
        dataIndex : 'modifyTime',
        width : 160,
        sorter : true,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '最后跟进时间',
        key : 'followRecordTime',
        dataIndex : 'followRecordTime',
        width : 160,
        sorter : true,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '下次跟进时间',
        key : 'nextFollowTime',
        dataIndex : 'nextFollowTime',
        sorter : true,
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '负责销售',
        key : 'sellerName',
        dataIndex : 'sellerName',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },  {
        title : '创建人',
        key : 'creater',
        dataIndex : 'creater',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '推荐机构',
        key : 'recommender',
        dataIndex : 'recommender',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '客户官网',
        key : 'website',
        dataIndex : 'website',
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '客户简介',
        key : 'remark',
        dataIndex : 'remark',
        width : 160,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '协同人',
        key : 'synergism',
        dataIndex : 'synergism',
        width : 96,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }, {
        title : '重要程度',
        key : 'importance',
        dataIndex : 'importance',
        width : 96,
        sorter : true,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
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
    table.xScroll = 3350;

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

export default LeadsFollowTable;
