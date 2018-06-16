import * as types from '../../constant/app-constant'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const initialState = {
  searchText: '',
  token: '',
  name: '',
  id: '',
  ava: '',
  companyInfo: [
    {
      name: '中国平安',
      title: '销售经理',
      action: '入职',
      date: moment('2015/01', monthFormat).format(monthFormat),
      isVeri: '已认证',
      key: '1'
    }
  ]
}

const search = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SEARCH_TEXT:
      return Object.assign({}, state, {searchText: action.text})
    case types.CHANGE_SEARCH_RESULT:
      return Object.assign({}, state, action.info)
    default:
      return state
  }
}

export default search
