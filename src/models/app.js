import produce from 'immer';
import { getChoices } from '../services/app';

export default {
  namespace: 'app',
  state: {
    appLoading: false,
  },
  reducers: {
    updateState(state, action) {
      const { payload: { data } } = action;
      const newState = produce(state, draft => {
        for(let key in data) {
          draft[key] = data[key];
        }
      })
      return newState;
    }
  },
  effects: {
    *getChoices(action, { call, put, all, select }) {
      yield put({ type: 'updateState', payload: { data: {appLoading: true} } });
      const response = yield call(getChoices);
      yield put({ type: 'updateState', payload: { data: {appLoading: false} } });
      const { code, data = {} } = response;
      if(code === '0') {
        yield put({ type: 'updateState', payload: { data: {
          media_types: data.media_types || [],
          biz_types: data.biz_types || [],
          queue_types: data.queue_types || [],
          level_types: data.level_types || []
        } } });
      }
    }
  },
  subscriptions: {
    
  }
};
