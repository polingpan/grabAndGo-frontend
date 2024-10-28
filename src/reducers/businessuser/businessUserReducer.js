import {businessUserActionType} from '../../actions/businessUser/businessUserAction'

const initialState = {
    storeInfo: {storeName: null, email: null}
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
        default:
            return state
    }
}
