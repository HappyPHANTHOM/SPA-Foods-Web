const { Router } = require('express');
const router = Router();
const { getApiInfo, allFoods } = require('../controllers/foodController');

router.get('/', async(req, res, next) => {
    const { name } = req.query;
    try {
        let infoFoods = await allFoods();
        if(name){
            let foodName = infoFoods.filter(e => e.title.toLowerCase().includes(name.toLowerCase()));
            if(foodName.length === 0){
                res.status(404).send('No se encontro Receta');
            } 
            else{
                res.status(200).send(foodName);
            }
        }else{
            res.status(200).json(infoFoods);
            
        }
    } catch (error) {
        next(error);
    }
})

router.get('/:id', async (req, res) => {
    const { id } = req.params;
    const recipesTotal = await allFoods();
//    console.log(recipesTotal.map(e => e.id));
    if(id){
        let food = recipesTotal.filter( el => el.id == id);
        // console.log(food);
        food.length?
        res.status(200).json(food):
        res.status(404).send('No se encontro ese id de receta')
    }
})



module.exports = router;