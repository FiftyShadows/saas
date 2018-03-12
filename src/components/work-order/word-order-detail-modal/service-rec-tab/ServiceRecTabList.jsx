import React from 'react';
import { Button , Popover } from 'antd';
import { StatusFlag , NullData } from '../../../common/new-component/NewComponent';
import itemRender from './ItemRender.json';
import operationType from './OperationType.json';
import styles from './ServiceRecTabList.less';

/*服务记录*/
function ServiceRecTab({
    data,                       //服务记录数据
}){
    return(
        <div className={styles.all}>
            { data && data.length > 0 ? data.map((item,index) => {
                let operation = '';
                for(let i = 0 ; i < operationType.length ; i++){
                    if(item.operation == operationType[i].key){
                        operation = <StatusFlag type = { operationType[i].type } style = {{ marginRight : 10 }}>{ operationType[i].value }</StatusFlag> ; break ;
                    }
                }
                return(
                    <div key = { 'all_' + index } className = { styles.service_record_list }>
                        <div className = { styles.service_record_list_title }>
                            { operation }
                            { itemRender && itemRender.map((item_inner,item_index) =>
                                <Popover key = { 'inner_' + item_index } placement = 'top' content = { item[item_inner.key] }>
                                    <span className = { item_inner.key == 'remarks' ? styles.service_record_list_content + ' ' + styles.remarks : styles.service_record_list_content }>{ item[item_inner.key] }</span>
                                </Popover>)
                            }
                        </div>
                        <div>{ item.createTime }</div>
                    </div>
                )
            }) : <NullData height = '100%' content = '暂时没有服务记录'/> }
        </div>
    );
}

export default ServiceRecTab;
