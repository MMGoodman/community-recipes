import { useEffect, useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Details from '../Details';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import Product from '../Product';
import DataContext from '../context/DataContext';
import style from './style.module.css';


function Recipe() {

    const navigate = useNavigate();
    const { id } = useParams();
    const [recipe, setRecipe] = useState();
    const [modalVisible, setModalVisible] = useState(false);
    const [tagRecipes, setTagRecipes] = useState([]);
    const { curentUser } = useContext(DataContext);


    useEffect(() => {
        const getData = async () => {
            try {
                let response = await axios.get(`http://localhost:8000/api/recipe/${id}`);
                setRecipe(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        const getDataByName = async () => {
            try {
                let response = await axios.post(`http://localhost:8000/api/recipe/by/name`, { name: id });
                setRecipe(response.data);
            } catch (error) {
                console.log(error);
            }
        };

        if (!isNaN(id.charAt(0))) {
            getData();
        } else {
            getDataByName();
        }
    }, [id]);

    useEffect(() => {
        const updateViews = async () => {
            if (recipe) {
                try {
                    await axios.put(`http://localhost:8000/api/recipe/views/update`, { id: recipe._id });
                } catch (error) {
                    console.log(error);
                }
            }
        };
        recipe && updateViews();
    }, [recipe]);

    async function handleLikes() {
        if (curentUser?._id) {
            try {
                await axios.post(`http://localhost:8000/api/user/add/favoriteRecipe`, {
                    email: curentUser.email,
                    recipe: recipe.name,
                });
            } catch (error) {
                console.log(error.message);
            }
        } else {
            alert("אתה צריך להירשם");
        }
    }

    const handleTagClick = async (tag) => {
        console.log(tag, "tag from recipe");
        try {
            const response = await axios.post(`http://localhost:8000/api/recipe/find/by`, {
                field: "tags",
                filter: tag,
            });
            setTagRecipes(response.data);
            setModalVisible(true);
        } catch (error) {
            console.log(error);
        }
    };

    const handleRecipeClick = (selectedRecipeId) => {
        setModalVisible(false);
        navigate(`/recipe/${selectedRecipeId}`);
    };

    const adminEdit = () => {
        console.log(recipe,22222);
        navigate(`/edit-recipe/${recipe._id}`)
    }

    return (
        <div className={style.recipeContainer}>
            <div className={style.navigationBar}>
                <Link to={'/'} className={style.backLink}> חזרה </Link>
                <div className={style.actionButtons}>
                    <button className={style.likeButton} onClick={handleLikes}>
                        הוספה למועדפים
                    </button>
                    {curentUser.admin && <button
                        className={style.adminButton}
                        onClick={adminEdit}>
                        <span>✏️</span> לעריכה
                    </button>}
                </div>
            </div>
            <h1>{recipe && recipe.name}</h1>
            <div className={style.tagsContainer}>
                {recipe && recipe.tags.map((tag, index) => (
                    <span
                        className={style.tag}
                        key={index}
                        onClick={() => handleTagClick(tag)}
                    >
                        {tag}
                    </span>
                ))}
            </div>
            <img
                className={style.recipeImage}
                src={recipe && recipe.image}
                alt={recipe && recipe.name}
            />
            <div className={style.recipeDetails}>
                {recipe && <Details details={recipe} />}
            </div>
            <h5 className={style.sectionTitle}>מוצרים:</h5>
            <ul className={style.productList}>
                {recipe && recipe.product.map((productItem, index) => (
                    <li className={style.productItem} key={index}>
                        <div>
                            <span className={style.itemNumber}>{index + 1}.</span>
                            <span className={style.itemContent}>
                                <Product productItem={productItem} />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>
            <h5 className={style.sectionTitle}>הוראות הכנה:</h5>
            <ul className={style.directionsList}>
                {recipe && recipe.directions.map((directionItem, index) => (
                    <li className={style.directionItem} key={index}>
                        <div>
                            <span className={style.itemNumber}>{index + 1}.</span>
                            <span className={style.itemContent}>
                                <Product productItem={directionItem} />
                            </span>
                        </div>
                    </li>
                ))}
            </ul>

            {modalVisible && (
                <div className={style.tagsModal}>
                    <div className={style.tagsModalContent}>
                        <button className={style.closeButton} onClick={() => setModalVisible(false)}>סגור</button>
                        <br /><br />
                        <div className={style.modalRecipes}>
                            {tagRecipes.map((tagRecipe) => (
                                <div
                                    key={tagRecipe._id}
                                    className={style.modalRecipeItem}
                                    onClick={() => handleRecipeClick(tagRecipe._id)}
                                >
                                    <span>
                                        <img
                                            className={style.modalRecipeImage}
                                            src={tagRecipe.image}
                                            alt={tagRecipe.name}
                                        />
                                        <p className={style.modalRecipeName}>{tagRecipe.name}</p>
                                    </span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default Recipe;
