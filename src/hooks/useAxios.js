import {useState, useCallback} from 'react'
import axios from 'axios'


export function useAxios(){

    const [loading, setLoading] = useState(false)
    const [error, setError] = useState(null)


    const resetErr = ()=>{
        setError(null)
    }



    const request = useCallback(async(url, method='GET', data=null, headers={})=>{

        setLoading(true)
        const instance = axios.create({
            withCredentials: true
        })



        await instance.interceptors.request.use(request=>{
                return request
            },
            error=>{
                return Promise.reject(error)
            })


        await instance.interceptors.response.use(response=>{
                setLoading(false)
                return response
            },
            error=>{

                setLoading(false)
                const {response} = error

                if(response && response.status){
                    switch(response.status){
                        case 400:
                            setError(response.data)
                            break;
                        case 401:
                            setError(response.data)
                            console.log('401')
                            break;
                        case 403:
                            console.log('403')
                            break;
                        case 404:
                            setError(response.data)
                            console.log('404')
                            break;
                        case 500:
                            setError(response.data)
                            console.log('500')
                            break;
                        default:
                            break;
                    }
                }else{
                    if(error){
                        console.log('error server')
                    }
                }
                return Promise.reject(error)

            })


        return await instance({
            method,
            url,
            data,
            headers
        })







    }, [])

    return {request, loading, error, resetErr}
}
