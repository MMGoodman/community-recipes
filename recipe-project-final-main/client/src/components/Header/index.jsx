import { useEffect, useState, useContext } from "react";
import style from "./style.module.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";

function Header({ toggleSidebar, isSidebarOpen }) {
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
          {
            filter: search,
          }
        );
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
    setCurentUser(null);
    setIsMenuOpen(false);
  };

  const isLoggedIn = curentUser && curentUser._id;

  return (
    <div className={style.header}>
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
                {curentUser?.admin && (
                  <button
                    className={style.dropdownItem}
                    onClick={() => { navigate('/admin'); setIsMenuOpen(false); }}
                  >
                    🛠️ לוח ניהול
                  </button>
                )}
                {curentUser?.admin && (
                  <button
                    className={style.dropdownItem}
                    onClick={() => { navigate('/deleteRecipe'); setIsMenuOpen(false); }}
                  >
                    📋 מתכונים לאישור
                  </button>
                )}
                <button onClick={handelOffButton} className={style.dropdownItem}>
                  🚪 התנתקות
                </button>
              </div>
            )}
          </div>
        ) : (
          <>
            <Link to="/SignIn" className={style.authLink}>
              הרשמה
            </Link>
            <Link to="/Login" className={style.authLink}>
              התחברות
            </Link>
          </>
        )}
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

      <button className={style.toggleButton} onClick={toggleSidebar}>
        {isSidebarOpen ? "✖ סגור" : "☰ תפריט"}
      </button>
    </div>
  );
}

export default Header;
