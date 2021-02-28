import { addFakeList, queryFakeList, removeFakeList, updateFakeList} from './service';
const Model = {
  namespace: 'listAndcardList2',
  state: {
    list: [],
  },
  effects: {
    *fetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      console.log('response===fetch=====',response)
      yield put({
        type: 'queryList',
        payload: Array.isArray(response.data) ? response.data : [],
      });
    },
    *appendFetch({ payload }, { call, put }) {
      const response = yield call(queryFakeList, payload);
      yield put({
        type: 'appendList',
        payload: Array.isArray(response) ? response : [],
      });
    },

    *submit({ payload }, { call, put }) {
      let callback;
      console.info('payload====',payload)
      if (payload.id) {
        callback = Object.keys(payload).length === 1 ? removeFakeList : updateFakeList;
      } else {
        callback = addFakeList;
      }
      console.info('callback====',callback);
      const response = yield call(callback, payload); // post

      console.info('response====',response)
      if(response.success){
        const response = yield call(queryFakeList, payload);
        console.log('submit===fetch=====',response)
        yield put({
          type: 'queryList',
          payload: Array.isArray(response.data) ? response.data : [],
        });
      }
      // yield put({
      //   type: 'queryList',
      //   payload: response,
      // });
    },
  },
  reducers: {
    queryList(state, action) {
      return { ...state, list: action.payload };
    },
    appendList(
      state = {
        list: [],
      },
      action,
    ) {
      return { ...state, list: state.list.concat(action.payload) };
    },
  },
};
export default Model;
