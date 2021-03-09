  
import { combineReducers } from 'redux'

import cartReducer from './CartReducers'

const allReducer = combineReducers({
    carts: cartReducer
})

export default allReducer