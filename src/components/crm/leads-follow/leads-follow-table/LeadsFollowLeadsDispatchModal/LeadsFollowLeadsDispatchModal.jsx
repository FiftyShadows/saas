import React from 'react';
import { Form, Input, Modal, Button, message, Select, Cascader, Popover, Radio, DatePicker } from 'antd';
import TenantOrgFilter from '../../../../../pages/common/tenant-org-filter/TenantOrgFilter';
import styles from './LeadsFollowLeadsDispatchModal.less';
import QueueAnim from 'rc-queue-anim';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const RangePicker = DatePicker.RangePicker;

const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 17,
    },
};

/*leads分配modal*/
const LeadsFollowLeadsDispatchModal = ({
    leadsFollowType,                            //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
    leadsFollowLeadsDispatchModalVisible,       //分配modal是否显示
    leadsFollowLeadsDispatchModalButtonLoading, //分配modal按钮是否加载状态
    leadsFollowLeadsDispatchModalStaffContent,  //分配modal校区下的员工信息
    leadsFollowLeadsDispatchModalStaffMaxLeads, //每个员工所拥有的最多leads数
    leadsFollowLeadsDispatchModalAllStaffLeads, //当前校区下员工下的leads数情况
    leadsFollowLeadsDispatchModalCurrentStaffLeads, //当前员工已分配的leads数
    leadsFollowLeadsDispatchModalWetherShowAlert,   //是否显示温馨提示，告诉用户当前销售/员工如果增加的leads超过最大leads数，并且终止用户提交
    leadsFollowTableSelectedRowKeys,            //多选框选中项的id,若无id，则取到当前索引
    leadsFollowTableSelectedRows,               //多选框选中的项的对象数组
    LeadsFollowLeadsDispatchModalSelectOnChange,//销售员工下拉列表onChange事件
    LeadsFollowLeadsDispatchModalSubmit,        //分配modal提交
    LeadsFollowLeadsDispatchModalCancel,        //分配modal关闭
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    /*员工信息渲染*/
    let staffContent = [];
    if(leadsFollowLeadsDispatchModalStaffContent && leadsFollowLeadsDispatchModalStaffContent.length > 0){
        staffContent = leadsFollowLeadsDispatchModalStaffContent.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' }>{ item.name + '' }</Option>
            );
        })
    }

    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            let stuIds = [];
            for(let i in leadsFollowTableSelectedRows){
                stuIds.push(leadsFollowTableSelectedRows[i].id);
            }
            values.stuIds = stuIds.join(',');

            delete values.orgId;

            //销售员工已有分配数+即将分配数<=最大分配数的时候才能提交
            if(leadsFollowLeadsDispatchModalStaffMaxLeads == '-1' || !leadsFollowLeadsDispatchModalWetherShowAlert){
                LeadsFollowLeadsDispatchModalSubmit(values);
            }
        });
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        LeadsFollowLeadsDispatchModalCancel();
    }

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('学员姓名不能为空'));
        }else{
            callback();
        }
    }

        //模态框的属性
    let modalOpts = {
        title: leadsFollowType == 'public' ? '捞取名单' : '分配名单',
        maskClosable : false,
        visible : leadsFollowLeadsDispatchModalVisible,
        closable : true,
        width : 550,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={leadsFollowLeadsDispatchModalButtonLoading}
                    loading={leadsFollowLeadsDispatchModalButtonLoading}
                    style={{marginLeft:20}}>确认</Button>
        ],
        className : 'LeadsFollowLeadsDispatchModal'
    };

    return (
        <Modal {...modalOpts}>
            <div className={styles.leads_follow_modals_alert_message_intro}>
                {
                    leadsFollowType != 'public' ? '请为已选中的' + leadsFollowTableSelectedRows.length + '个名单分配负责销售' :
                    leadsFollowType == 'public' && !leadsFollowLeadsDispatchModalWetherShowAlert ? '您是否将捞取的' + leadsFollowTableSelectedRows.length + '个名单分配给自己？' : null
                }
            </div>
            <Form>
                { leadsFollowType != 'public' ?
                    <FormItem
                        label = "选择销售"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('seller', {
                            rules : [
                                { required : true , message : '请选择销售' }
                            ]
                        })(
                            <Select placeholder = '请选择销售'
                                    size = 'default'
                                    allowClear
                                    showSearch
                                    optionFilterProp = "children"
                                    notFoundContent = "未找到"
                                    onChange = { LeadsFollowLeadsDispatchModalSelectOnChange }>
                                { staffContent || [] }
                            </Select>
                        )}
                    </FormItem>
                    :
                    null
                }
                <QueueAnim
                    type={['top', 'top']}
                    ease={['easeOutQuart', 'easeInOutQuart']}>
                    { leadsFollowLeadsDispatchModalStaffMaxLeads != '-1' && leadsFollowLeadsDispatchModalWetherShowAlert ?
                        <div className={styles.leads_follow_modals_alert_message} key='leads_follow_modals_alert_message'>
                            <span>温馨提示</span>
                            <div>
                                您已选中的名单数：{ leadsFollowTableSelectedRows.length }
                            </div>
                            { leadsFollowType == 'public' ?
                                <div>
                                    您还能捞取名单数：{ parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads) - parseInt(leadsFollowLeadsDispatchModalCurrentStaffLeads) }
                                </div>
                              :
                                <div>
                                    该员工还能分配名单数：{ parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads) - parseInt(leadsFollowLeadsDispatchModalCurrentStaffLeads) }
                                </div>

                            }
                            {/*<div>
                                您还能{ leadsFollowType == 'public' ? '捞取' : '分配'}名单数：{ parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads) - parseInt(leadsFollowLeadsDispatchModalCurrentStaffLeads) }
                            </div>*/}
                            <div>
                                已超出{ parseInt(leadsFollowTableSelectedRows.length) + parseInt(leadsFollowLeadsDispatchModalCurrentStaffLeads) - parseInt(leadsFollowLeadsDispatchModalStaffMaxLeads) }个，请重新{ leadsFollowType == 'public' ? '捞取' : '分配'}！
                            </div>
                        </div>
                        :
                        leadsFollowLeadsDispatchModalStaffMaxLeads == '-1' && leadsFollowType == 'public' ?
                        <div className={styles.leads_follow_modals_alert_message} key='leads_follow_modals_alert_message'>
                            <span>温馨提示</span>
                            <div>
                                您将捞取{ leadsFollowTableSelectedRows.length }个名单到自己名下，是否确定
                            </div>
                        </div>
                        :
                        null
                    }
                </QueueAnim>
            </Form>
        </Modal>
    );
};

export default Form.create()(LeadsFollowLeadsDispatchModal);
