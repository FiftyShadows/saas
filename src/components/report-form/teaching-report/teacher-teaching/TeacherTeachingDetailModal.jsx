import React from 'react';
import { Form, Input, Modal, Button, Upload, Icon, message, Select, Transfer, Spin , Popover } from 'antd';
import styles from './TeacherTeaching.less';

//模板1新增文章
const TeacherTeachingDetailModal = ({
    teachingDetailVisible,
    teachingDetailName,
    teachingDetailNameHeight,
    teachingDetailContent,
    teachingDetailSpining,
    teachingDetailModalCancel
  }) => {

    /*教学人次*/
    let sAttendAll = 0;     //上课总数
    let sMakeupAll = 0;     //补课总数
    let sAuditionAll = 0;   //试听总数
    let sAll = 0;           //总计

    /*授课节数*/
    let tAttendAll = 0;     //上课总数
    let tMakeupAll = 0;     //补课总数
    let tAuditionAll = 0;   //试听总数
    let tAll = 0;           //总计
    for(let i in teachingDetailContent){
        sAttendAll += parseFloat(teachingDetailContent[i].sAttend);
        sMakeupAll += parseFloat(teachingDetailContent[i].sMakeup);
        sAuditionAll += parseFloat(teachingDetailContent[i].sAudition);

        tAttendAll += parseFloat(teachingDetailContent[i].tAttend);
        tMakeupAll += parseFloat(teachingDetailContent[i].tMakeup);
        tAuditionAll += parseFloat(teachingDetailContent[i].tAudition);
    }

    sAll = sAttendAll+sMakeupAll+sAuditionAll;
    tAll = tAttendAll+tMakeupAll+tAuditionAll;

    let children = [];
    if( teachingDetailContent && teachingDetailContent.length > 0 ){
        children = teachingDetailContent.map((item,index) => {
            return (
                <div key={index}>
                    <div className={styles.detailStatus} style={{width : 180}}>
                        <Popover placement="top" content={item.title} trigger="hover">
                            {item.title}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.tAttend} trigger="hover">
                            {item.tAttend}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.tMakeup} trigger="hover">
                            {item.tMakeup}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.tAudition} trigger="hover">
                            {item.tAudition}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={parseFloat(item.tAttend)+parseFloat(item.tMakeup)+parseFloat(item.tAudition)} trigger="hover">
                            {parseFloat(item.tAttend)+parseFloat(item.tMakeup)+parseFloat(item.tAudition)}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.sAttend} trigger="hover">
                            {item.sAttend}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.sMakeup} trigger="hover">
                            {item.sMakeup}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={item.sAudition} trigger="hover">
                            {item.sAudition}
                        </Popover>
                    </div>
                    <div className={styles.detailStatus}>
                        <Popover placement="top" content={parseFloat(item.sAttend)+parseFloat(item.sMakeup)+parseFloat(item.sAudition)} trigger="hover">
                            {parseFloat(item.sAttend)+parseFloat(item.sMakeup)+parseFloat(item.sAudition)}
                        </Popover>
                    </div>
                </div>
            );
        });
    }else{
        return (
            <div></div>
        );
    }

    //模态框的属性
    let modalOpts = {
        title: '授课明细',
        maskClosable : false,
        visible : teachingDetailVisible,
        closable : true,
        width : 760,
        onCancel : teachingDetailModalCancel,
        footer : '',
        className : 'zj_teather_teaching__modal'
    };

    return (
        <div>
            <Modal {...modalOpts} style={{minWidth:'760px'}}>
                <Spin tip="Loading..." spinning={teachingDetailSpining}>
                    <div className={styles.allModal}>
                        <div className={styles.topTitle} style={{height:'100px',width:'120px',border:'1px solid #dddddd'}}>
                        </div>
                        <div className={styles.topTitle} style={{height:'100px',width:'180px',border:'1px solid #dddddd',borderLeft:'',lineHeight:'100px',backgroundColor:'#f5f5f5'}}>
                            课程名称
                        </div>
                        <div className={styles.topTitle} style={{height:'50px',width:'200px',border:'1px solid #dddddd',borderLeft:'',lineHeight:'50px',backgroundColor:'#f5f5f5'}}>
                            授课节数
                        </div>
                        <div className={styles.topTitle} style={{height:'50px',width:'200px',border:'1px solid #dddddd',borderLeft:'',lineHeight:'50px',backgroundColor:'#f5f5f5'}}>
                            教学人次
                        </div>
                        <div className={styles.detailStatus}>
                            上课
                        </div>
                        <div className={styles.detailStatus}>
                            补课
                        </div>
                        <div className={styles.detailStatus}>
                            试听
                        </div>
                        <div className={styles.detailStatus}>
                            合计
                        </div>
                        <div className={styles.detailStatus}>
                            上课
                        </div>
                        <div className={styles.detailStatus}>
                            补课
                        </div>
                        <div className={styles.detailStatus}>
                            试听
                        </div>
                        <div className={styles.detailStatus}>
                            合计
                        </div>
                        <div style={{float:'left',width:'120px',borderLeft:'1px solid #dddddd',borderRight:'1px solid #dddddd',borderBottom:'1px solid #dddddd',textAlign:'center',lineHeight:teachingDetailNameHeight,height:teachingDetailNameHeight,whiteSpace:'nowrap',overflow:'hidden',textOverflow:'ellipsis' }}>
                            <Popover placement="top" content={teachingDetailName} trigger="hover">
                                { teachingDetailName }
                            </Popover>
                        </div>

                        { children || [] }

                        <div style={{float:'left',height:'50px',width:'180px',borderBottom:'1px solid #dddddd',borderRight:'1px solid #cccccc',lineHeight:'50px',textAlign:'center',backgroundColor:'#fcdd4f'}}>
                            汇总
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={tAttendAll} trigger="hover">
                                {tAttendAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={tMakeupAll} trigger="hover">
                                {tMakeupAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={tAuditionAll} trigger="hover">
                                {tAuditionAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={tAll} trigger="hover">
                                {tAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={sAttendAll} trigger="hover">
                                {sAttendAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={sMakeupAll} trigger="hover">
                                {sMakeupAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f',borderRight:'1px solid #cccccc'}}>
                            <Popover placement="top" content={sAuditionAll} trigger="hover">
                                {sAuditionAll}
                            </Popover>
                        </div>
                        <div className={styles.detailStatus} style={{backgroundColor:'#fcdd4f'}}>
                            <Popover placement="top" content={sAll} trigger="hover">
                                {sAll}
                            </Popover>
                        </div>
                    </div>
                </Spin>
            </Modal>
        </div>
    );
};

export default TeacherTeachingDetailModal;
