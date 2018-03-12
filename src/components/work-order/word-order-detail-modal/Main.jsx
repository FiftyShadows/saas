import React from 'react';
import Media from 'react-media';
import { Button , Form , Input , Tabs , Select , Icon , Dropdown , Menu , Popover , Radio , Spin } from 'antd';
import { NewModal } from '../../common/new-component/NewComponent';
import DetailTab from './detail-tab/Detail';
import ServiceRecTab from './service-rec-tab/ServiceRecTabList';
import MainTop from './MainTop.json';
import styles from './Main.less';
const TabPane = Tabs.TabPane;
const ButtonGroup = Button.Group;

/*工单详情侧滑框*/
function Main({
    dp,                                     //dispatch方法
    workOrderDetailModalVisible,            //modal是否显示
    workOrderDetailModalLoading,            //modal加载状态
    workOrderPriority,                      //工单优先级
    workOrderType,                          //工单类型
    /*基本信息tab页*/
    detailBaseInfoData,                     //基本信息数据

    /*服务记录tab页*/
    detailServiceList,                      //服务记录数据
}){

    //详情信息渲染
    function detailRender(expect,target){
        let arr = [];
        for(let i in expect){
            if(expect[i].value == 'status'){
                let format_value = '--';
                switch(target[expect[i].value]){
                    case '0' : format_value = '作废' ; break ;
                    case '1' : format_value = '待受理' ; break ;
                    case '2' : format_value = '受理中' ; break ;
                    case '3' : format_value = '完结' ; break ;
                }
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement = 'left' content = { format_value }>
                            { format_value }
                        </Popover>
                    </p>
                )
            }else if(expect[i].value == 'type'){
                let value = target[expect[i].value];
                let format_value = '--';
                for(let i = 0 ; i < workOrderType.length ; i++){
                    if(workOrderType[i].key == value){ format_value = workOrderType[i].value ; break ; }
                }
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement = 'left' content = { format_value }>
                            { format_value }
                        </Popover>
                    </p>
                )
            }else{
                arr.push(
                    <p key = { i }>
                        <span>{ expect[i].label }：</span>
                        <Popover placement = 'left' content = { !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' }>
                            { !!target[expect[i].value] || target[expect[i].value] === 0 ? target[expect[i].value] + '' : '--' }
                        </Popover>
                    </p>
                )
            }
        }
        return arr;
    }

    function DetailModalClose(){
        dp('workOrder/updateState' , { workOrderDetailModalVisible : false })
    }

    let NewModalProps = {
        visible : workOrderDetailModalVisible,
        headVisible : false,
        closable : true,
        onCancel : DetailModalClose,
        footer : '',
    }

    let IntroHeight = 0;
    let head_id = 'work_detail_detail_modal';

    if(document.getElementById(head_id)){
        IntroHeight = document.getElementById(head_id).clientHeight;
    }

    window.onresize = function(){
        if(document.getElementById(head_id)){
            IntroHeight = document.getElementById(head_id).clientHeight;
        }
    }

    let tabHeight = `calc(100vh - 50px - ${IntroHeight}px - 47px)` ;     //最上面菜单的高度+信息的高度+tab的高度

    return(
        <NewModal {...NewModalProps}>
            <div className={styles.detail_message} id = { head_id }>
                <div className={styles.detail_message_top}>
                    <div className={styles.detail_message_top_left}>
                        <img src='https://img.ishanshan.com/gimg/img/abde58fd2dc31461271d3bf6f3ee3259' className={styles.detail_message_img}/>
                        <div className={styles.detail_message_left}>
                            <Popover placement="left" trigger="hover" content = { detailBaseInfoData && detailBaseInfoData.title || '--' } >
                                { detailBaseInfoData && detailBaseInfoData.title || '--' }
                            </Popover>
                        </div>
                    </div>
                    <div className={styles.detail_message_top_right}>
                        {/*<Button type = 'primary' style = {{ marginRight : 20 , width : 68 }} onClick = { HeadOrgDetailModalEdit }>编辑</Button>*/}
                        <Icon type = "close" onClick = { DetailModalClose }/>
                    </div>
                </div>
                <div className={styles.detail_message_detail_message}>
                    { detailRender(MainTop,detailBaseInfoData) || [] }
                </div>
            </div>
            <Spin spinning = { workOrderDetailModalLoading }>
                <Tabs size = "small" defaultActiveKey = '1'>
                    <TabPane tab="基础信息" key="1" style = {{ height : tabHeight }} className = { styles.tab_item }>
                        <DetailTab data = { detailBaseInfoData } workOrderPriority = { workOrderPriority }/>
                    </TabPane>
                    <TabPane tab="服务记录" key="2" style = {{ height : tabHeight }} className = { styles.tab_item }>
                        <ServiceRecTab data = { detailServiceList }/>
                    </TabPane>
                </Tabs>
            </Spin>
        </NewModal>
    );
}

export default Main;
