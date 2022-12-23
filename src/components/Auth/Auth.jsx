import React, {useContext, useState} from 'react'
import styles from './Auth.module.css'
import Footer from "../common/Footer/Footer";
import girlImg from "../../static/girl.svg"
import {json, useNavigate} from "react-router";
import {UserContext} from "../../user-context";



const Auth = () => {
    const [userName, setUserName] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()

    const {data, toggleData} = useContext(UserContext)

    const signUpHandler = () => {
        navigate("/register")
    }
    const signInHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: userName, password: password})
        };
        fetch('http://localhost:8080/auth/signin', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('data', JSON.stringify(data))
                toggleData(data)
            });
        setUserName("")
        setPassword("")
        navigate("/promotions")
    }

    return (
        <div className={styles.sign_up_body}>
            <div className={styles.sign_up_wrap}>
                <img className={styles.girl_img} src={girlImg} alt={"girl"}/>
                <div className={styles.form}>
                    <input className={styles.user_name_input} type={"text"} placeholder={"USERNAME"} onChange={e => setUserName(e.target.value)} value={userName}/>
                    <input className={styles.password_input} type={"password"} placeholder={"PASSWORD"} onChange={e => setPassword(e.target.value)} value={password}/>
                    <button className={styles.sign_in_btn} onClick={signInHandler}>Sign in</button>
                    <button onClick={signUpHandler} className={styles.sign_up_btn}>Sign up</button>
                </div>
            </div>
            <label className={styles.logo_title}>MarlborSoft</label>
            <Footer/>
        </div>
    )
}
export default Auth
