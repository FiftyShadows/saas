import React from 'react';
import Media from 'react-media';
import { Button , Form , Input , Select , DatePicker , message , Icon , Spin , Popconfirm , Popover } from 'antd';
import { StatusFlag , NullData } from '../../../../../common/new-component/NewComponent';
import styles from './FollowRecordList.less';
const Option = Select.Option;

/*跟进记录*/
function FollowRecordList({
    leadsFollowFollowRecordContentLoading,  //当前跟进记录loading状态
    leadsFollowFollowRecordContent,         //当前leads跟进记录list
    leadsFollowFollowRecordScrollFinish,    //滚动加载是否完成(即数据加载完毕)

    LeadsFollowFollowRecordScrollBottom,    //leads跟进记录已经滑动到最底部
    LeadsFollowFollowRecordEditItem,        //leads跟进记录编辑
    LeadsFollowFollowRecordDeleteItem,      //leads跟进记录删除
}){

    let followRecord = [];      //跟进记录
//    let IntroHeight = 0;        //跟进记录高度
//    let allHeight = 0;          //需要减去的总高度

    //跟进记录列表渲染
    if(leadsFollowFollowRecordContent && leadsFollowFollowRecordContent.length > 0){
        followRecord = leadsFollowFollowRecordContent.map((item,index) => {
            return(
                <div className={styles.follow_record_list_item} key = { index }>
                    <div className={styles.follow_record_list_item_title}>
                        <p><span>跟进时间：</span><span>{ item.followTime || item.createTime || '--' }</span></p>
                        <p><span>跟进方式：</span><span>{ item.type || '--' }</span></p>
                    </div>
                    <div className={styles.follow_record_list_item_content}>
                        <div className={styles.follow_record_list_item_img}>
                            <img
                                src={ item.headimgurl != '' && item.headimgurl != undefined && item.headimgurl != null ? item.headimgurl : 'https://img.ishanshan.com/gimg/img/e51c6060b326c9cf12ddb4f1c4e12443' }
                                width='60px'
                                height='60px'/>
                        </div>
                        <div className={styles.follow_record_list_item_name}>
                            <StatusFlag type = 'light_blue'>{ item.uname || '--' }</StatusFlag>
                        </div>
                        <div className={styles.follow_record_list_item_parent}>
                            跟进联系人：{ item.parentName || '--' }
                        </div>
                        <div className={styles.follow_record_list_item_operation}>
                            {/*<a onClick = {() => LeadsFollowFollowRecordEditItem(item)}>编辑</a>/*/}
                            <Popconfirm placement="left" title='确定删除吗' okText="是" cancelText="否" onConfirm={() => LeadsFollowFollowRecordDeleteItem(item.id)} >
                                <a>删除</a>
                            </Popconfirm>
                        </div>
                        {/*超过110个字显示省略号*/}
                        <div className={styles.follow_record_list_item_intro}>
                            { item.content }
                        </div>
                    </div>
                </div>
            );
        })
    }

    //跟进记录高度设置 注释掉的原因是因为滚动事件放在父div中了

//    if(document.getElementById('leads_detail_message')){
//        IntroHeight = document.getElementById('leads_detail_message').clientHeight;
//    }
//
//    window.onresize = function(){
//        if(document.getElementById('leads_detail_message')){
//            IntroHeight = document.getElementById('leads_detail_message').clientHeight;
//        }
//    }
//
//    allHeight = 70 + IntroHeight + 47 + 20 + 161 + 20 + 10;     //最上面菜单的高度+信息的高度+tab的高度+上内边距+新增跟进记录的高度+下内边距+个人感觉
//
//    //检测滚动条是否滚动到页面底部
//    function isScrollToBottom(){
//        let div = document.getElementById('leads_follow_record_inner_list');
//        //已经滚动到底部,且数据没有加载完毕时才发请求
//        if(div.clientHeight + div.scrollTop >= div.scrollHeight && div.scrollTop > 0 && !leadsFollowFollowRecordScrollFinish){
//            setTimeout(LeadsFollowFollowRecordScrollBottom,100);
//        }
//    }

    return(
        <Spin spinning = { leadsFollowFollowRecordContentLoading }>
            <div className={styles.leads_follow_record_inner_list} /*onScroll={ isScrollToBottom } id='leads_follow_record_inner_list' style= {{height:`calc(100vh - ${allHeight}px)`}}*/>
                { followRecord || [] }
                { followRecord.length == 0 ?
                    <NullData height = '200px' content = '没有更多了'/>
                    :
                  leadsFollowFollowRecordScrollFinish ?
                    <div className={styles.leads_follow_record_inner_bottom}>
                        <span>没有更多了</span>
                    </div>
                    :
                    <div className={styles.leads_follow_record_inner_bottom}>
                        <Icon type="loading" style={{fontSize:'2rem'}}/>
                        <span>加载中...</span>
                    </div>
                }
            </div>
        </Spin>
    );
}

export default FollowRecordList;
