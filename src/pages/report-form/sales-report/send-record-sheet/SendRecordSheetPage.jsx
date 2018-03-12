import React, { PropTypes } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import qs from 'qs';
import SendRecordSheetPageTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import SendRecordSheetComponent from '../../../../components/report-form/sales-report/send-record-sheet/SendRecordSheet';
import { getSsToken } from '../../../../utils/getSsToken';

function SendRecordSheetPage({ dispatch, sendRecordSheetModel }) {
    let {
		firstEnter,

		addSendClass,
		useSendClass,
		createContractSendClass,
		afterContractSendClass,

		costPeriodExtMoney,
		newPeriodExtMoney,
		newPurPeriodExtMoney,
		newSerPeriodExtMoney,

		exportSearchData,

		loading

    } = sendRecordSheetModel;

	let classByTypeList = [
		{ type : "新增数量", '数量' : Number(addSendClass.toFixed(2)), '成本' : Number(newPeriodExtMoney.toFixed(2)) },
		{ type : "消耗数量", '数量' : Number(useSendClass.toFixed(2)), '成本' : Number(costPeriodExtMoney.toFixed(2)) }
	]

	let classByTimeList = [
		{ type : "开合同时", '数量' : Number(createContractSendClass.toFixed(2)), '成本' : Number(newPurPeriodExtMoney.toFixed(2)) },
		{ type : "服务期间", '数量' : Number(afterContractSendClass.toFixed(2)), '成本' : Number(newSerPeriodExtMoney.toFixed(2)) }
	]

	/*点击生成报表*/
	function GeneratingReports( values ){
		dispatch({
			type : 'sendRecordSheetModel/generatingReports',
			payload : {
				exportSearchContent : values
			}
		})
	}

	function exportData( exportPath ){
        if( exportPath.indexOf('startDate') == -1 || exportPath.indexOf('endDate') == -1 ){
            return message.warn('请选择时间范围');
        }
		let sstoken = getSsToken();
        window.open( exportPath + '&sstoken=' + sstoken );
	}

	/*按照类型导出*/
	function exportFuncByType(){
		let exportPath = `${BASE_URL}/sellerReport/giveRecordExport?${qs.stringify(exportSearchData)}`;
        if( !addSendClass && !useSendClass ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*按时间导出*/
	function exportFuncByTime(){
		let exportPath = `${BASE_URL}/sellerReport/giveRecordExport?${qs.stringify(exportSearchData)}`;
        if( !createContractSendClass && !afterContractSendClass ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*头部 参数*/
	let sendRecordSheetPageTopProps = {
		firstEnter,
        GeneratingReports,      //点击生成报表
		buttonLoading    : loading
	}

	/*报表主体 参数*/
	let sendRecordSheetComponnetProps = {
		classByTypeList,
		classByTimeList,
		addSendClass,
		useSendClass,
		createContractSendClass,
		afterContractSendClass,
		loading,

		exportFuncByType,
		exportFuncByTime
	}

    return (
        <div style = {{ height : '100%' }} >
			<SendRecordSheetPageTop { ...sendRecordSheetPageTopProps } />
			<SendRecordSheetComponent { ...sendRecordSheetComponnetProps } />
        </div>
  );
}


function mapStateToProps({ sendRecordSheetModel }) {
  return { sendRecordSheetModel };
}

export default connect(mapStateToProps)(SendRecordSheetPage);
