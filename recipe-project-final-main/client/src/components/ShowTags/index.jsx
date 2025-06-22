import React, {useState, useEffect } from 'react';
import styles from './style.module.css';
import axios from 'axios';

function ShowTags({ setCurentTag }) {

 const [allTags, setAllTags] = useState([]);

    const handelTagButton = (e) => {
        e.preventDefault();
        setCurentTag(e.target.value);

        //הקריאה לשרת עם המידע פה מבוצעת בקומפונננטה  
        //Content
    }
    
    useEffect(() => {
        const importTags = async () => {
            try {
             //קריאה שמביאה את המידע כבר מסונן וממוין מהצד שרת 
                let response = await axios.get(`http://localhost:8000/api/recipe/all/tags`)
           setAllTags(response.data);
            }
            catch (error) {
                console.log(error.massage);
            }
        }
        importTags();
    }, [])


    return (
        <div className={styles['tags-container']}>
            {allTags && allTags.map((tag, index) => (
                <button
                    value={tag}
                    onClick={(e) => handelTagButton(e)}
                    key={index}
                    className={styles.tag}
                >
                    {tag}
                </button>
            ))}
        </div>

    )
}
export default ShowTags;

