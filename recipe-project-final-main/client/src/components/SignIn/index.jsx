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
    const { curentUser, setCurentUser } = useContext(DataContext);

    const schema = yup.object().shape({
        lName: yup.string().required("your last name is required!"),
        fName: yup.string().required("your first name is required!"),
        password: yup.string().required("Password is required!"),
        email: yup.string().email("Invalid email format").required("Email is required!"),
        confirmPassword: yup.string()
            .oneOf([yup.ref("password")], "Passwords must match")
            .required("Passwords don't match!")
    });

    const { register, handleSubmit, reset, formState: { errors } } = useForm({
        resolver: yupResolver(schema)
    });

    const [goodSign, setGoodSign] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    async function conect(data) {
        try {
            const user = await axios.post('http://localhost:8000/api/user', data);
            setGoodSign("נרשמת בהצלחה !!!");
            setCurentUser(user.data);
            reset();
            navigate('/');
        } catch (error) {
            console.log(error.message);
        }
    }

    return (
        <div>
            <Link className={style.link} to={'/'}>חזרה</Link>
            <form className={style.signFrom} onSubmit={handleSubmit(conect)}>
                <input
                    type="text" placeholder='שם משפחה'
                    {...register("lName", { required: "your last name is required!" })}
                />
                <br />
                {errors.lName && <p className={style.error}>{errors.lName.message}</p>}
                <input
                    type="text" placeholder='שם פרטי'
                    {...register("fName", { required: "your first name is required!" })}
                />
                <br />
                {errors.fName && <p className={style.error}>{errors.fName.message}</p>}
                <input
                    type="text" placeholder='דואר אלקטרוני'
                    {...register("email", { required: "email is required!" })}
                />
                <br />
                {errors.email && <p className={style.error}>{errors.email.message}</p>}
                <div className={style.passwordContainer}>
                    <input
                        type={showPassword ? "text" : "password"}
                        placeholder='סיסמא'
                        {...register("password", { required: "password is required!" })}
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
                <br />
                <div className={style.passwordContainer}>
                    <input
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder='אימות סיסמא'
                        {...register("confirmPassword", { required: "confirm password is required!" })}
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
                <br />
                <input type="submit" className={style.submit} />
            </form>
            <p>{goodSign} </p>
        </div>
    );
}

export default SignIn;
