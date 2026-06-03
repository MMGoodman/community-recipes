import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import { useState } from 'react';
import ShowTags from '../ShowTags/index.jsx';

function Layout() {
  const [curentTags, setCurentTags] = useState([]);

  return (
    <div className={style.main}>
      <div className={style.stickyHeader}>
        <Header />
      </div>

      <div className={style.tagsBar}>
        <ShowTags curentTags={curentTags} setCurentTags={setCurentTags} />
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
