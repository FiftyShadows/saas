import React from 'react';
import { connect } from 'dva';
import { Modal, Button, Popover, Icon, message , notification } from 'antd';
import moment from 'moment';
import { StatusFlag , AlertModal } from '../../../components/common/new-component/NewComponent';
import ContractOrderComponent from '../../../components/common/new-component/manager-list/ManagerList';
import SuperSearch from '../../../components/common/new-component/super-search/SuperSearch';
import ContractOrderCreatePage from './ContractOrderCreatePage';
import ContractOrderDetailPage from './ContractOrderDetailPage';
import CheckContractOrder from '../../../components/crm/contract-order/contract-order-detail/CheckContractOrder';           //审核合同
import ContractOrderReceiptFormPage from './ContractOrderReceiptFormPage';       //订单支付
import ContractOrderImportModal from '../../../components/crm/contract-order/ContractOrderImportModal/ContractOrderImportModal';    //导入合同

function ContractOrderPage({ dispatch, contractOrderModel }) {
	let {
		wetherChangeRouter,             //路由跳转清空搜索栏
		routerType,

		/*表格项参数*/
		dataSource,
		newColumns,
		resultCount,
		loading,
		pageIndex,
		pageSize,
		selectedRows,
		selectedRowKeys,
		selectedRecordIds,
        orderState,
        startTime,
        endTime,

		/*高级搜索*/
		searchVisible,

		checkContractOrderVisible,
		currentItem,
		checkContractBtnLoading,
		checkContractBtnFailLoading,

		receiptContractOrderVisible,
		receiptPaymentList,
		balance,

		receiptBtnLoading,

        //合同批量导入modal
        contractOrderImportOrgId,                       //批量导入时选择校区ID
        contractOrderImportModalVisible,                //合同导入modal是否显示
        contractOrderImportModalButtonLoading,          //合同导入按钮加载状态
        contractOrderImportModalStep,                   //合同导入进行的步数
        contractOrderImportRegex,                       //合同导入中的regex
        /*第一步*/
        contractOrderImportFirstSuc,                    //第一步是否完成
        contractOrderImportModalExcelName,              //合同导入上传文件名
        contractOrderImportModalExcelId,                //合同导入上传文件id
        contractOrderImportIsModal,                     //导入的文件是否是模板
        /*第二步*/
        secondStepTableTitle,                           //第二步表头
        secondStepTableDataSourse,                      //第二步列表数据
        secondStepTableDataTotal,                       //第二步列表数据数量
        /*第三步*/
        thirdLastButtonDisplay,                         //第三步中上一步按钮是否显示(点击确定后消失)
        lastStepChooseItem,                             //第三步选中的选项

        //导入成功提示框
        contractOrderImportSucAlertModalVisible,        //提示框是否显示
        contractOrderImportSucModalWetherImportAll,     //是否全部上传完毕
        contractOrderImportSucAlertModalId,             //导出错误日志的id
        contractOrderImportSucAlertModalTitle,          //提示框标题
        contractOrderImportSucAlertModalContent,        //提示框内容

    } = contractOrderModel;

	/*常用搜索*/
	function searchFunction( values ){
		dispatch({
			type : 'contractOrderModel/searchFunction',
			payload : {
				values
			}
		})
	}

	/*常用重置*/
	function clearFunction(){
		dispatch({
			type : 'contractOrderModel/searchFunction',
			payload : {
				values : {
					orderNum    : undefined,
					stuCardId   : undefined,
					mobile      : undefined
				}
			}
		})
	}

	/*点击高级搜索*/
	function superSearchClick(){
		dispatch({
			type : 'contractOrderModel/updateState',
			payload : {
				searchVisible : !searchVisible
			}
		})
	}

	/*高级搜索*/
	function onSuperSearch( values ){
		dispatch({
			type : 'contractOrderModel/onSuperSearch',
			payload : {
				values
			}
		})
	}
	/*高级搜索重置*/
	function onSuperClear(){
		dispatch({
			type : 'contractOrderModel/onSuperSearch',
			payload : {
				values : {
					signType          : undefined,
					type              : undefined,
					parentName        : undefined,
					createPersonName  : undefined,
					startTime         : undefined,
					endTime           : undefined,
					orgId             : undefined
				}
			}
		})
	}

	/*改变表格显示项*/
	function changeColumns( newColumns ){
		dispatch({
			type : 'contractOrderModel/updateState',
			payload : {
				newColumns
			}
		})
	}
	/*分页*/
	function pageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'contractOrderModel/pagination',
			payload : {
				pageIndex,
				pageSize,
			}
		})
	}
	function pageIndexChange( pageIndex ){
		dispatch({
			type : 'contractOrderModel/pagination',
			payload : {
				pageIndex,
				pageSize,
			}
		})
	}

	/*选择表格列表项*/
	function rowSelectChange( selectedRowKeys, selectedRows ){
		dispatch({
			type : 'contractOrderModel/rowSelectChange',
			payload : {
				selectedRowKeys,
				selectedRows
			}
		})
	}

	/*创建合同*/
	function createContractOrder(){
		dispatch({
			type : 'contractOrderCreateModel/openContractOrderModal',
			payload : {

			}
		})
	}

	function refreshList(){
		dispatch({
			type : 'contractOrderModel/getContractOrderListParams',
			payload : {
			}
		})
	}

	/*显示详情*/
	function showContractOrderDetail( id, item ){
		dispatch({
			type : 'contractOrderDetailModel/showDetail',
			payload : {
				id : item.orderNumber,
				item,
				routerType
			}
		})
	}

	function subordinateChange( values ){
		dispatch({
			type : 'contractOrderModel/subordinateChange',
			payload : {
				values
			}
		})
	}

	/*审核合同订单*/
	function checkContractOrder(){
		if( !!selectedRowKeys && selectedRowKeys.length > 1 ){
			message.error( '只能选择一条合同进行审核' );
			return
		}
		dispatch({
			type : 'contractOrderModel/updateState',
			payload : {
				checkContractOrderVisible : true
			}
		})
	}
	/*关闭审核*/
	function cancelCheckContract(){
		dispatch({
			type : 'contractOrderModel/updateState',
			payload : {
				checkContractOrderVisible : false
			}
		})
	}
	/*审核通过或不通过*/
	function confirmCheckContractOrder( values, status ){
		dispatch({
			type : 'contractOrderModel/confrimCheckContractOrder',
			payload : {
				status,
				values
			}
		})
	}

	/*审核合同参数*/
	let checkContractOrderProps = {
		checkContractOrderVisible,
		currentItem,
		checkContractBtnLoading,
		checkContractBtnFailLoading,

		/*方法*/
		cancelCheckContract,
		confirmCheckContractOrder
	}

	/*收款合同订单*/
	function receiptContractOrder(){
		if( !!selectedRowKeys && selectedRowKeys.length > 1 || selectedRowKeys.length == 0 ){
			message.error( '只能选择一条合同进行收款' );
			return;
		}
		let currentItem = selectedRows[0];
		dispatch({
			type : 'contractOrderReceiptFormModel/openReceiptContract',
			payload : {
				currentItem
			}
		})
	}

	/*确认支付*/
	function confirmReceiptContract( values ){
		dispatch({
			type : 'contractOrderModel/confirmReceiptContract',
			payload : {
				values
			}
		})
	}
	/*取消支付*/
	function cancelReceiptContract(){
		dispatch({
			type : 'contractOrderModel/updateState',
			payload : {
				receiptContractOrderVisible : false
			}
		})
	}

    /*点击导入合同*/
    function ImportContractOrder(){
        dispatch({
            type:'contractOrderModel/updateState',
            payload:{
                contractOrderImportModalVisible : true,
                contractOrderImportModalStep : 0,
                contractOrderImportFirstSuc : false,               //第一步是否完成
                contractOrderImportModalExcelId : '',              //leads导入上传文件id
                contractOrderImportIsModal : false,                //导入的文件是否是模板
            }
        });
    }

    /*合同导入modal关闭*/
    function ContractOrderImportModalClose(){
        dispatch({ type:'contractOrderModel/clearUploadModal' });
    }

    /*点击modal内按钮*/
    function ModalOperation(type){
        if(type == 'first_next'){
            if(contractOrderImportIsModal){
                let regex = {
                    0 : "signType",
                    1 : "parentName",
                    2 : "stuName",
                    3 : "classPackName",
                    4 : "classPackNum",
                    5 : "payMoney",
                    6 : "leftPeriod",
                    7 : "startTime",
                    8 : "endTime",
                    9 : "extPeriod",
                    10 : "sellerName",
                    11 : "orderNum",
                    12 : "extPeriodReason",
                    13 : "signTime"
                };
                //获取预览表格
                dispatch({
                    type:'contractOrderModel/ContractOrderImportPreview',
                    payload:{
                        id : contractOrderImportModalExcelId,
                        regex : JSON.stringify(regex)
                    }
                });
            }else{
                message.error('上传文件非模板文件，请重新上传');
            }
        }else if(type == 'second_prestep'){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    contractOrderImportModalStep : 0
                }
            });
        }else if(type == 'second_next'){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    contractOrderImportModalStep : 2
                }
            });
        }else if(type == 'last_prestep'){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    contractOrderImportModalStep : 1
                }
            });
        }else if(type == 'finish'){
//            if(!lastStepChooseItem && lastStepChooseItem != 0){
//                return message.warn('请选择处理方式');
//            }else{
//                dispatch({
//                    type:'contractOrderModel/ContractImportSubmit',
//                    payload:{
//                        id : contractOrderImportModalExcelId,
//                        regex : contractOrderImportRegex,                   //合同导入中的regex
//                        //proMode : lastStepChooseItem
//                        proMode : '2'           //默认审核通过
//                    }
//                });
//            }
            dispatch({
                type:'contractOrderModel/ContractImportSubmit',
                payload:{
                    id : contractOrderImportModalExcelId,
                    regex : contractOrderImportRegex,                   //合同导入中的regex
                    //proMode : lastStepChooseItem
                    proMode : '2'           //默认审核通过
                }
            });
        }
    }

     /*第一步*/
        //点击下载数据模板
        function FirstStepDownLoadDataModal(){
            window.open(`${BASE_URL}/download/downloadStuInfoModel?type=3`);
        }

        //选择校区onChange事件
        function FirstStepOrgOnChange(orgId){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    contractOrderImportOrgId : orgId
                }
            });
        }

        //选择文件onChange事件
        function FirstStepUploadOnChange(info){
            if(!contractOrderImportOrgId && contractOrderImportOrgId != 0) {
				return message.warn('请选择校区');
			}

			if(info.file.status != 'uploading' && info.file.response && info.file.response.errorCode != 9000) {
                return message.error(info.file.response.errorMessage || '上传失败');
    		}

			if(info.file.status == 'done') {
                message.success(`上传成功,正在检测文件类型`);
                /*检查是不是模板文件*/
                dispatch({
                    type:'contractOrderModel/CheckWetherModalFile',
                    payload:{
                        id : info&&info.fileList.length > 0 && info.fileList[info.fileList.length - 1].response.id || undefined,
                        name : info.file.name,
                    }
                });
			}else if(info.file.status === 'error') {
			  	message.error(`上传失败`);
			}
        }

    /*第三步*/
        //第三步单选框onChange事件
        function LastStepRadioOnChange(e){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    lastStepChooseItem : e.target.value
                }
            });
        }

    //提示框点击确认/下载错误日志
    function ContractOrderImportSucAlertModalOnOk(){
        if(!!contractOrderImportSucModalWetherImportAll){
            dispatch({
                type:'contractOrderModel/updateState',
                payload:{
                    contractOrderImportSucAlertModalVisible : false
                }
            });
        }else{
            window.open(`${BASE_URL}/pur/download/downloadByFileSys?id=${contractOrderImportSucAlertModalId}`);
        }
    }

    //提示框点击关闭
    function ContractOrderImportSucAlertModalOnCancel(){
        dispatch({
            type:'contractOrderModel/updateState',
            payload:{
                contractOrderImportSucAlertModalVisible : false
            }
        });
    }

    //合同点击开通
    function openContractOrder(openStatus){
        let ids = [];
        let data = {};
        selectedRows.map((item,index) => { ids.push(item.orderNumber) } );
        data = { ids : ids.join(',') , openStatus };
        dispatch({
            type : 'contractOrderModel/openContractOrder',
            payload : {
                ...data
            }
        })
    }

	//合同收款参数
	let receiptContractOrderProps = {
		receiptContractOrderVisible,
		receiptPaymentList,

		currentItem,
		balance,

		receiptBtnLoading,

		confirmReceiptContract,
		cancelReceiptContract
	}

    let searchFields = [
        {
            key         : 'orderNum',
            type        : 'input',
            placeholder : '合同编号',
        },{
            key         : 'stuName',
            type        : 'input',
            placeholder : '客户名称',
        }
    ]

    if(routerType == 200){
        searchFields.splice(1,0,{
            key : 'openStatus',
            type : 'select',
            opt_key : 'key',
            opt_label : 'value',
            placeholder : '开通状态',
            options : [
                { key : '0' , value : '未处理' } , { key : '1' , value : '已开通' }
            ]
        })
    }

	let contractOrderComponentProps = {
        search : {
            onSearch  : searchFunction,
            onClear   : clearFunction,
			subordinate : routerType == 100,
			subordinateChange : subordinateChange,
			wetherChear : wetherChangeRouter,
            fields : searchFields
        },
		leftBars : {
			label : '已选',
			labelNum : selectedRows.length,
			btns : [
				{
					label : routerType == 200 ? '开通' : routerType == 300 ? '审核' : routerType == 400 ? '收款' : '',
					handle : routerType == 200 ? () => openContractOrder('1') : routerType == 300 ? checkContractOrder : routerType == 400 ? receiptContractOrder : '',
                    confirm : routerType == 200 ? true : false
				}
			]
		},
		rightBars : {
			isSuperSearch      : true,
			superSearch        : superSearchClick,
			superSearchVisible : searchVisible,
			btns               : [
                {
					label : '导入合同',
					handle : ImportContractOrder
				},
				{
					label : '新建合同',
					handle : createContractOrder
				}
			]
		},
        table : {
            loading       : loading,
            dataSource    : dataSource,
			xScroll       : 1600,
			newColumns    : newColumns,
			changeColumns : changeColumns,
            columns : [
                {
					dataIndex : 'orderNum',
					key       : 'orderNum',
					title     : '合同编号',
					width     : 120,
					render    : ( text, record ) => (
						<Popover placement = "top" content = { text } trigger = 'hover' >
							<a onClick = { () => showContractOrderDetail( text, record ) }>{ text }</a>
						</Popover>
					)
				},{
					dataIndex : 'orderNewOldstu',
					key       : 'orderNewOldstu',
					title     : '签约类型',
					width     : 96,
					render    : ( text, record ) => (
						<span>
							{ !!text && text == '0' ? '新签约' : text == '1' ? '续约' : '暂无' }
						</span>
					)
				},{
					dataIndex : 'parentName',
					key       : 'parentName',
					title     : '联系人',
					width     : 96,
				},{
					dataIndex : 'orderCreateTime',
					key       : 'orderCreateTime',
					title     : '签订日期',
					width     : 112,
				},{
					dataIndex : 'periodExpend',
					key       : 'periodExpend',
					title     : '合同期限',
					width     : 180,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { !!record && !!record.startTime && !!record.endTime && record.startTime + ' ~ ' + record.endTime } trigger = 'hover' >
							<span>
								{ !!record && !!record.startTime && !!record.endTime && record.startTime + ' ~ ' + record.endTime }
							</span>
						</Popover>
					)
				},{
					dataIndex : 'orderMoney',
					key       : 'orderMoney',
					title     : '合同金额',
					width     : 96,
				},{
					dataIndex : 'orderState',
					key       : 'orderState',
					title     : '审核状态',
					width     : 96,
					render    : ( text, record ) => (
						<StatusFlag type = { !!text && text == '0' ? 'gray' : text == '1' ? 'red' : text == '3' ? 'deep_red' : '' } >
							{ !!text && text == '1' ? '待审核' : text == '3' ? '已驳回' : text == '4' ? '已通过' : '暂无' }
						</StatusFlag>
					)
				},{
					dataIndex : 'receiptStatus',
					key       : 'receiptStatus',
					title     : '收款状态',
					width     : 96,
					render    : ( text, record ) => (
                        <div>
                            { text == '0' ? <StatusFlag type = 'red'>未收款</StatusFlag> :
                              text == '1' ? <StatusFlag type = 'yellow'>未结清</StatusFlag> :
                              text == '2' ? <StatusFlag type = 'green'>已结清</StatusFlag> : ''
                            }
                        </div>
					)
				},{
					dataIndex : 'openStatus',
					key       : 'openStatus',
					title     : '开通状态',
					width     : 96,
					render : (text,record) => (
                        <div>
                            { text == '0' ? <StatusFlag type = 'deep_red'>未处理</StatusFlag> :
                              text == '1' ? <StatusFlag type = 'green'>已开通</StatusFlag> : ''
                            }
                        </div>
                    )
				},{
					dataIndex : 'orderCreatePerson',
					key       : 'orderCreatePerson',
					title     : '创建人',
					width     : 112,
					render    : ( text, record ) => (
						<Popover placement = "top" content = { text } trigger = 'hover' >
							<span>{ text }</span>
						</Popover>
					)
				}
            ],
			rowSelection : (routerType == 200 || routerType == 300 || routerType ==  400) ? {
                selectedRowKeys  : selectedRowKeys,
                onChange         : rowSelectChange,
            } : undefined,
         },
		pagination : {
			total            : resultCount,
			pageIndex        : pageIndex,
			pageSize         : pageSize,
			showTotal        : total => `总共 ${total} 条`,
			showSizeChanger  : true,
			showQuickJumper  : true,
			onShowSizeChange : pageSizeChange,
			onChange         : pageIndexChange
		}
    };

	let superSearchProps = {
		searchVisible : searchVisible,
		closeSearch   : superSearchClick,
		wetherChear   : wetherChangeRouter,
		onSearch      : onSuperSearch,
		onClear       : onSuperClear,
		fields        : [
			{
				key         : 'orgId',
				type        : 'orgSelect',
				label       : '所属校区',
				options     : {
					width : 280,
					getPopupContainer : () => document.getElementById( 'super_search_wrap' )
				}
			},{
				key         : 'signType',
				type        : 'select',
				label       : '签约类型',
				placeholder : '签约类型',
				options     : [
					{ key : '0', label : '新签约' },
					{ key : '1', label : '续约' }
				]
			},{
				key         : 'type',
				type        : 'select',
				label       : '购买类型',
				placeholder : '购买类型',
				options     : [
					{ key : '1', label : '充值' },
					{ key : '2', label : '课时包' }
				]
			},{
				key         : 'parentName',
				type        : 'input',
				placeholder : '联系人',
				label       : '联系人'
			},{
				key         : 'orderState',
				type        : routerType == 300 ? '' : 'select',
				label       : '审核状态',
				placeholder : '审核状态',
				options     : [
					{ key : '1', label : '待审核' },
					{ key : '3', label : '已驳回' },
					{ key : '4', label : '已通过' },
				],
                initialValue : orderState
			},{
				key         : 'receiptStatus',
				type        : routerType == 400 ? '' : 'select',
				label       : '收款状态',
				placeholder : '收款状态',
				options     : [
					{ key : '0', label : '未收款' },
					{ key : '1', label : '未结清' },
                    { key : '2', label : '已结清' },
				]
			},{
				key              : 'time',
				type             : 'rangePicker',
				label            : '签约日期',
				startPlaceholder : '开始时间',
				endPlaceholder   : '结束时间',
                initialValue     : [ startTime != undefined ? moment(startTime,'YYYY-MM-DD HH:mm') : undefined, endTime != undefined ? moment(endTime,'YYYY-MM-DD HH:mm') : undefined ]
			},{
				key         : 'createPersonName',
				type        : 'input',
				placeholder : '创建人',
				label       : '创建人'
			}
		]
	}

	let ContractOrderCreatePageProps = {
		refreshList
	}

    //导入合同属性
    let ContractOrderImportModalProps = {
        contractOrderImportOrgId,                   //批量导入时选择校区ID
        contractOrderImportModalVisible,            //合同导入modal是否显示
        contractOrderImportModalButtonLoading,      //合同导入按钮加载状态
        contractOrderImportModalStep,               //合同导入进行的步数

        ModalOperation,                             //点击modal内按钮
        ContractOrderImportModalClose,              //合同导入modal关闭

        /*第一步*/
        contractOrderImportFirstSuc,                //第一步是否完成
        contractOrderImportModalExcelName,          //合同导入上传文件名
        FirstStepOrgOnChange,                       //选择校区onChange事件
        FirstStepUploadOnChange,                    //选择文件onChange事件
        FirstStepDownLoadDataModal,                 //点击下载数据模板

        /*第二步*/
        secondStepTableTitle,                       //第二步表头
        secondStepTableDataSourse,                  //第二步列表数据
        secondStepTableDataTotal,                   //第二步列表数据数量

        /*第三步*/
        thirdLastButtonDisplay,                     //第三步中上一步按钮是否显示(点击确定后消失)
        LastStepRadioOnChange,                      //第三步单选框onChange事件

    }

    //提示框属性
    let AlertModalProps = {
        visible : contractOrderImportSucAlertModalVisible,                      //提示框是否显示
        title : contractOrderImportSucAlertModalTitle,                          //提示框标题
        content : contractOrderImportSucAlertModalContent,                      //提示框内容
        onOk : ContractOrderImportSucAlertModalOnOk,                            //提示框点击下载
        onCancel : ContractOrderImportSucAlertModalOnCancel,                    //提示框点击取消
        footerEnsure : contractOrderImportSucModalWetherImportAll ? '确定' : '下载错误日志',
        footerCancel : '关闭'
    }

	return (
		<div style = {{ overflow : 'hidden', height : '100%' }}>
			<ContractOrderComponent { ...contractOrderComponentProps }/>
			<SuperSearch { ...superSearchProps } />
			<ContractOrderCreatePage { ...ContractOrderCreatePageProps } />
			<ContractOrderDetailPage />
			<CheckContractOrder { ...checkContractOrderProps } />
			<ContractOrderReceiptFormPage />
            { !!contractOrderImportModalVisible ? <ContractOrderImportModal {...ContractOrderImportModalProps}/> : null }
            { !!contractOrderImportSucAlertModalVisible ? <AlertModal {...AlertModalProps}/> : null }
		</div>
	)
}
//			<ReceiptContractOrder { ...receiptContractOrderProps } />
function mapStateToProps({ contractOrderModel }) {
  	return { contractOrderModel };
}

export default connect(mapStateToProps)(ContractOrderPage);
