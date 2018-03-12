
import { parse } from 'qs';
import { message } from 'antd';
import { showAccountFlow , showBalance , showWithdrawalsRecord , checkApplication , addSetSubmit , getVerificationCode , } from '../../../../../services/system/payment-center/account-details/AccountDetailsService'
export default {

    namespace: 'accountDetailsModel',

    state: {
        //账户余额
        accountBalance  :'',        //账户余额
        availableBalance:'',        //可用余额

        //账户流水，提现记录表格
        tableLoading    :false,
        routeChange     :false,     //tab切换
        isChecked       :true,      //账户流水 是否被选中
        isPickOn        :false,     //提现记录 是否被中
        accountFlowData : [],       //账户流水表格数据
        accountFlowNewColumns:[],   //账户流水表格>设置
        accountFlowNewColumns1: [],
        pageIndex       : 0,
        pageSize        : 20,
        total           : '',
        changeState     : '',

        //提现申请
        showAlertModal  : false,    //弹框是否显示
        alertModalButtonLoading : false, //弹框加载
        mentionStates : '',         //提现申请返回的状态
        mentionWay : '',            //提现方式
        mentionPhone : '',          //提现手机号

        //提现须知
        showXuzhiModal  : false,    //提现须知弹框显示


        tixianjine : '',
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/sys_pay_account') {

                    dispatch({
                        type : 'getBalance',
                        payload : {

                        }
                    });

                    dispatch({
                        type : 'getAccountFlow',
                        payload : {
                            pageSize :20,
                            pageIndex:0,
                        }
                    });

                }
            });
        },
    },

    effects: {

        //账户余额
        *getBalance({ payload }, { call, put, select }) {
            let { ret } = yield call(showBalance, parse(payload));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type : 'updateState',
                    payload : {
                        accountBalance      : ret.results.balance,
                        availableBalance    : ret.results.unbalance,
                    }
                })
            } else {
                ret && message.error(ret.errorMessage || '查询账户信息出错啦');
            }
        },

        //账户流水
        *getAccountFlow({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let accountDetailsModel = yield select(state => state.accountDetailsModel);
            let { ret } = yield call(showAccountFlow, parse(payload));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type : 'updateState',
                    payload : {
                        accountFlowData : ret.results,
                        isChecked : true,
                        isPickOn : false,
                        routeChange : false,
                        pageIndex : payload.pageIndex,
                        pageSize : payload.pageSize,
                        total : ret.data.resultCount,

                    }
                })

            } else {
                ret && message.error(ret.errorMessage || '查询账户流水出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
        },

        //提现记录
        *getWithdrawalsRecord({ payload }, { call, put, select }) {
            yield put ({ type : 'showTableLoading' });
            let accountDetailsModel = yield select(state => state.accountDetailsModel);
            let { ret } = yield call(showWithdrawalsRecord, parse(payload));
            if (ret && ret.errorCode == 9000) {
                yield put({
                    type : 'updateState',
                    payload : {
                        accountFlowData : ret.results,
                        isChecked : false,
                        isPickOn : true,
                        routeChange : false,
                        pageIndex : payload.pageIndex,
                        pageSize : payload.pageSize,
                        total : ret.data.resultCount,

                    }
                })

            } else {
                ret && message.error(ret.errorMessage || '查询提现记录出错啦');
            }
            yield put ({ type : 'closeTableLoading' });
        },

        //提现申请
        *getApplication({ payload }, { call, put, select }) {
            let { ret } = yield call(checkApplication, parse(payload));
            if(ret && ret.errorCode == 10000){
                yield put({
                    type : 'updateState',
                    payload : {
                        mentionStates : ret.errorCode,
                        showAlertModal : true,
                    }
                })
            }else if(ret && ret.errorCode == 20000){
                yield put({
                    type : 'updateState',
                    payload : {
                        mentionStates : ret.errorCode,
                        showAlertModal : true,
                    }
                })
            }else if (ret && ret.errorCode == 9000) {
               yield put({
                    type : 'updateState',
                    payload : {
                        mentionStates : ret.errorCode,
                        mentionWay : ret.results.name,
                        mentionPhone : ret.results.tel,
                        showAlertModal : true,
                    }
                })


            }else if( ret && ret.errorCode == 30000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        mentionStates : ret.errorCode,
                        showAlertModal : true,
                    }
                })
            } else {
                ret && message.error(ret.errorMessage || '查询信息出错！');
            }
        },

        //提现申请 提交
        *submitAction({ payload }, { call, put, select }) {
            let accountDetailsModel = yield select( state => state.accountDetailsModel );
            let parameter = {
                amount : payload.mentionShow,
                tel : accountDetailsModel.mentionPhone,
                vCode : payload.mentionPhoneVal,
                paymentKey : 'bank',
            }
            let { ret } = yield call(addSetSubmit, parse(parameter));
            if (ret && ret.errorCode == 9000) {
               yield put({
                    type : 'updateState',
                    payload : {
                        showAlertModal : false,
                    }
                })
               //更新展示余额
               yield put({
                    type : 'getBalance',
                    payload : {
                        accountBalance      : ret.results.balance,
                        availableBalance    : ret.results.unbalance,
                    }
                });
                //更新提现记录表格
                yield put({
                    type:'getWithdrawalsRecord',
                    payload:{
                        pageSize : 20,
                        pageIndex : 0,

                    }
                });
                ret && message.success('提现成功！');
            } else {
                ret && message.error(ret.errorMessage || '查询信息出错！');
            }
        },

        //获取验证码
        *VerificationCode({ payload }, { call, put, select }) {

            let accountDetailsModel = yield select( state => state.accountDetailsModel );

            let params = {
                mobile : accountDetailsModel.mentionPhone,
            }
            let { ret } = yield call(getVerificationCode, parse(params));
            if (ret && ret.errorCode == 9000) {
               yield put({
                    type : 'updateState',
                    payload : {

                    }
                })
            } else {
                ret && message.error(ret.errorMessage || '查询信息出错！');
            }
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state , ...action.payload };
        },
        showTableLoading(state,action){
            return { ...state , tableLoading : true };
        },
        closeTableLoading(state,action){
            return { ...state , tableLoading : false };
        },

    },
};
