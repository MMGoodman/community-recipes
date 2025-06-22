// import React, { useContext, useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import UploadImage from './uploadPhoto/index.jsx';
// import DataContext from '../context/DataContext.jsx';
// import axios from 'axios';
// import style from './style.module.css';

// function AddNewRecipe() {

//     const { curentUser } = useContext(DataContext);
//     const navigate = useNavigate();

//     const [curentName, setCurentName] = useState('');
//     const [curentServings, setCurentServings] = useState('');
//     const [curentTime, setCurentTime] = useState('');
//     const [curentLevel, setCurentLevel] = useState('');
//     const [product, setProduct] = useState('');
//     const [allProducts, setAllProducts] = useState([]);
//     const [task, setTask] = useState('');
//     const [allTasks, setAllTasks] = useState([]);
//     const [curentType, setCurentType] = useState('');
//     const [imageUrl, setImageUrl] = useState('');
//     const [tag, setTag] = useState('');
//     const [allTags, setAllTags] = useState([]);
//     const [errors, setErrors] = useState({});
//     const [showModal, setShowModal] = useState(false);

//     const validateForm = () => {
//         const newErrors = {};
//         if (!curentName) newErrors.name = 'שם המתכון הוא שדה חובה';
//         if (!curentServings) newErrors.servings = 'מספר המנות הוא שדה חובה';
//         if (!curentType) newErrors.type = 'סוג המתכון הוא שדה חובה';
//         if (!curentTime) newErrors.time = 'זמן ההכנה הוא שדה חובה';
//         if (!curentLevel) newErrors.level = 'רמת הקושי היא שדה חובה';
//         if (allProducts.length === 0) newErrors.products = 'יש להוסיף לפחות מוצר אחד';
//         if (allTasks.length === 0) newErrors.tasks = 'יש להוסיף לפחות הוראת הכנה אחת';
//         if (!imageUrl) newErrors.image = 'יש להוסיף תמונה למתכון';
//         return newErrors;
//     };

//     const handelFormSumbit = (e) => {
//         e.preventDefault();
//         const formErrors = validateForm();
//         if (Object.keys(formErrors).length > 0) {
//             setErrors(formErrors);
//             return;
//         }
//         setShowModal(true);
//         console.log("Modal state after submit:", modal);
//     };

//     const handelName = (e) => {
//         setCurentName(e.target.value);
//     }

//     const handelServings = (e) => {
//         setCurentServings(e.target.value);
//     }

//     const handelTime = (e) => {
//         setCurentTime(e.target.value);
//     }

//     const hendalProduct = (e) => {
//         e.preventDefault();
//         if (product.trim()) {
//             setAllProducts([...allProducts, product.trim()]);
//             setProduct('');
//         }
//     }

//     const handelInputProduct = (e) => {
//         setProduct(e.target.value);
//     }

//     const hendalTasks = (e) => {
//         e.preventDefault();
//         if (task.trim()) {
//             setAllTasks([...allTasks, task.trim()]);
//             setTask('');
//         }
//     }

//     const handelInputTask = (e) => {
//         setTask(e.target.value);
//     }

//     const handelLevel = (e) => {
//         setCurentLevel(e.target.value);
//     }

//     const handelType = (e) => {
//         setCurentType(e.target.value);
//     }

//     const hendalTags = (e) => {
//         e.preventDefault();
//         if (tag.trim()) {
//             setAllTags([...allTags, tag.trim()]);
//             setTag('');
//         }
//     }

//     const handelInputTag = (e) => {
//         setTag(e.target.value);
//     }

//     const handelListProduct = (indexToRemove) => {
//         const upDateProducts = allProducts.filter((_, index) => index !== indexToRemove);
//         setAllProducts(upDateProducts);
//     }

//     const handelListTask = (indexToRemove) => {
//         const upDateTask = allTasks.filter((_, index) => index !== indexToRemove);
//         setAllTasks(upDateTask);
//     }

//     const handelListTag = (indexToRemove) => {
//         const upDateTags = allTags.filter((_, index) => index !== indexToRemove);
//         setAllTags(upDateTags);
//     }


//     const handleFinalSubmit = async () => {
//         const curentRecipe = {
//             owner: curentUser._id,
//             name: curentName,
//             servings: curentServings,
//             type: curentType,
//             time: curentTime,
//             level: curentLevel,
//             product: allProducts,
//             directions: allTasks,
//             image: imageUrl,
//             tags: allTags
//         };
//         try {
//             const result = await axios.post('http://localhost:8000/api/recipe/add', { data: curentRecipe });
//             console.log(result);
//             setShowModal(false);
//             navigate('/');
//         } catch (error) {
//             console.error("Error submitting recipe:", error);
//             setErrors({ submit: 'אירעה שגיאה בשליחת המתכון. אנא נסה שוב.' });
//         }
//     }; 

