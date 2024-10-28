import {productActionType} from '../../actions/product/productAction'

const initialState = {
    products: []
}

export const productReducer = (state = initialState, action) => {
    switch (action.type) {
        case productActionType.FETCH_PRODUCTS_SUCCESS:
            return {
                ...state,
                products: action.payload
            }
        case productActionType.DELETE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.filter(product => product._id !== action.payload)
            }
        case productActionType.ADD_PRODUCT_SUCCESS:
            return {
                ...state,
                products: [...state.products, action.payload]
            }
        case productActionType.UPDATE_PRODUCT_SUCCESS:
            return {
                ...state,
                products: state.products.map(product => (product._id === action.payload._id ? action.payload : product))
            }
        default:
            return state
    }
}
