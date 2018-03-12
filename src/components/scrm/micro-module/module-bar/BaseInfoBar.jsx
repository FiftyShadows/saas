import React from 'react';
import styles from './ModuleBarComponent.less';
import {Button,Form,Input,Upload,Icon,message,} from 'antd';

const FormItem = Form.Item;

/**
 * 自定义模板-基本属性表单
 * 表单组件
 */
function BaseInfoBar ({
    formData, resetModuleMusic, moduleMusicInit,
    form: {
        getFieldDecorator,
        getFieldValue,
        setFieldsValue,
        validateFields,
        resetFields,
        getFieldError,
        setFields,
        validateFieldsAndScroll,
    }
}) {
    //模板音乐还原默认
    function handleResetModuleMusic() {
        resetFields(['musicList']);
        resetModuleMusic && resetModuleMusic();
    }

    function normFile(e) {
        let fileList = [];
        if (Array.isArray(e)) {
            fileList = e;
        } else {
            fileList = e && e.fileList;
        }

        fileList && fileList.length > 0 && fileList.map(function(item, index) {

            if(item.response && (item.response.errorCode == 9000) && item.response.data && item.response.data.url) {
                item.url = item.response.data.url;
                item.name = item.response.data.fileName;
                item.status = 'done';
                message.success('上传成功!');
            } else if(item.response && item.response.errorCode == 5000){

                setFields({
                    musicList: {
                        value: [],
                        errors: [new Error((item.response && item.response.errorMessage) || '文件上传失败!')],
                    }
                });
                fileList = [];
            }
        });

        return fileList;
    }

    /*校验图片*/
    function beforeUpload(file) {
		if(file.size > 5242880) {
			message.error('文件大小不能超过5M');
			return false;
		}
		return true;
    }

    let formItemLayout = {
        labelCol: { span: 5 },
        wrapperCol: { span: 18 },
    };

    let info_input_style = {
        width: '100%',
        float: 'inherit',
        marginTop: 'auto',
        marginRight: 'auto'
    };

    let uploadMusicProps = {
        action: BASE_URL+'/fileUpload/mp3',
        beforeUpload : beforeUpload,
        accept: 'audio/*',
        withCredentials: true,//上传请求时是否携带 cookie
    };

    let _init_music_list = [];
    if(moduleMusicInit && moduleMusicInit.url && moduleMusicInit.url.length > 0) {
        _init_music_list.push({
            uid: -1,
            name: moduleMusicInit.name,
            status: 'done',
            url: moduleMusicInit.url,
        });
    }

    return (
        <div className={styles.bar_info_cont}>

            <FormItem
              {...formItemLayout}
              label='选择校区'
             >
                 {getFieldDecorator('orgName', {
                    initialValue: formData && formData.orgName
                  })(
                    <Input placeholder="当前选择的校区" style={info_input_style} disabled />
                  )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label={formData.moduleType == 'leaflet' ? '传单名称' : '活动名称'}
             >
                 {getFieldDecorator('name', {
                    initialValue: formData && formData.moduleName,
                    rules: [{ required: true, message: '请输入名称!' }],
                  })(
                    <Input placeholder="请输入名称" style={info_input_style} />
                  )}
            </FormItem>

            <FormItem
              {...formItemLayout}
              label='背景音乐'
              help={(
                <div style={{marginTop: '3px'}}>
                    <p>微模板的背景音乐 文件大小≤5M</p>
                    <span className={styles.form_validate_msg}>{(getFieldError('musicList') || []).join(', ')}</span>
                    <Button type="ghost" className={styles.upload_reset_btn} onClick={()=>handleResetModuleMusic()}>还原默认</Button>
                </div>
               )}
             >
                 {getFieldDecorator('musicList', {
                    initialValue: _init_music_list,
                    valuePropName: 'fileList',
                    getValueFromEvent: normFile,
                  })(
                     <Upload {...uploadMusicProps} >
                     {(getFieldValue('musicList') && getFieldValue('musicList').length > 0) ?
                        null
                        :
                        <Button icon='plus' >选择音乐</Button>
                     }
                    </Upload>
                  )}
            </FormItem>


        </div>
    );
}

export default BaseInfoBar;
