import {jwtDecode} from 'jwt-decode'
import axiosInstance from '../../axiosConfig'

export const businessUserActionType = {
    SET_BUSINESS_USER_INFO: 'SET_BUSINESS_USER_INFO',
    CLEAR_BUSINESS_USER_INFO: 'CLEAR_BUSINESS_USER_INFO',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    SET_ORDERS_SEARCH_TERM: 'SET_ORDERS_SEARCH_TERM',
    SET_DATE_SELECTION: 'SET_DATE_SELECTION'
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

export const fetchOrders = (page, pageSize, searchTerm, startDate, endDate) => {
    return async dispatch => {
        try {
            let url = `/orders?page=${page}&limit=${pageSize}`
            if (searchTerm) {
                url += `&search=${encodeURIComponent(searchTerm)}`
            }
            if (startDate) {
                url += `&startDate=${encodeURIComponent(startDate)}`
            }
            if (endDate) {
                url += `&endDate=${encodeURIComponent(endDate)}`
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

export const fetchDashboardData = days => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/business-users', {params: {days}})
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

export const setDateSelection = (startDate, endDate) => {
    return async dispatch => {
        dispatch({
            type: businessUserActionType.SET_DATE_SELECTION,
            payload: {startDate: startDate, endDate: endDate}
        })
    }
}
