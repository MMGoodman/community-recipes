const { findOne } = require('../recipe/recipe.module');
const userModule = require('./user.module');


async function create(data) {
    return await userModule.create(data);
};
async function readOne(filter = {}) {
    return await userModule.findOne(filter)
};
async function upDate(filter, data) {
    console.log(filter, data, "controller");
    let result = await userModule.findOneAndUpdate(filter, data);
    return result;
};

async function upDateById(id, data) {
    return await userModule.updateOne({ _id: id }, data);
};

async function del(id) {
    return await upDateById(id, { isActive: false });
};

// מחיקת מתכון ממועדפים
async function delFavorite(filter) {
    const result = await userModule.updateOne({ _id: filter.userId },
        { $pull: { favorite: { recipe: filter.recipeName } } }
    );
    //למרות שבמקרה הזה המחיקה תקרא רק כאשר המתכון נמצא ליתר ביטחון אם יהיה שימוש נוסף
    if (result.modifiedCount === 0) {
        throw new Error('מתכון לא נמצא');
      }
    return result;
}

// async function delFavorite(filter) {
//    console.log(filter);
//     try {
//       const result = await userModule.findOneAndDelete({ _id: filter.userId, favorite: filter.recipeName });
//       if (!result) {
//         throw new Error('User or recipe not found');
//       }
//       return 'המתכון נמחק בהצלחה';
//     } catch (error) {
//       throw error;
//     }
//   }


// async function find({email}){
//     return await findOne(email,{this.favorite});
// }




module.exports = {
    create,
    upDate,
    upDateById,
    readOne,
    del,
    delFavorite
};