import React from 'react';
import styles from './IndexLayoutComponent.less';
import { Layout, Menu, Icon, Tooltip, Dropdown, Popover } from 'antd';
const { Header, Sider, Content } = Layout;
import InitGuidePage from '../../../pages/common/init-guide/InitGuidePage';
import VersionInfo from '../../common/version-info/VersionInfo';

/*
 * 布局文件
 */
function IndexLayoutComponent({
    routes,
    children,
    applicationList,
    currentApplication,
    changeApplication,
    orgImg,                     //机构图片
    userMsg,                    //用户信息
    ChangePassWord,             //点击修改密码

	versionInfoVisible,
	versionInfo,
	changeVersionInfoVisible
  }) {
    let user_drap_menu = (
        <Menu theme = "dark" className={styles.user_drap_menu}>
            <Menu.Item key = 'update_password'>
                <a href = "javascript:void(0)" className={styles.top_user_drap_menu_text} onClick = { ChangePassWord }>修改密码</a>
            </Menu.Item>
            <Menu.Item key = 'logout'>
                <a href = { BASE_URL + '/logout' } target = "_self" className={styles.top_user_drap_menu_text}>注销</a>
            </Menu.Item>
        </Menu>
    );
    
    let connect_popover = (
	  	<div className={styles.connect_popover_cont}>
	  		<img className={styles.connect_popover_img} src='https://img.ishanshan.com/gimg/img/8ecc02e518214f49736de1fb4fe91fb5'/>
	  	</div>
	  );
	  
   	function qqTalk() {
	  	window.open('http://wpa.qq.com/msgrd?v=3&uin=3519232593&site=qq&menu=yes', '_blank', 'height=502, width=644,toolbar=no,scrollbars=no,menubar=no,status=no')
	  }

    return (
        <Layout className={styles.main_layout_cont}>
			<InitGuidePage />
            <Header className={styles.main_layout_header}>
                <div className={styles.main_layout_header_left}>
                    { !!orgImg ? <img src={ orgImg } className={styles.org_logo_img_cont}/> : null }
                </div>

                <div className={styles.main_layout_header_right}>
                
	                <div className={styles.main_layout_header_right_item}>
			            {!!false && <Icon type="phone" className={styles.btn_a_icon} />}
			            <div className={styles.btn_a_text} id="BDBridgeFixedWrap" title="在线客服"></div>
			          </div>
		          
		          <div className={styles.main_layout_header_right_item_split}></div>
                	
                	<div className={styles.main_layout_header_right_item}>
		            	<div className={styles.btn_a_text} id="qq_talk_warp" title="QQ在线">
			            	<img 
			            		alt="QQ在线咨询"
			            		src="https://img.ishanshan.com/gimg/img/54cd57420c9b544d280a38f38a0bb392"
			            		className={styles.qq_talk_warp_img} 
			            		onClick={qqTalk} />
						</div>
		          	</div>
		          
		          <div className={styles.main_layout_header_right_item_split}></div>

                    <Popover 
		        		key={'connect_popover'} 
		        		overlayClassName={styles.connect_popover} 
		        		content={connect_popover} 
		        		title={null} trigger="hover" placement="bottom">
			          <div className={styles.main_layout_header_right_item}>
			            <Icon type="question-circle" className={styles.btn_a_icon} />
			            <div className={styles.btn_a_text}>帮助中心</div>
			          </div>
		          </Popover>

                    <Dropdown overlay={user_drap_menu} >
                        <div className={styles.main_layout_header_right_item}>
                            {/*目前不显示用户头像，显示用户统一icon*/}
                            {/* !!userMsg.headImgUrl ? <img src={ userMsg.headImgUrl } className={styles.login_user_info_img} /> : null */}
                            <Icon type="user" className={styles.btn_a_icon}/>
                            <div className={styles.btn_a_text} style={{ textOverflow : 'ellipsis', whiteSpace : 'nowrap', maxWidth : '100px', display : 'block', overflow : 'hidden',
                            }}>
                                { userMsg.userName || '无姓名' }
                            </div>
                            <div className={styles.user_text_trigger}>
                                <Icon type="cas-right-bottom" className={styles.user_text_trigger_icon}/>
                            </div>
                        </div>
                    </Dropdown>
                </div>
            <div className={styles.header_show_split}></div>
        </Header>
        <Layout className={styles.content_layout_cont}>
            <Sider
                trigger={null}
                width='50'>
                <div className={styles.cas_layout_left_cont} >
                        {applicationList && applicationList.map(function(item, index) {
                            let isCurrentApp = item.appCode == currentApplication;
                            return (
                                <div className={styles.cas_layout_left_item_cont} key={'cas_layout_left_item_' + index}>
                                    <Tooltip placement="right" title={item.name} trigger="hover" overlayClassName = 'saas_layout_left_tooltip'>
										<div className={isCurrentApp ? styles.cas_layout_left_item_active : styles.cas_layout_left_item} key={'cas_layout_left_item_' + index}>
											<Icon type={item.icon} className={styles.cas_layout_left_item_icon} onClick={()=>changeApplication( item.url, item.appCode )}/>
										</div>
                                    </Tooltip>
                                </div>
                            )
                    })}
                        <div className={styles.cas_layout_left_bottom_split}></div>
                    </div>
                </Sider>
                <Content className={styles.main_layout_content}>
                    {children}
                </Content>
            </Layout>
			<VersionInfo visible = { versionInfoVisible } versionInfo = { versionInfo } changeVisible = { changeVersionInfoVisible } />
        </Layout>
    );
}

export default IndexLayoutComponent;
