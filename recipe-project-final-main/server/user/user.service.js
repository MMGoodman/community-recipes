const userController = require('./user.controller');
const userModel = require('./user.module');


async function addNewUser(data) {
    if (!data?.email) throw { code: 400, message: "email input error" }

    let user = await userController.readOne({ email: data.email });
    if (user) throw { code: user.isActive ? 400 : 450, message: "המשתמש כבר קיים במערכת" };

    let newUserMapped = await handelValidation(data);

    const adminCount = await userModel.countDocuments({ admin: true });
    if (adminCount === 0) {
        newUserMapped.admin = true;
    }

    let result = await userController.create(newUserMapped);
    return result;
}

async function handelValidation(reqBody) {
    return {
        lName: reqBody.lName,
        fName: reqBody.fName,
        email: reqBody.email,
        password: reqBody.password
    };
}

async function readUser(filter = {}) {
    const cleanFilter = {
        fName: filter.fName?.trim(),
        lName: filter.lName?.trim(),
        password: filter.password?.trim(),
    };

    const user = await userModel.findOne({
        fName: new RegExp(`^${cleanFilter.fName}$`, 'i'),
        lName: new RegExp(`^${cleanFilter.lName}$`, 'i'),
        password: cleanFilter.password,
    });

    return user;
}

// הוספת מתכון למועדפים
async function addRecipe(filter, data) {
    const user = await userController.readOne(filter);
    if (!user) throw new Error('משתמש לא נמצא');
    const alreadyFav = user.favorite?.some(f => f.recipe === data.recipe);
    if (alreadyFav) throw new Error('המתכון כבר במועדפים');
    return await userController.upDate(filter, { $push: { favorite: data } });
}

// מחיקת מתכון ממועדפים
async function deleteFavorite({ userId, recipeName }) {
    return await userController.delFavorite({ userId, recipeName });
}

// קבלת רשימת המועדפים של משתמש לפי ID
async function allFavorite(id) {
    const user = await userController.readOne({ _id: id });
    return user ? (user.favorite || []) : [];
}

async function deleteUser(id) {
    return await userController.del(id);
}

async function getAllUsers() {
    return await userModel.find({}, { password: 0 });
}

async function setUserRole(userId, role) {
    const update = {
        admin: role === 'admin',
        editor: role === 'editor'
    };
    return await userModel.findByIdAndUpdate(userId, update, { new: true, select: '-password' });
}

module.exports = {
    addNewUser,
    handelValidation,
    readUser,
    addRecipe,
    deleteFavorite,
    allFavorite,
    deleteUser,
    getAllUsers,
    setUserRole
};
