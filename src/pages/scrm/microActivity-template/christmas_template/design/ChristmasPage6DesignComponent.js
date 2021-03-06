/**
 * 圣诞模板的首页 渲染组件
 *
 */
import React from 'react';
import {Button, Row, Col, Input, Select, Icon, Modal, Form, Upload, message, Checkbox, Pagination, Popconfirm } from 'antd';
let PageChange = require('./pageChange');

let FormItem = Form.Item;

let ChristmasPage6DesignComponent = Form.create()(React.createClass({
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
		form.setFieldsValue({"page6Title" : detailData.title});
		window.timer = setInterval(function(){
			me.onChildPreview();
		},200)
	},
	//预览
	onChildPreview(){
		let form = this.props.form;
		let formData = form.getFieldsValue();
		let seqNo = this.state.detailData.seqNo;
		let detailData = {
			type : 'Page6Component',
			seqNo : seqNo,
			title : formData.page6Title ,
			form_data : [
				{ field_label : '', field_value : '' }
			]
		};
		this.props.onChildPreview(detailData , seqNo);
	},
	//保存实例
	saveInstance(){
		clearInterval(window.timer);
		this.props.form.validateFieldsAndScroll((error,value)=>{
			if(!!error){
				return;
			}else{
				this.onChildPreview();
				this.props.saveInstance();
			}
		})
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
		clearInterval(window.timer);
		let seqNo = this.state.detailData.seqNo;
		this.props.onRemove(seqNo);
	},

	//校验标题字数限制
	checkTitle( rule, value, callback ){
		if(!(/^[^\n]{1,8}$/.test(value))){
    		callback('不能超过8个字符');
    	}else if((/^[\s]{1,8}$/.test(value))){
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
			labelCol:{span : 4},
			wrapperCol:{span : 18 }
		};
		//标题属性
		let titleProps = getFieldProps('page6Title',{
			initialValue : "圣诞活动报名",
			validate : [{
				rules : [
					{ required : true , message : '请输入标题'},
					{ validator : this.checkTitle }
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
					<FormItem {...formItemLayout} label="标题" help = '标题, 不能超过8字' >
						<Input size = 'default' placeholder="请输入标题" {...titleProps} />
					</FormItem>
					<FormItem wrapperCol={{ offset : 19 }}>
						<Button onClick = { this.saveInstance } style = {{ marginLeft : '8px' }} size = "default" type = "primary" >保存</Button>
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

export default ChristmasPage6DesignComponent;
