import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {Link, useNavigate} from 'react-router-dom';
import { getDietsDB, postData } from "../actions";
import style from '../modulesCss/createRecipe.module.css';


function validate(input) {
    let errors = {};
    if(!input.title){
        errors.title = 'Titulo obligatorio';
    } else if (input.healthScore > 100) {
        errors.healthScore = "El score debe ser menor a 100";
    }else if(!input.summary){
        errors.summary = 'Ambito obligatrio';
    } 
    return errors;

}

export default function RecipeCreate(){
    const dispatch = useDispatch()
    const diets = useSelector((state) => state.diets)
    const history = useNavigate()
    const [errors, setErrors] = useState({});


    const [input, setInput] = useState({
        title:"",
        healthScore:"",
        summary:"",
        image:"",
        steps:"",
        diet: []
    })


    function handleDelete(el){
        setInput({
            ...input,
            diet: input.diet.filter(di => di !== el)
        })
    }
   

    function handleChange(e){
        setInput({...input,
             [e.target.name] : e.target.value
            })
        setErrors(
            validate({
                ...input,
                 [e.target.name]: e.target.value
                })
                )
        console.log(input, '<------console.log handleChange')
    }

    function handleSelect(e){
        setInput({
            ...input,
            diet: [...input.diet, e.target.value]
        })
        console.log(input.diet,'<-----console.log handleSelect')
    }

    function handleSubmit(e){
        e.preventDefault();
        console.log(input, '<----console.log handleSudmit')
        dispatch(postData(input))
        alert('Receta creada')
        setInput({
            title:"",
            healthScore:"",
            summary:"",
            image:"",
            steps:"",
            diet: []
        })
        history('/home');
    }

    useEffect(() => {
        dispatch(getDietsDB());
    }, []);

    return(
        <div className={style.contains} >
            <Link to='/home'><button className={style.buttonHome}>Return</button></Link>
            <h1>Create Recipe</h1>
            <form className={style.form} onSubmit={(e) => {handleSubmit(e)}}>
                <div>
                    <label>Recipe title:</label>
                    <input className={style.input}
                    type='text'
                    value= {input.title}
                    name = 'title'
                    onChange={(e) =>handleChange(e)}
                    />
                  
                    {
                       errors.title && (<p> {errors.title}</p>)
                    }
                </div>
                <div>
                    <label>HelthScore:</label>
                    <input className={style.input}
                    type='integer'
                    value= {input.healthScore}
                    name= 'healthScore'
                    onChange={(e) =>handleChange(e)}
                    />
                    {
                       errors.healthScore && (<p> {errors.healthScore}</p>)
                    }
                </div>
                <div>
                    <label>Summary:</label>
                    <input className={style.summary}
                    type='text'
                    value=  {input.summary}
                    name='summary'
                    onChange={(e) =>handleChange(e)}
                    />
                     {
                       errors.summary && (<p> {errors.summary}</p>)
                    }
                </div>
                <div>
                    <label>Image:</label>
                    <input className={style.input}
                    type='text'
                    value= {input.image}
                    name='image'
                    placeholder="URL image"
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <select className={style.diets} onChange={(e) =>handleSelect(e)}>
                    {
                        diets.map((d) => (
                            <option value={d.name}>
                                {d.name}
                            </option>
                        ))
                    }
                </select>
                <div>
                    <label>Instructions:</label>
                    <input className={style.steps}
                    type='textarea'
                    value= {input.steps}
                    name='steps'
                    onChange={(e) =>handleChange(e)}
                    />
                </div>
                <br/>
              
                <button  className={style.buttonCreate} type='submit'>Create Recipe</button>
            </form>
            <ul>
                    <li>
                        {input.diet.map(el =>
                            <div className={style.subcontains}>
                                <p>{el}</p>
                                <button className={style.buttonDelete} onClick={()=>handleDelete(el)}>x</button>
                            </div>    
                            )}
                    </li>
                </ul>
        </div>
    )
}