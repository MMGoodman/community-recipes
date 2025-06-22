import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import RecipeList from '../RecipeList';
import style from './style.module.css';  // Import the CSS module

function DeleteRecipe() {
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    const fetchRecipes = async () => {
      let isActive = false;
      try {
        let response = await axios.post(`http://localhost:8000/api/recipe/status/${isActive}`);
        setRecipes(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipes();
  }, []);

console.log(recipes);

  
  return (
    <div className={style.content}>
      <Link to={'/'}>חזרה</Link>
      <h1>מתכונים לאישור:</h1>
      <div className={style.item}>
        {recipes.map((item) => (
          <div key={item._id} 
          className={style.recipeItem}>
            <RecipeList item={item} />
            <br />
            <button className={style.submitButton}
              onClick={() => navigate(`/edit-recipe/${item._id}`)}>עריכה ואישור</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default DeleteRecipe;
