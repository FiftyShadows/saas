import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Popover } from 'antd';
import VisitRecordSearch from '../../../components/crm/visit-record/VisitRecordSearch';
import VisitRecordContent from '../../../components/crm/visit-record/VisitRecordContent';
import VisitRecordCreatePage from './VisitRecordCreatePage';
import SuperSearch from '../../../components/common/new-component/super-search/SuperSearch';

function VisitRecordPage({ dispatch, visitRecordModel }){
    let {
		searchVisible,

		pageSize,
		pageIndex,
		dataSource,
		resultCount,

		selectedId,
		selectedItem,

		source,
		condition,

		/*方法*/
		reset,

    } = visitRecordModel;

    //搜索
    function onSearch( values ){
		dispatch({
			type : 'visitRecordModel/searchFunction',
			payload : {
				values
			}
		})
    };

    //清除条件
    function onClear(){
		dispatch({
			type : 'visitRecordModel/searchFunction',
			payload : {
				values : {
					stuName : undefined,
					status  : undefined,
				}
			}
		})
    };

    //改变pageSize
    function pageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'visitRecordModel/pagination',
			payload : {
				pageIndex,
				pageSize
			}
		})
    };

    //改变pageIndex
    function pageIndexChange( pageIndex ){
		dispatch({
			type : 'visitRecordModel/pagination',
			payload : {
				pageIndex,
				pageSize
			}
		})
    };

	/*高级搜索点击事件*/
	function showSuperSearch(){
		dispatch({
			type : 'visitRecordModel/updateState',
			payload : {
				searchVisible : !searchVisible
			}
		})
	}

	/*高级搜索*/
	function onSuperSearch( values, reset ){
		dispatch({
			type : 'visitRecordModel/onSuperSearch',
			payload : {
				values
			}
		})
		dispatch({
			type : 'visitRecordModel/updateState',
			payload : {
				reset : reset
			}
		})
	}

	/*高级搜索清除*/
	function onSuperClear(){
		dispatch({
			type : 'visitRecordModel/onSuperSearch',
			payload : {
				values : {
					uidName        : undefined,
					orgId          : undefined,
					startVisitTime : undefined,
					endVisitTime   : undefined,
				}
			}
		})
	}

	/*切换到leaders记录*/
	function clickToLeaders(){
		!!reset && reset();
		dispatch({
			type : 'visitRecordModel/clickGetFollowRecordList',
			payload : {
				source : '2',
			}
		})
	}

	/*切换到学员记录*/
	function clickToStudent(){
		!!reset && reset();
		dispatch({
			type : 'visitRecordModel/clickGetFollowRecordList',
			payload : {
				source : '1',
			}
		})
	}

	/*创建到访*/
	function createVisitRecord(){
		dispatch({
			type : 'visitRecordCreateModel/openVisitRecordCreate',
			payload : {
				source,
				condition
			}
		})
	}

	/*切换列表项*/
	function changeListItem( item ){
		dispatch({
			type : 'visitRecordModel/updateState',
			payload : {
				selectedId   : item.id,
				selectedItem : item
			}
		})
	}

	/*刷新列表*/
	function refreshList(){
		dispatch({
			type : 'visitRecordModel/getVisitRecordListParams',
		})
	}

	/*更换所属人*/
	function subordinateChange( uids ){
		dispatch({
			type : 'visitRecordModel/subordinateChange',
			payload : {
				uids
			}
		})
	}

    let FollowRecordSearchProps = {
		searchVisible,        //高级搜索是否显示
		source,

        clickToLeaders,
		clickToStudent,
		createVisitRecord,
		showSuperSearch,
		onSearch,
		onClear,

		subordinateChange,

		condition,
    };

	/*编辑到访记录*/
	function updateVisitRecord( item ){
		dispatch({
			type : 'visitRecordCreateModel/openVisitRecordCreate',
			payload : {
				id    : item.id,
				orgId : item.orgId,
				stuId : item.stuId,
				source,
				condition
			}
		})
	}

	/*确认到访记录*/
	function confirmVisited( item ){
		dispatch({
			type : 'visitRecordModel/cancelVisitRecord',
			payload : {
				id     : item.id,
				status : '1'
			}
		})
	}

	/*取消到访记录*/
	function cancelVisitRecord( item ){
		dispatch({
			type : 'visitRecordModel/cancelVisitRecord',
			payload : {
				id     : item.id,
				status : '0'
			}
		})
	}

	let superSearchProps = {
		searchVisible  : searchVisible,
		closeSearch    : showSuperSearch,
		onSearch       : onSuperSearch,
		onClear        : onSuperClear,
		fields        : [
			{
				key     : 'orgId',
				type    : condition == 'all' && 'orgSelect',
				label   : '所属校区',
				options : {
					width : 280,
					getPopupContainer : () => document.getElementById( 'super_search_wrap' )
				}
			},{
				key     : 'uidName',
				type    : condition == 'all' && 'input',
				label   : '跟进人',
                placeholder : '跟进人' ,
			},{
				key     : 'time',
				type    : 'rangePicker',
				label   : '到访时间',
				startPlaceholder : '开始时间' ,
				endPlaceholder : '结束时间' ,
			}
		]
	}

	let followRecordContentProp = {
		dataSource,
		pageSize,
		pageIndex,
		resultCount,

		selectedId,
		selectedItem,

		pageSizeChange,
		pageIndexChange,
		changeListItem,

		confirmVisited,
		updateVisitRecord,
		cancelVisitRecord
	}

	let visitRecordCreateProps = {
		refreshList
	}

    return (
        <div style = {{ height : '100%', overflowX : 'hidden' }}>
            <VisitRecordSearch { ...FollowRecordSearchProps } />
			<VisitRecordContent { ...followRecordContentProp } />
			<VisitRecordCreatePage { ...visitRecordCreateProps } />
			<SuperSearch { ...superSearchProps } />
        </div>
    )
};

function mapStateToProps ({ visitRecordModel }){
	return { visitRecordModel };
};

export default connect( mapStateToProps )( VisitRecordPage );
