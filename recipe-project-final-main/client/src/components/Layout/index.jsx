import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import { useState } from 'react';
import ShowTags from '../ShowTags/index.jsx';

function Layout() {
  const [curentTags, setCurentTags] = useState([]);
  // שורת התגיות מוסתרת עד שלוחצים על תיבת החיפוש, ואפשר לסגור אותה ב-X
  const [showTags, setShowTags] = useState(false);

  return (
    <div className={style.main}>
      <div className={style.stickyHeader}>
        <Header setCurentTags={setCurentTags} onSearchClick={() => setShowTags(true)} />
      </div>

      {/* נטענת עם הדף ורק מוסתרת, כדי שהתגיות יופיעו מיד כשהיא נפתחת */}
      <div className={showTags ? style.tagsBar : `${style.tagsBar} ${style.tagsHidden}`}>
        <div className={style.tagsScroll}>
          <ShowTags curentTags={curentTags} setCurentTags={setCurentTags} />
        </div>
        <button
          className={style.closeTags}
          onClick={() => setShowTags(false)}
          title="סגירת שורת התגיות"
          aria-label="סגירת שורת התגיות"
        >
          ✕
        </button>
      </div>

      <div className={style.content}>
        <Content
          curentTags={curentTags}
          setCurentTags={setCurentTags}
        />
      </div>
    </div>
  );
}

export default Layout;
