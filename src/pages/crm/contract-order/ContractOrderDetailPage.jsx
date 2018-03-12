import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Popover, Tabs, Button, Modal } from 'antd';
import { StatusFlag, NewModal} from '../../../components/common/new-component/NewComponent';
import DetailHeader from '../../../components/crm/contract-order/contract-order-detail/DetailHeader';
import ReceiptList from '../../../components/crm/contract-order/contract-order-detail/ReceiptList';
import ContractOrderDetail from '../../../components/crm/contract-order/contract-order-detail/ContractOrderDetail';         //合同详情
import SendClassList from '../../../components/crm/contract-order/contract-order-detail/SendClassList';
import PrintContractOrder from '../../../components/common/print/print';                                                    //打印合同
import CheckContractOrder from '../../../components/crm/contract-order/contract-order-detail/CheckContractOrder';           //审核合同
import ReceiptContractOrder from '../../../components/crm/contract-order/contract-order-detail/ReceiptContractOrder';       //订单支付
import { do_print } from '../../../utils/printUtils';
import styles from './ContractOrderDetailPage.less';

const TabPane = Tabs.TabPane;

function ContractOrderDetailPage({ dispatch, contractOrderDetailModel }){
    let {
		detailVisible,

		activeKey,         //当前激活的tab
		currentItem,

		/*收款单*/
		receiptDataSource,
		receiptResultCount,
		receiptPageIndex,
		receiptPageSize,
		receiptLoading,

		/*赠课记录参数*/
		sendClassDataSource,
		sendClassResultCount,
		sendClassPageSize,
		sendClassPageIndex,
		sendClassLoading,

		/*打印信息*/
		printVisible,
		printData,

		/*审核合同参数*/
		checkContractOrderVisible,

		/*收款参数*/
		receiptContractOrderVisible,
		receiptPaymentList,
		balance,

		contractOrderDetail,


    } = contractOrderDetailModel;

	/*关闭详情*/
	function closeDetail(){
		dispatch({
			type : 'contractOrderDetailModel/updateState',
			payload : {
				detailVisible : false
			}
		})
	}

	function changeTab( activeKey ){
		dispatch({
			type : 'contractOrderDetailModel/changeTab',
			payload : {
				activeKey,
			}
		})
	}

	/*收款单*/
	function receiptPageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'contractOrderDetailModel/receiptPagination',
			payload : {
				receiptPageSize  : pageSize,
				receiptPageIndex : pageIndex,
			}
		})
	}
	function receiptPageIndexChange( pageIndex ){
		dispatch({
			type : 'contractOrderDetailModel/receiptPagination',
			payload : {
				receiptPageSize,
				receiptPageIndex : pageIndex,
			}
		})
	}

	/*赠送课时分页*/
	function sendClassPageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'contractOrderDetailModel/sendClassPagination',
			payload : {
				sendClassPageSize  : pageSize,
				sendClassPageIndex : pageIndex,
			}
		})
	}

	function sendClassPageIndexChange( pageIndex ){
		dispatch({
			type : 'contractOrderDetailModel/sendClassPagination',
			payload : {
				sendClassPageSize,
				sendClassPageIndex : pageIndex,
			}
		})
	}

	/*打开打印窗口*/
	function printContractOrder(){
		dispatch({
			type : 'contractOrderDetailModel/printContractOrder',
			payload : {
			}
		})
	}

	/*取消 关闭打印窗口*/
	function cancelPrintContractOrder(){
		dispatch({
			type : 'contractOrderDetailModel/updateState',
			payload : {
				printVisible : false
			}
		})
	}
	/*打印合同*/
	function printContractOrderClick(){
		do_print('js_pay_cost');
	}

	/*审核合同订单*/
	function checkContractOrder(){
		dispatch({
			type : 'contractOrderDetailModel/updateState',
			payload : {
				checkContractOrderVisible : true
			}
		})
	}
	/*关闭审核*/
	function cancelCheckContract(){
		dispatch({
			type : 'contractOrderDetailModel/updateState',
			payload : {
				checkContractOrderVisible : false
			}
		})
	}
	/*审核通过或不通过*/
	function confirmCheckContractOrder( values, status ){
		dispatch({
			type : 'contractOrderDetailModel/confrimCheckContractOrder',
			payload : {
				status,
				values
			}
		})
	}

	/*收款合同订单*/
	function receiptContractOrder(){
		dispatch({
			type : 'contractOrderDetailModel/receiptContractOrder',
			payload : {
			}
		})
	}

	/*确认支付*/
	function confirmReceiptContract( values ){
		dispatch({
			type : 'contractOrderDetailModel/confirmReceiptContract',
			payload : {
				values
			}
		})
	}
	/*取消支付*/
	function cancelReceiptContract(){
		dispatch({
			type : 'contractOrderDetailModel/updateState',
			payload : {
				receiptContractOrderVisible : false
			}
		})
	}

	/*编辑合同订单*/
	function updateContractOrder(){
		let orderId = currentItem.orderNumber;
		let updateOrgId = currentItem.organId;
		dispatch({
			type : 'contractOrderCreateModel/openContractOrderModal',
			payload : {
				orderId,
				updateOrgId
			}
		})
	}

	/*删除合同订单*/
	function deleteContractOrder(){
		let orderId = currentItem.orderNumber;
		dispatch({
			type : 'contractOrderDetailModel/deleteContractOrder',
			payload : {
				orderId
			}
		})
	}

	/*头部详情*/
	let headDeatilProps = {
		closeDetail,
		currentItem,

		printContractOrder,           //打印合同订单
		checkContractOrder,           //审核合同订单
		receiptContractOrder,         //收款合同订单
		updateContractOrder,          //编辑合同订单
		deleteContractOrder,          //删除合同订单
	}

	/*收款单列表*/
	let receiptListProps = {
		receiptDataSource,
		receiptResultCount,
		receiptPageIndex,
		receiptPageSize,
		receiptLoading,

		/*方法*/
		receiptPageSizeChange,
		receiptPageIndexChange
	}

	/*赠送课时列表*/
	let sendClassListProps = {
		sendClassDataSource,
		sendClassResultCount,
		sendClassPageSize,
		sendClassPageIndex,
		sendClassLoading,

		/*方法*/
		sendClassPageSizeChange,
		sendClassPageIndexChange,
	}

	/*审核合同参数*/
	let checkContractOrderProps = {
		checkContractOrderVisible,
		currentItem,

		/*方法*/
		cancelCheckContract,
		confirmCheckContractOrder
	}


	/*收款参数*/
	let receiptContractOrderProps = {
		receiptContractOrderVisible,
		receiptPaymentList,

		currentItem,
		balance,

		confirmReceiptContract,
		cancelReceiptContract
	}

	let contractOrderDetailProps = {
		currentItem,
		contractOrderDetail
	}

    return (
		<div className = 'common_detail' >
			<NewModal
				visible = { detailVisible }
				width = '900px'
				headVisible = { false }
				footer = '' >
				<DetailHeader { ...headDeatilProps } />
				<Tabs onChange = { changeTab } size = "small" activeKey = { activeKey } >
                    <TabPane tab = '合同详情' key = "1">
						<div className = 'vip_detail_content_item contract_order_detail_spe' style = {{ height : "calc(100vh - 260px)", overflow : 'auto' }} >
							<ContractOrderDetail { ...contractOrderDetailProps } />
						</div>
					</TabPane>
					<TabPane tab = '收款单' key = "3">
						<div className = 'vip_detail_content_item' >
							<ReceiptList { ...receiptListProps }  />
						</div>
					</TabPane>
                    {/*<TabPane tab = '赠课记录' key = "2">
						<div className = 'vip_detail_content_item' >
							<SendClassList { ...sendClassListProps }  />
						</div>
					</TabPane>*/}
				  </Tabs>
			</NewModal>
			<Modal
				title = '缴费信息'
				visible = { printVisible }
				okText = '保存'
				width = '800px'
				onCancel = { () => cancelPrintContractOrder() }
				footer = { null }
			>
				<PrintContractOrder data = { printData } />
				<div style = {{ textAlign : 'center', marginTop : '15px', clear: 'left', padding : '10px', height : '30px' }}>
					<Button	type = 'primary' onClick = { printContractOrderClick } style={{ float: 'right', marginRight: '-15px' }}>打印</Button>
				</div>
			</Modal>
			<CheckContractOrder { ...checkContractOrderProps } />
			<ReceiptContractOrder { ...receiptContractOrderProps } />
		</div>
    )
};

function mapStateToProps ({ contractOrderDetailModel }){
	return { contractOrderDetailModel };
};

export default connect( mapStateToProps )( ContractOrderDetailPage );
