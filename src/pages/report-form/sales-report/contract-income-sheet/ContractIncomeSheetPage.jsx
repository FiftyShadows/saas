import React, { PropTypes } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import qs from 'qs';
import ContractIncomeSheetPageTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import ContractIncomeSheetComponent from '../../../../components/report-form/sales-report/contract-income-sheet/ContractIncomeSheet';
import { getSsToken } from '../../../../utils/getSsToken';

function ContractIncomeSheetPage({ dispatch, contractIncomeSheetModel }) {
    let {
		firstEnter,

		newSignMoney,
		oldSignMoney,
		newStuMoney,
		oldStuMoney,
		incomeByClassPackageList,
		incomeByTeachingList,
		exportSearchContent,

		loading
    } = contractIncomeSheetModel;

	/*点击生成报表*/
	function GeneratingReports( values ){
		dispatch({
			type : 'contractIncomeSheetModel/generatingReports',
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

	function exportFuncByType(){
		let exportPath = `${BASE_URL}/sellerReport/exportSignType?${qs.stringify(exportSearchContent)}`;
        if( !newSignMoney && !oldSignMoney ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	//按学员类型导出
	function exportFuncByStu(){
		let exportPath = `${BASE_URL}/sellerReport/exportStuType?${qs.stringify(exportSearchContent)}`;
        if( !newStuMoney && !oldStuMoney ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	function exportFuncByPackage(){
		let exportPath = `${BASE_URL}/sellerReport/exportPeriodPackList?${qs.stringify(exportSearchContent)}`;
        if( incomeByClassPackageList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	function exportFuncByTeaching(){
		let exportPath = `${BASE_URL}/sellerReport/exportTeachAidList?${qs.stringify(exportSearchContent)}`;
        if( incomeByTeachingList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*头部 参数*/
	let contractIncomeSheetPageTopProps = {
		firstEnter,

        GeneratingReports,      //点击生成报表
		buttonLoading    : loading
	}

	/*报表主体 参数*/
	let contractIncomeSheetComponnetProps = {
		newSignMoney,
		oldSignMoney,
		newStuMoney,
		oldStuMoney,
		incomeByClassPackageList,
		incomeByTeachingList,

		loading,

		exportFuncByType,
		exportFuncByStu,
		exportFuncByPackage,
		exportFuncByTeaching
	}

    return (
        <div style = {{ height : '100%' }} >
			<ContractIncomeSheetPageTop { ...contractIncomeSheetPageTopProps } />
			<ContractIncomeSheetComponent { ...contractIncomeSheetComponnetProps } />
        </div>
  );
}


function mapStateToProps({ contractIncomeSheetModel }) {
  return { contractIncomeSheetModel };
}

export default connect(mapStateToProps)(ContractIncomeSheetPage);
