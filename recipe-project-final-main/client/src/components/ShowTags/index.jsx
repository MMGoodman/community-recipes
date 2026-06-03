import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import axios from 'axios';

function ShowTags({ setCurentTag, curentTag }) {
  const [allTags, setAllTags] = useState([]);

  const handelTagButton = (tag) => {
    setCurentTag(tag === curentTag ? '' : tag);
  };

  useEffect(() => {
    const importTags = async () => {
      try {
        let response = await axios.get(`${import.meta.env.VITE_API_URL}/api/recipe/all/tags`);
        setAllTags(Array.isArray(response.data) ? response.data : []);
      } catch (error) {
        console.log(error.message);
      }
    };
    importTags();
  }, []);

  return (
    <div className={styles['tags-container']}>
      {allTags.map((tag, index) => (
        <button
          key={index}
          onClick={() => handelTagButton(tag)}
          className={`${styles.tag} ${curentTag === tag ? styles.active : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default ShowTags;
