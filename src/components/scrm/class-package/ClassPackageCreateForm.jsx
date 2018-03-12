import React from 'react';
import { Form, Modal, Button, Popconfirm, Icon, Select, Upload, Input, message, Radio } from 'antd';
import TenantOrgSelect from '../../../pages/common/tenant-org-filter/TenantOrgFilter';
import QueueAnim from 'rc-queue-anim';
import style from './ClassPackageCreateForm.less';
let Option = Select.Option;
let FormItem = Form.Item;
let RadioGroup = Radio.Group;

function ClassPackageCreateForm({
    createClassPackageVisible,
    orgIdList,

    confirmAddClassPackage,
    cancelAddClassPackage,

    selectOrgId,

    classHourInfo,
    courseOptList,

    selectedCourseIds,
    signleClassPackageInfo,

    TenantSelectOnSelect,

    courseNameList,
    selectedCourse,

    classPackageId,
    createOrgId,

	orgKind,

	classPackageBtnLoading,

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

    //改变校区时清空所选课程
    function TenantSelectOnSelectAction( value ){
        let classHourInfoDevide = getFieldValue('classHourInfoDevide');
        classHourInfoDevide && classHourInfoDevide.map(function(item, index){
            let  courseId = 'courseId_' + item.key;
            setFieldsValue({ [ courseId ] : undefined });
        });
        if( !!value ){
            TenantSelectOnSelect( value );
        }
    };

    //校区下拉列表属性
    let tenantOrgSelectProps = {
        width        : 432,
        onSelect     : TenantSelectOnSelectAction,            //改变机构触发事件
        disabled     : !!classPackageId,
    };

    let formItemLayout = {
        labelCol : { span : 4 },
		wrapperCol : { span : 20 }
    }

    //确认新增产品
    function confirmAddClassPackageAction(){
        validateFieldsAndScroll( (err, values) => {
            if( !!err ){
                return;
            }
            let params = [];
            let selectedCourseIds = [];
            let courseCountTotal = 0;
            let classHourInfo = values.classHourInfoDevide;
            if( getFieldValue('cType') == '2' ){
                classHourInfo.map(function(item,index){
                    params.push({
                        courseId : getFieldValue([ 'courseId_' + item.key ]).split('_')[0],
                        courseName : getFieldValue([ 'courseId_' + item.key ]).split('_')[1],
                        courseCount : getFieldValue([ 'courseCount_' + item.key ])
                    });
                    courseCountTotal += Number(getFieldValue([ 'courseCount_' + item.key ]));
                    selectedCourseIds.push(getFieldValue([ 'courseId_' + item.key ]))
                });
                let newSelectedCourseIds = [];
                for( let i = 0; i < selectedCourseIds.length; i++ ){
                    if( newSelectedCourseIds.indexOf( selectedCourseIds[i]) == -1 ){
                        newSelectedCourseIds.push( selectedCourseIds[i] )
                    } else {
                        message.error('不能选择相同的模块');
                        return;
                    }
                };
                if( Number(courseCountTotal) !== Number(getFieldValue('amount')) ){
                    message.error('分配模块数一定等于总数');
                    return;
                }
            };
            values.scope = JSON.stringify(params);
            values.type = '1';
            confirmAddClassPackage( values );
            cancelAddClassPackageAction();
        })
    };

    //取消新增产品
    function cancelAddClassPackageAction(){
        resetFields();
        cancelAddClassPackage();
    };

    //删除课时分配
    function removeClassHourDevide( removeKey ){
        let classHourInfoDevide = getFieldValue('classHourInfoDevide') || [];
        let newClassHourInfoDevide = [];
        classHourInfoDevide && classHourInfoDevide.length > 0 && classHourInfoDevide.map(function(item ,index){
            if( item.key != removeKey){
                newClassHourInfoDevide.push(item)
            }
        })
        setFieldsValue({ 'classHourInfoDevide' : newClassHourInfoDevide });
    };

    //新增课时分配
    function addClassHourDevide(){
        let classHourInfoDevide = getFieldValue('classHourInfoDevide') || [];
        if( classHourInfoDevide && classHourInfoDevide.length > 0 ){
            let length = classHourInfoDevide.length;
            let maxItem = classHourInfoDevide[ length - 1 ] || {};
            let maxKey = maxItem.key;
            classHourInfoDevide.push({
                key : maxKey + 1,
                c_item : {}
            });
        }else {
            classHourInfoDevide.push({
                key : 0,
                c_item : {},
            })
        }
        setFieldsValue({ classHourInfoDevide });
    };

    let objClassHourInfo = [];
    if( classHourInfo !== '*' ){
        let init_classHourInfo = JSON.parse(classHourInfo) || [{}];
        init_classHourInfo && init_classHourInfo.length > 0 && init_classHourInfo.map(function(item, index){
            objClassHourInfo.push({
                key : index,
                c_item : item,
            })
        });
    }else {
        objClassHourInfo.push({
            key : 0,
            c_item : {}
        })
    };
    getFieldDecorator('classHourInfoDevide',{
        initialValue : objClassHourInfo,
        rules : [
        ]
    });

    let classHourInfoDevide = getFieldValue('classHourInfoDevide');

    function checkCourseNum(rule, value, callback) {
        if( value == '' || value == undefined || value == null ){
            callback();
        }else if( value == 0 ){
			callback('数字不能为0');
		}else if (!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('数字格式不正确'));
        }else {
            callback();
        }
	}

	return(
       <Modal
            className = "zj_class_package_create_form"
            visible = { createClassPackageVisible }
            title = '产品信息'
            maskClosable = { false }
            width = '550px'
            onCancel = { cancelAddClassPackageAction }
            footer = {[
				<Button key = "cancelAddClassPackage"  onClick = { cancelAddClassPackageAction } >取消</Button>,
				<Button
					key = "confirmAddClassPackage"
					type = "primary"
					onClick = { confirmAddClassPackageAction }
					loading = { classPackageBtnLoading }
					disabled = { classPackageBtnLoading }
                    style = {{ marginLeft : 20 }}
				>保存</Button>
			]}
        >
            <Form>
                { !!createClassPackageVisible &&
                    <FormItem
                        label = "所属校区"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('orgId',{
                            initialValue : !signleClassPackageInfo.orgId ? (!createOrgId ?"":createOrgId):signleClassPackageInfo.orgId ,
                            rules : [
                                { required : true, message : '请选择校区' }
                            ]
                        })(
                            <TenantOrgSelect { ...tenantOrgSelectProps } />
                        )}
                    </FormItem>
                }
                <FormItem
                    label = "产品-名称"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('name',{
                        initialValue : signleClassPackageInfo.name || '',
                        rules : [
                            { required : true, message : '请输入产品名称', whitespace: true }
                        ]
                    })(
                        <Input size = 'default' placeholder = '请输入产品名称' />
                    )}
                </FormItem>
                <FormItem
                    label = "数量"
                    help = '正数，可精确到小数点后2位'
                    { ...formItemLayout }
                >
                    { getFieldDecorator('amount',{
                        initialValue : ( !!signleClassPackageInfo.amount && signleClassPackageInfo.amount + '' ) || '',
                        rules : [
                            { required : true, message : '请输入数量', whitespace: true },
                            { validator :  checkCourseNum },
                        ]
                    })(
                        <Input size = 'default' placeholder = '请输入数量' />
                    )}
                </FormItem>
                <FormItem
					style = {{ lineHeight : '32px' , marginBottom : 10 }}
                    label = "类型"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('cType',{
                        initialValue : signleClassPackageInfo.cType || '2',
                        rules : [
                            { required : true, message : '请选择类型' }
                        ]
                    })(

                        <RadioGroup style = {{ width : '390px'}} >
                            {/*<Radio value = '2' >专用课时 : 需要制定某个课程使用这种课时(需要开通教学模块才能使用)</Radio>*/}
                            <Radio value = '2' >专用产品：特定产品</Radio>
						</RadioGroup>
                    )}
                </FormItem>
            </Form>
            <QueueAnim
                type = {['top', 'top']}
                ease = {['easeOutQuart', 'easeInOutQuart']}
                className = "overview-content-item"
                style = {{ width : '100%' }} >
                { !!getFieldValue('cType') && getFieldValue('cType') == 2 &&
                    <div key = 'classHourInfoDevideQueueAnim' >
                        { classHourInfoDevide && classHourInfoDevide.length > 0 && classHourInfoDevide.map(function(item, index){
                            let classHourFormItemLayout = {
                                labelCol   : { span : 8 },
                                wrapperCol : { span : 14 }
                            }
                            let canRemove = classHourInfoDevide.length !== 1;
                            return(
                                <Form className = { style.classHour_devide } key = { 'classHourInfoDevide_' + item.key } layout = 'inline' >
                                    <FormItem
                                        { ...classHourFormItemLayout }
                                        label = '分配模块'
                                        style = {{ width : '260px' }}
                                    >
                                        { getFieldDecorator('courseId_' + item.key,{
                                            initialValue : item.c_item.courseId && item.c_item.courseName && item.c_item.courseId + '_' + item.c_item.courseName || undefined,
                                            rules : [
                                                { required : true, message : '请选择模块' }
                                            ]
                                        })(
                                            <Select
                                                showSearch
                                                allowClear
                                                size = 'default'
                                                placeholder = "请选择模块"
                                            >
                                               { courseOptList && courseOptList.map(function(item, index){
                                                    return ( <Option key = { 'courseOptList_' + index } value = { item.id + '_' + item.title } >{ item.title }</Option> )
                                                }) }
                                            </Select>
                                        )}
                                    </FormItem>
                                    <FormItem
                                        help = '正数, 可精确到小数点后2位'
                                        >
                                        { getFieldDecorator('courseCount_' + item.key,{
                                            initialValue : item.c_item.courseCount || '',
                                            rules : [
                                                { required : true, message : '请输入模块数', whitespace: true },
                                                { validator :  checkCourseNum }
                                            ]
                                        })(
                                            <Input size = 'default' placeholder = '请输入模块数' style = {{ width : '210px' }} />
                                        )}

                                        {!!canRemove &&
                                          <Icon
                                              style = {{ marginLeft : '10px' , cursor : 'pointer', fontSize : '18px' }}
                                              type  = "minus-circle-o"
                                              onClick = { () => removeClassHourDevide( item.key ) }
                                          />
                                        }
                                    </FormItem>
                                </Form>
                            )
                        }) }
                    </div>
                }
            </QueueAnim>
            <Form>
                { getFieldValue('cType') == '2' ?
                    <FormItem
                        wrapperCol = {{ offset : 5, span : 16 }}
                    >
                        <Button type = "dashed" onClick = { addClassHourDevide } style = {{ width : '346px' }} >
                            <Icon type="plus" />添加
                        </Button>
                    </FormItem>
                    : null
                }
                <FormItem
                    label = "产品描述"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('intro',{
                        initialValue : signleClassPackageInfo.intro || '',
                        rules : [
                        ]
                    })(
                        <Input  size = 'default' type = 'textarea' placeholder = '请输入产品描述' autosize = {{ minRows : 3 , maxRows : 4 }}/>
                    )}
                </FormItem>
                <FormItem
                    label = "标准价格"
                    { ...formItemLayout }
					help = '正数，可精确到小数点后2位'
                >
                    { getFieldDecorator('price',{
                        initialValue : ( !!signleClassPackageInfo.price && signleClassPackageInfo.price + '' ) || '',
                        rules : [
                            { required : true, message : '请输入标准价格', whitespace: true},
							{ validator :  checkCourseNum }
                        ]
                    })(
                        <Input size = 'default' placeholder = '请输入标准价格' />
                    )}
                </FormItem>
                <FormItem
                    label = "状态"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('status',{
                        initialValue : signleClassPackageInfo.status || '1',
                        rules : [
                            { required : true, message : '请选择状态' }
                        ]
                    })(
                        <Select
                            size = 'default'
                            allowClear
                            placeholder = '请选择状态'
                        >
                            <Option value = '1' >上架</Option>
                            <Option value = '2' >下架</Option>
                        </Select>
                    )}
                </FormItem>
            </Form>
        </Modal>
	)
};

export default Form.create({})(ClassPackageCreateForm);
