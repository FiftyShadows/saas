import React from 'react';
import QueueAnim from 'rc-queue-anim';
import style from './StuMdoalCreat.less';
import { Button, Modal, Form, Input, Select, Upload, Icon, Radio, DatePicker, Row, Col, message, Cascader, Checkbox } from 'antd';
import { BlockTitle } from '../../common/new-component/NewComponent';
import TenantOrgSelect from '../../../pages/common/tenant-org-filter/TenantOrgFilter';
import PageModal from '../../common/page-modal/PageModal';
import ChinaDivision from '../../../utils/CascaderAddressOptions';
import { JusConstellation } from '../../../utils/dateFormat';
import moment from 'moment';
let FormItem   = Form.Item;
let Option     = Select.Option;
let RadioGroup = Radio.Group;

function StudentManageCreateForm({
    createStudentModalVisible,
    confirmCreateForm,
    cancelCreateForm,

    createOrgId,                 //默认选择的校区Id
    createOrgName,               //默认选择的校区名字

    //选择器下拉列表
    createSellerList,            //学员负责人

    edtionStuinfro,              //所要编辑的学员信息
	isShowMore,                  //是否显示更多

    studentTypeList,             //学员类型
    saleStatusList,              //跟进状态列表
    sourceList,                  //来源下拉框
    checkStudentStatus,


    TenantSelectOnSelect,

    checkStudentVisible,         //学员查重框
    checkStudentList,            //学员列表
    checkName,

    secondChannelList,           //二级来源
    orgScaleList,                //机构规模
    recommenderList,             //推荐人   联系人下拉列表
    collecterIdList,             //收集人

	showMoreStuInfo,             //显示更多学员信息
	parentRelationList,          //联系人关系

	stuModalCreateBtnLoading,

	checkStuNameAndPhone,

    form : {
        getFieldDecorator,
        validateFieldsAndScroll,
        validateFields,
        getFieldsValue,
        getFieldValue,
        getFieldError,
        setFieldsValue,
        resetFields,
    }
}){

    function checkStudentStatusAction( orgId, name ){

        let neworgId =orgId + '';

        if( neworgId == '' || neworgId == null || neworgId == undefined || /^[\s]*$/.test(neworgId) || name == '' || name == undefined || name == null || /^[\s]*$/.test(name)){
            message.warn( '请选择校区并输入姓名，请检查有无遗漏' );
        }else {
            checkStudentStatus( neworgId,name );
        }
    }
    //改变校区是清空所选跟进人
    function TenantSelectOnSelectAction( value ){
        setFieldsValue({ 'seller'         : undefined });
		setFieldsValue({ 'parentId'       : undefined });
		setFieldsValue({ 'counselorId'    : undefined });
		setFieldsValue({ 'collecterId'    : undefined });
		setFieldsValue({ 'recommender'    : undefined });
        if( !!value ){
            TenantSelectOnSelect( value );
        }
    };
    //校区下拉列表属性
    let tenantOrgSelectProps = {
        width        : 270,
        onChange     : TenantSelectOnSelectAction,            //改变机构触发事件
        disabled     : !!edtionStuinfro.orgId
    };

    let formItemLayout = {
        labelCol : { span : 5 },
        wrapperCol : { span : 16 }
    };

    function normFile( e ) {
        if( Array.isArray( e ) ){
            return e;
        }
        return e && e.fileList;
    };

    function imgMaxSize( file , fileList , size , title){
        let fileSize = file.size;
        if ( fileSize > 1048576 * size ){
            message.error( title + '大小不能超过' + size + 'M')
            return false;
        }
    };

    let uploadButton = (
        <div>
            <Icon type = 'plus' />
            <div className = { style.upload_picture_btn } >选择图片</div>
        </div>
    );

    //学员头像
    let initStudentImg = [];
    if( edtionStuinfro && edtionStuinfro.headimgurl &&  edtionStuinfro.headimgurl.length > 0){
        initStudentImg.push({
            uid    : -1,
            url    :  edtionStuinfro.headimgurl,
            status : 'done'
        })
    };
    //学员生日
    let initStudentBirthday;
    if ( edtionStuinfro && edtionStuinfro.birthday && edtionStuinfro.birthday != ''){
        initStudentBirthday = moment(new Date(  edtionStuinfro.birthday ));
    };

    //确认新增表单
    function confirmCreateFormAction(){
        validateFieldsAndScroll((err, values) => {
			if ( !!err ){
				return;
			};

            //处理机构类型
            values.type = !!values.type && values.type.length > 0 ? values.type.join(',') : undefined

            //处理省市区
            if(values.addrColumn[0] == '' || values.addrColumn[0] == null || values.addrColumn[0] == undefined){
                return message.warn('请填写所在地址');
            }
            if((values.addrColumn[1] == '' || values.addrColumn[1] == null || values.addrColumn[1] == undefined) && (values.addrColumn[2] != '' || values.addrColumn[2] != null || values.addrColumn[2] != undefined)){
                return message.warn('请填写所在地址');
            }

            values.province = values.addrColumn[0];
            if(values.addrColumn[1] != null && values.addrColumn[1] != undefined && values.addrColumn[1] != ''){
                if(values.addrColumn[1] == '市辖区' || values.addrColumn[1] == '县'){
                    values.city = values.addrColumn[0];
                }else{
                    values.city = values.addrColumn[1];
                }
            }else{
                values.city = '';
            }
            if(values.addrColumn[2] != null && values.addrColumn[2] != undefined && values.addrColumn[2] != ''){
                if(values.addrColumn[2] == '市辖区' || values.addrColumn[2] == '县'){
                    values.county = values.addrColumn[1];
                }else{
                    values.county = values.addrColumn[2];
                }
            }else{
                values.county = '';
            }
            values.addrColumn = JSON.stringify(getFieldValue('addrColumn'));

			if (values.seller == undefined || !values.seller || values.seller == ''){
				values.seller = '';
			}

			if( edtionStuinfro && edtionStuinfro.id ){
				values.stuId =  edtionStuinfro.id;
				confirmCreateForm(values);
			}else  {
				confirmCreateForm(values);
			}
        });
    };

	//表单关闭后
	function afterClose(){
		resetFields();
	}

    //取消新增表单
    function cancelCreateFormAction(){
        cancelCreateForm();
    };

    let NewsourceList = [];
    sourceList.map(function (item) {
        if (item.key == '1' || item.value == "微官网"){

        }else{
            NewsourceList.push(item);
        }
    })

    function disabledDate(current) {
        return current && current.valueOf() > Date.now();
    }

    function disabledDateTime() {
        return {
            disabledHours: () => range(0, 24).splice(4, 20),
            disabledMinutes: () => range(30, 60),
            disabledSeconds: () => [55, 56],
        };
    }

    /*检验联系方式*/
    function checkMobile(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(!(/^1[0-9]{10}$/.test(value))){
            callback(new Error('请输入正确的手机号'));
        }else{
            callback();
        }
    }

    /*校验员工姓名*/
    function NewcheckName(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('学员姓名不能为空'));
        }else{
            callback();
        }
    }

    let collecter = '';
    if ( edtionStuinfro.collecter == '' || edtionStuinfro.collecter == undefined || edtionStuinfro.collecter == null ){
        collecter = '';
    }else{
        collecter = edtionStuinfro.collecter + '';
    }

	function birthdaySelect( moment, value ){
		let constellation = JusConstellation( value );
		setFieldsValue({ constellation : constellation })
	}

	function checkRemark( rule, value, callback){
		if( value.length > 200 ){
            callback(new Error('备注不超过200字'));
        }else{
			callback();
		}
	}

	function changeStuName( e ){
		let value = e.target.value;
		setFieldsValue({ 'parentName' : value + '联系人' })
	}

    /*检验手机号码*/
    function checkMobile(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(!(/^1[0-9]{10}$/.test(value))){
            callback('请输入正确格式的手机号');
        }else{
            callback();
        }
    }

    return (
        <Modal
            className = "stu_create_modal_content"
            title = "付费客户信息"
            visible = { createStudentModalVisible }
            width = '800px'
            onCancel = { cancelCreateFormAction }
            onClose = { cancelCreateFormAction }
            maskClosable = { false }
			afterClose = { afterClose }
            footer = {[
                <Button key = "cancelStudent" onClick = { cancelCreateFormAction } >取消</Button>,
                <Button key = "confirmStudent" type = "primary" onClick = { confirmCreateFormAction } loading = { stuModalCreateBtnLoading } disabled = { stuModalCreateBtnLoading } style = {{ marginLeft : 20 }}>保存</Button>
            ]}
        >
            <Form className ="zl_basefrom">
                <BlockTitle content = '付费客户信息'/>
				<div className = 'stu_create_modal_left' >
					<FormItem
						{ ...formItemLayout }
						label = "所属校区"
					>
						{ getFieldDecorator('orgId',{
							initialValue : !edtionStuinfro.orgId ? (!createOrgId ? '' : createOrgId + ''):edtionStuinfro.orgId + '',
							rules : [
								{ required : true , message : '请选择校区' }
							]
						})(
							<TenantOrgSelect { ...tenantOrgSelectProps } />
						)}
					</FormItem>
					<div style={{ position : 'relative' }}>
						<FormItem
							{ ...formItemLayout }
							label = "客户姓名"
						>
							{ getFieldDecorator('name', {
								initialValue : edtionStuinfro.name || '',
								rules : [
									{ required : true , message : '请输入学员姓名' },
									{ validator : NewcheckName }
								]
							})(
								<Input size = 'default' placeholder = "请输入学员姓名" style = {{ width : 220 }} onChange = { (e) => changeStuName(e) } onBlur = { ( e ) => checkStuNameAndPhone( e, 'name', getFieldValue('orgId'), edtionStuinfro.id ) }/>
							)}

						</FormItem>
						<a
							onClick = { () => checkStudentStatusAction( getFieldValue('orgId'), getFieldValue('name') ) }
							style={{ position : 'absolute', top : 5,right : -2, padding : 0, width : 58 }}>
							查重
						</a>
					</div>
					<FormItem
						{ ...formItemLayout }
						label = "一级来源"
					>
						{ getFieldDecorator('channel',{
							initialValue : edtionStuinfro.channel || undefined,
							rules : [
								{ required : true , message : '请选择一级来源' }
							]
						})(
							<Select
								style = {{ width : '270px' }}
								size = 'default'
								showSearch
								allowClear
								optionFilterProp = "children"
								placeholder = '请选择来源'
								notFoundContent = { '没有来源' }
							>
								{
									NewsourceList &&  NewsourceList.map(function( item, index ){
										return ( <Option key = { 'source' + item.key } value = { item.key } >{ item.value }</Option> )
									})
								}
							</Select>
						)}
					</FormItem>
                    <FormItem
                        label="所在地址"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('addrColumn',{
                            initialValue : !!edtionStuinfro.addrColumn ? JSON.parse(edtionStuinfro.addrColumn) : [],
                            rules: [
                                { type:'array', required: true, message: '请选择所在地址' },
                            ],
                        })(
                            <Cascader placeholder = '请选择所在地址' options = { ChinaDivision } style = {{ width : 220 }} changeOnSelect size='default'/>
                        )}
                    </FormItem>
				</div>
				<div className = 'stu_create_modal_right'>
					<FormItem
						{ ...formItemLayout }
						label = "负责销售"
					>
						{ getFieldDecorator('seller',{
							initialValue : edtionStuinfro.seller || undefined,
							rules : [
							]
						})(
							<Select
								size = 'default'
								style = {{ width : '270px' }}
								showSearch
								allowClear
								optionFilterProp = "children"
								placeholder = '请选择当前校区下的员工'
								notFoundContent = { '当前校区下没有员工' }
							>
								{
									createSellerList && createSellerList.map(function( item, index ){
										return ( <Option key = { 'intention_' + item.id } value = { item.id + '' } >{ item.name }</Option> )
									})
								}
							</Select>
						)}
					</FormItem>
					<FormItem
						{ ...formItemLayout }
						label = "售后客服"
					>
						{ getFieldDecorator('counselorId',{
							initialValue : edtionStuinfro.counselorId || undefined,
						})(
							<Select
								size = 'default'
								style = {{ width : '270px' }}
								showSearch
								allowClear
								optionFilterProp = "children"
								placeholder = '请选择当前校区下的员工'
								notFoundContent = { '当前校区下没有员工' }
							>
								{
									collecterIdList && collecterIdList.map(function( item, index ){
										return ( <Option key = { 'source' + item.id } value = { item.id + ''} >{ item.name }</Option> )
									})
								}
							</Select>
						)}
					</FormItem>
                    <FormItem
                        { ...formItemLayout }
                        label = "备注"
                    >
                        { getFieldDecorator('remark',{
                            initialValue : edtionStuinfro.remark || undefined,
                        })(
                            <Input size = 'default' placeholder = "请输入备注" style = {{ width : '270px'}} />
                        )}
                    </FormItem>
                    <FormItem
                        { ...formItemLayout }
                        label = "详细地址"
                    >
                        { getFieldDecorator('conaddress',{
                            initialValue : edtionStuinfro.conaddress || '',
                            rules : [
                            ]
                        })(
                            <Input size = 'default' placeholder = "请输入详细地址" style = {{ width : '270px'}} />
                        )}
                    </FormItem>
				</div>
            </Form>
            <Form>
                <div className = 'stu_create_modal_left' >
                    <FormItem
                        { ...formItemLayout }
                        label = "机构类型"
                    >
                        { getFieldDecorator('type',{
                            initialValue : !!edtionStuinfro && !!edtionStuinfro.type ? edtionStuinfro.type.split(',') : undefined,
                        })(
                            <Select
                                mode = 'multiple'
                                style = {{ width : '270px' }}
                                size = 'default'
                                showSearch
                                allowClear
                                optionFilterProp = "children"
                                placeholder = '请选择机构类型'
                                notFoundContent = '没有机构类型'
                            >
                                {
                                    studentTypeList && studentTypeList.map(function( item, index ){
                                        return ( <Option key = { 'studentType_' + item.key } value = { item.key } >{ item.value }</Option> )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        { ...formItemLayout }
                        label = "推荐人"
                    >
                        { getFieldDecorator('recommender',{
                            initialValue : edtionStuinfro.recommender || undefined,
                            rules : [
                            ]
                        })(
                            <Input size = 'default' placeholder = "请输入推荐人" style = {{ width : '270px' }} />
                        )}
                    </FormItem>
                </div>
                <div className = 'stu_create_modal_right'>
                    <FormItem
                        label = '机构规模'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('orgSize',{
                            initialValue : edtionStuinfro.orgSize || undefined,
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择机构规模'
                                optionFilterProp="children"
                                style = {{ width : 270 }}>
                                { orgScaleList && orgScaleList.length > 0 ? orgScaleList.map((item,index) =>
                                    <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
                                ) : []}
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        { ...formItemLayout }
                        label = "收集人"
                    >
                        { getFieldDecorator('collecterId',{
                            initialValue : collecter || undefined,
                            rules : [
                            ]
                        })(
                            <Select
                                style = {{ width : '270px' }}
                                size = 'default'
                                showSearch
                                allowClear = { false }
                                optionFilterProp = "children"
                                placeholder = '请选择收集人'
                                notFoundContent = { '没有收集人' }
                            >
                                {
                                    collecterIdList && collecterIdList.map(function( item, index ){
                                        return ( <Option key = { 'source' + item.id } value = { item.id +'' } >{ item.name }</Option> )
                                    })
                                }
                            </Select>
                        )}
                    </FormItem>
                </div>
            </Form>
			{ !edtionStuinfro.id && createStudentModalVisible &&
                <FormItem
                    style = {{ marginBottom : -5 }}
                >
                    { getFieldDecorator('parentInfoIsShow', {
                        initialValue : 'checked' || undefined,
                        rules : [
                        ]
                    })(
                        <Checkbox defaultChecked = { true } >同时填写联系人信息</Checkbox>
                    )}
                </FormItem>
			}
			{ !edtionStuinfro.id &&
				<QueueAnim
					type={['top', 'top']}
					ease={['easeOutQuart', 'easeInOutQuart']}
					style={{width : '100%'}} >
					{ getFieldValue( 'parentInfoIsShow' ) ?
						<div key = 'isWriteParentInfo'>
							<Form>
								<BlockTitle content = '联系人信息'/>
								<div className = 'stu_create_modal_left' >
                                    <FormItem
										label = "选择类型"
										{ ...formItemLayout }
									>
										{ getFieldDecorator('parentInfo',{
											initialValue : '1',
											rules : [
												{ required : true, message : '请选择' }
											]
										})(
											<Select
												size = 'default'
												allowClear
												placeholder = "请选择"

											>
												<Option value = '1' >新建联系人</Option>
												<Option value = '2' >从联系人库选择</Option>
											</Select>
										)}
									</FormItem>
                                    <QueueAnim
								        type={['top', 'top']}
								        ease={['easeOutQuart', 'easeInOutQuart']}
								        style={{width : '100%'}} >
										{ !!getFieldValue('parentInfo') && getFieldValue('parentInfo') == '2' ?
                                            null
											:
											<div key = 'parentNotQueueAnim' >
												<FormItem
													label = "手机号"
													{ ...formItemLayout }
												>
													{ getFieldDecorator('parentMobile',{
														initialValue : undefined,//parentDetailInfo.mobile || '',
														rules : [
															{ required : true, message : '请输入联系人手机号' },
															{ validator : checkMobile }
														]
													})(
														<Input size = 'default' placeholder = '请输入联系方式' onBlur = { ( e ) => checkStuNameAndPhone( e, 'parentMobile', getFieldValue('orgId') ) }  />
													)}
												</FormItem>
                                                <FormItem
                                                    label = "生日"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('pbirthday')(
                                                        <DatePicker format = 'YYYY-MM-DD' placeholder = '请选择生日' size = 'default' style = {{ width : 220 }}/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "微信"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('weixin')(
                                                        <Input placeholder = '请输入微信' size = 'default'/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "职务"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('duty')(
                                                        <Input placeholder = '请输入职务' size = 'default'/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "联系地址"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('address')(
                                                        <Input placeholder = '请输入联系地址' size = 'default'/>
                                                    )}
                                                </FormItem>
											</div>
										}
									</QueueAnim>
                                </div>
								<div className = 'stu_create_modal_right'>
                                    <QueueAnim
								        type={['top', 'top']}
								        ease={['easeOutQuart', 'easeInOutQuart']}
								        style={{width : '100%'}} >
										{ !!getFieldValue('parentInfo') && getFieldValue('parentInfo') == '2' ?
                                            <FormItem
													label = "联系人"
													{ ...formItemLayout }
												>
													{ getFieldDecorator('parentId', {
														initialValue : undefined,//parentId || undefined,
														rules : [
															{ required : true, message : '请选择联系人'}
														]
													})(
														<Select
															showSearch
															allowClear
															size = 'default'
															placeholder = "请选择联系人"
															optionFilterProp = "children"
															notFoundContent = "没有联系人"
														>
															{ recommenderList && recommenderList.map(function( item, index ){
																return ( <Option key = { 'parentName_' + item.id } value = { item.id } >{ item.name }</Option> )
															})}
														</Select>
													)}
								            </FormItem>
                                            :
                                            <div>
                                                <FormItem
                                                    label = "姓名"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('parentName', {
                                                        rules : [
                                                            { required : true, message : '请输入联系人姓名' , whitespace : true }
                                                        ]
                                                    })(

                                                        <Input size = 'default' placeholder = '请输入联系人姓名' onBlur = { ( e ) => checkStuNameAndPhone( e, 'parentMobile', getFieldValue('orgId') ) }  />
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "性别"
                                                    style = {{ lineHeight : '30px' }}
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('psex')(
                                                        <RadioGroup>
                                                            <Radio key = "1" value = '男'>男</Radio>
                                                            <Radio key = "2" value = '女'>女</Radio>
                                                        </RadioGroup>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "QQ"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('qqNumber')(
                                                        <Input placeholder = '请输入QQ号' size = 'default' />
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "部门"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('department')(
                                                        <Input placeholder = '请输入部门' size = 'default'/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "邮箱"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('email')(
                                                        <Input placeholder = '请输入邮箱' size = 'default'/>
                                                    )}
                                                </FormItem>
                                                <FormItem
                                                    label = "备注"
                                                    { ...formItemLayout }
                                                >
                                                    { getFieldDecorator('remarks')(
                                                        <Input placeholder = '请输入备注' size = 'default'/>
                                                    )}
                                                </FormItem>
                                            </div>
                                        }
                                    </QueueAnim>
								</div>
							</Form>
						</div>
						:
                        null
					}
				</QueueAnim>
			}
        </Modal>
    )
}

export default Form.create()(StudentManageCreateForm);
