import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { getRecipesByTitle } from "../actions";
import style from '../modulesCss/searchBar.module.css';

export default function SearchBar (){
    const dispatch = useDispatch()
    const [name, setName] = useState('')

    function handleInputChange(e){
        e.preventDefault()
        setName(e.target.value)
        console.log(name)
    }
    function handleSubmit(e){
        e.preventDefault()
        dispatch(getRecipesByTitle(name))
    }

    return (
        <div className={style.contains}>
            <input className={style.input}
            type= 'text'
            placeholder="Search..."
            onChange={(e) => handleInputChange(e)}
            />
            <button type='submit' className={style.btnSearch} onClick={(e) => handleSubmit(e)}>Search</button>
        </div>
    )
}