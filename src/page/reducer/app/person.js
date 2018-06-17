import * as types from '../../constant/app-constant'
import moment from 'moment'
const monthFormat = 'YYYY/MM'
const initialState = {
  token: '',
  name: '',
  id: '',
  ava: '',
  showCompanyInfo: false,
  companyList: {},
  addingCompany: '',
  addingToken: '',
  addingTitle: '',
  addingAction: '入职',
  addingDate: moment('2015/01', monthFormat),
  companyInfo: {}
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
