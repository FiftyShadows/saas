import React from 'react';
import { Form, Button, Input, Select, Icon } from 'antd';
import SubordinateFilter from '../../../pages/common/subordinate-filter/SubordinateFilter';
import styles from './FollowRecordSearch.less';
const FormItem = Form.Item;
const Option = Select.Option;
const ButtonGroup = Button.Group;

function FollowRecordSearch({
	searchVisible,
	source,
	typeSelectList,
	condition,

	/*方法*/
	clickToLeaders,
	clickToStudent,
	createFollowRecord,
	showSuperSearch,

	subordinateChange,             //更换我的与下属

	onSearch,
	onClear,

    ImportFollowRecordOpen,        //点击导入跟进

	form : {
        getFieldDecorator,
        getFieldValue,
        getFieldsValue,
        setFieldsValue,
        validateFields,
        resetFields,
        validateFieldsAndScroll,
    }
}){

	let subordinateProps = {
		onChange : subordinateChange,
	}

	function onSearchClick(){
		let values = getFieldsValue();
		onSearch( values );
	}

	function onClearClick(){
		resetFields();
		onClear();
	}
	function clickToLeadersClick(){
		resetFields();
		clickToLeaders();
	}

	function clickToStudentClick(){
		resetFields();
		clickToStudent();
	}

	return (
		<div className = 'card_search_wrap' >
			{ condition != 'all' &&
				<div className = { styles.special_search_item }>
					<SubordinateFilter { ...subordinateProps } />
				</div>
			}
			<Form layout = 'inline' className = { styles.follow_up_search }>
				<FormItem>
					{ getFieldDecorator( 'name', {

					})(
						<Input
							style = {{ width : '140px' }}
							placeholder = '机构名称'
							size = 'default'
				        />
					)}
				</FormItem>
                <FormItem>
					{ getFieldDecorator( 'sellerName', {

					})(
						<Input
							style = {{ width : '140px' }}
							placeholder = '销售姓名'
							size = 'default'
				        />
					)}
				</FormItem>
				<FormItem>
					{ getFieldDecorator('type',{

					})(
						<Select
							style = {{ width : '140px' }}
							placeholder = '跟进方式'
							size = 'default'
							showSearch = { true }
							optionFilterProp = 'children'
						>
							{ !!typeSelectList && typeSelectList.map( function( item, index ){
								return ( <Option key = { 'type_select_' + item.key } value = { item.key } >{ item.value }</Option> )
							})}
						</Select>
					)}
				</FormItem>
				<div className = 'btn_group' style = {{ margin : '0' }}>
					<Button size = 'default' type = 'primary' className = 'btn_group_search' onClick = { onSearchClick } >
						<img src = 'https://img.ishanshan.com/gimg/img/40850ec85b8698d4bf87ab918e636b5b'/>
					</Button>
					<Button size = 'default' className = 'btn_group_clear' onClick = { onClearClick } >
						<img src = 'https://img.ishanshan.com/gimg/img/6e7035a2df657c0350ffe4e86e9880f4'/>
					</Button>
				</div>
			</Form>
			<div className = 'card_right_operation'>
				<ButtonGroup>
					<Button type = { source == '2' ? 'primary' : '' } onClick = { clickToLeadersClick } style = {{ padding : '0 12px' }} >未付费客户记录</Button>
				    <Button type = { source == '1' ? 'primary' : '' } onClick = { clickToStudentClick } style = {{ padding : '0 12px' }} >付费客户记录</Button>
    			</ButtonGroup>
				<Button
					className = { styles.right_btn_item }
					style = {{ marginLeft : '20px' }}
					onClick = { createFollowRecord } >
					新增跟进
				</Button>
                <Button
					className = { styles.right_btn_item }
					style = {{ marginLeft : '20px' }}
					onClick = { ImportFollowRecordOpen } >
					导入跟进
				</Button>
				<Button
					type = 'primary'
					style = {{ marginLeft : '20px' }}
					onClick = { showSuperSearch }
				>
					{ !!searchVisible ? '关闭' : '高级搜索' }
				</Button>
			</div>
		</div>
	)
}

export default Form.create({})(FollowRecordSearch);
