import * as types from '../../constant/app-constant'
const initialState = {
  token: '123',
  name: '中国平安',
  location: '333',
  ava: '444'
}

const company = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_COMPANY_INFO:
      return Object.assign({}, state, action.info)
    case types.UPDATE_COMPANY_INFO:
      window.alert(state)
      return Object.assign({}, state)
    default:
      return state
  }
}

export default company
