import * as types from '../constant/app-constant'
export const changeSelectMenuAction = (selected) => {
    return {
        type:types.CHANGE_SELECT_MENU,
        selected
    }
}

export const toggleMenuAction = (key, isDisable) => {
    return {
        type: types.TOGGLE_MENU,
        key,
        isDisable
    }
}

export const getUserTypeAction = (dispatch) => {
    const userType = 'company'
    if (userType === 'person') {
        dispatch(toggleMenuAction('disableAudit', true))
        dispatch(toggleMenuAction('disableUpdateCompany', true))
    } else if (userType === 'company') {
        dispatch(toggleMenuAction('disableUpdatePerson', true))
        dispatch(toggleMenuAction('disablePreview', true))
    } else if (userType === 'none') {
        dispatch(toggleMenuAction('disablePreview', true))
        dispatch(toggleMenuAction('disableAudit', true))
    }
    return {
        type: types.GET_USER_TYPE,
        userType
    }
}
