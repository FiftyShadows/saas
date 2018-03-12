import React from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import WorkOrderTable from '../../components/work-order/work-order-table/WorkOrderTable';
import WorkOrderSuperSearch from '../../components/work-order/work-order-super-search/WorkOrderSuperSearch';
import TableOperationModal from '../../components/work-order/table-operation-modal/TableOperationModal';
import CreateWorkOrder from '../../components/work-order/create-work-order/CreateWorkOrder';
import DetailModal from '../../components/work-order/word-order-detail-modal/Main';


function WorkOrder({ dispatch, workOrder }) {

    let {
        tableType,                              //全部工单(all),我的工单(my)
        tableMyUids,                            //我的工单下uids
        tableCheckColumnKey,                    //localstroage存储保留列
        tableNewColumn,                         //table保留列
        wetherChangeRouter,                     //是否切换路由

        /*业务参数及相关数据*/
        workOrderPriority,                      //工单优先级
        workOrderType,                          //工单类型
        acceptor,                               //受理人

        /*快捷搜索*/
        fastSearchContent,                      //快捷搜索内容

        /*高级搜索*/
        superSearchVisible,                     //高级搜索是否显示
        superSearchContent,                     //高级搜索内容

        /*table*/
        tableLoading,                           //加载状态
        tablePageIndex,                         //列表页码
        tablePageSize,                          //列表每页条数
        tableDataSource,                        //列表内容
        tableTotal,                             //列表条数
        tableSelectedRowKeys,                   //列表选中项的key
        tableSelectedRow,                       //列表选中项数组
        tableItemStatus,                        //工单状态

        /*操作modal*/
        tableOperationModalStatus,              //modal操作状态({ type : xxx , status : xxx , selectItem : [xxx] , ids : xxx })
        tableOperationModalVisible,             //modal是否显示
        tableOperationModalLoading,             //modal加载状态
        tableOperationModalButtonLoading,       //modal按钮加载状态

        /*新增工单modal*/
        createWorkOrderModalVisible,            //modal是否显示
        createWorkOrderModalLoading,            //modal加载状态
        createWorkOrderModalButtonLoading,      //modal按钮加载状态

        /*工单详情modal*/
        workOrderDetailModalVisible,            //modal是否显示
        workOrderDetailModalLoading,            //modal加载状态

        /*基本信息tab页*/
        detailBaseInfoData,                     //基本信息数据

        /*服务记录tab页*/
        detailServiceList,                      //服务记录数据
    } = workOrder;

    function dp(path,obj){ dispatch({ type : path , payload : obj }) }

    //快捷搜索
    function FastOnSearch(data){
        dp('workOrder/GetTable',{
            pageIndex : 0,
            pageSize : tablePageSize,
            fastSearchContent : data,
            superSearchContent,
        })
    }

    //高级搜索开关
    function SuperSearchOpenOrClose(){ dp('workOrder/updateState' , { superSearchVisible : !superSearchVisible }) }

    //高级搜索
    function SuperSearchOnSearch(data){
        //处理创建时间
        if(data && data.createTime && data.createTime.length > 0){
            data.startCreateTime = data.createTime[0] != undefined ? data.createTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endCreateTime = data.createTime[1] != undefined ? data.createTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.createTime;
        }
        //处理更新时间
        if(data && data.modifyTime && data.modifyTime.length > 0){
            data.startModifyTime = data.modifyTime[0] != undefined ? data.modifyTime[0].format('YYYY-MM-DD HH:mm') : undefined;
            data.endModifyTime = data.modifyTime[1] != undefined ? data.modifyTime[1].format('YYYY-MM-DD HH:mm') : undefined;
            delete data.modifyTime;
        }
        dp('workOrder/GetTable',{
            pageIndex : 0,
            pageSize : tablePageSize,
            fastSearchContent,
            superSearchContent : data || {},
        })
    }

    //分页改变事件
    function TablePageOnChange(pageIndex,pageSize){
        dp('workOrder/GetTable',{
            pageIndex : !isNaN(pageIndex + '') && pageIndex >= 1 ? pageIndex - 1 : 0,
            pageSize : pageSize,
            fastSearchContent,
            superSearchContent,
        })
    }

    //下属变更时事件
    function SubordinateChange(id){
        if(tableType == 'my'){
            dp('workOrder/GetTable',{
                pageIndex : 0,
                pageSize : tablePageSize,
                fastSearchContent,
                superSearchContent,
                uids : id
            })
        }
    }

    //复选框onChange事件
    function TableSelectedRowOnChange(selectedRowKeys, selectedRows){
        dp('workOrder/updateState',{ tableSelectedRowKeys : selectedRowKeys , tableSelectedRow : selectedRows });
    }

    //列表控制显示行
    function TableChangeNewColumns(tableNewColumn){
        window.localStorage.setItem(tableCheckColumnKey,JSON.stringify(tableNewColumn));
        dp('workOrder/updateState',{ tableNewColumn });
    }

    //列表项批量操作
    function TableOnBatchOperation(type,status){
        let ids = [];
        let explain = [];
        for(let i = 0 ; i < tableSelectedRow.length ; i++){
            //操作回复状态(2受理中 可以回复)
            if(type == 'reply' && tableSelectedRow[i].status == '2'){ ids.push(tableSelectedRow[i].id) }
            //操作转交状态(1待受理 2受理中 可以转交)
            else if(type == 'transfer' && (tableSelectedRow[i].status == '1' || tableSelectedRow[i].status == '2')){ ids.push(tableSelectedRow[i].id) }
            //操作完结状态(2受理中 可以完结)
            else if(type == 'over' && tableSelectedRow[i].status == '2'){ ids.push(tableSelectedRow[i].id) }
            //操作作废状态(1待受理 2受理中 可以作废)
            else if(type == 'abolish' && (tableSelectedRow[i].status == '1' || tableSelectedRow[i].status == '2')){ ids.push(tableSelectedRow[i].id) }
            //操作重新开启状态(0作废 3完结 可以重新开启)
            else if(type == 'restart' && (tableSelectedRow[i].status == '0' || tableSelectedRow[i].status == '3')){ ids.push(tableSelectedRow[i].id) }
        }
        let obj = { type , status , ids }
        dp('workOrder/updateState' , { tableOperationModalStatus : obj , tableOperationModalVisible : true })
    }

    //点击新增工单
    function ClickCreateWorkOrder(){
        dp('workOrder/updateState' , { createWorkOrderModalVisible : true })
    }

    //table点击工单名称打开详情
    function TableClickOpenDetail(item){
        dp('workOrder/updateState' , { workOrderDetailModalVisible : true })
        dp('workOrder/GetDetail' , { id : item.id })            //获取详情
        dp('workOrder/GetItemService' , { id : item.id })       //获取服务记录
    }

    /*高级搜索属性*/
    let WorkOrderSuperSearchProps = {
        superSearchVisible,                     //高级搜索是否显示
        wetherChangeRouter,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        workOrderPriority,                      //工单优先级
        workOrderType,                          //工单类型
        acceptor,                               //受理人
        SuperSearchOnSearch,                    //高级搜索点击搜索或者重置
        SuperSearchOpenOrClose,                 //点击右上角的X
    };

    /*新增工单modal属性*/
    let CreateWorkOrderProps = {
        dp,                                     //dispatch方法
        createWorkOrderModalVisible,            //modal是否显示
        createWorkOrderModalLoading,            //modal加载状态
        createWorkOrderModalButtonLoading,      //modal按钮加载状态
        workOrderPriority,                      //工单优先级
        workOrderType,                          //工单类型
        acceptor,                               //受理人
    }

    /*操作modal属性*/
    let TableOperationModalProps = {
        dp,                                     //dispatch方法
        acceptor,                               //受理人
        tableSelectedRowKeys,                   //列表选中项的key
        tableSelectedRow,                       //列表选中项数组
        tableOperationModalStatus,              //modal操作状态({ type : xxx , status : xxx , ids : xxx })
        tableOperationModalVisible,             //modal是否显示
        tableOperationModalLoading,             //modal加载状态
        tableOperationModalButtonLoading,       //modal按钮加载状态
    }

    let DetailModalProps = {
        dp,                                     //dispatch方法
        workOrderDetailModalVisible,            //modal是否显示
        workOrderDetailModalLoading,            //modal加载状态
        workOrderPriority,                      //工单优先级
        workOrderType,                          //工单类型
        /*基本信息tab页*/
        detailBaseInfoData,                     //基本信息数据

        /*服务记录tab页*/
        detailServiceList,                      //服务记录数据
    }

    /*table整体属性*/
    let WorkOrderTableProps = {
        tableType,                              //全部工单(all),我的工单(my)
        workOrderPriority,                      //工单优先级
        workOrderType,                          //工单类型
        tableItemStatus,                        //工单状态
        TableClickOpenDetail,                   //table点击姓名打开详情
        search : {
            onSearch : (data) => FastOnSearch(data),
            onClear : (data) => FastOnSearch(data),
            wetherChear : wetherChangeRouter,
            subordinate : tableType == 'my' ? true : false,         //是否需要按下属过滤   默认false
            subordinateChange : (data) => SubordinateChange(data),  //下属变更时事件
            fields : [
                { key : 'title' ,
                  type : 'input' ,
                  placeholder : '标题' },
                { key : 'type' ,
                  type : 'select' ,
                  placeholder : '工单类型' ,
                  opt_key : 'key',
                  opt_label : 'value',
                  options : workOrderType } ,
                { key : 'status' ,
                  type : 'select' ,
                  placeholder : '工单状态' ,
                  opt_key : 'key',
                  opt_label : 'value',
                  options : tableItemStatus }
            ],
        },
        table : {
            newColumns : !!window.localStorage && !!window.localStorage[tableCheckColumnKey] ? JSON.parse(window.localStorage[tableCheckColumnKey]) : tableNewColumn,
            changeColumns : TableChangeNewColumns,
            loading : tableLoading,
            dataSource : tableDataSource,
            rowKey : 'id',
            rowSelection : {
                selectedRowKeys : tableSelectedRowKeys,
                onChange : TableSelectedRowOnChange,            //复选框onChange事件
            },
        },
        pagination : {
            total : tableTotal,
            pageIndex : tablePageIndex,
            pageSize : tablePageSize,
            onChange : TablePageOnChange,
            onShowSizeChange : TablePageOnChange,
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : () => (`共${tableTotal}条`),
        },
        leftBars : {
            label : '已选',
            labelNum : tableSelectedRowKeys.length,
            btns : [
                { label : '回复' , handle : () => TableOnBatchOperation('reply','4') , confirm : false },
                { label : '转交' , handle : () => TableOnBatchOperation('transfer','5') , confirm : false },
                { label : '完结' , handle : () => TableOnBatchOperation('over','3') , confirm : false },
                { label : '作废' , handle : () => TableOnBatchOperation('abolish','0') , confirm : false },
                { label : '重新开启' , handle : () => TableOnBatchOperation('restart','6') , confirm : false }
            ]
        },
        rightBars : {
            isSuperSearch : true,
            superSearchVisible : superSearchVisible,
            superSearch : SuperSearchOpenOrClose,
            closeSearch : SuperSearchOpenOrClose,
            btns : [{ label : '新建工单' , handle : () => ClickCreateWorkOrder() }]
        }
    };

    return(
        <div style = {{ overflow : 'hidden' , width : '100%' , height : '100%' }}>
            <WorkOrderTable {...WorkOrderTableProps}/>
            <WorkOrderSuperSearch {...WorkOrderSuperSearchProps}/>
            { !!createWorkOrderModalVisible ? <CreateWorkOrder {...CreateWorkOrderProps}/> : null }
            { !!tableOperationModalVisible ? <TableOperationModal {...TableOperationModalProps}/> : null }
            <DetailModal {...DetailModalProps}/>
        </div>
    );
}

function mapStateToProps({ workOrder }) {
    return { workOrder };
}

export default connect(mapStateToProps)(WorkOrder);
