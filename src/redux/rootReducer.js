// pure functions
import {TABLE_RESIZE} from './types';

export function rootReducer(state, action) {
  let prevColState; let prevRowState
  switch (action.type) {
    case TABLE_RESIZE:
      if (action.data.type == 'col') {
        prevColState = state.colState || {}
        prevColState[action.data.id] = action.data.value
        return {...state, colState: prevColState}
      } else if (action.data.type == 'row') {
        prevRowState = state.rowState || {}
        prevRowState[action.data.id] = action.data.value
        return {...state, rowState: prevRowState}
      }
      break
    default: return state
  }
}
