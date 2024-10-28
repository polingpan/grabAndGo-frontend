import {jwtDecode} from 'jwt-decode'

export const businessUserActionType = {
    SET_BUSINESS_USER_INFO: 'SET_BUSINESS_USER_INFO',
    CLEAR_BUSINESS_USER_INFO: 'CLEAR_BUSINESS_USER_INFO'
}

export const setBusinessUserInfo = token => dispatch => {
    const decoded = jwtDecode(token)

    dispatch({
        type: businessUserActionType.SET_BUSINESS_USER_INFO,
        payload: {
            email: decoded.email,
            storeName: decoded.name
        }
    })
}

export const businessLogout = () => ({
    type: businessUserActionType.CLEAR_BUSINESS_USER_INFO
})
