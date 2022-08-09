import axios from 'axios';

export function getRecipes(){
    return async function(dispatch){
        var json = await axios.get('https://pifoods1.herokuapp.com/recipes')
        return dispatch({
            type: 'GET_RECIPES',
            payload: json.data
        })
    }
}

export function filterByDiet(payload){
    console.log(payload)
    return {
        type: 'FILTER_BY_DIET',
        payload
    }
}

export function orderByScore(payload){
    return { 
        type: 'ORDER_BY_SCORE',
        payload
    }
}

export function orderByTitle(payload){
    return {
        type: 'ORDER_BY_TITLE',
        payload
    }
}

export function getRecipesByTitle(payload){
    return async function (dispatch){
        try {
            var json = await axios.get(`https://pifoods1.herokuapp.com/recipes?name=${payload}`);
            return dispatch({
                type : 'GET_RECIPES_BY_TITLE',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

export function getDietsDB(){
    return async function(dispatch){
        var info = await axios('https://pifoods1.herokuapp.com/types',{

        })
        return dispatch({
            type: 'GET_DIETS', 
            payload: info.data
        });
    };
}

export function postData(payload){
    return async function(dispatch){
        const response = await axios.post('https://pifoods1.herokuapp.com/recipe',payload)
        console.log(response, '<-----post')
        return response;
    }
}

export function getDetail (id){
    return async function(dispatch){
        try {
            var json = await axios.get('https://pifoods1.herokuapp.com/recipes/' + id);
            return dispatch ({
                type: 'GET_DETAILS',
                payload: json.data
            })
        } catch (error) {
            console.log(error)
        }
    }
}

// export function getRecipesDB(){
//     return async function(dispatch){
//         var json = await axios.get('http://localhost:3001/recipes')
//         return dispatch({
//             type: 'GET_RECIPESDB',
//             payload: json.data
//         })
//     }
// }