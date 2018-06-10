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
