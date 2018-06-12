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

export const approvePersonAction = (token) => {
  return {
    type: types.APPROVE_PERSON
  }
}

export const rejectPersonAction = (token) => {
  return {
    type: types.REJECT_PERSON
  }
}
