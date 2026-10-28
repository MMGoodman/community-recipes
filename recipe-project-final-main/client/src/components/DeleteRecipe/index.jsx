import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';
import RecipeList from '../RecipeList';
import style from './style.module.css';  // Import the CSS module

function DeleteRecipe() {
  const { curentUser, isLoading } = useContext(DataContext);
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    // רק מנהל יכול לראות מתכונים שמחכים לאישור
    if (isLoading) return;
    if (!curentUser?.admin) {
      navigate('/');
      return;
    }
    const fetchRecipes = async () => {
      let isActive = false;
      try {
        let response = await axios.post(`${import.meta.env.VITE_API_URL}/api/recipe/status/${isActive}`);
        setRecipes(response.data);
      } catch (error) {
        console.log(error.message);
      }
    };
    fetchRecipes();
  }, [curentUser, isLoading]);

  return (
    <div className={style.content}>
<Link to="/" className={style.backLink}>
  חזרה
</Link>

      <h1>מתכונים לאישור</h1>
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
