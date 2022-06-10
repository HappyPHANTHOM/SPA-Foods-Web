const { Router } = require('express');
const router = Router();
const { getDiets } = require('../controllers/foodController');

router.get('/',  async (req, res) => {
    try {
        let typeDiet = await getDiets();
        res.json(typeDiet);
    } catch (error) {
        res.status(404).send(error);
    }
})

module.exports = router;