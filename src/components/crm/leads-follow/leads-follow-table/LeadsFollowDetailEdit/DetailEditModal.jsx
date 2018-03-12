import React from 'react';
import { Modal , Button , Form , Input , Select , Icon , Radio , DatePicker , Spin , message , Cascader } from 'antd';
import { BlockTitle } from '../../../../common/new-component/NewComponent';
import ChinaDivision from './CascaderAddressOptions';
import TenantOrgFilter from '../../../../../pages/common/tenant-org-filter/TenantOrgFilter';
import { JusConstellation } from '../../../../../utils/dateFormat';
import styles from './DetailEditModal.less';
import moment from 'moment';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const formItemLayout = {
    labelCol : { span : 4 },
    wrapperCol : { span : 19 }
}

/*leads编辑*/
function DetailEditModal({
    leadsFollowUserOrgId,                   //当前操作用户所属的机构ID
    detailEditModalVisible,                 //leads左划框是否显示
    detailEditModalLoading,                 //leads编辑modal加载状态
    detailEditModalButtonLoading,           //leads编辑按钮加载状态
    detailEditModalBackMessage,             //leads编辑时当前leads的回填信息
    leadsFollowStuType,                     //leads编辑机构类型
    leadsFollowParentRelationship,          //leads编辑联系人关系下拉列表内容
    leadsFollowFastSearchFollowState,       //快捷搜索栏跟进状态下拉列表内容，还可以用来格式化跟进状态
    leadsFollowFastSearchStuSource,         //快捷搜索栏一级来源下拉列表内容
    leadsFollowSecondChannel,               //二级来源
    leadsFollowConnectStatus,               //联系方式
    leadsFollowOrgScale,                    //机构规模
    detailEditModalRecommender,             //leads编辑推荐人信息下拉列表
    detailEditModalCollector,               //leads编辑收集人信息
    leadsFollowEditStuType,                 //leads编辑机构类型下拉列表内容

    EditLeadsCheckSameOnBlur,               //leads编辑学员姓名，联系人姓名，联系人手机号
    DetailEditModalSubmit,                  //leads编辑提交
    DetailEditModalCancel,                  //leads编辑关闭
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

    let followType = [];        //跟进状态
    let type = [];              //机构类型
    let parentRelation = [];    //联系人关系
    let firstChannel = [];      //一级来源
    let secondChannel = [];     //二级来源
    let connectState = [];      //联系状态
    let orgScale = [];          //机构规模
    let recommender = [];       //推荐人(联系人)
    let collector = [];         //收集人(机构下所有员工)

    //渲染联系状态
    if(leadsFollowConnectStatus && leadsFollowConnectStatus.length > 0){
        connectState = leadsFollowConnectStatus.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染机构规模
    if(leadsFollowOrgScale && leadsFollowOrgScale.length > 0){
        orgScale = leadsFollowOrgScale.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染机构类型下拉列表
    if(leadsFollowEditStuType && leadsFollowEditStuType.length > 0){
        type = leadsFollowEditStuType.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染跟进状态下拉列表
    if(leadsFollowFastSearchFollowState && leadsFollowFastSearchFollowState.length > 0){
        followType = leadsFollowFastSearchFollowState.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染联系人关系
    if(leadsFollowParentRelationship && leadsFollowParentRelationship.length > 0){
        parentRelation = leadsFollowParentRelationship.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染客户来源下拉列表
    if(leadsFollowFastSearchStuSource && leadsFollowFastSearchStuSource.length > 0){
        firstChannel = leadsFollowFastSearchStuSource.map((item,index) => {
            //其他一级来源不可以修改成微官网
            if(item.key == '1'){
                return(
                    <Option key = { item.key + '' } value = { item.key + '' } disabled = { true }>{ item.value + '' }</Option>
                );
            }else{
                return(
                    <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>
                );
            }
        })
    }

    //渲染二级来源下拉列表
    if(leadsFollowSecondChannel && leadsFollowSecondChannel.length > 0){
        secondChannel = leadsFollowSecondChannel.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染推荐人(联系人)
    if(detailEditModalRecommender && detailEditModalRecommender.length > 0){
        recommender = detailEditModalRecommender.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' } >{ item.name + '' }</Option>
            );
        })
    }

    //渲染收集人(机构下所有员工)
    if(detailEditModalCollector && detailEditModalCollector.length > 0){
        collector = detailEditModalCollector.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' } >{ item.name + '' }</Option>
            );
        })
    }

    //时间选择器时间范围限制
    function disabledDate(current) {
        return current && current.valueOf() > Date.now() - 24*60*60*100;
    }

    //通过生日判断星座
    function BirthdayOnChange(date,dateString){
        if(!!date){
            let constellation = JusConstellation(dateString);
            setFieldsValue({
                constellation
            })
        }
    }

    //转化学员提交
    function handleComplete(e) {
        e.preventDefault();
        validateFieldsAndScroll((errors,values) => {
            if (!!errors) {
                return;
            }
            //编辑时需要附加当前leads的id
            values.id = detailEditModalBackMessage.id || undefined;

            //处理生日
            values.pbirthday = !!values.pbirthday ? values.pbirthday.format('YYYY-MM-DD') : undefined;

            //处理机构类型
            values.type = !!values.type && values.type.length > 0 ? values.type.join(',') : undefined

            //处理省市区
            if(!!values.addrColumn && !!values.addrColumn[0]){
                values.province = values.addrColumn[0];
            }

            if(!!values.addrColumn && !!values.addrColumn[1]){
                if(values.addrColumn[1] == '市辖区' || values.addrColumn[1] == '县'){
                    values.city = values.addrColumn[0];
                }else{
                    values.city = values.addrColumn[1];
                }
            }
            if(!!values.addrColumn && !!values.addrColumn[2]){
                if(values.addrColumn[2] == '市辖区' || values.addrColumn[2] == '县'){
                    values.county = values.addrColumn[1];
                }else{
                    values.county = values.addrColumn[2];
                }
            }
            values.addrColumn = JSON.stringify(getFieldValue('addrColumn'));

            DetailEditModalSubmit(values);
        });
    }

    //关闭
    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        DetailEditModalCancel();
    }

    //模态框的属性
    let modalOpts = {
        title: '名单编辑',
        maskClosable : false,
        visible : detailEditModalVisible,
        closable : true,
        width : 550,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={detailEditModalButtonLoading}
                    loading={detailEditModalButtonLoading}
                    style={{marginLeft:20}}>保存</Button>
        ],
        className : 'DetailEditModal'
    };

    return(
        <Modal {...modalOpts}>
            <Spin spinning = { detailEditModalLoading }>
                <Form>
                    <FormItem
                        label="所属校区"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('orgId', {
                            initialValue : detailEditModalBackMessage.orgId || (window._init_data.firstOrg).key,
                            rules : [
                                { required : true , message : '请选择所属校区' }
                            ]
                        })(
                            <TenantOrgFilter width = { 408 } disabled = { true }/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "跟进状态"
                        { ...formItemLayout }
                        style = {{ marginBottom : 20 }}
                    >
                        { getFieldDecorator('studentFollowState', {
                            initialValue : detailEditModalBackMessage.studentFollowState || undefined,
                            rules : [
                                { required : true, message : '请选择跟进状态' }
                            ]
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                optionFilterProp="children"
                                placeholder = '请选择跟进状态'>
                                { followType || [] }
                            </Select>
                        )}
                    </FormItem>
                    <BlockTitle content = '机构信息'/>
                    {/*名单不属于当前操作用户所在机构 不可修改*/}
                    <FormItem
                        label = "名称"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('name', {
                            initialValue : detailEditModalBackMessage.name || undefined,
                            rules : [
                                { required : true, message : '请输入机构名称' , whitespace : true }
                            ]
                        })(
                            <Input placeholder = '请输入机构名称' size = 'default' disabled = { leadsFollowUserOrgId != detailEditModalBackMessage.orgId ? true : false } onBlur = {(e) => EditLeadsCheckSameOnBlur(e.target.value,detailEditModalBackMessage.id,'name',getFieldValue('orgId'))}/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "电话"
                        { ...formItemLayout }
                    >
                        {getFieldDecorator('stuMobile',{
                            initialValue : detailEditModalBackMessage.mobile || undefined,
                        })(
                            <Input placeholder = '请输入电话' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "机构类型"
                        { ...formItemLayout }
                    >
                        {getFieldDecorator('type',{
                            initialValue : !!detailEditModalBackMessage && !!detailEditModalBackMessage.type ? detailEditModalBackMessage.type.split(',') : undefined,
                        })(
                            <Select
                                mode = 'multiple'
                                size = 'default'
                                showSearch
                                allowClear
                                optionFilterProp = "children"
                                placeholder = '请选择机构类型'
                                notFoundContent = '没有机构类型'
                            >
                                { type || [] }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label = "客户官网"
                        { ...formItemLayout }
                    >
                        {getFieldDecorator('website',{
                            initialValue : detailEditModalBackMessage.website || undefined,
                        })(
                            <Input placeholder = '请输入客户官网' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "重要程度"
                        { ...formItemLayout }
                    >
                        {getFieldDecorator('importance',{
                            initialValue : detailEditModalBackMessage.importance || undefined,
                        })(
                            <Input placeholder = '请输入重要程度' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label="所在地址"
                        {...formItemLayout}
                    >
                        {getFieldDecorator('addrColumn',{
                            initialValue : !!detailEditModalBackMessage.addrColumn ? JSON.parse(detailEditModalBackMessage.addrColumn) : [],
                        })(
                            <Cascader placeholder = '请选择所在地址' options = { ChinaDivision } style = {{ width : '100%' }} changeOnSelect size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "详细地址"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('conaddress', {
                            initialValue : detailEditModalBackMessage.conaddress || undefined,
                        })(
                            <Input placeholder = '请输入详细地址' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = '联系状态'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('contactState', {
                            initialValue : detailEditModalBackMessage.connectState || undefined,
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择联系状态'
                                optionFilterProp="children">
                                { connectState || [] }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label = '机构规模'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('orgSize', {
                            initialValue : detailEditModalBackMessage.orgSize || undefined,
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择机构规模'
                                optionFilterProp="children">
                                { orgScale || [] }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label = "客户简介"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('remark', {
                            initialValue : detailEditModalBackMessage.remark || undefined,
                            rules : [
                                { validator :
                                    ( rule, value, callback) => {
                                        if( (value + '').length > 200 ){
                                            return callback('备注不能超过200字');
                                        }else{
                                            return callback();
                                        }
                                    }
                                }
                            ]
                        })(
                            <Input placeholder = '请输入客户简介' type = 'textarea' autosize = {{ minRows : 3 , maxRows : 3 }}/>
                        )}
                    </FormItem>
                    <BlockTitle content = '联系人信息'/>
                    <FormItem
                        label = "姓名"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('parentName', {
                            initialValue : detailEditModalBackMessage.parentName || undefined,
                        })(
                            <Input placeholder = '请输入联系人姓名' size = 'default' /*onBlur = {(e) => EditLeadsCheckSameOnBlur(e.target.value,detailEditModalBackMessage.parentId,'parentName',getFieldValue('orgId'))}*//>
                        )}
                    </FormItem>
                    <FormItem
                        style={{display:'none'}}
                    >
                        { getFieldDecorator('parentId', {
                            initialValue : detailEditModalBackMessage.parentId || undefined,
                        })(
                            <Input/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "手机号码"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('parentMobile',{
                            initialValue : detailEditModalBackMessage.parentMobile || undefined,
                        })(
                            <Input placeholder = '请输入联系人手机号码' size = 'default' onBlur = {(e) => EditLeadsCheckSameOnBlur(e.target.value,detailEditModalBackMessage.parentId,'parentMobile',getFieldValue('orgId'))}/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "性别"
                        style = {{ lineHeight : '30px' }}
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('psex',{
                            initialValue : detailEditModalBackMessage.psex || undefined,
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
                            initialValue : !!detailEditModalBackMessage && !!detailEditModalBackMessage.pbirthday ? moment(detailEditModalBackMessage.pbirthday,'YYYY-MM-DD') : undefined
                        })(
                            <DatePicker format = 'YYYY-MM-DD' placeholder = '请选择生日' size = 'default' style = {{ width : 140 }}/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "QQ"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('qqNumber', {
                            initialValue : detailEditModalBackMessage.qqNumber || undefined,
                        })(
                            <Input placeholder = '请输入QQ号' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "微信"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('weixin', {
                            initialValue : detailEditModalBackMessage.weixin || undefined,
                        })(
                            <Input placeholder = '请输入微信' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "部门"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('department', {
                            initialValue : detailEditModalBackMessage.department || undefined,
                        })(
                            <Input placeholder = '请输入部门' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "职务"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('duty', {
                            initialValue : detailEditModalBackMessage.duty || undefined,
                        })(
                            <Input placeholder = '请输入职务' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "邮箱"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('email', {
                            initialValue : detailEditModalBackMessage.email || undefined,
                        })(
                            <Input placeholder = '请输入邮箱' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "联系地址"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('address', {
                            initialValue : detailEditModalBackMessage.address || undefined,
                        })(
                            <Input placeholder = '请输入联系地址' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = "备注"
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('remarks', {
                            initialValue : detailEditModalBackMessage.remarks || undefined,
                        })(
                            <Input placeholder = '请输入备注' size = 'default'/>
                        )}
                    </FormItem>
                    <BlockTitle content = '来源'/>
                    <FormItem
                        label = '客户来源'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('firstChannel', {
                            initialValue : detailEditModalBackMessage.channel || undefined,
                            rules : [
                                { required : true, message : '请选择客户来源' }
                            ]
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择客户来源'
                                optionFilterProp="children"
                                disabled = { detailEditModalBackMessage.channel == '1' ? true : false }>
                                { firstChannel || [] }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label = '最终来源'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('secondChannel', {
                            initialValue : detailEditModalBackMessage.secondChannel || undefined,
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择最终来源'
                                optionFilterProp="children">
                                { secondChannel || [] }
                            </Select>
                        )}
                    </FormItem>
                    <FormItem
                        label = '推荐机构'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('recommender',{
                            initialValue : detailEditModalBackMessage.recommender || undefined
                        })(
                            <Input placeholder = '请输入推荐机构' size = 'default'/>
                        )}
                    </FormItem>
                    <FormItem
                        label = '协同人'
                        { ...formItemLayout }
                    >
                        { getFieldDecorator('synergism',{
                            initialValue : detailEditModalBackMessage.synergism || undefined
                        })(
                            <Select
                                notFoundContent = "未找到"
                                showSearch
                                allowClear
                                size = 'default'
                                placeholder = '请选择协同人'
                                optionFilterProp="children">
                                { collector || [] }
                            </Select>
                        )}
                    </FormItem>
                </Form>
            </Spin>
        </Modal>
    );
}

export default Form.create()(DetailEditModal);
