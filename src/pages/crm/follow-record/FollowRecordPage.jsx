import React from 'react';
import QueueAnim from 'rc-queue-anim';
import moment from 'moment';
import { connect } from 'dva';
import { routerRedux } from 'dva/router';
import { Icon , Popover , message } from 'antd';
import { AlertModal } from '../../../components/common/new-component/NewComponent';
import FollowRecordSearch from '../../../components/crm/follow-record/FollowRecordSearch';
import FollowRecordContent from '../../../components/crm/follow-record/FollowRecordContent';
import FollowRecordCreate from './FollowRecordCreatePage';
import SuperSearch from '../../../components/common/new-component/super-search/SuperSearch';
import FollowRecordImportModal from '../../../components/crm/follow-record/follow-record-import-modal/FollowRecordImportModal';    //跟进记录导入

function FollowRecordPage({ dispatch, followRecordModel }){
    let {
		searchVisible,

		pageSize,
		pageIndex,
		dataSource,
		resultCount,

		selectedId,
		selectedItem,

		typeSelectList,

		source,

		/*方法*/
		reset,

		condition,
        startTime,   //开始时间
		endTime,   //结束时间

        //跟进记录导入modal
        followRecordImportOrgId,                        //跟进记录导入时选择校区ID
        followRecordImportModalVisible,                 //跟进记录导入modal是否显示
        followRecordImportModalButtonLoading,           //跟进记录导入按钮加载状态
        followRecordImportModalStep,                    //跟进记录导入进行的步数
        /*第一步*/
        followRecordImportFirstSuc,                     //第一步是否完成
        followRecordImportModalExcelName,               //合同导入上传文件名
        followRecordImportModalExcelId,                 //合同导入上传文件id
        followRecordImportIsModal,                      //导入的文件是否是模板
        /*第二步*/
        secondStepTableTitle,                           //第二步表头
        secondStepTableDataSourse,                      //第二步列表数据
        secondStepTableDataTotal,                       //第二步列表数据数量
        /*第三步*/
        thirdLastButtonDisplay,                         //第三步中上一步按钮是否显示(点击确定后消失)
        lastStepChooseItem,                             //第三步选中的选项

        //导入成功提示框
        followRecordImportSucAlertModalVisible,         //提示框是否显示
        followRecordImportSucModalWetherImportAll,      //是否全部上传完毕
        followRecordImportSucAlertModalId,              //导出错误日志的id
        followRecordImportSucAlertModalTitle,           //提示框标题
        followRecordImportSucAlertModalContent,         //提示框内容

    } = followRecordModel;

    //搜索
    function onSearch( values ){
		dispatch({
			type : 'followRecordModel/searchFunction',
			payload : {
				values
			}
		})
    };

    //清除条件
    function onClear(){
		dispatch({
			type : 'followRecordModel/searchFunction',
			payload : {
				values : {
					name : undefined,
					type : undefined,
				}
			}
		})
    };

    //改变pageSize
    function pageSizeChange( pageIndex, pageSize ){
		dispatch({
			type : 'followRecordModel/pagination',
			payload : {
				pageIndex,
				pageSize
			}
		})
    };

    //改变pageIndex
    function pageIndexChange( pageIndex ){
		dispatch({
			type : 'followRecordModel/pagination',
			payload : {
				pageIndex,
				pageSize
			}
		})
    };

	/*高级搜索点击事件*/
	function showSuperSearch(){
		dispatch({
			type : 'followRecordModel/updateState',
			payload : {
				searchVisible : !searchVisible
			}
		})
	}

	/*高级搜索*/
	function onSuperSearch( values, reset ){
		dispatch({
			type : 'followRecordModel/onSuperSearch',
			payload : {
				values
			}
		})
		dispatch({
			type : 'followRecordModel/updateState',
			payload : {
				reset : reset
			}
		})
	}

	/*高级搜索清除*/
	function onSuperClear(){
		dispatch({
			type : 'followRecordModel/onSuperSearch',
			payload : {
				values : {
					orgId : undefined,
					endTime : undefined,
					startIime : undefined,
				}
			}
		})
	}

	/*切换到leaders记录*/
	function clickToLeaders(){
		!!reset && reset();
		dispatch({
			type : 'followRecordModel/clickGetFollowRecordList',
			payload : {
				source : '2',
			}
		})
	}

	/*切换到学员记录*/
	function clickToStudent(){
		!!reset && reset();
		dispatch({
			type : 'followRecordModel/clickGetFollowRecordList',
			payload : {
				source : '1',
			}
		})
	}

	/*创建记录*/
	function createFollowRecord(){
		dispatch({
			type : 'followRecordCreateModel/openFollowRecordCreate',
			payload : {
				source,
				condition,
			}
		})
	}


	/*切换列表项*/
	function changeListItem( item ){
		dispatch({
			type : 'followRecordModel/updateState',
			payload : {
				selectedId : item.id,
				selectedItem : item
			}
		})
	}

	/*刷新列表*/
	function refreshList(){
		dispatch({
			type : 'followRecordModel/getFollowRecordListParams',
		})
	}

	/*更换所属人*/
	function subordinateChange( uids ){
		dispatch({
			type : 'followRecordModel/subordinateChange',
			payload : {
				uids
			}
		})
	}


    /*跟进记录导入*/
        /*点击跟进记录导入*/
        function ImportFollowRecordOpen(){
            dispatch({
                type:'followRecordModel/updateState',
                payload:{
                    followRecordImportModalVisible : true,
                    followRecordImportModalStep : 0,
                    followRecordImportFirstSuc : false,                //第一步是否完成
                    followRecordImportModalExcelId : '',               //导入上传文件id
                    followRecordImportIsModal : false,                 //导入的文件是否是模板
                }
            });
        }

        /*跟进记录导入modal关闭*/
        function FollowRecordImportModalClose(){
            dispatch({ type:'followRecordModel/clearUploadModal' });
        }

        /*点击modal内按钮*/
        function FollowRecordModalOperation(type){
            if(type == 'first_next'){
                if(followRecordImportIsModal){
                    //获取预览表格
                    dispatch({
                        type:'followRecordModel/FollowRecordImportPreview',
                        payload:{
                            id : followRecordImportModalExcelId,
                        }
                    });
                }else{
                    message.error('上传文件非模板文件，请重新上传');
                }
            }else if(type == 'second_prestep'){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        followRecordImportModalStep : 0
                    }
                });
            }else if(type == 'second_next'){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        followRecordImportModalStep : 2
                    }
                });
            }else if(type == 'last_prestep'){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        followRecordImportModalStep : 1
                    }
                });
            }else if(type == 'finish'){
                dispatch({
                    type:'followRecordModel/FollowRecordImportSubmit',
                    payload:{
                        id : followRecordImportModalExcelId,
                    }
                });
            }
        }

         /*第一步*/
            //点击下载数据模板
            function FirstStepDownLoadDataModal(){
                window.open(`${BASE_URL}/download/downloadStuInfoModel?type=3`);
            }

            //选择校区onChange事件
            function FirstStepOrgOnChange(orgId){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        followRecordImportOrgId : orgId
                    }
                });
            }

            //选择文件onChange事件
            function FirstStepUploadOnChange(info){
                if(!followRecordImportOrgId && followRecordImportOrgId != 0) {
                    return message.warn('请选择校区');
                }

                if(info.file.status != 'uploading' && info.file.response && info.file.response.errorCode != 9000) {
                    return message.error(info.file.response.errorMessage || '上传失败');
                }

                if(info.file.status == 'done') {
                    message.success(`上传成功,正在检测文件类型`);
                    /*检查是不是模板文件*/
                    dispatch({
                        type:'followRecordModel/CheckWetherModalFile',
                        payload:{
                            id : info&&info.fileList.length > 0 && info.fileList[info.fileList.length - 1].response.id || undefined,
                            name : info.file.name,
                        }
                    });
                }else if(info.file.status === 'error') {
                    message.error(`上传失败`);
                }
            }

        /*第三步*/
            //第三步单选框onChange事件
            function LastStepRadioOnChange(e){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        lastStepChooseItem : e.target.value
                    }
                });
            }

        //提示框点击确认/下载错误日志
        function FollowRecordImportSucAlertModalOnOk(){
            if(!!followRecordImportSucModalWetherImportAll){
                dispatch({
                    type:'followRecordModel/updateState',
                    payload:{
                        followRecordImportSucAlertModalVisible : false
                    }
                });
            }else{
                window.open(`${BASE_URL}/record/download/downloadByFileSys?id=${followRecordImportSucAlertModalId}`);
            }
        }

        //提示框点击关闭
        function FollowRecordImportSucAlertModalOnCancel(){
            dispatch({
                type:'followRecordModel/updateState',
                payload:{
                    followRecordImportSucAlertModalVisible : false
                }
            });
        }



    let FollowRecordSearchProps = {
		searchVisible,                //高级搜索是否显示
		source,
		typeSelectList,

        clickToLeaders,
		clickToStudent,
		createFollowRecord,
		showSuperSearch,
		onSearch,
		onClear,

		subordinateChange,

		condition,

        ImportFollowRecordOpen,        //点击导入跟进
    };

	/*编辑跟进记录*/
	function updateFollowRecord( item ){
		dispatch({
			type : 'followRecordCreateModel/openFollowRecordCreate',
			payload : {
				id    : item.id,
				orgId : item.orgId,
				stuId : item.stuId,
				source,
				condition
			}
		})
	}

	/*删除跟进记录*/
	function deleteFollowRecord( item ){
		dispatch({
			type : 'followRecordModel/deleteFollowRecord',
			payload : {
				id : item.id
			}
		})
	}

	let superSearchProps = {
		searchVisible  : searchVisible,
		closeSearch    : showSuperSearch,
		onSearch       : onSuperSearch,
		onClear        : onSuperClear,
		fields        : [
			{
				key     : 'orgId',
				type    : condition == 'all' && 'orgSelect',
				label   : '所属校区',
				options : {
					width : 280,
					getPopupContainer : () => document.getElementById( 'super_search_wrap' )
				}
			},{
				key     : 'time',
				type    : 'rangePicker',
				label   : '跟进时间',
				startPlaceholder : '开始时间' ,
				endPlaceholder : '结束时间',
                initialValue : [ startTime != undefined ? moment(startTime,'YYYY-MM-DD HH:mm') : undefined, endTime != undefined ? moment(endTime,'YYYY-MM-DD HH:mm') : undefined ],
			}
		]
	}

	let followRecordContentProp = {
		dataSource,
		pageSize,
		pageIndex,
		resultCount,

		selectedId,
		selectedItem,

		pageSizeChange,
		pageIndexChange,
		changeListItem,

		updateFollowRecord,
		deleteFollowRecord
	}

	let followRecordCreateProps = {
		refreshList
	}

    //导入属性
    let FollowRecordImportModalProps = {
        followRecordImportOrgId,                    //批量导入时选择校区ID
        followRecordImportModalVisible,             //合同导入modal是否显示
        followRecordImportModalButtonLoading,       //合同导入按钮加载状态
        followRecordImportModalStep,                //合同导入进行的步数

        FollowRecordModalOperation,                 //点击modal内按钮
        FollowRecordImportModalClose,               //合同导入modal关闭

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
    }

    //提示框属性
    let AlertModalProps = {
        visible : followRecordImportSucAlertModalVisible,                      //提示框是否显示
        title : followRecordImportSucAlertModalTitle,                          //提示框标题
        content : followRecordImportSucAlertModalContent,                      //提示框内容
        onOk : FollowRecordImportSucAlertModalOnOk,                            //提示框点击下载
        onCancel : FollowRecordImportSucAlertModalOnCancel,                    //提示框点击取消
        footerEnsure : followRecordImportSucModalWetherImportAll ? '确定' : '下载错误日志',
        footerCancel : '关闭'
    }

    return (
        <div style = {{ height : '100%', overflowX : 'hidden' }}>
            <FollowRecordSearch { ...FollowRecordSearchProps } />
			<FollowRecordContent { ...followRecordContentProp } />
			<FollowRecordCreate { ...followRecordCreateProps } />
			<SuperSearch { ...superSearchProps } />
            { !!followRecordImportModalVisible ? <FollowRecordImportModal {...FollowRecordImportModalProps}/> : null }
            { !!followRecordImportSucAlertModalVisible ? <AlertModal {...AlertModalProps}/> : null }
        </div>
    )
};

function mapStateToProps ({ followRecordModel }){
	return { followRecordModel };
};

export default connect( mapStateToProps )( FollowRecordPage );
