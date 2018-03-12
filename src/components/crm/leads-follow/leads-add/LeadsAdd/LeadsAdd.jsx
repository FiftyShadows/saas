import React from 'react';
import { Form, Input, Button, Select,  Radio, InputNumber, Spin, message, DatePicker , AutoComplete , Cascader } from 'antd';
import ChinaDivision from './CascaderAddressOptions';
import { BlockTitle } from '../../../../common/new-component/NewComponent';
import QueueAnim from 'rc-queue-anim';
import TenantOrgFilter from '../../../../../pages/common/tenant-org-filter/TenantOrgFilter';
import { JusConstellation } from '../../../../../utils/dateFormat';
import moment from 'moment';
import styles from './LeadsAdd.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;

const formItemLayout = {
    labelCol: {
        span: 6,
    },
    wrapperCol: {
        span: 15,
    },
};

/*新建leads*/
const LeadsAdd = ({
    leadsAddLoading,                    //整个页面是否加载状态
    leadsAddButtonLoading,              //新增提交按钮加载状态
    leadsAddType,                       //名单添加类型('1'公海池/'2'选择销售)
    leadsAddCurrentStaffId,             //当前操作用户的ID，用来选择销售时填写到默认值
    leadsAddFollowType,                 //跟进状态下拉列表内容
    leadsAddStuType,                    //获取机构类型下拉列表内容
    leadsAddParentRelationship,         //获取数据字典联系人关系下拉列表
    leadsAddOrgStaff,                   //选中机构下员工下拉列表内容
    leadsAddfirstChannel,               //一级来源下拉列表内容
    leadsAddSecondChannel,              //二级来源下拉列表内容
    leadsAddConnectState,               //联系状态
    leadsAddOrgScale,                   //机构规模
    leadsAddRecommender,                //推荐人(联系人)下拉列表内容
    leadsAddCollector,                  //收集人(租户下所有员工)下拉列表内容
    wetherAddSuccess,                   //是否新增成功(用来清空表单)
    //名单电话查重
    checkSamePhone,                     //是否重复,false则不能新增名单

    OrgSelectOnChange,                  //选择校区onChange事件
    AddTypeRadioGroupOnChange,          //录入区域onChange事件
    AddLeadsNameOnChange,               //孩子姓名输入框onChange事件
    AddLeadsCheckSameOnBlur,            //孩子姓名，联系人姓名，手机号输入框onBlur事件，用来即时查重
    LeadsAddCheckSameName,              //点击姓名查重(orgId,name)
    LeadsAddCheckSamePhone,             //点击电话查重(orgId,name)
    AddNewLeads,                        //点击新增保存
    ChangeAddStatus,                    //清空表单后更新新增成功状态为false
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

    if(wetherAddSuccess){
        resetFields();
        ChangeAddStatus();
    }


    let followType = [];        //跟进状态下
    let staff = [];             //员工
    let type = [];              //机构类型
    let parentRelation = [];    //联系人关系
    let firstChannel = [];      //一级来源
    let secondChannel = [];     //二级来源
    let connectState = [];      //联系状态
    let orgScale = [];          //机构规模
    let recommender = [];       //推荐人(联系人)
    let collector = [];         //收集人(机构下所有员工)

    //渲染联系状态
    if(leadsAddConnectState && leadsAddConnectState.length > 0){
        connectState = leadsAddConnectState.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染机构规模
    if(leadsAddOrgScale && leadsAddOrgScale.length > 0){
        orgScale = leadsAddOrgScale.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染跟进状态下拉列表
    if(leadsAddFollowType && leadsAddFollowType.length > 0){
        followType = leadsAddFollowType.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染员工下拉列表信息
    if(leadsAddOrgStaff && leadsAddOrgStaff.length > 0){
        staff = leadsAddOrgStaff.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' } >{ item.name + '' }</Option>
            );
        })
    }

    //渲染机构类型
    if(leadsAddStuType && leadsAddStuType.length > 0){
        type = leadsAddStuType.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染联系人关系
    if(leadsAddParentRelationship && leadsAddParentRelationship.length > 0){
        parentRelation = leadsAddParentRelationship.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染一级来源
    if(leadsAddfirstChannel && leadsAddfirstChannel.length > 0){
        firstChannel = leadsAddfirstChannel.map((item,index) => {
            //saas项目一级来源1是微官网写死无法在后台系统选择，但是在本公司CRM系统中无此限制
//            if(item.key == '1'){
//                return(
//                    <Option key = { item.key + '' } value = { item.key + '' } disabled = { true }>{ item.value + '' }</Option>
//                );
//            }else{
//                return(
//                    <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>
//                );
//            }
            return(
                <Option key = { item.key + '' } value = { item.key + '' }>{ item.value + '' }</Option>
            );
        })
    }

    //渲染二级来源
    if(leadsAddSecondChannel && leadsAddSecondChannel.length > 0){
        secondChannel = leadsAddSecondChannel.map((item,index) => {
            return(
                <Option key = { item.key + '' } value = { item.key + '' } >{ item.value + '' }</Option>
            );
        })
    }

    //渲染推荐人(联系人)
    if(leadsAddRecommender && leadsAddRecommender.length > 0){
        recommender = leadsAddRecommender.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' } >{ item.name + '' }</Option>
            );
        })
    }

    //渲染收集人(机构下所有员工)
    if(leadsAddCollector && leadsAddCollector.length > 0){
        collector = leadsAddCollector.map((item,index) => {
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
        }else{
            setFieldsValue({
                constellation : undefined
            })
        }
    }

    function submit(e){
        e.preventDefault();
        validateFieldsAndScroll((err, values ) => {
            if( !!err ){
                return;
            }

            if(!checkSamePhone){
                return message.error('机构电话重复，不可提交');
            }

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
            AddNewLeads(values);
        })
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

	function AddLeadsNameOnChangeAction(e){
		AddLeadsNameOnChange(e);
	}

    return (
        <div className={styles.leads_add_all}>
            <div className='leads_add_first'>
                <Spin spinning = { leadsAddLoading }>
                    <Form>
                        <div className={styles.form_item_one}>
                             <FormItem
                                label = "所属校区"
                                { ...formItemLayout }
                             >
                                { getFieldDecorator('orgId', {
                                    initialValue : (window._init_data.firstOrg).key,
                                    rules : [
                                        { required : true, message : '请选择校区' }
                                    ]
                                })(
                                    <TenantOrgFilter width = { 220 } onChange = { OrgSelectOnChange }/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "跟进状态"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('studentFollowState', {
                                    rules : [
                                        { required : true, message : '请选择跟进状态' }
                                    ]
                                })(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择跟进状态'
                                        optionFilterProp="children"
                                        style = {{ width : 220 }}>
                                        { followType || [] }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label = "录入区域"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('addType', {
                                    initialValue : '1',
                                    rules : [
                                        { required : true, message : '请选择录入区域' }
                                    ]
                                })(
                                    <RadioGroup onChange = { AddTypeRadioGroupOnChange }>
                                        <Radio value = '1' >放入公海</Radio>
                                        <Radio value = '2' >分配销售</Radio>
                                    </RadioGroup>
                                )}
                            </FormItem>
                            { leadsAddType == '2' ?
                                <FormItem
                                    { ...formItemLayout }
                                >
                                    { getFieldDecorator('sellerId', {
                                        initialValue : leadsAddCurrentStaffId || undefined,
                                        rules : [
                                            { required : true, message : '请选择销售' }
                                        ]
                                    })(
                                        <Select
                                            notFoundContent = "未找到"
                                            showSearch
                                            allowClear
                                            size = 'default'
                                            placeholder = '请选择销售'
                                            optionFilterProp="children"
                                            style = {{ width : 100 }}
                                            disabled = { leadsAddType == '2' ? false : true }>
                                            { staff || [] }
                                        </Select>
                                    )}
                                </FormItem>
                                :
                                null
                            }
                        </div>
                        <BlockTitle content = '机构信息' className={styles.block_title}/>
                        <div className={styles.form_item_two}>
                            <FormItem
                                label = "名称"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('name', {
                                    rules : [
                                        { required : true, message : '请输入机构名称' , whitespace : true }
                                    ]
                                })(
                                    <Input placeholder = '请输入机构名称' size = 'default' style = {{ width : 220 }} onChange = { AddLeadsNameOnChangeAction } onBlur = {(e) => AddLeadsCheckSameOnBlur(e.target.value,'name',getFieldValue('orgId'))}/>
                                )}
                            </FormItem>
                            <span onClick = {() => LeadsAddCheckSameName(getFieldValue('orgId'),getFieldValue('name'))}>查重</span>
                            <FormItem
                                label = "电话"
                                { ...formItemLayout }
                            >
                                {getFieldDecorator('stuMobile', {
                                    rules : [
                                        { required : true, message : '请输入电话' , whitespace : true },
                                    ]
                                })(
                                    <Input placeholder = '请输入电话' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <span onClick = {() => LeadsAddCheckSamePhone(getFieldValue('orgId'),getFieldValue('stuMobile'))} style = {{ marginLeft : -85 }}>查重</span>
                            <FormItem
                                label = "机构类型"
                                { ...formItemLayout }
                            >
                                {getFieldDecorator('type')(
                                    <Select
                                        mode = 'multiple'
                                        style = {{ width : 220 }}
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
                                label="所在地址"
                                {...formItemLayout}
                            >
                                {getFieldDecorator('addrColumn')(
                                    <Cascader placeholder = '请选择所在地址' options = { ChinaDivision } style = {{ width : 220 }} changeOnSelect size='default'/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "客户官网"
                                { ...formItemLayout }
                            >
                                {getFieldDecorator('website')(
                                    <Input placeholder = '请输入客户官网' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "详细地址"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('conaddress')(
                                    <Input placeholder = '请输入详细地址' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "重要程度"
                                { ...formItemLayout }
                            >
                                {getFieldDecorator('importance')(
                                    <Input placeholder = '请输入重要程度' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = '联系状态'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('contactState')(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择联系状态'
                                        optionFilterProp="children"
                                        style = {{ width : 220 }}>
                                        { connectState || [] }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label = '机构规模'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('orgSize')(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择机构规模'
                                        optionFilterProp="children"
                                        style = {{ width : 220 }}>
                                        { orgScale || [] }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label = "客户简介"
                                labelCol = {{ span : 6 }}
                                wrapperCol = {{ span: 18 }}
                            >
                                { getFieldDecorator('remark',{
                                    rules : [
                                        { validator :
                                            ( rule, value, callback) => {
                                                if( (value + '').length > 200 ){
                                                    return callback('简介不能超过200字');
                                                }else{
                                                    return callback();
                                                }
                                            }
                                        }
                                    ]
                                })(
                                    <Input placeholder = '请输入客户简介' type = 'textarea' style = {{ width : 232 }} autosize = {{ minRows : 3 , maxRows : 3 }}/>
                                )}
                            </FormItem>
                        </div>
                        <BlockTitle content = '联系人信息' className={styles.block_title}/>
                        <div className={styles.form_item_three}>
                            <FormItem
                                label = "姓名"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('parentName')(
                                    <Input placeholder = '请输入姓名' size = 'default' style = {{ width : 220 }} /*onBlur = {(e) => AddLeadsCheckSameOnBlur(e.target.value,'parentName',getFieldValue('orgId'))}*//>
                                )}
                            </FormItem>
                            <FormItem
                                label = "性别"
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
                                label = "手机号码"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('parentMobile', {
                                    rules : [
                                        { validator: checkMobile },
                                    ]
                                })(
                                    <Input placeholder = '请输入联系人手机号码' size = 'default' style = {{ width : 220 }} onBlur = {(e) => AddLeadsCheckSameOnBlur(e.target.value,'parentMobile',getFieldValue('orgId'))}/>
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
                                label = "QQ"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('qqNumber')(
                                    <Input placeholder = '请输入QQ号' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "微信"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('weixin')(
                                    <Input placeholder = '请输入微信' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "部门"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('department')(
                                    <Input placeholder = '请输入部门' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "职务"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('duty')(
                                    <Input placeholder = '请输入职务' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "邮箱"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('email')(
                                    <Input placeholder = '请输入邮箱' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "联系地址"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('address')(
                                    <Input placeholder = '请输入联系地址' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = "备注"
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('remarks')(
                                    <Input placeholder = '请输入备注' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                        </div>
                        <BlockTitle content = '来源' className={styles.block_title}/>
                        <div className={styles.form_item_four}>
                            <FormItem
                                label = '客户来源'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('firstChannel', {
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
                                        style = {{ width : 220 }}>
                                        { firstChannel || [] }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label = '最终来源'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('secondChannel')(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择最终来源'
                                        optionFilterProp="children"
                                        style = {{ width : 220 }}>
                                        { secondChannel || [] }
                                    </Select>
                                )}
                            </FormItem>
                            <FormItem
                                label = '推荐机构'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('recommender')(
                                    <Input placeholder = '请输入推荐机构' size = 'default' style = {{ width : 220 }}/>
                                )}
                            </FormItem>
                            <FormItem
                                label = '协同人'
                                { ...formItemLayout }
                            >
                                { getFieldDecorator('synergism')(
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        allowClear
                                        size = 'default'
                                        placeholder = '请选择协同人'
                                        optionFilterProp="children"
                                        style = {{ width : 220 }}>
                                        { collector || [] }
                                    </Select>
                                )}
                            </FormItem>
                        </div>
                    </Form>
                </Spin>
            </div>
            <Button type='primary' onClick = { submit } className={styles.submit_button} loading = { leadsAddButtonLoading } disabled = { leadsAddButtonLoading }>提交</Button>
        </div>
    );
};

export default Form.create()(LeadsAdd);
