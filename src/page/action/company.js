import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
let api = new BackgroundContractApi()
export const changeCompanyInfoAction = (info) => {
  return {
    type: types.CHANGE_COMPANY_INFO,
    info
  }
}

export const updateCompanyInfoAction = (state) => {
  const {token, name, location, ava} = state
  api.updateCompany(token,name,location,ava);
}

export const approvePersonAction = (state, tokenOfPerson) => {
  const {token} = state
= api.approveOrRejectHistory(token, tokenOfPerson, 1)
}

export const rejectPersonAction = (state, tokenOfPerson) => {
  const {token} = state
  api.approveOrRejectHistory(token, tokenOfPerson, -1)
}
