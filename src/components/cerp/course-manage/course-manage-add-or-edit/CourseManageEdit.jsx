import React from 'react';
import QueueAnim from 'rc-queue-anim';
import TenantOrgSelect from '../../../../pages/common/tenant-org-select/TenantOrgSelect';
import TenantOrgFilter from '../../../../pages/common/tenant-org-filter/TenantOrgFilter';
import style from './CourseManageCreate.less';
import { Button , Modal , Form , Input , Select, Radio ,InputNumber} from 'antd';
import { BlockHelp } from '../../../common/new-component/NewComponent';
let FormItem = Form.Item;
let Option = Select.Option;
let RadioGroup = Radio.Group;

function CourseManageCreate({
    classOrder,             //新增编辑时课阶课系内容
	confirmEditFrom,
    cancelEditForm,
	editFormVisible,
    ageType,   //新增编辑年龄类型
    courseInfo,

    ChangeAgeType,          //年龄类型onChange事件

    //打开校区选择框
    selectOrgs, onOpenSelectOrgModal, selectModalVisible, onSelectOrgModalClose, afterSelectOrgModal,
    remindEditStatus,

    modalButtonLoading,

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

    function changeAgeType(e){
        if(!!getFieldValue('minMa')){
            setFieldsValue({ 'minMa' : undefined });
        }
        if(!!getFieldValue('maxMa')){
            setFieldsValue({ 'maxMa' : undefined });
        }
        if(!!getFieldValue('minYe')){
            setFieldsValue({ 'minYe' : undefined });
        }
        if(!!getFieldValue('maxYe')){
            setFieldsValue({ 'maxYe' : undefined });
        }
        ChangeAgeType(e.target.value)
	}

    let minMax = '';
    let maxMax = '';
    if( courseInfo.minMa == undefined || courseInfo.minMa == null ){
        minMax = ''
    }else{
        minMax = courseInfo.minMa
    }

    if( courseInfo.maxMa == undefined || courseInfo.maxMa == null ){
        maxMax = ''
    }else{
        maxMax = courseInfo.maxMa
    }
    function afterSelectOrgModalSubmit( org_select ){
        setFieldsValue({ 'orgId' : org_select.join(',') });
        afterSelectOrgModal(org_select);
    };

    //校区选择框属性
    let tenantOrgSelectProps = {
        visible    : selectModalVisible,
        onClose    : onSelectOrgModalClose,
        afterSubmit: afterSelectOrgModalSubmit,
        init_org_select: selectOrgs,
        width : 394,
    };

	//表单布局
	let formItemLayout = {
		labelCol : { span : 4 },
		wrapperCol : { span : 20 }
	};

	//保存新建课程
	function confirmCreateFormAction(){
		validateFieldsAndScroll((err, values) => {
            if (!!err) {
                return;
            }
            values.id = courseInfo.id;
            values.orgId = courseInfo.orgId;
            //默认是专用
            values.cutType = '1';
            confirmEditFrom(values);
        });
	};

	//取消新建课程
	function cancelCreateFormAction(){
        resetFields();
        cancelEditForm();
	};

     function validator(rule, value, callback) {
        if (!/^(0|[1-9][0-9]*)$/.test(value)) {
            callback(new Error('月龄需为整数'));
        }else {
            callback();
        }

	}
    function checkCourseNum(rule, value, callback) {
        if(value == '' || value == undefined || value == null){
            callback();
        }else if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('数字格式不正确'));
        }else {
            callback();
        }
	}

	return (
        <Modal
            className = "zj_yhwu_course_manage_modal"
            title = "模块信息"
            visible = { editFormVisible }
            width = '550px'
            onCancel = { cancelCreateFormAction }
            maskClosable = { false }
            footer = {[
                <Button key = "cancel" onClick = { cancelCreateFormAction } >取消</Button>,
                <Button key = "confirm" type = "primary" onClick = { confirmCreateFormAction } loading = { modalButtonLoading } disabled = { modalButtonLoading } style = {{ marginLeft : 20 }}>保存</Button>,
            ]}
        >
            <Form>
                <FormItem
                    { ...formItemLayout }
                    label = "模块名称"
                >
                    { getFieldDecorator('title',{
                        initialValue : courseInfo.title || undefined,
                        rules : [
                            { required : true , message : '请输入模块名称' }
                        ]
                    })(
                        <Input placeholder = "输入模块名称" size='default'/>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = "模块介绍"
                >
                    { getFieldDecorator('intro' , {
                        initialValue : courseInfo.intro || undefined,
                        rules : [],
                    })(
                        <Input type = "textarea" placeholder = '填写模块相对应的介绍信息...' autosize = {{ minRows : 3 , maxRows : 4 }}/>
                    )}
                </FormItem>
            </Form>
            <TenantOrgSelect { ...tenantOrgSelectProps } />
        </Modal>
	)
}

export default Form.create({})(CourseManageCreate);
