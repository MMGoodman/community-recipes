import { useState, useEffect } from "react";
import RecipeList from "../RecipeList";
import style from "./style.module.css";
import axios from "axios";

function Content({ curentTags = [], setCurentTags }) {
  const [recipes, setRecipes] = useState([]);

  // טעינת כל המתכונים בכניסה
  const importData = async () => {
    try {
      let response = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/recipe/status/${true}`
      );
      setRecipes(Array.isArray(response.data) ? response.data : []);
    } catch (error) {
      console.log(error.message);
    }
  };

  // סינון לפי תגיות (אחת או יותר)
  useEffect(() => {
    if (!curentTags || curentTags.length === 0) {
      importData();
      return;
    }

    const filterByTags = async () => {
      try {
        // קבלת כל מתכונים פעילים וסינון לפי כל התגיות הנבחרות
        let response = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/recipe/status/${true}`
        );
        const all = Array.isArray(response.data) ? response.data : [];
        const filtered = all.filter(recipe =>
          curentTags.every(tag => recipe.tags?.includes(tag))
        );
        setRecipes(filtered);
      } catch (error) {
        console.log(error.message);
      }
    };

    filterByTags();
  }, [curentTags]);

  return (
    <div className={style.content}>
      {curentTags.length > 0 && (
        <div className={style.filterInfo}>
          <span>מסנן לפי: {curentTags.join(' + ')}</span>
          <button onClick={() => setCurentTags([])} className={style.clearButton}>
            ✕ הסר סינון
          </button>
        </div>
      )}

      <div className={style.item}>
        {recipes.length > 0
          ? recipes.map((item) => <RecipeList key={item._id} item={item} />)
          : curentTags.length > 0 && (
            <p className={style.noResults}>לא נמצאו מתכונים עם כל התגיות שנבחרו</p>
          )
        }
      </div>
    </div>
  );
}

export default Content;
