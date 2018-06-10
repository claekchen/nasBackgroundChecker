import * as types from '../../constant/app-constant'
const initialState = {
  token: '123',
  name: '222',
  id: '333',
  ava: '444'
}

const person = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_PERSON_INFO:
      return Object.assign({}, state, action.info)
    case types.UPDATE_PERSON_INFO:
      window.alert(state)
      return Object.assign({}, state)
    default:
      return state
  }
}

export default person
