import React from 'react';
import { Link, useParams} from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';
import style from '../modulesCss/detail.module.css';

export default function Detail(){
    

    const dispatch = useDispatch();
    const { id } = useParams();

     useEffect(()=> {
         dispatch(getDetail(id));
     }, [dispatch])

     const myRecipe = useSelector((state) => state.detail)
     const myRecipa = useSelector((state) => state.detail)

     return(
         <div className={style.contains}>

            <Link to='/home'>
                <button className={style.button} >HOME</button>
            </Link>

             <div className={style.borde}>
             {
                 myRecipe.length > 0 ?
                 <div>
                    <div>
                        <h1 className={style.h1} >{myRecipe[0].title && myRecipe[0].title}</h1>
                        <img className={style.img} src={myRecipe[0].img? myRecipe[0].img : myRecipe[0].image}/>
                    </div>
                    <div>
                        <h5 className={style.titles}>Tipo de dieta:</h5> 
                        <h2>{myRecipe[0].diet ? myRecipe[0].diet.map(el => el.name.toUpperCase() + ', ') : myRecipe[0].diets.map(el => el.name.toUpperCase() + ', ')}</h2>
                    </div>
                    <div>
                        <h5 className={style.titles}>Health Score:</h5>
                        <h2>{myRecipe[0].healthScore && myRecipe[0].healthScore}</h2>
                    </div>
                    <div>
                        <h5 className={style.titles} >Summary:</h5>
                        <h2> <div dangerouslySetInnerHTML={{__html: myRecipe[0].summary }} /> </h2>
                    </div>
                    <div>
                        <h5 className={style.titles} >Steps:</h5>
                        <h4 className={style.steps} >{ Array.isArray(myRecipe[0].steps) ? myRecipe[0].steps.map(e => e.step) : myRecipe[0].steps}</h4>
                    </div>
                 </div>  : <p>LOADING...</p>
            }
            </div>
         </div> 
     )
}