//     return (
//         <div className={style.addNewRecipeContainer}>
//             <Link to={'/'} className={style.backLink}>חזרה</Link>
//             <h3>הוספת מתכון חדש  </h3>
//             <form onSubmit={handelFormSumbit} className={style.recipeForm}>
//                 <input
//                     type="text"
//                     name="name"
//                     placeholder='הכנס את שם המתכון'
//                     onChange={handelName}
//                     className={errors.name ? `${style.inputField} ${style.inputError}` : style.inputField}
//                 />
//                 {errors.name && <span className={style.errorText}>{errors.name}</span>}

//                 <input
//                     type="number"
//                     name="servings"
//                     placeholder='רשום את מספר המנות'
//                     onChange={handelServings}
//                     className={errors.servings ? `${style.inputField} ${style.inputError}` : style.inputField}
//                 />
//                 {errors.servings && <span className={style.errorText}>{errors.servings}</span>}

//                 <div>
//                 <select
//                     id="type"
//                     name="type"
//                     onChange={handelType}
//                     className={errors.type ? `${style.inputField} ${style.inputError}` : style.inputField}
//                 >
//                     <option value="">בחר סוג:</option>
//                     <option value="חלבי">חלבי</option>
//                     <option value="בשרי">בשרי</option>
//                     <option value="פרווה">פרווה</option>
//                 </select>

//                 </div>
//                 {errors.type && <span className={style.errorText}>{errors.type}</span>}

//                 <label htmlFor="time">זמן הכנה:</label>
//                 <input
//                     type="time"
//                     name="time"
//                     onChange={handelTime}
//                     className={errors.time ? `${style.inputField} ${style.inputError}` : style.inputField}
//                 />
//                 {errors.time && <span className={style.errorText}>{errors.time}</span>}

//                 <select
//                     id="level"
//                     name="level"
//                     onChange={handelLevel}
//                     className={errors.level ? `${style.inputField} ${style.inputError}` : style.inputField}
//                 >
//                     <option value="">בחר רמת קושי:</option>
//                     <option value="קל">קל</option>
//                     <option value="בינוני">בינוני</option>
//                     <option value="קשה">קשה</option>
//                     <option value="קשה מאוד">קשה מאוד</option>
//                 </select>
//                 {errors.level && <span className={style.errorText}>{errors.level}</span>}

//                 <div className={style.inputContainer}>
//                     <input
//                         type="text"
//                         name="product"
//                         value={product}
//                         placeholder='הכנס את המוצרים'
//                         onChange={handelInputProduct}
//                         onKeyDown={(e) => e.key === 'Enter' && hendalProduct(e)}
//                         className={style.inputField}
//                     />
//                     <button type='button' className={style.addButton} onClick={hendalProduct}>הוספת מוצר</button>
//                 </div>
//                 {errors.products && <span className={style.errorText}>{errors.products}</span>}

//                 <ol className={style.list}>
//                     {allProducts.map((item, index) => (
//                         <li 
//                         className={style.itemList} 
//                             key={index}>
//                             {item}
//                             <button
//                                 className={style.removeButton}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     handelListProduct(index);
//                                 }}
//                             >
//                                 הסרת מוצר
//                             </button>
//                         </li>
//                     ))}
//                 </ol>

//                 <div className={style.inputContainer}>
//                     <input
//                         type="text"
//                         name='task'
//                         value={task}
//                         placeholder='כתוב את הוראות ההכנה'
//                         onChange={handelInputTask}
//                         onKeyDown={(e) => e.key === 'Enter' && hendalTasks(e)}
//                         className={style.inputField}
//                     />
//                     <button type='button' className={style.addButton} onClick={hendalTasks}>הוספת הוראת הכנה</button>
//                 </div>
//                 {errors.tasks && <span className={style.errorText}>{errors.tasks}</span>}

//                 <ol className={style.list}>
//                     {allTasks.map((item, index) => (
//                         <li 
//                            className={style.itemList} 
//                             key={index}>
//                             {item}
//                             <button
//                                 className={style.removeButton}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     handelListTask(index);
//                                 }}
//                             >
//                                הסרת הוראת הכנה
//                             </button>
//                         </li>
//                     ))}
//                 </ol>

