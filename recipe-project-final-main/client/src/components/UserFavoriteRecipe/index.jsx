import { useEffect, useContext, useState } from "react";
import axios from "axios";
import DataContext from "../context/DataContext";
import { Link } from "react-router-dom";
import style from "./style.module.css";
import RecipeList from "../RecipeList";

function UserFavoriteRecipe() {
  const [favoriteRecipe, setFavoriteRecipe] = useState([]);
  const { curentUser, isLoading } = useContext(DataContext);

  useEffect(() => {
    if (!curentUser || !curentUser.email) return;

    const getUserRecipe = async () => {
      try {
        const result = await axios.get(
          `http://localhost:8000/api/user/all/favorite/${curentUser.email}`
        );
        const recipeNames = result.data.map((item) => item.recipe);

        const recipes = [];
        for (let name of recipeNames) {
          try {
            const recipeResult = await axios.post(
              "http://localhost:8000/api/recipe/by/name",
              { name }
            );
            recipes.push(recipeResult.data);
          } catch (error) {
            console.log(`Error fetching recipe for ${name}:`, error);
          }
        }

        setFavoriteRecipe(recipes);
      } catch (error) {
        console.log(error);
      }
    };

    getUserRecipe();
  }, [curentUser]);

  const handelLess = async (recipe) => {
    const body = {
      userId: curentUser._id,
      recipeName: recipe.name,
    };
    try {
      await axios.post("http://localhost:8000/api/user/delete/favorite", body);
      setFavoriteRecipe((prev) => prev.filter((r) => r.name !== recipe.name));
    } catch (error) {
      console.log(error);
    }
  };

  if (isLoading || !curentUser) return null;

  return (
    <>
      <Link to="/" className={style.backLink}>
        חזרה
      </Link>
      <h3>המתכונים שאהבתי</h3>
      <div className={style.content}>
        <div className={style.item}>
          {favoriteRecipe.map((item, index) => (
            <div key={index} className={style.card}>
              <RecipeList item={item} />
              <button
                className={style.lessButton}
                onClick={(e) => {
                  e.stopPropagation();
                  handelLess(item);
                }}
              >
                להסרה
              </button>
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default UserFavoriteRecipe;
