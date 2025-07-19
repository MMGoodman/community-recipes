import React, { useState, useContext } from "react";
import { useNavigate, Link } from "react-router-dom";
import axios from "axios";
import DataContext from "../context/DataContext";
import style from "./style.module.css";

function Login() {
  const { curentUser, setCurentUser } = useContext(DataContext);
  const navigate = useNavigate();

  const [lName, setLName] = useState("");
  const [fName, setFName] = useState("");
  const [password, setPassword] = useState("");
  const [flag, setFlag] = useState(true);
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  const handleLNameChange = (event) => setLName(event.target.value);
  const handleFNameChange = (event) => setFName(event.target.value);
  const handlePasswordChange = (event) => setPassword(event.target.value);

  const validateForm = () => {
    const newErrors = {};
    if (!lName.trim()) newErrors.lName = "חובה למלא שם משפחה";
    if (!fName.trim()) newErrors.fName = "חובה למלא שם פרטי";
    if (!password.trim()) newErrors.password = "חובה למלא סיסמא";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  async function handleSubmit(e){
    e.preventDefault();
    if (!validateForm()) return;

console.log("👉 נשלח לשרת:", { fName, lName, password });

    try {
      const user = await axios.post(`http://localhost:8000/api/user/find`, {
        lName,
        fName,
        password,
      });
      setCurentUser(user.data);
      console.log("🔼 שליחה לשרת:", { lName, fName, password });

      user.data._id ? navigate("/") : setFlag(false);
    } catch (error) {
      console.log(error.message+"?");
    }
  }

  return (
    <div className={style.container}>
      <Link className={style.link} to="/">חזרה</Link>

      {/* לוגו וכותרת */}
      <div className={style.header}>
        <h1 className={style.logo}>🍲 מתכון קהילתי</h1>
        <p className={style.subtitle}>המקום שבו כל אחד משתף את הסיר שלו</p>
      </div>

      {/* טופס התחברות */}
      <form className={style.loginFrom} onSubmit={handleSubmit}>
        <div>
          <input
            type="text"
            value={lName}
            onChange={handleLNameChange}
            placeholder="שם משפחה"
          />
          {errors.lName && <span className={style.error}>{errors.lName}</span>}
        </div>
        <br />
        <div>
          <input
            type="text"
            value={fName}
            onChange={handleFNameChange}
            placeholder="שם פרטי"
          />
          {errors.fName && <span className={style.error}>{errors.fName}</span>}
        </div>
        <br />
        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            value={password}
            onChange={handlePasswordChange}
            placeholder="סיסמא"
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? "👁️‍🗨️" : "👁️"}
          </button>
          {errors.password && (
            <span className={style.error}>{errors.password}</span>
          )}
        </div>
        <br />
        <input type="submit" value="התחבר" />
      </form>

      {!flag && (
        <>
          <p>המשתמש לא נמצא במערכת</p>
          <br />
          <Link to="/Signin">
            <p>להרשמה לחץ 👈 </p>
          </Link>
        </>
      )}
    </div>
  );
}

export default Login;
