import React from 'react';
import { Button , Popover } from 'antd';
import styles from './StudetailTab.less';


/*详细信息*/
function Detail({
    studentDetailInfo,           //选中leads名单查看详情时当前人的信息
    studentTypeList,                       //学员类型下拉列表
}){

    //需要从员工详情中筛选并渲染的内容
    let expect = [
        { label : "联系人姓名" , value : "parentName" },
        { label : "联系人电话" , value : "parentMobile" },
        { label : "联系人QQ" , value : "qqNumber" },
        { label : "联系人邮箱" , value : "email" },
        { label : "客户来源" , value : "channel" },
        { label : "机构类型" , value : "type" },
        { label : "姓名", value : "name" },
        { label : "备注" ,value : "remark" },
        /*{ label : '性别', value : 'sex'},*/
        /*{ label : '生日', value : 'birthday'},*/
        /*{ label : '月龄', value : 'month'},*/
        /*{ label : '年龄', value : 'age'},*/
		/*{ label : '年级', value : 'grade' },*/
        /*{ label : '星座', value : 'constellation'},*/
        /*{ label : '民族', value : 'nation'},*/
        /*{ label : '特长', value : 'speciality'},*/
        /*{ label : '爱好', value : 'hobby'},*/
        /*{ label : '血型', value : 'bloodType'},*/
        /*{ label : '社保号码', value : 'socialSecurityNum'},*/
        /*{ label : '手机号', value : 'mobile'},*/
        /*{ label : '学员类型', value : 'intentionName'},*/
        /*{ label : '地址', value : 'conaddress'},*/
        /*{ label : '一级来源', value : 'channelName'},*/
        /*{ label : '二级来源', value : 'secondChannelName'},*/
		/*{ label : '备注', value : 'remark' }*/
	];

    //详情信息渲染
    function detailRender(expect,target){
        let arr = [];
        for( let i in expect ){
            if(expect[i].value == 'parentName' || expect[i].value == 'parentMobile' || expect[i].value == 'qqNumber' || expect[i].value == 'email'){
                let inner_item = [];
                inner_item = target.parents.map((item,index) => {
                    if(expect[i].value == 'parentMobile'){
                        return <a key = { expect[i].value + '-' + index } className = { styles.parent_render } onClick = {() => window.CallPhone(item[expect[i].value])}>{ item[expect[i].value] || '--' }</a>
                    }else{
                        return <span key = { expect[i].value + '-' + index } className = { styles.parent_render }>{ item[expect[i].value] || '--' }</span>
                    }
                })
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement={ expect[i].value == 'parentMobile' ? 'top' : 'topLeft' } content={ <div>{ inner_item }</div> } trigger="hover">
                            { expect[i].value == 'parentMobile' ? <a>查看</a> : <span>{ inner_item }</span> }
                        </Popover>
                    </p>
                )
            }else if(expect[i].value == 'type'){
                let show = [];
                let now = !!target[expect[i].value] ? target[expect[i].value].split(',') : [];
                studentTypeList && studentTypeList.map((item,index) => {
                    if(now.indexOf(item.key) > -1){ show.push(item.value)};
                })
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement="topLeft" content={ show.join('，') } trigger="hover">
                            <span>{ show.join('，') }</span>
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

    let detail = detailRender(expect, studentDetailInfo);
    return(
        <div className={styles.leads_detail_inner}>
            <div className={styles.leads_detail_inner_img}>
                <img src={
                        !!studentDetailInfo && !!studentDetailInfo.headimgurl ?
                            studentDetailInfo.headimgurl :
                        !!studentDetailInfo && studentDetailInfo.sex == '2' ?
                        'https://img.ishanshan.com/gimg/img/ad8cc625441146bdf8e373dec1cd600f' :
                        !!studentDetailInfo && studentDetailInfo.sex == '1' ?
                        'https://img.ishanshan.com/gimg/img/d75fdb312bbaca043a97d24c5453a337' :
                        'https://img.ishanshan.com/gimg/img/6f1436b4c39b3afb25e5ac00509a5e64'
                    }
                    style = {{ width : 80 , height : 80 , borderRadius : '50%' }}/>
            </div>
            <div className={styles.leads_detail_inner_message}>
                { detail || [] }
            </div>
        </div>
    );
}

export default Detail;
