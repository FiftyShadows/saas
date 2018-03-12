import React from 'react';
import { Form, Modal, Button, Popconfirm, Icon, Select, Upload, Input, message, Radio, DatePicker } from 'antd';
import TenantOrgSelect from '../../../pages/common/tenant-org-filter/TenantOrgFilter';
import styles from './ParentManageCreateForm.less';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
let Option     = Select.Option;
let FormItem   = Form.Item;
let RadioGroup = Radio.Group;

function ClassPackageCreateForm({
    createParentVisible,
    stuIdList,
    parentIdList,
    parentRelationList,
    parentDetailInfo,
    stuId,
    updateOrgId,
    orgId,
    parentId,
    updateParentId,
    oldParentId,
    createOrgId,


    TenantSelectOnSelect,

    cancelAddParent,
    confirmAddParent,

    checkParent,            //检验联系人/手机号是否存在

	openId,

	parentCreateBtnLoading,

	checkoutParentName,

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
    //验证手机号是否存在
    function checkParentAction( e, changeParentInfoSelect ){
        let value = e.target.value;
        if( !!value && value.length == '11' ){
            checkParent( value, changeParentInfoSelect )
        }
    };

    //改变校区时清空所选课程
    function TenantSelectOnSelectAction( orgId ){
        setFieldsValue({ 'stuId'  : undefined });    //清空学员
        setFieldsValue({ 'mobile' : '' });
        if( !!orgId ){
            TenantSelectOnSelect( orgId );
        }
    };
    //校区下拉列表属性
    let tenantOrgSelectProps = {
        width        : 387,
        onChange     : TenantSelectOnSelectAction,            //改变机构触发事件
        disabled     : !!updateOrgId
    };

    let formItemLayout = {
        labelCol   : { span : 5 },
		wrapperCol : { span : 18 }
    };

    //确认新增联系人
    function confirmAddParentAction(){
        validateFieldsAndScroll( (err, values) => {
            if( !!err ){
                return;
            };
            if( !!oldParentId && updateParentId != oldParentId ){
                return message.error('手机号已被占用');
            }
            confirmAddParent( values, changeParentInfoSelect );
        })
    };

    //取消新增联系人
    function cancelAddParentAction(){
        cancelAddParent();
    }

    function afterClose(){
        resetFields();
    };

    //验证手机号若存在，从联系人库选择联系人
    function changeParentInfoSelect( id ) {
        setFieldsValue({ 'parentInfo' : '2' });
        setFieldsValue({ 'id' : id });
    }

    //校验手机号格式
    function checkMobile( rule, value, callback ){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if( !(/^1[0-9]{10}$/.test( value )) ){
            callback(new Error('请输入正确的手机号'));
        }else{
            callback();
        }
    };

	return(
       <Modal
            className = "zj_parent_manage_create_form"
            visible = { createParentVisible }
            title = '联系人信息'
            maskClosable = { false }
            width = '550px'
            onCancel = { cancelAddParentAction }
            afterClose = { afterClose }
            footer = {[
                <Button key="cancel" type="ghost" onClick={cancelAddParentAction}>取消</Button>,
                <Button key="submit" type="primary"
                        onClick={confirmAddParentAction}
                        disabled={parentCreateBtnLoading}
                        loading={parentCreateBtnLoading}
                        style={{marginLeft:20}}>确认</Button>
			]}
        >
            <Form>
                { !!createParentVisible &&
                    <FormItem
                        label = "所属校区"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('orgId',{
                            initialValue :  !parentDetailInfo.orgId ? createOrgId :  parentDetailInfo.orgId  ,
                            rules : [
                                { required : true, message : '请选择校区' }
                            ]
                        })(
                            <TenantOrgSelect { ...tenantOrgSelectProps } />
                        )}
                    </FormItem>
                }
                <FormItem
                    label = "关联客户(付费)"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('stuId', {
                        initialValue : parentDetailInfo.stuId || undefined,
                        rules : [
                            { message : '请选择付费客户' }
                        ]
                    })(
                        <Select
                            size = 'default'
                            showSearch
                            allowClear
                            placeholder = "请选择付费客户"
                            optionFilterProp = "children"
                            notFoundContent = "没有付费客户"
                            disabled = { !!stuId }
                        >
                            { stuIdList && stuIdList.map(function( item, index ){
                                return ( <Option key = { 'parent_stuId' + item.stuId } value = { item.stuId } >{ item.stuName }</Option> )
                            })}
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label = "联系人姓名"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('name',{
                        initialValue : parentDetailInfo.name || '',
                        rules : [
                            { required : true, message : '请输入联系人姓名', whitespace: true, }
                        ]
                    })(
                        <Input size = 'default' placeholder = '请输入联系人姓名' /*onBlur = { ( e ) => checkoutParentName( e, getFieldValue('orgId'), parentDetailInfo.id ) } *//>
                    )}
                </FormItem>
                <FormItem
                    label = "手机号"
                    { ...formItemLayout }
                    help = { !!openId && '手机已验证, 不能修改'}
                    style = {{ marginBottom : 10 }}
                >
                    { getFieldDecorator('mobile',{
                        initialValue : parentDetailInfo.mobile || undefined,
                        rules : [
                            { required : true, message : '请输入联系方式' },
                            { validator : checkMobile }
                        ]
                    })(
                        <Input disabled = { !!openId } size = 'default' placeholder = '请输入联系方式' onChange = { (e) => checkParentAction( e, changeParentInfoSelect ) } />
                    )}
                </FormItem>
                <FormItem
                    label = "性别"
                    style = {{ lineHeight : '30px' }}
                    { ...formItemLayout }
                >
                    { getFieldDecorator('psex',{
                        initialValue : parentDetailInfo.psex || undefined
                    })(
                        <RadioGroup>
                            <Radio key = "1" value = '男'>男</Radio>
                            <Radio key = "2" value = '女'>女</Radio>
                        </RadioGroup>
                    )}
                </FormItem>
                <FormItem
                    label = "生日"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('pbirthday',{
                        initialValue : !!parentDetailInfo && !!parentDetailInfo.pbirthday ? moment(parentDetailInfo.pbirthday,'YYYY-MM-DD') : undefined
                    })(
                        <DatePicker format = 'YYYY-MM-DD' placeholder = '请选择生日' size = 'default' style = {{ width : 140 }}/>
                    )}
                </FormItem>
				<FormItem
                    label = "QQ"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('qqNumber',{
                        initialValue : parentDetailInfo.qqNumber || '',
                    })(
                        <Input size = 'default' placeholder = '请输入qq' />
                    )}
                </FormItem>
                <FormItem
                    label = "微信"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('weixin',{
                        initialValue : parentDetailInfo.weixin || '',
                    })(
                        <Input placeholder = '请输入微信' size = 'default'/>
                    )}
                </FormItem>
                <FormItem
                    label = "邮箱"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('email',{
                        initialValue : parentDetailInfo.email || undefined,
                        rules : [
                        ]
                    })(
                        <Input size = 'default' placeholder = '请输入邮箱' />
                    )}
                </FormItem>
                <FormItem
                    label = "部门"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('department',{
                        initialValue : parentDetailInfo.department || undefined,
                    })(
                        <Input placeholder = '请输入部门' size = 'default'/>
                    )}
                </FormItem>
                <FormItem
                    label = "职务"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('duty',{
                        initialValue : parentDetailInfo.duty || undefined,
                    })(
                        <Input placeholder = '请输入职务' size = 'default'/>
                    )}
                </FormItem>
				<FormItem
                    label = "联系地址"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('address',{
                        initialValue : parentDetailInfo.address || undefined,
                    })(
                        <Input placeholder = '请输入联系地址' size = 'default'/>
                    )}
                </FormItem>
                <FormItem
                    label = "备注"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('remarks',{
                        initialValue : parentDetailInfo.remarks || undefined,
                    })(
                        <Input type = 'textarea' autosize = {{ minRows : 3 , maxRows : 4 }} placeholder = '请输入备注' size = 'default'/>
                    )}
                </FormItem>
            </Form>
        </Modal>
	)
};

export default Form.create({})(ClassPackageCreateForm);
