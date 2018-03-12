import React from 'react';
import { Modal, Button, Form, Spin, Input, InputNumber, Select, Radio } from 'antd';
import QueueAnim from 'rc-queue-anim';
import styles from './CreateModal.less';
import TenantOrgFilter from '../../../../pages/common/tenant-org-filter/TenantOrgFilter';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span: 20 },
};

/*新建退款单modal*/
const CreateModal = ({
    defaultFirstOrgId,                      //新建选择校区时默认填写的orgId
    defaultFirstOrgName,                    //新建选择校区时校区选中项的orgName
    refundFormCreateModalLoading,           //新建退款单modal加载状态
    refundFormCreateModalVisible,           //新建退款单modal是否显示
    refundFormCreateModalButtonLoading,     //新建退款单modal按钮加载状态
    refundFormCreateModalStu,               //新建退款单modal校区下学员下拉列表
    refundFormCreateModalMemCard,           //新建退款单modal校区下的会员卡下拉列表
    refundFormCreateModalOrderId,           //新建退款单modal校区下的合同下拉列表
    refundFormCreateModalContractNum,       //新建退款单modal选择退课时合同号下拉列表
    refundFormCreateModalCourseDetail,      //新建退款单选择退课的课程详细信息数组
    refundFormCreateModalRefundDetail,      //退款信息

    RefundFormCreateOrgOnSelect,            //新建退款单校区选择onSelect事件
    RefundFormStuOnChange,                  //新建退款单学员onChange事件
    RefundFormOrderOnChange,                //新建退款单合同onChange事件
    RefundFormRefundTypeOnChange,           //新建退款单退款类型下拉列表onChange事件(退款和退课时需要请求不同的接口)
    RefundFormPurchaseIdOnChange,           //新建退款单退课时选择合同号onChange事件
    RefundFormPeriodInfoOnChange,           //新建退款单选择课时onChange事件
    RefundFormCreateModalSubmit,            //新建退款单modal点击提交
    RefundFormCreateModalClose,             //新建退款单modal关闭方法
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        setFieldsValue,
        validateFieldsAndScroll,
    },
  }) => {


    let stu = [];           //付费客户
    let memCard = [];       //会员卡(用不到)
    let moneyContract = []; //退款合同号
    let contract = [];      //退课时合同号(用不到)
    let course = [];        //课程(用不到)

    //渲染联系人下拉列表
    if(refundFormCreateModalStu && refundFormCreateModalStu.length > 0){
        stu = refundFormCreateModalStu.map((item,index) => {
            return(
                <Option key = { item.stuId + '' } value = { item.stuId + '' }>{ item.stuName + '' }</Option>
            );
        })
    }

    //渲染会员卡下拉列表
    if(refundFormCreateModalMemCard && refundFormCreateModalMemCard.length > 0){
        memCard = refundFormCreateModalMemCard.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' }>{ item.id + '' }</Option>
            );
        })
    }

    //渲染退款合同号下拉列表
    if(refundFormCreateModalOrderId && refundFormCreateModalOrderId.length > 0){
        moneyContract = refundFormCreateModalOrderId.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' }>{ item.order_num + '' }</Option>
            );
        })
    }

    //渲染退课时合同号下拉列表
    if(refundFormCreateModalContractNum && refundFormCreateModalContractNum.length > 0){
        contract = refundFormCreateModalContractNum.map((item,index) => {
            return(
                <Option key = { item.purchaseId + '' } value = { item.purchaseId + '' }>{ item.orderNum + '' }</Option>
            );
        })
    }

    //渲染退课课程下拉列表
    if(getFieldValue('refundType') == '2' && refundFormCreateModalRefundDetail && refundFormCreateModalRefundDetail.length > 0){
        course = refundFormCreateModalRefundDetail.map((item,index) => {
            return(
                <Option key = { item.courseId + '' } value = { item.courseId + '' }>{ item.courseName + '' }</Option>
            );
        })
    }

    //校区选择onSelect事件
    function OrgOnSelect(orgId,orgName){
        resetFields();
        RefundFormCreateOrgOnSelect(orgId,orgName);
    }

    //付费客户选择onChange事件
    function StuOnChange(stuId){
        if(getFieldValue('orderId')){
            setFieldsValue({ orderId : undefined })
        }
        RefundFormStuOnChange(stuId);
    }

    //销售用crm系统客户合同下拉列表onChange事件
    function OrderOnChange(e){
        if(getFieldValue('money')){
            setFieldsValue({ money : undefined })
        }
        RefundFormOrderOnChange(e);
    }

    //合同编号下拉列表onChange事件
    function PurchaseIdOnChange(refundType,e,cardId){
        //清空选择退课
        if(getFieldValue('periodInfo')){
            setFieldsValue({ periodInfo : undefined });
        }
        RefundFormPurchaseIdOnChange(refundType,e,cardId)
    }

    //校验退款金额
    function checkRefundMoney(rule, value, callback){
        if(value == '' || value == null || value == undefined){
            callback();
        }else if(!/^\+?(:?(:?\d+\.\d+)|(:?\d+))$/.test(value)){
            callback('退款金额必须是整数且不能小于0');
        }else if(parseFloat(value) > parseFloat(refundFormCreateModalRefundDetail)){
            callback('已超出最大可退金额');
        }else{
            callback();
        }
    }

    //检验填写课时数是否正整数
    function checkRefundCourse(rule,value,callback,maxNum){
        if(value == '' || value == null || value == undefined){
            callback();
        }else if(!/^[0-9]+(.[0-9]{1,2})?$/.test(value)) {
            callback(new Error('课时数格式不正确'));
        }else if(parseFloat(value) > parseFloat(maxNum)){
            callback(new Error('已超过最大可退数'));
        }else {
            callback();
        }
    }

    function handleComplete(e){
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }

            //处理orgName
            values.orgName = defaultFirstOrgName || '';

            if(values.refundType == '2'){
                let periodInfo = [];
                for(let i in values.periodInfo){
                    periodInfo.push({
                        courseId : values.periodInfo[i],
                        periodNum : values[`courseDetail${values.periodInfo[i]}`]
                    });
                    delete values[`courseDetail${values.periodInfo[i]}`];
                }
                values.periodInfo = JSON.stringify(periodInfo);
            }

            //删除联系人信息
            delete values.parent;
            RefundFormCreateModalSubmit(values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        RefundFormCreateModalClose();
    }

    //模态框的属性
    let modalOpts = {
        title: '新建退款',
        maskClosable : false,
        visible : refundFormCreateModalVisible,
        closable : true,
        width : 550,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={refundFormCreateModalButtonLoading}
                    loading={refundFormCreateModalButtonLoading}
                    style={{marginLeft:20}}>新建</Button>
        ],
        className : 'refund_form_createModal'
    };

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { refundFormCreateModalLoading }>
                <Form>
                    <FormItem
                        label="所属校区"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('orgId', {
                            initialValue : defaultFirstOrgId || undefined,
                            rules : [
                                { required : true , message : '请选择所属校区' }
                            ]
                        })(
                            <TenantOrgFilter width = { 432 } onSelect = { OrgOnSelect }/>
                        )}
                    </FormItem>
                    <FormItem
                        label="退款类型"
                        key = 'refundType'
                        {...formItemLayout}
                        style = {{ lineHeight : '30px' }}
                    >
                        {getFieldDecorator('refundType', {
                            initialValue : '1',
                            rules : [
                                { required : true , message : '请选择退款类型' }
                            ]
                        })(
                            <RadioGroup>
                                <Radio key = "1" value = '1'>退款</Radio>
                            </RadioGroup>
                        )}
                    </FormItem>
                    <FormItem
                        label="付费客户"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('stuId', {
                            rules : [
                                { required : true , message : '请选择付费客户' }
                            ]
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择付费客户'
                                optionFilterProp = "children"
                                onChange = { StuOnChange }>
                                { stu || [] }
                            </Select>
                        )}
                    </FormItem>
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        { getFieldValue('stuId') != null && getFieldValue('stuId') != undefined && getFieldValue('stuId') != '' ?
                            <FormItem
                                label = "合同"
                                key = 'orderId'
                                {...formItemLayout}
                                style = {{ marginBottom : 10 }}
                            >
                                {getFieldDecorator('orderId', {
                                    rules : [
                                        { required : true , message : '请选择合同' }
                                    ]
                                })(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择合同'
                                        optionFilterProp = "children"
                                        onChange = { OrderOnChange }>
                                        { moneyContract || [] }
                                    </Select>
                                )}
                            </FormItem>
                            :
                            null
                        }
                    </QueueAnim>
                    <QueueAnim
                        type={['top', 'top']}
                        ease={['easeOutQuart', 'easeInOutQuart']}>
                        { getFieldValue('orderId') != null && getFieldValue('orderId') != undefined && getFieldValue('orderId') != '' ?
                            <div key = 'refundMoney'>
                                <FormItem
                                    label = "退款金额"
                                    extra = { `最多可退${refundFormCreateModalRefundDetail}元` }
                                    {...formItemLayout}
                                    style = {{ marginBottom : 10 }}
                                >
                                    {getFieldDecorator('money', {
                                        rules : [
                                            { required : true , message : '请输入退款金额' , whitespace : true },
                                            { validator: checkRefundMoney },
                                        ]
                                    })(
                                        <Input placeholder = '请输入退款金额' size = 'default'/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "退款备注"
                                    {...formItemLayout}
                                >
                                    {getFieldDecorator('reason')(
                                        <Input type = 'textarea' placeholder = '请输入退款原因' autosize = {{ minRows : 3 , maxRows : 3 }}/>
                                    )}
                                </FormItem>
                            </div>
                            :
                            null
                        }
                    </QueueAnim>
                </Form>
            </Spin>
        </Modal>
    );
};

export default Form.create()(CreateModal);
