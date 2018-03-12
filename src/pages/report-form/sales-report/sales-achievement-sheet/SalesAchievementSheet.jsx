import React from 'react';
import qs from 'qs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import SalesAchievementSheetTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import SalesAchievementSheetTable from '../../../../components/report-form/sales-report/sales-achievement-sheet/SalesAchievementTable';

function SalesAchievementSheet({ dispatch, salesAchievementSheet }){

    let {
        firstEnter,                     //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        /*列表*/
        tableLoading,                   //列表加载状态
        topAllData,                     //总计列表数据
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tablePageIndex,                 //列表页码
        tablePageSize,                  //列表每页条数
        sortParams,                     //排序方式
        exportSearchContent,            //报表导出条件(没有分页信息)

        buttonLoading,                  //生成报表按钮加载状态

    } = salesAchievementSheet;

    function dp(path, obj){
		dispatch({
			type : path,
			payload : {
				...obj
			}
		});
	}

    //点击生成报表
    function GeneratingReports(data){
        dp('salesAchievementSheet/QueryList',{
            pageIndex : 0,
            pageSize : tablePageSize,
            exportSearchContent : data
        })
    }

    //table分页改变
    function TablePageOnChange(pagination, filters, sorter){
        dp('salesAchievementSheet/QueryList',{
                pageIndex : pagination.current - 1,
                pageSize : pagination.pageSize,
                exportSearchContent,
            }
        );
    }

    let SalesAchievementSheetTopProps = {
        dataTotal : tableTotal,
        exportPath : `${BASE_URL}/sellerReport/exportSellerPerforList?${qs.stringify(exportSearchContent)}`,
        GeneratingReports,          //点击生成报表
        searchContent : [
            {
                type : 'select' ,
                key : 'sortParam',
                placeholder : '排序方式',
                options : sortParams
            }
        ],
        firstEnter,                 //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        buttonLoading,              //生成报表按钮加载状态
    }

    //table整体属性
    let SalesAchievementSheetTableProps = {
        tableLoading,                   //列表加载状态
        topAllData,                     //总计列表数据
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tablePageIndex,                 //列表页码
        tablePageSize,                  //列表每页条数
        TablePageOnChange               //分页改变
    }

    return (
        <div style = {{ overflow : 'hidden' , height : '100%' }}>
            <SalesAchievementSheetTop { ...SalesAchievementSheetTopProps } style = {{ marginBottom : 20 }}/>
            <SalesAchievementSheetTable {...SalesAchievementSheetTableProps} />
        </div>
    )
};

function mapStateToProps ({ salesAchievementSheet }){
	return { salesAchievementSheet };
};

export default connect( mapStateToProps )( SalesAchievementSheet );
