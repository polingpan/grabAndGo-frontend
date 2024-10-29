import {combineReducers} from 'redux'
import {businessUserReducer} from './businessuser/businessUserReducer'

export const rootReducers = combineReducers({
    businessUser: businessUserReducer
})
