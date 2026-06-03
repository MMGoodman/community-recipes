import React, { useState, useEffect } from 'react';
import styles from './style.module.css';
import axios from 'axios';

function ShowTags({ setCurentTags, curentTags = [] }) {
  const [allTags, setAllTags] = useState([]);

  const handleTagClick = (tag) => {
    setCurentTags(prev => {
      if (prev.includes(tag)) {
        return prev.filter(t => t !== tag); // הסר תג
      } else {
        return [...prev, tag]; // הוסף תג
      }
    });
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
      {curentTags.length > 0 && (
        <button
          className={`${styles.tag} ${styles.clearBtn}`}
          onClick={() => setCurentTags([])}
        >
          ✕ נקה הכל
        </button>
      )}
      {allTags.map((tag, index) => (
        <button
          key={index}
          onClick={() => handleTagClick(tag)}
          className={`${styles.tag} ${curentTags.includes(tag) ? styles.active : ''}`}
        >
          {tag}
        </button>
      ))}
    </div>
  );
}

export default ShowTags;
