

export function setCity(city){
    return async function (dispatch){
        dispatch({type:'set_city', payload: city})
    }
}
