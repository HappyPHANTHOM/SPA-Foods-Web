const axios = require('axios');
const { Diet, Recipe } = require('../db');

// const getApiInfo =  async () => {
//     try {
//         let info = [];
//         for (let i = 1; i <= 3; i++) {
//             info.push(axios.get(`https://api.spoonacular.com/recipes/${i}/information?apiKey=f00aeb35411c4e72ac86c1dafdee2936` ))
//         }
//         // console.log(info)
//             return await Promise.all(info).then(res => {
//                 const foods = res.map(e => {
//                     return {
//                         title: e.data.title,
//                         diet: e.data.diets,
//                         healthScore: e.data.healthScore,
//                         summary: e.data.summary,
//                         instruction: e.data.instructions
//                     }
//                 });
//                 return foods;
//              })

//     } catch (error) {
//         console.log(error);
//      }
// };

const getApiInfo = async () => {
    try {
        const info = await axios.get('https://api.spoonacular.com/recipes/complexSearch?apiKey=86f997b9689649b7b5e2b091878a8cb6&addRecipeInformation=true&number=100')
        // console.log(info.data.results);   
        const recipes = info.data.results.map(e => {
            return {
                id: e.id,
                title: e.title,
                image: e.image,
                diet: e.diets.map((d)=>{return { name: d }}),
                healthScore: e.healthScore,
                summary: e.summary,
                steps: e.analyzedInstructions[0]?.steps.map( e => {
                    return {
                        // number: e.number,
                        step: e.step
                    }
                })
            }
        })
        return recipes;
    } catch (error) {
        console.log(error)
    }
}
// getApiInfo();

const foodsDB = async () => {
    try {
        return await Recipe.findAll({
            include:{
                model: Diet,
                attributes: ['name'],
                through: {
                    attributes:[],
                }
            }
        })
    } catch (error) {
        console.log(error)
    }
};

const allFoods = async  () => {
    try {
        let info1  =  await getApiInfo();
        let info2 =  await foodsDB();
        let infoTotal = info1.concat(info2);
        
        return infoTotal;
    } catch (error) {
        console.log(error)
    }
};

allFoods();

const getDiets = async () => {
    const fullDiets =  [
        "gluten free",
        "dairy free",
        "paleolithic",
        "ketogenic",
        "lacto ovo vegetarian",
        "vegan",
        "pescatarian",
        "primal",
        "fodmap friendly",
        "whole 30",
    ]
    // console.log(fullDiets);
    fullDiets.forEach( info => {
        Diet.findOrCreate({
            where: {
                name: info
            }
        })
    })

    const allDiets = await Diet.findAll();
    return allDiets

};
// getDiets();

module.exports = { getApiInfo, foodsDB, allFoods, getDiets };