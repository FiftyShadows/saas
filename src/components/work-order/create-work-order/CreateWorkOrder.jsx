import React from 'react';
import { Modal, Button, Form, Input, message , Spin , Select } from 'antd';
import styles from './CreateWorkOrder.less';
import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: { span: 4 },
    wrapperCol: { span: 20 },
};

/*新增工单弹出modal*/
const CreateWorkOrder = ({
    dp,                                     //dispatch方法
    createWorkOrderModalVisible,            //modal是否显示
    createWorkOrderModalLoading,            //modal加载状态
    createWorkOrderModalButtonLoading,      //modal按钮加载状态
    workOrderPriority,                      //工单优先级
    workOrderType,                          //工单类型
    acceptor,                               //受理人
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


    function handleComplete(e,type){
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            dp('workOrder/WorkOrderCreate',values);
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        dp('workOrder/updateState' , { createWorkOrderModalVisible : false })
    }

    //模态框的属性
    let modalOpts = {
        title: '新建工单',
        maskClosable : false,
        visible : createWorkOrderModalVisible,
        closable : true,
        width : 550,
        onCancel : handleCancel,
        footer : [
            <Button key = "cancel" type = "ghost" onClick = { handleCancel }>取消</Button>,
            <Button key = "submit" type = "primary"
                    onClick = { handleComplete }
                    disabled = { createWorkOrderModalButtonLoading }
                    loading = { createWorkOrderModalButtonLoading }
                    style = {{ marginLeft : 10 }}>新建</Button>
        ],
        className : 'create_work_order_modal'
    };

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { createWorkOrderModalLoading }>
                <FormItem
                    label = "工单标题"
                    {...formItemLayout}
                >
                    {getFieldDecorator('title', {
                        rules : [
                            { required : true , message : '请输入工单标题' , whitespace : true , max : 50 }
                        ]
                    })(
                        <Input placeholder = '请输入工单标题' size = 'default'/>
                    )}
                </FormItem>
                <FormItem
                    label = "工单内容"
                    {...formItemLayout}
                >
                    {getFieldDecorator('content', {
                        rules : [
                            { required : true , message : '请输入工单内容(1-500字)' , whitespace : true , max : 500 }
                        ]
                    })(
                        <Input type = 'textarea' placeholder = '请输入工单内容(1-500字)' autosize = {{ minRows : 3 , maxRows : 6 }}/>
                    )}
                </FormItem>
                <FormItem
                    label="工单优先级"
                    {...formItemLayout}
                >
                    {getFieldDecorator('priority', {
                        rules : [
                            { required : true , message : '请选择工单优先级' }
                        ]
                    })(
                        <Select
                            notFoundContent = "未找到"
                            showSearch
                            allowClear
                            size = 'default'
                            placeholder = '请选择工单优先级'
                            optionFilterProp = "children"
                            style = {{ width : 180 }}>
                            { workOrderPriority && workOrderPriority.length > 0 ?
                                workOrderPriority.map((item,index) => <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>) : [] }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label = "工单类型"
                    {...formItemLayout}
                >
                    {getFieldDecorator('type', {
                        rules : [
                            { required : true , message : '请选择工单类型' }
                        ]
                    })(
                        <Select
                            notFoundContent = "未找到"
                            showSearch
                            allowClear
                            size = 'default'
                            placeholder = '请选择工单类型'
                            optionFilterProp = "children"
                            style = {{ width : 180 }}>
                            { workOrderType && workOrderType.length > 0 ?
                                workOrderType.map((item,index) => <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>) : [] }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    label = "受理人"
                    {...formItemLayout}
                >
                    {getFieldDecorator('acceptor')(
                        <Select
                            notFoundContent = "未找到"
                            showSearch
                            allowClear
                            size = 'default'
                            placeholder = '请选择受理人'
                            optionFilterProp = "children"
                            style = {{ width : 180 }}>
                            { acceptor && acceptor.length > 0 ?
                                acceptor.map((item,index) => <Option key = { item.userId + '' } value = { item.userId + '' }>{ item.userName + '' }</Option>) : [] }
                        </Select>
                    )}
                </FormItem>
            </Spin>
        </Modal>
    );
};

export default Form.create()(CreateWorkOrder);
