import {jwtDecode} from 'jwt-decode'
import axiosInstance from '../../axiosConfig'

export const businessUserActionType = {
    SET_BUSINESS_USER_INFO: 'SET_BUSINESS_USER_INFO',
    CLEAR_BUSINESS_USER_INFO: 'CLEAR_BUSINESS_USER_INFO',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS'
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

export const fetchOrders = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/orders')
            dispatch({type: businessUserActionType.FETCH_ORDERS_SUCCESS, payload: response.data.orders})
        } catch (error) {
            dispatch({type: 'FETCH_ORDERS_FAILURE', payload: error})
        }
    }
}
