import React from 'react'
import styles from './Auth.module.css'
import Footer from "../common/Footer/Footer";
import girlImg from "../../static/girl.svg"
import {useNavigate} from "react-router";



const Auth = () => {
    const navigate = useNavigate()
    const signUpHandler = () => {
        navigate("/register")
    }

    return (
        <div className={styles.sign_up_body}>
            <div className={styles.sign_up_wrap}>
                <img className={styles.girl_img} src={girlImg} alt={"girl"}/>
                <div className={styles.form}>
                    <input className={styles.user_name_input} type={"text"} placeholder={"USERNAME"}/>
                    <input className={styles.password_input} type={"password"} placeholder={"PASSWORD"}/>
                    <button className={styles.sign_in_btn}>Sign in</button>
                    <button onClick={signUpHandler} className={styles.sign_up_btn}>Sign up</button>
                </div>
            </div>
            <label className={styles.logo_title}>MarlborSoft</label>
            <Footer/>
        </div>
    )
}
export default Auth
