import * as types from '../../constant/app-constant'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const initialState = {
  token: '',
  name: '',
  id: '',
  ava: '',
  showCompanyInfo: false,
  companyList: ['中国平安'],
  addingCompany: '',
  addingTitle: '',
  addingAction: '',
  addingDate: moment('2015/01', monthFormat),
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

const person = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PERSON_INFO:
      return Object.assign({}, state, action.info)
    case types.SWITCH_COMPANYINFO:
      console.log(state)
      return Object.assign({}, state, {showCompanyInfo: action.showCompanyInfo})
    default:
      return state
  }
}

export default person
