const userController = require('./user.controller');


async function addNewUser(data) {

    if (!data?.email) throw { code: 400, message: "email input error" }

    let user = await userController.readOne({ email: data.email });
    if (user) throw { code: user.isActive ? 400 : 450, message: "user is exist" };

    let newUserMapped = await handelValidation(data);

    console.log(newUserMapped, " from service");
    let result = await userController.create(newUserMapped)
    return result;
}

async function handelValidation(reqBody) {
    //validaiton
    // password > 6 digits / a-z + numbers
    return {
        lName: reqBody.lName,
        fName: reqBody.fName,
        email: reqBody.email,
        password: reqBody.password
    }
}



async function readUser(filter = {}) {
    // const filter={lName,fName};
    console.log(filter);
    let user = await userController.readOne(filter);
    return user;
}


async function deleteUser(id) {
    let user = await userController.readOne({ _id: id });
    if (user) userController.del(id);
    return;
}



async function addRecipe(email, data) {
    const dataUpdate = { $addToSet: { "favorite": data } }
    let result = await userController.upDate(email, dataUpdate);
    return result;
}


async function deleteFavorite(filter) {
 console.log(filter , "from service");
    let result = await userController.delFavorite(filter);
    return result;
}




module.exports = {
    addNewUser,
    readUser,
    addRecipe,
    deleteUser,
    deleteFavorite
}