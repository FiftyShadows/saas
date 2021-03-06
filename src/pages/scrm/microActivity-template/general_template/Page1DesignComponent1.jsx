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
			imagePriview        : '',                                        //预览上传图片url
			imagePriviewVisible : false,                                   //是否预览图片
			fileList            : null,
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
		form.setFieldsValue({"page1Image" : detailData.imgUrl});

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
			imgUrl : formData.page1Image,
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

	//上传图片的操作
	imgHandleChange(info){
		let fileList = info.fileList;
		if(info.fileList.length > 0){
			if(info.file.status === "done"){
				let fileUrl = info.file.response.data.url;
				this.props.form.setFieldsValue({'page1Image' : fileUrl})
				message.success(`${info.file.name}上传成功`);
			}else if (info.file.status === "error"){
				message.error(`${info.file.name}上传失败`);
			}
		} else if (info.fileList.length <=0){
			this.props.form.setFieldsValue({'page1Image' : ''});
		}
		this.setState({fileList});
	},
	imgBeforeUpload(file){
		let imgUrlList = this.props.form.getFieldValue('page1Image');
		if(imgUrlList && imgUrlList.length > 0){
			message.error('只能上传一张图片');
			return false;
		}
		if(file.size > 1048576){
			message.error('图片不能大于1M');
			return false;
		}
		if (!(file.type === 'image/jpeg'||file.type === 'image/png'||file.type === 'image/gif')){
	        message.error('只能上传 .JPG .PNG .gif文件哦!');
	        return false;
	    }
		return true;
	},
	imgHandleOnPreview(file){
		this.setState({
			imagePriview: file.url||file.thumbUrl,
	       	imagePriviewVisible: true,
		})
	},
	cancelImagePreview(){
		this.setState({
			imagePriviewVisible : false
		})
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
	//校验副标题字数限制
	checkSubTitle( rule, value, callback ){
		if(!(/^[^\n]{1,30}$/.test(value))){
    		callback('不能超过30个字符');
    	}else if((/^[\s]{1,30}$/.test(value))){
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

		//图片属性
		let shareImgProps = getFieldProps('page1Image',{
			validate : [{
				rules : [
					{required : true, message : '请上传图片'}
				],
				trigger : ['onBlur' , 'onChange']
			}]
		});

		let defaultFileList = [];
		if(this.state.detailData && this.state.detailData.imgUrl){
			defaultFileList.push({
				  uid: -1,
				  name: 'xxx.png',
				  status: 'done',
				  url: this.state.detailData.imgUrl
	    	});
		}
		let uploadImgProps = {
			name : 'file',
			action : BASE_URL+'/uploadController/upload',
			listType : 'picture-card',
			fileList : this.state.fileList ? this.state.fileList : defaultFileList,
			onChange : this.imgHandleChange,
			beforeUpload : this.imgBeforeUpload,
	    	onPreview : this.imgHandleOnPreview,
		};
		return (

			<div className="templet-instance-form-content">
				<Form horizontal style={{width:'100%'}}>
					<div className="base-setting">
						<span>页面设置</span>
					</div>
					<FormItem {...formItemLayout} label="标题" help = '标题, 不能超过8字'>
						<Input size = 'default' placeholder="请输入标题" { ...titleProps } />
					</FormItem>
					<FormItem {...formItemLayout} label="副标题" help = '副标题, 不超过30字'>
						<Input size = 'default' placeholder = "请输入副标题"  { ...subTitleProps }/>
					</FormItem>
					<FormItem {...formItemLayout}
							  label="图片"
							  help="只能上传1张图, 图片大小 ≤ 1M, 支持png,jpeg,gif格式">
						<Upload {...shareImgProps} {...uploadImgProps}>
							<Icon type="plus"/>
							<Modal visible={this.state.imagePriviewVisible} footer={null} onCancel={this.cancelImagePreview}>
								<img alt="example" src={this.state.imagePriview} style={{width : 300,height:400}}/>
							</Modal>
						</Upload>
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
