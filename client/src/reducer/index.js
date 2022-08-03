const initialState = {
    recipes: [],
    allRecipes: [],
    diets: [],
    detail: [],
    // createDB: []
}

function rootReducer (state = initialState, action){
    switch(action.type){
        case 'GET_RECIPES':
            // console.log(action.payload)
            return {
                ...state,
                recipes : action.payload,
                allRecipes: action.payload
            }
        case 'FILTER_BY_DIET':
            const allRecipes= state.allRecipes //copia del estado
            const dietsFilter = action.payload === "All" ? state.allRecipes :
             allRecipes.filter(recipe => recipe.diet.find(d => {
              //console.log(diet)  
            if (d.name === action.payload) {
             return recipe
              }   
            }))
             return{
                ...state,
                recipes: dietsFilter
            } 
        case 'ORDER_BY_SCORE':
            let sortArr = action.payload === 'top-asc' ?
            state.recipes.sort(function (a, b){
                return a.healthScore - b.healthScore
            }) :
            state.recipes.sort(function(a, b){
                return b.healthScore - a.healthScore
            })
            return {
                ...state,
                recipes: sortArr
            }
        case 'ORDER_BY_TITLE':
            let sorte2Arr = action.payload === 'asc' ?
            state.recipes.sort(function (a, b){
                if(a.title > b.title){
                    return 1;
                }
                if(b.title > a.title){
                    return -1;
                }
                return 0;
            })  :
            state.recipes.sort(function(a, b){
                if(a.title > b.title){
                    return -1;
                }
                if(b.title > b.title){
                    return 1;
                }
            })
            return {
                ...state,
                recipes: sorte2Arr
            }
        case 'GET_RECIPES_BY_TITLE':
            return {
                ...state,
                recipes: action.payload
            }
        case 'POST_RECIPE':
            return {
                ...state,
            }
        case 'GET_DIETS':
            return {
                ...state,
                diets: action.payload
            }
        case 'GET_DETAILS':
            console.log(action.payload, '<----reducer get_details');
            return{
                ...state,
                detail: action.payload
            }
        // case 'GET_RECIPESDB':
        //     const all = state.recipes
        //     const datos = all.filter((e) => { e.createDb == true})
        //     return {
        //         ...state,
        //         createDB: datos
        //     }

        default: return state;
    }
}

export default rootReducer;