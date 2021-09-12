import {combineReducers} from 'redux'
import cityReducer from "./setCity.reducer";


const rootReducers = combineReducers({
    city: cityReducer
})

export default rootReducers
