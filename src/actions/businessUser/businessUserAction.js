import {jwtDecode} from 'jwt-decode'
import axiosInstance from '../../axiosConfig'

export const businessUserActionType = {
    SET_BUSINESS_USER_INFO: 'SET_BUSINESS_USER_INFO',
    CLEAR_BUSINESS_USER_INFO: 'CLEAR_BUSINESS_USER_INFO',
    FETCH_ORDERS_SUCCESS: 'FETCH_ORDERS_SUCCESS',
    FETCH_DATA_SUCCESS: 'FETCH_DATA_SUCCESS',
    SET_ORDERS_SEARCH_TERM: 'SET_ORDERS_SEARCH_TERM',
    SET_DATE_SELECTION: 'SET_DATE_SELECTION',
    FETCH_TODAY_PICKUP_ORDER: 'FETCH_TODAY_PICKUP_ORDER',
    UPDATE_ORDER_STATUS: 'UPDATE_ORDER_STATUS'
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

export const fetchTodayPickupOrder = () => {
    return async dispatch => {
        try {
            const response = await axiosInstance.get('/orders/today')
            dispatch({
                type: businessUserActionType.FETCH_TODAY_PICKUP_ORDER,
                payload: response.data.orders
            })
        } catch (error) {
            console.error(error.message)
        }
    }
}

export const updateOrderStatus = orderId => {
    return async dispatch => {
        try {
            const response = await axiosInstance.put('/orders/status', null, {params: {orderId: orderId}})
            const updatedOrder = response.data.order
            dispatch({type: businessUserActionType.UPDATE_ORDER_STATUS, payload: response.data.order})
            return {success: true, message: response.data.message}
        } catch (error) {
            console.error(error)
            return {success: false, message: error.response?.data?.message}
        }
    }
}
