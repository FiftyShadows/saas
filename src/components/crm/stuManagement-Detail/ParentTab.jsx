import React from 'react';
import moment from 'moment';
import { Popover , Button ,Table , Icon } from 'antd';
import style from './ParentTab.less';

import ClassPackageComponent from '../../common/new-component/manager-list/ManagerList';

function ReservedsessionTab ({
    parenttabList,

    addParent,

}) {
    parenttabList && parenttabList.map(function(item, index){
        item.key = index;
    });
    let StumagegeComponentProps = {
        table: {
            //loading,
            dataSource : parenttabList,
            rowKey     : 'id',
            columns: [
                {
                    dataIndex : 'name',
                    key       : 'name',
                    title     : '联系人姓名',
                    width     : 120
                },{
                    dataIndex : 'mobile',
                    key       : 'mobile',
                    title     : '联系电话',
                    width     : 120,
                    render : (text,record) => (
                        <a onClick = {() => window.CallPhone(text)}>{ text }</a>
                    )
                },{
                    dataIndex : 'qqNumber',
                    key       : 'qqNumber',
                    title     : 'QQ',
                    width     : 100,
                    render    : (text, record) => (
						<Popover placement="top" content = { text || '' } trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    dataIndex : 'weixin',
                    key       : 'weixin',
                    title     : '微信',
                    width     : 100,
                    render    : (text, record) => (
						<Popover placement="top" content = { text || '' } trigger="hover">
                            { text }
                        </Popover>
                    )
                },{
                    dataIndex : 'email',
                    key       : 'email',
                    title     : '邮箱',
                    width     : 100
                }
            ],
        },
    };
    return (
        <ClassPackageComponent {...StumagegeComponentProps} />
    );
}

export default ReservedsessionTab;
