import React from 'react';
import { Modal, Input, Form, Button, Icon, Spin } from 'antd';
import styles from './CheckSameNameModal.less';
const FormItem = Form.Item;

const formItemLayout = {
    labelCol: {
        span: 5,
    },
    wrapperCol: {
        span: 17,
    },
};

/*添加leads时查重*/
const CheckSameNameModal = ({
    checkSameNameModalLoading,          //查重列表加载状态
    checkSameNameModalVisible,          //modal是否显示
    checkSameNameInitName,              //查重时在表单中输入的名字
    checkSameNameModalContent,          //查重列表信息

    CheckSameNameModalInputOnchange,    //名单查重modal的input的onChange事件
    CheckSameNameModalSubmit,           //名单查重modal点击搜索
    CheckSameNameModalClose,            //名单查重modal关闭方法
    form: {
        getFieldDecorator,
        validateFields,
        getFieldsValue,
        resetFields,
        getFieldValue,
        validateFieldsAndScroll,
    },
  }) => {

    //模态框的属性
    let modalOpts = {
        title: '名单查重',
        maskClosable : false,
        visible : checkSameNameModalVisible,
        closable : true,
        width : 550,
        onCancel : handleCancel,
        footer : [
            <Button key="cancel" type="primary" onClick={handleCancel}>我知道了</Button>,
        ],
        className : 'CheckSameNameModal'
    };

    //渲染查重信息
    let stu = [];
    if(checkSameNameModalContent && checkSameNameModalContent.length > 0){
        stu = checkSameNameModalContent.map((item,index) => {
            return(
                <div className={styles.content} key = { index }>
                    <div>{ item.name }</div>
                    <div>{ item.createTime }</div>
                    <div>{ item.sellerName }</div>
                </div>
            );
        })
    }

    function handleCancel(e) {
        e.preventDefault();
        resetFields();
        CheckSameNameModalClose();
    }

    return (
        <Modal {...modalOpts}>
            <div className={styles.query}>
                <Input placeholder = '请输入学员姓名' style={{ marginRight : 10 }} defaultValue = { checkSameNameInitName } onChange = { CheckSameNameModalInputOnchange }/>
                <Button type = 'primary' onClick = { CheckSameNameModalSubmit }><Icon type='search'/></Button>
            </div>

            { checkSameNameModalContent && checkSameNameModalContent.length > 0 ?
                <div>
                    <div className={styles.th}>
                        <div>名单姓名</div>
                        <div>创建时间</div>
                        <div>负责销售</div>
                    </div>
                    <div className={styles.line}/>
                    <div className={styles.td}>
                        <Spin spinning = { checkSameNameModalLoading }>
                            { stu || [] }
                        </Spin>
                    </div>
                </div>
                :
                <div className={styles.null}>
                    <img src='https://img.ishanshan.com/gimg/img/0f4b3e548fb0edce54c578866babc7af'/>
                    <span>没有发现重复的姓名</span>
                </div>
            }
        </Modal>
    );
};

export default Form.create()(CheckSameNameModal);
