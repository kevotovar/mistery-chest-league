import { SET_TITLE, SetTitleAction } from './types'

export function setTitle(title: string): SetTitleAction {
  return {
    type: SET_TITLE,
    payload: title,
  }
}
