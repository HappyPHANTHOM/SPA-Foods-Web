const { Router } = require('express');
// const { getApiInfo, getDiets } = require('../controllers/foodController');
const typesRoute = require('./typesRoute');
const recipesRoute = require('./recipesRoute');
const postRecipe = require('./postRoute');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use('/recipes', recipesRoute);

router.use('/types', typesRoute );

router.use('/recipe', postRecipe);

module.exports = router;
