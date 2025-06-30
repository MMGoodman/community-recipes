import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import DataContext from '../context/DataContext';
import style from './style.module.css';
import { Link } from 'react-router-dom';
import RecipeList from '../RecipeList';

function UserRecipes() {
  const { curentUser, isLoading } = useContext(DataContext);
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    if (!curentUser || !curentUser._id) return;

    const getUserRecipe = async () => {
      try {
        const result = await axios.post(`http://localhost:8000/api/recipe/find/by`, {
          field: "owner",
          filter: curentUser._id,
        });
        console.log(result.data);
        
        setRecipes(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    getUserRecipe();
  }, [curentUser]);

  if (isLoading || !curentUser) return null;

  return (
    <div>
      <Link to="/">חזרה</Link>
      <h3>המתכונים שלי</h3>
      <div className={style.item}>
        {recipes.map((item) => (
          <RecipeList key={item._id} item={item} />
        ))}
      </div>
    </div>
  );
}

export default UserRecipes;
