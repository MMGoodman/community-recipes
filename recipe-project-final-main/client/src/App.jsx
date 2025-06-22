import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { DataProvider } from './components/context/DataContext';

import Layout from './components/Layout';
import Recipe from './components/Recipe';
import SignIn from './components/SignIn';
import Login from './components/Login';
import AddNewRecipe from './components/AddNewRecipe';
import UserFavoriteRecipe from './components/UserFavoriteRecipe';
import UserRecipes from './components/UserRecipes';
import DeleteRecipe from './components/DeleteRecipe';
import AdminEditRecipe from './components/AdminEditResipe';

function App() {
  return (
    <DataProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Layout />} />
          <Route path='/recipe/:id' element={<Recipe />} />
          <Route path='/SignIn' element={<SignIn />} />
          <Route path='/Login' element={<Login />} />
          <Route path='/newRecipe' element={<AddNewRecipe />} />
          <Route path='/favoriteRecipe' element={<UserFavoriteRecipe />} />
          <Route path='/userRecipes' element={<UserRecipes />} />
          <Route path='/deleteRecipe' element={<DeleteRecipe />} />
          <Route path='/edit-recipe/:recipeId' element={<AdminEditRecipe />} />
        </Routes>
      </BrowserRouter>
    </DataProvider>
  );
}

export default App;
