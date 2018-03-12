import React from 'react';
import styles from './OfflinebookingComponent.less';
import { Modal, Button , Rate } from 'antd';
import moment from 'moment';
import ClassPackageComponent from '../../common/new-component/manager-list/ManagerList';
import { StatusFlag} from '../../common/new-component/NewComponent';
import { Popover , Icon } from 'antd';

function OfflinebookingComponent ({
    table: {
        wetherChear,      //是否清空搜索
        isChecked,
        isPickOn,
        loading,
        dataSource      ,
        resultCount      ,

        selectedRowKeys  ,
        selectedRows     ,
        selectedRecordIds ,

        rowSelectChange,
        checkSelectAll,

        pageSizeChange,
        pageIndexChange,
        updateClassPackage,
        pageIndex        ,
        pageSize         ,
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
    handleleadsrecord,
    handlesturecord,

    CreateOfflinebookSuperSearchVisible,         //高级搜索是否显示

    CreateOfflinebookSuperSearchClick,           //高级搜索点击搜索或者重置
    CreateOfflinebookSuperSearchOnSearch,

    onClearSuperSearchClick,

    OfflineType,
    SubordinateChange,
    condition,

    routeChange,//路由改变

}) {

    var selctarr =  [
        { 'key' : '0', 'label' : '取消' },
        { 'key' : '1', 'label' : '已预约' },
        { 'key' : '2', 'label' : '已试听' },
        { 'key' : '3', 'label' : '旷课' }
    ];

    if (routeChange == true) {
        isChecked = true;
        isPickOn = false;
    }

    let StumagegeComponentProps = {

        search : {
            onSearch      : searchFunction,
            onClear       : clearFunction,
            wetherChear   : wetherChear,
            subordinate : condition == 'my' ? true : false,   //是否需要按下属过滤   默认false
            subordinateChange : (data) => SubordinateChange(data),  //下属变更时事件
            fields : [
                {
                    key         : 'stuName',
                    type        : 'input',
                    placeholder : '学员姓名',
                },{
                    key         : 'status',
                    type        : 'select',
                    placeholder : '状态',
                    options     : selctarr,
                },{
                    key: 'orgId',
                    type: 'orgSelect',
                    label: '校区:',
                    placeholder: '请选择校区',
                },
            ]
        },
        leftBars : {
            label : '已选',
            labelNum : selectedRows.length,
            btns : [
                {
                    label    : '取消',
                    handle   : deleteClassPackage,
                    confirm  : true,
                }
            ]
        },
        rightBars : {
            btns : [
                {
                    label    : '名单试听',
                    handle   : handleleadsrecord,
                    type     : 'leadsrecord',
                    isChecked : isChecked,
                },{
                    label    : '学员试听',
                    handle   : handlesturecord,
                    type     : 'sturecord' ,
                    isPickOn : isPickOn,
                },{
                    label    : '新增试听',
                    handle   : createOfflinebook,
                },
            ],
            isSuperSearch : true,
            superSearch :highsearch,
            superSearchVisible : CreateOfflinebookSuperSearchVisible,
        },

        table: {
            loading,
            dataSource : dataSource,
            newColumns : TableNewColumns,
            changeColumns : TableChangeColumns,
            columns: [
                {
                    key: 'stuName',
                    title: '学员姓名',
                    dataIndex: 'stuName',
                    width: 140,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    dataIndex : 'sellerName',
                    key       : 'sellerName',
                    title     : '跟进人',
                    width     : 96,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    key: 'status',
                    title: '状态',
                    dataIndex: 'status',
                    width: 82,

                    render : (text,record) => (
                        <StatusFlag type = { (text == '0' || text == '4') ? 'gray' :  'blue' }>{ text == '0' ? '取消' : text == '1' ? '已预约' : text == '2' ? '已试听' : text == 3 ? '旷课' :'' }</StatusFlag>
                    )
                },{
                    key       : 'courseName',
                    title     : '试听课程',
                    dataIndex : 'courseName',
                    width     : 96,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    key       : 'auditionTime',
                    title     : '预约时间',
                    dataIndex : 'auditionTime',
                    width     : 200,
                    render    : ( text, record ) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { (!record.auditionTime ? "" : record.auditionTime) + '-' + (!(record.auditionEndTime +'') || (record.auditionEndTime == undefined  || record.auditionEndTime == null ? '' : (record.auditionEndTime+ '').substring(11) )) }
                        </Popover>
//                        <span>
//							{ (!record.auditionTime ? "" : record.auditionTime) + '-' + (!(record.auditionEndTime +'') || (record.auditionEndTime == undefined  || record.auditionEndTime == null ? '' : (record.auditionEndTime+ '').substring(11) ) }
//						</span>
                    )
                },{
                    key: 'remark',
                    title: '备注',
                    dataIndex: 'remark',
                    width: 96,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    key: 'createTime',
                    title: '创建时间',
                    dataIndex: 'createTime',
                    width: 160,
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    key: 'orgName',
                    title: '所属校区',
                    dataIndex: 'orgName',
                    render : (text,record) => (
                        <Popover placement="top" content={text} trigger="hover">
                            { text }
                        </Popover>
                    )
                }
            ],
            rowSelection : {
                selectedRowKeys : selectedRowKeys,
                onChange        : rowSelectChange,
                type            : 'checkbox',     // 选择类型  多选/单选    checkbox or radio
                onSelectAll     : checkSelectAll,   //  选择全部行时
            },
        },
        pagination : {
            total            : resultCount,
            pageIndex        : pageIndex,
            pageSize         : pageSize,
            showTotal        : total => `总共 ${total} 条`,
            showSizeChanger  : true,
            showQuickJumper  : true,
            onShowSizeChange : pageSizeChange,
            onChange         : pageIndexChange,
        }
    };

    return (
        <div style = {{ height : '100%' , overflow : 'hidden' }} >
            <ClassPackageComponent {...StumagegeComponentProps} />
        </div>
    );
}


export default OfflinebookingComponent;
