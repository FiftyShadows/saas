import {message} from 'antd';
import { parse } from 'qs';

import { queryKoubeiGoodsVerify } from '../../../../../services/scrm/koubei/koubei-goods/koubeiGoodsService';

//口碑-商品 管理
export default {

  namespace: 'koubeiGoodsVerifyModel',

  state: {
      pageIndex: 0,
      pageSize: 10,
      total: 0,
      loading: false,
      dataSource: [],
      selectedRowKeys: [],

      showSearch: false,
      query: {},//模糊检索的条件

      statusActive: 'ALL',// tab过滤的选中项
  },

  subscriptions: {
      setup({ dispatch, history }) {
          history.listen(( { pathname, query }) => {
              if(pathname === '/scrm_kb_goods_settle') {
                  dispatch({
                    type: 'queryList',
                    payload: {
                        pageIndex: 0,
                    }
                  });
              }
          });
      },
  },

  effects: {

      /*查询通知列表*/
      *queryList({ payload } , { put , call , select }){
            yield put({
                type : 'changeShowLoading',
            });

            let koubeiGoodsVerifyModel = yield select(state => state.koubeiGoodsVerifyModel);

            payload = payload || {};
            let pageIndex   = payload.pageIndex != undefined ? payload.pageIndex : koubeiGoodsVerifyModel.pageIndex;
            let pageSize    = payload.pageSize != undefined ? payload.pageSize    : koubeiGoodsVerifyModel.pageSize;
            let query       = payload.query || koubeiGoodsVerifyModel.query;
            let statusActive   = payload.statusActive || koubeiGoodsVerifyModel.statusActive;

            let queryParams = {
                pageIndex,pageSize,...query,status: (statusActive == 'ALL' ? '' : statusActive),
            };

            let {ret} = yield call( queryKoubeiGoodsVerify, parse(queryParams));

            if( ret && ret.errorCode == 9000 ){
                yield put({
                    type : 'updateState',
                    payload : {
                        dataSource: ret.results,
                        total: ret.data.resultCount,
                        loading: false,
                        pageIndex,pageSize,query,statusActive,
                        selectedRowKeys: [],
                    }
                });
            } else {
                yield put({
                    type : 'changeShowLoading',
                });
                message.error((ret && ret.errorMessage) || '没有获取到口碑商品核销列表');
            }
      },

},


  reducers: {
	  updateState(state, action) {
          return {...state, ...action.payload};
      },

      /*显隐模糊检索栏*/
      changeShowSearch(state, action) {
          let showSearch = state.showSearch;
          return {...state, showSearch: !showSearch};
      },

      /*显隐模糊检索栏*/
      changeShowLoading(state, action) {
          let loading = state.loading;
          return {...state, loading: !loading};
      },
  }
}
