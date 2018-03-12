import React from 'react';
import qs from 'qs';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import StuAttendanceSheetTop from '../../../../components/common/report-form/report-form-top/ReportFormTop';
import StuAttendanceSheetTable from '../../../../components/report-form/teaching-report/stu-attendance-sheet/StuAttendanceSheetTable';

function StuAttendanceSheet({ dispatch, stuAttendanceSheet }){

    let {
        firstEnter,                     //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        /*列表*/
        tableLoading,                   //列表加载状态
        tableDataSource,                //列表数据
        tableTotal,                     //列表条数
        tablePageIndex,                 //列表页码
        tablePageSize,                  //列表每页条数
        sortParams,                     //下拉列表内容
        tabKey,                         //tab默认值
        exportSearchContent,            //报表导出条件(没有分页信息)

        buttonLoading,                  //生成报表按钮加载状态

    } = stuAttendanceSheet;

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
        dp('stuAttendanceSheet/QueryList',{
            pageIndex : 0,
            pageSize : tablePageSize,
            tabKey : data.tabKey,
            exportSearchContent : data
        })
    }

    //列表分页改变
    function TablePageOnChange(pageIndex,pageSize){
        dp('stuAttendanceSheet/QueryList',{
            pageIndex : pageIndex - 1 ,
            pageSize,
            tabKey,
            exportSearchContent
        });
    }

    let StuAttendanceSheetTopProps = {
        dataTotal : tableTotal,
        exportPath : `${BASE_URL}/erpStatsStuCheck/exportBy${tabKey}?${qs.stringify(exportSearchContent)}`,
        GeneratingReports,      //点击生成报表
        searchContent : [
            {
                type : 'select' ,
                key : 'tabKey',
                placeholder : '排序方式',
                render_key : 'key',
                render_value : 'label',
                options : sortParams
            }
        ],
        buttonLoading,          //生成报表按钮加载状态
        firstEnter,             //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
    }

    //table整体属性
    let StuAttendanceSheetTableProps = {
        tabKey,
        //小屏下table
        sTable : {
            loading : tableLoading,
            dataSource : tableDataSource,
            progressContent : '统计中',
            height : 297,
            xScroll : 900
        },
        //大屏下table
        lTable : {
            loading : tableLoading,
            dataSource : tableDataSource,
            progressContent : '统计中',
            xScroll : 900
        },
        pagination : {
            total : tableTotal,
            pageIndex : tablePageIndex,
            pageSize : tablePageSize,
            onChange : TablePageOnChange,
            onShowSizeChange : TablePageOnChange,
            showSizeChanger : true,
            showQuickJumper : true,
            showTotal : () => (`共${tableTotal}条`),
        }
    };

    return (
        <div style = {{ overflow : 'hidden' , height : '100%' }}>
            <StuAttendanceSheetTop { ...StuAttendanceSheetTopProps } />
            <StuAttendanceSheetTable {...StuAttendanceSheetTableProps} />
        </div>
    )
};

function mapStateToProps ({ stuAttendanceSheet }){
	return { stuAttendanceSheet };
};

export default connect( mapStateToProps )( StuAttendanceSheet );
