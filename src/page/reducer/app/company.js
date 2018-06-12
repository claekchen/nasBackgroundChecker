import * as types from '../../constant/app-constant'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const initialState = {
  token: '123',
  name: '中国平安',
  location: '333',
  ava: '444',
  personInfo: [
    {
      name: '王小明',
      id: '100000000000000000',
      title: '销售经理',
      action: '入职',
      date: moment('2015/01', monthFormat).format(monthFormat),
      token:'',
      key: '1'
    }
  ]
}

const company = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_COMPANY_INFO:
      return Object.assign({}, state, action.info)
    case types.UPDATE_COMPANY_INFO:
      window.alert(state)
      return Object.assign({}, state)
    case types.APPROVE_PERSON:
      window.alert(state)
      return Object.assign({}, state)
    case types.REJECT_PERSON:
      window.alert(state)
      return Object.assign({}, state)
    default:
      return state
  }
}

export default company
