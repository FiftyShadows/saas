/*
 *  OrgOnchange function 校区onChange事件(orgId)
 *  DateOnChange function 日期改变事件(包括下拉列表和时间选择器) { startTime : 'YYYY-MM-DD' , endTime : 'YYYY-MM-DD' }
 *  TabOnChange function tab页onChange事件 参数为选中项的key
 *  GeneratingReports function 点击生成报表
 *  searchContent array 搜索项(type:'select',[{type:'select',render_key:'aaa',render_value:'bbb',options:[]}],默认渲染options中的key和value，可以通过render_key和   render_value格式化渲染参数名)
 *  tabContent array tab页数据[{ key : '1' value : '课程' },{ key : '2' value : '教室' }]，默认选中数组第一项
 *  exportPath string 导出时路径
 *  dataTotal number 查询结果数量，用来判断是否可导出
 *  style object 外来样式
 *  buttonLoading boolean 生成报表按钮加载状态
 */
import React from 'react';
import { Dropdown , Menu , Select , DatePicker , Button , Radio , message , Icon , Form } from 'antd';
import { FormatDate , GetCountDays } from '../../../../utils/dateFormat';
import { exportFile } from '../../../../utils/exportFile';
import Media from 'react-media';
import moment from 'moment';
import dateChooseItem from '../dateData.json';
import styles from './ReportFormTop.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RangePicker = DatePicker.RangePicker;

class SheetTop extends React.Component{
    constructor(props){
        super(props);
        this.state = {
            nowDate : undefined,                                //当前日期
            orgMenuList : [],                                   //校区选择下拉列表
            isShowOrgName : false,                              //是否显示校区名称(未选择校区时false，点击清空时置为false)
            orgId : undefined,                                  //选择校区的id
            orgName : undefined ,                               //选择校区后显示的校区名称
            dataSelectValue : undefined,                        //快捷选择的值
            rangerPicker : {},                                  //时间选择器选择范围
            searchContent : this.props.searchContent || [],     //搜索栏内容
            tabContent : this.props.tabContent || [],           //导出左边的tabs页面(现在是替换为下拉列表，暂未使用)
            exportPath : this.props.exportPath || undefined,    //导出路径 置于window.open中
            dataTotal : this.props.dataTotal || 0,              //查询结果，用来判断是否可导出(如果是空数组，则不导出)
            style : this.props.style || {},                     //外来样式
            buttonLoading : this.props.buttonLoading || false,  //生成报表按钮加载状态
        }
    }

    componentWillReceiveProps(nextProps){
        if(!!nextProps){
            if(!!nextProps.exportPath){
                this.setState({
                    exportPath : nextProps.exportPath
                });
            }
            if(!!nextProps.dataTotal){
                this.setState({
                    dataTotal : nextProps.dataTotal
                });
            }
            if(!!nextProps.style){
                this.setState({
                    style : nextProps.style
                });
            }
            if(!!nextProps.firstEnter){
                this.props.form.resetFields();
                this.setState({
                    isShowOrgName : false,
                    orgId : undefined,
                    dataSelectValue : 'today',
                    rangerPicker : {
                        startTime : this.state.nowDate,
                        endTime : this.state.nowDate
                    }
                })
            }
            this.setState({
                buttonLoading : nextProps.buttonLoading || false
            });
        }
    }

    componentDidMount(){
        this.setState({ buttonLoading : false });
        this.init();
    }

    componentWillUnmount(){
        this.setState({ buttonLoading : false });
    }

    init(){
        //列表默认查询今日数据，这里则默认显示头部信息
        let nowObj = window.GetNowDateAndTime();
        this.setState({
            nowDate : nowObj.startDate,
            orgMenuList : window._init_data.orgIdList || [],
            dataSelectValue : 'today',
            rangerPicker : {
                startTime : nowObj.startDate,
                endTime : nowObj.endDate
            }
        })
    }

    //校区选择事件
    menuChoose(orgMsg){
        let index = (orgMsg + '').indexOf('-');
        let orgId = orgMsg.substr(0,index);
        let orgName = orgMsg.substr(index+1);
        this.setState({
            isShowOrgName : true,
            orgId,
            orgName,
        });
        this.props.OrgOnchange && this.props.OrgOnchange(orgId)
    }

    //校区选择清空
    menuClear(){
        this.setState({
            isShowOrgName : false,
            orgId : undefined,
            orgName : undefined,
        });
        this.props.OrgOnchange && this.props.OrgOnchange()
    }

