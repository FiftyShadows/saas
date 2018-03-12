import React from 'react';
import qs from 'qs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import ClassRoomRatioSheetTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import ClassRoomRatioSheetTable from '../../../../components/report-form/teaching-report/class-room-ratio-sheet/ClassRoomRatioSheetTable';

function ClassRoomRatioSheet({ dispatch, classRoomRatioSheetModel }){
    let {
		firstEnter,

		tableLoading,
		tablePageSize,
		tablePageIndex,
		tableResultCount,
		tableDataSource,

		exportData

    } = classRoomRatioSheetModel;

	//生成报表 显示列表
	function GeneratingReports( values ){
		let exportData = values;
		dispatch({
			type : 'classRoomRatioSheetModel/queryList',
			payload : {
				exportData,
				tablePageSize,
				tablePageIndex : 0
			}
		})
	}

	//分页生成报表 显示列表
	function paginationChange( tablePageIndex, tablePageSize ){
		dispatch({
			type : 'classRoomRatioSheetModel/queryList',
			payload : {
				exportData,
				tablePageSize,
				tablePageIndex : tablePageIndex - 1
			}
		})
	}

	/*教室利用率报表 头部*/
    let ClassRoomRatioSheetTopProps = {
		firstEnter,

        exportPath : `${ BASE_URL }/erpStatsRoom/export?${ qs.stringify(exportData) }`,
        GeneratingReports,      //点击生成报表
		dataTotal  : tableResultCount,
		buttonLoading : tableLoading
    }

	/*教室利用表 列表数据*/
	let ClassRoomRatioSheetTableProps = {
		tableLoading,
		tablePageSize,
		tablePageIndex,
		tableResultCount,
		tableDataSource,

		paginationChange
	}

    return (
        <div style = {{ overflow : 'hidden' , height : '100%'}}>
            <ClassRoomRatioSheetTop { ...ClassRoomRatioSheetTopProps } />
			<ClassRoomRatioSheetTable { ...ClassRoomRatioSheetTableProps } />
        </div>
    )
};

function mapStateToProps ({ classRoomRatioSheetModel }){
	return { classRoomRatioSheetModel };
};

export default connect( mapStateToProps )( ClassRoomRatioSheet );
