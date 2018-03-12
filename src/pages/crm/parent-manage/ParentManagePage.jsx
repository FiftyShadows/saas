import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Popover } from 'antd';
import StudentWxBindModalPage from '../../../pages/erp/student-manage/StudentWxBindModalPage';                          //引入微信绑定框 ( 公共 )
import ParentManageComponent from '../../../components/common/new-component/manager-list/ManagerList';
import ParentManageCreateForm from '../../../components/crm/parent-manage/ParentManageCreateForm';
import SuperSearch from '../../../components/common/new-component/super-search/SuperSearch';
import ParentManageDetailPage from './ParentManageDetailPage';
import style from './ParentManagePage.less';


function ParentManagePage({ dispatch, parentManageModel }){
    let {
        searchVisible,              //高级搜索是否可见

        dataSource,
		newColumns,
        resultCount,
        pageIndex,
        pageSize,
        loading,
		bandUrl,

        selectedRowKeys,
        selectedRows,
        selectedRecordIds,

        createParentVisible,
        stuIdList,
        parentIdList,
        parentRelationList,
        createOrgId ,
        createOrgName,

        stuId,
        orgId,
        parentId,
        updateParentId,
        oldParentId,
        updateOrgId,
        parentDetailInfo,

		openId,
        condition,
		orgName,

		parentCreateBtnLoading

    } = parentManageModel;

    //常用搜索
    function searchFunction( values ){
        dispatch({
            type : 'parentManageModel/searchFunction',
            payload : {
                values
            }
        })
    };

    //清除条件
    function clearFunction(){
        dispatch({
            type : 'parentManageModel/searchFunction',
            payload : {
                values : {
                    name    : undefined,
                    mobile  : undefined,
                }
            }
        })
    };

	/*高级搜索点击事件*/
	function superSearchClick(){
		dispatch({
			type : 'parentManageModel/updateState',
			payload : {
				searchVisible : !searchVisible
			}
		})
	}

	/*高级搜索*/
	function onSuperSearch( values ){
		dispatch({
			type : 'parentManageModel/onSuperSearch',
			payload : {
				values
			}
		})
	}

	/*高级搜索重置*/
	function onSuperClear(){
		dispatch({
			type : 'parentManageModel/onSuperSearch',
			payload : {
				values : {
					attention  : undefined,          //是否绑定微信
					orgId      : undefined,
					sellerName : undefined,          //销售
				}
			}
		})
	}

    //我的下属
    function subordinateChange( uids ){
        dispatch({
            type : 'parentManageModel/subordinateChange',
            payload : {
                uids
            }
        })
    };

    //选择表格项
    function rowSelectChange( selectedRowKeys, selectedRows ){
        dispatch({
            type : 'parentManageModel/updateState',
            payload : {
                selectedRowKeys,
                selectedRows
            }
        })
    };

	/*改变表格显示项*/
	function changeColumns( newColumns ){
		dispatch({
			type : 'parentManageModel/updateState',
			payload : {
				newColumns
			}
		})
	}

    //改变pageSize
    function pageSizeChange( pageIndex, pageSize ){
        dispatch({
            type : 'parentManageModel/pagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };
    //改变pageIndex
    function pageIndexChange( pageIndex ){
       dispatch({
            type : 'parentManageModel/pagination',
            payload : {
                pageIndex,
                pageSize,
            }
        })
    };

	//显示详情
	function showDetail( record ){
		dispatch({
			type : 'parentManageDetailModel/showDetail',
			payload : {
				record
			}
		})
	};

    //显示微信绑定框
    function showWxBindModal( url ){
        dispatch({
            type : 'studentWxBindModalModel/openWxCodeModal',
            payload : {
                url
            }
        })
    };

    //删除联系人
    function deleteParent(){
        let selectedRecords = [];
        selectedRows.map(function(item,index){
            selectedRecords.push({
                pId   : item.id,
                stuId : item.stuId,
                orgId : item.orgId,
            });
        });
        dispatch({
            type : 'parentManageModel/deleteParent',
            payload : {
                selectedRecords
            }
        })
    };

	//绑定微信
	function parentBindWx(){
		dispatch({
			type : 'studentWxBindModalModel/openWxCodeModal',
			payload : {
				url : bandUrl,
				orgName,
			}
		})
	}

    //点击新增联系人
    function createParent(){
        if (createParentVisible){
            dispatch({
                type:'parentManageModel/updateState',
                payload:{
                    createOrgId : undefined,
                }
            });
        }else {
            let org;
            /*取到第一个校区(默认校区)ID*/
            if(window._init_data.firstOrg != undefined){
                org = window._init_data.firstOrg;                //获取选择校区下的第一间校区

                dispatch({
                    type : 'parentManageModel/TenantSelectOnSelect',
                    payload : {
                        orgId : org.key,
                    }
                });
                dispatch({
                    type:'parentManageModel/updateState',
                    payload:{
                        createOrgId : org.key,
                    }
                });
            }
        }

        dispatch({
            type : 'parentManageModel/updateState',
            payload : {
                createParentVisible : !createParentVisible
            }
        })

    };

    //选择校区得到学员下拉列表
    function TenantSelectOnSelect( orgId ){
        dispatch({
            type : 'parentManageModel/TenantSelectOnSelect',
            payload : {
                orgId
            }
        })
    };

    //检验联系人/手机号是否存在
    function checkParent(value, changeParentInfoSelect ){
        dispatch({
            type : 'parentManageModel/checkParent',
            payload : {
                mobile : value,
                changeParentInfoSelect,
            }
        })
    };

    //确认新增
    function confirmAddParent( values, changeParentInfoSelect ){
        dispatch({
            type : 'parentManageModel/confirmAddParent',
            payload : {
                values,
                changeParentInfoSelect
            }
        });
    };

    //取消新增
    function cancelAddParent(){
        dispatch({
            type : 'parentManageModel/updateState',
            payload : {
                createParentVisible : !createParentVisible,
                parentDetailInfo    : {},
                createOrgId         : undefined,
                parentId            : undefined,
                openId              : undefined,
                updateParentId      : undefined,
                updateOrgId         : undefined,
                stuId               : undefined,
                oldParentId         : undefined,
                stuIdList           : [],
                parentIdList        : [],
            }
        })
    };

    //点击联系人修改
    function updateParent( id, orgId, stuId ){
        dispatch({
            type : 'parentManageModel/updateParent',
            payload : {
                id, orgId, stuId
            }
        })
    };

	let superSearchProps = {
		searchVisible : searchVisible,
		closeSearch   : superSearchClick,
		onSearch      : onSuperSearch,
		onClear       : onSuperClear,
		fields        : [
			{
				key         : 'orgId',
				type        : 'orgSelect',
				label       : '所属校区',
				options     : {
					width : 280,
					getPopupContainer : () => document.getElementById( 'super_search_wrap' )
				}
			},{
				key         : 'weixin',
				type        : 'input',
				label       : '微信',
				placeholder : '微信',
			}
		]
	}

    let parentManageComponentProps = {
        search : {
            onSearch      : searchFunction,
            onClear       : clearFunction,
			subordinate   : ( condition != 'all' ),
			subordinateChange : subordinateChange,
            fields : [
                        {
                            key         : 'name',
                            type        : 'input',
                            placeholder : '联系人姓名',
                        },{
                            key         : 'mobile',
                            type        : 'input',
                            placeholder : '联系人电话'
                        }
            ],
             initSearchValues: [],
        },
        leftBars: {
            label : '已选',
			labelNum : selectedRowKeys.length,
            btns : [
                {
                    label    : '删除',
                    handle   : deleteParent,
                    confirm  : true,
                }
            ],
        },
        rightBars : {
            btns : [
                {
                    type     : 'btn',
                    label    : '新增联系人',
                    handle   : createParent
                }
            ],
			isSuperSearch      : true,
			superSearch        : superSearchClick,
			superSearchVisible : searchVisible,
        },
        table : {
            loading       : loading,
            dataSource    : dataSource,
			newColumns    : newColumns,
			changeColumns : changeColumns,
            xScroll       : 1100,
            columns : [
                {
                    dataIndex : 'name',
                    key       : 'name',
                    title     : '联系人姓名',
                    width     : 112,
                    render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
                        	<a onClick = { () => showDetail( record ) }>{ text }</a>
						</Popover>
                    )
                },{
                    dataIndex : 'mobile',
                    key       : 'mobile',
                    title     : '联系人电话',
                    width     : 112,
					render    : ( text, record ) => (
						<a onClick = {() => window.CallPhone(text)}>{ text }</a>
					)
                },{
                    dataIndex : 'qqNumber',
                    key       : 'qqNumber',
                    title     : 'QQ',
                    width     : 112,
                },{
                    dataIndex : 'weixin',
                    key       : 'weixin',
                    title     : '微信',
                    width     : 112,
                    render    : ( text, record ) => (
                        <Popover placement = 'top' content = { text } trigger = 'hover' >
                            { text }
						</Popover>
                    )
                },{
                    dataIndex : 'email',
                    key       : 'email',
                    title     : '邮箱',
                    width     : 112,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    dataIndex : 'trade',
                    key       : 'trade',
                    title     : '所属行业',
                    width     : 112,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    dataIndex : 'workUnit',
                    key       : 'workUnit',
                    title     : '联系地址',
                    width     : 160,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                },{
                    dataIndex : 'orgName',
                    key       : 'orgName',
                    title     : '所属校区',
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text }
						</Popover>
					)
                }
            ],
         },
		pagination : {
			total            : resultCount,
			pageIndex        : pageIndex,
			pageSize         : pageSize,
			showTotal        : total => `总共 ${total} 条`,
			showSizeChanger  : true,
			showQuickJumper  : true,
			onShowSizeChange : pageSizeChange,
			onChange         : pageIndexChange

		}
    };

	function checkoutParentName( e, orgId, id ){
		let msg = e.target.value;
        let obj = {};
        if( msg != '' && msg != undefined && msg != null && !/^[\s]*$/.test(msg) ){
            obj.orgId = orgId;
			obj.parentId = id || undefined;
			obj.parentName = msg;
            dispatch({
                type : 'parentManageModel/checkoutParentName',
                payload : {
                    ...obj
                }
            });
        }
	}

    let parentManageCreateFormProps = {

        createParentVisible,
        stuIdList,
        parentIdList,
        parentRelationList,
        stuId,
        parentId,
        updateOrgId,
        updateParentId,
        oldParentId,
        parentDetailInfo,
        createOrgId ,
        createOrgName,

        TenantSelectOnSelect,
        checkParent,

        cancelAddParent,
        confirmAddParent,

		openId,
		parentCreateBtnLoading,

		checkoutParentName

    };

    return (
        <div style = {{ overflowX : 'hidden', height : '100%' }}>
            <ParentManageComponent { ...parentManageComponentProps } />
            <ParentManageCreateForm { ...parentManageCreateFormProps } />
            <StudentWxBindModalPage />
			<SuperSearch { ...superSearchProps } />
			<ParentManageDetailPage />
        </div>
    )
};

function mapStateToProps ({ parentManageModel }){
	return { parentManageModel };
};

export default connect( mapStateToProps )( ParentManagePage );
