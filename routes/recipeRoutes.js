const express = require('express')
const router = express.Router()
const recipeController = require('../controllers/recipeController')
const authMiddleware = require('../middlewares/authMiddleware')

router.post('/', authMiddleware, recipeController.createRecipe)//admin
router.get('/', recipeController.getAllRecipes)
router.get('/:id', recipeController.getRecipeById)
router.put('/:id',authMiddleware, recipeController.updateRecipeById)//admin
router.delete('/:id', authMiddleware, recipeController.deleteRecipeById)//admin

router.post('/:id/rate', recipeController.rateRecipe)//rating

module.exports = router
