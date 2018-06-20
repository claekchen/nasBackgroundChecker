import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
import * as menuAction from './menus'
import {cbPush} from '../../common'
let api = new BackgroundContractApi()
export const changePersonInfoAction = (info) => {
  return {
    type: types.CHANGE_PERSON_INFO,
    info
  }
}

export const updatePersonInfoAction = (dispatch, state) => {
  const {token, name, id, ava} = state
  menuAction.toggleLoading(dispatch, true)
  const refresh = () => {
    getPersonInfo(dispatch, state.token)
    menuAction.getUserType(dispatch)
  }
  const callBack = cbPush(dispatch, refresh)
  api.updatePerson(token, name, id, ava, callBack)
}

export const switchCompanyInfoAction = (showCompanyInfo) => {
  return {
    type: types.SWITCH_COMPANYINFO,
    showCompanyInfo
  }
}

export const updateCompany = (dispatch, state) => {
  const {token, addingToken, addingTitle, addingAction, addingDate} = state.person
  dispatch(switchCompanyInfoAction(false))
  menuAction.toggleLoading(dispatch, true)
  const refresh = () => getPersonInfo(dispatch, token)
  const callBack = cbPush(dispatch, refresh)
  api.addCompanyHistoryToPerson(token, addingToken, addingTitle, addingAction, addingDate, 0, callBack)
}

export const getPersonInfo = (dispatch, token) => {
  menuAction.toggleLoading(dispatch, true)
  api.getPersonByToken(token, (personInfo) => {
    console.log(personInfo)
    if (personInfo.result === 'null') {
      menuAction.toggleLoading(dispatch, false)
      return null
    }
    personInfo = JSON.parse(personInfo.result)
    console.log(personInfo.companyInfo)
    let info = {
      name: personInfo.name,
      id: personInfo.id,
      ava: personInfo.ava,
      companyInfo: personInfo.companyInfo
    }
    dispatch(changePersonInfoAction(info))
    menuAction.toggleLoading(dispatch, false)
  })
}

export const getCompanyList = (dispatch) => {
  menuAction.toggleLoading(dispatch, true)
  api.getCompanyList((companyMap) => {
    companyMap = JSON.parse(companyMap.result)
    dispatch(changePersonInfoAction({companyList: companyMap}))
    menuAction.toggleLoading(dispatch, false)
  })
}
