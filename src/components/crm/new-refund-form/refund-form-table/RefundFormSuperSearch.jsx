import React from 'react';
import { Popover } from 'antd';
import SuperSearch from '../../../common/new-component/super-search/SuperSearch';

/*高级搜索*/
function RefundFormSuperSearch({
    wetherChangeRouter,                             //是否切换路由，用于清空快捷搜索与高级搜索栏内容
    refundFormType,                                 //全部退款单(all)，我负责的退款(my)，审核退款(check)
    refundRightSuperSearchVisible,                  //高级搜索是否显示
    RefundRightSuperSearchClick,                    //高级搜索点击搜索或者重置
    RefundSuperSearchOnSearch,                      //点击右上角的X
}){

    //审核退款不需要退款单状态查询
    let fields = [];
    if(refundFormType == 'check'){
        fields = [
            { label : '所属校区' , key : 'orgId' , type : 'orgSelect' , placeholder : '所属校区' , options : { getPopupContainer : () => document.getElementById( 'super_search_wrap' )}},
            { label : '退款单编号' , key : 'id' , type : 'input' , placeholder : '退款单编号' },
            { label : '会员卡号' , key : 'cardId' , type : 'input' , placeholder : '会员卡号' },
            { label : '退款单类型' , key : 'refundType' , type : 'select' , placeholder : '退款单类型' , options : [{ key : '' , label : '全部' },{ key : '1' , label : '退款' },{ key : '2' , label : '退课时' }]}
        ];
    }else{
        fields = [
            { label : '所属校区' , key : 'orgId' , type : 'orgSelect' , placeholder : '所属校区' , options : { getPopupContainer : () => document.getElementById( 'super_search_wrap' )}},
            { label : '退款单编号' , key : 'id' , type : 'input' , placeholder : '退款单编号' },
            { label : '会员卡号' , key : 'cardId' , type : 'input' , placeholder : '会员卡号' },
            { label : '退款单状态' , key : 'status' , type : 'select' , placeholder : '退款单状态' , options : [{ key : '' , label : '全部' },{ key : '1' , label : '待退款' },{ key : '2' , label : '已退款' },{ key : '3' , label : '已驳回' }]},
            { label : '退款单类型' , key : 'refundType' , type : 'select' , placeholder : '退款单类型' , options : [{ key : '' , label : '全部' },{ key : '1' , label : '退款' },{ key : '2' , label : '退课时' }]}
        ];
    }

    return(
        <SuperSearch
            searchVisible = { refundRightSuperSearchVisible }
            onSearch = { (data) => RefundRightSuperSearchClick(data) }
            onClear = { (data) => RefundRightSuperSearchClick(data) }
            closeSearch = { RefundSuperSearchOnSearch }
            wetherChear = { wetherChangeRouter }
            fields = { fields }
            />
    );
}

export default RefundFormSuperSearch;
