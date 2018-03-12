import React from 'react';
import ReceiptListComponent from '../../../common/new-component/manager-list/ManagerList';
import { Icon, Popover } from 'antd';

function ReceiptList({
	receiptDataSource,
	receiptResultCount,
	receiptPageIndex,
	receiptPageSize,
	receiptLoading,

	/*方法*/
	receiptPageSizeChange,
	receiptPageIndexChange

}){
	let ReceiptListProps = {
		table : {
			isInDetail    : true,
            loading       : receiptLoading,
            dataSource    : receiptDataSource,
            columns : [
                {
					dataIndex : 'id',
					key       : 'id',
					title     : '收款单号',
					width     : 96,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text || '' }
						</Popover>
					)
				},{
					dataIndex : 'parentName',
					key       : 'parentName',
					title     : '签约联系人',
					width     : 96,
				},{
					dataIndex : 'paymentName',
					key       : 'paymentName',
					title     : '收款方式',
					width     : 96,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text || '' }
						</Popover>
					)
				},{
					dataIndex : 'acctNo',
					key       : 'acctNo',
					title     : '收款账号',
					width     : 96,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text || '' }
						</Popover>
					)
				},{
					dataIndex : 'realSerialNumber',
					key       : 'realSerialNumber',
					title     : '流水号',
					width     : 82,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text || '无' } trigger = 'hover' >
							{ text || '无' }
						</Popover>
					)
				},{
					dataIndex : 'money',
					key       : 'money',
					title     : '收款金额',
					width     : 96,
				},{
					dataIndex : 'realMoney',
					key       : 'realMoney',
					title     : '实际到账',
					width     : 96,
				},{
					dataIndex : 'createTime',
					key       : 'createTime',
					title     : '收款日期',
					width     : 130,
				},{
					dataIndex : 'receiverName',
					key       : 'receiverName',
					title     : '收款人',
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text || '无' } trigger = 'hover' >
							{ text || '无' }
						</Popover>
					)
				}
            ],
         },
		pagination : {
			total            : receiptResultCount,
			pageIndex        : receiptPageIndex,
			pageSize         : receiptPageSize,
			showTotal        : total => `总共 ${total} 条`,
//			showSizeChanger  : true,
			showQuickJumper  : true,
			onShowSizeChange : receiptPageSizeChange,
			onChange         : receiptPageIndexChange
		}
	}

	return (
		<ReceiptListComponent { ...ReceiptListProps } />
	)
}

export default ReceiptList;
