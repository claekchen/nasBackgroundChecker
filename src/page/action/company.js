import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
let api = new BackgroundContractApi()
const callbackFromEOS = (state) => {
  console.log(state)
}
export const changeCompanyInfoAction = (info) => {
  return {
    type: types.CHANGE_COMPANY_INFO,
    info
  }
}

export const updateCompanyInfoAction = (state) => {
  const {token, name, location, ava} = state
  api.updateCompany(token, name, location, ava, callbackFromEOS)
}

export const approvePersonAction = (state, tokenOfPerson) => {
  const {token} = state
  api.approveOrRejectHistory(token, tokenOfPerson, 1, callbackFromEOS)
}

export const rejectPersonAction = (state, tokenOfPerson) => {
  const {token} = state
  api.approveOrRejectHistory(token, tokenOfPerson, -1, callbackFromEOS)
}

export const getCompanyInfo = (dispatch, token) => {
  api.getCompanyByToken(token, (companyInfo) => {
    if (companyInfo.result === 'null') {
      return null
    }
    companyInfo = JSON.parse(companyInfo.result)
    let info = {
      name: companyInfo.name,
      location: companyInfo.location,
      ava: companyInfo.ava,
      personInfo: companyInfo.personInfo
    }
    info.personInfo = []
    console.log(info.personInfo)
    dispatch(changeCompanyInfoAction(info))
  })
}
