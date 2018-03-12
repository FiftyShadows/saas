import React from 'react';
import { Button , Popover } from 'antd';
import styles from './Detail.less';
import expect from './Detail.json';


/*详细信息*/
function Detail({
    data,                       //工单详细信息
    workOrderPriority,          //工单优先级
}){
    //详情信息渲染
    function detailRender(expect,target){
        let arr = [];
        for(let i in expect){
            if(expect[i].value == 'priority'){
                let value = target[expect[i].value];
                let format_value = '--';
                for(let i = 0 ; i < workOrderPriority.length ; i++){
                    if(workOrderPriority[i].key == value){ format_value = workOrderPriority[i].value ; break ; }
                }
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement="top" content={ format_value } trigger="click">
                            { format_value }
                        </Popover>
                    </p>
                )
            }else{
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement="top" content={ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' } trigger="hover">
                            <span>{ !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' }</span>
                        </Popover>
                    </p>
                )
            }
        }
        return arr;
    }

    return(
        <div className={styles.all}>
            <img src='https://img.ishanshan.com/gimg/img/6f1436b4c39b3afb25e5ac00509a5e64' style = {{ width : 80 , height : 80 , borderRadius : '50%' }}/>
            <div className = { styles.detail_msg }>
             { detailRender(expect,data) }
            </div>
        </div>
    );
}

export default Detail;