    //时间下拉列表选择事件
    fastDateSelectOnChange(e){
        let rangerPicker = {};
        let nowDate = this.state.nowDate;
        let formatNowDate = new Date(nowDate);
        if(e == 'today'){
            rangerPicker.startTime = nowDate;
            rangerPicker.endTime = nowDate;
        }else if(e == 'yesterday'){
            rangerPicker.startTime = FormatDate(formatNowDate.getTime() - 24*60*60*1000).substr(0,10);
            rangerPicker.endTime = FormatDate(formatNowDate.getTime() - 24*60*60*1000).substr(0,10);
        }else if(e == 'week'){
            let week = formatNowDate.getDay();          //获取当前星期几(0-6/周日-周六)
            if(week == 0){      //如果当前日期是周日
                rangerPicker.startTime = FormatDate(formatNowDate.getTime() - 6*24*60*60*1000).substr(0,10);
                rangerPicker.endTime = nowDate;
            }else{
                rangerPicker.startTime = FormatDate(formatNowDate.getTime() - (week-1)*24*60*60*1000).substr(0,10);
                rangerPicker.endTime = FormatDate(formatNowDate.getTime() - (week-1-6)*24*60*60*1000).substr(0,10);
            }
        }else if(e == '7'){
            rangerPicker.startTime = FormatDate(formatNowDate.getTime() - 6*24*60*60*1000).substr(0,10);
            rangerPicker.endTime = nowDate;
        }else if(e == '30'){
            rangerPicker.startTime = FormatDate(formatNowDate.getTime() - 29*24*60*60*1000).substr(0,10);
            rangerPicker.endTime = nowDate;
        }else if(e == 'thisMonth'){
            let year = formatNowDate.getFullYear();
            let month = formatNowDate.getMonth()+1;
            let days = GetCountDays(year,month);           //获取本月有多少天
            rangerPicker.startTime = nowDate.substr(0,8) + '01';
            rangerPicker.endTime = nowDate.substr(0,8) + days;
        }else if(e == 'lastMonth'){
            let days = '';
            if(formatNowDate.getMonth() > 0){       //不是1月份,直接取上一月份数
                let year = formatNowDate.getFullYear();
                let month = formatNowDate.getMonth();
                days = GetCountDays(year,month);           //获取本月有多少天
                if(formatNowDate.getMonth() >= 10){
                    rangerPicker.startTime = nowDate.substr(0,5) + formatNowDate.getMonth() + '-01';
                    rangerPicker.endTime = nowDate.substr(0,5) + formatNowDate.getMonth() + '-' + days;
                }else{
                    rangerPicker.startTime = nowDate.substr(0,5) + '0' + formatNowDate.getMonth() + '-01';
                    rangerPicker.endTime = nowDate.substr(0,5) + '0' + formatNowDate.getMonth() + '-' + days;
                }
            }else{
                rangerPicker.startTime = parseFloat(nowDate.substr(0,4)) - 1 + '-12-01';
                rangerPicker.endTime = parseFloat(nowDate.substr(0,4)) - 1 + '-12-31';
            }
        }else if(e == 'free'){
            rangerPicker = this.state.rangerPicker;
        }
        this.setState({
            rangerPicker,
            dataSelectValue : e
        });
        this.props.DateOnChange && this.props.DateOnChange(rangerPicker);
    }

    //时间选择器选择事件
    dateRangePickerOnChange(date,dateString){
        //如果是选择，则切换至自定义
        let rangerPicker = {};
        rangerPicker.startTime = !!dateString[0] ? dateString[0] : undefined ;
        rangerPicker.endTime = !!dateString[1] ? dateString[1] : undefined ;
        this.setState({
            rangerPicker,
            dataSelectValue : !!dateString[0] && !!dateString[1] ? 'free' : undefined
        })
        this.props.DateOnChange && this.props.DateOnChange(rangerPicker);
    }

    //生成报表
    GeneratingReports(){
        if(!this.state.rangerPicker.startTime || !this.state.rangerPicker.endTime){
            return message.warn('请选择时间范围');
        }
        let formData = this.props.form.getFieldsValue();
        let obj = {
            orgId : this.state.orgId ,
            startDate : this.state.rangerPicker.startTime ,
            endDate : this.state.rangerPicker.endTime,
            ...formData
        }
        this.props.GeneratingReports && this.props.GeneratingReports(obj);
    }

    //tabs选择事件
    tabOnChange(key){
        this.props.TabOnChange && this.props.TabOnChange(key);
    }

    //select的onChange事件
    selectOnChange(key,value){
        let obj = {};
        obj[key] = value;
        this.props.form.setFieldsValue(obj)
    }

