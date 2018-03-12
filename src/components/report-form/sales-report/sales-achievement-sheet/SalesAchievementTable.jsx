import React from 'react';
import Media from 'react-media';
import { Popover , Icon , Table } from 'antd';
import { NullData , ProgressBar } from '../../../common/new-component/NewComponent';
import styles from './SalesAchievementTable.less';

/*销售业绩表*/
function TeacherTeachingTable({
    tableLoading,                   //列表加载状态
    topAllData,                     //总计列表数据
    tableDataSource,                //列表数据
    tableTotal,                     //列表条数
    tablePageIndex,                 //列表页码
    tablePageSize,                  //列表每页条数
    TablePageOnChange,              //分页改变
}) {

    const columnAll = [{
        width:80,
        title:'统计类型',
        dataIndex:'all',
        key:'all'
    }, {
        title: '新学员合同数',
        dataIndex: 'newPurNum',
        key: 'newPurNum',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },{
        title: '新学员合同金额',
        dataIndex: 'newPurMoney',
        key: 'newPurMoney',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },{
        title: '老学员合同数',
        dataIndex: 'renewPurNum',
        key: 'renewPurNum',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },{
        title: '老学员合同金额',
        dataIndex: 'renewPurMoney',
        key: 'renewPurMoney',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },{
        title: '总合同数',
        dataIndex: 'totalPurNum',
        key: 'totalPurNum',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    },{
        title: '总合同金额',
        dataIndex: 'totalPurMoney',
        key: 'totalPurMoney',
        width: 80,
        render : (text,record) => (
            <Popover placement="top" content={text} trigger="hover">
                { text }
            </Popover>
        )
    }];

    const columnDetail = [{
            width: 120,
            title: '姓名',
            dataIndex: 'userName',
            key: 'userName',
            render : (text,record) => (
                <Popover placement="top" content={text} trigger="hover">
                    { text }
                </Popover>
            )
        }, {
            title: '新签合同',
            width: 240,
            key: 'new',
			children: [{
                title: '新学员合同数',
                dataIndex: 'newPurchaseNum',
                key: 'newPurchaseNum',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '合同金额',
                dataIndex: 'newPurchaseMoney',
                key: 'newPurchaseMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '占比金额',
                dataIndex: 'newProportionMoney',
                key: 'newProportionMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            }]
        }, {
            title: '续费合同',
            width: 240,
            key: 'renew',
			children: [{
                title: '老学员合同数',
                dataIndex: 'renewPurchaseNum',
                key: 'renewPurchaseNum',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '合同金额',
                dataIndex: 'renewPurchaseMoney',
                key: 'renewPurchaseMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '占比金额',
                dataIndex: 'renewProportionMoney',
                key: 'renewProportionMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            }]
        }, {
            title: '合计',
            width: 240,
            key: 'all',
			children: [{
                title: '合同合计数',
                dataIndex: 'totalNum',
                key: 'totalNum',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '合同合计金额',
                dataIndex: 'totalMoney',
                key: 'totalMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            },{
                title: '占比合计金额',
                dataIndex: 'totalProportionMoney',
                key: 'totalProportionMoney',
                width: 80,
                render : (text,record) => (
                    <Popover placement="top" content={text} trigger="hover">
                        { text }
                    </Popover>
                )
            }]
        }];

    let paginationProps = {
        total : tableTotal,
        current : !isNaN(tablePageIndex) ? (tablePageIndex + 1) : 1,
        pageSize : tablePageSize,
        showQuickJumper : true,
        showTotal(){
            return '总共'+this.total+'条数据';
        }
    }

    return(
        <Media query="(max-width: 1350px)">
            { matches => matches ?
                <div className = {styles.allTable_s}>
                    <div className = 'zj_sales_achieve_table_common' style={{ padding : '0 20px' }}>
                        <Table
                            columns = {columnAll}
                            dataSource = { !!tableLoading ? [] : topAllData }
                            pagination = {false}
                            bordered
                            rowKey = "all"
                            locale = {{ emptyText : !!tableLoading ? <ProgressBar content = '统计中' height = '100px'/> : <NullData content = '暂时没有数据' height = { 100 }/> }}
                            scroll={{ x : 1000 }} />
                    </div>
                    <div className = 'zj_sales_achieve_table_common zj_sales_achieve_table' style={{ padding : 20 }}>
                        <Table
                            columns = { columnDetail }
                            dataSource = { !!tableLoading ? [] : tableDataSource }
                            pagination = { paginationProps }
                            onChange = { TablePageOnChange }
                            bordered
                            rowKey = "userId"
                            locale = {{ emptyText : !!tableLoading ? <ProgressBar content = '统计中' height = '300px'/> : <NullData content = '暂时没有数据' height = { 300 }/> }}
                            scroll={{ x : 1000 }} />
                    </div>
                </div>
                :
                <div className = {styles.allTable_l}>
                    <div className = 'zj_sales_achieve_table_common' style={{ padding : '0 20px' }}>
                        <Table
                            columns = { columnAll }
                            dataSource = { !!tableLoading ? [] : topAllData }
                            pagination = { false }
                            bordered
                            rowKey = "all"
                            locale = {{ emptyText : !!tableLoading ? <ProgressBar content = '统计中' height = '100px'/> : <NullData content = '暂时没有数据' height = { 100 }/> }}
                            scroll = {{ x : 1000 }} />
                    </div>
                    <div className = 'zj_sales_achieve_table_common zj_sales_achieve_table' style={{ padding : 20 }}>
                        <Table
                            columns = { columnDetail }
                            dataSource = { !!tableLoading ? [] : tableDataSource }
                            pagination = { paginationProps }
                            onChange = { TablePageOnChange }
                            bordered
                            rowKey = "userId"
                            locale = {{ emptyText : !!tableLoading ? <ProgressBar content = '统计中' height = '300px'/> : <NullData content = '暂时没有数据' height = { 300 }/> }}
                            scroll = {{ x : 1000 }} />
                    </div>
                </div>
            }
        </Media>
    );
}

//export default SalesAchievementTable;
export default TeacherTeachingTable;
