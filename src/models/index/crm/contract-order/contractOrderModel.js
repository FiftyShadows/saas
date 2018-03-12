import {
	getContractOrderList,              //得到合同订单列表

	passOrder,                         //审核通过订单
	rejectOrder,                       //审核不通过


	getPaymentList,                    //得到收款方式
	getBalance,                        //得到余额信息

	confirmReceiptContract,            //确认支付
    openContractOrder,                  //合同开通

    CheckWetherModalFile,              //导入文件时查看是不是模版文件
    ContractOrderImportPreview,         //获取预览表格
    ContractImportSubmit,               //批量导入合同提交
    PollingCheckImport                  //轮询查看合同是否导入完毕

}from '../../../../services/crm/contract-order/contractOrderService';
import React from 'react';
import { parse } from 'qs';
import { message } from 'antd';
export default {

  	namespace: 'contractOrderModel',

  	state: {

		wetherChangeRouter         : false,                     //是否切换路由，用于清空快捷搜索与高级搜索栏内容

		routerType                 : undefined,

		/*表格项参数*/
		dataSource                 : [],
		newColumns                 : [],
		resultCount                : 0,
		loading                    : false,
		pageIndex                  : 0,
		pageSize                   : 20,
		selectedRows               : [],
		selectedRowKeys            : [],
		selectedRecordIds          : [],

		/*搜索*/
		orderNum                   : undefined,                //合同编号
		stuCardId                  : undefined,                //会员卡编号
		mobile                     : undefined,                //手机号

		orderCreatePerson          : undefined,                //我的 跟我的下属

		/*高级搜索*/
		searchVisible              : false,
		orderNewOldStu             : undefined,                //签约类型
		signType                   : undefined,
		type                       : undefined,                //购买类型
		parentName                 : undefined,                //签约联系人
		orderState                 : undefined,                //审核状态
		receiptStatus              : undefined,                //收款状态
		createPersonName           : undefined,                //创建人姓名
		startTime                  : undefined,
		endTime                    : undefined,                //签约日期
		orgId                      : undefined,                //所属校区

		condition                  : undefined,

		/*审核*/
		checkContractOrderVisible  : false,
		currentItem                : {},

		/*收款参数*/
		receiptContractOrderVisible : false,
		receiptPaymentList          : [],
		balance                     : 0,
		receiptBtnLoading           : false,

        //合同批量导入modal
        contractOrderImportOrgId : '',                      //批量导入时选择校区ID
        contractOrderImportModalVisible : false,            //leads导入modal是否显示
        contractOrderImportModalButtonLoading : false,      //leads导入按钮加载状态
        contractOrderImportModalStep : 0,                   //leads导入进行的步数
        contractOrderImportRegex : {},                      //leads导入中的regex
        /*第一步*/
        contractOrderImportFirstSuc : false,                //第一步是否完成
        contractOrderImportModalExcelName : '请上传文件',    //leads导入上传文件名
        contractOrderImportModalExcelId : '',               //leads导入上传文件id
        contractOrderImportIsModal : false,                 //导入的文件是否是模板
        /*第二步*/
        secondStepTableTitle : [],                          //第二步表头
        secondStepTableDataSourse : [],                     //第二步列表数据
        secondStepTableDataTotal : [],                      //第二步列表数据数量
        /*第三步*/
        thirdLastButtonDisplay : 'inline-block',            //第三步中上一步按钮是否显示(点击确定后消失)
        lastStepChooseItem : undefined,                     //第三步选中的选项

        //导入成功提示框
        contractOrderImportSucAlertModalVisible : false,    //提示框是否显示
        contractOrderImportSucModalWetherImportAll : false, //是否全部上传完毕
        contractOrderImportSucAlertModalId : undefined,     //导出错误日志的id
        contractOrderImportSucAlertModalTitle : '',         //提示框标题
        contractOrderImportSucAlertModalContent : '',       //提示框内容

	},

  	subscriptions: {
		setup({ dispatch, history }) {
			history.listen(( { pathname, query }) => {
				let params = {
					pageIndex         : 0,
					pageSize          : 20,
					orderNumber       : undefined,
					stuCardId         : undefined,
                    mobile            : undefined,                //手机号

					orderCreatePerson : undefined,

					orderNewOldStu    : undefined,
					type              : undefined,
					parentName        : undefined,
					createPersonName  : undefined,
					startTime         : undefined,
					endTime           : undefined,
					orgId             : undefined,
//					wetherChangeRouter : true
				}

				if( pathname == '/crm_sorder_list' ) {
					/*我负责的合同*/
					dispatch({
						type : 'updateState',
						payload : {
							routerType : 100,
							condition  : undefined,
							orderState  : undefined,
							receiptStatus : undefined,
                            contractOrderImportOrgId : (window._init_data.firstOrg).key,
							...params
						}
					});
					dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType : '合同',
                        }
                    });
                    if(query.jump){
                        delete query.jump;
                        let params = query;
                        dispatch({
                            type : 'getContractOrderList',
                            payload:{
                                params
                            }
                        })
                    }else{
                        dispatch({
                            type : 'getContractOrderListParams',
                        })
                    }
					dispatch({
						type : 'contractOrderDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
              	}else if( pathname == '/crm_sorder_alllist' ){
					/*全部合同*/
					dispatch({
						type : 'updateState',
						payload : {
							routerType : 200,
							condition  : 'all',
							orderState  : undefined,
							receiptStatus : undefined,
                            contractOrderImportOrgId : (window._init_data.firstOrg).key,
							...params
						}
					})
					dispatch({
						type : 'getContractOrderListParams',
					})
					dispatch({
						type : 'contractOrderDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
				}else if( pathname == '/crm_sorder_checklist' ){
					/*审核合同*/
					dispatch({
						type : 'updateState',
						payload : {
							routerType : 300,
							condition  : 'all',
							orderState : '1',
							receiptStatus : undefined,
                            contractOrderImportOrgId : (window._init_data.firstOrg).key,
							...params
						}
					})
					dispatch({
						type : 'getContractOrderListParams',
					})
					dispatch({
						type : 'contractOrderDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
				}else if( pathname == '/crm_sorder_collectionlist' ){
					/*合同收款*/
					dispatch({
						type : 'updateState',
						payload : {
							routerType : 400,
							condition  : 'all',
							receiptStatus : '0,1',
							orderState    : undefined,
                            contractOrderImportOrgId : (window._init_data.firstOrg).key,
							...params
						}
					})
					dispatch({
						type : 'getContractOrderListParams',
						payload : {
						}
					})
					dispatch({
						type : 'contractOrderDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
				}
          	});
      	},
  	},

  	effects: {
		/*得到合同订单列表所需参数*/
		*getContractOrderListParams({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					wetherChangeRouter : true
				}
			})
			let state = yield select( state => state.contractOrderModel );
			let params = {
				pageSize          : state.pageSize,
				pageIndex         : state.pageIndex,

				/*常用搜索*/
				orderNumber       : state.orderNumber,
				stuCardId         : state.stuCardId,
                mobile            : state.mobile,                //手机号

				orderCreatePerson : state.orderCreatePerson,

				/*高级搜索*/
				orderNewOldStu    : state.orderNewOldStu,
				type              : state.type,
				parentName        : state.parentName,
				orderState        : state.orderState,
				createPersonName  : state.createPersonName,
				receiptStatus     : state.receiptStatus,
				startTime         : state.startTime,
				endTime           : state.endTime,
				orgId             : state.orgId,

				condition         : state.condition,
			}
			yield put({
				type : 'getContractOrderList',
				payload : {
					params
				}
			})
		},

		/*得到合同订单列表*/
		*getContractOrderList({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					loading : true
				}
			})
			let { params } = payload;
			let { ret } = yield call( getContractOrderList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource        : ret.results,
						resultCount       : ret.data.resultCount,
						selectedRows      : [],
						selectedRowKeys   : [],
						selectedRecordIds : [],
						wetherChangeRouter : false,
						...params
					}
				})
			}
			yield put({
				type : 'updateState',
				payload : {
					loading : false
				}
			})
		},

		/*常用搜索 重置*/
		*searchFunction({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.contractOrderModel );
			let params = {
				pageSize          : state.pageSize,
				pageIndex         : 0,

				orderCreatePerson : state.orderCreatePerson,

				/*高级搜索*/
				signType          : state.signType,
				type              : state.type,
				parentName        : state.parentName,
				orderState        : state.orderState,
				receiptStatus     : state.receiptStatus,
				createPersonName  : state.createPersonName,
				startTime         : state.startTime,
				endTime           : state.endTime,
				orgId             : state.orgId,

				condition         : state.condition,

				...values
			}
			yield put({
				type : 'getContractOrderList',
				payload : {
					params
				}
			})
		},

		/*高级搜索 重置*/
		*onSuperSearch({ payload },{ call, put, select }){
			let state = yield select( state => state.contractOrderModel );
			let routerType = state.routerType;
			let { values } = payload;
			let startTime = undefined;
			let endTime = undefined;
			if( !!values && !!values.time && values.time[0] && values.time[1] ){
				startTime = values.time[0].format('YYYY-MM-DD HH:mm:00')
				endTime = values.time[1].format('YYYY-MM-DD HH:mm:00')
			}
			let params = {
				pageSize          : state.pageSize,
				pageIndex         : 0,

				orderNum          : state.orderNum,
				stuCardId         : state.stuCardId,
				mobile            : state.mobile,

				orderCreatePerson : state.orderCreatePerson,

				/*高级搜索*/
				signType          : values.signType,
				type              : values.type,
				parentName        : values.parentName,
				orderState        : ( routerType == 300 && state.orderState ) || values.orderState || undefined,                //审核状态
				receiptStatus     : ( routerType == 400 && state.receiptStatus ) || values.receiptStatus || undefined,          //收款状态

				createPersonName  : values.createPersonName,
				orgId             : values.orgId,
				startTime,
				endTime,

				condition         : state.condition,

			}
			yield put({
				type : 'getContractOrderList',
				payload : {
					params
				}
			})
		},

		/*我的 我的下属*/
		*subordinateChange({ payload },{ call, put, select }){
			let state = yield select( state => state.contractOrderModel );
			let { values } = payload;
			let params = {
				pageSize          : state.pageSize,
				pageIndex         : state.pageIndex,

				/*常用搜索*/
				orderNumber       : state.orderNumber,
				stuCardId         : state.stuCardId,

				orderCreatePerson : values,

				/*高级搜索*/
				orderNewOldStu    : state.orderNewOldStu,
				type              : state.type,
				parentName        : state.parentName,
				orderState        : state.orderState,
				createPersonName  : state.createPersonName,
				receiptStatus     : state.receiptStatus,
				startTime         : state.startTime,
				endTime           : state.endTime,
				orgId             : state.orgId,

				condition         : state.condition,
			}
			yield put({
				type : 'getContractOrderList',
				payload : {
					params
				}
			})
		},

		/*选择列表项*/
		*rowSelectChange({ payload },{ call, put, select }){
			let { selectedRowKeys, selectedRows } = payload;
			yield put({
				type : 'updateState',
				payload : {
					selectedRowKeys,
					selectedRows,
					currentItem : !!selectedRows && selectedRows[0]
				}
			})
		},

		/*审核*/
		*confrimCheckContractOrder({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					checkContractBtnLoading : true,
					checkContractBtnFailLoading : true
				}
			})
			let { status, values } = payload;
			let state = yield select( state => state.contractOrderModel );
			let params = {
				orderId : !!state.currentItem && state.currentItem.orderNumber,
				...values
			}
			let ret = {};
			if( status == '1' ){
				/*审核通过*/
				ret = yield call( passOrder, ( params ));
			}else if( status == '0' ){
				ret = yield call( rejectOrder , ( params ))
			}
			if( ret && ret.ret && ret.ret.errorCode == 9000 ){
                message.success(ret && ret.ret && ret.ret.errorMessage ? ret.ret.errorMessage : '成功');
				yield put({
					type : 'getContractOrderListParams',
					payload : {}
				})
				yield put({
					type : 'updateState',
					payload : {
						checkContractOrderVisible : false,
						selectedRows              : [],
						selectedRowKeys           : []
					}
				})
				if( state.routerType == 300 ){
					yield put({
						type : 'contractOrderDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
				}
			}else{
				message.error( ret && ret.ret && ret.ret.errorMessage ? ret.ret.errorMessage : '操作失败' )
			}
			yield put({
				type : 'updateState',
				payload : {
					checkContractBtnLoading     : false,
					checkContractBtnFailLoading : false
				}
			})
		},

		/*打开收款模态框*/
		*receiptContractOrder({ payload },{ call, put, select }){
			let state = yield select( state => state.contractOrderModel );
			let cardId = !!state.currentItem && state.currentItem.stuCardId;
			let receiptContractOrderVisible = state.receiptContractOrderVisible;
			let balance = yield call( getBalance, ({ stuCardId : cardId }));
			if( balance && balance.ret && balance.ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						balance : balance.ret.data.balance || 0
					}
				})
			}
			let { ret } = yield call( getPaymentList );
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						receiptContractOrderVisible : true,
						receiptPaymentList          : ret.results
					}
				})
			}
		},

		/*支付成功*/
		*confirmReceiptContract({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					receiptBtnLoading : true
				}
			})
			let state = yield select( state => state.contractOrderModel );
			let { values } = payload;
			let params = {
				orderId   : !!state.currentItem && state.currentItem.orderNumber,
				bExtMoney : 0,
				payway    : JSON.stringify( values.payway )
			}
			let { ret } = yield call( confirmReceiptContract, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'getContractOrderListParams',
					payload : {}
				})
				yield put({
					type : 'updateState',
					payload : {
						receiptContractOrderVisible : false,
						selectedRows              : [],
						selectedRowKeys           : []
					}
				})
				if( state.routerType == 400 ){
					yield put({
						type : 'updateState',
						payload : {
							detailVisible : false
						}
					})
				}
			}else{
				message.error( ret && ret.errorMessage || '收款失败' )
			}
			yield put({
				type : 'updateState',
				payload : {
					receiptBtnLoading : false
				}
			})
		},

		/*分页*/
		*pagination({ payload },{ call, put, select }){
			let state = yield select( state => state.contractOrderModel );
			let params = {
				pageSize          : payload.pageSize,
				pageIndex         : payload.pageIndex - 1,

				orderNumber       : state.orderNumber,
				stuCardId         : state.stuCardId,

				orderCreatePerson : state.orderCreatePerson,

				/*高级搜索*/
				orderNewOldStu    : state.orderNewOldStu,
				type              : state.type,
				parentName        : state.parentName,
				orderState        : state.orderState,
				receiptStatus     : state.receiptStatus,
				createPersonName  : state.createPersonName,
				startTime         : state.startTime,
				endTime           : state.endTime,
				orgId             : state.orgId,

				condition         : state.condition,
			}
			yield put({
				type : 'getContractOrderList',
				payload : {
					params
				}
			})
		},

        //查看是不是模板文件
        *'CheckWetherModalFile'({ payload },{ call, put, select }){
            let name = payload.name;
            delete payload.name;
            let { ret } = yield call(CheckWetherModalFile,parse(payload));
            if(ret && ret.errorCode === 9000){
                if(ret.flag){
                    message.success('检测成功，该文件为模版文件');
                    yield put({
                        type:'updateState',
                        payload:{
                            contractOrderImportFirstSuc : true,
                            contractOrderImportIsModal : ret.flag,
                            contractOrderImportModalExcelId : payload.id,               //合同批量导入上传文件id
                            contractOrderImportModalExcelName : name,
                        }
                    });
                }else{
                    message.error('上传文件非模板文件，请重新上传');
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('文件检测失败');
            }
        },

        //获取预览表格
        *'ContractOrderImportPreview'({ payload },{ call, put, select }){
            yield put({ type:'showContractOrderImportModalButtonLoading' });
            let { ret } = yield call(ContractOrderImportPreview,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        contractOrderImportModalStep : 1,
                        contractOrderImportRegex : payload.regex,
                        secondStepTableTitle : ret.dataModelFields,
                        secondStepTableDataSourse : ret.results,             //第三步列表数据
                        secondStepTableDataTotal : ret.results.length,       //第三步列表数据数量
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取预览信息失败');
            }
            yield put({ type:'closeContractOrderImportModalButtonLoading' });
        },

        *'ContractImportSubmit'({ payload },{ call, put, select }){
            yield put({ type:'showContractOrderImportModalButtonLoading' });
            yield put({ type:'closeThirdButtonDisplay' });
            let { ret } = yield call(ContractImportSubmit,parse(payload));
            if(ret && ret.errorCode === 9000){
                let sleep = function(ms) {
                    return new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve()
                        }, ms);
                    });
                }
                yield sleep(5000);
                yield put({
                    type:'PollingCheckImport',
                    payload:{
                        orgId : ret.data.orgId,
                        logFileId : ret.data.logFileId
                    }
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('批量导入失败');
                yield put({ type:'clearUploadModal' });
                yield put({ type:'closeContractOrderImportModalButtonLoading' });
            }
        },

        //轮询查看合同是否导入完毕
        *'PollingCheckImport'({ payload },{ call, put, select }){
            yield put({ type:'showContractOrderImportModalButtonLoading' });
            yield put({ type:'closeThirdButtonDisplay' });
            let { ret } = yield call(PollingCheckImport,parse(payload));
            if(ret && ret.errorCode === 9000){
                let sleep = function(ms) {
                    return new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve()
                        }, ms);
                    });
                }
                if (!ret.data.complete) {
                    yield sleep(5000);
                    yield put({
                        type:'PollingCheckImport',
                        payload:{
                            orgId : payload.orgId,
                            logFileId : payload.logFileId
                        }
                    })
                }else{
                    yield put({ type:'clearUploadModal' })
                    yield put({
                        type:'updateState',
                        payload:{
                            //导入成功提示框
                            contractOrderImportSucAlertModalVisible : true,                 //提示框是否显示
                            contractOrderImportSucAlertModalId : ret.data.logFileId,        //导出错误日志的id
                            contractOrderImportSucAlertModalTitle : '导入完成',              //提示框标题
                            contractOrderImportSucAlertModalContent : (
                                <div>
                                    <div>成功{ ret.data.sucNum }条</div>
                                    <div>失败{ ret.data.failNum }条</div>
                                </div>
                            ),                       //提示框内容
                        }
                    });
                    if(ret.data.failNum != '0'){        //导入有失败，未完全导入，提醒下载错误日志
                        yield put({
                            type:'updateState',
                            payload:{
                                contractOrderImportSucModalWetherImportAll : false
                            }
                        });
                    }else{
                        yield put({                     //导入无失败
                            type:'updateState',
                            payload:{
                                contractOrderImportSucModalWetherImportAll : true
                            }
                        });
                    }
                    yield put({ type:'closeContractOrderImportModalButtonLoading' });
                }
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '批量导入失败');
                yield put({ type:'clearUploadModal' });
                yield put({ type:'closeContractOrderImportModalButtonLoading' });
            }
        },

        //合同开通
        *'openContractOrder'({ payload },{ call, put, select }){
            yield put({ type : 'showTableLoading' });
            let { ret } = yield call(openContractOrder,parse(payload));
            if(ret && ret.errorCode == '9000'){
                message.success('成功');
                yield put({
					type : 'getContractOrderListParams',
				})
				yield put({
					type : 'updateState',
					payload : {
						selectedRows              : [],
						selectedRowKeys           : []
					}
				})
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '开通失败')
            }
            yield put({ type : 'closeTableLoading' });
        },
  	},

  	reducers: {
		updateState( state, action ){
			return { ...state, ...action.payload };
		},
        showTableLoading(state, action){
            return { ...state , loading : true }
        },
        closeTableLoading(state, action){
            return { ...state , loading : false }
        },
        showContractOrderImportModalButtonLoading(state, action){
            return { ...state, contractOrderImportModalButtonLoading : true };
        },
        closeContractOrderImportModalButtonLoading(state, action){
            return { ...state, contractOrderImportModalButtonLoading : false };
        },
        showThirdButtonDisplay(state, action){
            return { ...state, thirdLastButtonDisplay : 'inline-block' };
        },
        closeThirdButtonDisplay(state, action){
            return { ...state, thirdLastButtonDisplay : 'none' };
        },
        clearUploadModal(state, action){
            return {
                ...state,
                contractOrderImportOrgId : (window._init_data.firstOrg).key,                    //批量导入时选择校区ID
                contractOrderImportModalVisible : false,            //leads导入modal是否显示
                contractOrderImportModalButtonLoading : false,      //leads导入按钮加载状态
                contractOrderImportModalStep : 0,                   //leads导入进行的步数
                contractOrderImportRegex : {},                      //leads导入中的regex
                /*第一步*/
                contractOrderImportFirstSuc : false,                //第一步是否完成
                contractOrderImportModalExcelName : '请上传文件',    //leads导入上传文件名
                contractOrderImportModalExcelId : '',               //leads导入上传文件id
                contractOrderImportIsModal : false,                 //导入的文件是否是模板
                /*第二步*/
                secondStepTableTitle : [],                          //第二步表头
                secondStepTableDataSourse : [],                     //第二步列表数据
                secondStepTableDataTotal : [],                      //第二步列表数据数量
                /*第三步*/
                thirdLastButtonDisplay : 'inline-block',            //第三步中上一步按钮是否显示(点击确定后消失)
                lastStepChooseItem : undefined,                     //第三步选中的选项
            };
        },
  	},
}
