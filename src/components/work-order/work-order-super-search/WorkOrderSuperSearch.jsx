import React from 'react';
import { Popover } from 'antd';
import moment from 'moment';
import SuperSearch from '../../common/new-component/super-search/SuperSearch';

/*高级搜索*/
function LeadsFollowSuperSearch({
    superSearchVisible,                         //高级搜索是否显示
    wetherChangeRouter,                         //是否切换路由，用于清空快捷搜索与高级搜索栏内容
    workOrderPriority,                          //工单优先级
    workOrderType,                              //工单类型
    acceptor,                                   //受理人
    SuperSearchOnSearch,                        //高级搜索点击搜索或者重置
    SuperSearchOpenOrClose,                     //点击右上角的X
}){

    let fields = [
        { label : '工单优先级' ,key : 'priority' , type : 'select' , placeholder : '工单优先级' , options : workOrderPriority , opt_label : 'value' },
        { label : '创建人' ,key : 'creator' , type : 'select' , placeholder : '创建人' , options : acceptor , opt_key : 'userId' ,opt_label : 'userName' },
        { label : '受理人' ,key : 'acceptor' , type : 'select' , placeholder : '受理人' , options : acceptor , opt_key : 'userId' ,opt_label : 'userName' },
        { label : '创建时间' ,key : 'createTime' , type : 'rangePicker' , startPlaceholder : '开始时间' , endPlaceholder : '结束时间' },
        { label : '更新时间' ,key : 'modifyTime' , type : 'rangePicker' , startPlaceholder : '开始时间' , endPlaceholder : '结束时间' },
    ];


    return(
        <SuperSearch
            searchVisible = { superSearchVisible }
            onSearch = { (data) => SuperSearchOnSearch(data) }
            onClear = { (data) => SuperSearchOnSearch(data) }
            closeSearch = { SuperSearchOpenOrClose }
            wetherChear = { wetherChangeRouter }
            fields = { fields }
            />
    );
}

export default LeadsFollowSuperSearch;
