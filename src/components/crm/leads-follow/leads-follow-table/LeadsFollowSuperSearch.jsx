import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import SuperSearch from '../../../common/new-component/super-search/SuperSearch';

/*高级搜索*/
function LeadsFollowSuperSearch({
    leadsFollowSecondChannel,                   //二级来源
    leadsFollowConnectStatus,                   //联系方式
    leadsFollowOrgScale,                        //机构规模
    leadsFollowType,                            //全部leads(all),我的leads(my),公海池(public),回收站(recycle)
    leadsFollowRightSuperSearchVisible,         //高级搜索是否显示
    leadsFollowRightSuperSearchContent,         //高级搜索栏搜索内容
    wetherChangeRouter,                         //是否切换路由，用于清空快捷搜索与高级搜索栏内容
    LeadsFollowRightSuperSearchClick,           //高级搜索点击搜索或者重置
    LeadsSuperSearchOnSearch,                   //点击右上角的X
}){

    //处理下次跟进时间(因为CRM首页点击时需要回填)
    let startNextFollowTime = leadsFollowRightSuperSearchContent && leadsFollowRightSuperSearchContent.startNextFollowTime ? leadsFollowRightSuperSearchContent.startNextFollowTime : undefined;
    let endNextFollowTime = leadsFollowRightSuperSearchContent && leadsFollowRightSuperSearchContent.endNextFollowTime ? leadsFollowRightSuperSearchContent.endNextFollowTime : undefined;

    //处理创建时间(因为CRM首页点击时需要回填)
    let startCreateTime = leadsFollowRightSuperSearchContent && leadsFollowRightSuperSearchContent.startCreateTime ? leadsFollowRightSuperSearchContent.startCreateTime : undefined;
    let endCreateTime = leadsFollowRightSuperSearchContent && leadsFollowRightSuperSearchContent.endCreateTime ? leadsFollowRightSuperSearchContent.endCreateTime : undefined;

    let fields = [
        { label : '所属校区' , key : 'orgId' , type : 'orgSelect' , placeholder : '所属校区' , options : { getPopupContainer : () => document.getElementById( 'super_search_wrap' )}},
        { label : '最终来源' ,key : 'secondChannel' , type : 'select' , placeholder : '最终来源' , options : leadsFollowSecondChannel , opt_label : 'value' },
        { label : '联系状态' ,key : 'contactState' , type : 'select' , placeholder : '联系状态' , options : leadsFollowConnectStatus , opt_label : 'value' },
        { label : '机构规模' ,key : 'orgSize' , type : 'select' , placeholder : '机构规模' , options : leadsFollowOrgScale , opt_label : 'value' },
        { label : '客户电话' ,key : 'mobile' , type : 'input' , placeholder : '客户电话' },
        { label : '联系人' ,key : 'parentName' , type : 'input' , placeholder : '联系人姓名' },
        { label : '联系人电话' ,key : 'parentMobile' , type : 'input' , placeholder : '联系人手机号' },
        { label : '是否接通',key  : 'callStatus',type : 'select',placeholder : '是否接通', options : [{ key : '0', label : '未接通' },{ key : '1', label : '已接通' }]},
        { label : '创建日期' ,key : 'createTime' , type : 'rangePicker' , startPlaceholder : '开始日期' , endPlaceholder : '结束日期' , initialValue : [ startCreateTime != undefined ? moment(startCreateTime,'YYYY-MM-DD HH:mm') : undefined, endCreateTime != undefined ? moment(endCreateTime,'YYYY-MM-DD HH:mm') : undefined ]},
        { label : '更新时间' ,key : 'modifyTime' , type : 'rangePicker' , startPlaceholder : '开始日期' , endPlaceholder : '结束日期' },
        { label : '下次跟进时间' ,key : 'nextFollowTime' , type : 'rangePicker' , startPlaceholder : '开始时间' , endPlaceholder : '结束时间' , initialValue : [ startNextFollowTime != undefined ? moment(startNextFollowTime,'YYYY-MM-DD HH:mm') : undefined, endNextFollowTime != undefined ? moment(endNextFollowTime,'YYYY-MM-DD HH:mm') : undefined ]},
        { label : '最后跟进时间' ,key : 'finalFollowTime' , type : 'rangePicker' , startPlaceholder : '开始时间' , endPlaceholder : '结束时间' },
        { label : '收集者' ,key : 'collecterName' , type : 'input' , placeholder : '收集者' },
        { label : '推荐人' ,key : 'recommenderName' , type : 'input' , placeholder : '推荐人' }
    ];

    {/*全部名单高级搜索在收集者前边增加负责销售选项*/}
    if(leadsFollowType == 'all'){
        let obj = { label : '负责销售' , key : 'uidName' , type : 'input' , placeholder : '负责销售' }
        for(let i in fields){
            if(fields[i].key == 'mobile'){
                fields.splice(i,0,obj);
                break;
            }
        }
    }

    return(
        <SuperSearch
            searchVisible = { leadsFollowRightSuperSearchVisible }
            onSearch = { (data) => LeadsFollowRightSuperSearchClick(data) }
            onClear = { (data) => LeadsFollowRightSuperSearchClick(data) }
            closeSearch = { LeadsSuperSearchOnSearch }
            wetherChear = { wetherChangeRouter }
            fields = { fields }
            />
    );
}

export default LeadsFollowSuperSearch;
