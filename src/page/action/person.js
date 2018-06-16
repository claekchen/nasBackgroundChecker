import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
let api = new BackgroundContractApi()
const callbackFromEOS = (state) => {
  console.log(state)
}
export const changePersonInfoAction = (info) => {
  return {
    type: types.CHANGE_PERSON_INFO,
    info
  }
}

export const updatePersonInfoAction = (state) => {
  const {token, name, id, ava} = state
  api.updatePerson(token, name, id, ava, callbackFromEOS)
}

export const switchCompanyInfoAction = (showCompanyInfo) => {
  return {
    type: types.SWITCH_COMPANYINFO,
    showCompanyInfo
  }
}

export const updateCompany = (state) => {
  const {token, addingCompany, addingTitle, addingAction, addingDate} = state
  let tokenOfCompany = '123'
  console.log('wait company')
  //  api.addCompanyHistoryToPerson(token, tokenOfCompany, addingTitle, addingAction, addingDate, 0)
}

export const getPersonInfo = (dispatch, token) => {
  api.getPersonByToken(token, (personInfo) => {
    if (personInfo.result === 'null') {
      return null
    }
    personInfo = JSON.parse(personInfo.result)
    let info = {
      name: personInfo.name,
      id: personInfo.id,
      ava: personInfo.ava,
      companyInfo: personInfo.companyInfo
    }
    dispatch(changePersonInfoAction(info))
  })
}
