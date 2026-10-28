const recipeController = require('./recipe.controller');


async function addNewRecipe(data) {
  let result = await recipeController.create(data);
  return result;
}

async function readAll(isActive) {
  let data = await recipeController.readAll(isActive);
  return data;
}

async function readOne(id) {
  let recipe = await recipeController.readById(id);
  return recipe;
}

async function readOneByName(name) {
  let recipe = await recipeController.readByName(name);
  return recipe;
}

async function updateViews(id) {
  let result = await recipeController.upDateViews(id);
  return result;
}

async function findBy(field, filter) {
  const response = await recipeController.readAllBy(field, filter);
  return response;
}

async function search(filter) {
  const response = await recipeController.search(filter);
  return response;
}

async function getAllTags() {
  const response = await recipeController.allTags();
  return response;
}

async function updateRecipeAndActivate(recipeId, updateData) {
  // עדכון השדות ע"י המנהל והפעלת המתכון כך שיוצג באתר
  const data = {
    ...updateData,
    image: updateData.image || updateData.imageUrl,
    isActive: true
  };
  const updatedRecipe = await recipeController.updateRecipe(recipeId, data);
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
  updateViews,
  findBy,
  search,
  getAllTags,
  updateRecipeAndActivate,
  deleteRecipeByAdmain
}
