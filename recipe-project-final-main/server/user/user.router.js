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
    console.log("📩 req.body:", req.body); // חשוב מאוד

    const { lName, fName, password } = req.body;

    if (!fName || !lName || !password) {
        console.log("❌ אחד או יותר מהשדות ריקים");
        return res.status(400).send("שדות חסרים");
    }

    try {
        let result = await userService.readUser({ fName, lName, password });
        console.log("🟢 תוצאה מהקריאה למסד:", result);

        if (!result) return res.status(400).send("משתמש לא נמצא");
        res.send(result);
    } catch (error) {
        console.log("🔴 שגיאה:", error);
        res.status(400).send(error.message);
    }
});





userRouter.post('/add/favoriteRecipe', async (req, res) => {
    let email = req.body.email;
    let recipe = req.body.recipe;
    console.log(email);
    
    try {
        let result = await userService.addRecipe({ email }, { recipe });
        console.log(result, 111);
        res.send(result);
    }   
    catch (error) {
        console.log(error);
        res.status(400).send(error.message);
    }
  
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

userRouter.get('/all-users', async (req, res) => {
    try {
        const users = await userService.getAllUsers();
        res.send(users);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.patch('/:id/set-role', async (req, res) => {
    try {
        const { role } = req.body;
        const result = await userService.setUserRole(req.params.id, role);
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});

userRouter.get('/all/:id', async (req, res) => {
    try {
        let user = await userService.allFavorite(req.params.id);
        res.send(user);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})





// userRouter.get('/all/favorite/:email', async (req, res) => {
//   console.log("params:", req.params);

//   try {
//     const user = await userService.readUser({ email: req.params.email });
//     const favoriteList = user.favorite;

//     // map מחזיר מערך של Promises
//     const response = await Promise.all(
//       favoriteList.map(async (item) => {
//         console.log("favorite item:", item);
//         const recipe = await recipeService.readOneByName(item.recipe);
//         console.log("recipe:", recipe);
//         return recipe;
//       })
//     );

//     res.send(response);
//   } catch (error) {
//     console.error("Error:", error);
//     res.status(400).send(error.message);
//   }
// });



userRouter.put('/views/update', async (req, res) => {
    console.log("robin isn't defined");
    try {
        let user = await recipeService.readOne(id);
        let views = user.views;
        console.log(views);
        let response = await recipeService.
        res.send(response);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

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