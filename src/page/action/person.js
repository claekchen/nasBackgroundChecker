import * as types from '../constant/app-constant'

export const changePersonInfoAction = (info) => {
  return {
    type: types.CHANGE_PERSON_INFO,
    info
  }
}

export const updatePersonInfoAction = () => {
  return {
    type: types.CHANGE_PERSON_INFO
  }
}

export const switchCompanyInfoAction = (showCompanyInfo) => {
  return {
    type: types.SWITCH_COMPANYINFO,
    showCompanyInfo
  }
}

export const updateCompany = () => {
  return {
    type: types.UPDATE_COMPANY
  }
}
