import React, { PropTypes } from 'react';
import { message } from 'antd';
import { connect } from 'dva';
import qs from 'qs';
import StuUseClassChartTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import StuUseClassChartComponent from '../../../../components/report-form/teaching-report/stu-use-class-sheet/StuUseClassCharts';
import { getSsToken } from '../../../../utils/getSsToken';

function StuUseClassChartPage({ dispatch, stuUseClassChartModel }) {
    let {
		firstEnter,

		loading,

		courseList,
        organList,
		birthdayList,
		teacherList,
		salesList,
		counselorList,

		searchContent


    } = stuUseClassChartModel;

	/*点击生成报表*/
	function GeneratingReports( values ){
		dispatch({
			type : 'stuUseClassChartModel/generatingReports',
			payload : {
				values
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

	/*按课程导出数据*/
	function exportRecordByCourse(){
		let exportPath = `${BASE_URL}/erpStatsCost/exportByCourse?${qs.stringify(searchContent)}`;
        if( courseList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

    /*按机构导出数据*/
    function exportByOrgan(){
        let exportPath = `${BASE_URL}/erpStatsCost/exportByOrg?${qs.stringify(searchContent)}`;
        if( organList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
    }

	/*按老师导出数据*/
	function exportByTeacher(){
		let exportPath = `${BASE_URL}/erpStatsCost/exportByTeacher?${qs.stringify(searchContent)}`;
        if( teacherList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*按负责销售导出数据*/
	function exportBySales(){
		let exportPath = `${BASE_URL}/erpStatsCost/exportBySeller?${qs.stringify(searchContent)}`;
        if( salesList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*按负责顾问导出数据*/
	function exportByCounselor(){
		let exportPath = `${BASE_URL}/erpStatsCost/exportByCounselor?${qs.stringify(searchContent)}`;
        if( counselorList.length == '0' ){
            return message.warn('无查询结果可导出');
        }else{
			exportData( exportPath )
		}
	}

	/*头部 参数*/
	let stuUseClassChartTopProps = {
		firstEnter,

        GeneratingReports,      //点击生成报表
		buttonLoading : loading
	}

	/*报表主体 参数*/
	let stuUseClassChartComponnetProps = {
		loading,

		courseList,
        organList,
		birthdayList,
		teacherList,
		salesList,
		counselorList,

		exportRecordByCourse,            /*按课程导出数据*/
        exportByOrgan,                   /*按机构导出数据*/
		exportByTeacher,                 /*按老师导出数据*/
		exportBySales,                   /*按负责销售导出数据*/
		exportByCounselor,               /*按负责顾问导出数据*/

	}

    return (
        <div style = {{ height : '100%' }} >
			<StuUseClassChartTop { ...stuUseClassChartTopProps } />
			<StuUseClassChartComponent { ...stuUseClassChartComponnetProps } />
        </div>
  );
}


function mapStateToProps({ stuUseClassChartModel }) {
  return { stuUseClassChartModel };
}

export default connect(mapStateToProps)(StuUseClassChartPage);
