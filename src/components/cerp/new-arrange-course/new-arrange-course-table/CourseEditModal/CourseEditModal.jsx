import React from 'react';
import { Form, Modal, Button, Icon, Select, Input, DatePicker, TimePicker, Spin, message , Popover , Popconfirm } from 'antd';
import { NullData } from '../../../../common/new-component/NewComponent';
import { BlockPicker } from 'react-color';
import { uniqueArr } from '../../../../../utils/arrayUtils';
import moment from 'moment';
import QueueAnim from 'rc-queue-anim';
import styles from './CourseEditModal.less';
import CourseEditModalTable from './CourseEditModalTable';
let Option = Select.Option;
let FormItem = Form.Item;
const formItemLayoutOne = {
    labelCol : { span : 5 },
    wrapperCol : { span : 18 }
}
const formItemLayoutTwo = {
    labelCol : { span : 10 },
    wrapperCol : { span : 12 }
}
const formItemLayoutThree = {
    labelCol : { span : 15 },
    wrapperCol : { span : 9 }
}

//主排课编辑
function CourseEditModal({
    courseEditModalVisible,                 //主排课编辑modal是否显示
    courseEditModalButtonLoading,           //主排课编辑modal按钮是否加载
    courseEditModalTableLoading,            //主排课编辑modal中的子排课列表加载状态
    courseEditModalSelectedRowKeys,         //子排课查询选中项的key数组
    courseEditModalSelectedRows,            //子排课查询选中项的对象数组

    courseEditModalGetContent,              //主排课点击编辑获取到的详情

    courseEditModalTeacherSelectContent,       //主教和助教下拉列表数据
    courseEditModalClassRoomSelectContent,     //教室下拉列表数据
    courseEditModalRangeCourseDetail,          //选择时间范围后出来的子排课数据

    wetherClearCourseEditModal,             //是否编辑成功(用来清空表单)

    CourseBatchDelete,                  //子排课记录批量删除
    EditDateOnChange,                   //编辑周期内开始时间和结束时间onChange事件(用于请求排课列表)
    CourseEditModalSelectedRowOnChange, //子排课复选框onChange事件
    CourseEditModalCancel,              //主排课编辑modal关闭
    CourseEditModalSubmit,              //主排课编辑modal提交
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

    if(wetherClearCourseEditModal){
        resetFields();
        CourseEditModalCancel();
    }

    let teacher = [];       //主教和助教
    let classRoom = [];     //教室

    //渲染主教和助教下拉列表
    if(courseEditModalTeacherSelectContent && courseEditModalTeacherSelectContent.length > 0){
        teacher = courseEditModalTeacherSelectContent.map((item,index) => {
            return(
                <Option key = { item.userId + '' } value = { item.userId + '' }>{ item.userName + '' }</Option>
            );
        })
    }

    //渲染教室信息
    if(courseEditModalClassRoomSelectContent && courseEditModalClassRoomSelectContent.length > 0){
        classRoom = courseEditModalClassRoomSelectContent.map((item,index) => {
            return(
                <Option key = { item.id + '' } value = { item.id + '' }>{ item.name + '' }</Option>
            );
        })
    }

    //信息渲染
    function detailRender(expect,target){
        let arr = [];
        for(let i in expect){
            if(expect[i].value == 'startTime'){
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement="topLeft" content={ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '~' + target.endTime : '--' } trigger="hover">
                            <span>{ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '~' + target.endTime : '--' }</span>
                        </Popover>
                    </p>
                )
            }else{
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement="topLeft" content={ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' } trigger="hover">
                            <span>{ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' }</span>
                        </Popover>
                    </p>
                )
            }
        }
        return arr;
    }

    //课程信息渲染
    let expect = [{label:'课程名称',value:'courseName'},
                  {label:'星期',value:'zj_weekday'},
                  {label:'时间段',value:'startTime'}];

    //课程信息渲染
    let course = detailRender(expect,courseEditModalGetContent);

    //编辑周期内开始时间和结束时间onChange事件(用于请求排课列表)
    function DateOnChange(dates, dateStrings,type){
        let start = getFieldValue('startDate');
        let end = getFieldValue('endDate');
        let obj = {};
        if(type == 'startDate'){
            if(end != null && end != '' && end != undefined && dateStrings != '' && dateStrings != null && dateStrings != undefined){
                obj.cpmId = courseEditModalGetContent.cpmId;
                obj.startDate = dateStrings;
                obj.endDate = end.format('YYYY-MM-DD');
                EditDateOnChange(obj);
            }else if((end == null || end == '' || end == undefined) &&　(dateStrings == null || dateStrings == '' || dateStrings == undefined)){
                EditDateOnChange(obj,'clear');
            }
        }else if(type == 'endDate'){
            if(start != null && start != '' && start != undefined && dateStrings != '' && dateStrings != null && dateStrings != undefined){
                obj.cpmId = courseEditModalGetContent.cpmId;
                obj.startDate = start.format('YYYY-MM-DD');
                obj.endDate = dateStrings;
                EditDateOnChange(obj);
            }
            else if((start == null || start == '' || start == undefined) &&　(dateStrings == null || dateStrings == '' || dateStrings == undefined)){
                EditDateOnChange(obj,'clear');
            }
        }
    }

    function handleComplete(e){
        e.preventDefault();
        validateFieldsAndScroll((err, values) => {
            if( !!err ){
                return;
            }

            if(courseEditModalSelectedRows &&　courseEditModalSelectedRows.length == 0){
                return message.warn('请至少选中一项排课编辑');
            }

            //处理当前进度/起始进度(只有在填写后才做判断)
            if(values.processSuf != '' && values.processSuf != null && values.processSuf != undefined && !/^[\s]*$/.test(values.processSuf) && !/^(0|[1-9]\d*)$/.test(values.processSuf)){
                return message.warn('进度内容必须为非负整数');
            }
//            //需求更改，均修改为非必选
//            //主教
//            if(values.mtids == '' || values.mtids == null || values.mtids == undefined || /^[\s]*$/.test(values.mtids)){
//                return message.warn('请选择主教');
//            }
//
//            //教室
//            if(values.roomId == '' || values.roomId == null || values.roomId == undefined || /^[\s]*$/.test(values.roomId)){
//                return message.warn('请选择教室');
//            }
//
//            //处理人数(上课人数，补课人数，试听人数)
//            if(!/^(0|[1-9]\d*)$/.test(values.maxNum)){
//                return message.warn('最大上课人数必须是非负整数');
//            }
//            if(parseInt(values.maxNum) > 99){
//                return message.warn('上课人数最多99');
//            }
//            if(!/^(0|[1-9]\d*)$/.test(values.maxMulNum)){
//                return message.warn('最大补课人数必须是非负整数');
//            }
//            if(parseInt(values.maxMulNum) > 99){
//                return message.warn('补课人数最多99');
//            }
//            if(!/^(0|[1-9]\d*)$/.test(values.maxTryNum)){
//                return message.warn('最大试听人数必须是非负整数');
//            }
//            if(parseInt(values.maxTryNum) > 99){
//                return message.warn('试听人数最多99');
//            }
//
//            //标题
//            if(values.title == '' || values.title == null || values.title == undefined || /^[\s]*$/.test(values.title)){
//                return message.warn('请输入标题');
//            }
//
//            //颜色
//            if(values.color == '' || values.color == null || values.color == undefined || /^[\s]*$/.test(values.color)){
//                return message.warn('请选择颜色');
//            }

            //处理cpmId
            values.cpmId = courseEditModalGetContent.cpmId || '';

            //处理选中排课的cpdIds
            let cpdIds = [];
            for(let i in courseEditModalSelectedRows){
                cpdIds.push(courseEditModalSelectedRows[i].cpdId);
            }
            values.cpdIds = cpdIds.join(',');


            //判断主教和助教是否有同一人
            if(values.mtids != null && values.mtids != '' && values.mtids != undefined && !/^[\s]*$/.test(values.mtids) &&
               values.atids != null && values.atids != '' && values.atids != undefined && !/^[\s]*$/.test(values.atids)){
                values.mtids = uniqueArr(values.mtids);
                values.atids = uniqueArr(values.atids);
                for(let i in values.mtids){
                    for(let j in values.atids){
                        if(values.mtids[i] == values.atids[j]){
                            return message.warn('主教和助教不能包含同一人');
                        }
                    }
                }
            }

            //处理主教
            if(values.mtids != null && values.mtids != '' && values.mtids != undefined && !/^[\s]*$/.test(values.mtids)){
                values.mtids = values.mtids.join(',');
            }else{
                values.mtids = '';
            }

            //处理助教
            if(values.atids != null && values.atids != '' && values.atids != undefined && !/^[\s]*$/.test(values.atids)){
                values.atids = values.atids.join(',');
            }else{
                values.atids = '';
            }

            //处理上课和下课时间(绑定修改)
            if(( !!values.classTimeStart && !values.classTimeEnd ) || ( !values.classTimeStart && !!values.classTimeEnd )){
                return message.warn('上课时间与下课时间必须绑定修改');
            }else if( !!values.classTimeStart && !!values.classTimeEnd ){
                let startTime = new Date(values.classTimeStart._d).getTime();
                let endTime = new Date(values.classTimeEnd._d).getTime();
                if(startTime >= endTime){
                    return message.warn('结束时间不能早于或等于开始时间');
                }
                values.startTime = values.classTimeStart.format('HH:mm');
                values.endTime = values.classTimeEnd.format('HH:mm');
            }
            delete values.classTimeStart;
            delete values.classTimeEnd;

            //删除编辑周期中的上课日期
            delete values.startDate;
            delete values.endDate;

            //console.info(values)
            CourseEditModalSubmit(values);
        })
    }

    function handleCancel(){
        resetFields();
        CourseEditModalCancel();
    };

    //CourseEditModalTable属性
    let CourseEditModalTableProps = {
        table : {
            xScroll : 850,
            yScroll : 250,
            ProgressBarHeight : 250,
            loading : courseEditModalTableLoading,
            dataSource : courseEditModalRangeCourseDetail,
            rowSelection : {
                selectedRowKeys : courseEditModalSelectedRowKeys,
                onChange : CourseEditModalSelectedRowOnChange,        //子排课复选框onChange事件
            },
            rowKey : 'cpdId'
        },
    }

    //模态框的属性
    let modalOpts = {
        title: '编辑排课',
        maskClosable : false,
        visible : courseEditModalVisible,
        closable : true,
        width : 1000,
        onOk: handleComplete,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="ghost" onClick={handleCancel}>取消</Button>,
            <Button key="submit" type="primary"
                    onClick={handleComplete}
                    disabled={courseEditModalButtonLoading}
                    loading={courseEditModalButtonLoading}
                    style={{marginLeft:20}}>提交</Button>
        ],
        className : 'arrange_course_main_course_edit_modal'
    };

    //排课颜色选择器
    let scheduleColorPick = (
        <BlockPicker
            triangle="hide"
            color={getFieldValue('color') || '#1dafe4'}
            colors={[
                '#523d87', '#8e4090', '#db3387', '#e776c8', '#7976e7',
                '#1dafe4', '#0b7a3b', '#169f4e', '#97c24a', '#fbbc3c',
                '#e76d39', '#d62436', '#d9c585', '#9e612f', '#772c1d'
            ]}
            onChangeComplete={scheduleColorChange}/>
    );

    function scheduleColorChange(color) {
        setFieldsValue({'color': color.hex});
    }

	return(
        <Modal {...modalOpts}>
            <div className={styles.top}>
                <div className={styles.top_left}>
                    <div className={styles.title}>
                        课程信息
                    </div>
                    <div className={styles.top_left_content}>
                        { course.length > 0 ? course :
                            <div className={styles.top_left_content_null}>
                                暂无数据
                            </div>
                        }
                    </div>
                    <div className={styles.title}>
                        编辑周期
                    </div>
                    <div className={'arrange_course_main_course_edit_left_form ' + styles.top_left_edit}>
                        <FormItem
                            label = "开始"
                            { ...formItemLayoutOne }
                        >
                            { getFieldDecorator('startDate',{
                                initialValue : courseEditModalGetContent.startDate ? moment(courseEditModalGetContent.startDate, 'YYYY-MM-DD') : undefined
                            })(
                                 <DatePicker
                                    placeholder = '开始日期'
                                    format = "YYYY-MM-DD"
                                    size = 'default'
                                    showToday
                                    style = {{ width : 145 }}
                                    onChange = {(date,dateStting) => DateOnChange(date,dateStting,'startDate')}/>
                            )}
                        </FormItem>
                        <FormItem
                            label = "结束"
                            { ...formItemLayoutOne }
                        >
                            { getFieldDecorator('endDate',{
                                initialValue : courseEditModalGetContent.endDate ? moment(courseEditModalGetContent.endDate, 'YYYY-MM-DD') : undefined
                            })(
                                 <DatePicker
                                    placeholder = '结束日期'
                                    format = "YYYY-MM-DD"
                                    size = 'default'
                                    showToday
                                    style = {{ width : 145 }}
                                    onChange = {(date,dateStting) => DateOnChange(date,dateStting,'endDate')}/>
                            )}
                        </FormItem>
                        <div>
                            <span style = {{ marginRight : 2 }}>选中记录数</span>:
                            <Input size = 'default' style = {{ width : 112 , marginLeft : 6 }} placeholder = '选中记录数' value = { courseEditModalSelectedRows.length || 0 }/>
                        </div>
                        <QueueAnim
                            type={['left', 'left']}
                            ease={['easeOutQuart', 'easeInOutQuart']}>
                            { courseEditModalSelectedRows && courseEditModalSelectedRows.length > 0 ?
                                <div key = 'operation'>
                                    <Popconfirm placement = "top" title = '确定要删除吗' okText = "确定" cancelText = "取消" onConfirm = {() => CourseBatchDelete(courseEditModalSelectedRows,getFieldValue('startDate'),getFieldValue('endDate'))}>
                                        <span style = {{ marginRight : 2 }}>操作</span>:<a style = {{ marginLeft : 8 }}>{ courseEditModalSelectedRows.length == 1 ? '删除' : '批量删除' }</a>
                                    </Popconfirm>
                                </div>
                                :
                                null
                            }
                        </QueueAnim>
                    </div>
                </div>
                <div className={styles.top_right}>
                    <div className={styles.title}>
                        请填写需要修改的信息栏，若不填写则不修改
                    </div>
                    <div className='arrange_course_main_course_edit_right_form'>
                        <Form className={styles.top_right_edit}>
                            <div className={styles.top_right_edit_left}>
                                <FormItem
                                    label = "主教"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('mtids',{
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.mtids && courseEditModalGetContent.mtids != '' && courseEditModalGetContent.mtids != undefined && courseEditModalGetContent.mtids != null ? courseEditModalGetContent.mtids.split(',') : []*/
                                    })(
                                        <Select
                                            mode = 'multiple'
                                            notFoundContent = "未找到"
                                            showSearch
                                            allowClear
                                            size = 'default'
                                            optionFilterProp="children"
                                            placeholder = '请选择主教'
                                            style = {{ width : 150 }}>
                                            { teacher || [] }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "助教"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('atids',{
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.atids && courseEditModalGetContent.atids != '' && courseEditModalGetContent.atids != undefined && courseEditModalGetContent.atids != null ? courseEditModalGetContent.atids.split(',') : []*/
                                    })(
                                        <Select
                                            mode = 'multiple'
                                            notFoundContent = "未找到"
                                            showSearch
                                            allowClear
                                            size = 'default'
                                            optionFilterProp="children"
                                            placeholder = '请选择助教'
                                            style = {{ width : 150 }}>
                                            { teacher || [] }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "最大上课人数"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('maxNum',{
                                        /*initialValue : courseEditModalGetContent && (courseEditModalGetContent.maxNum || courseEditModalGetContent.maxNum == 0) ?
                                        courseEditModalGetContent.maxNum + '' : undefined*/
                                    })(
                                        <Input placeholder = '最大上课人数(正整数)' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "最大补课人数"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('maxMulNum',{
                                        /*initialValue : courseEditModalGetContent && (courseEditModalGetContent.maxMulNum || courseEditModalGetContent.maxMulNum == 0) ?
                                        courseEditModalGetContent.maxMulNum + '' : undefined*/
                                    })(
                                        <Input placeholder = '最大补课人数(正整数)' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "最大试听人数"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('maxTryNum',{
                                        /*initialValue : courseEditModalGetContent && (courseEditModalGetContent.maxTryNum || courseEditModalGetContent.maxTryNum == 0) ?
                                        courseEditModalGetContent.maxTryNum + '' : undefined*/
                                    })(
                                        <Input placeholder = '最大试听人数(正整数)' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                            </div>
                            <div className={styles.top_right_edit_right}>
                                <FormItem
                                    label = "教室"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('roomId',{
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.roomId || undefined*/
                                    })(
                                        <Select
                                            notFoundContent = "未找到"
                                            showSearch
                                            allowClear
                                            size = 'default'
                                            optionFilterProp="children"
                                            placeholder = '请选择教室'
                                            style = {{ width : 150 }}>
                                            { classRoom || [] }
                                        </Select>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "上课时间"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('classTimeStart',{
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.startTime && moment(courseEditModalGetContent.startTime, 'HH-mm') || undefined*/
                                    })(
                                        <TimePicker style={{width: 120}} format="HH:mm" placeholder = '上课时间' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "下课时间"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('classTimeEnd',{
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.endTime && moment(courseEditModalGetContent.endTime, 'HH-mm') || undefined*/
                                    })(
                                        <TimePicker style={{width: 120}} format="HH:mm" placeholder = '下课时间' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    label = "标题"
                                    { ...formItemLayoutTwo }
                                >
                                    { getFieldDecorator('title', {
                                        /*initialValue : courseEditModalGetContent && courseEditModalGetContent.title || undefined*/
                                    })(
                                        <Input placeholder = '请输入标题' size = 'default' style = {{ width : 150 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayoutTwo}
                                    label="颜色"
                                >
                                    {getFieldDecorator('color', {
                                        initialValue: courseEditModalGetContent && courseEditModalGetContent.color || '#1dafe4',
                                    })(
                                        <Popover content = { scheduleColorPick } title = { null } trigger = "click" >
                                            <div style={{backgroundColor: getFieldValue('color') , width : 150 , height : 30 , lineHeight : '30px' , color : '#fff' , borderRadius : 5 , textAlign : 'center' , cursor : 'pointer' }}>
                                                可点击更改
                                            </div>
                                        </Popover>
                                    )}
                                </FormItem>
                            </div>
                            <div className={styles.top_right_edit_bottom}>
                                <FormItem
                                    {...formItemLayoutThree}
                                    label="课程进度"
                                >
                                    {getFieldDecorator('processPre')(
                                        <Input size = 'default' placeholder = '进度前缀' style = {{ width : 70 }}/>
                                    )}
                                </FormItem>
                                <FormItem
                                    {...formItemLayoutThree}
                                >
                                    {getFieldDecorator('processSuf')(
                                        <Input size = 'default' placeholder = { courseEditModalSelectedRows.length > 1 ?  '起始进度' : '当前进度' } style = {{ width : 70 }}/>
                                    )}
                                </FormItem>
                            </div>
                        </Form>
                    </div>
                </div>
            </div>
            { courseEditModalRangeCourseDetail &&　courseEditModalRangeCourseDetail.length > 0 ?
                <div className={styles.bottom}>
                    <CourseEditModalTable {...CourseEditModalTableProps}/>
                </div>
                :
                <NullData height = '250px'/>
            }
        </Modal>
	)

};
export default Form.create()(CourseEditModal);
