import React from 'react';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import IndexLayoutComponent from '../../../components/layout/index-layout/IndexLayoutComponent';
import PassWordChangeForm from '../../../components/common/header-login-user-info/PassWordChangeForm';

function IndexLayoutPage({dispatch, location, children, routes, indexMainLayoutModel}) {

    let {
        applicationList,
        currentApplication,
        orgImg,                     //机构图片
        userMsg,                    //用户信息

        /*修改密码modal*/
        passWordChangeModalVisible,             //修改密码modal是否显示
        passWordChangeModalButtonLoading,       //修改密码modal按钮加载状态


		//版本更新 参数
		versionInfoVisible,
		versionInfo

    } = indexMainLayoutModel;


	//点击版本更新上的关闭按钮
	function changeVersionInfoVisible() {
        dispatch({
            type: 'indexMainLayoutModel/closeVersionInfoVisible',
        });
    }

    function changeApplication( url, appCode ) {
		if( appCode == 'zsb' ){
			dispatch({
				type: 'indexMainLayoutModel/updateState',
				payload: {
					currentApplication : appCode
				}
			});
			window.location = url;
		}else if( appCode == "koubei" ){
			window.open( url );
		}
    }

    /*修改密码点击事件弹出表单*/
    function ChangePassWord(){
        dispatch({
            type:'indexMainLayoutModel/updateState',
            payload:{
                passWordChangeModalVisible : true
            }
        });
    }

    /*密码重置提交*/
    function PassWordChangeModalSubmit(data){
        dispatch({
            type:'indexMainLayoutModel/ChangePassWord',
            payload:{
                ...data
            }
        });
    }

    /*密码重置modal关闭*/
    function PassWordChangeModalCancel(){
        dispatch({
            type:'indexMainLayoutModel/updateState',
            payload:{
                passWordChangeModalVisible : false,
                passWordChangeModalButtonLoading : false,
            }
        });
    }

    let componentProps = {
        children,
        routes,
        applicationList,
        currentApplication,
        changeApplication,
        orgImg,                     //机构图片
        userMsg,                    //用户信息
        ChangePassWord,             //点击修改密码

		versionInfoVisible,
		versionInfo,
		changeVersionInfoVisible
    };

    /*修改密码表单属性*/
    let passWordChangeFormProps = {
        passWordChangeModalVisible,             //修改密码modal是否显示
        passWordChangeModalButtonLoading,       //修改密码modal按钮加载状态

        PassWordChangeModalSubmit,              //密码重置提交
        PassWordChangeModalCancel,              //密码重置modal关闭
    };

    return (
        <div style = {{ height : '100%' , width : '100%' }}>
            <IndexLayoutComponent {...componentProps} />
            { passWordChangeModalVisible == true ? <PassWordChangeForm {...passWordChangeFormProps} /> : null }
        </div>
    );
}

function mapStateToProps({indexMainLayoutModel}) {
  return {indexMainLayoutModel};
}

export default connect(mapStateToProps)(IndexLayoutPage);
