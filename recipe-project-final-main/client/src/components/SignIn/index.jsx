import axios from 'axios';
import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import DataContext from '../context/DataContext';
import { Link, useNavigate } from 'react-router-dom';
import style from './style.module.css';

function SignIn() {
  const navigate = useNavigate();
  const { setCurentUser } = useContext(DataContext);

  const schema = yup.object().shape({
    lName: yup.string().required("חובה להזין שם משפחה"),
    fName: yup.string().required("חובה להזין שם פרטי"),
    password: yup.string().required("חובה להזין סיסמה"),
    email: yup.string().email("פורמט אימייל לא תקין").required("חובה להזין אימייל"),
    confirmPassword: yup.string()
      .oneOf([yup.ref("password")], "הסיסמאות לא תואמות")
      .required("יש לאשר את הסיסמה")
  });

  const { register, handleSubmit, reset, formState: { errors } } = useForm({
    resolver: yupResolver(schema)
  });

  const [goodSign, setGoodSign] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  async function conect(data) {
    try {
      const user = await axios.post(`${import.meta.env.VITE_API_URL}/api/user`, data);
      setGoodSign("נרשמת בהצלחה 🎉");
      setCurentUser(user.data);
      reset();
      navigate('/');
    } catch (error) {
      console.log(error.message);
    }
  }

  return (

    <div className={style.container}>
      <Link className={style.link} to="/">חזרה</Link>

      <div className={style.header}>
        <h1 className={style.logo}>🍲 מתכון קהילתי</h1>
        <p className={style.subtitle}>המקום שבו כל אחד משתף את הסיר שלו</p>
      </div>

      <form className={style.signForm} onSubmit={handleSubmit(conect)}>
        <input
          type="text"
          placeholder='שם משפחה'
          {...register("lName")}
        />
        {errors.lName && <p className={style.error}>{errors.lName.message}</p>}

        <input
          type="text"
          placeholder='שם פרטי'
          {...register("fName")}
        />
        {errors.fName && <p className={style.error}>{errors.fName.message}</p>}

        <input
          type="email"
          placeholder='דואר אלקטרוני'
          {...register("email")}
        />
        {errors.email && <p className={style.error}>{errors.email.message}</p>}

        <div className={style.passwordContainer}>
          <input
            type={showPassword ? "text" : "password"}
            placeholder='סיסמא'
            {...register("password")}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? '👁️‍🗨️' : '👁️'}
          </button>
        </div>
        {errors.password && <p className={style.error}>{errors.password.message}</p>}

        <div className={style.passwordContainer}>
          <input
            type={showConfirmPassword ? "text" : "password"}
            placeholder='אימות סיסמא'
            {...register("confirmPassword")}
          />
          <button
            type="button"
            className={style.eyeButton}
            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
          >
            {showConfirmPassword ? '👁️‍🗨️' : '👁️'}
          </button>
        </div>
        {errors.confirmPassword && <p className={style.error}>{errors.confirmPassword.message}</p>}

        <input type="submit" value="הרשמה" />
      </form>

      {goodSign && <p>{goodSign}</p>}
    </div>

  );
}

export default SignIn;
