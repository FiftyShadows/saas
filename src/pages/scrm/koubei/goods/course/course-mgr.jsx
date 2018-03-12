/**
 * 口碑课程售卖管理界面
 * @author yujq
 */
import React from 'react';
import QueueAnim from 'rc-queue-anim';

let KoubeiCourseSearch = require('./course-search');
let KoubeiCourseTable = require('./course-table');

import KoubeiAuthValidateModal from '../../common/koubei-auth-validate-modal';

let KoubeiCourseMgr = React.createClass({
	getInitialState() {
		return {
			searchVisible : false, //查询模块是否展示
		}
	},

	//改变查询模块是否展示
	changeSearchVisible(e) {
		this.setState({searchVisible: !this.state.searchVisible});
	},

	onSearch(query) {
		this.refs.table_component.initData(query, {pageIndex: 0, pageSize: 10});
	},

	render() {

		return (
			<div className="page-content">
				<QueueAnim
					type={['top', 'top']}
		        	ease={['easeOutQuart', 'easeInOutQuart']}
					className="common-search-queue" >

				{this.state.searchVisible?[
                   <KoubeiCourseSearch key="common-search-queue-key-search" ref="koubei_course_search;" onSearch={this.onSearch} />
                ]:null}
				</QueueAnim>
				<KoubeiCourseTable key="common-search-queue-key-table" changeSearchVisible={this.changeSearchVisible} ref="table_component" />
				<KoubeiAuthValidateModal />
			</div>
		);
	}
});

export default KoubeiCourseMgr;
