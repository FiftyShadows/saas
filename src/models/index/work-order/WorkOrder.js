import {
    GetDictKey,             //获取业务参数
    GetTable,               //获取列表
    GetAcceptor,            //获取受理人
    WorkOrderCreate,        //新增工单
    GetDetail,              //获取工单详情
    GetItemService,         //获取工单服务列表
    WorkOrderAbolishOrOver, //工单作废或完结
    WorkOrderReplyOrRestart,//工单回复或重新开启
    WorkOrderTransfer       //工单转交
} from '../../../services/work-order/WorkOrder';
import { parse } from 'qs';
import { message , notification } from 'antd';

/*工单*/
export default {

    namespace: 'workOrder',

    state: {
        tableType : undefined,                          //全部工单(all),我的工单(my)
        tableMyUids : undefined,                        //我的工单下uids
        tableCheckColumnKey : 'workOrderCheckColumn',   //localstroage存储保留列
        tableNewColumn : [],                            //table保留列
        wetherChangeRouter : false,                     //是否切换路由

        /*业务参数及相关数据*/
        workOrderPriority : [],                         //工单优先级
        workOrderType : [],                             //工单类型
        acceptor : [],                                  //受理人

        /*快捷搜索*/
        fastSearchContent : {},                         //快捷搜索内容

        /*高级搜索*/
        superSearchVisible : false,                     //高级搜索是否显示
        superSearchContent : {},                        //高级搜索内容

        /*table*/
        tableLoading : false,                           //加载状态
        tablePageIndex : 0,                             //列表页码
        tablePageSize : 20,                             //列表每页条数
        tableDataSource : [],                           //列表内容
        tableTotal : 0,                                 //列表条数
        tableSelectedRowKeys : [],                      //列表选中项的key
        tableSelectedRow : [],                          //列表选中项数组
        tableItemStatus : [
            { key : '0' , value : '作废' , type : 'gray' },
            { key : '1' , value : '待受理'  },
            { key : '2' , value : '受理中' , type : 'yellow' },
            { key : '3' , value : '完结' , type : 'green' }
        ],                                              //工单状态

        /*操作modal*/
        tableOperationModalStatus : {},                 //modal操作状态({ type : xxx , status : xxx , ids : xxx })
        tableOperationModalVisible : false,             //modal是否显示
        tableOperationModalLoading : false,             //modal加载状态
        tableOperationModalButtonLoading : false,       //modal按钮加载状态

        /*新增工单modal*/
        createWorkOrderModalVisible : false,            //modal是否显示
        createWorkOrderModalLoading : false,            //modal加载状态
        createWorkOrderModalButtonLoading : false,      //modal按钮加载状态

        /*工单详情modal*/
        workOrderDetailModalVisible : false,            //modal是否显示
        workOrderDetailModalLoading : false,            //modal加载状态

        /*基本信息tab页*/
        detailBaseInfoData : {},                        //基本信息数据

        /*服务记录tab页*/
        detailServiceList : [],                         //服务记录数据

    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                function dp(path,obj){ dispatch({ type : path , payload : obj }) };
                if(pathname == '/workorder_allwo' || pathname == '/workorder_mywo'){
                    //获取业务参数及相关数据
                    dp('GetCommonData')
                }
                if(pathname == '/workorder_allwo'){
                    dp('GetTable',{ conditions : 'all' , wetherChangeRouter : true , pageIndex : 0 , pageSize : 20 })
                }
                if(pathname == '/workorder_mywo'){
                    //修改我的下属文案
                    dp('mainLayoutModel/updateState',{ SubordinateType : '工单' })
                    //获取列表
                    dp('GetTable',{ conditions : 'my' , wetherChangeRouter : true, pageIndex : 0 , pageSize : 20 })

                }
            });
        },
    },

    effects: {
        *'GetCommonData'({ payload } , { call , put , select }){
            //获取工单优先级
            let workOrderPriority = yield call(GetDictKey,parse({ dictkey : 'workOrderPriority' }))
            if(workOrderPriority && workOrderPriority.ret && workOrderPriority.ret.errorCode == '9000'){
                let { ret } = workOrderPriority;
                yield put({ type : 'updateState' , payload : { workOrderPriority : ret.list || [] } })
            }else{
                message.error(workOrderPriority && workOrderPriority.ret && workOrderPriority.ret.errorMessage ? workOrderPriority.ret.errorMessage : '获取工单优先级失败');
                yield put({ type : 'updateState' , payload : { workOrderPriority : [] } })
            }

            //获取工单类型
            let workOrderType = yield call(GetDictKey,parse({ dictkey : 'workOrderType' }))
            if(workOrderType && workOrderType.ret && workOrderType.ret.errorCode == '9000'){
                let { ret } = workOrderType;
                yield put({ type : 'updateState' , payload : { workOrderType : ret.list || [] } })
            }else{
                message.error(workOrderType && workOrderType.ret && workOrderType.ret.errorMessage ? workOrderType.ret.errorMessage : '获取工单类型失败');
                yield put({ type : 'updateState' , payload : { workOrderType : [] } })
            }

            //获取受理人
            let acceptor = yield call(GetAcceptor)
            if(acceptor && acceptor.ret && acceptor.ret.errorCode == '9000'){
                let { ret } = acceptor;
                yield put({ type : 'updateState' , payload : { acceptor : ret.results || [] } })
            }else{
                message.error(acceptor && acceptor.ret && acceptor.ret.errorMessage ? acceptor.ret.errorMessage : '获取受理人失败');
                yield put({ type : 'updateState' , payload : { acceptor : [] } })
            }

        },

        //获取列表
        *'GetTable'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { tableLoading : true } });
            let workOrder = yield select(state => state.workOrder);
            let params = { ...payload };
            //处理快捷搜索(wetherChangeRouter只在进入路由时才会传 表明是新的路由进入，需要清空搜索栏)
            let fastSearchContent = params && !!params.wetherChangeRouter ? {} : params && params.fastSearchContent ? params.fastSearchContent : workOrder.fastSearchContent;
            delete params.fastSearchContent
            //处理高级搜索
            let superSearchContent = params && !!params.wetherChangeRouter ? {} : params && params.superSearchContent ? params.superSearchContent : workOrder.superSearchContent;
            delete params.superSearchContent
            //处理分页
            params.pageIndex = params && !isNaN(params.pageIndex + '') ? params.pageIndex : workOrder.tablePageIndex;
            params.pageSize = params && !isNaN(params.pageSize + '') ? params.pageSize : workOrder.tablePageSize;
            //处理列表类型
            params.conditions = params && params.conditions ? params.conditions : workOrder.tableType;
            //处理我的工单下的uids
            if(params.conditions == 'my'){
                params.uids = params && params.uids ? params.uids : workOrder.tableMyUids;
            }else{
                delete params.uids;
            }
            let submit_params = { ...params , ...fastSearchContent , ...superSearchContent };
            let res = yield call(GetTable,parse(submit_params));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({
                    type : 'updateState',
                    payload : {
                        tablePageIndex : ret.data && ret.data.pageIndex || 0,
                        tablePageSize : ret.data && ret.data.pageSize || 20,
                        tableDataSource : ret.results || [],
                        tableTotal : ret.data && ret.data.resultCount || 0,
                        tableSelectedRowKeys : [],
                        tableSelectedRow : [],
                        tableType : params.conditions || 'all',
                        tableMyUids : params.uids || undefined,
                        wetherChangeRouter : false,
                        fastSearchContent,
                        superSearchContent
                    }
                })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取工单列表失败');
                yield put({ type : 'clearTable' })
            }
            //关闭列表loading和详情框
            yield put({ type : 'updateState' , payload : { tableLoading : false , workOrderDetailModalVisible : params && !!params.workOrderDetailModalVisible || false } })
        },

        //新增工单
        *'WorkOrderCreate'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { createWorkOrderModalLoading : true , createWorkOrderModalButtonLoading : true } });
            let res = yield call(WorkOrderCreate,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({ type : 'updateState' , payload : { createWorkOrderModalVisible : false } });
                yield put({ type : 'GetTable' })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '新增工单失败');
            }
            yield put({ type : 'updateState' , payload : { createWorkOrderModalLoading : false , createWorkOrderModalButtonLoading : false } });
        },

        //table点击工单名称打开详情
        *'GetDetail'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { workOrderDetailModalLoading : true } });
            let res = yield call(GetDetail,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({ type : 'updateState' , payload : { detailBaseInfoData : ret || {} } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取工单详情失败');
                yield put({ type : 'updateState' , payload : { detailBaseInfoData : {} } })
            }
            yield put({ type : 'updateState' , payload : { workOrderDetailModalLoading : false } });
        },

        //获取服务记录
        *'GetItemService'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { workOrderDetailModalLoading : true } });
            let res = yield call(GetItemService,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                yield put({ type : 'updateState' , payload : { detailServiceList : ret.results || [] } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '获取工单服务记录失败');
                yield put({ type : 'updateState' , payload : { detailServiceList : [] } })
            }
            yield put({ type : 'updateState' , payload : { workOrderDetailModalLoading : false } });
        },

        //工单作废或者完结
        *'WorkOrderAbolishOrOver'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : true , tableOperationModalButtonLoading : true } });
            let workOrder = yield select(state => state.workOrder);
            let res = yield call(WorkOrderAbolishOrOver,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                let workOrder = yield select(state => state.workOrder);
                if(ret.failNum > 0){
                    notification.warning({
                        message : '操作成功但是有瑕疵',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                        duration : null
                    });
                }else{
                    notification.success({
                        message : '操作成功',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                    });
                }
                //关闭弹窗
                yield put({ type : 'updateState' , payload : { tableOperationModalVisible : false } });
                //如果已经打开详情并且操作项包括打开详情这一项则重新获取此项的基本信息和服务记录
                if(workOrder.detailBaseInfoData && payload.ids.indexOf(workOrder.detailBaseInfoData.id) > -1){
                    yield put({ type : 'GetDetail' , payload : { id : workOrder.detailBaseInfoData.id } })
                    yield put({ type : 'GetItemService' , payload : { id : workOrder.detailBaseInfoData.id } })
                }
                yield put({ type : 'GetTable' , payload : { workOrderDetailModalVisible : workOrder.workOrderDetailModalVisible } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '操作失败');
            }
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : false , tableOperationModalButtonLoading : false } });
        },

        //工单回复或重新开启
        *'WorkOrderReplyOrRestart'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : true , tableOperationModalButtonLoading : true } });
            let workOrder = yield select(state => state.workOrder);
            let res = yield call(WorkOrderReplyOrRestart,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                let workOrder = yield select(state => state.workOrder);
                if(ret.failNum > 0){
                    notification.warning({
                        message : '操作成功但是有瑕疵',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                        duration : null
                    });
                }else{
                    notification.success({
                        message : '操作成功',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                    });
                }
                //关闭弹窗
                yield put({ type : 'updateState' , payload : { tableOperationModalVisible : false } });
                //如果已经打开详情并且操作项包括打开详情这一项则重新获取此项的基本信息和服务记录
                if(workOrder.detailBaseInfoData && payload.ids.indexOf(workOrder.detailBaseInfoData.id) > -1){
                    yield put({ type : 'GetDetail' , payload : { id : workOrder.detailBaseInfoData.id } })
                    yield put({ type : 'GetItemService' , payload : { id : workOrder.detailBaseInfoData.id } })
                }
                yield put({ type : 'GetTable' , payload : { workOrderDetailModalVisible : workOrder.workOrderDetailModalVisible } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '操作失败');
            }
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : false , tableOperationModalButtonLoading : false } });
        },

        //工单转交
        *'WorkOrderTransfer'({ payload } , { call , put , select }){
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : true , tableOperationModalButtonLoading : true } });
            let workOrder = yield select(state => state.workOrder);
            let res = yield call(WorkOrderTransfer,parse(payload));
            if(res && res.ret && res.ret.errorCode == '9000'){
                let { ret } = res;
                let workOrder = yield select(state => state.workOrder);
                if(ret.failNum > 0){
                    notification.warning({
                        message : '转交成功但是有瑕疵',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                        duration : null
                    });
                }else{
                    notification.success({
                        message : '转交成功',
                        description : `成功${ ret.sucNum || 0 }，失败${ ret.failNum || 0 }`,
                    });
                }
                //关闭弹窗
                yield put({ type : 'updateState' , payload : { tableOperationModalVisible : false } });
                //如果已经打开详情并且操作项包括打开详情这一项则重新获取此项的基本信息和服务记录
                if(workOrder.detailBaseInfoData && payload.ids.indexOf(workOrder.detailBaseInfoData.id) > -1){
                    yield put({ type : 'GetDetail' , payload : { id : workOrder.detailBaseInfoData.id } })
                    yield put({ type : 'GetItemService' , payload : { id : workOrder.detailBaseInfoData.id } })
                }
                yield put({ type : 'GetTable' , payload : { workOrderDetailModalVisible : workOrder.workOrderDetailModalVisible } })
            }else{
                message.error(res && res.ret && res.ret.errorMessage ? res.ret.errorMessage : '操作失败');
            }
            yield put({ type : 'updateState' , payload : { tableOperationModalLoading : false , tableOperationModalButtonLoading : false } });
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        //清空列表数据
        clearTable(state, action){
            let obj = {
                tablePageIndex : 0,                             //列表页码
                tablePageSize : 20,                             //列表每页条数
                tableDataSource : [],                           //列表内容
                tableTotal : 0,                                 //列表条数
                tableSelectedRowKeys : [],                      //列表选中项的key
                tableSelectedRow : [],                          //列表选中项数组
            }
            return { ...state, ...obj };
        }
    },
};
