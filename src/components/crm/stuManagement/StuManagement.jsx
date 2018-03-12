import React from 'react';
import styles from './StuManagement.less';
import { Modal, Button, Rate, Icon, Popover } from 'antd';
import moment from 'moment';
import ClassPackageComponent from '../../common/new-component/manager-list/ManagerList';

function StuManagement ({
    stuCheckColumnKey,              //保存到localstroage中的学员显示列表的字段名
    table: {
        selectedRows, //选中某一行
        selectedRowKeys,
        loading,
        rowSelectChange,
        checkSelectAll,
        updateClassPackage,
        dataSource,
        selectedRecordIds ,
        resultCount,
        pageIndex,
        pageSize,

        pageSizeChange,
        pageIndexChange,
        studentTypeList,
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
    TableNewColumns,//table设置
    TableChangeColumns,

    serchrouteChange,

}) {

    var studentType = [];
    studentTypeList  && studentTypeList.map(function (item) {
        var data = {
            key : item.key,
            label:item.value,
        };
        studentType.push( data );
    })

    let StumagegeComponentProps = {
        search : {
            onSearch      : searchFunction,
            onClear       : searchFunction,
            wetherChear    :serchrouteChange,
            subordinate   : condition == 'my' ? true : false,   //是否需要按下属过滤   默认false
            subordinateChange : (data) => SubordinateChange(data),  //下属变更时事件
            fields : [
                {
                    key         : 'name',
                    type        : 'input',
                    placeholder : '客户姓名',
                },{
                    key         : 'sellerName',
                    type        : 'input',
                    placeholder : '负责销售',

                },{
					key         : 'mobile',
				   	type        : 'input',
					placeholder : '联系人手机号'
				}
            ]
        },
        leftBars : {
            label : '已选',
            labelNum : selectedRows.length,
            btns : [
                {
                    label    : '分配',
                    handle   : deleteClassPackage,
                }
            ]
        },
        rightBars : {
            isShowUpload : true,
            Changecolor:'#88C702',
            btns : [
                {
                    label    : '新增付费客户',
                    handle   : createStu,
                },
            ],
            isSuperSearch : true,
            superSearch : highsearch,
            superSearchVisible :  CreateStumanageSuperSearchVisible,
        },

        table: {
            loading,
            newColumns    : !!window.localStorage && !!window.localStorage[stuCheckColumnKey] ? JSON.parse(window.localStorage[stuCheckColumnKey]) : TableNewColumns,
            changeColumns : TableChangeColumns,
            dataSource    : dataSource,
			xScroll       : 1700,
            onChange      : TableOnChange,
            columns : [
				 {
                    key       : 'name',
                    dataIndex : 'name',
                    title     : '客户姓名',
                    width     : 160,
                    render    : ( text, record ) => (
                         <a onClick = { () => updateClassPackage( record.id, record.orgId ) }>{ text }</a>
                     ),
                },{
                    key       : 'mobile',
                    dataIndex : 'mobile',
                    title     : '客户电话',
                    width     : 140,
                    render    : ( text, record ) => (
                         <a onClick = {() => window.CallPhone(text)}>{ text }</a>
                     ),
                },{
                    key       : 'orgSize',
                    dataIndex : 'orgSize',
                    title     : '机构规模',
                    width     : 96,
                    sorter    : true,
                    render    : ( text, record ) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { record.orgSizeName }
                        </Popover>
                    ),
                },{
                    key       : 'parents',
                    dataIndex : 'parents',
                    title     : '联系人',
                    width     : 160,
                    render    : ( text, record ) => (
						<Popover placement = "top" content = {
							<span>
								{ !!text && text.map( (item, index) => {
									return <span key = { 'parents_' + index } style = {{ marginRight : text.length > 1 && index != text.length - 1 ? 10 : 0 }}>{ item.name }</span>
								}) }
							</span> } trigger = 'hover' >
							<span style = {{ marginRight : text && text.length > 1 ? 10 : 0 }}>
								{ !!text && !!text[0] && text[0].name }
							</span>
							{ text && text.length > 1 &&
								<a>{ '共' + text.length + '人' }</a>
							}
						</Popover>
                    )
                },{
                    key       : 'parentsMobile',
                    dataIndex : 'parentsMobile',
                    title     : '联系人电话',
                    width     : 140,
					render    : ( text, record ) => {
                        if(!!record && !!record.parents && record.parents.length > 2){
                            return(
                                <Popover placement = "top" content = {
                                    <div>
                                        { !!record.parents && record.parents.map( (item, index) => {
                                            return(
                                                <span key = { 'mobile' + index } className = { styles.parent_mobile }>
                                                    <span>{ item.name || '--' }</span>:
                                                    <a onClick = {() => window.CallPhone(item.mobile)}>{ item.mobile || '--' }</a>
                                                </span>
                                            )
                                        }) }
                                    </div> } trigger = 'click' >
                                    <a>查看</a>
                                </Popover>
                            )
                        }else if(!!record && !!record.parents && record.parents.length == 1){
                            return(<a onClick = {() => window.CallPhone(record.parents[0].mobile)}>{ record.parents[0].mobile } </a>)
                        }else{
                            return '';
                        }
                    }
                },{
                    key       : 'sellerName',
                    dataIndex : 'sellerName',
                    title     : '负责销售',
                    width     : 120,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    key       : 'creater',
                    dataIndex : 'creater',
                    title     : '创建人',
                    width     : 120,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    key       : 'counselorName',
                    dataIndex : 'counselorName',
                    title     : '售后客服',
                    width     : 120,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    key       : 'followRecordTime',
                    dataIndex : 'followRecordTime',
                    title     : '最后跟进时间',
                    width     : 140,
                    sorter    : true,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    key       : 'nextFollowTime',
                    dataIndex : 'nextFollowTime',
                    title     : '下次跟进时间',
                    width     : 140,
                    sorter    : true,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                }, {
                    title : '更新时间',
                    key : 'modifyTime',
                    dataIndex : 'modifyTime',
                    width : 140,
                    sorter    : true,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                }, {
                    key       : 'orgName',
                    dataIndex : 'orgName',
                    title     : '所属校区',
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },
            ],
            rowSelection : {
                selectedRowKeys : selectedRowKeys,
                onChange        : rowSelectChange,
                onSelectAll     : checkSelectAll,   //  选择全部行时
            },
        },
        pagination : {
            total            : Number(resultCount),
            pageIndex        : pageIndex,
            pageSize         : pageSize,
            showTotal        : total => `总共 ${total} 条`,
            showSizeChanger  : true,
            showQuickJumper  : true,
            onShowSizeChange : pageSizeChange,
            onChange         : pageIndexChange
        }
    };

    return (
        <div style = {{ height : '100%' }} >
            <ClassPackageComponent { ...StumagegeComponentProps } />
        </div>
    );
}

export default StuManagement;
