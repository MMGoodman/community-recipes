import { useEffect, useState, useContext } from 'react';
import style from './style.module.css';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import DataContext from '../context/DataContext';

function Header() {

  const { curentUser, setCurentUser } = useContext(DataContext);

  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);

  // קריאה לשרת עבור תוצאות חיפוש
  useEffect(() => {
    const bringData = async () => {
      try {
        const result = await axios.post('http://localhost:8000/api/recipe/search', { filter: search });
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };

    if (search) {
      bringData();
    } else {
      setData([]);
    }
  }, [search]);

  const handelSearch = (e) => {
    e.preventDefault(); 
    setSearch(e.target.value);
  };

  const handelOffButton = () => {
    setCurentUser({});
  };

  return (
    <div className={style.header}>
      <div className={style.authSection}>
        {curentUser._id && (
          <button onClick={handelOffButton} className={style.authButton}>להתנתק</button>
        )}

        {!curentUser._id && (
          <>
            <Link to={'/SignIn'} className={style.authLink}>הרשמה</Link>
            <Link to={'/Login'} className={style.authLink}>התחברות</Link>
          </>
        )}
      </div>
      <div>{curentUser._id &&
        (<div>{curentUser.lName} {curentUser.fName} </div>)}
      </div>
      <div className={style.searchSection}>
        <input
          type="search"
          placeholder="הקלד שם של מתכון"
          onChange={handelSearch}
          className={style.searchInput}
        />
        {data.length > 0 && (
          <div className={style.searchResults}>
            {data.map((item, index) => (
              <p
                key={index}
                className={style.searchResultItem}
                onClick={() => navigate(`/recipe/${item.name}`)}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </div>
    </div >
  );
}

export default Header;

