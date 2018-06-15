import * as types from '../../constant/app-constant'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const initialState = {
  token: '123',
  name: '中国平安',
  location: '333',
  ava: '',
  personInfo: [
    {
      name: '王小明',
      id: '100000000000000000',
      title: '销售经理',
      action: '入职',
      date: moment('2015/01', monthFormat).format(monthFormat),
      token:'333',
      key: '1'
    },
    {
      name: '王2',
      id: '100000000000000000',
      title: '销售经理',
      action: '入职',
      date: moment('2015/01', monthFormat).format(monthFormat),
      token:'222',
      key: '2'
    }
  ]
}

const company = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_COMPANY_INFO:
      return Object.assign({}, state, action.info)
    default:
      return state
  }
}

export default company
