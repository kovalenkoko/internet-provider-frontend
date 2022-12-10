import React from 'react'
import styles from './Register.module.css'
import Footer from "../common/Footer/Footer";
import girlImg from "../../static/girl.svg"
const Register = () => {
    return (
        <div className={styles.register_body}>
            <div className={styles.register_wrap}>
                <img className={styles.girl_img} src={girlImg} alt={"girl"}/>
                <div className={styles.form}>
                    <input className={styles.user_name_input} type={"text"} placeholder={"USERNAME"}/>
                    <input className={styles.email_input} type={"email"} placeholder={"EMAIL"}/>
                    <input className={styles.password_input} type={"password"} placeholder={"PASSWORD"}/>
                    <input className={styles.password_input}  type={"password"} placeholder={"CONFIRM PASSWORD"}/>
                    <button className={styles.sign_up_btn}>Sign up</button>
                </div>
            </div>
            <label className={styles.logo_title}>MarlborSoft</label>
            <Footer/>
        </div>
    )
}
export default Register