import { fromJS, Map } from 'immutable'
import { LayoutActionTypes, SET_TITLE } from './types'

type LayoutState = Map<string, any>

const initialState: LayoutState = fromJS({
  title: 'Mistery Chest',
})

export function layoutReducer(
  state = initialState,
  action: LayoutActionTypes
): LayoutState {
  switch (action.type) {
    case SET_TITLE:
      return state.set('title', action.payload)
    default:
      return state
  }
}
