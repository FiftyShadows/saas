import React from 'react';
import { Modal, Form, Input, Button, Select, Radio, Spin, message, DatePicker, Steps, Tabs, Upload } from 'antd';
import FirstStep from './FirstStep/FirstStep';          //第一步
import SecondStep from './SecondStep/SecondStep';       //第二步
import ThirdStep from './ThirdStep/ThirdStep';          //第三步
import QueueAnim from 'rc-queue-anim';
import styles from './FollowRecordImportModal.less';
const FormItem = Form.Item;
const Option = Select.Option;
const RadioGroup = Radio.Group;
const Step = Steps.Step;
const TabPane = Tabs.TabPane;

/*跟进记录导入*/
const FollowRecordImportModal = ({
    followRecordImportOrgId,                    //批量导入时选择校区ID
    followRecordImportModalVisible,             //跟进记录导入modal是否显示
    followRecordImportModalButtonLoading,       //跟进记录导入按钮加载状态
    followRecordImportModalStep,                //跟进记录导入进行的步数

    FollowRecordModalOperation,                 //点击modal内按钮
    FollowRecordImportModalClose,               //跟进记录导入modal关闭

    /*第一步*/
    followRecordImportFirstSuc,                 //第一步是否完成
    followRecordImportModalExcelName,           //合同导入上传文件名
    FirstStepOrgOnChange,                       //选择校区onChange事件
    FirstStepUploadOnChange,                    //选择文件onChange事件
    FirstStepDownLoadDataModal,                 //点击下载数据模板

    /*第二步*/
    secondStepTableTitle,                       //第二步表头
    secondStepTableDataSourse,                  //第二步列表数据
    secondStepTableDataTotal,                   //第二步列表数据数量

    /*第三步*/
    thirdLastButtonDisplay,                     //第三步中上一步按钮是否显示(点击确定后消失)
    LastStepRadioOnChange,                      //第三步单选框onChange事件

  }) => {

    let footer = [];
    if(followRecordImportModalStep == '0'){
        footer = [
            <Button key="submit" type="primary"
                        disabled = { !followRecordImportFirstSuc }
                        loading = { followRecordImportModalButtonLoading }
                        onClick = {() => FollowRecordModalOperation('first_next')}
                        style = {{ marginLeft : 10 }}>下一步</Button>
        ];
    }else if(followRecordImportModalStep == '1'){
        footer = [
            <Button key="cancel" type="ghost" onClick={() => FollowRecordModalOperation('second_prestep')}>上一步</Button>,
            <Button key="submit" type="primary"
                    onClick = {() => FollowRecordModalOperation('second_next')}
                    disabled = { followRecordImportModalButtonLoading}
                    loading = { followRecordImportModalButtonLoading}
                    style = {{ marginLeft : 10 }}>下一步</Button>
        ];
    }else if(followRecordImportModalStep == '2'){
        footer = [
            <Button key="cancel" type="ghost" onClick={() => FollowRecordModalOperation('last_prestep')} style = {{ display : thirdLastButtonDisplay }}>上一步</Button>,
            <Button key="submit" type="primary"
                    onClick = {() => FollowRecordModalOperation('finish')}
                    disabled = { followRecordImportModalButtonLoading }
                    loading = { followRecordImportModalButtonLoading }
                    style = {{ marginLeft : 10 }}>确认</Button>
        ];
    }

    //模态框的属性
    let modalOpts = {
        title: '跟进记录批量导入',
        maskClosable : false,
        visible : followRecordImportModalVisible,
        closable : true,
        width : 1000,
        onCancel : handleCancel,
        className : 'follow_record_import_modal',
        footer : footer,
    };

    function handleComplete(e){
        e.preventDefault();
    }

    function handleCancel(e) {
        e.preventDefault();
        FollowRecordImportModalClose();
    }


    //第一步属性
    let firstStepProps = {
        followRecordImportOrgId,                    //批量导入时选择校区ID
        followRecordImportModalExcelName,           //合同导入上传文件名

        FirstStepOrgOnChange,                       //选择校区onChange事件
        FirstStepUploadOnChange,                    //选择文件onChange事件
        FirstStepDownLoadDataModal,                 //点击下载数据模板
    }

    //第二步属性
    let SecondStepProps = {
        secondStepTableTitle,                       //第二步表头
        secondStepTableDataSourse,                  //第二步列表数据
        secondStepTableDataTotal,                   //第二步列表数据数量
    }

    //第三步属性
    let ThirdStepProps = {
        followRecordImportModalButtonLoading,       //合同导入按钮加载状态
        LastStepRadioOnChange,                      //第三步单选框onChange事件
    }

    return (
        <Modal {...modalOpts}>
            <div className={styles.steps}>
                <Steps current = { followRecordImportModalStep }>
                    <Step title="上传文件" />
                    <Step title="预览表格" />
                    <Step title="导入数据" />
                </Steps>
                <Tabs defaultActiveKey='0' activeKey={ followRecordImportModalStep + '' }  size="small">
					<TabPane tab="" key='0'>{ followRecordImportModalStep == '0' ? <FirstStep {...firstStepProps}/> : null }</TabPane>
					<TabPane tab="" key='1'>{ followRecordImportModalStep == '1' ? <SecondStep {...SecondStepProps}/> : null }</TabPane>
					<TabPane tab="" key='2'>{ followRecordImportModalStep == '2' ? <ThirdStep {...ThirdStepProps}/> : null }</TabPane>
				</Tabs>
            </div>
        </Modal>
    );
};

export default FollowRecordImportModal;
