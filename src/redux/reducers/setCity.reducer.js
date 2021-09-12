
const cityReducer = (state=null, action)=>{
    switch(action.type){
        case 'set_city':
            return action.payload
        default:
            return state
    }
}

export default cityReducer


