import React from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import RefundFormTable from '../../../components/crm/new-refund-form/refund-form-table/RefundFormTable';
import RefundFormSuperSearch from '../../../components/crm/new-refund-form/refund-form-table/RefundFormSuperSearch';
import RefundFormCreateModal from '../../../components/crm/new-refund-form/refund-form-create/CreateModal';
import RefundFormCheckModal from '../../../components/crm/new-refund-form/refund-form-check/CheckModal';
import RefundFormPrintModal from '../../../components/crm/new-refund-form/refund-form-print/PrintModal';

/*退款单*/
function RefundForm({ dispatch , newRefundForm }) {

    let {
        wetherChangeRouter,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        defaultFirstOrgId,                      //新建选择校区时默认填写的orgId
        defaultFirstOrgName,                    //新建选择校区时校区选中项的orgName
        currentUids,                            //'我负责的退款'下的员工ID,用于查询
        refundFormType,                         //全部退款单(all)，我负责的退款(my)，审核退款(check)

        /*常用searchBar*/
        refundFastSearchContent,                //快捷搜索栏搜索内容

        /*高级搜索*/
        refundRightSuperSearchVisible,          //高级搜索是否显示
        refundRightSuperSearchContent,          //高级搜索栏搜索内容

        /*table*/
        refundTableNewColumns,                  //选择列表是否显示字段是哪些
        refundTableLoading,                     //列表是否加载状态
        refundTablePageSize,                    //列表数据每页条数
        refundTablePageIndex,                   //列表数据第几页
        refundTableDataTotal,                   //列表数据总共条数
        refundTableDataSource,                  //列表数据
        refundTableSelectedRowKeys,             //多选框选中项的id,若无id，则取到当前索引
        refundTableSelectedRows,                //多选框选中的项的对象数组

        /*新建退款单modal*/
        refundFormCreateModalLoading,           //新建退款单modal加载状态
        refundFormCreateModalVisible,           //新建退款单modal是否显示
        refundFormCreateModalButtonLoading,     //新建退款单modal按钮加载状态
        refundFormCreateModalStu,               //新建退款单modal校区下学员下拉列表
        refundFormCreateModalMemCard,           //新建退款单modal校区下的会员卡下拉列表
        refundFormCreateModalOrderId,           //新建退款单modal校区下的合同下拉列表
        refundFormCreateModalContractNum,       //新建退款单modal选择退课时合同号下拉列表
        refundFormCreateModalCourseDetail,      //新建退款单选择退课的课程详细信息数组
        refundFormCreateModalRefundDetail,      //退款信息

        /*驳回退款单modal*/
        refundFormCheckModalVisible,                //新建退款单modal是否显示
        refundFormCheckModalPassButtonLoading,      //新建退款单modal通过按钮加载状态
        refundFormCheckModalRejectButtonLoading,    //新建退款单modal驳回按钮加载状态
        refundFormCheckModalCheckDetail,            //审核退款单详情

        /*打印退款单modal*/
        refundFormPrintModalVisible,                //打印退款单modal是否显示
        refundFormPrintModalPrintType,              //打印退款单类型
        refundFormPrintData,                        //打印退款单选择退款类型以后接口返回的数据

    } = newRefundForm

    //复选框onChange事件
    function RefundTableSelectedRowOnChange(selectedRowKeys, selectedRows){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundTableSelectedRowKeys : selectedRowKeys,
                refundTableSelectedRows : selectedRows
            }
        });
    }

    //常用/快捷搜索栏点击搜索
    function RefundSearchBarOnSearch(data){
        if(refundFormType == 'all'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    condition : 'all',
                    fastSearchContent : data,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }else if(refundFormType == 'my'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    seller : currentUids,
                    fastSearchContent : data,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }else if(refundFormType == 'check'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    status : 1,
                    fastSearchContent : data,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }
    }

    //高级搜索点击搜索
    function RefundRightSuperSearchClick(data){
        if(refundFormType == 'all'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    condition : 'all',
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : data
                }
            });
        }else if(refundFormType == 'my'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    seller : currentUids,
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : data
                }
            });
        }else if(refundFormType == 'check'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    status : 1,
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : data
                }
            });
        }
    }

    //table点击高级搜索事件和高级搜索点击右上角的X
    function RefundSuperSearchOnSearch(){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundRightSuperSearchVisible : !refundRightSuperSearchVisible
            }
        });
    }

    //分页改变事件
    function RefundTablePageOnChange(pageIndex,pageSize){
        if(refundFormType == 'all'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    condition : 'all',
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }else if(refundFormType == 'my'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    seller : currentUids,
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }else if(refundFormType == 'check'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize : pageSize,
                    status : 1,
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : refundRightSuperSearchContent
                }
            });
        }
    }

    //下属变更时事件
    function SubordinateChange(id){
        if(refundFormType == 'my'){
            dispatch({
                type:'newRefundForm/GetTableList',
                payload:{
                    pageIndex : 0,
                    pageSize : refundTablePageSize,
                    seller : id,
                    fastSearchContent : refundFastSearchContent,
                    superSearchContent : refundRightSuperSearchContent,
                }
            });
        }
    }

    //列表控制显示行
    function RefundTableChangeColumns(refundTableNewColumns){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundTableNewColumns
            }
        });
    }

    //leftBars点击打印
    function RefundTableOnPrint(){
        if(refundTableSelectedRows.length != 1){
            message.warn('只能选中一项打印');
        }else{
            //获取当前项的详情
            dispatch({
                type:'newRefundForm/GetRefundFormPrintDetail',
                payload:{
                    id : refundTableSelectedRows[0].id
                }
            });
        }
    }

    //leftBars点击审核
    function RefundTableOnCheck(){
        if(refundTableSelectedRows.length != 1){
            message.warn('只能选中一项审核');
        }else if(refundTableSelectedRows[0].status != '1'){
            message.warn('只能审核待退款项');
        }else{
            //获取当前项的详情
            dispatch({
                type:'newRefundForm/GetRefundFormCheckDetail',
                payload:{
                    id : refundTableSelectedRows[0].id
                }
            });
        }
    }

    //审核退款单modal点击通过
    function RefundFormCheckModalPass(data){
        dispatch({
            type:'newRefundForm/RefundFormCheckModalPass',
            payload:{
                ...data
            }
        });
    }

    //审核退款单modal点击驳回
    function RefundFormCheckModalReject(data){
        dispatch({
            type:'newRefundForm/RefundFormCheckModalReject',
            payload:{
                ...data
            }
        });
    }

    //审核退款单modal关闭
    function RefundFormCheckModalCancel(){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCheckModalVisible : false,
                refundFormCheckModalPassButtonLoading : false,      //新建退款单modal通过按钮加载状态
                refundFormCheckModalRejectButtonLoading : false,    //新建退款单modal驳回按钮加载状态
                refundTableSelectedRowKeys : [],             //多选框选中项的id,若无id，则取到当前索引
                refundTableSelectedRows : [],                //多选框选中的项的对象数组
            }
        });
    }

    //点击新建退款单
    function RefundTableOnCreate(){
        //获取默认校区下的学员下拉列表内容
        dispatch({
            type:'newRefundForm/GetStu',
            payload:{
                orgId : defaultFirstOrgId,
                orgName : defaultFirstOrgName           //新建退款单需要传orgName,在此更新
            }
        });
    }

    //新建退款单校区选择onSelect事件
    function RefundFormCreateOrgOnSelect(orgId,orgName){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
                refundFormCreateModalRefundDetail : undefined,  //退款信息
            }
        });
        //获取学员信息
        dispatch({
            type:'newRefundForm/GetStu',
            payload:{
                orgId,
                orgName,                //新建退款单需要传orgName,在此更新
            }
        });
    }

    //新建退款单学员onChange事件
    function RefundFormStuOnChange(stuId){
        if(stuId != '' && stuId != null && stuId != undefined){
            dispatch({
                //销售用crm是通过付费客户查合同
                //type:'newRefundForm/GetMemCard',
                type:'newRefundForm/GetOrderId',
                payload:{
                    stuId
                }
            });
        }
    }

    //新建退款单合同onChange事件
    function RefundFormOrderOnChange(e){
        for(let i in refundFormCreateModalOrderId){
            if(e == refundFormCreateModalOrderId[i].id){
                dispatch({
                    type : 'newRefundForm/updateState',
                    payload : {
                        refundFormCreateModalRefundDetail : refundFormCreateModalOrderId[i].pay_money
                    }
                })
                break;
            }
        }
    }

    //新建退款单退款类型下拉列表onChange事件(退款和退课时需要请求不同的接口)
    function RefundFormRefundTypeOnChange(refundType,cardId){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
            }
        });
        //如果是退款，则直接请求退款信息；如果是退课时 需要再选合同之后获取退款信息
        if(refundType == '1'){    //退款
            //直接请求退款信息
            dispatch({
                type:'newRefundForm/RefundMoneyGetDetail',
                payload:{
                    refundType,
                    cardId
                }
            });
        }else if(refundType == '2'){    //退课时
            //获取合同号
            dispatch({
                type:'newRefundForm/RefundCourseGetContract',
                payload:{
                    cardId
                }
            });
        }
    }

    //新建退款单退课时选择合同号onChange事件
    function RefundFormPurchaseIdOnChange(refundType,purchaseId,cardId){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
            }
        });
        dispatch({
            type:'newRefundForm/RefundMoneyGetDetail',
            payload:{
                refundType,
                cardId,
                purchaseId
            }
        });
    }

    //新建退款单选择课时onChange事件
    function RefundFormPeriodInfoOnChange(course){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCreateModalCourseDetail : course
            }
        });
    }

    //新建退款单modal点击提交
    function RefundFormCreateModalSubmit(data){
        dispatch({
            type:'newRefundForm/RefundFormCreateModalSubmit',
            payload:{
                ...data
            }
        });
    }

    //新建退款单modal关闭方法
    function RefundFormCreateModalClose(){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormCreateModalVisible : false,           //新建退款单modal是否显示
                refundFormCreateModalButtonLoading : false,     //新建退款单modal按钮加载状态
                refundFormCreateModalCourseDetail : [],         //新建退款单选择退课的课程详细信息数组
                refundFormCreateModalRefundDetail : undefined,  //退款信息
            }
        });
    }

    //打印退款单modal关闭
    function RefundFormPrintModalCancel(){
        dispatch({
            type:'newRefundForm/updateState',
            payload:{
                refundFormPrintModalVisible : false,
                refundTableSelectedRowKeys : [],                //多选框选中项的id,若无id，则取到当前索引
                refundTableSelectedRows : [],                   //多选框选中的项的对象数组
            }
        });
    }


    /*高级搜索属性*/
    let RefundFormSuperSearchProps = {
        wetherChangeRouter,                             //是否切换路由，用于清空快捷搜索与高级搜索栏内容
        refundFormType,                                 //全部退款单(all)，我负责的退款(my)，审核退款(check)
        refundRightSuperSearchVisible,                  //高级搜索是否显示
        RefundRightSuperSearchClick,                    //高级搜索点击搜索或者重置
        RefundSuperSearchOnSearch,                      //点击右上角的X
    };

    /*新建退款单modal属性*/
    let RefundFormCreateModalProps = {
        defaultFirstOrgId,                      //新建选择校区时默认填写的orgId
        defaultFirstOrgName,                    //新建选择校区时校区选中项的orgName
        refundFormCreateModalLoading,           //新建退款单modal加载状态
        refundFormCreateModalVisible,           //新建退款单modal是否显示
        refundFormCreateModalButtonLoading,     //新建退款单modal按钮加载状态
        refundFormCreateModalStu,               //新建退款单modal校区下学员下拉列表
        refundFormCreateModalMemCard,           //新建退款单modal校区下的会员卡下拉列表
        refundFormCreateModalOrderId,           //新建退款单modal校区下的合同下拉列表
        refundFormCreateModalContractNum,       //新建退款单modal选择退课时合同号下拉列表
        refundFormCreateModalCourseDetail,      //新建退款单选择退课的课程详细信息数组
        refundFormCreateModalRefundDetail,      //退款信息

        RefundFormCreateOrgOnSelect,            //新建退款单校区选择onChange事件
        RefundFormStuOnChange,                  //新建退款单学员onChange事件
        RefundFormOrderOnChange,                //新建退款单合同onChange事件
        RefundFormRefundTypeOnChange,           //新建退款单退款类型下拉列表onChange事件(退款和退课时需要请求不同的接口)
        RefundFormPurchaseIdOnChange,           //新建退款单退课时选择合同号onChange事件
        RefundFormPeriodInfoOnChange,           //新建退款单选择课时onChange事件
        RefundFormCreateModalSubmit,            //新建退款单modal点击提交
        RefundFormCreateModalClose,             //新建退款单modal关闭方法
    }

    /*驳回退款单modal属性*/
    let RefundFormCheckModalProps = {
        refundFormCheckModalVisible,                //审核退款单modal是否显示
        refundFormCheckModalPassButtonLoading,      //审核退款单modal通过按钮加载状态
        refundFormCheckModalRejectButtonLoading,    //审核退款单modal驳回按钮加载状态
        refundFormCheckModalCheckDetail,            //审核退款单详情

        RefundFormCheckModalPass,                   //审核退款单modal点击通过
        RefundFormCheckModalReject,                 //审核退款单modal点击驳回
        RefundFormCheckModalCancel,                 //审核退款单modal关闭
    }

    /*打印退款单modal属性*/
    let RefundFormPrintModalProps = {
        refundFormPrintModalVisible,                //打印退款单modal是否显示
        refundFormPrintModalPrintType,              //打印退款单类型
        refundFormPrintData,                        //打印退款单选择退款类型以后接口返回的数据

        RefundFormPrintModalCancel,                 //打印退款单modal关闭
    }

    /*table整体属性*/
    let LeadsFollowTableProps = {
        refundFormType,                         //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
        search : {
            onSearch : (data) => RefundSearchBarOnSearch(data),
            onClear : (data) => RefundSearchBarOnSearch(data),
            wetherChear : wetherChangeRouter,
            subordinate : refundFormType == 'my' ? true : false,   //是否需要按下属过滤   默认false
            subordinateChange : (data) => SubordinateChange(data),  //下属变更时事件
            fields : [
                { key : 'id' ,
                  type : 'input' ,
                  placeholder : '退款单号' },
                { key : 'createName' ,
                  type : 'input' ,
                  placeholder : '创建人' },
                { key : 'purchaseId' ,
                  type : 'input' ,
                  placeholder : '合同号' }
            ],
        },
        table : {
            newColumns : refundTableNewColumns,
            changeColumns : RefundTableChangeColumns,
            loading : refundTableLoading,
            dataSource : refundTableDataSource,
            rowSelection : {
                selectedRowKeys : refundTableSelectedRowKeys,
                onChange : RefundTableSelectedRowOnChange,        //复选框onChange事件
            },
        },
        pagination : {
            total : refundTableDataTotal,
            pageIndex : refundTablePageIndex,
            pageSize : refundTablePageSize,
            onChange : RefundTablePageOnChange,
            onShowSizeChange : RefundTablePageOnChange,
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : () => (`共${refundTableDataTotal}条`),
        },
        leftBars : {
            label : '已选',
            labelNum : refundTableSelectedRows.length,
            btns : refundFormType == 'all' || refundFormType == 'my' ?
                                            [{label : '打印' , handle : () => RefundTableOnPrint() , confirm : false}] :
                   refundFormType == 'check' ?  [{label : '打印' , handle : () => RefundTableOnPrint() , confirm : false},
                                             {label : '审核' , handle : () => RefundTableOnCheck() , confirm : false}] : null
        },
        rightBars : {
            isSuperSearch : true,
            superSearchVisible : refundRightSuperSearchVisible,
            superSearch : RefundSuperSearchOnSearch,
            closeSearch : RefundSuperSearchOnSearch,
            btns : [{ label : '新建退款单' , handle : () => RefundTableOnCreate() }]
        }
    };

    return (
        <div style = {{ overflow : 'hidden', height : '100%' }}>
            <RefundFormTable {...LeadsFollowTableProps} />
            <RefundFormSuperSearch {...RefundFormSuperSearchProps}/>
            { refundFormCreateModalVisible ? <RefundFormCreateModal {...RefundFormCreateModalProps}/> : null }
            { refundFormCheckModalVisible ? <RefundFormCheckModal {...RefundFormCheckModalProps}/> : null }
            { refundFormPrintModalVisible ? <RefundFormPrintModal {...RefundFormPrintModalProps}/> : null }
        </div>
    );
}

function mapStateToProps({ newRefundForm }) {
    return { newRefundForm };
}

export default connect(mapStateToProps)(RefundForm);
