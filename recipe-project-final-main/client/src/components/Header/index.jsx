import { useEffect, useState, useContext, useRef } from "react";
import PropTypes from "prop-types";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";

// כמה זמן מחכים אחרי ההקשה האחרונה לפני ששולחים חיפוש לשרת
const SEARCH_DELAY_MS = 300;

function Header({ setCurentTags }) {
  const { curentUser, setCurentUser } = useContext(DataContext);
  const navigate = useNavigate();
  const [search, setSearch] = useState("");
  const [data, setData] = useState([]);
  const [matchingTags, setMatchingTags] = useState([]);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const searchInput = useRef(null);

  useEffect(() => {
    const term = search.trim().toLowerCase();
    if (!term) {
      setData([]);
      setMatchingTags([]);
      return;
    }

    let isLatest = true;
    const timer = setTimeout(async () => {
      try {
        const [recipes, tags] = await Promise.all([
          axios.post(`${import.meta.env.VITE_API_URL}/api/recipe/search`, { filter: term }),
          axios.get(`${import.meta.env.VITE_API_URL}/api/recipe/all/tags`),
        ]);
        // תשובה ישנה שהגיעה אחרי שהמשתמש כבר המשיך להקליד לא תדרוס את החדשה
        if (!isLatest) return;
        setData(recipes.data);
        setMatchingTags(tags.data.filter((tag) => tag.toLowerCase().includes(term)));
      } catch (error) {
        console.log(error);
      }
    }, SEARCH_DELAY_MS);

    // כל הקשה חדשה מבטלת את הטיימר הקודם, וכך נשלחת רק בקשה אחת בסוף ההקלדה
    return () => {
      isLatest = false;
      clearTimeout(timer);
    };
  }, [search]);

  const handelSearch = (e) => {
    e.preventDefault();
    setSearch(e.target.value);
  };

  const finishSearch = () => {
    setSearch("");
    searchInput.current?.blur();
  };

  const pickRecipe = (name) => {
    navigate(`/recipe/${name}`);
    finishSearch();
  };

  const pickTag = (tag) => {
    setCurentTags([tag]);
    finishSearch();
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
                {(curentUser?.admin || curentUser?.editor) && (
                  <>
                    <div className={style.dropdownDivider} />
                    {curentUser?.admin && (
                      <button className={style.dropdownItem} onClick={() => goTo('/admin')}>
                        🛠️ לוח ניהול
                      </button>
                    )}
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
          ref={searchInput}
          type="search"
          placeholder="🔍 חפש מתכון או קטגוריה..."
          value={search}
          onChange={handelSearch}
          onFocus={() => setIsSearchOpen(true)}
          onBlur={() => setIsSearchOpen(false)}
          className={style.searchInput}
        />
        {isSearchOpen && (matchingTags.length > 0 || data.length > 0) && (
          // בלי preventDefault לחיצה על הרשימה הייתה מורידה את הפוקוס מהשדה וסוגרת אותה
          <div className={style.searchResults} onMouseDown={(e) => e.preventDefault()}>
            {matchingTags.map((tag) => (
              <p
                key={tag}
                className={`${style.searchResultItem} ${style.searchTagItem}`}
                onClick={() => pickTag(tag)}
              >
                {tag}
                <span className={style.searchTagBadge}>קטגוריה</span>
              </p>
            ))}
            {data.map((item) => (
              <p
                key={item._id}
                className={style.searchResultItem}
                onClick={() => pickRecipe(item.name)}
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

Header.propTypes = {
  setCurentTags: PropTypes.func.isRequired,
};

export default Header;
