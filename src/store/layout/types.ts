export const SET_TITLE = 'store/layout/SET_TITLE'

export interface SetTitleAction {
  type: typeof SET_TITLE
  payload: string
}

export type LayoutActionTypes = SetTitleAction