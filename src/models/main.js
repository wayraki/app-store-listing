import request from '../utils/request'
import { model } from '../redux-create'

export default model({
  namespace: 'main',
  state: {
    appList: { list: [], current: 1, pageSize: 10, loading: false },
    recomend: { list: [], loading: false }
  },
  reducers: {
    updateAppList(data, state) {
      const { list, current, loading } = data
      if (loading) {
        const appList = { ...state.appList, loading: true }
        return Object.assign({}, state, { appList })
      }
      const sources = {
        ...data,
        list: current === 1 ? list : [...state.appList.list, ...list],
        loading: false
      }
      return Object.assign({}, state, { appList: sources })
    },
    updateRecomend(data, state) {
      const { list, loading } = data
      if (loading) {
        const recomend = { ...state.recomend, loading: true }
        return Object.assign({}, state, { recomend })
      }
      const sources = {
        list: list,
        loading: false
      }
      return Object.assign({}, state, { recomend: sources })
    }
  },
  effects: {
    async getAppList(payload, dispatch, getState) {
      // 如果是搜索，就先清空数据
      if (payload.current === 1) {
        dispatch('updateAppList', {
          list: [],
          current: 1,
          pageSize: 10,
          loading: false
        })
        dispatch('updateRecomend', {
          list: [],
          loading: false
        })
      }
      // loading
      dispatch('updateAppList', { loading: true })
      const data = await request(payload)
      dispatch('updateAppList', data)
    },
    async getRecomend(payload, dispatch, getState) {
      dispatch('updateRecomend', { loading: true })
      const data = await request(payload)
      dispatch('updateRecomend', data)
    }
  }
})
