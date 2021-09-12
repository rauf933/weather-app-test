import './App.css';


/*----Components----*/
import Header from "./components/Header";
import Weather from "./components/Whether";

/*----Hooks----*/
import {useAxios} from './hooks/useAxios'


/*----Redux----*/
import {connect} from 'react-redux'
import {setCity} from "./redux/actions/setCity.action";


function App({setCity, city}) {

    const {request, loading} = useAxios()


    const getWeather = async(lat, lon, units)=>{
        const key = '1796cfd0d540517caa27f805d5c3ed3a'
        await request(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${key}&units=${units}`)
            .then(result=>{

                const weather = {
                    temp: result.data.main.temp,
                    description: result.data.weather[0].description,
                    icon: result.data.weather[0].id,
                    wind: result.data.wind.speed,
                    pressure: result.data.main.pressure,
                    humidity: result.data.main.humidity,
                    clouds: result.data.clouds.all
                }

                setCity({city: result.data.name,lat,lon, units, weather})

            })
    }

    const selectCity = (data)=>{
        localStorage.setItem('city', JSON.stringify(data))
        getWeather(data.lat, data.lon, data.units);
        setCity(data)
    }


  return (
    <div className="container">
      <Header setCity={(data)=>selectCity(data)} getWeather={getWeather}/>
      <main>
          <Weather data={city?city.weather:null} loading={loading}/>
      </main>
    </div>
  );
}


const mapStateToProps = state=>({
    city: state.city
})

const mapDispatchToPRops = {
    setCity
}

export default connect(mapStateToProps, mapDispatchToPRops)(App)
