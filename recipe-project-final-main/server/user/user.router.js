const express = require('express');

userRouter = express.Router();

const userService = require('./user.service');
const recipeService = require('../recipe/recipe.service');

userRouter.post('/', async (req, res) => {
    try {
        let result = await userService.addNewUser(req.body);
        console.log(result);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
})


userRouter.post('/find', async (req, res) => {
    const lName = req.body.lName;
    const fName = req.body.fName;
    const password = req.body.password;
    const filter = { lName, fName, password }
    console.log(filter);
    try {
        let result = await userService.readUser(filter);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
})



userRouter.post('/add/favoriteRecipe', async (req, res) => {
    let email = req.body.email;
    let recipe = req.body.recipe;
    try {
        let result = await userService.addRecipe({ email }, { recipe });
        console.log(result, 111);
        res.send(result);
    }
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
    // }
})


userRouter.post('/delete/favorite', async (req, res) => {
    try {
        const userId = req.body.userId;
        const recipeName = req.body.recipeName;
        const result = await userService.deleteFavorite({ userId, recipeName });
        console.log(result, "result");
        res.send({ message: 'המתכון נמחק בהצלחה' });
    } catch (error) {
        console.error(error);
        res.status(500).send('שגיאה במחיקת המתכון');
    }
});


userRouter.delete('/:id', async (req, res) => {
    try {
        let result = await userService.deleteUser(req.params.id);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.get('/all/:id', async (req, res) => {
    try {
        let user = await userService.allFavorite(req.params.id);
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})





userRouter.get('/all/favorite/:email', async (req, res) => {
    try {
        console.log(req.params.email);
        let user = await userService.readUser({ email: req.params.email });
        let result = user.favorite;
        let response = [];
        let getResult = result.map((data, index) => {
            async () => {
                console.log(data);
                let temp = await recipeService.readOneByName(data.recipe)
                response.push(temp);
                console.log(temp);
            }
        })
        res.send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})


// userRouter.put('/views/update', async (req, res) => {
//     console.log("robin isn't defined");
//     try {
//         let user = await recipeService.readOne(id);
//         let views = user.views;
//         console.log(views);
//         let response = await recipeService.
//         res.send(response);
//     }
//     catch (error) {
//         res.status(400).send(error.message);
//     }
// })

userRouter.post('/search/byName', async (req, res) => {
    try {
        const { name } = req.body;
        let result = await recipeService.readAll(name);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})


module.exports = { userRouter };