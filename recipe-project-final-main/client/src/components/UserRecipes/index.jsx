
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react'
import DataContext from '../context/DataContext';
import RecipeList from '../RecipeList';
import style from './style.module.css'
import { Link } from 'react-router-dom';


function UserRecipes() {

  const { curentUser } = useContext(DataContext);

  let id = curentUser._id;

  console.log(id);

  const [recipes, setRecipes] = useState();

  useEffect(() => {
    const importData = async () => {
      try {
        const result = await axios.post(`http://localhost:8000/api/recipe/find/by`, {
          field: "owner",
          filter: id
        })
        setRecipes(result.data);
      }
      catch (error) {
        console.log(error);
      }
    }
    importData();
  }, [])

  return (<div>
    <Link to={'/'}>חזרה</Link>
    <h3>המתכונים שלי </h3>
    <div className={style.item}>
      {recipes && recipes.map(item => <RecipeList
        key={item._id} item={item} />)
      }
    </div>
  </div>
  )
}

export default UserRecipes

