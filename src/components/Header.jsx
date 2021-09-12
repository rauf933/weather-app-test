import {useState, useEffect, useRef} from "react";


/*------Styles----*/
import classes from '../styles/header.module.css'


/*---Constants-----*/
import {Celsius, Fahrenheit} from "../constants";


/*----Components---*/
import DropDownList from "./Drop-down-list";


/*---Icons---*/
import {Location} from "./icons/Icons-pack";


/*----Redux---*/
import {useSelector} from "react-redux";


export default function Header({setCity, getWeather}){

    const objCity = useSelector((state)=>state.city)

    const [changeCity, setChangeCity] = useState(false)
    const [defineCity, setDefineCity] = useState(true)
    const buttonAcceptCity = useRef(null)



    useEffect(()=>{
        if(!localStorage.getItem('city')){
            getGeolocation()
        }else{
            setCity(JSON.parse(localStorage.getItem('city')))
            setDefineCity(false)
        }
    }, [])


    /*-----Get Geo Location -----*/
    var options = {
        enableHighAccuracy: true,
        timeout: 5000,
        maximumAge: 0
    };


    const getGeolocation = ()=>{
        navigator.geolocation.getCurrentPosition(success, error, options)
    }


    async function success(pos) {
        var crd = pos.coords;
        getWeather(crd.latitude, crd.longitude, objCity?objCity.units:Celsius)
    }

    function error(err) {
        alert('Сделайте разрешение для получения ваших гео данных в настройках вашего браузера')
    }

    return(
        <header>
            <div className={classes['header']}>
                <div className={classes['header__top']}>
                    <div className={classes['header__top_city']}>
                        <div className={!objCity||defineCity?'d-none':''}>
                            {changeCity
                                ?<DropDownList setCity={setCity} setChangeCity={setChangeCity}/>
                                :<h1>{objCity?objCity.city:''}</h1>
                            }
                        </div>

                        {objCity&&defineCity?(<button onClick={()=>{
                            buttonAcceptCity.current.classList.add('d-none')
                            setDefineCity(false)
                            setCity(objCity)
                        }} ref={buttonAcceptCity} className={classes['button_accept']}>{objCity.city}  <span>ok</span></button>):''}
                    </div>
                    <div className={`${classes['header_top_units']}`}>
                        {
                            objCity?(
                                <div>
                                    <button
                                        className={objCity.units===Celsius?classes['active']:''}
                                        onClick={()=>{
                                            setCity({
                                                units: Celsius,
                                                lat: objCity.lat,
                                                lon: objCity.lon,
                                                city: objCity.city,
                                                weather: objCity.weather
                                            })
                                        }}
                                    >С</button>

                                    <button
                                        className={objCity.units===Fahrenheit?classes['active']:''}
                                        onClick={()=>{
                                            setCity({
                                                units: Fahrenheit,
                                                lat: objCity.lat,
                                                lon: objCity.lon,
                                                city: objCity.city,
                                                weather: objCity.weather
                                            })
                                        }}>F</button>
                                </div>
                            ):''
                        }
                    </div>
                </div>
            </div>
            <div className={!objCity||defineCity?'d-none':classes['header__bot']}>
                <button onClick={()=>setChangeCity(true)}>Сменить город</button>
                <button onClick={()=>getGeolocation()} className={classes['header__bot_defineLocation']}>
                    <Location /> <span>Мое местоположение</span>
                </button>
            </div>
        </header>
    )
}
