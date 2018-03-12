import {
    GetTeacherTeachingTable,            //查询老师搜客列表数据
    OpenTeachingDetail                  //查询老师授课详情
} from '../../../../services/report-form/teaching-report/teacherTeaching';
import { parse } from 'qs';
import qs from 'qs';
import { message } from 'antd';

//统计报表 老师授课
export default {

    namespace: 'teacherTeachingSheet',

    state: {
        firstEnter : true,                  //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
        pageIndex  : 0,                     //页码
        pageSize : 20,                      //默认永远是10

        sortParams : [{ key : '1' , value : '授课总节数' },{ key : '2' , value : '教学总人次' }],      //排序方式(放在state里方便做统一处理)

        exportSearchContent : {},           //报表导出条件(没有分页信息)

        tableLoading : false,               //table是否在加载状态
        listTopAllContent : [],             //上方table列表所有数据
        listTopAllReqSuc : false,           //上方table列表请求成功
        listBottomTeacherContent : [],      //下方table列表老师所有数据
        listBottomReqSuc : false,           //下方table列表请求成功
        listBottomTeacherCount : 0,         //下方table总数据

        teachingDetailVisible : false,      //授课详情modal展示
        teachingDetailNameHeight : '50px',  //授课详情姓名栏高度(css用)
        teachingDetailName : '',            //授课详情老师姓名
        teachingDetailContent : [],         //授课详情内容
        teachingDetailSpining : false,      //授课详情模态框是否加载状态

        buttonLoading : false,              //生成报表按钮加载状态
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if (location.pathname === '/report_erp_teacher') {
                    //初次进入页面查询当天数据
                    dispatch({
                        type : 'InitialQuery',
                        payload : {
                            firstEnter : true,                  //是否是点击路由进入，如果是则true，反之false(告诉报表头部是否需要还原默认)
                            pageIndex : 0,
                            pageSize : 20,
                            exportSearchContent : window.GetNowDateAndTime()
                        }
                    });
                }
            });
        },
    },

    effects: {
        //初次进入页面查询当天数据
        *'InitialQuery'({ payload },{ call, put, select }){
            let teacherTeachingSheet = yield select(state => state.teacherTeachingSheet);
            let sortParams = teacherTeachingSheet.sortParams;
            //默认查询下拉查询第一个
            payload.exportSearchContent = { ...payload.exportSearchContent , sortParam : sortParams[0].key }
            yield put({ type : 'GetTeacherTeachingTable', payload });
        },
        /*查询老师搜客列表数据*/
        *'GetTeacherTeachingTable'({ payload } , { call , put , select }){
            yield put({ type : 'showTableLoading' });
            yield put({ type : 'showButtonLoading' });
            yield put({ type : 'updateState' , payload : { firstEnter : payload.firstEnter || false }});        //更新变量，使报表头部初始化
            let exportSearchContent = payload.exportSearchContent;
            delete payload.firstEnter;
            delete payload.exportSearchContent;
            let params = { ...payload , ...exportSearchContent };
            let { ret } = yield call(GetTeacherTeachingTable,parse(params));
            if( ret && ret.errorCode === 9000 ){
                yield put({
                    type:'updateState',
                    payload:{
                        listTopAllContent : [{
                            all : '总计',
                            tAttend : ret.tAttend || 0,         //授课 上课数量
                            tAudition : ret.tAudition || 0,     //授课 试听数量
                            tMakeup : ret.tMakeup || 0,         //授课 补课数量
                            tTotal : ret.tTotal || 0,
                            sAttend : ret.sAttend || 0,         //教学 上课数量
                            sAudition : ret.sAudition || 0,     //教学 试听数量
                            sMakeup : ret.sMakeup || 0,         //教学 补课数量
                            sTotal : ret.sTotal || 0,
                        }],
                        listBottomTeacherContent : ret.results,
                        listBottomTeacherCount : ret.data.resultCount,

                        pageIndex : ret.data.pageIndex,
                        pageSize : ret.data.pageSize,
                        exportSearchContent,
                    }
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('总计数据统计失败');
            }
            yield put({ type : 'closeTableLoading' });
            yield put({ type : 'closeButtonLoading' });
            yield put({ type : 'updateState' , payload : { firstEnter : false }});                              //报表头部已初始化，需要将状态重置
        },

        /*打开授课详情*/
        *'OpenTeachingDetail'({ payload } , { call , put , select }){
            yield put({ type:'showDetailSpinning' })
            yield put({
                type:'updateState',
                payload:{
                    teachingDetailVisible : true,
                }
            });
            const { ret , err } = yield call(OpenTeachingDetail,parse(payload));
            if( ret && ret.errorCode === 9000 ){
                let height;
                if(ret.results && (ret.results).length > 0){
                    height =  ((ret.results).length+1)*50;
                }else{
                    message.warning('该教师无对应授课明细')
                    height = 50;
                    yield put({
                        type:'updateState',
                        payload:{
                            teachingDetailVisible : false
                        }
                    });
                    return;
                }
                yield put({
                    type:'updateState',
                    payload:{
                        teachingDetailNameHeight : height+'px',
                        teachingDetailName : (ret.results)[0].name,
                        teachingDetailContent : ret.results,
                        teachingDetailSpining : false,
                    }
                });
            }else{
                ret && ret.errorMessage ? message.error(ret.errorMessage) : message.error('获取详情失败');
            }
            yield put({ type:'closeDetailSpinning' })
        },
    },


    reducers: {
        updateState(state, action) {
            return {...state , ...action.payload};
        },
        //表格加载中
        showTableLoading(state,action) {
            return { ...state , ...action.payload , tableLoading : true };
        },
        //表格加载消失
        closeTableLoading(state,action){
            return { ...state , ...action.payload , tableLoading : false };
        },
        //生成报表按钮加载中
        showButtonLoading(state,action) {
            return { ...state , ...action.payload , buttonLoading : true };
        },
        //生成报表按钮加载消失
        closeButtonLoading(state,action){
            return { ...state , ...action.payload , buttonLoading : false };
        },
        showDetailSpinning(state,action){
            return { ...state , ...action.payload , teachingDetailSpining : true };
        },
        closeDetailSpinning(state,action){
            return { ...state , ...action.payload , teachingDetailSpining : false };
        },
    },
};
