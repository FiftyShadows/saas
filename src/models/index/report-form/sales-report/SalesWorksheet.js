import {
    QueryList
} from '../../../../services/report-form/sales-report/salesWorksheet';
import { message } from 'antd';
import { parse } from 'qs';
import moment from 'moment';

//销售工作表
export default {

  namespace: 'salesWorksheet',

    state: {
        firstEnter : true,              //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        /*列表*/
        tableLoading : false,           //列表加载状态
        tableDataSource : [],           //列表数据
        tableTotal : 0,                 //列表条数
        tablePageIndex : 0,             //列表页码
        tablePageSize : 40,             //列表每页条数
        exportSearchContent : {},       //报表导出条件(没有分页信息)

        buttonLoading : false,          //生成报表按钮加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname === '/report_crm_sellerwork') {
                    //初次进入页面查询当天数据
                    dispatch({
                        type : 'InitialQuery',
                        payload : {
                            firstEnter : true,
                            pageIndex : 0,
                            pageSize : 20,
                            exportSearchContent : window.GetNowDateAndTime()
                        }
                    })
                }
            });
        },
    },

    effects: {
        //初次进入页面查询当天数据
        *'InitialQuery'({ payload },{ call, put, select }){
            yield put({ type : 'QueryList', payload });
        },
        /*查询*/
        *'QueryList'({ payload },{ call, put, select }){
            yield put({ type : 'showTableLoading' });
            yield put({ type : 'showButtonLoading' });
            yield put({ type : 'updateState' , payload : { firstEnter : payload.firstEnter || false }});        //更新变量，使报表头部初始化
            let exportSearchContent = payload.exportSearchContent;
            delete payload.firstEnter;
            delete payload.exportSearchContent;
            let params = { ...payload , ...exportSearchContent };
            let { ret } = yield call(QueryList,parse(params));
            if (ret && ret.errorCode === 9000) {
                yield put({
                    type:'updateState',
                    payload:{
                        tableDataSource : ret.results,
                        tablePageIndex : ret.data.pageIndex,
                        tablePageSize : ret.data.pageSize,
                        tableTotal : ret.data.resultCount,
                        exportSearchContent,
                    }
                })
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('查询失败');
                yield put({
                    type:'updateState',
                    payload:{
                        tableDataSource : [],
                        tablePageIndex : 0,
                        tablePageSize : 40,
                        tableTotal : 0,
                    }
                })
            }
            yield put({ type : 'closeTableLoading' });
            yield put({ type : 'closeButtonLoading' });
            yield put({ type : 'updateState' , payload : { firstEnter : false }});                              //报表头部已初始化，需要将状态重置
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload, };
        },
        showTableLoading(state, action){
            return { ...state, tableLoading : true };
        },
        closeTableLoading(state, action){
            return { ...state, tableLoading : false };
        },
        showButtonLoading(state, action){
            return { ...state, buttonLoading : true };
        },
        closeButtonLoading(state, action){
            return { ...state, buttonLoading : false };
        },
    },
}
