import React, { useState, useEffect } from "react";
import style from './style.module.css';
import axios from "axios";

export default function UploadImage({setImageUrl}) {
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (url) {
      setImageUrl(url);
    }
  }, [url, setImageUrl]);

  const compressImage = (base64String) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.src = base64String;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const ctx = canvas.getContext('2d');
        
        // קביעת גודל מקסימלי לתמונה
        const MAX_WIDTH = 800;
        const MAX_HEIGHT = 600;
        
        let width = img.width;
        let height = img.height;

        // חישוב יחס הדחיסה
        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;

        ctx.drawImage(img, 0, 0, width, height);
        
        // דחיסת איכות התמונה
        const compressedBase64 = canvas.toDataURL('image/jpeg', 0.7);
        resolve(compressedBase64);
      };
    });
  };

  const convertBase64 = (file) => {
    return new Promise((resolve, reject) => {
      const fileReader = new FileReader();
      fileReader.readAsDataURL(file);
      fileReader.onload = () => resolve(fileReader.result);
      fileReader.onerror = (error) => reject(error);
    });
  };

  function uploadSingleImage(base64) {
    setLoading(true);
    try {
      axios
        .post("http://localhost:8000/api/uplaod/image", { image: base64 })
        .then((res) => {
          setUrl(res.data);
          setImageUrl(res.data);
        })
        .then(() => setLoading(false));
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  const uploadImage = async (event) => {
    const files = event.target.files;
    if (files.length === 1) {
      try {
        const base64 = await convertBase64(files[0]);
        const compressedImage = await compressImage(base64);
        uploadSingleImage(compressedImage);
        setIsEditing(false);
      } catch (error) {
        console.error("Error processing file:", error);
        alert("שגיאה בעיבוד הקובץ");
      }
    }
  };

  return (
    <div className={style.uploadContainer}>
      <h2 className={style.uploadTitle}>העלאת תמונה</h2>
      
      <div className={style.uploadArea}>
        {loading ? (
          <div className={style.spinnerContainer}>
            <div className={style.spinner} />
          </div>
        ) : (
          <>
            {url && !isEditing ? (
              <div className={style.uploadedContentContainer}>
                <div className={style.uploadedImageContainer}>
                  <img src={url} className={style.uploadAreaImage} alt="uploaded" />
                </div>
                <button 
                  onClick={() => setIsEditing(true)}
                  className={style.editButton}
                >
                  ערוך תמונה
                </button>
              </div>
            ) : (
              <label className={style.uploadLabel}>
                <span className={style.uploadText}>לחץ להעלאת קובץ</span>
                <input
                  onChange={uploadImage}
                  type="file"
                  accept="image/*"
                  className={style.hiddenInput}
                />
              </label>
            )}
          </>
        )}
      </div>
    </div>
  );
}