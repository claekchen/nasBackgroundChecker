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
    api.verify((state) => {
        user = JSON.parse(state.result)
        console.log(user)
        // const userType = user.type
        // const userToken = user.token
        const userType = 'company'
        const userToken = '123123'
        if (userType === 'person') {
            dispatch(toggleMenuAction('disableAudit', true))
            dispatch(toggleMenuAction('disableUpdateCompany', true))
            dispatch(personAction.changePersonInfoAction({token: userToken}))
        } else if (userType === 'company') {
            dispatch(toggleMenuAction('disableUpdatePerson', true))
            dispatch(toggleMenuAction('disablePreview', true))
            dispatch(companyAction.changeCompanyInfoAction({token: userToken}))
        } else if (userType === 'none') {
            dispatch(toggleMenuAction('disablePreview', true))
            dispatch(toggleMenuAction('disableAudit', true))
            dispatch(personAction.changePersonInfoAction({token: userToken}))
            dispatch(companyAction.changeCompanyInfoAction({token: userToken}))
        }
        dispatch(getUserTypeAction(userType, userToken))
    })
}
