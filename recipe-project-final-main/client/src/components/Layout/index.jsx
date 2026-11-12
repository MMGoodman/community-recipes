import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import { useState } from 'react';

function Layout() {
  const [curentTags, setCurentTags] = useState([]);

  return (
    <div className={style.main}>
      <div className={style.stickyHeader}>
        {/* התגיות נפתחות מתוך תיבת החיפוש */}
        <Header curentTags={curentTags} setCurentTags={setCurentTags} />
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
