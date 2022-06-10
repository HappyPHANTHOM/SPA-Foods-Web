const { Router } = require('express');
const router = Router();
const  { Recipe, Diet } = require('../db');
// const Recipe = require('../models/Recipe');

router.post('/', async(req, res) => {
    let { title,  summary, diet, healthScore, steps, image, createDb } = req.body

    try {
        let recipeCreated = await Recipe.create ({
            title, 
            summary,
            diet,
            healthScore,
            steps,
             image,
            createDb
        })

        let dietDb = await Diet.findAll({
            where: { name: diet }
        })

        recipeCreated.addDiet(dietDb)
        res.send('Receta agregada con exito')
    } catch (error) {
        console.log(error);
    }

})

module.exports = router;