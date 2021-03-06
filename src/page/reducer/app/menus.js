import * as types from '../../constant/app-constant'
const initialState = {
 userType: '',
 userToken: '',
 loading: false,
 selected: 'search',
 disableSearch: false,
 disableUpdatePerson: false,
 disableUpdateCompany: false,
 disablePreview: false,
 disableAudit: false
}

const router = (state = initialState, action) => {
  switch (action.type) {
    case types.CHANGE_SELECT_MENU:
      return Object.assign({}, state, {selected: action.selected})
    case types.TOGGLE_MENU:
      const disableObj = {}
      disableObj[action.key] = action.isDisable
      return Object.assign({}, state, disableObj)
    case types.GET_USER_TYPE:
      return Object.assign({}, state, {userType: action.userType, userToken: action.userToken})
    default:
      return state
  }
}

export default router
