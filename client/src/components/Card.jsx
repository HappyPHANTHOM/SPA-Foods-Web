import React from 'react';
import style from "../modulesCss/card.module.css";

export default function RecipeCard({ title, image, diet, healthScore}){
    return (
        <div className={style.card}>

            <img  className={style.image} src={image} alt='img not found' width='200px' height='250px'/>
            <h3>{title}</h3>
            <h3>{healthScore}</h3> 
             {
             diet?.map( d => (<h5 className={style.diet}>{d.name}</h5>))
             }
        </div>
    )
}