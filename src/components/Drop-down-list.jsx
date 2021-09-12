import {useRef} from 'react';
/*----Styles----*/
import classes from '../styles/dropdown.module.css'

/*-----Redux ----*/
import {useSelector} from "react-redux";


/*-----Country Data -----*/
const countries = require('../ru.json')



export default function DropDownList({setCity, setChangeCity}){

    const objCity = useSelector(state=>state.city)
    const input = useRef(null);
    const dropDown = useRef(null);

    function myFunction() {
        dropDown.current.classList.toggle(classes['show']);
    }

    function filterFunction() {
        let filter = input.current.value.toUpperCase();
        let p = dropDown.current.getElementsByTagName("p");
        for (let i = 0; i < p.length; i++) {
            let txtValue = p[i].textContent || p[i].innerText;
            if (txtValue.toUpperCase().indexOf(filter) > -1) {
                p[i].classList.remove('d-none');
            } else {
                p[i].classList.add('d-none');
            }
        }
    }

    const selectCity = (data)=>{
        setCity(data)
        setChangeCity(false)
        myFunction()
    }


    return(
        <div className={classes['dropdown']}>
            <button onClick={myFunction} className={classes['dropdown__button']}>Выбрать город</button>
            <div ref={dropDown} className={classes['dropdown__content']}>
                <input type="text" placeholder="Search.." ref={input} onKeyUp={filterFunction} />
                {
                    countries.map((item,index)=>{
                        return(
                            <p key={index} onClick={()=>selectCity({
                                city: item.city,
                                lat: item.lat,
                                lon: item.lng,
                                units: objCity.units,
                                weather: objCity.weather
                            })}>{item.city}</p>
                        )
                    })
                }
            </div>
        </div>
    )
}
