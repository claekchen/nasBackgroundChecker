import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
let api = new BackgroundContractApi()
const callbackFromEOS = (state) => {
  console.log(state)
}
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
    info.companyInfo = []
    dispatch(changePersonInfoAction(info))
  })
}
