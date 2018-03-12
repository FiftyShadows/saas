import React from 'react';
import StudentListComponent from '../../../common/new-component/manager-list/ManagerList';
import { StatusFlag, NewModal } from '../../../common/new-component/NewComponent';
import { Icon, Popover, Popconfirm } from 'antd';

function StudentList({
	studentDataSource,
	studentLoading,

	cancelBindParent

}){
	let studentListComponentProps = {
		table : {
			isInDetail    : true,
			height        : 325,
            loading       : studentLoading,
            dataSource    : studentDataSource,
            columns : [
                {
					dataIndex : 'name',
					key       : 'name',
					title     : '客户名称',
					width     : 100,
					render    : ( text, record ) => (
						<Popover placement = 'top' content = { text } trigger = 'hover' >
							{ text || '' }
						</Popover>
					)
				},{
					dataIndex : 'operation',
					key       : 'operation',
					title     : '操作',
                    width     : 100,
					render    : ( text, record ) => (
						<Popconfirm title = "确认解除关联么?" onConfirm = { () => cancelBindParent( record.stuId ) } okText = "确认" cancelText = "取消" >
							<a>解除关联</a>
						</Popconfirm>
					)
				}
            ],
         }
	}

	return (
		<StudentListComponent { ...studentListComponentProps } />
	)
}

export default StudentList;
