import React from 'react';
import { Button , Form , Input , Select , DatePicker , message } from 'antd';
import styles from './AddFollowRecord.less';
const Option = Select.Option;

/*跟进记录*/
function AddFollowRecord({
    leadsFollowDetailLeadMessage,           //选中leads名单查看详情时当前人的信息
    leadsFollowWay,                         //跟进方式
    leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
    leadsFollowFollowRecordButtonLoading,   //新增跟进记录发布按钮是否加载
    LeadsFollowFollowRecordAdd,             //新增跟进记录
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
}){

    let followWay = [];     //跟进方式
    let followState = [];   //跟进状态

    //跟进方式渲染
    if(leadsFollowWay && leadsFollowWay.length > 0){
        followWay = leadsFollowWay.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>
            );
        })
    }

    //跟进状态渲染
    if(leadsFollowFastSearchFollowState && leadsFollowFastSearchFollowState.length > 0){
        followState = leadsFollowFastSearchFollowState.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>
            );
        })
    }

    //时间选择器时间范围限制
    function disabledDate(current) {
        return current && current.valueOf() < Date.now() - 24*60*60*100;
    }

    //点击发布
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            /*if (!!errors) {
                return;
            }*/
            if(values.content == '' || values.content == null || values.content == undefined || /^[\s]*$/.test(values.content)){
                return message.warn('跟进记录内容必填');
            }
            if(values.content.length > 500){
                return message.warn('跟进记录内容超过字数限制');
            }
            if(values.type == '' || values.type == null || values.type == undefined || /^[\s]*$/.test(values.type)){
                return message.warn('跟进方式必选');
            }
            //当前leads的id
            values.stuId = leadsFollowDetailLeadMessage.id || undefined;

            //当前leads的orgId
            values.orgId = leadsFollowDetailLeadMessage.orgId || undefined;

            //格式化时间
            if(values.nextFollowTime != '' && values.nextFollowTime != null && values.nextFollowTime != undefined && !/^[\s]*$/.test(values.type)){
                values.nextFollowTime = values.nextFollowTime.format('YYYY-MM-DD HH:mm:ss');
            }

            //来源 leads
            values.source = '2';
            LeadsFollowFollowRecordAdd(values);
            resetFields();
        });
    }

    return(
        <div className={styles.add_new_follow_record}>
            <div>
                {getFieldDecorator('content',{
                    rules: [
                        { max: 500, message: '限500汉字以内', },
                    ],
                })(
                    <Input type = 'textarea' autosize = {{ minRows : 3 , maxRows : 3 }} placeholder = '新建跟进记录...（必填，限500字）'/>
                )}
            </div>
            <div className={styles.add_new_follow_record_detail}>
                <div>
                    {getFieldDecorator('parentId',{
                        initialValue : leadsFollowDetailLeadMessage.parentId || undefined
                    })(
                        <Select
                            style = {{ width : 180 }}
                            placeholder = '请选择联系人信息（选填）'
                            size = 'default'
                            allowClear
                            showSearch
                            optionFilterProp = "children"
                            notFoundContent = "未找到">
                            { leadsFollowDetailLeadMessage.parentId && leadsFollowDetailLeadMessage.parentName &&
                              leadsFollowDetailLeadMessage.parentId != null && leadsFollowDetailLeadMessage.parentId != undefined &&
                              leadsFollowDetailLeadMessage.parentName != null && leadsFollowDetailLeadMessage.parentName != undefined ?
                                <Option value = { leadsFollowDetailLeadMessage.parentId }>{ leadsFollowDetailLeadMessage.parentName + '（联系人姓名）' }</Option>
                                :
                                null
                            }
                        </Select>
                    )}
                </div>
                <div>
                    {getFieldDecorator('type',{
                        initialValue : 'phone'
                    })(
                        <Select
                            style = {{ width : 180 }}
                            placeholder = '请选择跟进方式（必选）'
                            size = 'default'
                            allowClear
                            showSearch
                            optionFilterProp = "children"
                            notFoundContent = "未找到">
                            { followWay || [] }
                        </Select>
                    )}
                </div>
                <div>
                    {getFieldDecorator('followType',{
                        initialValue : leadsFollowDetailLeadMessage.zj_student_follow_state || undefined,
                    })(
                        <Select
                            style = {{ width : 180 }}
                            placeholder = '请选择跟进状态（选填）'
                            size = 'default'
                            allowClear
                            showSearch
                            optionFilterProp = "children"
                            notFoundContent = "未找到">
                            { followState || [] }
                        </Select>
                    )}
                </div>
                <div>
                    {getFieldDecorator('nextFollowTime')(
                        <DatePicker
                            style = {{ width : 178 }}
                            placeholder = '下次跟进时间（选填）'
                            disabledDate = { disabledDate }
                            showTime
                            format = "YYYY-MM-DD HH:mm"/>
                    )}
                </div>
                <div>
                    <Button type = 'primary' style={{ width : 80 }} onClick = { handleComplete } disabled = { leadsFollowFollowRecordButtonLoading } loading = { leadsFollowFollowRecordButtonLoading }>发布</Button>
                </div>
            </div>
        </div>
    );
}

export default Form.create()(AddFollowRecord);
