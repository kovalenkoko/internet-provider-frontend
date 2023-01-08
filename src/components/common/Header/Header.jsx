import React, {useContext, useEffect, useState} from 'react'
import styles from "./Header.module.css"
import {useNavigate} from "react-router"
import {UserContext} from "../../../user-context"

const Header = () => {
    const navigate = useNavigate()

    const {data, toggleData} = useContext(UserContext)

    const [userInfo, setUserInfo] = useState([])
    
    const isPromotions = window.location.pathname.split('/')[1] === 'promotions'
    const isTariff = window.location.pathname.split('/')[1] === 'tariff-plans'

    const promotionsHandler = () => {
        navigate("/promotions")
    }

    const tariffHandler = () => {
        navigate("/tariff-plans")
    }

    const accountHandler = () => {
        navigate("/personal-account")
    }
    
    const logOutHandler = () => {
        localStorage.removeItem('data')
        navigate("/auth")
    }

    useEffect(() => {
        const requestOptions = {
            method: 'GET',
            mode: 'cors',
            headers: {'Accept': 'application/json', 'Content-Type': 'application/json', 'Authorization': `Bearer_${data?.token}`},
        }

        const fetchData = async () => {
            const response = await fetch(`http://localhost:8080/user/get-by-id/${data?.user.id}`, requestOptions)
            const dataFetch = await response.json()
            setUserInfo(dataFetch)
        }

        data && fetchData().catch(console.error)
    }, [data])

    return (
        <div className={styles.header}>
            <label onClick={promotionsHandler} className={styles.logo_title}>MarlborSoft</label>
            <div className={styles.navbar_wrap}>
                <div className={styles.navbar}>
                    {isPromotions ? <label onClick={promotionsHandler} className={styles.promotions_label_active}>Promotions</label> :
                        <label onClick={promotionsHandler} className={styles.promotions_label}>Promotions</label>}
                    {isTariff ? <label onClick={tariffHandler} className={styles.tariff_label_active}>Tariff plans</label> :
                        <label onClick={tariffHandler} className={styles.tariff_label}>Tariff plans</label>}
                </div>
            </div>
            <div className={styles.header_btns}>
                <div onClick={accountHandler} className={styles.user_info}>
                    <div className={styles.user_info_wrap}>
                        <img className={styles.user_image} src={`${userInfo?.base64_image}`} alt={"User Image"}/>
                        <label className={styles.username}>{userInfo?.username}</label>
                    </div>
                </div>
                <div className={styles.log_out_btn} onClick={logOutHandler}>
                    <label className={styles.log_out_label}>Log out</label>
                </div>
            </div>
        </div>
    )
}

export default Header
