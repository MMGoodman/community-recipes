import React, { useContext } from 'react'
import DataContext from '../context/DataContext'
import { Link } from 'react-router-dom';
import style from './style.module.css'

function DataUser() {

  const { curentUser } = useContext(DataContext);

  return (
    <div className={style.container} >
       {curentUser.favorite && <Link to={'/newRecipe'}>להוספת מתכון חדש</Link>}
       <br/><br/>
       {curentUser.favorite && <Link to={'/favoriteRecipe'}>מתכונים שאהבתי</Link>}
       <br/><br/>
       {curentUser.favorite && <Link to={'/userRecipes'}>המתכונים שלי</Link>}
       <br/><br/>
       {curentUser.admin && <Link to={'/deleteRecipe'}>  מתכונים לאישור </Link>}
    </div>
  )
}




export default DataUser;



