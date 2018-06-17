import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
import * as menuAction from './menus'
let api = new BackgroundContractApi()
export const changeSearchTextAction = (text) => {
  return {
    type: types.CHANGE_SEARCH_TEXT,
    text
  }
}
export const changePersonInfoAction = (info) => {
  return {
    type: types.CHANGE_SEARCH_RESULT,
    info
  }
}
export const submitSearch = (dispatch, token) => {
  menuAction.toggleLoading(dispatch, true)
  api.getPersonByToken(token, (personInfo) => {
    if (personInfo.result === 'null') {
      return null
    }
    personInfo = JSON.parse(personInfo.result)
    let info = {
      token: token,
      name: personInfo.name,
      id: personInfo.id,
      ava: personInfo.ava,
      companyInfo: personInfo.companyInfo
    }
    dispatch(changePersonInfoAction(info))
    menuAction.toggleLoading(dispatch, false)
  })
}
