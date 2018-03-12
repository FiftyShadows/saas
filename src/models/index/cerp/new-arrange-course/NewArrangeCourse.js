import {
    GetNowDateAndTime,          //获取当前日期
    GetCourseList,              //获取排课列表数据
    OperationChangeStatus,      //操作栏点击更改状态操作(这里只有删除)
    GetMainArrangeCourseMessage,//点击编辑主排课信息查询
    GetTeacher,                 //获取主教和助教信息
    GetClassRoom,               //获取教室信息
    CourseEditModalSubmit       //主排课编辑modal提交
} from '../../../../services/cerp/new-arrange-course/NewArrangeCourse';
import { parse } from 'qs';
import { message } from 'antd';
import { routerRedux } from 'dva/router';
import { FormatDate } from '../../../../utils/dateFormat';

/*English*/
export default {

    namespace: 'newArrangeCourse',

    state: {
        nowDate : '',                           //当前日期(只做保存，不做修改)
        startDate : '',                         //操作改变开始时间
        endDate : '',                           //操作改变结束时间
        currentOrgId : '',                      //当前机构id

        //operationBar
        radioGroupValue : 'day',                //radiogroup的值

        //table
        tableLoading : false,                   //整个页面是否加载状态
        tableNewColumns : [],                   //列表控制显示行数组
        tableDataSource : [],                   //从接口获取的列表数据
        tableDataTotal : 0,                     //列表数据条数
        tablePageIndex : 0,                     //列表页码
        tablePageSize : 20,                     //列表每页条数
        tableSelectedRowKeys : [],              //复选框选中对象的key数组
        tableSelectedRows : [],                 //复选框选中对象的数组

        //alert modal
        alertModalVisible : false,              //提示框是否显示
        alertModalTitle : '',                   //提示框标题
        alertModalContent : '',                 //提示框内容
        alertModalButtonLoading : false,        //提示框按钮是否加载状态
        alertModalSubmitContent : {},           //提示框点击确定需要请求后台的数据

        //编辑modal
        courseEditModalVisible : false,         //主排课编辑modal是否显示
        courseEditModalButtonLoading : false,   //主排课编辑modal按钮是否加载
        courseEditModalTableLoading : false,    //主排课编辑modal中的子排课列表加载状态
        courseEditModalSelectedRowKeys : [],    //子排课查询选中项的key数组
        courseEditModalSelectedRows : [],       //子排课查询选中项的对象数组

        courseEditModalGetContent : {},         //主排课点击编辑获取到的详情

        courseEditModalTeacherSelectContent : [],       //主教和助教下拉列表数据
        courseEditModalClassRoomSelectContent : [],     //教室下拉列表数据

        courseEditModalRangeCourseDetail : [],          //选择时间范围后出来的子排课数据

        wetherClearCourseEditModal : false,     //是否编辑成功(用来清空表单)
    },

    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(( { pathname, query }) => {
                if(pathname == '/cerp_cp_rcd'){
                    //获取系统时间
                    dispatch({
                        type:'GetNowDateAndTime'
                    });
                }
            });
        },
    },

    effects: {
        //获取当前日期
        *'GetNowDateAndTime'({ payload },{ call, put, select }){
            //返回radiogroup初始值
            yield put({ type:'resetRadioGroup' });
            //若接口报错，则通过前端获取当前时间作为权宜之计
            let defaultDate = FormatDate(new Date()).substr(0,10);
            let { ret } = yield call(GetNowDateAndTime);
            yield put({
                type:'updateState',
                payload:{
                    nowDate : ret.date || defaultDate,
                }
            });
            //默认是按天查询
            let newArrangeCourse = yield select(state => state.newArrangeCourse);
            let pageIndex = newArrangeCourse.tablePageIndex;
            let pageSize = newArrangeCourse.tablePageSize;
            yield put({
                type:'GetCourseList',
                payload:{
                    orgId : window._init_data.cerp_orgId,
                    startDate : ret.date || defaultDate,
                    endDate : ret.date || defaultDate,
                    pageIndex,
                    pageSize,
                    radioGroupValue : 'day'
                }
            });
        },

        //获取排课列表数据
        *'GetCourseList'({ payload },{ call, put, select }){
            yield put({ type:'showLoading' });
            let radioGroupValue;
            if(payload && payload.radioGroupValue){
                radioGroupValue = payload.radioGroupValue;
                delete payload.radioGroupValue;
            }else{
                radioGroupValue = 'day'
            }
            let { ret } = yield call(GetCourseList,parse(payload));
            if(ret && ret.errorCode === 9000){
                if((ret.results).length == 0 && payload.pageIndex > 0){
                    payload.pageIndex -= 1;
                    let { ret } = yield call(GetCourseList,parse(payload));
                    if(ret && ret.errorCode === 9000){
                        yield put({
                            type:'updateState',
                            payload:{
                                currentOrgId : payload.orgId,
                                tableDataSource : ret.results,
                                tableDataTotal : ret.data.resultCount,
                                tablePageIndex : ret.data.pageIndex,
                                tablePageSize : ret.data.pageSize,
                                tableSelectedRowKeys : [],
                                tableSelectedRows : [],
                                startDate : payload.startDate,              //请求成功之后刷新开始时间
                                endDate : payload.endDate,                  //请求成功之后刷新结束时间
                                radioGroupValue,
                            }
                        });
                    }else if(ret && ret.errorMessage){
                        message.error(ret.errorMessage);
                    }else{
                        message.error('获取排课信息列表失败');
                    }
                }else{
                    yield put({
                        type:'updateState',
                        payload:{
                            currentOrgId : payload.orgId,
                            tableDataSource : ret.results,
                            tableDataTotal : ret.data.resultCount,
                            tablePageIndex : ret.data.pageIndex,
                            tablePageSize : ret.data.pageSize,
                            tableSelectedRowKeys : [],
                            tableSelectedRows : [],
                            startDate : payload.startDate,              //请求成功之后刷新开始时间
                            endDate : payload.endDate,                  //请求成功之后刷新结束时间
                            radioGroupValue,
                        }
                    });
                }
            }else if(ret && ret.errorMessage){
                message.error(ret.errorMessage);
            }else{
                message.error('获取排课信息列表失败');
            }
            yield put({ type:'closeLoading' });
        },

        //操作栏点击删除
        *'OperationChangeStatus'({ payload },{ call, put, select }){
            yield put({ type:'showButtonLoading' });
            yield put({ type:'showLoading' });
            let { ret } = yield call(OperationChangeStatus,parse(payload));
            if(ret && ret.errorCode == '9000'){
                message.success(ret.errorMessage || '删除成功');
                let newArrangeCourse = yield select(state => state.newArrangeCourse);
                let currentOrgId = newArrangeCourse.currentOrgId;
                let radioGroupValue = newArrangeCourse.radioGroupValue;
                let pageIndex = newArrangeCourse.tablePageIndex;
                let pageSize = newArrangeCourse.tablePageSize;
                let startDate = newArrangeCourse.startDate;
                let endDate = newArrangeCourse.endDate;
                yield put({
                    type:'GetCourseList',
                    payload:{
                        orgId : currentOrgId,
                        startDate : startDate,
                        endDate : endDate,
                        pageIndex,
                        pageSize,
                        radioGroupValue
                    }
                });
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '删除失败');
            }
            yield put({ type:'closeButtonLoadingAndClose' });
            yield put({ type:'closeLoading' });
        },

        //子排课记录批量删除
        *'CourseBatchDelete'({ payload },{ call, put, select }){
            yield put({ type : 'showSonCourseTableLoading' });
            let { ret } = yield call(OperationChangeStatus,parse(payload));
            if(ret && ret.errorCode == '9000'){
                message.success(ret.errorMessage || '子排课删除成功');
                //刷新子排课列表
                yield put({
                    type:'EditDateOnChange',
                    payload:{
                        startDate : payload.startDate,
                        endDate : payload.endDate,
                        cpmId : payload.cpmId,
                        orgId : payload.orgId,
                        pageIndex : 0,
                        pageSize : 99999
                    }
                });
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '子排课删除失败');
            }
            yield put({ type:'closeSonCourseTableLoading' });
        },

        //点击编辑主排课信息查询
        *'GetMainArrangeCourseMessage'({ payload },{ call, put, select }){
            //打开表单，若请求失败则关闭表单，使用户在网慢的时候感觉到自己点击了确实做出了响应
            yield put({
                type:'newArrangeCourse/updateState',
                payload:{
                    courseEditModalVisible : true
                }
            });
            let { ret } = yield call(GetMainArrangeCourseMessage,parse(payload));
            if(ret && ret.errorCode == '9000'){
                let newArrangeCourse = yield select(state => state.newArrangeCourse);
                let tableSelectedRows = newArrangeCourse.tableSelectedRows;
                ret.zj_weekday = tableSelectedRows[0].weekDay;
                yield put({
                    type:'updateState',
                    payload:{
                        courseEditModalGetContent : ret
                    }
                });
                //获取主教和助教信息
                yield put({
                    type:'GetTeacher',
                    payload:{
                        orgId : ret.orgId
                    }
                });
                //获取教室信息
                yield put({
                    type:'GetClassRoom',
                    payload:{
                        orgId : ret.orgId
                    }
                });
                yield put({
                    type:'EditDateOnChange',
                    payload:{
                        startDate : ret.startDate,
                        endDate : ret.endDate,
                        cpmId : ret.cpmId,
                        orgId : ret.orgId,
                        pageIndex : 0,
                        pageSize : 99999
                    }
                });
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '主排课信息查询失败');
                yield put({
                    type:'newArrangeCourse/updateState',
                    payload:{
                        courseEditModalVisible : false
                    }
                });
            }
        },

        //编辑周期内开始时间和结束时间onChange事件(用于请求排课列表)
        *'EditDateOnChange'({ payload },{ call, put, select }){
            yield put({ type:'showSonCourseTableLoading' });
            let { ret } = yield call(GetCourseList,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        courseEditModalRangeCourseDetail : ret.results
                    }
                });
            }else{
                message.error(ret && ret.errorMessage ? ret.errorMessage : '获取排课信息列表失败');
                yield put({
                    type:'updateState',
                    payload:{
                        courseEditModalRangeCourseDetail : []
                    }
                });
            }
            yield put({ type:'closeSonCourseTableLoading' });
        },

        //选择校区onChange事件,获取主教和助教信息
        *'GetTeacher'({ payload },{ call, put, select }){
            let { ret } = yield call(GetTeacher,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        courseEditModalTeacherSelectContent : ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取教师信息失败');
            }
        },

        //选择校区onChange事件,获取教室信息
        *'GetClassRoom'({ payload },{ call, put, select }){
            let { ret } = yield call(GetClassRoom,parse(payload));
            if(ret && ret.errorCode === 9000){
                yield put({
                    type:'updateState',
                    payload:{
                        courseEditModalClassRoomSelectContent : ret.results,
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('获取教室失败');
            }
        },

        //主排课编辑modal提交
        *'CourseEditModalSubmit'({ payload },{ call, put, select }){
            yield put({ type:'showCourseEditModalButtonLoading' });
            yield put({ type:'showLoading' });
            let { ret } = yield call(CourseEditModalSubmit,parse(payload));
            if(ret && ret.errorCode === 9000){
                message.success(ret.errorMessage || '主排课编辑成功');
                let newArrangeCourse = yield select(state => state.newArrangeCourse);
                let currentOrgId = newArrangeCourse.currentOrgId;
                let radioGroupValue = newArrangeCourse.radioGroupValue;
                let pageIndex = newArrangeCourse.tablePageIndex;
                let pageSize = newArrangeCourse.tablePageSize;
                let startDate = newArrangeCourse.startDate;
                let endDate = newArrangeCourse.endDate;
                yield put({
                    type:'GetCourseList',
                    payload:{
                        orgId : currentOrgId,
                        startDate : startDate,
                        endDate : endDate,
                        pageIndex,
                        pageSize,
                        radioGroupValue
                    }
                });
                yield put({
                    type:'updateState',
                    payload:{
                        wetherClearCourseEditModal : true,      //请求成功清空表单
                        courseEditModalRangeCourseDetail : []   //清空子排课列表数据
                    }
                });
            }else if( ret && ret.errorMessage ){
                ret && ret.errorMessage && message.error(ret.errorMessage);
            }else{
                message.error('排课编辑失败');
            }
            yield put({ type:'closeCourseEditModalButtonLoading' });
            yield put({ type:'closeLoading' });
        },
    },

    reducers: {
        updateState(state, action) {
            return { ...state, ...action.payload };
        },
        //重置radiogroup状态
        resetRadioGroup(state, action){
            return { ...state, radioGroupValue : 'day' };
        },
        //整个页面列表加载状态
        showLoading(state, action) {
            return { ...state, tableLoading : true};
        },
        //整个页面加载状态
        closeLoading(state, action) {
            return { ...state, tableLoading : false};
        },
        //删除提醒框按钮加载状态开启
        showButtonLoading(state, action) {
            return { ...state, alertModalButtonLoading : true};
        },
        //删除提醒框加载状态取消并且关闭提醒框
        closeButtonLoadingAndClose(state, action) {
            return { ...state, alertModalButtonLoading : false, alertModalVisible : false};
        },
        //子排课查询列表加载状态开启
        showSonCourseTableLoading(state, action){
            return { ...state, courseEditModalTableLoading : true};
        },
        //子排课查询列表加载状态关闭
        closeSonCourseTableLoading(state, action){
            return { ...state, courseEditModalTableLoading : false};
        },
        //主排课编辑modal按钮加载状态
        showCourseEditModalButtonLoading(state, action){
            return { ...state, courseEditModalButtonLoading : true};
        },
        //主排课编辑modal按钮取消加载状态
        closeCourseEditModalButtonLoading(state, action){
            return { ...state, courseEditModalButtonLoading : false};
        },
    },
};
