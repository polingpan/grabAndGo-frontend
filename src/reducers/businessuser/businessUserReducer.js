import {businessUserActionType} from '../../actions/businessUser/businessUserAction'

const initialState = {
    storeInfo: {storeName: null, email: null},
    orders: [],
    dashboardData:[]
}

export const businessUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case businessUserActionType.SET_BUSINESS_USER_INFO:
            return {
                ...state,
                storeInfo: {
                    ...state.storeInfo,
                    email: action.payload.email,
                    storeName: action.payload.storeName
                }
            }
        case businessUserActionType.CLEAR_BUSINESS_USER_INFO:
            return initialState

        case businessUserActionType.FETCH_ORDERS_SUCCESS:
            return {
                ...state,
                orders: action.payload
            }

        case businessUserActionType.FETCH_DATA_SUCCESS:
            return{
                ...state,
                dashboardData: action.payload
            }
        default:
            return state
    }
}
