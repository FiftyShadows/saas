import {
	getFollowRecordList,
	getSelectList,            //获取类型下拉列表
	deleteFollowRecord,

    CheckWetherModalFile,               //导入文件时查看是不是模版文件
    FollowRecordImportPreview,          //获取预览表格
    FollowRecordImportSubmit,           //批量导入合同提交
    PollingCheckImport                  //轮询查看合同是否导入完毕
} from '../../../../services/crm/follow-record/followRecordService';
import React from 'react';
import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace : 'followRecordModel',

    state : {
		searchVisible            : false,         //高级搜索是否显示
		pageSize                 : 20,
		pageIndex                : 0,
		dataSource               : [],
		resultCount              : 0,

		selectedId               : undefined,    //所选择的列表项
		selectedItem             : {},           //列表项内容

		typeSelectList           : [],

		/*搜索条件*/
		name                     : undefined,
		type                     : undefined,   //跟进方式
        sellerName               : undefined,   //销售姓名
		startTime                : undefined,   //开始时间
		endTime                  : undefined,   //结束时间
		uids                     : undefined,   //跟进人
		orgId                    : undefined,   //所属校区

		source                   : '2',         //来源
		condition                : undefined,   //所有数据



		reset                    : undefined,   //切换tab是清空高级搜索

        //合同批量导入modal
        followRecordImportOrgId : '',                       //批量导入时选择校区ID
        followRecordImportModalVisible : false,             //leads导入modal是否显示
        followRecordImportModalButtonLoading : false,       //leads导入按钮加载状态
        followRecordImportModalStep : 0,                    //leads导入进行的步数
        /*第一步*/
        followRecordImportFirstSuc : false,                 //第一步是否完成
        followRecordImportModalExcelName : '请上传文件',      //leads导入上传文件名
        followRecordImportModalExcelId : '',                //leads导入上传文件id
        followRecordImportIsModal : false,                  //导入的文件是否是模板
        /*第二步*/
        secondStepTableTitle : [],                          //第二步表头
        secondStepTableDataSourse : [],                     //第二步列表数据
        secondStepTableDataTotal : [],                      //第二步列表数据数量
        /*第三步*/
        thirdLastButtonDisplay : 'inline-block',            //第三步中上一步按钮是否显示(点击确定后消失)
        lastStepChooseItem : undefined,                     //第三步选中的选项

        //导入成功提示框
        followRecordImportSucAlertModalVisible : false,     //提示框是否显示
        followRecordImportSucModalWetherImportAll : false,  //是否全部上传完毕
        followRecordImportSucAlertModalId : undefined,      //导出错误日志的id
        followRecordImportSucAlertModalTitle : '',          //提示框标题
        followRecordImportSucAlertModalContent : '',        //提示框内容
    },

    subscriptions : {
        setup({ dispatch, history }){
            history.listen( ({ pathname, query }) => {
                if( pathname === '/crm_follow_mine' ){
					let params = {
						pageSize  : 20,
						pageIndex : 0,

						uids      : undefined,
						name      : undefined,
                        sellerName : undefined,
						type      : undefined,

						startTime : undefined,
						endTime   : undefined,
						orgId     : undefined,

						condition : undefined,
						source    : '2',
					}
                    if(query.jump){
                        delete query.jump;
                        let params = query;
                        dispatch({
                            type : 'getFollowRecordList',
                            payload:{
                                params
                            }
                        })
                    }else{
                        dispatch({
                            type    : 'getFollowRecordList',
                            payload : {
                                params
                            }
                        });
                    }
					dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType : '跟进',
                            followRecordImportOrgId : (window._init_data.firstOrg).key,
                        }
                    });
					dispatch({
						type : 'getSelectList',
					})
				}else if( pathname == '/crm_follow_all' ){
					let params = {
						pageSize  : 20,
						pageIndex : 0,

						uids      : undefined,
						name      : undefined,
                        sellerName : undefined,
						type      : undefined,

						startTime : undefined,
						endTime   : undefined,
						orgId     : undefined,

						condition : 'all',
						source    : '2',
					}
					dispatch({
						type : 'getFollowRecordList',
						payload : {
							params
						}
					})
					dispatch({
						type : 'getSelectList',
						payload : {}
					})
                    dispatch({
                        type : 'updateState',
                        payload : {
                            followRecordImportOrgId : (window._init_data.firstOrg).key,
                        }
                    })
				}
			})
        }
    },

    effects : {
		/*得到跟进方式下拉列表*/
		*getSelectList({ payload },{ call, put, select }){
			let { ret } = yield call( getSelectList, ({ dictkey : 'studentFollowWay' }));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						typeSelectList : ret.list
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取跟进类型失败' );
			}
		},

		/*得到跟进列表所需参数*/
		*getFollowRecordListParams({ payload },{ call, put, select }){
			let condition = undefined;
			if( !!payload ){
				condition = payload.condition;
			}
			let state = yield select( state => state.followRecordModel );
			let params = {

				pageSize  : state.pageSize,
				pageIndex : 0,

				source    : state.source,
				condition : condition || state.condition,
				startTime : state.startTime,
				endTime   : state.endTime,
				uids      : state.uids,
				orgId     : state.orgId,
				name      : state.name,
                sellerName : state.sellerName,
				type      : state.type

			}
			yield put({
				type : 'getFollowRecordList',
				payload : {
					params
				}
			})
		},

		/*得到跟进列表*/
		*getFollowRecordList({ payload },{ call, put, select }){
			let { params } = payload;
			let { ret } = yield call( getFollowRecordList, ( params ));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'updateState',
					payload : {
						dataSource : ret.results,
						resultCount : ret.data.resultCount,
						selectedId  : !!ret.results && !!ret.results[0] && ret.results[0].id,
						selectedItem : !!ret.results && ret.results[0],
						...params
					}
				})
			}else{
				message.error( ret && ret.errorMessage || '获取列表失败' )
			}
		},

		/*切换crm leads*/
		*clickGetFollowRecordList({ payload },{ call, put, select }){
			let state = yield select( state => state.followRecordModel );
			let { source } = payload;
			let params = {
				pageIndex : 0,
				pageSize  : state.pageSize,
				source    : source,
				condition : state.condition,
				startTime : undefined,
				endTime   : undefined,
				uids      : state.uids,
				orgId     : undefined,
				name      : undefined,
                sellerName : undefined,
				type      : undefined,
			}
			yield put({
				type : 'getFollowRecordList',
				payload : {
					params
				}
			})
		},

		/*搜索*/
		*searchFunction({ payload },{ call, put, select }){
			let state = yield select( state => state.followRecordModel );
			let { values } = payload;
			let params = {
				pageSize  : state.pageSize,
				pageIndex : 0,
				source    : state.source,
				startTime : state.startTime,
				endTime   : state.endTime,
				uids      : state.uids,
				orgId     : state.orgId,
				condition : state.condition,
				...values
			}
			yield put({
				type : 'getFollowRecordList',
				payload : {
					params
				}
			})
		},

		/*高级搜索*/
		*onSuperSearch({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.followRecordModel );
			let startTime = undefined;
			let endTime = undefined;
			if( !!values.time && values.time.length > 0 ){
				startTime = !!values.time[0] && values.time[0].format('YYYY-MM-DD HH-mm-ss') || undefined;
				endTime   = !!values.time[1] && values.time[1].format('YYYY-MM-DD HH-mm-ss') || undefined;
			}
			let params = {
				pageSize  : state.pageSize,
				source    : state.source,
				uids      : state.uids,
				orgId     : values.orgId || undefined,
				name      : state.name,
                sellerName : state.sellerName,
				type      : state.type,
				condition : state.condition,
				pageIndex : 0,
				startTime,
				endTime,
			}
			yield put({
				type : 'getFollowRecordList',
				payload : {
					params
				}
			})
		},

		/*表格搜索*/
		*subordinateChange({ payload },{ call, put, select }){
            let { uids } = payload;
            let state = yield select( state => state.followRecordModel );
            let params = {
                uids       : uids,
                pageIndex  : 0,
                pageSize   : state.pageSize,
				condition  : state.condition,
                name       : state.name,
                sellerName : state.sellerName,
                type       : state.type,
				orgId      : state.orgId,
                startTime  : state.startTime,
                endTime	   : state.endTime,
				source     : state.source
            };
            yield put({
                type : 'getFollowRecordList',
                payload : {
                    params
                }
            })
		},

		/*跟进列表分页*/
		*pagination({ payload },{ call, put, select }){
			let state = yield select( state => state.followRecordModel );
			let params = {
				pageSize  : payload.pageSize,
				pageIndex : payload.pageIndex - 1,
				condition : state.condition,
				source    : state.source,
				name      : state.name,
                sellerName : state.sellerName,
				type      : state.type,
				startTime : state.startTime,
				endTime   : state.endTime,
				uids      : state.uids,
				orgId     : state.orgId,
			}
			yield put({
				type : 'getFollowRecordList',
				payload : {
					params
				}
			})
		},

		/*删除跟进记录*/
		*deleteFollowRecord({ payload },{ call, put, select }){
			let { id } = payload;
			let { ret } = yield call( deleteFollowRecord, ({ id : id }));
			if( ret && ret.errorCode == 9000 ){
				yield put({
					type : 'getFollowRecordListParams'
				})
			}
		},

        /*跟进记录导入*/
        //查看是不是模板文件
        *'CheckWetherModalFile'({ payload },{ call, put, select }){
            let name = payload.name;
            delete payload.name;
            let { ret } = yield call(CheckWetherModalFile,parse(payload));
            if(ret && ret.errorCode === 9000){
                if(ret.flag){
                    message.success('检测成功，该文件为模版文件');
                    yield put({
                        type:'updateState',
                        payload:{
                            followRecordImportFirstSuc : true,
                            followRecordImportIsModal : ret.flag,
                            followRecordImportModalExcelId : payload.id,               //跟进记导入上传文件id
                            followRecordImportModalExcelName : name,
                        }
                    });
                }else{
                    message.error('上传文件非模板文件，请重新上传');
                }
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('文件检测失败');
            }
        },

        //获取预览表格
        *'FollowRecordImportPreview'({ payload },{ call, put, select }){
            yield put({ type:'showImportModalButtonLoading' });
            let { ret } = yield call(FollowRecordImportPreview,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        followRecordImportModalStep : 1,
                        secondStepTableTitle : ret.dataModelFields,
                        secondStepTableDataSourse : ret.results,             //第三步列表数据
                        secondStepTableDataTotal : ret.results.length,       //第三步列表数据数量
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取预览信息失败');
            }
            yield put({ type:'closeImportModalButtonLoading' });
        },

        *'FollowRecordImportSubmit'({ payload },{ call, put, select }){
            yield put({ type:'showImportModalButtonLoading' });
            yield put({ type:'closeThirdButtonDisplay' });
            let { ret } = yield call(FollowRecordImportSubmit,parse(payload));
            if(ret && ret.errorCode === 9000){
                let sleep = function(ms) {
                    return new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve()
                        }, ms);
                    });
                }
                yield sleep(5000);
                yield put({
                    type:'PollingCheckImport',
                    payload:{
                        orgId : ret.data.orgId,
                        logFileId : ret.data.logFileId
                    }
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('批量导入失败');
                yield put({ type:'clearUploadModal' });
                yield put({ type:'closeImportModalButtonLoading' });
            }
        },

        //轮询查看合同是否导入完毕
        *'PollingCheckImport'({ payload },{ call, put, select }){
            yield put({ type:'showImportModalButtonLoading' });
            yield put({ type:'closeThirdButtonDisplay' });
            let { ret } = yield call(PollingCheckImport,parse(payload));
            if(ret && ret.errorCode === 9000){
                let sleep = function(ms) {
                    return new Promise(function(resolve, reject){
                        setTimeout(function(){
                            resolve()
                        }, ms);
                    });
                }
                if (!ret.data.complete) {
                    yield sleep(5000);
                    yield put({
                        type:'PollingCheckImport',
                        payload:{
                            orgId : payload.orgId,
                            logFileId : payload.logFileId
                        }
                    })
                }else{
                    yield put({ type:'clearUploadModal' })
                    yield put({
                        type:'updateState',
                        payload:{
                            //导入成功提示框
                            followRecordImportSucAlertModalVisible : true,                  //提示框是否显示
                            followRecordImportSucAlertModalId : ret.data.logFileId,         //导出错误日志的id
                            followRecordImportSucAlertModalTitle : '导入完成',                //提示框标题
                            followRecordImportSucAlertModalContent : (
                                <div>
                                    <div>成功{ ret.data.sucNum }条</div>
                                    <div>失败{ ret.data.failNum }条</div>
                                </div>
                            ),                       //提示框内容
                        }
                    });
                    if(ret.data.failNum != '0'){        //导入有失败，未完全导入，提醒下载错误日志
                        yield put({
                            type:'updateState',
                            payload:{
                                followRecordImportSucModalWetherImportAll : false
                            }
                        });
                    }else{
                        yield put({                     //导入无失败
                            type:'updateState',
                            payload:{
                                followRecordImportSucModalWetherImportAll : true
                            }
                        });
                    }
                    yield put({ type:'closeContractOrderImportModalButtonLoading' });
                }
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '批量导入失败');
                yield put({ type:'clearUploadModal' });
                yield put({ type:'closeImportModalButtonLoading' });
            }
        },
    },

    reducers : {
        updateState( state, action ){
            return { ...state, ...action.payload };
        },
        showImportModalButtonLoading(state, action){
            return { ...state, followRecordImportModalButtonLoading : true };
        },
        closeImportModalButtonLoading(state, action){
            return { ...state, followRecordImportModalButtonLoading : false };
        },
        showThirdButtonDisplay(state, action){
            return { ...state, thirdLastButtonDisplay : 'inline-block' };
        },
        closeThirdButtonDisplay(state, action){
            return { ...state, thirdLastButtonDisplay : 'none' };
        },
        clearUploadModal(state, action){
            return {
                ...state,
                followRecordImportOrgId : (window._init_data.firstOrg).key,                    //批量导入时选择校区ID
                followRecordImportModalVisible : false,                 //leads导入modal是否显示
                followRecordImportModalButtonLoading : false,           //leads导入按钮加载状态
                followRecordImportModalStep : 0,                        //leads导入进行的步数
                /*第一步*/
                followRecordImportFirstSuc : false,                    //第一步是否完成
                followRecordImportModalExcelName : '请上传文件',        //leads导入上传文件名
                followRecordImportModalExcelId : '',                   //leads导入上传文件id
                followRecordImportIsModal : false,                     //导入的文件是否是模板
                /*第二步*/
                secondStepTableTitle : [],                              //第二步表头
                secondStepTableDataSourse : [],                         //第二步列表数据
                secondStepTableDataTotal : [],                          //第二步列表数据数量
                /*第三步*/
                thirdLastButtonDisplay : 'inline-block',                //第三步中上一步按钮是否显示(点击确定后消失)
                lastStepChooseItem : undefined,                         //第三步选中的选项
            };
        },
    }
}
