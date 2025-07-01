import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import DataUser from '../DataUser/index.jsx';
import { useState } from 'react';
import ShowTags from '../ShowTags/index.jsx';

function Layout() {
  const [curentTag, setCurentTag] = useState();
  const [allTags, setAllTags] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  return (
    <div className={style.main}>
      <div className={style.stickyHeader}>
        <Header
          toggleSidebar={() => setIsSidebarOpen((prev) => !prev)}
          isSidebarOpen={isSidebarOpen}
        />
      </div>
       <div className={style.bar}>מתכון קהילתי</div>
      <div className={style.container}>
        <div className={`${style.sidebar} ${isSidebarOpen ? style.open : ''}`}>
          <h3 className={style.sidebarTitle}>אפשרויות המשתמש</h3>
          <DataUser />
          <h2>תגים:</h2>
          <ShowTags setCurentTag={setCurentTag} />
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
    </div>
  );
}

export default Layout;
