import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import AccountDetailsComponent from '../../../../components/system/payment-center/account-details/AccountDetailsComponent';

function AccountDetailsPage({ dispatch, accountDetailsModel }){
    let {
        accountBalance,
        availableBalance,
        tableLoading,
		routeChange,
        isChecked,
        isPickOn,
        accountFlowData,
        accountFlowNewColumns,
        accountFlowNewColumns1,
        hasPhoneNum,
        showAlertModal,
        alertModalButtonLoading,
        showXuzhiModal,
        mentionStates,
        mentionWay,
        mentionPhone,
        pageIndex,
        pageSize,
        total,
        changeState,
        tixianjine,

    } = accountDetailsModel;

    //表格的设置
    function accountFlowChangeColumns(accountFlowNewColumns) {
        dispatch({
            type:'accountDetailsModel/updateState',
            payload:{
                accountFlowNewColumns,
                accountFlowNewColumns1 : []
            }
        });
    }
     //表格的设置
    function accountFlowChangeColumns1(accountFlowNewColumns1) {
        dispatch({
            type:'accountDetailsModel/updateState',
            payload:{
                accountFlowNewColumns1,
                accountFlowNewColumns : []
            }
        });
    }

    //账户流水表格
	function accountFlow(){
        dispatch({
            type:'accountDetailsModel/getAccountFlow',
            payload:{
                pageSize : 20,
                pageIndex : 0,

            }
        });
    }

    //提现记录表格
    function withdrawalsRecord(){
        dispatch({
            type:'accountDetailsModel/getWithdrawalsRecord',
            payload:{
                pageSize : 20,
                pageIndex : 0,

            }
        });

    }

    //提现申请 弹框显示
    function applicationFun(){
        dispatch({
            type:'accountDetailsModel/getApplication',
            payload:{

            }
        })
    }

    //弹框取消
    function AlertModalOnCancelFun(){
        dispatch({
            type:'accountDetailsModel/updateState',
            payload:{
                showAlertModal : false,
            }
        });
    }

    //提现须知 弹框显示
    function remindedFun(){
        dispatch({
            type:'accountDetailsModel/updateState',
            payload:{
                showXuzhiModal : true,
            }
        });
    }

    //提现须知弹框取消
    function CancelXuzhiModal(){
        dispatch({
            type:'accountDetailsModel/updateState',
            payload:{
                showXuzhiModal : false,
            }
        });
    }

    //获取验证码
    function verificationCodeFun(mobile){
//        dispatch({
//            type: 'accountDetailsModel/VerificationCode',
//            payload : {
//                ...params,
//            },
//        });
        dispatch({
            type: 'veryCodeButtonModel/sendVerifyCode',
            payload : {
                mobile,
            },
        });
    }



    //提现申请提交
    function mentionSubmitAction(params){
        dispatch({
            type: 'accountDetailsModel/submitAction',
            payload : {
                ...params,
            },
        });

    }

    //分页
    function pageIndexChange(pageIndex,pageSize){
        if(isChecked){
             dispatch({
                type:'accountDetailsModel/getAccountFlow',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize,
                }
            })
        }else{
            dispatch({
                type:'accountDetailsModel/getWithdrawalsRecord',
                payload:{
                    pageIndex : pageIndex - 1,
                    pageSize,
                }
            })
        }
    }

    //马上去设置
    function changeRoute(){
        if( mentionStates == 10000){
            dispatch( routerRedux.push('/sys_scfg_safety') );
            dispatch({
                type:'accountDetailsModel/updateState',
                payload:{
                    showAlertModal : false,
                }
            });
        }else if( mentionStates == 20000 || mentionStates == 30000 ){
            dispatch( routerRedux.push('/sys_scfg_payacct_list') );
            dispatch({
                type:'accountDetailsModel/updateState',
                payload:{
                    showAlertModal : false,
                }
            });
        }
    }

    let AccountDetailsProps = {
        accountBalance,
        availableBalance,
        tableLoading,
        routeChange,
        isChecked,
        isPickOn,
        accountFlow,
        withdrawalsRecord,
        accountFlowData,
        accountFlowNewColumns,
        accountFlowChangeColumns,
        accountFlowNewColumns1,
        accountFlowChangeColumns1,
        applicationFun,
        hasPhoneNum,
        showAlertModal,
        AlertModalOnCancelFun,
        alertModalButtonLoading,
        CancelXuzhiModal,
        showXuzhiModal,
        remindedFun,
        mentionStates,
        mentionWay,
        mentionPhone,
        mentionSubmitAction,
        verificationCodeFun,
        pageIndex,
        pageSize,
        total,
        pageIndexChange,
        changeRoute,
        tixianjine,
    };


    return (
        <AccountDetailsComponent { ...AccountDetailsProps } />
    )
};

function mapStateToProps ({ accountDetailsModel }){
	return { accountDetailsModel };
};

export default connect( mapStateToProps )( AccountDetailsPage );
