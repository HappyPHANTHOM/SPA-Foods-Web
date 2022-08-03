import React from 'react';
import {useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import { getRecipes, filterByDiet, orderByScore, orderByTitle } from '../actions';
import { Link } from 'react-router-dom';
import Card from './Card';
import Paginado from './Paginado';
import SearchBar from './SearchBar';
// import nuevaVista from './nuevaVista';
import style from '../modulesCss/home.module.css';

export default function Home (){

    const dispatch = useDispatch()
    const allRecipes = useSelector ( state => state.recipes)

    const [ orden, setOrden ] = useState('')
    //PAGINADO
    const [currentPage, setCurrentPage] = useState(1)
    const [recipesPerPage, setRecipesPerPage] = useState(9)
    const indexOfLastRecipe = currentPage * recipesPerPage
    const indexOfFirstRecipe = indexOfLastRecipe - recipesPerPage
    const currentRecipes = allRecipes.slice(indexOfFirstRecipe, indexOfLastRecipe)

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    useEffect(() => {
        dispatch(getRecipes())
    },[dispatch])

    function handleClick(e){
        e.preventDefault();
        dispatch(getRecipes());
    }

    function handleFilterDiet(e){
        dispatch(filterByDiet(e.target.value))
    }

    function handleFilterScore(e){
        dispatch(orderByScore(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }

    function handleFilterTitle(e){
        dispatch(orderByTitle(e.target.value))
        setCurrentPage(1);
        setOrden(`Ordenado ${e.target.value}`)
    }
    // console.log(allRecipes)
    return (
        <div className={style.container}>
            <Link  className={style.button2} to='/recipe'>Crear Receta</Link>
           <div> <h1 className={style.page} >Recetario</h1> </div>
            <button  className={style.button2} onClick={e => {handleClick(e)}}>
                Volver a cargar recetas
            </button>
            <div className={style.bordercont} >
                <h2>Tipo de Dieta</h2>
                <select className={style.select} onChange={e => handleFilterDiet(e)}>
                    <option value='All'>All</option>
                    <option value='gluten free'>Gluten free</option>
                    <option value='dairy free'>Dairy free</option>
                    <option value='paleolithic'>Paleolithic</option>
                    <option value='ketogenic'>Ketogenic</option>
                    <option value='lacto ovo vegetarian'>Lacto ovo vegetarian</option>
                    <option value='vegan'>Vegan</option>
                    <option value='pescatarian'>Pescatarian</option>
                    <option value='primal'>Primal</option>
                    <option value='fodmap friendly'>Fodmap friendly</option>
                    <option value='whole 30'>Whole 30</option>
                </select>
            </div>
            <div>
                <h2>Ordenamiento por puntaje</h2>
                <select className={style.select} onChange={e => handleFilterScore(e)}>
                    <option value='top-asc'>Asc</option>
                    <option value='top-desc'>Desc</option>
                </select>
            </div>
            <div>
                <select className={style.select} onChange={e => handleFilterTitle(e)}>
                    <option value='asc'>A-Z</option>
                    <option value='desc'>Z-A</option>
                </select>
            </div>
            <Paginado
                recipesPerPage={recipesPerPage}
                allRecipes={allRecipes.length}
                paginado = {paginado}
            />
            <SearchBar/>
            {/* <nuevaVista/> */}
            {
                currentRecipes?.map((e) => {
                    // console.log(e.id)
                 return (
                    <div className={style.cards} >
                    <Link className={style.link} to={'/recipes/' + e.id}>
                      <Card title={e.title} image={e.image} diet={e.diet} healthScore={e.healthScore} />
                    </Link>
                    </div>
                 ) 
                })
            }
        </div>
    )
}