import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import { useState } from 'react';
import ShowTags from '../ShowTags/index.jsx';

function Layout() {
  const [curentTag, setCurentTag] = useState();
  const [allTags, setAllTags] = useState([]);

  return (
    <div className={style.main}>
      <div className={style.stickyHeader}>
        <Header />
      </div>

      <div className={style.tagsBar}>
        <ShowTags setCurentTag={setCurentTag} curentTag={curentTag} />
      </div>

      <div className={style.content}>
        <Content
          curentTag={curentTag}
          setCurentTag={setCurentTag}
          allTags={allTags}
          setAllTags={setAllTags}
        />
      </div>
    </div>
  );
}

export default Layout;
