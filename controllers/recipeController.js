const {Recipe,User} = require('../models')
const npmlog = require('npmlog')
const authMiddleware = require('../middlewares/authMiddleware')

const recipeController={
    createRecipe: [authMiddleware,async (req, res) => {
        try {
            const{title,ingredients,rating} = req.body
            if (!req.user.role) {
                npmlog.warn('Create Recipe', 'Unauthorized access: User is not an admin');
                return res.status(403).json({ message: 'Unauthorized access' });
              }

            const newRecipe = await Recipe.create({
                title,
                ingredients,
                rating,
                userId: req.user.userId
            }) 
            npmlog.info('Create Recipe', `Recipe created successfully by Admin: ${newRecipe.title}`);
            res.status(201).json(newRecipe);

        } catch (error) {
            npmlog.error('Create Recipe', `Error creating recipe: ${error.message}`);
            console.error(error);
            res.status(500).json({ message: 'Internal Server Error' });
        }
    }],
    getAllRecipes:[authMiddleware, async (req, res) => {
        try {
            const recipes = await Recipe.findAll({include:User})
            res.status(200).json(recipes)

        } catch (error) {
            npmlog.error('Get All Recipes', `Error getting all recipes: ${error.message}`)
            console.error(error)
            res.status(500).json({message: 'Internal Server Error'})
        }
    }],
    getRecipeById: [authMiddleware,async (req, res) => {
        try {
          const recipeId = req.params.id;
    
          const recipe = await Recipe.findByPk(recipeId, { include: User });
    
          if (!recipe) {
            npmlog.warn('Get Recipe by ID', `Recipe not found with ID: ${recipeId}`);
            return res.status(404).json({ message: 'Recipe not found' });
          }
    
          res.status(200).json(recipe);
        } catch (error) {
          npmlog.error('Get Recipe by ID', `Error getting recipe by ID: ${error.message}`);
          console.error(error);
          res.status(500).json({ message: 'Internal Server Error' });
        }
    }],
    updateRecipeById: [authMiddleware, async (req, res) => {
      try {
        const recipeId = req.params.id
        const {title,ingredients,rating} = req.body

        if(!req.user.role || !req.user){
          npmlog.warn('Update Recipe by ID', 'Unauthorized access: User is not an admin')
          return res.status(403).json({ message: 'Unauthorized access' })
        }

        const updateRecipe = await Recipe.update(
          {title, ingredients, rating},
          {where: {id: recipeId}, returning: true}
        )
        if(!updateRecipe[0]){

          npmlog.info('Update Recipe by ID', `Recipe with ID: ${recipeId} successfully updated`)
          res.status(200).json({message: 'Recipe updated successfully'})
        }

      } catch (error) {
        npmlog.error('Update Recipe by ID', `Error updating recipe by ID: ${error.message}`)
        console.error(error)
        res.status(500).json({message: 'Internal Server Error'})
      }
    }],
    rateRecipe: [authMiddleware, async (req, res) => {
      try {
        const recipeId = req.params.id;
        const { rating } = req.body;
    
        const recipe = await Recipe.findByPk(recipeId);
    
        if (!recipe) {
          npmlog.warn('Rate Recipe', `Recipe not found with ID: ${recipeId}`);
          return res.status(404).json({ message: 'Recipe not found' });
        }
    
        const user = await User.findByPk(req.user.userId);
    
        if (!user) {
          npmlog.warn('Rate Recipe', `User not found with ID: ${req.user.userId}`);
          return res.status(404).json({ message: 'User not found' });
        }
    
        await user.addRecipe(recipe, { through: { rating } });
    
        npmlog.info('Rate Recipe', `Recipe rated successfully by User: ${req.user.userId}`);
        res.status(200).json({ message: 'Recipe rated successfully' });
      } catch (error) {
        npmlog.error('Rate Recipe', `Error rating recipe: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' });
      }
    }],
    deleteRecipeById:[authMiddleware, async (req, res) => {
      try {
        const recipeId =req.params.id

        if(!req.user.role){
          npmlog.warn('Delete Recipe by ID', 'Unauthorized access: User is not an admin')
          return res.status(403).json({ message: 'Unauthorized access' })
        }
        const deleteRecipe = await Recipe.destroy({where: {id: recipeId}})
        if(!deleteRecipe){
          npmlog.info('Delete Recipe by ID', `Recipe not found with ID: ${recipeId}`)
          return res.status(404).json({message: 'Recipe not found'})
        }

        npmlog.info('Delete Recipe by ID', `Recipe deleted successfully by admin: ${recipeId}`)
        res.status(200).json({message: 'Recipe deleted successfully'});
      } catch (error) {
        npmlog.error('Delete Recipe by ID', `Error deleting recipe by ID: ${error.message}`);
        console.error(error);
        res.status(500).json({ message: 'Internal Server Error' })
      }
    }]
}
module.exports = recipeController