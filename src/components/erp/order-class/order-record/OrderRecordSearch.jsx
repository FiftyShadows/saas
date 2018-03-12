import React from 'react';
import QueueAnim from 'rc-queue-anim';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon, Popover, Tabs, Button, Modal } from 'antd';
import OrderRecordSearchComponent from '../../../common/new-component/manager-list/ManagerList';
import SuperSearch from '../../../common/new-component/super-search/SuperSearch';

function OrderRecordSearch({
	searchFunction,
	clearFunction,

	courseList,
	classRoomList,
	teacherList,

	/*高级搜索*/
	searchVisible,
	superSearchClick,
	onSuperSearch,
	onSuperClear

}){
	let orderRecordSearchComponentProps = {
		search : {
            onSearch  : searchFunction,
            onClear   : clearFunction,
            fields : [
				{
					key         : 'stuName',
					type        : 'input',
					placeholder : '学员名称',
				},{
					key         : 'courseId',
					type        : 'select',
					placeholder : '课程名称',
					options     : courseList,
					opt_key     : 'id',
					opt_label   : 'title',
				},{
					key         : 'roomId',
					type        : 'select',
					placeholder : '教室名称',
					options     : classRoomList,
					opt_key     : 'id',
					opt_label   : 'name',
				}
            ]
        },
		rightBars : {
			isSuperSearch      : true,
			superSearch        : superSearchClick,
			superSearchVisible : searchVisible,
		}
	}

	let superSearchProps = {
		searchVisible : searchVisible,
		closeSearch   : superSearchClick,
		onSearch      : onSuperSearch,
		onClear       : onSuperClear,
		fields        : [
			{
				key         : 'mtid',
				type        : 'select',
				label       : '主教名称',
				placeholder : '主教名称',
				options     : teacherList,
				opt_key     : 'userId',
				opt_label   : 'userName',
			},{
				key         : 'startTime',
				type        : 'timePicker',
				placeholder : '选择开始时间',
				label       : '开始时间'
			},{
				key         : 'endTime',
				type        : 'timePicker',
				placeholder : '选择结束时间',
				label       : '结束时间'
			}
		]
	}
	return(
		<div>
			<OrderRecordSearchComponent { ...orderRecordSearchComponentProps } />
			<SuperSearch { ...superSearchProps } />
		</div>
	)
}

export default OrderRecordSearch;
