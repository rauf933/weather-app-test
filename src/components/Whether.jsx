
/*---Styles----*/
import classes from '../styles/weather-content.module.css'

/*----Icons---*/
import {
    BrokenClouds,
    ClearSky,
    FewClouds,
    Mist,
    Rain,
    ScatteredClouds,
    ShowerRain,
    Snow,
    Thunderstorm
} from "./icons/Icons-pack";


function Weather({data, loading}){

    const setIcon = (code)=>{
        if(code>=200&&code<=232) return <Thunderstorm />
        else if(code>=300&&code<=321) return <ShowerRain />
        else if(code>=500&&code<=504) return <Rain />
        else if(code===511) return <Snow />
        else if(code>=520&&code<=531) return <Snow />
        else if(code>=600&&code<=622) return <ShowerRain />
        else if(code>=701&&code<=781) return <Mist/>
        else if(code===800) return <ClearSky />
        else if(code===801) return <FewClouds />
        else if(code===802) return <ScatteredClouds />
        else if(code>=803&&code<=804) return <BrokenClouds/>
        else return null

    }

    return(
        <div className={classes['weather']}>
            {loading
                ?(<p>Loading...</p>)
                :(<>{data?(
                    <div className={classes['weather__content']}>
                        <div className={classes['weather__content_temp']}>
                            <div>
                                <div className={classes['weather__content_temp_icon']}>
                                    {setIcon(data.icon)}
                                </div>
                                <span>{data.temp?Math.ceil(data.temp):''} <sup>º</sup></span>
                            </div>
                            <p>{data.description}</p>
                        </div>
                        <div className={classes['weather__content_description']}>
                            <div>
                                <p>Ветер</p>
                                <p>{Math.ceil(data.wind)} м/c</p>
                            </div>
                            <div>
                                <p>Давление</p>
                                <p>{data.pressure} мм.рт.ст</p>
                            </div>
                            <div>
                                <p>Влажность</p>
                                <p>{data.humidity} %</p>
                            </div>
                            <div>
                                <p>Вероятность дождя</p>
                                <p>{data.clouds} %</p>
                            </div>
                        </div>
                    </div>
                ):''}</>)
            }
        </div>
    )
}



export default Weather;
