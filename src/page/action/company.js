import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
import * as menuAction from './menus'
import {cbPush} from '../../common'
let api = new BackgroundContractApi()
export const changeCompanyInfoAction = (info) => {
  return {
    type: types.CHANGE_COMPANY_INFO,
    info
  }
}

export const updateCompanyInfoAction = (dispatch, state) => {
  menuAction.toggleLoading(dispatch, true)
  const callBack = cbPush(dispatch)
  const {token, name, location, ava} = state
  api.updateCompany(token, name, location, ava, callBack)
}

export const approvePersonAction = (dispatch, state, count, title, action, date, tokenOfPerson) => {
  menuAction.toggleLoading(dispatch, true)
  const callBack = cbPush(dispatch)
  const {token} = state.company
  api.approveOrRejectHistory(token, tokenOfPerson, count, title, action, date, 1, callBack)
}

export const rejectPersonAction = (dispatch, state, count, title, action, date, tokenOfPerson) => {
  menuAction.toggleLoading(dispatch, true)
  const callBack = cbPush(dispatch)
  const {token} = state.company
  api.approveOrRejectHistory(token, tokenOfPerson, count, title, action, date, -1, callBack)
}

export const getCompanyInfo = (dispatch, token) => {
  menuAction.toggleLoading(dispatch, true)
  api.getCompanyByToken(token, (companyInfo) => {
    if (companyInfo.result === 'null') {
      menuAction.toggleLoading(dispatch, false)
      return null
    }
    companyInfo = JSON.parse(companyInfo.result)
    let info = {
      name: companyInfo.name,
      location: companyInfo.location,
      ava: companyInfo.ava,
      personInfo: companyInfo.personInfo
    }
    console.log(info.personInfo)
    dispatch(changeCompanyInfoAction(info))
    menuAction.toggleLoading(dispatch, false)
  })
}
