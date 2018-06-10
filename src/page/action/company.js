import * as types from '../constant/app-constant'

export const changeCompanyInfoAction = (info) => {
  return {
    type: types.CHANGE_COMPANY_INFO,
    info
  }
}

export const updateCompanyInfoAction = () => {
  return {
    type: types.CHANGE_COMPANY_INFO
  }
}
