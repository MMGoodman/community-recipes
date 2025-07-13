import { useState } from "react";
import RecipeList from "../RecipeList";
import style from "./style.module.css";
import axios from "axios";
import { useEffect } from "react";

function Content({ curentTag, setCurentTag }) {
  const [recipes, setRecipes] = useState([]); // מערך שמחזיק את כל המתכונים

  //פה מופעלת הקריאה במקרה של סינון לפי תגים
  useEffect(() => {
    const importDataByTag = async () => {
      try {
        await axios
          .post(`http://localhost:8000/api/recipe/find/by`, {
            field: "tags",
            filter: curentTag,
          })
          .then((res) => {
            setRecipes(res.data);
          });
      } catch (error) {
        console.log(error);
      }
    };
    curentTag && importDataByTag();
  }, [curentTag]);

  //פה מופעלת הקריאה בכל כניסה לדף ומביאה את כל המתכונים בתנאי שעברו אישור מנהל
  const importData = async () => {
    try {
      let response = await axios.post(
        `http://localhost:8000/api/recipe/status/${true}`
      );
      setRecipes(response.data);
      setCurentTag("");
    } catch (error) {
      console.log(error.message);
    }
  };

  useEffect(() => {
    importData();
  }, []);

  return (
    <div className={style.content}>
      {curentTag && (
        <button onClick={() => importData()} className={style.refreshButton}>
         רענון
        </button>
      )}

      <div className={style.item}>
        {recipes &&
          recipes.map((item) => <RecipeList key={item._id} item={item} />)}
      </div>
    </div>
  );
}

export default Content;
