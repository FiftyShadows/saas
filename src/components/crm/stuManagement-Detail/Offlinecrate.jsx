import React from 'react';
import QueueAnim from 'rc-queue-anim';
import style from './Offlinecrate.less';
import { Button , Modal , Form , Input , Select , Upload , Icon , Radio , DatePicker,Row, Col ,message,Cascader,Table,TimePicker} from 'antd';
import TenantOrgSelect from '../../../pages/common/tenant-org-filter/TenantOrgFilter';
import PageModal from '../../common/page-modal/PageModal';

import moment from 'moment';
let FormItem = Form.Item;
let Option = Select.Option;
let RadioGroup = Radio.Group;
const MonthPicker = DatePicker.MonthPicker;
const RangePicker = DatePicker.RangePicker;

function StudentManageCreateForm({
    createOfflinebookModalVisible,
    offlineconfirmCreateForm,
    offlinecancelCreateForm,

    isChecked,
    //isPickOn,
    OfflinebookInfo,
    collecterIdList,

   // createOrgId, //默认选择的校区Id
   // createOrgName, //默认选择的校区名字

    OfflinebookcreateOrgId, //默认选择的校区Id
    OfflinebookcreateOrgName, //默认选择的校区名字

    TenantSelectOnSelect,
    //选择器下拉列表
    createSellerList,//跟进人Leads
    LessonList,//校区课程
    LeadsList,//当前账号及其当前账号下属的leads
    CourseList, //当前校区下某个课程的排课list

    sellerName, //本账号 跟进人
    sellerId, //本账号 跟进人id
    studentDetailInfo,

    selectLessonId,//新增表单里面选中的课程
    selecttime,//选中的日期
    selectCourseTime,

    OnselectLessonIdAction,
    OnselecttimeAction,
    OnCourseListAction,
    OnCourseListreset,
    selectCouseandtimeAction,

    NOorgKindArr,
    nokindaarr,

    yuyueshitingdangqianyonghuid,                  //当前用户id和name

	dayList,                   //有课日期列表
 	courseList,                //课程下拉列表
 	courseDataSource,          //当日有课列表
	selectYearToDate,          //选择年月得到有课的日期
	selectDate,                //选择日期

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

    const rowSelection = {
        type : 'radio',
        onChange: (selectedRowKeys, selectedRows) => {
            var data = selectedRows[0];
            selectCouseandtimeAction(data);
        },
    };
    let classinfro = '';
    let Arr =[];
    if (!OfflinebookInfo.orgId) {
        if  (!!OfflinebookcreateOrgId) {
            if (nokindaarr  && nokindaarr.length > 0){
                var one = "";
                var two  = "";
                nokindaarr.map(function (item) {
                    if (item == OfflinebookcreateOrgId){
                        one = '1';
                    }else  {
                        two ='2';
                    }
                })
                if (one == 1){
                    classinfro = 2;
                }else {
                    classinfro = 1;
                }
            }else  {
                window._init_data.orgIdList && window._init_data.orgIdList  != 'undefined' && window._init_data.orgIdList.map(function (item) {
                    if (OfflinebookcreateOrgId == item.orgId && item.orgKind == 1 ){
                        classinfro =1; //早教类
                    }
                    if (item.orgKind == 1){
                        //早教类
                    }else  {
                        Arr.push(item.orgId)  ;
                    }
                });
                if ( Arr && Arr.length >0){
                    NOorgKindArr(Arr);
                }
            }
        }
    }else  {
        if (nokindaarr  && nokindaarr.length > 0){
            var one = "";
            var two  = "";
            nokindaarr.map(function (item) {
                if (item == OfflinebookInfo.orgId ){
                    one = '1';
                }else  {
                    two ='2';
                }
            })
            if (one == 1){
                classinfro = 2;
            }else {
                classinfro = 1;
            }
        }else  {
            window._init_data.orgIdList && window._init_data.orgIdList  != 'undefined' && window._init_data.orgIdList.map(function (item) {
                if (OfflinebookInfo.orgId == item.orgId && item.orgKind == 1 ){
                    classinfro = 1; //早教类
                }
                if (item.orgKind == 1){
                    //早教类
                }else  {
                    Arr.push(item.orgId)  ;
                }
            });
            if ( Arr && Arr.length >0){
                NOorgKindArr(Arr);
            }
        }
    }

    //改变校区是清空所选跟进人
    function TenantSelectOnSelectAction( value ){
        // setFieldsValue({ 'seller' : undefined });
        //要清空课程

        if( !!value ){
            TenantSelectOnSelect( value );
        }
    };
    //校区下拉列表属性
    let tenantOrgSelectProps = {
        width        : 432,
        onChange     : TenantSelectOnSelectAction,            //改变机构触发事件
        disabled     : true,
    };

    let formItemLayout = {
        labelCol : { span : 4 },
        wrapperCol : { span : 20 }
    };


    //确认新增表单
    function confirmCreateFormAction(){

        //console.log("classinfroclassinfro",classinfro);
        validateFieldsAndScroll((err, values) => {

            if (classinfro == 2){
               // console.log("3333111111valuesvaluesvalues",!values.remark);
                if (!values.remark){
                    message.warn('备注不能为空');
                }else  {
                    let  time = values.time.format("YYYY-MM-DD");

                    //处理上课时间
                    let startTime = new Date(values.classBeginTime._d).getTime();
                    let endTime = new Date(values.classEndTime._d).getTime();
                    if(startTime >= endTime){
                        message.warn('结束时间不能早于或等于开始时间');
                        return;
                    }

                    values.startTime = values.classBeginTime.format('HH:mm');
                    values.endTime = values.classEndTime.format('HH:mm');
                    delete values.classBeginTime;
                    delete values.classEndTime;

                    var data = values;
                    data.time =time +' ' + values.startTime  + ':00';
                    data.endtime = time + ' ' +values.endTime + ':00';
                    data.sellerId =sellerId;
                    data.classinfro = 2;

                    delete values.startTime;
                    delete values.endTime;


                    offlineconfirmCreateForm(data);
                    cancelCreateFormAction();
                }
            }else  if (classinfro == 1  ) {
                if(selectCourseTime && selectCourseTime.startTime && selectCourseTime.endTime){
                    if ( !!err ){
                        return;
                    };
                    var data = values;
                    data.selectCourseTime = selectCourseTime;
                    data.sellerId =sellerId;
                    data.time =selectCourseTime.studyDate + ' ' +selectCourseTime.startTime + ':00';
                    data.endtime = selectCourseTime.studyDate + ' ' + selectCourseTime.endTime + ':00';
                    offlineconfirmCreateForm(data);
                    cancelCreateFormAction();
                }else {
                    message.warn('请选择预约排课');
                    return;
                }
            }
        });
    };

    //取消新增表单
    function cancelCreateFormAction(){
        resetFields();
        offlinecancelCreateForm();
    };

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

    //早教类预约试听查看课程信息
    function CheckCourseDetail(time,course){
        OnCourseListreset();
        if(  time != null && time != undefined && time != '' && course != null && course != undefined && course != ''){
            let obj = {};
            obj.courseId = course;
            obj.startDate = time.format('YYYY-MM-DD');
            obj.endDate = time.format('YYYY-MM-DD');
            OnCourseListAction(obj)  ;
        }else {
            OnCourseListreset()  ;
        }
    }

    function handleSelectChange(value) {
        OnCourseListreset();
		let time = getFieldValue('ableDate');
		let orgId = getFieldValue('orgId');
		OnCourseListAction( value, time, orgId )
    }

    /*timepick切换时*/
    function timePickChange(type, time, timeString) {
        let classTimeArr = ['', ''];
        if(type == 'classBeginTime') {
            classTimeArr[0] = timeString;
        } else if(type == 'classEndTime') {
            classTimeArr[1] = timeString;
        }
        ///  changeClassTime(type, time, timeString);
        setFieldsValue({'classTime': classTimeArr});
        validateFields(['classTime']);
    }
    //时间选择器时间范围限制
    function disabledDate(current) {
        return current && current.valueOf() < Date.now() - 24*60*60*100;
    }

    /*检验是否只输入了空格*/
    function checkWetherSpace(rule, value, callback){
        if(value == '' || value == undefined || value == null){
            callback();
        }else if(/^[\s]*$/.test(value)){
            callback(new Error('备注不能为空'));
        }else{
            callback();
        }
    }

	//选择年月得到有课日期
	function selectYearToDateAction( date ){
		setFieldsValue({ 'ableDate' : undefined });
		setFieldsValue({ 'courseId' : undefined });
		let month = moment( date ).format('YYYY-MM');
		let orgId = getFieldValue( 'orgId' );
		selectYearToDate( month, orgId )
	}

	//选择日期得到课程列表 以及课程信息
	function selectDateAction( value ){
		setFieldsValue({ 'courseId' : undefined });
		let orgId = getFieldValue('orgId');
		selectDate( value, orgId )
	}

    return (
        <Modal
            className = "zj_stu_management_reservation_modal"
            title = "预约试听"
            visible = { createOfflinebookModalVisible }
            width = '550px'
            onCancel = { cancelCreateFormAction }
            onClose = { cancelCreateFormAction }
            maskClosable = { false }
            footer = {[
                <Button key = "cancelStudent" onClick = { cancelCreateFormAction } >取消</Button>,
                <Button key = "confirmStudent" type = "primary" onClick = {
                    confirmCreateFormAction } >保存</Button>
            ]}
        >
            <Form >
                <FormItem
                    { ...formItemLayout }
                    label = "当前校区"
                >
                    { getFieldDecorator('orgId',{

                        initialValue : !OfflinebookcreateOrgId?'':OfflinebookcreateOrgId + '',
                        rules : [
                            { required : true , message : '请选择校区' }
                        ]
                    })(
                        <TenantOrgSelect { ...tenantOrgSelectProps } />
                    )}
                </FormItem>
                <FormItem
                    label = "跟进人"
                    { ...formItemLayout }
                >
                    { getFieldDecorator('sellerId',{
                        initialValue : yuyueshitingdangqianyonghuid[0].sellerId || undefined,
                        rules : [
                        ]
                    })(
                        <Select
                            size = 'default'
                            disabled={true}
                            showSearch
                            allowClear
                            optionFilterProp = "children"
                            placeholder = '请选择跟进人'
                            notFoundContent = '未找到'
                        >
                            {
                                yuyueshitingdangqianyonghuid && yuyueshitingdangqianyonghuid.map(function( item, index ){
                                    return ( <Option key = { index } value = { item.sellerId + '' } >{ item.sellerName + '' }</Option> )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label =   { isChecked ?"跟进名单":"跟进学员"}
                >
                    { getFieldDecorator('sellerIdLeads',{
                        initialValue : !studentDetailInfo.id?'':studentDetailInfo.id + '',
                        rules : [
                            { required : true, message : isChecked ?"请选择当前校区下的跟进名单":"请选择当前校区下的学员"  },
                        ]
                    })(
                        <Select
                            size = 'default'
                            disabled={true}
                            showSearch
                            allowClear
                            optionFilterProp = "children"
                            placeholder = { isChecked ?"请选择当前校区下的跟进名单":"请选择当前校区下的学员"}
                            notFoundContent = { isChecked ?'当前校区下没有跟进名单':'当前校区下没有学员' }
                        >
                            {
                                LeadsList && LeadsList.map(function( item, index ){
                                    return ( <Option key = { 'intention_' + item.stuId } value = { item.stuId + '' } >{ item.stuName }</Option> )
                                })
                            }
                        </Select>
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = { '试听年月' }
                >
                    { getFieldDecorator( 'year', {
                        initialValue : undefined,
                        rules : [
                            { required : true, message : '选择年月得到课程日期' },
                        ]
                    })(
						<MonthPicker allowClear = { false } style = {{ width : 180 }} size = 'default' format = { 'YYYY-MM' } onChange = { selectYearToDateAction } placeholder = '请选择试听年月' />
                    )}
                </FormItem>
                <FormItem
                    { ...formItemLayout }
                    label = { '可选日期' }
                >
                    { getFieldDecorator( 'ableDate', {
                        initialValue :  undefined,
                        rules : [
                            { required : true, message : '可安排试听日期' },
                        ]
                    })(
						<Select
							size = 'default'
                            showSearch
							placeholder = '请选择可安排试听日期'
                            optionFilterProp = "children"
                            notFoundContent = { '暂无可安排试听日期' }
                            onChange = { selectDateAction }
						>
							{ dayList && dayList.map(function( item, index ){
								return ( <Option key = { 'able_date_' + item } value = { item } >{ item }</Option> )
							})}
						</Select>
                    )}
                </FormItem>
                <FormItem
					{ ...formItemLayout }
					label = "选择课程"
				>
					{ getFieldDecorator('courseId',{
						initialValue :  undefined,
						rules : [
						]
					})(
						<Select
							size = 'default'
							showSearch
							allowClear={false}
							optionFilterProp = "children"
							placeholder = '请选择当前校区下的课程'
							notFoundContent = { '当前校区下没有学员课程' }
							onChange = { handleSelectChange }
						>
							{
								courseList &&  courseList.map(function( item, index ){
									return ( <Option key = { 'intention_' + item.courseId } value = { item.courseId + '' } >{ item.courseName }</Option> )
								})
							}
						</Select>
					)}
				</FormItem>
				{ courseDataSource && courseDataSource.length > 0 ?
					<div className = { style.OfflineBook_lesson } >
						<Table
						   dataSource = { courseDataSource}
						   rowKey = 'cpdId'
						   pagination = { false }
						   rowSelection = {rowSelection}
						   bordered
						   size = 'small'
						   columns = {
							   [{
								   title     : '时段',
								   dataIndex : 'startTime',
								   key       : 'startTime',
								   width     : 100,
								   render    : ( text, record ) => (
									   <p>{ record.startTime + '-' + record.endTime }</p>
								   ),
							   },{
								   title     : '课程名称',
								   dataIndex : 'courseName',
								   key       : 'courseName',
								   width     : 82,
							   },{
								   title     : '预约人数',
								   dataIndex : 'maxTryNum',
								   key       : 'maxTryNum',
								   width     : 82,
								   render    : ( text, record ) => (
									   <p >{ record.tryNum+ '/'+record.maxTryNum }</p>
								   ),
							   }, {
								   title     : '教室',
								   dataIndex : 'roomName',
								   key       : 'roomName',
								   width     : 100

							   }, {
								   title     : '主教',
								   dataIndex : 'mtNames',
								   key       : 'mtNames',
								   width     : 100
							   }]
						   }
						/>
					</div> : ""
                }
                <FormItem
                    label="备注"
                    {...formItemLayout}
                >
                    {getFieldDecorator('remark', {
                        initialValue : OfflinebookInfo.remark || undefined,
                        rules : [
                            { required : true, message : '请填写预约试听备注(最多200字)' , max: 200 },
                            { validator : checkWetherSpace }
                        ]

                    })(
                        <Input type='textarea' placeholder='请填写预约试听备注(最多200字)' autosize = {{ minRows : 4 , maxRows : 4 }}/>
                    )}
                </FormItem>
            </Form>
        </Modal>
    )
}

export default Form.create({})(StudentManageCreateForm);