//                 <div className={style.inputContainer}>
//                     <input
//                         type="text"
//                         name='tags'
//                         value={tag}
//                         placeholder='הכנס את התגים של המתכון'
//                         onChange={handelInputTag}
//                         onKeyDown={(e) => e.key === 'Enter' && hendalTags(e)}
//                         className={style.inputField}
//                     />
//                     <button type='button' className={style.addButton} onClick={hendalTags}>הוספת תג</button>
//                 </div>

//                 <ol className={style.list}>
//                     {allTags.map((item, index) => (
//                         <li className={style.itemList} 
//                             key={index}>
//                             {item}
//                             <button
//                                 className={style.removeButton}
//                                 onClick={(e) => {
//                                     e.preventDefault();
//                                     handelListTag(index);
//                                 }}
//                             >
//                                הסרת תג
//                             </button>
//                         </li>
//                     ))}
//                 </ol>
//                 <UploadImage setImageUrl={setImageUrl} />
//                 {errors.image && <span className={style.errorText}>{errors.image}</span>}
//                <br />
//                 <button type="submit" className={style.submitButton}>שמור מתכון</button>
//             </form>
//             {showModal && (
//                 <div className={style.recipeModal}>
//                     <div className={style.recipeModalContent}>
//                         <h2>תוצאה סופית:</h2>
//                         <div className={style.recipeDetails}>
//                             <p><span className={style.label}>שם המתכון:</span> {curentName}</p>
//                             <p><span className={style.label}>מנות:</span> {curentServings}</p>
//                             <p><span className={style.label}>סוג:</span> {curentType}</p>
//                             <p><span className={style.label}>זמן:</span> {curentTime}</p>
//                             <p><span className={style.label}>רמת קושי:</span> {curentLevel}</p>
//                             <p><span className={style.label}>מוצרים:</span> {allProducts.join(', ')}</p>
//                             <p><span className={style.label}>הוראות:</span> {allTasks.join(', ')}</p>
//                             <p><span className={style.label}>תגים:</span> {allTags.join(', ')}</p>
//                         </div>
//                         <div className={style.modalButtons}>
//                             <button onClick={handleFinalSubmit} className={style.modalSubmitButton}>אישור סופי</button>
//                             <button onClick={() => setShowModal(false)} className={style.cancelButton}>ביטול</button>
//                         </div>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// }

// export default AddNewRecipe;




