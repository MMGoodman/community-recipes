import style from './style.module.css';
import Header from '../Header';
import Content from '../Content/index.jsx';
import DataUser from '../DataUser/index.jsx'
import { useState } from 'react';
import ShowTags from '../ShowTags/index.jsx';


function Layout() {

    //מחזיק את התג הנוכחי שנבחר בשביל החיפוש והצגת התוצאות
    const [curentTag, setCurentTag] = useState();
    const [allTags, setAllTags] = useState([]);

    return (
        <>
            <div className={style.header}> <Header/></div>
            <div className={style.container}>
              <span>  <div className={style.DataUser}>
                    <DataUser />
                </div>
                <h2>תגים:</h2>
                <ShowTags setCurentTag={setCurentTag}/>
                </span>
                <div className={style.content}>
                    <Content curentTag={curentTag} setCurentTag={setCurentTag} 
                    allTags={allTags} setAllTags={setAllTags}/>
                </div >
            </div>
        </>
    )
}

export default Layout