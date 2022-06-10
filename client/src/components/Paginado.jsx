import React from "react";
import style from '../modulesCss/paginado.module.css';

export default function Paginado({recipesPerPage, allRecipes, paginado}){
    const pageNumbers = []

    for( let i=0; i<=Math.ceil(allRecipes/recipesPerPage); i++){
        pageNumbers.push(i+1)
    }

    return(
        <nav>
            <ul className={style.paginado}>
                {
                    pageNumbers && pageNumbers.map(number =>(
                        <li  key={number} className={style.li} >
                            <a className={style.button} onClick={() => paginado(number)}>{number}</a>
                        </li>
                    ))
                }
            </ul>
        </nav>
    )
}