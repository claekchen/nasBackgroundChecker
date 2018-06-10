import * as types from '../constant/app-constant'

export const changeSearchTextAction = (text) => {
  return {
    type: types.CHANGE_SEARCH_TEXT,
    text
  }
}

export const submitSearch = () => {
  return {
    type: types.SUBMIT_SEARCH
  }
}
