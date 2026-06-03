const recipeService = require('./recipe.service');
const exprees = require('express');
recipeRouter = exprees.Router();


recipeRouter.get('/all/tags', (req, res) => {
    recipeService.getAllTags()
        .then(response => {
            let allTags = [];
            if (response) {
                allTags = response.map(recipe => recipe.tags).flat();
                let uniqueTags = [...new Set(allTags)];
                const sortedTags = uniqueTags.sort((a, b) => a.localeCompare(b));
                res.send(sortedTags);
            } else {
                res.send([]);
            }
        })
        .catch(error => {
            res.status(400).send(error.message);
        });
});

recipeRouter.get('/:recipeId', async (req, res) => {
    try {
        let recipe = await recipeService.readOne(req.params.recipeId);
        res.send(recipe);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

recipeRouter.post('/by/name', async (req, res) => {
    try {
        let recipe = await recipeService.readOneByName(req.body.name);
        res.send(recipe);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
})




//למצוא מתכון על פי שדה מסוים
recipeRouter.post('/find/by', async (req, res) => {
    try {
        let field = req.body.field;
        let filter = req.body.filter;
        let recipe = await recipeService.findBy(field, filter);
        res.send(recipe);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})


recipeRouter.post('/search', async (req, res) => {
    try {
        let filter = req.body.filter;
        let recipe = await recipeService.search(filter);
        res.send(recipe);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})




recipeRouter.post('/status/:isActive', async (req, res) => {
    let isActive = req.params.isActive;
    try {
        let data = await recipeService.readAll(isActive);
        res.send(data);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
});




recipeRouter.post('/add', async (req, res) => {
    try {
        let result = await recipeService.addNewRecipe(req.body.data);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

recipeRouter.put('/views/update', async (req, res) => {
    try {
        let response = await recipeService.updateViews(req.body.id);
        res.send(response);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})





recipeRouter.patch('/admin/update/:id', async (req, res) => {
    try {
        const recipeId = req.params.id;
        const updateData = req.body;
        const updatedRecipe = await recipeService.updateRecipeAndActivate(recipeId, updateData);

        if (!updatedRecipe) {
            return res.status(404).send({ message: 'Recipe not found' });
        }

        res.status(200).send(updatedRecipe);
    } catch (error) {
        res.status(500).send({ message: 'Server error', error });
    }
});



recipeRouter.delete('/admin/delete/:recipeId', async (req,res) => {
    try {
        const recipeId = req.params.recipeId;
        // קריאה לשירות המחיקה
        const result = await recipeService.deleteRecipeByAdmain(recipeId);
        console.log(result);
        if (result.deletedCount === 0) {
            // אם לא נמצא מתכון למחיקה
            return res.status(404).json({ success: false, message: 'Recipe not found' });
        }

        // מחיקה הצליחה
        res.status(200).json({ success: true, message: 'Recipe deleted successfully' });

    } catch (error) {
        // טיפול בשגיאה לא צפויה
        console.error('Error deleting recipe:', error);
        res.status(500).json({ success: false, message: 'An error occurred while deleting the recipe' });
    }
})


module.exports = { recipeRouter };

