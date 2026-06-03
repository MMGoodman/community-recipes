import { useEffect, useState, useContext } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";

function Header() {
  const { curentUser, setCurentUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const bringData = async () => {
      try {
        const result = await axios.post(
          `${import.meta.env.VITE_API_URL}/api/recipe/search`,
          { filter: search }
        );
        setData(result.data);
      } catch (error) {
        console.log(error);
      }
    };
    if (search) bringData();
    else setData([]);
  }, [search]);

  const handelSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const handelOffButton = () => {
    setCurentUser(null);
    setIsMenuOpen(false);
  };

  const goTo = (path) => {
    navigate(path);
    setIsMenuOpen(false);
  };

  const isLoggedIn = curentUser && curentUser._id;

  return (
    <div className={style.header}>
      {/* ימין: פרטי משתמש */}
      <div className={style.authSection}>
        {isLoggedIn ? (
          <div className={style.userMenu}>
            <div
              className={style.userName}
              onClick={() => setIsMenuOpen((prev) => !prev)}
              title="לחץ כדי לפתוח תפריט"
            >
              שלום {curentUser.lName} {curentUser.fName} ⌄
            </div>

            {isMenuOpen && (
              <div className={style.dropdownMenu}>
                <button className={style.dropdownItem} onClick={() => goTo('/newRecipe')}>
                  ➕ הוספת מתכון חדש
                </button>
                <button className={style.dropdownItem} onClick={() => goTo('/favoriteRecipe')}>
                  ❤️ מתכונים שאהבתי
                </button>
                <button className={style.dropdownItem} onClick={() => goTo('/userRecipes')}>
                  📖 המתכונים שלי
                </button>
                {curentUser?.admin && (
                  <>
                    <div className={style.dropdownDivider} />
                    <button className={style.dropdownItem} onClick={() => goTo('/admin')}>
                      🛠️ לוח ניהול
                    </button>
                    <button className={style.dropdownItem} onClick={() => goTo('/deleteRecipe')}>
                      📋 מתכונים לאישור
                    </button>
                  </>
                )}
                <div className={style.dropdownDivider} />
                <button onClick={handelOffButton} className={`${style.dropdownItem} ${style.dropdownLogout}`}>
                  🚪 התנתקות
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/SignIn" className={style.authLink}>הרשמה</Link>
            <Link to="/Login" className={style.authLink}>התחברות</Link>
          </>
        )}
      </div>

      {/* אמצע: חיפוש */}
      <div className={style.searchSection}>
        <input
          type="search"
          placeholder="🔍 חפש מתכון..."
          onChange={handelSearch}
          className={style.searchInput}
        />
        {data.length > 0 && (
          <div className={style.searchResults}>
            {data.map((item, index) => (
              <p
                key={index}
                className={style.searchResultItem}
                onClick={() => { navigate(`/recipe/${item.name}`); setData([]); setSearch(""); }}
              >
                {item.name}
              </p>
            ))}
          </div>
        )}
      </div>

      {/* שמאל: לוגו/שם */}
      <div className={style.siteName}>המתכון הקהילתי</div>
    </div>
  );
}

export default Header;
