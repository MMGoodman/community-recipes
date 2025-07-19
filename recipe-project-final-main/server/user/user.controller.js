const { findOne } = require('../recipe/recipe.module');
const userModel = require('./user.module'); // ✅ תואם לשימוש שלך בקובץ


async function create(data) {
    return await userModel.create(data);
}

async function readOne(filter) {
    return await userModel.findOne(filter); // ✅ תואם לשם המיובא
}

async function upDate(filter, data) {
    console.log(filter, data, "controller");
    let result = await userModel.findOneAndUpdate(filter, data);
    return result;
}

async function upDateById(id, data) {
    return await userModel.updateOne({ _id: id }, data);
}

async function del(id) {
    return await upDateById(id, { isActive: false });
}

// מחיקת מתכון ממועדפים
async function delFavorite(filter) {
    const result = await userModel.updateOne(
        { _id: filter.userId },
        { $pull: { favorite: { recipe: filter.recipeName } } }
    );
    if (result.modifiedCount === 0) {
        throw new Error('מתכון לא נמצא');
    }
    return result;
}

module.exports = {
    create,
    upDate,
    upDateById,
    readOne,
    del,
    delFavorite
};
