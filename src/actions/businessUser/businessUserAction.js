import {jwtDecode} from 'jwt-decode'
import axiosInstance from '../../axiosConfig'

export const businessUserActionType = {
    SET_BUSINESS_USER_INFO: 'SET_BUSINESS_USER_INFO',
    CLEAR_BUSINESS_USER_INFO: 'CLEAR_BUSINESS_USER_INFO',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    SET_ORDERS_SEARCH_TERM: 'SET_ORDERS_SEARCH_TERM'
}

export const setBusinessUserInfo = token => dispatch => {
    const decoded = jwtDecode(token)

    dispatch({
        type: businessUserActionType.SET_BUSINESS_USER_INFO,
        payload: {
            email: decoded.email,
            storeName: decoded.name,
            storeAddress: decoded.storeAddress,
            phoneNumber: decoded.phoneNumber
        }
    })
}

export const businessLogout = () => ({
    type: businessUserActionType.CLEAR_BUSINESS_USER_INFO
})

export const fetchOrders = (page, pageSize, searchTerm) => {
    return async dispatch => {
        try {
            let url = `/orders?page=${page}&limit=${pageSize}`
            if (searchTerm) {
                url += `&search=${encodeURIComponent(searchTerm)}`
            }
            const response = await axiosInstance.get(url)
            dispatch({
                type: businessUserActionType.FETCH_ORDERS_SUCCESS,
                payload: {
                    orders: response.data.orders,
                    totalOrders: response.data.totalOrders
                }
            })
        } catch (error) {
            dispatch({type: 'FETCH_ORDERS_FAILURE', payload: error})
        }
    }
}

export const fetchDashboardData = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/business-users')
            dispatch({type: businessUserActionType.FETCH_DATA_SUCCESS, payload: response.data.data})
        } catch (error) {
            dispatch({type: 'FETCH_DATA_FAILURE', payload: error})
        }
    }
}

export const setOrdersSearchTerm = searchTerm => {
    return async dispatch => {
        dispatch({type: businessUserActionType.SET_ORDERS_SEARCH_TERM, payload: searchTerm})
    }
}
