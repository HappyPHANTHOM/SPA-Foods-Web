import React from 'react';
import {Link} from 'react-router-dom';
import style from  "../modulesCss/landing.module.css";

export default function LandingPage(){
    return(
        <div className={style.full} >
            <h1 className={style.title} >Bienvenidos a mi Paginon</h1>
            <Link to='/home'>
                <button className={style.button} >Clickeame</button>
            </Link>
        </div>
    )
}