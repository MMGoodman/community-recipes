const recipeController = require('./recipe.controller');


async function addNewRecipe(data) {

  // let newRecipeMapped =await handelValidation(data);
  // let result = await recipeController.create(newRecipeMapped)
  // return result;
  let result = await recipeController.create(data);
  // console.log("recipeService" + result);
  return result;
}

// async function handelValidation(reqBody){
//     return{
//        owner: reqBody.owner,
//        name: reqBody.name,
//        servings: reqBody.servings,
//        type: reqBody.type,
//        time: reqBody.time,
//        level: reqBody.level,
//        product: reqBody.product,
//        directions: reqBody.directions,
//        image:reqBody.image,
//        tags: reqBody.image,
//            }

// }

async function readAll(isActive) {
  let data = await recipeController.readAll(isActive);
  return data;

}


async function readOne(data) {
  let recipe = await recipeController.readOne({ _id: data });
  return recipe;
}

async function readOneByName(data) {
  let recipe = await recipeController.readOne({ name: data });
  return recipe;
}

async function updateViews(id) {
  console.log("service", id);
  let result = await recipeController.upDateViews({ _id: id });
  console.log("result service ", result);
  return result;
}

// async function updateById(filter, data) {
//   let response = recipeController.upDate(filter, data);
//   return response;
// }

async function findBy(field, filter) {
  const response = recipeController.readAllBy(field, filter);
  return response;
}


async function search(filter) {
  // const filter2= {"name":{"$regex" : `^${filter}`}};
  const response = recipeController.search(filter);
  console.log(response, "response");
  return response;
}

async function getAllTags() {
  //הוספת וילדציה בגרסה הבאה
  const response = recipeController.allTags();
  return response;
}

async function updateRecipeAndActivate(recipeId, updateData) {
  // הוספת הלוגיקה לעדכון השדות והפעלת המתכון
  console.log(updateData);

  updateData.isActive = true;

  console.log(updateData, 22222);

  const updatedRecipe = await recipeController.updateRecipe(recipeId, updateData);

  return updatedRecipe;
}

async function deleteRecipeByAdmain(recipeId) {
const result = await recipeController.deleteRecipe(recipeId);
return result;  
}

module.exports = {
  addNewRecipe,
  readAll,
  readOne,
  readOneByName,
  // updateById
  updateViews,
  findBy,
  search,
  getAllTags,
  updateRecipeAndActivate,
  deleteRecipeByAdmain
}