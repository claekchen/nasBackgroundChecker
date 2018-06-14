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

export const submitSearch = (text) => {
  api.getByToken(text, callbackFromEOS)
}
