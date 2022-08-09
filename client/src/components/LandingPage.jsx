import React from 'react';
import {Link} from 'react-router-dom';
import style from  "../modulesCss/landing.module.css";

export default function LandingPage(){
    return(
        <div className={style.full} >
            <h1 className={style.title} >Welcome!</h1>
            <Link to='/home'>
                <button className={style.button} >Click me</button>
            </Link>
        </div>
    )
}