import * as types from '../constant/app-constant'
import BackgroundContractApi from '../../ContractApi'
import * as personAction from './person'
import * as companyAction from './company'
let api = new BackgroundContractApi()
const getUserTypeAction =  (userType, userToken) => {
    return {
        type: types.GET_USER_TYPE,
        userType,
        userToken
    }
}
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

export const getUserType = (dispatch) => {
    let user = {
        type: '',
        token: ''
    }
    toggleLoading(dispatch, true)
    api.verify((state) => {
        try {user = JSON.parse(state.result)}
        catch (err) {
            window.alert(err)
        }
        console.log(user)
        const userType = user.type
        const userToken = user.token
        // const userType = 'company'
        // const userToken = '1'
        if (userType === 'person') {
            dispatch(toggleMenuAction('disableAudit', true))
            dispatch(toggleMenuAction('disableUpdateCompany', true))
            dispatch(toggleMenuAction('disableUpdatePerson', false))
            dispatch(toggleMenuAction('disablePreview', false))
            dispatch(personAction.changePersonInfoAction({token: userToken}))
        } else if (userType === 'company') {
            dispatch(toggleMenuAction('disableUpdatePerson', true))
            dispatch(toggleMenuAction('disablePreview', true))
            dispatch(toggleMenuAction('disableAudit', false))
            dispatch(toggleMenuAction('disableUpdateCompany', false))
            dispatch(companyAction.changeCompanyInfoAction({token: userToken}))
        } else if (userType === 'none') {
            dispatch(toggleMenuAction('disablePreview', true))
            dispatch(toggleMenuAction('disableAudit', true))
            dispatch(toggleMenuAction('disableUpdatePerson', false))
            dispatch(toggleMenuAction('disableUpdateCompany', false))
            dispatch(personAction.changePersonInfoAction({token: userToken}))
            dispatch(companyAction.changeCompanyInfoAction({token: userToken}))
        }
        dispatch(getUserTypeAction(userType, userToken))
        toggleLoading(dispatch, false)
    })
}

export const toggleLoading = (dispatch, isLoading) => {
    dispatch(toggleMenuAction('loading', isLoading))
}
