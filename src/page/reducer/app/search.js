import * as types from '../../constant/app-constant'
const initialState = {
  searchText: ''
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
      return Object.assign({}, state, {searchText: action.text})
    default:
      return state
  }
}

export default search
