import React, {useContext, useState} from 'react'
import styles from './AuthRegister.module.css'
import Footer from "../common/Footer/Footer"
import girlImg from "../../static/girl.svg"
import {json, useNavigate} from "react-router"
import {UserContext} from "../../user-context"

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
        }
        
        fetch('http://localhost:8080/auth/signin', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('data', JSON.stringify(data))
                toggleData(data)
                navigate("/promotions")
            })

        setUserName("")
        setPassword("")
    }

    return (
        <div className={styles.auth_body}>
            <div className={styles.auth_wrap}>
                <div className={styles.title_block}>
                    <img className={styles.girl_img} src={girlImg} alt={"Auth Img"}/>
                    <label className={styles.logo_title}>MarlborSoft</label>
                </div>
                <div className={styles.form}>
                    <div>
                        <input className={styles.user_name_input} type={"text"} placeholder={"USERNAME"} onChange={e => setUserName(e.target.value)} value={userName}/>
                    </div>
                    <div>
                        <input className={styles.password_input} type={"password"} placeholder={"PASSWORD"} onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div>
                        <button className={styles.auth_sign_in_btn} onClick={signInHandler}>SIGN IN</button>
                    </div>
                    <div>
                        <button className={styles.auth_sign_up_btn} onClick={signUpHandler}>SIGN UP</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}

export default Auth
