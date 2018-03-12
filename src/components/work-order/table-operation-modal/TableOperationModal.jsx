import React from 'react';
import { Modal, Button, Form, Input, InputNumber, message , Popconfirm , Spin , Select } from 'antd';
import styles from './TableOperationModal.less';
import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item;
const Option = Select.Option;

const formItemLayout = {
    labelCol: { span: 3 },
    wrapperCol: { span: 21 },
};

/*列表操作弹出modal*/
const TableOperationModal = ({
    dp,                                     //dispatch方法
    acceptor,                               //受理人
    tableSelectedRowKeys,                   //列表选中项的key
    tableSelectedRow,                       //列表选中项数组
    tableOperationModalStatus,              //modal操作状态({ type : xxx , param : xxx , ids : [xxx] })
    tableOperationModalVisible,             //modal是否显示
    tableOperationModalLoading,             //modal加载状态
    tableOperationModalButtonLoading,       //modal按钮加载状态
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
            //处理ids
            values.ids = tableOperationModalStatus.ids.join(',') || undefined;

            //处理status
            values.status = tableOperationModalStatus.status || undefined;

            let type = tableOperationModalStatus.type;
            if(type == 'abolish' || type == 'over'){
                //工单作废或完结
                dp('workOrder/WorkOrderAbolishOrOver' , values)
            }else if(type == 'reply' || type == 'restart'){
                //工单回复或重新开启
                dp('workOrder/WorkOrderReplyOrRestart' , values)
            }else if(type == 'transfer'){
                //工单转交
                dp('workOrder/WorkOrderTransfer' , values)
            }
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        dp('workOrder/updateState' , { tableOperationModalStatus : {} , tableOperationModalVisible : false })
    }

    let title = tableOperationModalStatus.type == 'reply' ? '回复' :
        tableOperationModalStatus.type == 'transfer' ? '转交' :
        tableOperationModalStatus.type == 'over' ? '完结' :
        tableOperationModalStatus.type == 'abolish' ? '作废' :
        tableOperationModalStatus.type == 'restart' ? '重新开启' : '--';

    //模态框的属性
    let modalOpts = {
        title,
        maskClosable : false,
        visible : tableOperationModalVisible,
        closable : true,
        width : 550,
        onCancel : handleCancel,
        footer : [
            <Button key = "cancel" type = "ghost" onClick = { handleCancel }>取消</Button>,
            <Button key = "submit" type = "primary"
                    onClick = { handleComplete }
                    disabled = { tableOperationModalButtonLoading || (tableOperationModalStatus.ids && tableOperationModalStatus.ids.length == 0) }
                    loading = { tableOperationModalButtonLoading }
                    style = {{ marginLeft : 10 }}>{ title }</Button>
        ],
        className : 'word_order_batch_operation_modal'
    };

    //红色字体
    let RedFont = function({ children }){ return <span style = {{ color : '#cc4342' }}>{ children }</span> }

    //绿色字体
    let GreenFont = function({ children }){ return <span style = {{ color : '#88c70a' }}>{ children }</span> }

    //淡红色字体
    let LightRedFont = function({ children }){ return <span style = {{ color : '#ff7f75' }}>{ children }</span> }

    return (
        <Modal {...modalOpts}>
            <Spin spinning = { tableOperationModalLoading }>
                <div className = { styles.tip }>
                    <span>当前选中<LightRedFont>（{ tableSelectedRow && tableSelectedRow.length || 0 }）</LightRedFont>项</span>
                    <span>其中<GreenFont>（{ tableOperationModalStatus.ids && tableOperationModalStatus.ids.length || 0 }）</GreenFont>项可进行正常操作<GreenFont>（{ (tableOperationModalStatus.ids.length/tableSelectedRow.length*100).toFixed(2) }%）</GreenFont>。</span>
                    { tableSelectedRow.length > tableOperationModalStatus.ids.length ? <span>其余<RedFont>（{ tableSelectedRow.length - tableOperationModalStatus.ids.length }）</RedFont>项由于<RedFont>状态不符</RedFont>不会进行处理<RedFont>（{ ((tableSelectedRow.length - tableOperationModalStatus.ids.length)/tableSelectedRow.length*100).toFixed(2) }%）</RedFont>，<GreenFont>安心西路</GreenFont></span> : null }
                </div>
                { tableOperationModalStatus.type == 'transfer' ?
                    <FormItem
                        label = "受理人"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('acceptor',{
                            rules : [
                                { required : true , message : '请选择受理人' }
                            ]
                        })(
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
                    </FormItem> : null
                }
                <FormItem
                    label = '备注'
                    {...formItemLayout}
                >
                    {getFieldDecorator('remarks', {
                        rules : [
                            { required : true , message : `请输入${title}备注(1-500字)` , whitespace : true , max : 500 }
                        ]
                    })(
                        <Input type = 'textarea' placeholder = { `请输入${title}备注(1-500字)` } autosize = {{ minRows : 3 , maxRows : 6 }}/>
                    )}
                </FormItem>
            </Spin>
        </Modal>
    );
};

export default Form.create()(TableOperationModal);
