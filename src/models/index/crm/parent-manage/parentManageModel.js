import {
    getDicSelects             //得到联系人关系列表
} from '../../../../services/index/common/searchSelectListService';
import {
    getParentList,            //得到联系人列表

    getStuIdList,             //得到学员下拉列表
    getParentIdList,          //得到联系人下拉列表

    checkParent,              //检验联系人是否存在
    confirmAddParent,         //确认新增联系人
	confirmUpdateParent,      //确认修改联系人

    deleteParent,             //删除联系人
    getParentDetailInfo,      //获取单个联系人信息

	checkoutParentName

} from '../../../../services/crm/parent-manage/parentManageService';
import parse from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';

export default {
    namespace : 'parentManageModel',

    state : {
		/*常用搜索*/
        name                       : undefined,          //联系人姓名
		mobile                     : undefined,          //联系电话

		/*高级搜索*/
		searchVisible              : false,              //高级搜索是否显示
        attention                  : undefined,          //是否绑定微信
        orgId                      : undefined,
		sellerName                 : undefined,          //销售

        uids                       : undefined,          //所有人
        condition                  : 'none',             //是否加载全部数据

		/*表格数据*/
        dataSource                 : [],
		newColumns                 : [],
        resultCount                : 0,
        pageIndex                  : 0,
        pageSize                   : 20,
        loading                    : false,
		orgName                    : undefined,

		bandUrl                    : undefined,          //绑定二维码链接
        selectedRowKeys            : [],
        selectedRows               : [],
        selectedRecordIds          : [],

		/*新增数据*/
        createParentVisible        : false,              //新增联系人框
        stuIdList                  : [],                 //学员下拉列表
        parentIdList               : [],                 //联系人下拉列表
        parentRelationList         : [],                 //联系人关系列表

        createOrgId                : undefined,          //新增时校区id
        parentId                   : undefined,          //联系人id(如果联系人存在)
        openId                     : undefined,

        stuId                      : undefined,          //修改时学员Id
        updateOrgId                : undefined,          //修改时校区Id
        updateParentId             : undefined,          //修改时的联系人id
        oldParentId                : undefined,          //判断手机号是否被占用

        parentDetailInfo           : {},                 //修改时的联系人信息

        dataSource                 : [],
		newColumns                 : [],
        resultCount                : 0,
        pageIndex                  : 0,
        pageSize                   : 20,
        loading                    : false,

        selectedRowKeys            : [],
        selectedRows               : [],
        selectedRecordIds          : [],

        timer                      : undefined,
        condition                  : 'none',             //是否加载全部数据

		parentCreateBtnLoading     : false

    },

    subscriptions : {
        setup({ dispatch, history }){
            history.listen( ({ pathname, query }) => {
                if( pathname === '/crm_stuparent_list' ){
                    dispatch({
                        type    : 'getParentListParams',
                        payload : {
                            condition : 'all'
                        }
                    });
                    dispatch({
                        type : 'getSelectOptList',
                        payload : {
                        }
                    })
					dispatch({
						type : 'parentManageDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
                } else if( pathname === '/crm_stuparent_mylist' ){
                    dispatch({
                        type    : 'getParentListParams',
                        payload : {
                            condition : undefined
                        }
                    });
                    dispatch({
                        type: 'mainLayoutModel/updateState',
                        payload:{
                            SubordinateType :'联系人',
                        }
                    });
                    dispatch({
                        type : 'getSelectOptList',
                        payload : {
                        }
                    })
					dispatch({
						type : 'parentManageDetailModel/updateState',
						payload : {
							detailVisible : false
						}
					})
                }
            })
        }
    },

    effects : {
        //得到下拉列表
        *getSelectOptList({ payload },{ call, put, select }){
            let { ret } = yield call( getDicSelects, ({ dictkey : 'parentRelationship' }));
            if( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        parentRelationList : ret.list,
                    }
                })
            };
        },

		//刷新列表
		*refreshList({ payload },{ call, put, select }){
			let state = yield select( state => state.parentManageModel );
			let params = {
				pageIndex  : 0,
                pageSize   : state.pageSize,

				/*高级搜索*/
				attention  : state.attention,
				orgId      : state.orgId,
				sellerName : state.sellerName,

				uids       : state.uids,
				condition  : state.condition,

				/*常用搜索*/
				name       : state.name,
				mobile     : state.mobile,
			}
			yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            })
		},

        //得到联系人列表所需的传参
        *getParentListParams({ payload },{ call, put, select }){
            let condition = payload && payload.condition;
            let state = yield select( state => state.parentManageModel );
            let params = {
                pageSize  : 20,
                pageIndex : 0,
                pageSize  : state.pageSize,
                condition : condition,
				name      : undefined,
				mobile    : undefined,
				attention : undefined,
				orgId     : undefined,
				sellerName : undefined
            }
            yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            })
        },

        //得到联系人列表
        *getParentList({ payload },{ call, put, select }){
            yield put({
                type : 'updateState',
                payload : {
                    loading : true,
                }
            })
            let { params } = payload;
            let { ret } = yield call( getParentList, ({ ...params }));
            if( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        dataSource        : ret.results,
                        resultCount       : ret.data.resultCount,
						bandUrl           : ret.bandUrl,
						orgName           : ret.orgName,
                        selectedRowKeys   : [],
                        selectedRows      : [],
                        selectedRecordIds : [],
                        ...params
                    }
                })
            }else {
                message.error( (ret && ret.errorMessage) || '联系人列表加载失败' )
            };
            yield put({
                type : 'updateState',
                payload : {
                    loading : false
                }
            })
        },

        //搜索
        *searchFunction({ payload },{ call, put, select }){
            let { values } = payload;
            let state = yield select( state => state.parentManageModel );
            let params = {
                pageIndex  : 0,
                pageSize   : state.pageSize,

				/*高级搜索*/
				attention  : state.attention,
				orgId      : state.orgId,
				sellerName : state.sellerName,

				uids       : state.uids,
				condition  : state.condition,
                ...values
            };
            yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            });
        },

		//高级搜索
		*onSuperSearch({ payload },{ call, put, select }){
			let { values } = payload;
			let state = yield select( state => state.parentManageModel );
			let params = {
				pageIndex : 0,
				pageSize  : state.pageSize,

				/*常用搜索*/
				name      : state.name,
				mobile    : state.mobile,

				condition : state.condition,
				uids      : state.uids,
				...values
			}
			yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            });
		},

        //表格上方搜索
        *subordinateChange({ payload },{ call, put, select }){
            let { uids } = payload;
            let state = yield select( state => state.parentManageModel );
            let params = {
                uids      : uids,

				condition : state.condition,

                pageIndex : 0,
                pageSize  : state.pageSize,

				/*常用搜索*/
                name      : state.name,
                mobile    : state.mobile,

				/*高级搜索*/
                attention  : state.attention,
				orgId      : state.orgId,
				sellerName : state.sellerName,

            };
            yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            })
        },

        //选择校区得到学员下拉列表和联系人下拉列表
        *TenantSelectOnSelect({ payload },{ call, put, select }){
            let { orgId } = payload;
            let parentManageModel = yield select( state => state.parentManageModel );
            let { ret } = yield call( getStuIdList, ({ orgId : orgId, condition: parentManageModel.condition }));
            if ( ret && ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        stuIdList   : ret.results,
                        createOrgId : orgId,             //新增时的校区id
                    }
                })
            }else {
                message.error( ret && ret.errorMessage || '获取学员下拉列表失败' );
            }
            let parentIdList = yield call( getParentIdList, ({ orgId : orgId }) );
            if( parentIdList && parentIdList.ret && parentIdList.ret.errorCode == '9000' ){
                yield put({
                    type : 'updateState',
                    payload : {
                        parentIdList : parentIdList.ret.results,

                    }
                })
            }else {
                message.error( ret && ret.errorMessage || '获取联系人下拉列表失败' );
            };
        },

        //查询联系人是否存在
        *checkParent({ payload },{ call, put, select }){
            yield put({
                type : 'updateState',
                payload : {
                    oldParentId : '',
                }
            })
            let parentManageModel = yield select( state => state.parentManageModel );
            let updateParentId = parentManageModel.updateParentId;
            let { mobile, changeParentInfoSelect } = payload;
            if( !updateParentId ){
                let params = {
                    mobile : mobile,
                    orgId  : parentManageModel.createOrgId,
                };
                let { ret } = yield call( checkParent, ({ ...params }));
                if( ret && ret.errorCode == '9000' ){
                    yield put({
                        type : 'updateState',
                        payload : {
                            parentId : ret.parentId,
                            openId   : ret.openId,
                        }
                    });
                    if( !!ret.parentId ){
                        changeParentInfoSelect && changeParentInfoSelect( ret.parentId );
                        message.error( '联系人已存在, 请直接选择' );
                    }
                };
            }else {
                let params = {
                    mobile : mobile,
                    orgId  : parentManageModel.updateOrgId,
                };
                let { ret } = yield call( checkParent, ({ ...params }));
                if( ret && ret.errorCode == '9000' ){
                    if( !!ret.parentId && updateParentId != ret.parentId ){
                           yield put({
                            type : 'updateState',
                            payload : {
                                oldParentId : ret.parentId
                            }
                        })
                    };
                    yield put({
                        type : 'updateState',
                        payload : {
                            openId : ret.openId
                        }
                    })
                }
            }
        },

        //确认新增
        *confirmAddParent({ payload },{ call, put, select }){
			yield put({
				type : 'updateState',
				payload : {
					parentCreateBtnLoading : true
				}
			})
            let { values, changeParentInfoSelect } = payload;
            let parentManageModel = yield select( state => state.parentManageModel );
            let obj = {
                openId   : parentManageModel.openId,
                id       : parentManageModel.parentId || parentManageModel.updateParentId,
                ...values
            }
			let ret = {};
			if( parentManageModel.parentId || parentManageModel.updateParentId ){
				ret = yield call( confirmUpdateParent, ( obj ));
			}else{
				ret = yield call( confirmAddParent, ( obj ));
			}
            if( ret && ret.ret && ret.ret.errorCode == '9000' ){
                message.success('保存成功');
                yield put({
                    type : 'updateState',
                    payload : {
                        createParentVisible : !parentManageModel.createParentVisible,
                        parentDetailInfo    : {},
                        createOrgId         : '',
                        parentId            : '',
                        openId              : '',
                        updateParentId      : '',
                        stuId               : '',
                        updateOrgId         : '',
                        oldParentId         : '',
                        stuIdList           : [],
                        parentIdList        : []
                    }
                })
                let params = {
                    uids      : parentManageModel.uids,
                    orgId     : parentManageModel.orgId,
                    name      : parentManageModel.name,
                    stuName   : parentManageModel.stuName,
                    pageSize  : parentManageModel.pageSize,
                    pageIndex : parentManageModel.pageIndex,
                };
                yield put({
                    type : 'getParentList',
                    payload : {
                        params
                    }
                })
				yield put({
					type : 'parentManageDetailModel/getCurrentItem',
					payload : {
					}
				})
            }else {
                message.error( ret && ret.ret && ret.ret.errorMessage || '新增修改联系人失败')
            }
			yield put({
				type : 'updateState',
				payload : {
					parentCreateBtnLoading : false
				}
			})
        },

        //点击修改
        *updateParent({ payload },{ call, put, select }){
            let { id, orgId, stuId } = payload;
            let parentManageModel = yield select( state => state.parentManageModel );
            let { ret } = yield call( getParentDetailInfo, ({ id : id, orgId : orgId, stuId : stuId }));
            if( ret && ret.errorCode == '9000' ){
                let studentIdList = yield call( getStuIdList, ({ orgId : ret.orgId }));
                if( studentIdList && studentIdList.ret && studentIdList.ret.errorCode == '9000' ){
                    yield put({
                        type : 'updateState',
                        payload : {
                            stuIdList : studentIdList.ret.results,
                        }
                    })
                }
                let parentDetailInfo = {
                    orgId    : ret.orgId,
                    stuId    : ret.stuId,
                    name     : ret.name,
                    mobile   : ret.mobile,
                    relation : ret.relation,
                    sex      : ret.sex,
                    email    : ret.email,
                    id       : ret.id,
					qqNumber : ret.qqNumber,
					trade    : ret.trade,
					workUnit : ret.workUnit
                };
                yield put({
                    type : 'updateState',
                    payload : {
                        parentDetailInfo    : parentDetailInfo,
                        updateOrgId         : ret.orgId,
                        stuId               : ret.stuId,
                        updateParentId      : ret.id,
                        openId              : ret.openId,
                        createParentVisible : !parentManageModel.createParentVisible
                    }
                })
            };
        },

		*checkoutParentName({ payload },{ call, put, select }){
			let { ret } = yield call( checkoutParentName, ( payload ));
            if( ret && ret.errorCode === 1000 ){
                message.error( ret && ret.errorMessage || '有重复' );
            }
		},

        //批量删除联系人
        *deleteParent({ payload },{ call, put, select }){
            let { selectedRecords } = payload;
            let state = yield select( state => state.parentManageModel );
            let parentAndStuIdMap = JSON.stringify( selectedRecords );
            let { ret } = yield call( deleteParent, ({ parentAndStuIdMap : parentAndStuIdMap }));
            if( ret && ret.errorCode == '9000' ){
                let params = {
					/*常用搜索*/
                    name       : state.name,
                    mobile     : state.mobile,

					/*高級搜索*/
                    orgId      : state.orgId,
					attention  : state.attention,
					sellerName : state.sellerName,

                    uids       : state.uids,
					condition  : state.condition,

                    pageIndex  : 0,
                    pageSize   : state.pageSize
                };
                yield put({
                    type : 'getParentList',
                    payload : {
                        params
                    }
                })
            }
        },

        //分页
        *pagination({ payload },{ call, put, select }){
            let { pageIndex, pageSize } = payload;
            let state = yield select( state => state.parentManageModel );
            let params = {
                uids       : state.uids,
				condition  : state.condition,

				/*常用搜索*/
                name       : state.name,
                mobile     : state.mobile,

				/*高級搜索*/
                orgId      : state.orgId,
				attention  : state.attention,
				sellerName : state.sellerName,

                pageIndex  : pageIndex - 1,
                pageSize   : pageSize,
            };
            yield put({
                type : 'getParentList',
                payload : {
                    params
                }
            })
        }
    },

    reducers : {
        updateState( state, action ){
            return { ...state, ...action.payload };
        }
    }
}
