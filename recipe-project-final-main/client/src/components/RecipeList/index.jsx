import Details from '../Details/index.jsx'
import { useNavigate } from 'react-router-dom'
import style from './style.module.css'


function RecipeList({ item }) {


    const navigate = useNavigate();
 
    return (
        <div className={style.content}>
                <div onClick={() => { navigate(`/recipe/${item._id}`) }}>
                    <h3> {item.name} </h3>
                    <h4>  👁‍🗨 {item.views}   </h4>
                    <img className={style.recipeImage} src={item.image} />
                    <div >
                        <Details details={item} />
                    </div>
                </div>
            </div>
    )
}

export default RecipeList;