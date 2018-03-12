import React from 'react';
import { Popover } from 'antd';
import SuperSearch from '../../common/new-component/super-search/SuperSearch';

function StuManagementSupersearch({
	studentTypeList,                           //学员下拉列表
    CreateStumanageSuperSearchVisible,         //高级搜索是否显示
    wetherClearSearchContent,                  //是否切换路由，用于清空快捷搜索与高级搜索栏内容
    CreateStumanageSuperSearchClick,           //高级搜索点击搜索或者重置
    CreateStumanageSuperSearchOnSearch,        //点击右上角的X

    onClearSuperSearchClick,                   //清除高级搜索

}){

    let fields = [
        {
			key         : 'studentType',
			type        : 'select' ,
			label       : '机构类型',
			placeholder : '机构类型',
			options     : studentTypeList,
			opt_key     : 'key',
			opt_label   : 'value'
		},{
			key              : 'stuMobile',
			type             : 'input',
			label            : '客户电话',
            placeholder      : '客户电话',
		},{
			key              : 'location',
			type             : 'location',
			label            : '地区',
            options          : { getPopupContainer : () => document.getElementById( 'super_search_wrap' )}
		},{
			key              : 'finalFollowTime',
			type             : 'rangePicker',
			label            : '最后跟进时间',
			startPlaceholder : '开始时间' ,
			endPlaceholder   : '结束时间'
		},{
			key              : 'nextFollowTime',
			type             : 'rangePicker',
			label            : '下次跟进时间',
			startPlaceholder : '开始时间' ,
			endPlaceholder   : '结束时间'
		},{
			key              : 'modifyTime',
			type             : 'rangePicker',
			label            : '更新时间',
			startPlaceholder : '开始时间' ,
			endPlaceholder   : '结束时间'
		},{
			key         : 'orgId' ,
			type        : 'orgSelect' ,
			label       : '所属校区',
			placeholder : '校区' ,
			options : { getPopupContainer : () => document.getElementById( 'super_search_wrap' )}
		}
    ];

    return(
        <SuperSearch
            searchVisible = {  CreateStumanageSuperSearchVisible }
            onSearch = { (data) => CreateStumanageSuperSearchClick(data,'inner') }
            onClear = { (data) => onClearSuperSearchClick(data,'inner') }
            closeSearch = { CreateStumanageSuperSearchOnSearch }
            wetherChear = { wetherClearSearchContent }
            fields = { fields }
        />
    );
}

export default StuManagementSupersearch;
