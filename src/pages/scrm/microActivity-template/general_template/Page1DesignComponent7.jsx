/**
 * 圣诞模板的首页 渲染组件
 *
 */
import React from 'react';
import {Button,Row, Col,Input,Select,Icon,Modal ,Form ,Upload,message,Checkbox,Pagination, Popconfirm} from 'antd';
let PageChange = require('./pageChange');

let FormItem = Form.Item;

let Page1DesignComponent = Form.create()(React.createClass({
	getInitialState() {
		return {
			detailData : this.props.detailData,
			hasPrev : this.props.hasPrev,
			hasNext : this.props.hasNext,
			pageTotal : this.props.pageTotal,
			hasDelete : this.props.hasDelete,
			initFlg : false,
		}
	},

	componentWillReceiveProps(nextProps) {
		let detailData = this.state.detailData;
		this.setState({
			detailData : nextProps.detailData,
			hasPrev : nextProps.hasPrev,
			hasNext : nextProps.hasNext,
			pageTotal : nextProps.pageTotal,
			hasDelete : nextProps.hasDelete
		})
		if ( (nextProps.formVisible && this.props.formVisible !== nextProps.formVisible) || !this.state.initFlg ){

			this.initFormData( detailData );
			this.setState({
				initFlg : true
			});
		}
	},
	//初始化表单值
	initFormData( detailData ){
		let form = this.props.form;
		let me = this;
		form.setFieldsValue({"page1Title" : detailData.title});
		form.setFieldsValue({"page1SubTitle" : detailData.sub_title});
		form.setFieldsValue({"page1OrgName" : detailData.org_name});

		window.timer = setInterval(function(){
			me.onChildPreview();
		},window.refreshTimes || 200);
	},
	//预览
	onChildPreview(){
		let form = this.props.form;
		let formData = form.getFieldsValue();
		let seqNo = this.state.detailData.seqNo;
		let detailData = {
			type : 'Page1Component',
			seqNo : seqNo,
			title : formData.page1Title,
			sub_title : formData.page1SubTitle,
			org_name : formData.page1OrgName,
		};
		this.props.onChildPreview(detailData , seqNo);
	},
	//上一页
	onPrev(seqNo){
		let form = this.props.form;
		form.validateFieldsAndScroll((error,value)=>{
			if(!!error){
				return;
			}else{
				this.props.onPrev(seqNo);
			}
		})
		this.onChildPreview()
	},

	//下一页
	onNext(seqNo){
		let form = this.props.form;
		form.validateFieldsAndScroll((error,value)=>{
			if(!!error){
				return;
			}else{
				this.props.onNext(seqNo);
			}
		})
		this.onChildPreview();
	},
	//删除当前页
	onRemove(){
		let seqNo = this.state.detailData.seqNo;
		this.props.onRemove(seqNo);
	},

	//校验标题字数限制
	checkTitle( rule, value, callback ){
		if(!(/^[^\n]{1,15}$/.test(value))){
    		callback('不能超过15个字符');
    	}else if((/^[\s]{1,15}$/.test(value))){
			callback("不能为空格")
    	} else {
    		callback();
    	}
	},
	//校验副标题字数限制
	checkSubTitle( rule, value, callback ){
		if(!(/^[^\n]{1,25}$/.test(value))){
    		callback('不能超过25个字符');
    	}else if((/^[\s]{1,25}$/.test(value))){
			callback("不能为空格")
    	} else {
    		callback();
    	}
	},
	//校验机构名称字数限制
	checkOrgName( rule, value, callback ){
		if(!(/^[^\n]{1,20}$/.test(value))){
    		callback('不能超过20个字符');
    	}else if((/^[\s]{1,20}$/.test(value))){
			callback("不能为空格")
    	} else {
    		callback();
    	}
	},
	render () {
		let { designData, recordData } = this.props;
		let { detailData } = this.state;

		let self = this;
		let {getFieldValue, getFieldProps, getFieldError, isFieldValidating} = this.props.form;

		//表单元素布局属性
		let formItemLayout = {
			labelCol : { span : 4 },
			wrapperCol  :{ span : 18 }
		};
		//标题属性
		let titleProps = getFieldProps('page1Title',{
			initialValue : "闪闪圣诞招生活动",
			validate : [{
				rules : [
					{ required : true , message : '请输入标题'},
					{ validator : this.checkTitle }
				],
				trigger : ['onBlur' , 'onChange']
			}]
		});
		let subTitleProps = getFieldProps('page1SubTitle',{
			validate : [{
				rules : [
					{ required : true , message : '请输入副标题'},
					{ validator : this.checkSubTitle }
				],
				trigger : ['onBlur' , 'onChange']
			}]
		});
		let orgNameProps = getFieldProps('page1OrgName',{
			validate : [{
				rules : [
					{ required : true , message : '请输入机构名称'},
					{ validator : this.checkOrgName }
				],
				trigger : ['onBlur' , 'onChange']
			}]
		});
		return (

			<div className="templet-instance-form-content">
				<Form horizontal style={{width:'100%'}}>
					<div className="base-setting">
						<span>页面设置</span>
					</div>
					<FormItem {...formItemLayout} label="标题" help = '标题, 不能超过15字'>
						<Input size = 'default' placeholder="请输入标题" { ...titleProps } />
					</FormItem>
					<FormItem {...formItemLayout} label="副标题" help = '标题, 不能超过25字'>
						<Input size = 'default' placeholder = "请输入副标题" { ...subTitleProps } />
					</FormItem>
					<FormItem {...formItemLayout} label="机构名称" help = '标题, 不能超过20字'>
						<Input size = 'default' placeholder = "请输入机构名称"  { ...orgNameProps } />
					</FormItem>
					<FormItem wrapperCol={{ offset: 16 }}>
						<Popconfirm title = "确认删除当前页?" onConfirm = { this.onRemove } okText = "确认" cancelText = "取消">
							<Button style = {{ marginLeft : '21px' }} size = "default" disabled = { this.state.hasDelete }><Icon style = {{ marginTop : '-3px', verticalAlign : 'middle' }} type="delete" />删除当前页</Button>
						</Popconfirm>
					</FormItem>
					<PageChange detailData = {detailData}
								hasPrev = { this.state.hasPrev }
								hasNext = {this.state.hasNext}
								onPrev = { this.onPrev }
								onNext = { this.onNext }
								pageTotal = {this.state.pageTotal} />
				</Form>
			</div>
		);
	},

}));

export default Page1DesignComponent;
