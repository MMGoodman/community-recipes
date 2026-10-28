const bcrypt = require('bcryptjs');
const userController = require('./user.controller');


async function addNewUser(data) {
    if (!data?.email) throw { code: 400, message: "email input error" }

    let user = await userController.readByEmail(data.email);
    if (user) throw { code: user.isActive ? 400 : 450, message: "המשתמש כבר קיים במערכת" };

    let newUserMapped = await handelValidation(data);

    // המשתמש הראשון שנרשם הופך למנהל
    const adminCount = await userController.countAdmins();
    if (adminCount === 0) {
        newUserMapped.admin = true;
    }

    let result = await userController.create(newUserMapped);
    return withFavorites(result);
}

async function handelValidation(reqBody) {
    // הסיסמה נשמרת במסד רק בצורה מוצפנת
    return {
        lName: reqBody.lName?.trim(),
        fName: reqBody.fName?.trim(),
        email: reqBody.email?.trim(),
        password: await bcrypt.hash(reqBody.password, 10)
    };
}

// התחברות: מחפשים לפי שם פרטי ושם משפחה ומשווים את הסיסמה המוצפנת
async function readUser(filter = {}) {
    const fName = filter.fName?.trim();
    const lName = filter.lName?.trim();
    const password = filter.password?.trim();

    const users = await userController.readByName(fName, lName);
    for (const user of users) {
        if (await bcrypt.compare(password, user.password)) {
            delete user.password;
            return withFavorites(user);
        }
    }
    return null;
}

// הלקוח מצפה לרשימת המועדפים בתוך אובייקט המשתמש
async function withFavorites(user) {
    user.favorite = await userController.readFavorites(user._id);
    return user;
}

// הוספת מתכון למועדפים
async function addRecipe(filter, data) {
    const user = await userController.readByEmail(filter.email);
    if (!user) throw new Error('משתמש לא נמצא');
    const added = await userController.addFavorite(user._id, data.recipe);
    if (added === 0) throw new Error('המתכון כבר במועדפים');
    return { added };
}

// מחיקת מתכון ממועדפים
async function deleteFavorite({ userId, recipeName }) {
    return await userController.delFavorite({ userId, recipeName });
}

// קבלת רשימת המועדפים של משתמש לפי ID
async function allFavorite(id) {
    return await userController.readFavorites(id);
}

async function deleteUser(id) {
    return await userController.del(id);
}

async function getAllUsers() {
    return await userController.readAll();
}

async function setUserRole(userId, role) {
    return await userController.setRole(userId, role === 'admin', role === 'editor');
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