    //导出事件
    export(){
        if(typeof(this.state.exportPath) != 'string'){
            return message.warn('路径参数必须是字符串');
        }
        if(isNaN(parseFloat(this.state.dataTotal)) || this.state.dataTotal == '0'){
            return message.warn('无查询结果可导出');
        }
        if(this.state.exportPath.indexOf('startDate') == -1 || this.state.exportPath.indexOf('endDate') == -1){
            return message.warn('请选择时间范围');
        }
        exportFile(this.state.exportPath);
    }

    render(){

        //渲染日期下拉列表
        let formatDate = [];
        if(dateChooseItem && dateChooseItem.length > 0){
            formatDate = dateChooseItem.map((item,index) => {
                return(
                    <Option key={ item.key } style = { item.key == 'free' ? { display : 'none' } : null }>{ item.value }</Option>
                );
            })
        }

        //渲染校区选择菜单
        let menu = (
            <Menu onClick={(e) => this.menuChoose(e.key)}>
                { this.state.orgMenuList && this.state.orgMenuList.length > 0 ?
                    this.state.orgMenuList.map((item,index) => {
                        return(
                            <Menu.Item key={ item.orgId + '-' + item.orgName }>{ item.orgName }</Menu.Item>
                        );
                    }) : []
                }
            </Menu>
        );

        //渲染tab选项
        let radiogroup = [];
        if(this.state.tabContent && this.state.tabContent.length > 0){
            radiogroup = this.state.tabContent.map((item,index) => {
                return(
                    <Radio.Button key={ item.key } value = { item.key }>{ item.value }</Radio.Button>
                );
            })
        }

        //渲染搜索栏内容
        let searchgroup = [];
        if(this.state.searchContent && this.state.searchContent.length > 0){
            searchgroup = this.state.searchContent.map((select_item,select_index) => {
                if(select_item.type && select_item.type == 'select'){
                    return(
                        <FormItem key = { select_index }>
                            { this.props.form.getFieldDecorator(select_item.key,{
                                initialValue : select_item.initialValue || select_item.options[0].key || select_item.options[0][select_item.render_key]
                            })(
                                <Select
                                    notFoundContent = "未找到"
                                    showSearch
                                    size = 'default'
                                    optionFilterProp = "children"
                                    placeholder = { select_item.placeholder || '排序方式' }
                                    style = {{ width : 140 }}
                                    onChange = {(e) => this.selectOnChange(select_item.key,e)}>
                                    { select_item && select_item.options.length > 0 ?
                                        select_item.options.map((options_item,options_index) => {
                                            //可以通过外部的render_key和render_value来使传入的options的参数名与渲染参数名对应
                                            return(
                                                <Option value = { options_item.key || options_item[select_item.render_key] } key = { options_item.key || options_item[select_item.render_key] }>
                                                    { options_item.value || options_item[select_item.render_value] }
                                                </Option>
                                            )
                                        }) : []
                                    }
                                </Select>
                            )}
                        </FormItem>
                    )
                }
            })
        }

        return (
            <Media query="(max-width: 1350px)">
                { matches => matches ?
                    (
                        <div className={styles.s_all} style = { this.state.style && typeof(this.state.style) == 'object' ? this.state.style : null }>
                            <div className={styles.s_left}>
                                <div className={styles.org}>
                                    <span>统计校区</span>
                                    <Dropdown overlay={ menu } trigger={['click']}>
                                        <a className={styles.orgName} style = { this.state.isShowOrgName ? { marginRight : 20 } : null }>{ !this.state.isShowOrgName ? this.state.orgMenuList.length + '家' : this.state.orgName }</a>
                                    </Dropdown>
                                    { this.state.isShowOrgName ? <a className={styles.clear} onClick = {() => this.menuClear()} key = 'clear'>清除</a> : null }
                                </div>
                                <div className={styles.data_select} style = {{ marginRight : searchgroup && searchgroup.length > 0 ? 10 : 20 }}>
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        size = 'default'
                                        optionFilterProp="children"
                                        placeholder = '日期快捷选择'
                                        style = {{ width : 120 , marginRight : 10 }}
                                        value = { this.state.dataSelectValue }
                                        onChange = {(e) => this.fastDateSelectOnChange(e)}>
                                        { formatDate || [] }
                                    </Select>
                                    <RangePicker
                                        size = 'default'
                                        onChange = {(date,dateString) => this.dateRangePickerOnChange(date,dateString)}
                                        style = {{ width : 240 }}
                                        value = {[ !!this.state.rangerPicker.startTime ? moment(this.state.rangerPicker.startTime,'YYYY-MM-DD') : undefined ,
                                                   !!this.state.rangerPicker.endTime ? moment(this.state.rangerPicker.endTime,'YYYY-MM-DD') : undefined ]}
                                        />
                                </div>
                                { searchgroup && searchgroup.length > 0 ?
                                    <div className={styles.other_search}>
                                        { searchgroup || [] }
                                    </div>
                                    :
                                    []
                                }
                                <Button type = 'primary' className={styles.btn} onClick = {() => this.GeneratingReports()} loading = { this.state.buttonLoading } disabled = { this.state.buttonLoading }>
                                    { this.state.buttonLoading ? null : <Icon type="picture" />}
                                    { this.state.buttonLoading ? '统计中' : '生成报表'}
                                </Button>
                            </div>
                            { (!!this.state.tabContent && this.state.tabContent.length > 0) || !!this.state.exportPath ?
                                <div className={styles.s_right}>
                                    { !!this.state.tabContent && this.state.tabContent.length > 0 ?
                                        <div className='report_form_radioGroup'>
                                            <Radio.Group onChange={(e) => this.tabOnChange(e.target.value)} defaultValue = {this.state.tabContent[0].key}>
                                                { radiogroup || [] }
                                            </Radio.Group>
                                        </div>
                                        :
                                        null
                                    }
                                    { !!this.state.exportPath ?
                                        <div>
                                            <Button className={styles.btn} style = {{ background : '#88c702' , border : '1px solid #88c702' , color : '#fff' }} onClick = {() => this.export()}><Icon type="export" />按查询结果导出</Button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }
                        </div>
                    )
                    :
                    (
                        <div className={styles.l_all} style = { this.state.style && typeof(this.state.style) == 'object' ? this.state.style : null }>
                            <div className={styles.l_left}>
                                <div className={styles.org}>
                                    <span>统计校区</span>
                                    <Dropdown overlay={ menu } trigger={['click']}>
                                        <a className={styles.orgName} style = { this.state.isShowOrgName ? { marginRight : 20 } : null }>{ !this.state.isShowOrgName ? this.state.orgMenuList.length + '家' : this.state.orgName }</a>
                                    </Dropdown>
                                    { this.state.isShowOrgName ? <a className={styles.clear} onClick = {() => this.menuClear()} key = 'clear'>清除</a> : null }
                                </div>
                                <div className={styles.data_select} style = {{ marginRight : searchgroup && searchgroup.length > 0 ? 10 : 20 }}>
                                    <Select
                                        notFoundContent = "未找到"
                                        showSearch
                                        size = 'default'
                                        optionFilterProp="children"
                                        placeholder = '日期快捷选择'
                                        style = {{ width : 120 , marginRight : 10 }}
                                        value = { this.state.dataSelectValue }
                                        onChange = {(e) => this.fastDateSelectOnChange(e)}>
                                        { formatDate || [] }
                                    </Select>
                                    <RangePicker
                                        size = 'default'
                                        onChange = {(date,dateString) => this.dateRangePickerOnChange(date,dateString)}
                                        style = {{ width : 240 }}
                                        value = {[ !!this.state.rangerPicker.startTime ? moment(this.state.rangerPicker.startTime,'YYYY-MM-DD') : undefined ,
                                                   !!this.state.rangerPicker.endTime ? moment(this.state.rangerPicker.endTime,'YYYY-MM-DD') : undefined ]}
                                        />
                                </div>
                                { searchgroup && searchgroup.length > 0 ?
                                    <div className={styles.other_search}>
                                        { searchgroup || [] }
                                    </div>
                                    :
                                    []
                                }
                                <Button className={styles.btn} type = 'primary' onClick = {() => this.GeneratingReports()} loading = { this.state.buttonLoading } disabled = { this.state.buttonLoading }>
                                    { this.state.buttonLoading ? null : <Icon type="picture" />}
                                    { this.state.buttonLoading ? '统计中' : '生成报表'}
                                </Button>
                            </div>
                            { (!!this.state.tabContent && this.state.tabContent.length > 0) || !!this.state.exportPath ?
                                <div className={styles.l_right}>
                                    { !!this.state.tabContent && this.state.tabContent.length > 0 ?
                                        <div className='report_form_radioGroup'>
                                            <Radio.Group onChange={(e) => this.tabOnChange(e.target.value)} defaultValue = {this.state.tabContent[0].key}>
                                                { radiogroup || [] }
                                            </Radio.Group>
                                        </div>
                                        :
                                        null
                                    }
                                    { !!this.state.exportPath ?
                                        <div>
                                            <Button className={styles.btn} style = {{ background : '#88c702' , border : '1px solid #88c702' , color : '#fff' }} onClick = {() => this.export()}><Icon type="export" />按查询结果导出</Button>
                                        </div>
                                        :
                                        null
                                    }
                                </div>
                                :
                                null
                            }
                        </div>
                    )
                }
            </Media>
        );
    }
}
export default Form.create()(SheetTop);
