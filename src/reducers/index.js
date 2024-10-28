import {combineReducers} from 'redux'
import {businessUserReducer} from './businessuser/businessUserReducer'
import {productReducer} from './product/productReducer'

export const rootReducers = combineReducers({
    businessUser: businessUserReducer,
    product: productReducer
})
