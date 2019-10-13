import { NAMESPACE_SEP } from './constants'

export default function createAction(model) {
  // 生成actionType
  const reducerAction = Object.keys(model.reducers || []).reduce(
    (reducer, key) => {
      return {
        ...reducer,
        [key]: function(payload) {
          return {
            type: `${model.namespace}${NAMESPACE_SEP}${key}`,
            payload
          }
        }
      }
    },
    {}
  )
  // 生成redux-thunk
  const effectAction = Object.keys(model.effects || []).reduce(
    (effects, key) => {
      return {
        ...effects,
        [key]: payload => (dispatch, getState) => {
          const _dispatch = (actionTypes, param) => {
            dispatch(reducerAction[actionTypes](param))
          }
          model.effects[key](payload, _dispatch, getState)
        }
      }
    },
    {}
  )
  return { ...reducerAction, ...effectAction }
}
