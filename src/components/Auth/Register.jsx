import React, {useState, useContext} from 'react'
import styles from './AuthRegister.module.css'
import Footer from "../common/Footer/Footer"
import girlImg from "../../static/girl.svg"
import {useNavigate} from "react-router"
import {UserContext} from "../../user-context"

const Register = () => {
    const [userName, setUserName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [confirmPassword, setConfirmPassword] = useState("")
    const navigate = useNavigate()
    const {data, toggleData} = useContext(UserContext)

    const signIpHandler = () => {
        navigate("/auth")
    }
    const signUpHandler = () => {
        const requestOptions = {
            method: 'POST',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
            body: JSON.stringify({ username: userName, email: email, password: password})
        }
        if(password === confirmPassword){
        fetch('http://localhost:8080/auth/signup', requestOptions)
            .then(response => response.json())
            .then(data => {
                localStorage.setItem('data', JSON.stringify(data))
                toggleData(data)
            })
        }
        setUserName("")
        setEmail("")
        setPassword("")
        setConfirmPassword("")

        navigate("/promotions")
    }

    return (
        <div className={styles.register_body}>
            <div className={styles.register_wrap}>
            <div className={styles.title_block}>
                    <img className={styles.girl_img} src={girlImg} alt={"Auth Img"}/>
                    <label className={styles.logo_title}>MarlborSoft</label>
                </div>
                <div className={styles.form}>
                    <div>
                        <input className={styles.user_name_input} type={"text"} placeholder={"USERNAME"} onChange={e => setUserName(e.target.value)} value={userName}/>
                    </div>
                    <div>
                        <input className={styles.email_input} type={"email"} placeholder={"EMAIL"} onChange={e => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div>
                        <input className={styles.password_input} type={"password"} placeholder={"PASSWORD"} onChange={e => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div>
                        <input className={styles.password_input}  type={"password"} placeholder={"CONFIRM PASSWORD"} onChange={e => setConfirmPassword(e.target.value)} value={confirmPassword}/>
                    </div>
                    <div>
                        <button className={styles.register_sign_up_btn} onClick={signUpHandler}>SIGN UP</button>
                    </div>
                    <div>
                        <button className={styles.register_sign_in_btn} onClick={signIpHandler}>SIGN IN</button>
                    </div>
                </div>
            </div>
            <Footer/>
        </div>
    )
}
export default Register