// AddNewRecipe.jsx
import  { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UploadImage from './uploadPhoto/index.jsx';
import DataContext from '../context/DataContext.jsx';
import axios from 'axios';
import style from './style.module.css';

function AddNewRecipe() {
    const { curentUser } = useContext(DataContext);
    const navigate = useNavigate();

    const [curentName, setCurentName] = useState('');
    const [curentServings, setCurentServings] = useState('');
    const [curentTime, setCurentTime] = useState('');
    const [curentLevel, setCurentLevel] = useState('');
    const [product, setProduct] = useState('');
    const [allProducts, setAllProducts] = useState([]);
    const [task, setTask] = useState('');
    const [allTasks, setAllTasks] = useState([]);
    const [curentType, setCurentType] = useState('');
    const [imageUrl, setImageUrl] = useState('');
    const [tag, setTag] = useState('');
    const [allTags, setAllTags] = useState([]);
    const [errors, setErrors] = useState({});
    const [showModal, setShowModal] = useState(false);

    const validateForm = () => {
        const newErrors = {};
        if (!curentName) newErrors.name = 'שם המתכון הוא שדה חובה';
        if (!curentServings) newErrors.servings = 'מספר המנות הוא שדה חובה';
        if (!curentType) newErrors.type = 'סוג המתכון הוא שדה חובה';
        if (!curentTime) newErrors.time = 'זמן ההכנה הוא שדה חובה';
        if (!curentLevel) newErrors.level = 'רמת הקושי היא שדה חובה';
        if (allProducts.length === 0) newErrors.products = 'יש להוסיף לפחות מוצר אחד';
        if (allTasks.length === 0) newErrors.tasks = 'יש להוסיף לפחות הוראת הכנה אחת';
        if (!imageUrl) newErrors.image = 'יש להוסיף תמונה למתכון';
        return newErrors;
    };

    const handelFormSumbit = (e) => {
        e.preventDefault();
        const formErrors = validateForm();
        if (Object.keys(formErrors).length > 0) {
            setErrors(formErrors);
            return;
        }
        setShowModal(true);
        // console.log("Modal state after submit:", modal);
    };

    const handelName = (e) => {
        setCurentName(e.target.value);
    }

    const handelServings = (e) => {
        setCurentServings(e.target.value);
    }

    const handelTime = (e) => {
        setCurentTime(e.target.value);
    }

    const hendalProduct = (e) => {
        e.preventDefault();
        if (product.trim()) {
            setAllProducts([...allProducts, product.trim()]);
            setProduct('');
        }
    }

    const handelInputProduct = (e) => {
        setProduct(e.target.value);
    }

    const hendalTasks = (e) => {
        e.preventDefault();
        if (task.trim()) {
            setAllTasks([...allTasks, task.trim()]);
            setTask('');
        }
    }

    const handelInputTask = (e) => {
        setTask(e.target.value);
    }

    const handelLevel = (e) => {
        setCurentLevel(e.target.value);
    }

    const handelType = (e) => {
        setCurentType(e.target.value);
    }

    const hendalTags = (e) => {
        e.preventDefault();
        if (tag.trim()) {
            setAllTags([...allTags, tag.trim()]);
            setTag('');
        }
    }

    const handelInputTag = (e) => {
        setTag(e.target.value);
    }

    const handelListProduct = (indexToRemove) => {
        const upDateProducts = allProducts.filter((_, index) => index !== indexToRemove);
        setAllProducts(upDateProducts);
    }

    const handelListTask = (indexToRemove) => {
        const upDateTask = allTasks.filter((_, index) => index !== indexToRemove);
        setAllTasks(upDateTask);
    }

    const handelListTag = (indexToRemove) => {
        const upDateTags = allTags.filter((_, index) => index !== indexToRemove);
        setAllTags(upDateTags);
    }

    const handleFinalSubmit = async () => {
        const curentRecipe = {
            owner: curentUser._id,
            name: curentName,
            servings: curentServings,
            type: curentType,
            time: curentTime,
            level: curentLevel,
            product: allProducts,
            directions: allTasks,
            image: imageUrl,
            tags: allTags
        };
        try {
            const result = await axios.post('http://localhost:8000/api/recipe/add', { data: curentRecipe });
            console.log(result);
            setShowModal(false);
            navigate('/');
        } catch (error) {
            console.error("Error submitting recipe:", error);
            setErrors({ submit: 'אירעה שגיאה בשליחת המתכון. אנא נסה שוב.' });
        }
    };

    return (
        <div className={style.addNewRecipeContainer}>
            <Link to={'/'} className={style.backLink}>חזרה</Link>
            <h3>הוספת מתכון חדש  </h3>
            <form onSubmit={handelFormSumbit} className={style.recipeForm}>
                <input
                    type="text"
                    name="name"
                    placeholder='הכנס את שם המתכון'
                    onChange={handelName}
                    className={errors.name ? `${style.inputField} ${style.inputError}` : style.inputField}
                />
                {errors.name && <span className={style.errorText}>{errors.name}</span>}

                <input
                    type="number"
                    name="servings"
                    placeholder='רשום את מספר המנות'
                    onChange={handelServings}
                    className={errors.servings ? `${style.inputField} ${style.inputError}` : style.inputField}
                />
                {errors.servings && <span className={style.errorText}>{errors.servings}</span>}

                <div>
                    <select
                        id="type"
                        name="type"
                        onChange={handelType}
                        className={errors.type ? `${style.inputField} ${style.inputError}` : style.inputField}
                    >
                        <option value="">בחר סוג:</option>
                        <option value="חלבי">חלבי</option>
                        <option value="בשרי">בשרי</option>
                        <option value="פרווה">פרווה</option>
                    </select>
                </div>
                {errors.type && <span className={style.errorText}>{errors.type}</span>}

                <label htmlFor="time">זמן הכנה:</label>
                <input
                    type="time"
                    name="time"
                    onChange={handelTime}
                    className={errors.time ? `${style.inputField} ${style.inputError}` : style.inputField}
                />
                {errors.time && <span className={style.errorText}>{errors.time}</span>}

                <select
                    id="level"
                    name="level"
                    onChange={handelLevel}
                    className={errors.level ? `${style.inputField} ${style.inputError}` : style.inputField}
                >
                    <option value="">בחר רמת קושי:</option>
                    <option value="קל">קל</option>
                    <option value="בינוני">בינוני</option>
                    <option value="קשה">קשה</option>
                    <option value="קשה מאוד">קשה מאוד</option>
                </select>
                {errors.level && <span className={style.errorText}>{errors.level}</span>}

                <div className={style.inputContainer}>
                    <input
                        type="text"
                        name="product"
                        value={product}
                        placeholder='הכנס את המוצרים'
                        onChange={handelInputProduct}
                        onKeyDown={(e) => e.key === 'Enter' && hendalProduct(e)}
                        className={style.inputField}
                    />
                    <button type='button' className={style.addButton} onClick={hendalProduct}>הוספת מוצר</button>
                </div>
                {errors.products && <span className={style.errorText}>{errors.products}</span>}

                <ol className={style.list}>
                    {allProducts.map((item, index) => (
                        <li
                            className={style.itemList}
                            key={index}>
                            {item}
                            <button
                                className={style.removeButton}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handelListProduct(index);
                                }}
                            >
                                הסרת מוצר
                            </button>
                        </li>
                    ))}
                </ol>

                <div className={style.inputContainer}>
                    <input
                        type="text"
                        name='task'
                        value={task}
                        placeholder='כתוב את הוראות ההכנה'
                        onChange={handelInputTask}
                        onKeyDown={(e) => e.key === 'Enter' && hendalTasks(e)}
                        className={style.inputField}
                    />
                    <button type='button' className={style.addButton} onClick={hendalTasks}>הוספת הוראת הכנה</button>
                </div>
                {errors.tasks && <span className={style.errorText}>{errors.tasks}</span>}

                <ol className={style.list}>
                    {allTasks.map((item, index) => (
                        <li
                            className={style.itemList}
                            key={index}>
                            {item}
                            <button
                                className={style.removeButton}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handelListTask(index);
                                }}
                            >
                                הסרת הוראת הכנה
                            </button>
                        </li>
                    ))}
                </ol>

                <div className={style.inputContainer}>
                    <input
                        type="text"
                        name='tags'
                        value={tag}
                        placeholder='הכנס את התגים של המתכון'
                        onChange={handelInputTag}
                        onKeyDown={(e) => e.key === 'Enter' && hendalTags(e)}
                        className={style.inputField}
                    />
                    <button type='button' className={style.addButton} onClick={hendalTags}>הוספת תג</button>
                </div>

                <ol className={style.list}>
                    {allTags.map((item, index) => (
                        <li className={style.itemList}
                            key={index}>
                            {item}
                            <button
                                className={style.removeButton}
                                onClick={(e) => {
                                    e.preventDefault();
                                    handelListTag(index);
                                }}
                            >
                                הסרת תג
                            </button>
                        </li>
                    ))}
                </ol>
                <UploadImage setImageUrl={setImageUrl} />
                {errors.image && <span className={style.errorText}>{errors.image}</span>}
                <br />
                <button type="submit" className={style.submitButton}>שמור מתכון</button>
            </form>

            {showModal && (
                <div className={style.recipeModal}>
                    <div className={style.recipeModalContent}>
                        <h2>תוצאה סופית:</h2>
                        {imageUrl && <img src={imageUrl} alt="תמונת המתכון" className={style.modalImage} />}
                        <div className={style.recipeDetails}>
                            <p>
                                <span className={style.label}>שם המתכון:</span>
                                <span>{curentName}</span>
                            </p>
                            <p>
                                <span className={style.label}>מספר מנות:</span>
                                <span>{curentServings}</span>
                            </p>
                            <p>
                                <span className={style.label}>סוג:</span>
                                <span>{curentType}</span>
                            </p>
                            <p>
                                <span className={style.label}>זמן הכנה:</span>
                                <span>{curentTime}</span>
                            </p>
                            <p>
                                <span className={style.label}>רמת קושי:</span>
                                <span>{curentLevel}</span>
                            </p>
                            <p>
                                <span className={style.label}>מוצרים:</span>
                                <span>{allProducts.join(', ')}</span>
                            </p>
                            <p>
                                <span className={style.label}>הוראות הכנה:</span>
                                <span>{allTasks.join('. ')}</span>
                            </p>
                            <p>
                                <span className={style.label}>תגים:</span>
                                <span>{allTags.join(', ')}</span>
                            </p>
                        </div>
                        <div className={style.modalButtons}>
                            <button onClick={handleFinalSubmit} className={style.modalSubmitButton}>אישור סופי</button>
                            <button onClick={() => setShowModal(false)} className={style.cancelButton}>ביטול</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default AddNewRecipe;