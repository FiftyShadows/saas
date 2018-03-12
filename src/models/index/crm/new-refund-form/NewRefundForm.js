import {
    GetUserBranch,              //获取当前用户的id，用来进行'我负责的退款'列表查询
    GetTableList,               //获取退款单列表
    GetStu,                     //新建退款单获取联系人下拉列表
    GetMemCard,                 //通过付费客户id获取会员卡下拉列表信息
    GetOrderId,                 //通过付费客户id获取合同下拉列表信息
    GetRefundDetail,            //获取退款信息(如果是退款，则直接请求退款信息；如果是退课时 需要再选合同之后获取退款信息)
    RefundCourseGetContract,    //退课时 需要再选合同之后获取退款信息,本接口就是请求合同号
    RefundFormCreateModalSubmit,//新建退款单modal点击提交
    GetRefundFormCheckDetail,   //点击审核获取当前项的详情
    RefundFormCheckModalPass,   //审核退款通过
    RefundFormCheckModalReject, //审核退款驳回
    GetRefundFormPrintDetail    //点击打印获取打印详情
} from '../../../../services/crm/new-refund-form/NewRefundForm';
import { message } from 'antd';
import { parse } from 'qs';
import moment from 'moment';

//学员请假
export default {

    namespace: 'newRefundForm',

    state: {
        wetherChangeRouter : false,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        defaultFirstOrgId : '',                         //新建选择校区时默认填写的orgId
        defaultFirstOrgName : '',                       //新建选择校区时校区选中项的orgName
        currentUids : '',                               //'我负责的退款'下的员工ID,用于查询
        refundFormType : 'all',                         //全部退款单(all)，我负责的退款(my)，审核退款(check)

        /*常用searchBar*/
        refundFastSearchContent : {},                   //快捷搜索栏搜索内容

        /*高级搜索*/
        refundRightSuperSearchVisible : false,          //高级搜索是否显示
        refundRightSuperSearchContent : {},             //高级搜索栏搜索内容

        /*table*/
        refundTableNewColumns : [],                     //选择列表是否显示字段是哪些
        refundTableLoading : false,                     //列表是否加载状态
        refundTablePageSize : 20,                       //列表数据每页条数
        refundTablePageIndex : 0,                       //列表数据第几页
        refundTableDataTotal : 0,                       //列表数据总共条数
        refundTableDataSource : [],                     //列表数据
        refundTableSelectedRowKeys : [],                //多选框选中项的id,若无id，则取到当前索引
        refundTableSelectedRows : [],                   //多选框选中的项的对象数组

        /*新建退款单modal*/
        refundFormCreateModalLoading : false,           //新建退款单modal加载状态
        refundFormCreateModalVisible : false,           //新建退款单modal是否显示
        refundFormCreateModalButtonLoading : false,     //新建退款单modal按钮加载状态
        refundFormCreateModalStu : [],                  //新建退款单modal校区下学员下拉列表
        refundFormCreateModalMemCard : [],              //新建退款单modal校区下的会员卡下拉列表
        refundFormCreateModalOrderId : [],              //新建退款单modal校区下的合同下拉列表
        refundFormCreateModalContractNum : [],          //新建退款单modal选择退课时合同号下拉列表
        refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
        refundFormCreateModalRefundDetail : undefined,  //退款信息

        /*波波会退款单modal*/
        refundFormCheckModalVisible : false,                //审核退款单modal是否显示
        refundFormCheckModalPassButtonLoading : false,      //审核退款单modal通过按钮加载状态
        refundFormCheckModalRejectButtonLoading : false,    //审核退款单modal驳回按钮加载状态
        refundFormCheckModalCheckDetail : {},               //审核退款单详情

        /*打印退款单modal*/
        refundFormPrintModalVisible : false,            //打印退款单modal是否显示
        refundFormPrintModalPrintType : '',             //打印退款单类型
        refundFormPrintData : {},                       //打印退款单选择退款类型以后接口返回的数据
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/crm_rorder_alllist') {
                    dispatch({
                        type:'GetTableList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 20,
                            condition : 'all',
                            refundFormType : 'all',
                            changeRouter : true     //表示切换路由
                        }
                    });
                }else if(pathname === '/crm_rorder_list'){
                    //获取当前用户的id，用来进行'我负责的退款'列表查询
                    dispatch({
                        type:'GetUserBranch',
                    });
                    //修改我的下属文案
                    dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType : '退款单',
                        }
                    });
                }else if(pathname === '/crm_rorder_checklist'){
                    dispatch({
                        type:'GetTableList',
                        payload:{
                            pageIndex : 0,
                            pageSize : 20,
                            refundFormType : 'check',
                            status : 1,
                            changeRouter : true     //表示切换路由
                        }
                    });
                }
            });
        },
    },

    effects: {
        //获取当前用户的id，用来进行'我负责的退款'列表查询
        *'GetUserBranch'({ payload },{ put , call , select }){
            let { ret } = yield call(GetUserBranch);
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'GetTableList',
                    payload:{
                        pageIndex : 0,
                        pageSize : 20,
                        seller : ret.userId,
                        refundFormType : 'my',
                        changeRouter : true     //表示切换路由
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取当前用户信息失败');
            }
        },

        //获取退款单列表
        *'GetTableList'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            let refundFormType = '';
            if(payload && payload.refundFormType){
                refundFormType = payload.refundFormType;
                delete payload.refundFormType;
            }
            if(payload && payload.changeRouter && payload.changeRouter == true){
                yield put({
                    type:'updateState',
                    payload:{
                        wetherChangeRouter : true
                    }
                })
                delete payload.changeRouter;
            }
            let fastSearchContent = payload.fastSearchContent || {};
            let superSearchContent = payload.superSearchContent || {};
            delete payload.fastSearchContent;
            delete payload.superSearchContent;
            let params = { ...payload , ...fastSearchContent , ...superSearchContent };
            let { ret } = yield call(GetTableList,parse(params));
            if( ret && ret.errorCode === 9000 ){
                let newRefundForm = yield select( state => state.newRefundForm );
                let Type = newRefundForm.refundFormType;
                yield put({
                    type:'updateState',
                    payload:{
                        wetherChangeRouter : false
                    }
                })
                if((ret.results).length == 0 && params.pageIndex > 0){
                    params.pageIndex -= 1;
                    let { ret } = yield call(GetTableList,parse(params));
                    if( ret && ret.errorCode === 9000 ){
                        yield put({
                            type:'updateState',
                            payload:{
                                refundFormType : refundFormType != '' && refundFormType != null && refundFormType != undefined ? refundFormType : Type,
                                currentUids : payload.seller || '',
                                defaultFirstOrgId : (window._init_data.firstOrg).key,
                                defaultFirstOrgName : (window._init_data.firstOrg).label,
                                refundTableDataSource : ret.results,
                                refundTableDataTotal : ret.data.resultCount,
                                refundTablePageIndex : ret.data.pageIndex,
                                refundTablePageSize : ret.data.pageSize,
                                refundTableSelectedRowKeys : [],
                                refundTableSelectedRows : [],
                            }
                        });
                    }else if(ret && ret.errorMessage){
                        message.error(ret.errorMessage);
                    }else{
                        message.error('获取退款单列表失败');
                    }
                }else{
                    yield put({
                        type:'updateState',
                        payload:{
                            refundFormType : refundFormType != '' && refundFormType != null && refundFormType != undefined ? refundFormType : Type,
                            currentUids : payload.seller || '',
                            defaultFirstOrgId : (window._init_data.firstOrg).key,
                            defaultFirstOrgName : (window._init_data.firstOrg).label,
                            refundTableDataSource : ret.results,
                            refundTableDataTotal : ret.data.resultCount,
                            refundTablePageIndex : ret.data.pageIndex,
                            refundTablePageSize : ret.data.pageSize,
                            refundTableSelectedRowKeys : [],
                            refundTableSelectedRows : [],
                        }
                    });
                }
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取退款单列表失败');
            }
            yield put({ type : 'closeTableLoading' });
        },

        //新建退款获取联系人信息
        *'GetStu'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            yield put({ type : 'showCreateModalLoading' });
            let orgName = '';
            if(payload && payload.orgName){
                orgName = payload.orgName;
                delete payload.orgName;
            }
            let { ret } = yield call(GetStu,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        defaultFirstOrgName : orgName || '',
                        refundFormCreateModalVisible : true,            //新建退款单modal是否显示
                        refundFormCreateModalStu : ret.results
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取校区下学员信息失败，无法新增');
            }
            yield put({ type : 'closeCreateModalLoading' });
            yield put({ type : 'closeTableLoading' });
        },

        //通过付费客户id获取会员卡下拉列表信息
        *'GetMemCard'({ payload },{ put , call , select }){
            yield put({ type : 'showCreateModalLoading' });
            let { ret } = yield call(GetMemCard,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCreateModalMemCard : ret.results
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取会员卡信息失败，无法新增');
            }
            yield put({ type : 'closeCreateModalLoading' });
        },

        //通过付费客户id获取合同下拉列表信息
        *'GetOrderId'({ payload },{ put , call , select }){
            yield put({ type : 'showCreateModalLoading' });
            let { ret } = yield call(GetOrderId,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCreateModalOrderId : ret.results
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取合同信息失败，无法新增');
            }
            yield put({ type : 'closeCreateModalLoading' });
        },

        //是退款，直接请求退款信息
        *'RefundMoneyGetDetail'({ payload },{ put , call , select }){
            yield put({ type : 'showCreateModalLoading' });
            let { ret } = yield call(GetRefundDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                if(payload.refundType == '1'){
                    //退费，取返回值的balance
                    yield put({
                        type:'updateState',
                        payload:{
                            refundFormCreateModalRefundDetail : ret.balance
                        }
                    });
                }else if(payload.refundType == '2'){
                    //退课时，取返回值的courseInfo
                    yield put({
                        type:'updateState',
                        payload:{
                            refundFormCreateModalRefundDetail : ret.courseInfo
                            //refundFormCreateModalRefundDetail : arr
                        }
                    });
                }
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取退款信息失败');
            }
            yield put({ type : 'closeCreateModalLoading' });
        },

        //退课时 需要再选合同之后获取退款信息,本接口就是请求合同号
        *'RefundCourseGetContract'({ payload },{ put , call , select }){
            yield put({ type : 'showCreateModalLoading' });
            let { ret } = yield call(RefundCourseGetContract,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                //退课时，则取返回值的courseInfo
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCreateModalContractNum : ret.results
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取合同信息失败');
            }
            yield put({ type : 'closeCreateModalLoading' });
        },

        //新建退款单modal点击提交
        *'RefundFormCreateModalSubmit'({ payload },{ put , call , select }){
            yield put({ type : 'showCreateModalButtonLoading' });
            let { ret } = yield call(RefundFormCreateModalSubmit,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success(ret.errorMessage || '新建退款单成功');
                let newRefundForm = yield select( state => state.newRefundForm );
                let refundFormType = newRefundForm.refundFormType;
                let refundTablePageSize = newRefundForm.refundTablePageSize;
                let refundTablePageIndex = newRefundForm.refundTablePageIndex;
                let currentUids = newRefundForm.currentUids;
                let refundFastSearchContent = newRefundForm.refundFastSearchContent;
                let refundRightSuperSearchContent = newRefundForm.refundRightSuperSearchContent;
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCreateModalVisible : false,           //新建退款单modal是否显示
                        refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
                        refundFormCreateModalRefundDetail : undefined,  //退款信息
                    }
                });
                if(refundFormType == 'all'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : refundTablePageIndex,
                            pageSize : refundTablePageSize,
                            condition : 'all',
                            fastSearchContent : refundFastSearchContent,
                            superSearchContent : refundRightSuperSearchContent,
                            refundFormType,
                        }
                    });
                }else if(refundFormType == 'my'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : refundTablePageIndex,
                            pageSize : refundTablePageSize,
                            seller : currentUids,
                            fastSearchContent : refundFastSearchContent,
                            superSearchContent : refundRightSuperSearchContent,
                            refundFormType,
                        }
                    });
                }else if(refundFormType == 'check'){
                    yield put({
                        type:'GetTableList',
                        payload:{
                            pageIndex : refundTablePageIndex,
                            pageSize : refundTablePageSize,
                            fastSearchContent : refundFastSearchContent,
                            superSearchContent : refundRightSuperSearchContent,
                            status : 1,
                            refundFormType,
                        }
                    });
                }
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('新建退款单失败');
            }
            yield put({ type : 'closeCreateModalButtonLoading' });
        },

        //点击审核获取当前项的详情
        *'GetRefundFormCheckDetail'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(GetRefundFormCheckDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCheckModalVisible : true,
                        refundFormCheckModalCheckDetail : ret.data
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取审核项详情失败');
            }
            yield put({ type : 'closeTableLoading' });
        },

        //审核退款单通过
        *'RefundFormCheckModalPass'({ payload },{ put , call , select }){
            yield put({ type : 'showCheckModalPassButtonLoading' });
            yield put({ type : 'showCheckModalRejectButtonLoading' });
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(RefundFormCheckModalPass,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('通过通过');
                let newRefundForm = yield select( state => state.newRefundForm );
                let refundFormType = newRefundForm.refundFormType;
                let refundTablePageSize = newRefundForm.refundTablePageSize;
                let refundTablePageIndex = newRefundForm.refundTablePageIndex;
                let currentUids = newRefundForm.currentUids;
                let refundFastSearchContent = newRefundForm.refundFastSearchContent;
                let refundRightSuperSearchContent = newRefundForm.refundRightSuperSearchContent;
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCheckModalVisible : false
                    }
                })
                //只需要刷新审核退款列表
                yield put({
                    type:'GetTableList',
                    payload:{
                        pageIndex : refundTablePageIndex,
                        pageSize : refundTablePageSize,
                        fastSearchContent : refundFastSearchContent,
                        superSearchContent : refundRightSuperSearchContent,
                        status : 1,
                        refundFormType,
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('退款单通过失败');
            }
            yield put({ type : 'closeCheckModalRejectButtonLoading' });
            yield put({ type : 'closeCheckModalPassButtonLoading' });
            yield put({ type : 'closeTableLoading' });
        },

        //审核退款驳回
        *'RefundFormCheckModalReject'({ payload },{ put , call , select }){
            yield put({ type : 'showCheckModalPassButtonLoading' });
            yield put({ type : 'showCheckModalRejectButtonLoading' });
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(RefundFormCheckModalReject,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                message.success('已驳回');
                let newRefundForm = yield select( state => state.newRefundForm );
                let refundFormType = newRefundForm.refundFormType;
                let refundTablePageSize = newRefundForm.refundTablePageSize;
                let refundTablePageIndex = newRefundForm.refundTablePageIndex;
                let currentUids = newRefundForm.currentUids;
                let refundFastSearchContent = newRefundForm.refundFastSearchContent;
                let refundRightSuperSearchContent = newRefundForm.refundRightSuperSearchContent;
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormCheckModalVisible : false
                    }
                })
                //只需要刷新审核退款列表
                yield put({
                    type:'GetTableList',
                    payload:{
                        pageIndex : refundTablePageIndex,
                        pageSize : refundTablePageSize,
                        fastSearchContent : refundFastSearchContent,
                        superSearchContent : refundRightSuperSearchContent,
                        status : 1,
                        refundFormType,
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('退款单驳回失败');
            }
            yield put({ type : 'closeCheckModalPassButtonLoading' });
            yield put({ type : 'closeCheckModalRejectButtonLoading' });
            yield put({ type : 'closeTableLoading' });
        },

        //点击打印获取打印详情
        *'GetRefundFormPrintDetail'({ payload },{ put , call , select }){
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(GetRefundFormPrintDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        refundFormPrintModalVisible : true,
                        refundFormPrintModalPrintType : ret.data.refundType,
                        refundFormPrintData : ret.data,
                    }
                });
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('退款单驳回失败');
            }
            yield put({ type : 'closeTableLoading' });
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload, };
        },
        //开启列表加载
        showTableLoading(state, action) {
            return { ...state, ...action.payload, refundTableLoading : true};
        },
        //关闭列表加载
        closeTableLoading(state, action) {
            return { ...state, ...action.payload, refundTableLoading : false};
        },
        //开启新增退款单modal加载
        showCreateModalLoading(state, action){
            return { ...state, ...action.payload, refundFormCreateModalLoading : true};
        },
        //关闭新增退款单modal加载
        closeCreateModalLoading(state, action){
            return { ...state, ...action.payload, refundFormCreateModalLoading : false};
        },
        //开启新增退款单modal按钮加载
        showCreateModalButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCreateModalButtonLoading : true};
        },
        //关闭新增退款单modal按钮加载
        closeCreateModalButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCreateModalButtonLoading : false};
        },
        //关闭新增退款单modal按钮加载
        showCheckModalPassButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCheckModalPassButtonLoading : true};
        },
        //关闭新增退款单modal按钮加载
        closeCheckModalPassButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCheckModalPassButtonLoading : false};
        },
        //关闭新增退款单modal按钮加载
        showCheckModalRejectButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCheckModalRejectButtonLoading : true};
        },
        //关闭新增退款单modal按钮加载
        closeCheckModalRejectButtonLoading(state, action){
            return { ...state, ...action.payload, refundFormCheckModalRejectButtonLoading : false};
        },
    },

}
