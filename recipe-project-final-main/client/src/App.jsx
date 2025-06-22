import Layout from './components/Layout'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Recipe from './components/Recipe'
import SignIn from './components/SignIn'
import DataContext from './components/context/DataContext'
import { useState } from 'react'
import Login from './components/Login'
import AddNewRecipe from './components/AddNewRecipe'
import UserFavoriteRecipe from './components/UserFavoriteRecipe'
import UserRecipes from './components/UserRecipes'
import DeleteRecipe from './components/DeleteRecipe'
import AdminEditRecipe from './components/AdminEditResipe'


function App() {
  //משתנים בסטייט ששומרים על מתכון ועל משתמש לכל האתר
  const [curentUser, setCurentUser] = useState({});

  return (
    <div>
      <DataContext.Provider value={{ curentUser, setCurentUser }}>
        <BrowserRouter>
          <Routes>
            <Route path='/recipe/:id' element={<Recipe />} />
            <Route path='/SignIn' element={< SignIn />} />
            <Route path='/Login' element={< Login />} />
            <Route path='/newRecipe' element={<AddNewRecipe />} />
            <Route path='/favoriteRecipe' element={<UserFavoriteRecipe />} />
            <Route path='/userRecipes' element={<UserRecipes />} />
            <Route path='/deleteRecipe' element={<DeleteRecipe />} />
            <Route path="/edit-recipe/:recipeId" element={<AdminEditRecipe />} />
            <Route path='/' element={<Layout />} />
          </Routes>
        </BrowserRouter>
      </DataContext.Provider>
    </div >
  )
}

export default App
