const express = require('express');

userRouter = express.Router();

const userService = require('./user.service');


userRouter.post('/', async (req, res) => {
    try {
        let result = await userService.addNewUser(req.body);
        res.send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})

userRouter.post('/find', async (req, res) => {
    const { lName, fName, password } = req.body;

    if (!fName || !lName || !password) {
        return res.status(400).send("שדות חסרים");
    }

    try {
        let result = await userService.readUser({ fName, lName, password });
        if (!result) return res.status(400).send("משתמש לא נמצא");
        res.send(result);
    } catch (error) {
        res.status(400).send(error.message);
    }
});





userRouter.post('/add/favoriteRecipe', async (req, res) => {
    let email = req.body.email;
    let recipe = req.body.recipe;
    try {
        let result = await userService.addRecipe({ email }, { recipe });
        res.send(result);
    }
    catch (error) {
        res.status(400).send(error.message);
    }
})


userRouter.post('/delete/favorite', async (req, res) => {
    try {
        const userId = req.body.userId;
        const recipeName = req.body.recipeName;
        await userService.deleteFavorite({ userId, recipeName });
        res.send({ message: 'המתכון נמחק בהצלחה' });
    } catch (error) {
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



module.exports = { userRouter };