import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Popover } from 'antd';
import { StatusFlag } from '../../../components/common/new-component/NewComponent';
import VipManageComponent from '../../../components/common/new-component/manager-list/ManagerList';
import SuperSearch from '../../../components/common/new-component/super-search/SuperSearch';
import VipManageDetailPage from './VipManageDetailPage';

function VipManagePage({ dispatch, vipManageModel }){
    let {
        tableType,     //table类型('card'会员卡/'transfor'转课)
		/*搜索项*/
		id,
		orgId,
		stuName,
		parentName,

        fastSearchContent,         //快捷搜索内容

		/*高级搜索项*/
		searchVisible,
        superSearchContent,         //高级搜索内容

		loading,
		dataSource,
		newColumns,
		resultCount,
		pageIndex,
		pageSize,

    } = vipManageModel;

    /*改变表格显示项*/
	function changeColumns( newColumns ){
		dispatch({
			type : 'vipManageModel/updateState',
			payload : {
				newColumns : newColumns
			}
		})
	}

    //搜索
    function searchFunction(values){
        dispatch({
			type : 'vipManageDetailModel/updateState',
			payload : {
				detailVisible : false
			}
		})
        if(tableType == 'card'){
            dispatch({
                type : 'vipManageModel/getVipList',
                payload : {
                    pageIndex : 0,
                    pageSize,
                    fastSearchContent : values,
                    superSearchContent
                }
            })
        }else if(tableType == 'transCourse'){
            dispatch({
                type : 'vipManageModel/getTransCourseList',
                payload : {
                    pageIndex : 0,
                    pageSize,
                    fastSearchContent : values,
                    superSearchContent
                }
            })
        }
    };

    //改变分页
    function pageOnChange(pageIndex, pageSize){
        if(tableType == 'card'){
            dispatch({
                type : 'vipManageModel/getVipList',
                payload : {
                    pageIndex : pageIndex - 1,
                    pageSize,
                    fastSearchContent,
                    superSearchContent
                }
            })
        }else if(tableType == 'transCourse'){
            dispatch({
                type : 'vipManageModel/getTransCourseList',
                payload : {
                    pageIndex : pageIndex - 1,
                    pageSize,
                    fastSearchContent,
                    superSearchContent
                }
            })
        }
    };

	/*高级搜索点击事件*/
	function superSearchClick(){
		dispatch({
			type : 'vipManageModel/updateState',
			payload : {
				searchVisible : !searchVisible
			}
		})
	}

	/*高级搜索*/
	function onSuperSearch(values){
        if(tableType == 'card'){
            dispatch({
                type : 'vipManageModel/getVipList',
                payload : {
                    pageIndex : 0,
                    pageSize,
                    fastSearchContent,
                    superSearchContent : values,
                }
            })
        }else if(tableType == 'transCourse'){
            dispatch({
                type : 'vipManageModel/getTransCourseList',
                payload : {
                    pageIndex : 0,
                    pageSize,
                    fastSearchContent,
                    superSearchContent : values,
                }
            })
        }
	}

	/*显示详情页面*/
	function showVipDetail( record ){
		dispatch({
			type : 'vipManageDetailModel/showDetail',
			payload : {
				id : !!record && record.id,
				orgId : !!record && record.orgId
			}
		})
	}

    let vipManageComponentProps = {
        search : {
            onSearch      : searchFunction,
            onClear       : searchFunction,
            fields        : tableType == 'card' ?
                                [
                                    { key : 'stuName' , type : 'input' , placeholder : '请输入学员姓名搜索' },
                                    { key : 'parentName' , type : 'input' , placeholder : '请输入联系人姓名搜索' },
									{ key : 'mobile', type : 'input', placeholder : '请输入手机号搜索' },
                                ]
                                :
                            tableType == 'transCourse' ?
                                [
                                    { key : 'cardId' , type : 'input' , placeholder : '会员卡号' },
                                    { key : 'type' , type : 'select' , placeholder : '类型' ,
                                      options : [{ label : '全部' , key : '' },{ label : '平价' , key : '1' },{ label : '补缴' , key : '2' },{ label : '退费' , key : '3' }] },
                                    { key : 'stuName' , type : 'input' , placeholder : '适用学员' },
                                ]
                                :
                                []
        },
		rightBars : {
			isSuperSearch : true,
			superSearch : superSearchClick,
			superSearchVisible : searchVisible,
		},

        table : {
            loading       : loading,
            dataSource    : dataSource,
			xScroll       : tableType == 'card' ? 1600 : tableType == 'transCourse' ? 1200 : 0,
			newColumns    : newColumns,
			changeColumns : changeColumns,
            columns : tableType == 'card' ? [
                {
					dataIndex : 'id',
					key       : 'id',
					title     : '会员卡号',
					width     : '96px',
					render    : ( text, record ) => (
						<Popover placement = "top" content = { text } trigger = 'hover' >
							<a onClick = { () => showVipDetail( record ) }>{ text }</a>
						</Popover>
					)
				},{
					dataIndex : 'applicableStu',
					key       : 'applicableStu',
					title     : '适用学员',
					width     : '160px',
					render    : ( text, record ) => (
						<Popover placement = "top" content = {
							<span>
								{ !!text && text.map( (item, index) => {
									return <span key = { 'applicableStu' + index } style = {{ marginRight : '10px' }}>{ item.stuName }</span>
								}) }
							</span> } trigger = 'click' >
							<span style = {{ marginRight : '10px' }}>
								{ !!text && !!text[0] && text[0].stuName }
							</span>
							{ text && text.length > 1 &&
								<a>{ '共' + text.length + '人' }</a>
							}
						</Popover>
					)
				},{
					dataIndex : 'applicableParent',
					key       : 'applicableParent',
					title     : '适用联系人',
					width     : 150,
					render    : ( text, record ) => (
						<Popover placement = "top" content = {
							<span>
								{ !!text && text.map( (item, index) => {
									return <span key = { 'applicableParent' + index } style = {{ marginRight : '10px' }}>{ item.name }</span>
								}) }
							</span> } trigger = 'click' >
							<span style = {{ marginRight : '10px' }}>
								{ !!text && !!text[0] && text[0].name }
							</span>
							{ text && text.length > 1 &&
								<a>{ '共' + text.length + '人' }</a>
							}
						</Popover>
					)
				},{
					dataIndex : 'mobile',
					key       : 'mobile',
					title     : '手机号',
					width     : 82,
					render    : ( text, record ) => (
						<Popover placement = "top" content = {
							<span>
								{ !!record.applicableParent && record.applicableParent.map( (item, index) => {
									return <span key = { 'mobile' + index } style = {{ marginRight : record.applicableParent.length > 1 && index != record.applicableParent.length - 1 ? 10 : 0 }}>{ (item.name || '--') + ' : ' + (item.mobile || '--') }</span>
								}) }
							</span> } trigger = 'click' >
							<a>查看</a>
						</Popover>
					)
				},{
					dataIndex : 'periodAll',
					key       : 'periodAll',
					title     : '总课时(赠送)',
					width     : 110,
					render    : ( text, record ) => (
						<span>{ text + '（' + (record.periodExt || '0') + '）' }</span>
					)
				},{
					dataIndex : 'periodLeft',
					key       : 'periodLeft',
					title     : '剩余课时',
					width     : 96,
				},{
					dataIndex : 'periodAvailable',
					key       : 'periodAvailable',
					title     : '可用课时',
					width     : 96,
				},{
					dataIndex : 'periodForward',
					key       : 'periodForward',
					title     : '已预约课时',
					width     : 110,
				},{
					dataIndex : 'periodExpend',
					key       : 'periodExpend',
					title     : '已消耗课时',
					width     : 110,
				},{
					dataIndex : 'periodRefund',
					key       : 'periodRefund',
					title     : '已退课时',
					width     : 110,
				},{
					dataIndex : 'balance',
					key       : 'balance',
					title     : '余额',
					width     : 96,
				},{
					dataIndex : 'createTime',
					key       : 'createTime',
					title     : '创建时间',
					width     : 160,
				},{
					dataIndex : 'orgName',
					key       : 'orgName',
					title     : '所属校区',
					render    : ( text, record ) => (
						<Popover placement = "top" content = { text } trigger = 'hover' >
							<span>{ text }</span>
						</Popover>
					)
				}
            ]
            :
            tableType == 'transCourse' ?
            [   {
					dataIndex : 'cardId',
					key       : 'cardId',
					title     : '会员卡号',
					width     : '96px',
					render    : ( text, record ) => (
						<Popover placement = "top" content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
				},
                {
                    dataIndex : 'stuName',
                    key       : 'stuName',
                    title     : '适用学员',
                    width     : '160px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'orderNum',
                    key       : 'orderNum',
                    title     : '合同编号',
                    width     : '96px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'outCourseName',
                    key       : 'outCourseName',
                    title     : '转出课程',
                    width     : '96px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'outNum',
                    key       : 'outNum',
                    title     : '转出数量',
                    width     : '96px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'inCourseName',
                    key       : 'inCourseName',
                    title     : '转进课程',
                    width     : '96px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'inNum',
                    key       : 'inNum',
                    title     : '转进数量',
                    width     : '96px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'type',
                    key       : 'type',
                    title     : '类型',
                    width     : '68px',
                    render    : ( text, record ) => (
                        <div>
                            { text == '1' ? <StatusFlag>平价</StatusFlag> :
                              text == '2' ? <StatusFlag type = 'green'>补缴</StatusFlag> :
                              text == '3' ? <StatusFlag type = 'deep_red'>退费</StatusFlag> : '--' }
                        </div>
                    )
                },
                {
                    dataIndex : 'creatorName',
                    key       : 'creatorName',
                    title     : '创建人',
                    width     : '82px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'createTime',
                    key       : 'createTime',
                    title     : '创建时间',
                    width     : '160px',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
                {
                    dataIndex : 'orgName',
                    key       : 'orgName',
                    title     : '所属校区',
                    render    : ( text, record ) => (
                        <Popover placement = "top" content = { text } trigger = 'hover' >
                            { text }
                        </Popover>
                    )
                },
            ]
            :
            {}
            ,
         },
		pagination : {
			total            : resultCount,
			pageIndex        : pageIndex,
			pageSize         : pageSize,
			showTotal        : total => `共 ${total} 条`,
			showSizeChanger  : true,
			showQuickJumper  : true,
			onShowSizeChange : pageOnChange,
			onChange         : pageOnChange
		}
    };

	let superSearchProps = {
		searchVisible : searchVisible,
		closeSearch   : superSearchClick,
		onSearch      : onSuperSearch,
		onClear       : onSuperSearch,
		fields        : tableType == 'card' ?
                            [
                                {
                                    key         : 'orgId',
                                    type        : 'orgSelect',
                                    label       : '所属校区',
                                    options     : {
                                        width : 280,
                                        getPopupContainer : () => document.getElementById( 'super_search_wrap' )
                                    }
                                },{
									key         : 'id' ,
									type        : 'input' ,
									label       : '会员卡号',
									placeholder : '请输入会员卡号'
								}
                            ]
                            :
                        tableType == 'transCourse' ?
                            [
                                {
                                    key         : 'orgId',
                                    type        : 'orgSelect',
                                    label       : '所属校区',
                                    options     : {
                                        width : 280,
                                        getPopupContainer : () => document.getElementById( 'super_search_wrap' )
                                    }
                                },{
                                    key         : 'creatorName',
                                    type        : 'input',
                                    label       : '创建人',
                                    placeholder : '创建人'
                                }
                            ]
                            :
                            []
	}

    return (
        <div style = {{ height : '100%', overflow : 'hidden' }}>
            <VipManageComponent { ...vipManageComponentProps } />
			<SuperSearch { ...superSearchProps } />
			<VipManageDetailPage tableType = { tableType }/>
        </div>
    )
};

function mapStateToProps ({ vipManageModel }){
	return { vipManageModel };
};

export default connect( mapStateToProps )( VipManagePage );
